import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Shield, Truck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRental } from '../context/RentalContext';

export const DateSelectionModal = () => {
  const {
    dateModalOpen,
    closeDateModal,
    deliveryDate,
    pickupDate,
    applyDates,
    modalTargetProduct,
    calculatePrice,
    addToCart,
    selectedCity
  } = useRental();

  // Local state for calendar selection before confirming
  const [tempStart, setTempStart] = useState(deliveryDate || new Date());
  const [tempEnd, setTempEnd] = useState(pickupDate || new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (dateModalOpen) {
      if (deliveryDate) setTempStart(new Date(deliveryDate));
      if (pickupDate) setTempEnd(new Date(pickupDate));
    }
  }, [dateModalOpen, deliveryDate, pickupDate]);

  if (!dateModalOpen) return null;

  // Helpers for calendar
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calculate local rental days
  const calculateDaysBetween = (start, end) => {
    if (!start || !end) return 1;
    const diff = Math.abs(end - start);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const localDays = calculateDaysBetween(tempStart, tempEnd);

  // Quick preset handlers
  const handleQuickPreset = (daysCount) => {
    const start = new Date(today);
    start.setDate(start.getDate() + 1); // starts tomorrow
    const end = new Date(start);
    end.setDate(end.getDate() + daysCount);

    setTempStart(start);
    setTempEnd(end);
  };

  const handleDayClick = (dayNumber) => {
    const clickedDate = new Date(year, month, dayNumber);
    clickedDate.setHours(0, 0, 0, 0);

    // If past or today (orders need at least 1 day prep or tomorrow delivery)
    if (clickedDate <= today) return;

    if (!tempStart || (tempStart && tempEnd)) {
      // Start new range selection
      setTempStart(clickedDate);
      const autoEnd = new Date(clickedDate);
      autoEnd.setDate(autoEnd.getDate() + 3);
      setTempEnd(autoEnd);
    } else if (tempStart && !tempEnd) {
      if (clickedDate < tempStart) {
        setTempStart(clickedDate);
      } else {
        setTempEnd(clickedDate);
      }
    }
  };

  const isSelectedDate = (dayNumber) => {
    if (!dayNumber) return false;
    const d = new Date(year, month, dayNumber);
    d.setHours(0, 0, 0, 0);

    const s = tempStart ? new Date(tempStart).setHours(0, 0, 0, 0) : null;
    const e = tempEnd ? new Date(tempEnd).setHours(0, 0, 0, 0) : null;

    return (s && d.getTime() === s) || (e && d.getTime() === e);
  };

  const isInRange = (dayNumber) => {
    if (!dayNumber || !tempStart || !tempEnd) return false;
    const d = new Date(year, month, dayNumber);
    d.setHours(0, 0, 0, 0);

    const s = new Date(tempStart).setHours(0, 0, 0, 0);
    const e = new Date(tempEnd).setHours(0, 0, 0, 0);

    return d.getTime() > s && d.getTime() < e;
  };

  const isPast = (dayNumber) => {
    const d = new Date(year, month, dayNumber);
    d.setHours(0, 0, 0, 0);
    return d <= today;
  };

  // Pricing calculations
  const productPriceInfo = modalTargetProduct
    ? calculatePrice(modalTargetProduct.per_day_rent, localDays)
    : null;

  const handleConfirm = () => {
    applyDates(tempStart, tempEnd);
    if (modalTargetProduct) {
      addToCart(modalTargetProduct, localDays);
    }
    // Celebratory SharePal confetti animation
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#9EFF00', '#8A2BE2', '#4C187C', '#F59E0B']
    });
    closeDateModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 my-auto animate-scaleUp">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-[#4C187C] to-[#6b21a8] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl">
              <CalendarIcon className="w-5 h-5 text-[#9EFF00]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">Select Rental Dates</h3>
              <p className="text-xs text-purple-200">
                Doorstep delivery & pickup in {selectedCity}
              </p>
            </div>
          </div>
          <button
            onClick={closeDateModal}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Target Product Preview (if opened from product card) */}
          {modalTargetProduct && (
            <div className="flex items-center gap-3 sm:gap-4 p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100">
              <img
                src={modalTargetProduct.image}
                alt={modalTargetProduct.name}
                className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-purple-100 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A2BE2]">
                  Selected Console
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                  {modalTargetProduct.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 line-through">
                    ₹{modalTargetProduct.per_day_rent * 2}/day
                  </span>
                  <span className="text-xs font-bold text-[#4C187C]">
                    From ₹{modalTargetProduct.per_day_rent}/day
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Quick preset buttons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Popular Durations:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '2 Days (Weekend)', days: 2 },
                { label: '3 Days (Standard)', days: 3 },
                { label: '7 Days (Week - 15% Off)', days: 7 },
                { label: '14 Days (2 Weeks - 25% Off)', days: 14 },
                { label: '30 Days (Month - 35% Off)', days: 30 },
              ].map((preset) => (
                <button
                  key={preset.days}
                  onClick={() => handleQuickPreset(preset.days)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    localDays === preset.days
                      ? 'bg-[#4C187C] text-white shadow-sm ring-2 ring-purple-300'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl border-2 border-purple-200 bg-purple-50/50">
              <span className="text-[11px] font-semibold text-purple-700 block uppercase">
                🚚 Delivery Date
              </span>
              <span className="text-sm sm:text-base font-bold text-gray-900 block mt-0.5">
                {tempStart ? tempStart.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Select'}
              </span>
              <span className="text-[10px] text-gray-500">By 10:00 AM - 1:00 PM</span>
            </div>

            <div className="p-3 rounded-2xl border-2 border-purple-200 bg-purple-50/50">
              <span className="text-[11px] font-semibold text-purple-700 block uppercase">
                📦 Return / Pickup Date
              </span>
              <span className="text-sm sm:text-base font-bold text-gray-900 block mt-0.5">
                {tempEnd ? tempEnd.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Select'}
              </span>
              <span className="text-[10px] text-gray-500">After 6:00 PM</span>
            </div>
          </div>

          {/* Calendar View */}
          <div className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Month & Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h4 className="text-sm font-bold text-gray-900">
                {monthNames[month]} {year}
              </h4>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                <span key={d} className="text-xs font-semibold text-gray-400 py-1">
                  {d}
                </span>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="h-9" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const past = isPast(day);
                const selected = isSelectedDate(day);
                const inRange = isInRange(day);

                return (
                  <button
                    key={day}
                    disabled={past}
                    onClick={() => handleDayClick(day)}
                    className={`h-9 w-full rounded-xl text-xs font-semibold transition-all relative flex items-center justify-center ${
                      past
                        ? 'text-gray-300 cursor-not-allowed'
                        : selected
                        ? 'bg-[#4C187C] text-white shadow-md font-bold scale-105 z-10'
                        : inRange
                        ? 'bg-purple-100 text-[#4C187C] rounded-none'
                        : 'hover:bg-purple-50 text-gray-800'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Rental Tenure:</span>
              <span className="font-bold text-gray-900">{localDays} Days</span>
            </div>

            {productPriceInfo && (
              <>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Effective Daily Rate:</span>
                  <span className="font-semibold text-gray-900">
                    ₹{productPriceInfo.perDay} / day
                  </span>
                </div>
                {productPriceInfo.savings > 0 && (
                  <div className="flex items-center justify-between text-xs text-emerald-600 font-medium">
                    <span>Duration Discount:</span>
                    <span>-₹{productPriceInfo.savings}</span>
                  </div>
                )}
                <div className="h-px bg-gray-200 my-1" />
                <div className="flex items-center justify-between text-sm font-bold text-gray-900">
                  <span>Total Rental:</span>
                  <span className="text-[#4C187C] text-base">₹{productPriceInfo.total}</span>
                </div>
              </>
            )}

            {/* Zero Deposit & Free Delivery Guarantees */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200/60 text-[11px] text-gray-500">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <Shield className="w-3.5 h-3.5" /> Zero Deposit (₹0)
              </span>
              <span className="flex items-center gap-1 text-blue-600 font-semibold">
                <Truck className="w-3.5 h-3.5" /> Free Doorstep Delivery
              </span>
              <span className="flex items-center gap-1 text-purple-600 font-semibold">
                <Zap className="w-3.5 h-3.5" /> Pay on Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-gray-100 border-t border-gray-200 flex items-center justify-between gap-3">
          <button
            onClick={closeDateModal}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 max-w-xs flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#4C187C] hover:bg-[#3B1261] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-[#9EFF00]" />
            {modalTargetProduct
              ? `Rent for ${localDays} Days (₹${productPriceInfo?.total || 0})`
              : `Apply ${localDays} Days`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelectionModal;
