import { Product, Category, Order, Review, Coupon, UserProfile, CartItem, WishlistItem, OrderStatus } from '../types';
import { initialProducts, initialCategories, initialOrders, initialReviews, initialCoupons } from '../data/mockData';

const KEYS = {
  PRODUCTS: 'mm_products_v1',
  CATEGORIES: 'mm_categories_v1',
  ORDERS: 'mm_orders_v1',
  REVIEWS: 'mm_reviews_v1',
  COUPONS: 'mm_coupons_v1',
  CART: 'mm_cart_v1',
  WISHLIST: 'mm_wishlist_v1',
  CURRENT_USER: 'mm_current_user_v1',
  SAVED_USERS: 'mm_users_db_v1',
  RECENTLY_VIEWED: 'mm_recent_views_v1'
};

// Safe JSON parse helper
function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

// Initial default user for seamless experience
export const defaultCustomer: UserProfile = {
  id: 'cust-demo-1',
  name: 'Devika Singhania',
  email: 'devika.s@example.com',
  phone: '+91 98200 12345',
  role: 'customer',
  createdAt: '2026-09-01T00:00:00Z',
  addresses: [
    {
      id: 'addr-default-1',
      fullName: 'Devika Singhania',
      phone: '+91 98200 12345',
      email: 'devika.s@example.com',
      addressLine1: 'Bungalow 7, Golden Sun Enclave',
      addressLine2: 'Juhu Tara Road',
      landmark: 'Near Sea Princess',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400049',
      country: 'India',
      isDefault: true,
      type: 'home'
    }
  ]
};

export const defaultAdmin: UserProfile = {
  id: 'admin-1',
  name: 'Store Manager',
  email: 'admin@mrandmrsclothing.com',
  phone: '+91 99999 88888',
  role: 'admin',
  createdAt: '2026-08-01T00:00:00Z',
  addresses: []
};

// Storage Service API
export const StorageService = {
  // Products
  getProducts(): Product[] {
    const products = safeGet<Product[]>(KEYS.PRODUCTS, []);
    if (!products || products.length === 0) {
      safeSet(KEYS.PRODUCTS, initialProducts);
      return initialProducts;
    }
    return products;
  },

  getProductById(id: string): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  },

  getProductBySlug(slug: string): Product | undefined {
    return this.getProducts().find(p => p.slug === slug);
  },

  saveProducts(products: Product[]): void {
    safeSet(KEYS.PRODUCTS, products);
  },

  addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.getProducts();
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  },

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...updates };
    this.saveProducts(products);
    return products[index];
  },

  deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    if (filtered.length === products.length) return false;
    this.saveProducts(filtered);
    return true;
  },

  // Categories
  getCategories(): Category[] {
    const categories = safeGet<Category[]>(KEYS.CATEGORIES, []);
    if (!categories || categories.length === 0) {
      safeSet(KEYS.CATEGORIES, initialCategories);
      return initialCategories;
    }
    return categories;
  },

  addCategory(category: Omit<Category, 'id'>): Category {
    const categories = this.getCategories();
    const newCat: Category = {
      ...category,
      id: `cat-${Date.now()}`
    };
    categories.push(newCat);
    safeSet(KEYS.CATEGORIES, categories);
    return newCat;
  },

  // Orders
  getOrders(): Order[] {
    const orders = safeGet<Order[]>(KEYS.ORDERS, []);
    if (!orders || orders.length === 0) {
      safeSet(KEYS.ORDERS, initialOrders);
      return initialOrders;
    }
    return orders;
  },

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find(o => o.id === id || o.orderNumber === id);
  },

  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'history'>): Order {
    const orders = this.getOrders();
    const orderNumber = `MM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      history: [
        {
          status: 'Pending',
          timestamp: new Date().toISOString(),
          note: `Order placed via ${orderData.paymentMethod.toUpperCase()}`
        },
        {
          status: 'Confirmed',
          timestamp: new Date(Date.now() + 1000).toISOString(),
          note: 'Order confirmed and inventory allocated'
        }
      ]
    };

    // Deduct stock from products
    const products = this.getProducts();
    newOrder.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        prod.totalStock = Math.max(0, prod.totalStock - item.quantity);
        const variant = prod.variants?.find(v => v.size === item.size && v.color === item.color);
        if (variant) {
          variant.stock = Math.max(0, variant.stock - item.quantity);
        }
      }
    });
    this.saveProducts(products);

    orders.unshift(newOrder);
    safeSet(KEYS.ORDERS, orders);
    return newOrder;
  },

  updateOrderStatus(orderId: string, status: OrderStatus, note?: string): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;
    
    orders[index].orderStatus = status;
    orders[index].history.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Order marked as ${status}`
    });

    safeSet(KEYS.ORDERS, orders);
    return orders[index];
  },

  // Reviews
  getReviews(productId?: string): Review[] {
    const reviews = safeGet<Review[]>(KEYS.REVIEWS, initialReviews);
    if (productId) {
      return reviews.filter(r => r.productId === productId);
    }
    return reviews;
  },

  addReview(review: Omit<Review, 'id' | 'createdAt' | 'helpfulCount'>): Review {
    const reviews = safeGet<Review[]>(KEYS.REVIEWS, initialReviews);
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
      helpfulCount: 0
    };
    reviews.unshift(newReview);
    safeSet(KEYS.REVIEWS, reviews);

    // Update product rating and review count
    const products = this.getProducts();
    const product = products.find(p => p.id === review.productId);
    if (product) {
      const prodReviews = reviews.filter(r => r.productId === review.productId);
      const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      product.rating = Number(avgRating.toFixed(1));
      product.reviewCount = prodReviews.length;
      this.saveProducts(products);
    }

    return newReview;
  },

  // Coupons
  getCoupons(): Coupon[] {
    return safeGet<Coupon[]>(KEYS.COUPONS, initialCoupons);
  },

  validateCoupon(code: string, cartTotal: number): { valid: boolean; coupon?: Coupon; discount: number; message: string } {
    const coupons = this.getCoupons();
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);

    if (!found) {
      return { valid: false, discount: 0, message: 'Invalid or expired coupon code' };
    }

    if (cartTotal < found.minOrderValue) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount of ₹${found.minOrderValue.toLocaleString()} required for code ${found.code}`
      };
    }

    let discount = 0;
    if (found.discountType === 'percentage') {
      discount = (cartTotal * found.discountValue) / 100;
      if (found.maxDiscount && discount > found.maxDiscount) {
        discount = found.maxDiscount;
      }
    } else {
      discount = found.discountValue;
    }

    return {
      valid: true,
      coupon: found,
      discount: Math.round(discount),
      message: `Coupon ${found.code} applied successfully! You saved ₹${Math.round(discount)}`
    };
  },

  // Cart
  getCart(): CartItem[] {
    return safeGet<CartItem[]>(KEYS.CART, []);
  },

  saveCart(cart: CartItem[]): void {
    safeSet(KEYS.CART, cart);
  },

  // Wishlist
  getWishlist(): WishlistItem[] {
    return safeGet<WishlistItem[]>(KEYS.WISHLIST, []);
  },

  saveWishlist(wishlist: WishlistItem[]): void {
    safeSet(KEYS.WISHLIST, wishlist);
  },

  // Current User
  getCurrentUser(): UserProfile | null {
    return safeGet<UserProfile | null>(KEYS.CURRENT_USER, defaultCustomer);
  },

  saveCurrentUser(user: UserProfile | null): void {
    safeSet(KEYS.CURRENT_USER, user);
  },

  // Recently Viewed
  getRecentlyViewed(): Product[] {
    return safeGet<Product[]>(KEYS.RECENTLY_VIEWED, []);
  },

  addRecentlyViewed(product: Product): void {
    const list = this.getRecentlyViewed().filter(p => p.id !== product.id);
    list.unshift(product);
    safeSet(KEYS.RECENTLY_VIEWED, list.slice(0, 8));
  },

  // Reset to initial clean state
  resetAllData(): void {
    localStorage.removeItem(KEYS.PRODUCTS);
    localStorage.removeItem(KEYS.CATEGORIES);
    localStorage.removeItem(KEYS.ORDERS);
    localStorage.removeItem(KEYS.REVIEWS);
    localStorage.removeItem(KEYS.COUPONS);
    localStorage.removeItem(KEYS.CART);
    localStorage.removeItem(KEYS.WISHLIST);
    safeSet(KEYS.PRODUCTS, initialProducts);
    safeSet(KEYS.CATEGORIES, initialCategories);
    safeSet(KEYS.ORDERS, initialOrders);
    safeSet(KEYS.REVIEWS, initialReviews);
    safeSet(KEYS.COUPONS, initialCoupons);
  }
};
