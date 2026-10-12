import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { StorageService } from '../../services/storage';
import { Product, Order, OrderStatus } from '../../types';
import { 
  ShieldAlert, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Eye, 
  RotateCcw,
  Search,
  Sparkles,
  Crown
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    refreshProducts,
    user,
    setCurrentView,
    addToast 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('overview');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(user?.role === 'admin');
  const [adminPin, setAdminPin] = useState('');

  // Product modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Product form fields
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'men' | 'women' | 'kids' | 'unisex'>('men');
  const [category, setCategory] = useState('Men');
  const [subcategory, setSubcategory] = useState('Shirts and formal wear');
  const [sku, setSku] = useState('');
  const [sellingPrice, setSellingPrice] = useState<number>(4999);
  const [originalPrice, setOriginalPrice] = useState<number>(6499);
  const [totalStock, setTotalStock] = useState<number>(20);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);

  // Search & Filter in Admin
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Verification PIN for security demo
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === '2026' || adminPin === 'admin' || adminPin === '1234') {
      setIsAdminAuthenticated(true);
      addToast('Admin Access Granted', 'Authenticated as Store Director.', 'success');
    } else {
      addToast('Invalid Credentials', 'Enter PIN 2026 or "admin" to access dashboard.', 'error');
    }
  };

  // Metrics calculation
  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'completed' ? o.finalTotal : 0), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const lowStockProducts = products.filter(p => p.totalStock <= 5);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setName('');
    setGender('men');
    setCategory('Men');
    setSubcategory('Shirts and formal wear');
    setSku(`MM-CAT-${Math.floor(1000 + Math.random() * 9000)}`);
    setSellingPrice(4999);
    setOriginalPrice(6499);
    setTotalStock(25);
    setDescription('Handcrafted from breathable luxury textiles with master craftsmanship.');
    setImageUrl('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop');
    setIsFeatured(false);
    setIsBestSeller(false);
    setIsNewArrival(true);
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setName(p.name);
    setGender(p.gender);
    setCategory(p.category);
    setSubcategory(p.subcategory);
    setSku(p.sku);
    setSellingPrice(p.sellingPrice);
    setOriginalPrice(p.originalPrice);
    setTotalStock(p.totalStock);
    setDescription(p.description);
    setImageUrl(p.images[0] || '');
    setIsFeatured(!!p.isFeatured);
    setIsBestSeller(!!p.isBestSeller);
    setIsNewArrival(!!p.isNewArrival);
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sku.trim() || !imageUrl.trim()) {
      addToast('Validation Error', 'Please complete all required fields.', 'error');
      return;
    }

    const discountPercent = Math.max(0, Math.round(((originalPrice - sellingPrice) / originalPrice) * 100));

    if (editingProductId) {
      updateProduct(editingProductId, {
        name,
        gender,
        category,
        subcategory,
        sku,
        sellingPrice,
        originalPrice,
        discountPercent,
        totalStock,
        description,
        images: [imageUrl, imageUrl],
        isFeatured,
        isBestSeller,
        isNewArrival
      });
    } else {
      addProduct({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        gender,
        category,
        subcategory,
        sku,
        sellingPrice,
        originalPrice,
        discountPercent,
        totalStock,
        description,
        images: [imageUrl],
        rating: 5.0,
        reviewCount: 1,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
          { name: 'Onyx Black', hex: '#111111' },
          { name: 'Ivory White', hex: '#FDFBF7' }
        ],
        variants: [
          { size: 'M', color: 'Onyx Black', colorHex: '#111111', stock: Math.floor(totalStock / 2) },
          { size: 'L', color: 'Onyx Black', colorHex: '#111111', stock: Math.floor(totalStock / 2) }
        ],
        isFeatured,
        isBestSeller,
        isNewArrival,
        material: '100% Certified Pure Fibre',
        careInstructions: 'Dry clean only',
        estimatedDeliveryDays: 3
      });
    }

    setShowProductModal(false);
  };

  const handleResetCatalog = () => {
    if (window.confirm('Reset catalog, orders, and demo data to initial factory defaults?')) {
      StorageService.resetAllData();
      refreshProducts();
      addToast('Data Reset', 'All catalog and order data restored to default.', 'info');
    }
  };

  // Auth Protection Gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4 bg-[#FAF9F6]">
        <div className="p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xl max-w-md w-full text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#121214] text-[#C5A880] flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-[#18181B]">
              Store Director Security Portal
            </h2>
            <p className="text-xs text-[#716B64] mt-1">
              Restricted administrative environment for Mr &amp; Mrs Clothing Store.
            </p>
          </div>

          <form onSubmit={handleVerifyPin} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#18181B] mb-1">
                Enter Master Admin PIN or Password
              </label>
              <input
                type="password"
                required
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter PIN (Demo: 2026 or admin)"
                className="w-full px-4 py-3 text-sm text-center tracking-widest font-mono bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#121214] hover:bg-[#27272A] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              Verify &amp; Unlock Dashboard
            </button>
          </form>

          <div className="p-3 rounded-xl bg-[#F4EFE6] text-[11px] text-[#716B64]">
            Demo Master Key: <strong className="text-[#18181B]">2026</strong> or <strong className="text-[#18181B]">admin</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-8 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Dashboard Banner */}
        <div className="bg-[#121214] text-white p-6 sm:p-8 rounded-3xl border border-[#27272A] shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1F1F24] border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  Store Administration Hub
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#C5A880] text-[#121214]">
                  Director Privileges
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Real-time inventory management, order statuses, customer manifests, and sales analytics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetCatalog}
              className="px-3.5 py-2 bg-[#202026] hover:bg-[#2B2B33] border border-[#3A3A44] text-[#D4CDBF] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Reset sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Seed</span>
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 bg-[#C5A880] hover:bg-[#B38F58] text-[#121214] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Back to Storefront
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-[#E8E2D8] overflow-x-auto">
          {[
            { id: 'overview', label: 'Executive Overview', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'products', label: 'Product Inventory', icon: <Package className="w-4 h-4" />, count: products.length },
            { id: 'orders', label: 'Order Fulfilment', icon: <ShoppingBag className="w-4 h-4" />, count: orders.length },
            { id: 'customers', label: 'Customer Directory', icon: <Users className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#121214] text-[#121214]'
                  : 'border-transparent text-[#716B64] hover:text-[#121214]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="px-1.5 py-0.2 bg-[#F3EFE6] text-[#18181B] text-[10px] rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#716B64]">Total Gross Revenue</span>
                <div className="font-serif text-3xl font-bold text-[#18181B]">
                  ₹{totalSales.toLocaleString()}
                </div>
                <p className="text-[11px] text-emerald-700 font-medium">Verified customer receipts</p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#716B64]">Total Client Orders</span>
                <div className="font-serif text-3xl font-bold text-[#18181B]">
                  {totalOrdersCount}
                </div>
                <p className="text-[11px] text-[#A88A60] font-medium">100% Fulfilment trackable</p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#716B64]">Live Catalog Styles</span>
                <div className="font-serif text-3xl font-bold text-[#18181B]">
                  {totalProductsCount}
                </div>
                <p className="text-[11px] text-[#52525B]">Men, Women &amp; Kids collections</p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#716B64]">Low Stock Garments</span>
                <div className="font-serif text-3xl font-bold text-[#9E2A2B]">
                  {lowStockProducts.length}
                </div>
                <p className="text-[11px] text-[#9E2A2B] font-medium">Restocking recommended</p>
              </div>

            </div>

            {/* Low-stock Alerts Banner */}
            {lowStockProducts.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#FDF0ED] border border-[#FADBD8] flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#9E2A2B] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#9E2A2B]">
                  <h4 className="font-bold">Inventory Low-Stock Advisory:</h4>
                  <p className="mt-0.5">
                    {lowStockProducts.map(p => `${p.name} (${p.totalStock} left)`).join(', ')}. Update stock in the inventory tab below.
                  </p>
                </div>
              </div>
            )}

            {/* Recent Orders Overview Table */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4">
                <h3 className="font-serif text-lg font-bold text-[#18181B]">Recent Client Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#A88A60] hover:underline font-bold"
                >
                  Manage All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF9F6] text-[#716B64] uppercase tracking-wider text-[11px] border-b border-[#E8E2D8]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Patron Name</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Method</th>
                      <th className="py-3 px-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0ECE1]">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-[#FAF9F6]">
                        <td className="py-3 px-4 font-mono font-bold text-[#18181B]">#{o.orderNumber}</td>
                        <td className="py-3 px-4">{o.customerName}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F4EFE6] text-[#A88A60]">
                            {o.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 uppercase text-[#52525B]">{o.paymentMethod.replace('_', ' ')}</td>
                        <td className="py-3 px-4 text-right font-bold text-[#18181B]">₹{o.finalTotal.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Products Inventory */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter garments by name or SKU..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#27272A] transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4 text-[#C5A880]" />
                <span>Add New Creation</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF9F6] text-[#716B64] uppercase tracking-wider text-[11px] border-b border-[#E8E2D8]">
                    <tr>
                      <th className="py-3.5 px-4">Garment</th>
                      <th className="py-3.5 px-4">SKU</th>
                      <th className="py-3.5 px-4">Gender &amp; Category</th>
                      <th className="py-3.5 px-4">Selling Price</th>
                      <th className="py-3.5 px-4">Stock</th>
                      <th className="py-3.5 px-4">Badges</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0ECE1]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF9F6] transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-10 h-12 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-[#18181B] truncate max-w-xs">{p.name}</h4>
                              <p className="text-[11px] text-[#716B64]">{p.subcategory}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-[#52525B]">{p.sku}</td>
                        <td className="py-3 px-4 capitalize">{p.gender} • {p.category}</td>
                        <td className="py-3 px-4 font-bold text-[#18181B]">₹{p.sellingPrice.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className={`font-bold ${p.totalStock <= 5 ? 'text-[#9E2A2B]' : 'text-emerald-700'}`}>
                            {p.totalStock} units
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {p.isFeatured && <span className="px-1.5 py-0.5 bg-[#F4EFE6] text-[#A88A60] rounded text-[9px] font-bold">Featured</span>}
                            {p.isBestSeller && <span className="px-1.5 py-0.5 bg-[#FAF3E0] text-[#D4AF37] rounded text-[9px] font-bold">Best</span>}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-[#52525B] hover:text-[#18181B] hover:bg-[#F3EFE6] rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 text-[#A1A1AA] hover:text-[#9E2A2B] hover:bg-[#FDF0ED] rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            <div className="relative max-w-sm">
              <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search orders by ID, customer or email..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E8E2D8] rounded-xl focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-4">
              {filteredOrders.map((ord) => (
                <div key={ord.id} className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F0ECE1] pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-base text-[#18181B]">#{ord.orderNumber}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#121214] text-[#E5D7C3]">
                          {ord.orderStatus}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold uppercase">
                          Pay: {ord.paymentStatus}
                        </span>
                      </div>
                      <p className="text-xs text-[#52525B] mt-1">
                        Patron: <strong className="text-[#18181B]">{ord.customerName}</strong> ({ord.customerEmail}) • {ord.customerPhone}
                      </p>
                      <p className="text-[11px] text-[#716B64]">
                        Destination: {ord.shippingAddress.addressLine1}, {ord.shippingAddress.city} ({ord.shippingAddress.pincode})
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <span className="font-serif text-xl font-bold text-[#18181B]">
                        ₹{ord.finalTotal.toLocaleString()}
                      </span>
                      {/* Status Update Quick Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#716B64] font-medium">Update Status:</span>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="bg-[#FAF9F6] border border-[#E8E2D8] text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Line items summary */}
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs bg-[#FAF9F6] p-2 rounded-xl border border-[#E8E2D8] flex-shrink-0">
                        <img src={it.productImage} alt={it.productName} className="w-8 h-10 object-cover rounded" />
                        <div>
                          <p className="font-bold text-[#18181B] truncate max-w-[140px]">{it.productName}</p>
                          <p className="text-[10px] text-[#716B64]">{it.size} • Qty {it.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: Customers */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xs p-6 space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#18181B] border-b border-[#F0ECE1] pb-3">
              Registered Clients &amp; VIP Patrons
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF9F6] text-[#716B64] uppercase tracking-wider text-[11px] border-b border-[#E8E2D8]">
                  <tr>
                    <th className="py-3 px-4">Patron Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Contact Phone</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Lifetime Orders</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE1]">
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="py-3 px-4 font-bold text-[#18181B]">Devika Singhania</td>
                    <td className="py-3 px-4">devika.s@example.com</td>
                    <td className="py-3 px-4">+91 98200 12345</td>
                    <td className="py-3 px-4 font-bold uppercase text-[#A88A60]">Customer VIP</td>
                    <td className="py-3 px-4 font-bold">2 Orders (₹37,998)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="py-3 px-4 font-bold text-[#18181B]">Aarav Malhotra</td>
                    <td className="py-3 px-4">aarav.malhotra@example.com</td>
                    <td className="py-3 px-4">+91 98765 43210</td>
                    <td className="py-3 px-4 uppercase text-[#52525B]">Customer</td>
                    <td className="py-3 px-4 font-bold">1 Order (₹17,999)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="py-3 px-4 font-bold text-[#18181B]">Meera Kapoor</td>
                    <td className="py-3 px-4">meera.kapoor@example.com</td>
                    <td className="py-3 px-4">+91 98111 22334</td>
                    <td className="py-3 px-4 uppercase text-[#52525B]">Customer</td>
                    <td className="py-3 px-4 font-bold">1 Order (₹19,999)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Product Add/Edit Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-[#E8E2D8] rounded-3xl max-w-2xl w-full shadow-2xl p-6 overflow-y-auto max-h-[90vh] space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#18181B]">
                {editingProductId ? 'Edit Garment Details' : 'Add New Couture Creation'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1 text-[#716B64] hover:text-[#18181B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#18181B] mb-1">Garment Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Silk Bundi Kurta Set"
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                  >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Men / Women / Kids"
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Subcategory Silhouette</label>
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="e.g. Sarees and salwar suits / Shirts and formal wear"
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Original Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Initial Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={totalStock}
                    onChange={(e) => setTotalStock(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Primary Image URL *</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Description &amp; Fabric</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-1.5 text-xs text-[#18181B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-[#121214]"
                  />
                  <span>Mark as Featured</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#18181B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="accent-[#121214]"
                  />
                  <span>Mark as Bestseller</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-[#18181B] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="accent-[#121214]"
                  />
                  <span>Mark as New Arrival</span>
                </label>
              </div>

              <div className="pt-3 border-t border-[#F0ECE1] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border border-[#E8E2D8] text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#121214] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#27272A]"
                >
                  {editingProductId ? 'Update Garment' : 'Create Creation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
