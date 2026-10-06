import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Truck, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRental } from '../context/RentalContext';

export const CartDrawer = () => {
  const { cart, cartOpen, setCartOpen, removeFromCart, cartTotal, selectedCity } = useRental();
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!cartOpen) return null;

  const handleCheckout = () => {
    setOrderPlaced(true);
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#9EFF00', '#8A2BE2', '#4C187C', '#F59E0B', '#3B82F6']
    });
    setTimeout(() => {
      // In real scenario redirects to checkout or keeps confirmed state
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between animate-slideLeft">
        {/* Cart Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-[#4C187C] text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#9EFF00]" />
            <h3 className="text-base sm:text-lg font-bold">Your Rental Cart</h3>
            <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-semibold">
              {cart.length}
            </span>
          </div>
          <button
            onClick={() => {
              setCartOpen(false);
              setOrderPlaced(false);
            }}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {orderPlaced ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Booking Request Placed!</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Thank you! Our {selectedCity} team will deliver your gaming setup at your doorstep with <strong>Zero Deposit</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 w-full text-left space-y-1">
                <div className="text-xs font-bold text-[#4C187C]">Order Confirmation Sent</div>
                <div className="text-xs text-gray-600">Free delivery to your {selectedCity} location.</div>
              </div>
              <button
                onClick={() => {
                  setCartOpen(false);
                  setOrderPlaced(false);
                }}
                className="w-full py-3 rounded-full bg-[#4C187C] text-white font-bold text-sm shadow-md"
              >
                Continue Browsing
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-gray-700">Your cart is currently empty</p>
              <p className="text-xs text-gray-400 max-w-xs">
                Pick your favorite gaming console or controller bundle and select rental dates!
              </p>
            </div>
          ) : (
            <>
              {/* Item cards */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3.5 rounded-2xl border border-gray-200 bg-white shadow-sm hover:border-purple-200 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-xl bg-gray-50 p-1 border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-purple-700 font-semibold mt-0.5">
                        {item.deliveryDate} → {item.pickupDate} ({item.days} Days)
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-[#4C187C]">
                          ₹{item.totalPrice}{' '}
                          <span className="text-[10px] text-gray-400 font-normal">
                            (₹{item.effectivePerDay}/day)
                          </span>
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guarantees Box */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50 to-emerald-50 border border-purple-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero Deposit: No caution deposit needed</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-800">
                  <Truck className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Free Doorstep Delivery & Return Pickup in {selectedCity}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Cart Footer */}
        {!orderPlaced && cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-gray-600">
                <span>Subtotal ({cart.length} items):</span>
                <span className="font-semibold text-gray-900">₹{cartTotal}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-600 font-semibold">
                <span>Security Deposit:</span>
                <span>₹0 (FREE)</span>
              </div>
              <div className="flex items-center justify-between text-blue-600 font-semibold">
                <span>Delivery Charges:</span>
                <span>FREE</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex items-center justify-between text-base font-bold text-gray-900">
                <span>Total Amount:</span>
                <span className="text-[#4C187C] text-lg font-black">₹{cartTotal}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-6 rounded-full bg-[#4C187C] hover:bg-[#3B1261] text-white font-bold text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#9EFF00]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
