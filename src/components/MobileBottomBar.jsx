import React from 'react';
import { Calendar, ShoppingBag, ArrowRight } from 'lucide-react';
import { useRental } from '../context/RentalContext';

export const MobileBottomBar = () => {
  const {
    openDateModal,
    hasCustomDates,
    deliveryDate,
    pickupDate,
    rentalDays,
    cart,
    setCartOpen,
    cartTotal
  } = useRental();

  const formattedStart = deliveryDate
    ? deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    : '';

  const formattedEnd = pickupDate
    ? pickupDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    : '';

  return (
    <>
      {/* Floating Bottom Date Pill */}
      <div className="fixed bottom-4 left-4 right-4 z-30 mx-auto flex max-w-max justify-center pointer-events-auto">
        {cart.length > 0 ? (
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#4C187C] text-white shadow-2xl border-2 border-[#9EFF00] hover:scale-102 active:scale-98 transition-all animate-bounce-subtle"
          >
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-[#9EFF00]" />
              <span className="text-xs font-bold">{cart.length} item{cart.length > 1 ? 's' : ''} in cart</span>
            </div>
            <span className="h-4 w-[1px] bg-white/20" />
            <span className="text-xs font-black text-[#9EFF00]">₹{cartTotal}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => openDateModal()}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#4C187C] hover:bg-[#3d1363] text-white shadow-2xl border-2 border-[#8A2BE2] hover:scale-102 active:scale-98 transition-all group"
          >
            <Calendar className="w-4 h-4 text-[#9EFF00] group-hover:rotate-6 transition-transform" />
            <span className="text-xs sm:text-sm font-bold tracking-wide">
              {hasCustomDates
                ? `${formattedStart} - ${formattedEnd} (${rentalDays} Days)`
                : 'Select rental dates to view prices'}
            </span>
          </button>
        )}
      </div>
    </>
  );
};

export default MobileBottomBar;
