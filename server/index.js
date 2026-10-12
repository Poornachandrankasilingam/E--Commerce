/**
 * Mr & Mrs Clothing Store: Production Backend Server
 * Node.js & Express API with Razorpay Server-Side Payment Verification
 */

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// 1. Healthcheck Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Mr & Mrs Clothing Store',
    tagline: 'Style for Him. Elegance for Her.',
    timestamp: new Date().toISOString()
  });
});

// 2. Razorpay Order Creation Endpoint (Server-Side Order Generation)
app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid order amount is required.' });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret || keyId === 'your_razorpay_key_id') {
      // Return simulated test order for sandbox development
      return res.json({
        id: `order_sim_${Date.now()}`,
        amount: Math.round(amount * 100),
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        status: 'created',
        is_simulated: true,
        message: 'Sandbox simulated order ID (Configure RAZORPAY_KEY_SECRET for live gateway)'
      });
    }

    // Call official Razorpay Orders API with Basic Auth
    const authHeader = 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // in paise
        currency,
        receipt: receipt || `rcpt_${Date.now()}`
      })
    });

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ error: 'Failed to generate payment gateway order.' });
  }
});

// 3. Server-Side Payment Verification (HMAC SHA-256 Signature Verification)
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id) {
      return res.status(400).json({ error: 'Payment ID is mandatory for verification.' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret || secret === 'your_razorpay_key_secret') {
      // In sandbox demo mode, accept verified simulation
      return res.json({
        success: true,
        verified: true,
        is_simulated: true,
        payment_id: razorpay_payment_id,
        message: 'Payment verified in development sandbox mode.'
      });
    }

    // Cryptographic HMAC SHA-256 calculation
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return res.json({
        success: true,
        verified: true,
        payment_id: razorpay_payment_id,
        message: 'Signature verified cryptographically.'
      });
    } else {
      return res.status(400).json({
        success: false,
        verified: false,
        error: 'Invalid signature. Potential tampering detected.'
      });
    }
  } catch (error) {
    console.error('Error verifying payment signature:', error);
    return res.status(500).json({ error: 'Payment verification failed.' });
  }
});

// 4. Razorpay Webhook Listener (Handles asynchronous payment captures & refunds)
app.post('/api/razorpay-webhook', (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    if (webhookSecret && signature) {
      const shasum = crypto.createHmac('sha256', webhookSecret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest('hex');

      if (digest !== signature) {
        return res.status(400).json({ error: 'Invalid webhook signature.' });
      }
    }

    const event = req.body.event;
    console.log(`[Webhook Event Received]: ${event}`);

    // Handle payment.captured, payment.failed, order.paid, refund.processed
    if (event === 'payment.captured') {
      const paymentEntity = req.body.payload.payment.entity;
      console.log(`Payment captured successfully: ${paymentEntity.id} for amount ${paymentEntity.amount / 100}`);
    }

    res.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing error.' });
  }
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`⚜️ Mr & Mrs Clothing Store API active on http://localhost:${PORT}`);
  });
}

export default app;
