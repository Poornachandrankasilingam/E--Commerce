import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Ruler, HelpCircle } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'men' | 'women' | 'kids'>('women');
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isSizeGuideOpen) return null;

  const sizeData = {
    women: {
      inches: [
        { size: 'XS (32)', bust: '31 - 32', waist: '24 - 25', hip: '34 - 35', length: '54' },
        { size: 'S (34)', bust: '33 - 34', waist: '26 - 27', hip: '36 - 37', length: '55' },
        { size: 'M (36)', bust: '35 - 36', waist: '28 - 29', hip: '38 - 39', length: '55.5' },
        { size: 'L (38)', bust: '37 - 38', waist: '30 - 32', hip: '40 - 42', length: '56' },
        { size: 'XL (40)', bust: '39 - 41', waist: '33 - 35', hip: '43 - 45', length: '56.5' },
        { size: 'XXL (42)', bust: '42 - 44', waist: '36 - 38', hip: '46 - 48', length: '57' }
      ],
      cm: [
        { size: 'XS (32)', bust: '79 - 82', waist: '61 - 64', hip: '86 - 89', length: '137' },
        { size: 'S (34)', bust: '84 - 87', waist: '66 - 69', hip: '91 - 94', length: '140' },
        { size: 'M (36)', bust: '89 - 92', waist: '71 - 74', hip: '97 - 100', length: '141' },
        { size: 'L (38)', bust: '94 - 97', waist: '76 - 81', hip: '102 - 107', length: '142' },
        { size: 'XL (40)', bust: '99 - 104', waist: '84 - 89', hip: '109 - 114', length: '143' },
        { size: 'XXL (42)', bust: '107 - 112', waist: '91 - 97', hip: '117 - 122', length: '145' }
      ]
    },
    men: {
      inches: [
        { size: 'S (38R)', chest: '36 - 38', waist: '30 - 32', shoulder: '17.5', length: '29' },
        { size: 'M (40R)', chest: '39 - 41', waist: '33 - 34', shoulder: '18.2', length: '30' },
        { size: 'L (42R)', chest: '42 - 44', waist: '35 - 36', shoulder: '19.0', length: '30.5' },
        { size: 'XL (44R)', chest: '45 - 47', waist: '37 - 39', shoulder: '19.8', length: '31' },
        { size: 'XXL (46R)', chest: '48 - 50', waist: '40 - 42', shoulder: '20.5', length: '31.5' }
      ],
      cm: [
        { size: 'S (38R)', chest: '91 - 97', waist: '76 - 81', shoulder: '44.5', length: '74' },
        { size: 'M (40R)', chest: '99 - 104', waist: '84 - 86', shoulder: '46.2', length: '76' },
        { size: 'L (42R)', chest: '107 - 112', waist: '89 - 91', shoulder: '48.3', length: '77.5' },
        { size: 'XL (44R)', chest: '114 - 119', waist: '94 - 99', shoulder: '50.3', length: '79' },
        { size: 'XXL (46R)', chest: '122 - 127', waist: '102 - 107', shoulder: '52.1', length: '80' }
      ]
    },
    kids: {
      inches: [
        { size: '2 - 3 Y', height: '35 - 38', chest: '20 - 21', waist: '19 - 20', length: '22' },
        { size: '4 - 5 Y', height: '41 - 44', chest: '22 - 23', waist: '21 - 22', length: '26' },
        { size: '6 - 7 Y', height: '46 - 49', chest: '24 - 25', waist: '22 - 23', length: '30' },
        { size: '8 - 9 Y', height: '51 - 54', chest: '26 - 27', waist: '24 - 25', length: '34' },
        { size: '10 - 12 Y', height: '56 - 60', chest: '28 - 30', waist: '25 - 26', length: '38' }
      ],
      cm: [
        { size: '2 - 3 Y', height: '89 - 97', chest: '51 - 53', waist: '48 - 51', length: '56' },
        { size: '4 - 5 Y', height: '104 - 112', chest: '56 - 58', waist: '53 - 56', length: '66' },
        { size: '6 - 7 Y', height: '117 - 124', chest: '61 - 64', waist: '56 - 58', length: '76' },
        { size: '8 - 9 Y', height: '130 - 137', chest: '66 - 69', waist: '61 - 64', length: '86' },
        { size: '10 - 12 Y', height: '142 - 152', chest: '71 - 76', waist: '64 - 66', length: '96' }
      ]
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF9F6] border border-[#E8E2D8] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E8E2D8] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#121214]">Master Tailoring Size Guide</h3>
              <p className="text-xs text-[#716B64]">Accurate garment dimensions for Mr &amp; Mrs collections</p>
            </div>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-2 text-[#716B64] hover:text-[#121214] hover:bg-[#F3EFE6] rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls and Unit Switcher */}
        <div className="p-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center bg-[#EFECE6] p-1 rounded-xl">
            {(['women', 'men', 'kids'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab
                    ? 'bg-white text-[#121214] shadow-sm'
                    : 'text-[#716B64] hover:text-[#121214]'
                }`}
              >
                {tab === 'women' ? "Women's" : tab === 'men' ? "Men's" : "Kids"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#716B64] font-medium">Measurement Unit:</span>
            <div className="flex items-center bg-[#EFECE6] p-0.5 rounded-lg text-xs">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  unit === 'inches' ? 'bg-[#121214] text-white' : 'text-[#716B64]'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  unit === 'cm' ? 'bg-[#121214] text-white' : 'text-[#716B64]'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-6 overflow-y-auto">
          <div className="border border-[#E8E2D8] rounded-xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6F0] text-[#716B64] border-b border-[#E8E2D8] uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4 font-bold">Standard Size</th>
                  {activeTab === 'women' && (
                    <>
                      <th className="py-3 px-4 font-bold">Bust</th>
                      <th className="py-3 px-4 font-bold">Waist</th>
                      <th className="py-3 px-4 font-bold">Hip</th>
                      <th className="py-3 px-4 font-bold">Length</th>
                    </>
                  )}
                  {activeTab === 'men' && (
                    <>
                      <th className="py-3 px-4 font-bold">Chest</th>
                      <th className="py-3 px-4 font-bold">Waist</th>
                      <th className="py-3 px-4 font-bold">Shoulder</th>
                      <th className="py-3 px-4 font-bold">Length</th>
                    </>
                  )}
                  {activeTab === 'kids' && (
                    <>
                      <th className="py-3 px-4 font-bold">Height</th>
                      <th className="py-3 px-4 font-bold">Chest</th>
                      <th className="py-3 px-4 font-bold">Waist</th>
                      <th className="py-3 px-4 font-bold">Length</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE1]">
                {(sizeData[activeTab][unit] as any[]).map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#121214]">{row.size}</td>
                    {activeTab === 'women' && (
                      <>
                        <td className="py-3 px-4 text-[#52525B]">{row.bust} {unit === 'inches' ? 'in' : 'cm'}</td>
                        <td className="py-3 px-4 text-[#52525B]">{row.waist} {unit === 'inches' ? 'in' : 'cm'}</td>
                        <td className="py-3 px-4 text-[#52525B]">{row.hip} {unit === 'inches' ? 'in' : 'cm'}</td>
                        <td className="py-3 px-4 text-[#52525B]">{row.length} {unit === 'inches' ? 'in' : 'cm'}</td>
                      </>
                    )}
                    {activeTab === 'men' && (
                      <>
                        <td className="py-3 px-4 text-[#52525B]">{row.chest} {unit === 'inches' ? 'in' : 'cm'}</td>
                        <td className="py-3 px-4 text-[#52525B]">{row.waist} {unit === 'inches' ? 'in' : 'cm'}</td>
                        <td className="py-3 px-4 text-[#52525B]">{row.shoulder} {unit === 'inches' ? 'in' : 'cm'}</td>
                        <td className="py-3 px-4 text-[#52525B]">{row.length} {unit === 'inches' ? 'in' : 'cm'}</td>
                      </>
                    )}
                    {activeTab === 'kids' && (
                      <>
                        <td className="py-3 px-4 text-[#52525B]">{row.height} {unit === 'inches' ? 'in' : 'cm'}</td>
                        <td className="py-3 px-4 text-[#52525B]">{row.chest} {unit === 'inches' ? 'in' : 'cm'}</td>
                        <td className="py-3 px-4 text-[#52525B]">{row.waist} {unit === 'inches' ? 'in' : 'cm'}</td>
                        <td className="py-3 px-4 text-[#52525B]">{row.length} {unit === 'inches' ? 'in' : 'cm'}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measurement Advice Box */}
          <div className="mt-6 p-4 rounded-xl bg-[#F4EFE6]/70 border border-[#E8E2D8] flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-[#52525B] space-y-1">
              <p className="font-bold text-[#18181B]">Bespoke Fit Guarantee</p>
              <p>
                Hold the tape measure comfortably loose around the fullest part of your chest and natural waistline.
                For complimentary custom alterations, contact our private stylist concierge after placing your order.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8E2D8] bg-white text-right">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-6 py-2 bg-[#121214] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#27272A] transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
