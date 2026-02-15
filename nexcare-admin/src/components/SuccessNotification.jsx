import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

export function SuccessNotification({ message, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 right-6 z-[70] animate-in slide-in-from-right-full duration-300">
      <div className="bg-white rounded-xl shadow-2xl border-l-4 border-green-500 p-4 flex items-center gap-4 min-w-[300px]">
        <div className="bg-green-100 p-2 rounded-full">
            <Check size={24} className="text-green-600" />
        </div>
        <div>
            <h3 className="font-bold text-gray-900">Success!</h3>
            <p className="text-sm text-gray-500">{message}</p>
        </div>
      </div>
    </div>
  );
}
