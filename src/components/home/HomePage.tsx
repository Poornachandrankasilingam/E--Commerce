import React from 'react';
import { HeroBanner } from './HeroBanner';
import { ShopByCategory } from './ShopByCategory';
import { TrendingSection } from './TrendingSection';
import { NewArrivalsSection } from './NewArrivalsSection';
import { BestSellersSection } from './BestSellersSection';
import { SpecialOffersBanner } from './SpecialOffersBanner';
import { FeaturedCollections } from './FeaturedCollections';
import { CustomerReviews } from './CustomerReviews';
import { NewsletterSubscription } from './NewsletterSubscription';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0 animate-fade-in">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Shop by Category */}
      <ShopByCategory />

      {/* 3. Trending Products */}
      <TrendingSection />

      {/* 4. New Arrivals */}
      <NewArrivalsSection />

      {/* 5. Special Offers & Vouchers */}
      <SpecialOffersBanner />

      {/* 6. Best Sellers */}
      <BestSellersSection />

      {/* 7. Featured Collections */}
      <FeaturedCollections />

      {/* 8. Customer Reviews & Ratings */}
      <CustomerReviews />

      {/* 9. Newsletter VIP Subscription */}
      <NewsletterSubscription />
    </div>
  );
};
