import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  CartItem, 
  WishlistItem, 
  Order, 
  UserProfile, 
  Coupon, 
  OrderStatus, 
  PaymentMethod,
  Address
} from '../types';
import { StorageService, defaultCustomer, defaultAdmin } from '../services/storage';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

export type ViewType = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation' 
  | 'account' 
  | 'admin'
  | 'order-tracking';

interface ShopContextType {
  // Navigation & Views
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  navigateToProduct: (id: string) => void;
  navigateToShop: (gender?: string, category?: string) => void;
  navigateToOrderConfirmation: (orderId: string) => void;

  // Catalog Data
  products: Product[];
  categories: Category[];
  refreshProducts: () => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Filter & Search State
  activeGender: string;
  setActiveGender: (gender: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: string, colorHex: string, quantity?: number) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartFinalTotal: number;
  cartTotalCount: number;

  // Coupon
  activeCoupon: Coupon | null;
  couponMessage: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // User & Auth
  user: UserProfile | null;
  loginUser: (email: string, role?: 'customer' | 'admin') => void;
  registerUser: (name: string, email: string, phone: string) => void;
  logoutUser: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: Address;
    shippingMethod: 'standard' | 'express';
    paymentMethod: PaymentMethod;
    paymentStatus?: 'pending' | 'completed';
    razorpayPaymentId?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;

  // Quick View & Modals
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Current state
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Catalog
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeGender, setActiveGender] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  // User & Auth
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize from storage
  useEffect(() => {
    const loadedProducts = StorageService.getProducts();
    const loadedCategories = StorageService.getCategories();
    const loadedCart = StorageService.getCart();
    const loadedWishlist = StorageService.getWishlist();
    const loadedOrders = StorageService.getOrders();
    const loadedUser = StorageService.getCurrentUser();

    setProducts(loadedProducts);
    setCategories(loadedCategories);
    setCart(loadedCart);
    setWishlist(loadedWishlist);
    setOrders(loadedOrders);
    setUser(loadedUser || defaultCustomer);
  }, []);

  // Sync cart to storage
  useEffect(() => {
    StorageService.saveCart(cart);
  }, [cart]);

  // Sync wishlist to storage
  useEffect(() => {
    StorageService.saveWishlist(wishlist);
  }, [wishlist]);

  // Toast helper
  const addToast = (title: string, message?: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation helpers
  const navigateToProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToShop = (gender?: string, category?: string) => {
    if (gender) setActiveGender(gender);
    if (category) setActiveCategory(category);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOrderConfirmation = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentView('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, colorHex: string, quantity: number = 1) => {
    const cartItemId = `${product.id}_${size}_${color}`;
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            size,
            color,
            colorHex,
            quantity,
            price: product.sellingPrice
          }
        ];
      }
    });

    addToast('Added to Shopping Bag', `${product.name} (${size}) has been added.`, 'success');
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    addToast('Item Removed', 'The item was removed from your bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
    setCouponDiscount(0);
    setCouponMessage(null);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isFreeShipping = cartSubtotal >= 1999 || cartSubtotal === 0;
  const cartShipping = isFreeShipping ? 0 : 99;
  const cartDiscount = couponDiscount;
  const cartFinalTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  // Coupon
  const applyCoupon = (code: string): boolean => {
    const result = StorageService.validateCoupon(code, cartSubtotal);
    if (result.valid && result.coupon) {
      setActiveCoupon(result.coupon);
      setCouponDiscount(result.discount);
      setCouponMessage(result.message);
      addToast('Coupon Applied!', result.message, 'success');
      return true;
    } else {
      setActiveCoupon(null);
      setCouponDiscount(0);
      setCouponMessage(result.message);
      addToast('Coupon Error', result.message, 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setCouponDiscount(0);
    setCouponMessage(null);
    addToast('Coupon Removed', 'Coupon discount has been removed.', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(item => item.productId === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.productId !== product.id));
      addToast('Removed from Wishlist', `${product.name} removed.`, 'info');
    } else {
      setWishlist(prev => [
        ...prev,
        {
          productId: product.id,
          product,
          addedAt: new Date().toISOString()
        }
      ]);
      addToast('Added to Wishlist', `${product.name} saved to your luxury wishlist.`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  // Orders
  const createOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: Address;
    shippingMethod: 'standard' | 'express';
    paymentMethod: PaymentMethod;
    paymentStatus?: 'pending' | 'completed';
    razorpayPaymentId?: string;
  }): Order => {
    const orderItems = cart.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      productImage: item.product.images[0],
      sku: item.product.sku,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity
    }));

    const estimatedDeliveryDays = orderData.shippingMethod === 'express' ? 2 : 4;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + estimatedDeliveryDays);

    const newOrder = StorageService.createOrder({
      customerId: user ? user.id : 'guest-cust',
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      items: orderItems,
      shippingAddress: orderData.shippingAddress,
      shippingMethod: orderData.shippingMethod,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentStatus || (orderData.paymentMethod === 'cod' ? 'pending' : 'completed'),
      orderStatus: 'Confirmed',
      subtotal: cartSubtotal,
      discountAmount: cartDiscount,
      couponCode: activeCoupon?.code,
      shippingFee: cartShipping,
      finalTotal: cartFinalTotal,
      trackingNumber: `TRK-MM-${Math.floor(1000000 + Math.random() * 9000000)}`,
      courierPartner: 'BlueDart Luxury Express',
      estimatedDeliveryDate: estDate.toISOString().split('T')[0],
      razorpayPaymentId: orderData.razorpayPaymentId
    });

    setOrders(StorageService.getOrders());
    setProducts(StorageService.getProducts());
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    const updated = StorageService.updateOrderStatus(orderId, status, note);
    if (updated) {
      setOrders(StorageService.getOrders());
      addToast('Order Status Updated', `Order #${updated.orderNumber} updated to ${status}`, 'success');
    }
  };

  // Products CRUD
  const refreshProducts = () => {
    setProducts(StorageService.getProducts());
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
    const created = StorageService.addProduct(product);
    refreshProducts();
    addToast('Product Created', `${created.name} added to catalog.`, 'success');
    return created;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = StorageService.updateProduct(id, updates);
    if (updated) {
      refreshProducts();
      addToast('Product Updated', `${updated.name} updated successfully.`, 'success');
    }
  };

  const deleteProduct = (id: string) => {
    const deleted = StorageService.deleteProduct(id);
    if (deleted) {
      refreshProducts();
      addToast('Product Deleted', 'Item removed from catalog.', 'info');
    }
  };

  // User profile
  const loginUser = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: UserProfile = role === 'admin'
      ? { ...defaultAdmin, email }
      : { ...defaultCustomer, email };
    setUser(newUser);
    StorageService.saveCurrentUser(newUser);
    addToast('Welcome Back', `Logged in as ${role === 'admin' ? 'Store Administrator' : newUser.name}`, 'success');
  };

  const registerUser = (name: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone,
      role: 'customer',
      createdAt: new Date().toISOString(),
      addresses: []
    };
    setUser(newUser);
    StorageService.saveCurrentUser(newUser);
    addToast('Account Created', `Welcome to Mr & Mrs Clothing Store, ${name}!`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    StorageService.saveCurrentUser(null);
    addToast('Logged Out', 'You have been safely signed out.', 'info');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    StorageService.saveCurrentUser(updated);
    addToast('Profile Updated', 'Changes saved successfully.', 'success');
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddr: Address = {
      ...address,
      id: `addr-${Date.now()}`
    };
    const updatedAddresses = [...user.addresses, newAddr];
    updateProfile({ addresses: updatedAddresses });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const filtered = user.addresses.filter(a => a.id !== id);
    updateProfile({ addresses: filtered });
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedOrderId,
        setSelectedOrderId,
        navigateToProduct,
        navigateToShop,
        navigateToOrderConfirmation,
        products,
        categories,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        activeGender,
        setActiveGender,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartFinalTotal,
        cartTotalCount,
        activeCoupon,
        couponMessage,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        loginUser,
        registerUser,
        logoutUser,
        updateProfile,
        addAddress,
        deleteAddress,
        isAuthModalOpen,
        setIsAuthModalOpen,
        orders,
        createOrder,
        updateOrderStatus,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
