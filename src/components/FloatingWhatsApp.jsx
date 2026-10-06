import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useRental } from '../context/RentalContext';

export const FloatingWhatsApp = () => {
  const { selectedCity } = useRental();

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi SharePal! I would like to rent gaming gear in ${selectedCity}.`);
    window.open(`https://wa.me/917619220543?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed right-4 bottom-20 md:bottom-8 z-40 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all group"
      aria-label="Chat on WhatsApp"
      title="Chat with Bangalore Support"
    >
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7 fill-white" />
      <span className="hidden group-hover:flex absolute right-16 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg">
        Need Help? Chat on WhatsApp
      </span>
    </button>
  );
};

export default FloatingWhatsApp;
