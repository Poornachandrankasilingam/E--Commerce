export type Gender = 'men' | 'women' | 'kids' | 'unisex';

export interface ProductVariant {
  size: string;
  color: string;
  colorHex: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  gender: Gender;
  category: string;
  subcategory: string;
  sku: string;
  originalPrice: number;
  sellingPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  variants: ProductVariant[];
  totalStock: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
  material: string;
  careInstructions: string;
  estimatedDeliveryDays: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  gender: Gender | 'all';
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id (productId + size + color)
  productId: string;
  product: Product;
  size: string;
  color: string;
  colorHex: string;
  quantity: number;
  price: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  createdAt: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'cod' | 'razorpay_upi' | 'razorpay_card' | 'razorpay_netbanking';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderHistoryStatus {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  shippingAddress: Address;
  shippingMethod: 'standard' | 'express';
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingFee: number;
  finalTotal: number;
  trackingNumber?: string;
  courierPartner?: string;
  estimatedDeliveryDate: string;
  createdAt: string;
  history: OrderHistoryStatus[];
  razorpayPaymentId?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  expiresAt: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
  helpfulCount: number;
}

export interface FilterState {
  search: string;
  gender: string; // 'all' | 'men' | 'women' | 'kids'
  category: string;
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
