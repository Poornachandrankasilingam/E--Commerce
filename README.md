# Mr & Mrs Clothing Store — Luxury E-Commerce Platform

> **"Style for Him. Elegance for Her."**

A complete, modern, responsive, production-ready online clothing shopping destination engineered for the luxury fashion boutique **Mr & Mrs Clothing Store**.

---

## 🌟 Brand Identity & Aesthetic

- **Design Philosophy:** Clean, editorial haute-couture boutique with spacious layouts and timeless typography.
- **Color Palette:** Midnight Onyx (`#111114`), Off-White / Ivory (`#FAF9F6`), Sand Beige (`#E8E2D8`), and Champagne Gold accents (`#C5A880`, `#D4AF37`).
- **Typography:** *Cormorant Garamond* & *Playfair Display* for headers, *Plus Jakarta Sans* for crisp product descriptions.
- **Signature Monogram:** Royal **M&M** crest emblem with gold borders.

---

## 💎 Features Overview

### 1. Storefront & Homepage
- **Rotating Announcement Bar:** Dynamic promotions, free shipping thresholds, and seasonal voucher codes.
- **Brand Navbar:** Monogram crest, Men's and Women's dropdown menus, Kids' Wear, New Arrivals, Sale, real-time search, wishlist counter, bag counter, and Admin quick-switch.
- **Editorial Hero Banner:** Split His & Her fashion photography, luxury headline, and quick action buttons.
- **Shop by Category:** Men's, Women's, Kids', Casual, Ethnic & Festive, Party Wear, and Accessories.
- **Curated Collections:** Trending pieces, New Arrivals, Best Sellers, and Special Offers banner.
- **Patron Testimonials:** Verified customer reviews with 5-star rating breakdowns.
- **Privé VIP Newsletter:** Email subscription with an instant 10% welcome coupon (`WELCOME10`).
- **Footer:** Brand atelier story, Client care policies, return guidelines, and secured payment badges.

### 2. Dedicated Category & Catalog Browsing
- Dedicated shopping pages for **Men's**, **Women's**, and **Kids'** collections with all specified subcategories:
  - *Men:* Shirts & formal wear, polo shirts & tees, selvedge denim & trousers, cashmere jackets, traditional wear (bandhgala & kurtas).
  - *Women:* Evening gowns & dresses, pure Banarasi silk sarees, chikankari kurtis, tailored silk blazers, mulberry silk camisoles.
  - *Kids:* Junior brocade sherwanis, festive lehengas, linen Bermuda sets.
- **Comprehensive Filters & Sorting:**
  - Filter by Gender, Silhouette, Size (XS to XXL), Color Palette swatches, Price range slider (₹2,000 to ₹35,000), Stock availability, and Sale items.
  - Sort by Featured, Price (Low to High, High to Low), Top Rated, and Newest Arrivals.

### 3. Product Details Page
- High-resolution multi-image gallery with hover zoom.
- Product name, tagline, description, fabric composition, and SKU.
- Original price, discounted price, and percentage savings badge.
- Interactive color swatches and size selector with real-time inventory tracking.
- Master Tailoring **Size Guide Modal** (with inches and centimeters toggle).
- Quantity stepper with low-stock warnings (*"Only 3 pieces left!"*).
- Interactive **PIN Code Delivery Estimator**.
- Customer Reviews with an interactive **Write a Review** submission modal.
- Related Products and Recently Viewed tracking.

### 4. Shopping Bag & Checkout
- Slide-over **Cart Drawer** with free shipping progress bar (threshold: ₹1,999).
- Active voucher code system (`WELCOME10`, `ELEGANCE20`, `MRMRS500`, `ROYAL1000`).
- Real-time calculations: Subtotal, Savings, Shipping fee, and Final Total.
- **Checkout Flow:**
  - Patron contact details (Name, Email, Phone).
  - Delivery address form with PIN code verification and saved address selector.
  - Dispatch selection: Standard White-Glove (Free above ₹1,999) or Priority Air Express.
  - Payment methods: **Cash on Delivery (COD)** or **Razorpay UPI / Cards / NetBanking**.
  - Duplicate order prevention and anti-tamper lock.
- **Order Confirmation:**
  - Celebratory confetti animation.
  - Order ID (`#MM-2026-XXXX`) and consignment tracking number.
  - Live 5-step status timeline: *Pending ➔ Confirmed ➔ Processing ➔ Shipped ➔ Delivered*.
  - Printable receipt and order invoice.

### 5. Customer Account Portal
- Sign Up & Sign In with password visibility toggle.
- Profile management (name, phone, email).
- Saved delivery addresses management (Add, Delete, Set Default).
- Order history with live order status trackers and receipt viewing.
- Wishlist management with one-click move-to-bag.

### 6. Store Administrator Dashboard
- Master Director security portal with PIN protection (`2026` or `admin`).
- **Overview Metrics:** Total Sales (₹), Total Orders, Total Customers, Live Catalog Styles, and Low-stock alerts.
- **Product Management:** Add new creations with image URLs, pricing, and stock; Edit existing products; Delete products; Toggle Featured and Bestseller flags.
- **Order Fulfilment:** View all orders, patron details, address, payment status, and single-click Order Status updater (*Pending, Confirmed, Processing, Shipped, Delivered, Cancelled*).
- **Customer Directory:** View registered patrons, contact details, and lifetime order value.
- **Reset Demo Data:** One-click re-seed button for demonstration testing.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS v4, Custom Design Tokens |
| **Icons** | Lucide React |
| **Celebrations** | Canvas-Confetti |
| **Database** | Supabase PostgreSQL (or resilient local-first store) |
| **Authentication** | Supabase Auth / Local Patron Session |
| **Backend API** | Node.js, Express (with Razorpay HMAC Verification) |
| **Payments** | Razorpay (UPI, Credit/Debit Cards, NetBanking, COD) |

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(The store runs out-of-the-box in local-first sandbox mode even before configuring external keys!)*

### Step 3: Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Step 4: Run the Backend API (Optional for Razorpay verification)
```bash
node server/index.js
```
The server will run on `http://localhost:5000`.

---

## 🗄️ Database Setup (Supabase PostgreSQL)

1. Create a free account and new project at [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and execute it.
   - Creates all 16 tables: `profiles`, `categories`, `products`, `product_images`, `product_variants`, `inventory`, `carts`, `cart_items`, `wishlists`, `wishlist_items`, `addresses`, `orders`, `order_items`, `payments`, `coupons`, and `product_reviews`.
   - Configures Row Level Security (RLS) policies and indexes.
4. Copy the contents of `supabase/seed.sql` and execute it to populate initial products, categories, and coupons.
5. In your `.env` file, set:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
   ```

---

## 💳 Razorpay Payment Gateway Integration

1. Sign up for a [Razorpay](https://razorpay.com) account.
2. In Dashboard ➔ **Settings** ➔ **API Keys**, generate a Test Key ID and Key Secret.
3. Update `.env`:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_ID=rzp_test_...
   RAZORPAY_KEY_SECRET=your_secret_here
   ```
4. Client integration dynamically loads `https://checkout.razorpay.com/v1/checkout.js`.
5. The backend (`/api/verify-payment`) performs cryptographic signature checks:
   ```javascript
   const expectedSignature = crypto
     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
     .digest('hex');
   ```

---

## 🧪 Testing Guide

| Feature | How to Test | Expected Behavior |
|---|---|---|
| **Demo Login** | Click User icon ➔ "Demo Customer" or "Demo Admin" | Signs in instantly with sample addresses & order history. |
| **Catalog Filter** | Click Men or Women ➔ Adjust price slider or click a color | Real-time filtering with updated item count. |
| **Cart & Free Shipping** | Add any product under ₹1,999 to bag | Progress bar shows remaining amount to reach ₹1,999 free shipping. |
| **Coupon Codes** | Enter `WELCOME10` or `ELEGANCE20` in cart drawer | Deducts 10% or 20% discount from the subtotal. |
| **Checkout & COD** | Proceed to checkout ➔ Fill PIN ➔ Select COD ➔ Place Order | Redirects to order confirmation with confetti and order ID. |
| **Razorpay Simulation** | Select UPI or Cards at checkout ➔ Place Order | Verifies payment and confirms order with transaction receipt. |
| **Order Status Tracker** | Go to Admin ➔ Enter PIN `2026` ➔ Order Fulfilment ➔ Change status to "Delivered" | Order status updates in real-time on customer account. |
| **Stock Deduction** | Place order for item with low stock | Product stock decrements and warns if low. |

---

## 📦 Production Deployment

### Frontend (Vercel)
```bash
npm run build
```
Deploy the `dist/` folder directly to Vercel or Netlify. Set environment variables in the project settings.

### Backend (Render / Railway)
Deploy the root repository with `node server/index.js` as the start command. Set `RAZORPAY_KEY_SECRET` in environment variables.

---

© 2026 Mr & Mrs Clothing Store. Crafted with distinction.
