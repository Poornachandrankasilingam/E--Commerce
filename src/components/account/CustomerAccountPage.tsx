import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  LogOut, 
  Plus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  ShieldAlert,
  Edit2
} from 'lucide-react';
import { Address } from '../../types';

export const CustomerAccountPage: React.FC = () => {
  const { 
    user, 
    logoutUser, 
    updateProfile, 
    addAddress, 
    deleteAddress, 
    orders, 
    wishlist, 
    navigateToOrderConfirmation,
    setCurrentView,
    addToast 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile'>('orders');

  // Address modal / form
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newAddrLine1, setNewAddrLine1] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('Maharashtra');
  const [newPincode, setNewPincode] = useState('');
  const [newType, setNewType] = useState<'home' | 'work' | 'other'>('home');

  // Profile edit
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#18181B]">Sign In Required</h2>
        <p className="text-xs text-[#716B64]">Please sign in to view your orders and personalized wardrobe.</p>
        <button
          onClick={() => setCurrentView('home')}
          className="px-6 py-2.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#27272A]"
        >
          Return to Storefront
        </button>
      </div>
    );
  }

  // Filter orders for current customer
  const userOrders = orders.filter(
    o => o.customerId === user.id || o.customerEmail.toLowerCase() === user.email.toLowerCase()
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name: editName, phone: editPhone });
    setIsEditingProfile(false);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newAddrLine1 || !newCity || !newPincode) {
      addToast('Validation Error', 'Please complete required address fields.', 'error');
      return;
    }

    addAddress({
      fullName: newFullName,
      phone: newPhone || user.phone,
      email: newEmail || user.email,
      addressLine1: newAddrLine1,
      city: newCity,
      state: newState,
      pincode: newPincode,
      country: 'India',
      isDefault: user.addresses.length === 0,
      type: newType
    });

    setShowAddAddress(false);
    setNewFullName('');
    setNewAddrLine1('');
    setNewCity('');
    setNewPincode('');
    addToast('Address Saved', 'New delivery address added successfully.', 'success');
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Account Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#121214] border-2 border-[#C5A880] flex items-center justify-center text-[#C5A880] text-xl font-serif font-bold shadow-md">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#18181B]">{user.name}</h1>
                {user.role === 'admin' && (
                  <span className="px-2.5 py-0.5 bg-[#121214] text-[#C5A880] text-[10px] font-bold uppercase rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-[#716B64] mt-0.5">{user.email} • {user.phone}</p>
              <p className="text-[11px] text-[#A88A60] font-semibold mt-1">Privé Member since 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className="px-4 py-2 bg-[#C5A880] hover:bg-[#B38F58] text-[#121214] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </button>
            )}

            <button
              onClick={() => {
                logoutUser();
                setCurrentView('home');
              }}
              className="px-4 py-2 border border-[#E8E2D8] hover:bg-[#FAF9F6] text-[#716B64] hover:text-[#9E2A2B] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E8E2D8] mb-8 overflow-x-auto">
          {[
            { id: 'orders', label: 'Order History', icon: <Package className="w-4 h-4" />, count: userOrders.length },
            { id: 'wishlist', label: 'My Luxury Wishlist', icon: <Heart className="w-4 h-4" />, count: wishlist.length },
            { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" />, count: user.addresses.length },
            { id: 'profile', label: 'Patron Profile', icon: <User className="w-4 h-4" /> }
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

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {userOrders.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E2D8] space-y-3">
                <Package className="w-12 h-12 text-[#A1A1AA] mx-auto opacity-50" />
                <h3 className="font-serif text-lg font-bold text-[#18181B]">No Past Orders Found</h3>
                <p className="text-xs text-[#716B64]">You haven't placed an order yet.</p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-2.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#27272A]"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              userOrders.map((ord) => (
                <div key={ord.id} className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0ECE1] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#18181B]">#{ord.orderNumber}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F4EFE6] text-[#A88A60]">
                          {ord.orderStatus}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#716B64] mt-0.5">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} • {ord.paymentMethod.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg font-bold text-[#121214]">
                        ₹{ord.finalTotal.toLocaleString()}
                      </span>
                      <button
                        onClick={() => navigateToOrderConfirmation(ord.id)}
                        className="px-4 py-1.5 bg-[#FAF9F6] hover:bg-[#121214] hover:text-white border border-[#E8E2D8] rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        Receipt &amp; Track
                      </button>
                    </div>
                  </div>

                  {/* Order items preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex gap-3 text-xs items-center">
                        <img
                          src={it.productImage}
                          alt={it.productName}
                          className="w-12 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-[#18181B] truncate">{it.productName}</h4>
                          <p className="text-[#716B64] text-[11px]">
                            Qty: {it.quantity} • {it.size} • {it.color}
                          </p>
                          <span className="font-bold text-[#18181B]">₹{it.totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E2D8] space-y-3">
                <Heart className="w-12 h-12 text-[#A1A1AA] mx-auto opacity-50" />
                <h3 className="font-serif text-lg font-bold text-[#18181B]">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#716B64]">Save your favourite suits, gowns, and kurtas for later.</p>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-2.5 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#27272A]"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {wishlist.map((w) => (
                  <ProductCard key={w.productId} product={w.product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#18181B]">Delivery Destinations</h3>
              <button
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="px-4 py-2 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#27272A] transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Add Address Form */}
            {showAddAddress && (
              <form onSubmit={handleCreateAddress} className="p-6 rounded-3xl bg-white border border-[#C5A880]/60 shadow-md space-y-4 animate-fade-in">
                <h4 className="font-serif text-base font-bold text-[#18181B]">New Destination Address</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      placeholder="Recipient Name"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="+91 98200 00000"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={newAddrLine1}
                    onChange={(e) => setNewAddrLine1(e.target.value)}
                    placeholder="Bungalow / Flat / Street"
                    className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                      placeholder="e.g. Maharashtra"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">PIN Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={newPincode}
                      onChange={(e) => setNewPincode(e.target.value)}
                      placeholder="400049"
                      className="w-full px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C5A880] text-[#121214] text-xs font-bold uppercase rounded-xl hover:bg-[#B38F58]"
                >
                  Save Address
                </button>
              </form>
            )}

            {/* Address Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.addresses.map((a) => (
                <div key={a.id} className="p-6 rounded-3xl bg-white border border-[#E8E2D8] space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#18181B]">{a.fullName}</span>
                    <span className="px-2 py-0.5 bg-[#F4EFE6] text-[#A88A60] text-[10px] uppercase font-bold rounded">
                      {a.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#52525B]">
                    {a.addressLine1}
                    <br />
                    {a.city}, {a.state} - {a.pincode}
                  </p>
                  <p className="text-xs text-[#716B64]">Phone: {a.phone}</p>
                  <div className="pt-2 text-right">
                    <button
                      onClick={() => deleteAddress(a.id)}
                      className="text-xs text-[#9E2A2B] hover:underline font-semibold flex items-center gap-1 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Patron Profile Details */}
        {activeTab === 'profile' && (
          <div className="max-w-xl p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4">
              <h3 className="font-serif text-lg font-bold text-[#18181B]">Personal Profile</h3>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs text-[#A88A60] hover:underline font-bold flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                {isEditingProfile ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#18181B] mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#18181B] mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF9F6] border border-[#E8E2D8] rounded-xl"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#121214] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#27272A]"
                >
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[#716B64] block">Full Name:</span>
                  <span className="font-bold text-sm text-[#18181B]">{user.name}</span>
                </div>
                <div>
                  <span className="text-[#716B64] block">Email Address:</span>
                  <span className="font-bold text-sm text-[#18181B]">{user.email}</span>
                </div>
                <div>
                  <span className="text-[#716B64] block">Phone Contact:</span>
                  <span className="font-bold text-sm text-[#18181B]">{user.phone}</span>
                </div>
                <div>
                  <span className="text-[#716B64] block">Account Role:</span>
                  <span className="font-bold text-sm text-[#A88A60] uppercase">{user.role}</span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
