import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
        let borderColor = 'border-emerald-200';
        let bgGradient = 'from-emerald-50/90 to-white/95';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
          borderColor = 'border-rose-200';
          bgGradient = 'from-rose-50/90 to-white/95';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
          borderColor = 'border-amber-200';
          bgGradient = 'from-amber-50/90 to-white/95';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-[#c5a880] flex-shrink-0" />;
          borderColor = 'border-[#e5d7c3]';
          bgGradient = 'from-[#faf7f2]/95 to-white/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl backdrop-blur-md bg-gradient-to-r ${bgGradient} border ${borderColor} animate-slide-down transition-all duration-300`}
          >
            {icon}
            <div className="flex-1 text-left">
              <h4 className="text-sm font-semibold text-[#18181b] tracking-wide">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-[#52525b] mt-0.5 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#a1a1aa] hover:text-[#18181b] transition-colors p-1"
              aria-label="Close toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
