import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Tag, Truck } from 'lucide-react';

const announcements = [
  {
    icon: <Truck className="w-3.5 h-3.5 text-[#c5a880]" />,
    text: 'Complimentary Express White-Glove Delivery on orders above ₹1,999'
  },
  {
    icon: <Tag className="w-3.5 h-3.5 text-[#c5a880]" />,
    text: 'Festive Season Offer: Use code ELEGANCE20 for 20% off luxury ensembles'
  },
  {
    icon: <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />,
    text: 'New Autumn/Festive Royal Couple Couture Collection is now live'
  }
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const current = announcements[currentIndex];

  return (
    <div className="bg-[#121214] text-[#e8e2d8] text-xs font-medium tracking-wider py-2.5 px-4 border-b border-[#2d2c2a] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="p-1 hover:text-[#c5a880] transition-colors hidden sm:block opacity-75 hover:opacity-100"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 flex items-center justify-center gap-2.5 text-center px-2">
          {current.icon}
          <span className="truncate max-w-[90vw] sm:max-w-none text-[11px] sm:text-xs uppercase tracking-widest font-medium">
            {current.text}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="p-1 hover:text-[#c5a880] transition-colors hidden sm:block opacity-75 hover:opacity-100"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
