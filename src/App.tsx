import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { ShopPage } from './components/product/ShopPage';
import { ProductDetailView } from './components/product/ProductDetailView';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmationPage } from './components/checkout/OrderConfirmationPage';
import { CustomerAccountPage } from './components/account/CustomerAccountPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <AnnouncementBar />
        <Navbar />

        {/* Dynamic Route View */}
        <div className="transition-opacity duration-300">
          {currentView === 'home' && <HomePage />}
          {currentView === 'shop' && <ShopPage />}
          {currentView === 'product-detail' && <ProductDetailView />}
          {currentView === 'checkout' && <CheckoutPage />}
          {currentView === 'order-confirmation' && <OrderConfirmationPage />}
          {currentView === 'account' && <CustomerAccountPage />}
          {currentView === 'admin' && <AdminDashboard />}
        </div>
      </div>

      <Footer />

      {/* Overlays & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <SearchModal />
      <AuthModal />
      <ToastContainer />
    </main>
  );
};

export function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}

export default App;
