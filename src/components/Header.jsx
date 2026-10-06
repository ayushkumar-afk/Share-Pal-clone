import React, { useState } from 'react';
import { MapPin, Calendar, Search, ShoppingBag, User, ChevronDown, X } from 'lucide-react';
import SharePalLogo from './common/SharePalLogo';
import { useRental } from '../context/RentalContext';

export const Header = () => {
  const {
    selectedCity,
    setCityModalOpen,
    deliveryDate,
    pickupDate,
    rentalDays,
    hasCustomDates,
    openDateModal,
    cart,
    setCartOpen,
    searchQuery,
    setSearchQuery
  } = useRental();

  const [showSearchInput, setShowSearchInput] = useState(false);

  const formattedDelivery = deliveryDate
    ? deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    : 'Delivery Date';

  const formattedPickup = pickupDate
    ? pickupDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    : 'Pickup Date';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#4C187C] h-[68px] sm:h-[72px] flex items-center shadow-md">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 h-full flex items-center justify-between">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between w-full h-full gap-4">
          {/* Left: Brand Logo hanging tab */}
          <div className="flex items-start h-full">
            <a href="#top" className="flex items-center group h-full">
              <div className="flex h-[56px] sm:h-[60px] w-38 sm:w-42 items-center justify-center rounded-b-2xl bg-[#8A2BE2] px-3.5 shadow-md group-hover:bg-[#7c25cc] transition-colors">
                <SharePalLogo />
              </div>
            </a>
          </div>

          {/* Middle: City Selector + Rental Dates Pill */}
          <div className="flex items-center rounded-full border-2 border-[#8A2BE2] bg-white p-1 shadow-xs max-w-xl">
            {/* City Selector */}
            <button
              type="button"
              onClick={() => setCityModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-l-full bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-colors shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 text-[#8A2BE2]" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {/* Date Range Selector */}
            <div
              onClick={() => openDateModal()}
              role="button"
              tabIndex={0}
              className="flex items-center gap-2.5 px-3 py-1 cursor-pointer text-xs font-semibold text-gray-700 hover:text-purple-900 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#8A2BE2]" />
                <span>{hasCustomDates ? formattedDelivery : 'Delivery Date'}</span>
              </div>
              <span className="h-4 w-[1px] bg-gray-300" />
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                <span>{hasCustomDates ? `${formattedPickup} (${rentalDays}d)` : 'Pickup Date'}</span>
              </div>
            </div>

            {/* Select Dates Purple Button */}
            <button
              onClick={() => openDateModal()}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#4C187C] hover:bg-[#3d1363] text-white text-xs font-bold transition-all shadow-xs shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 text-[#9EFF00]" />
              <span>{hasCustomDates ? 'Change' : 'Select'}</span>
            </button>
          </div>

          {/* Right: Search, Cart, Profile */}
          <div className="flex items-center gap-2 sm:gap-3 text-white">
            {/* Search Input / Toggle */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5 border border-purple-400/40">
                  <Search className="w-4 h-4 text-purple-200 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search PS5, Xbox, games..."
                    className="bg-transparent text-xs text-white placeholder-purple-200 outline-none w-44"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowSearchInput(false);
                    }}
                    className="text-purple-300 hover:text-white ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors"
                  title="Search items"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#9EFF00] text-[#4C187C] font-black text-[10px] flex items-center justify-center shadow-md animate-scaleUp">
                  {cart.length}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-purple-700/60">
              <div className="w-8 h-8 rounded-full bg-white text-[#4C187C] flex items-center justify-center font-bold text-xs shadow-xs">
                <User className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white/90 hidden xl:inline">
                Hi, Login
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex lg:hidden flex-col gap-2 w-full py-1.5">
          {/* Top row: Logo, City, Cart, Profile */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#top" className="flex items-center">
              <div className="bg-[#8A2BE2] px-3 py-1 rounded-b-xl shadow-xs">
                <SharePalLogo className="h-5" />
              </div>
            </a>

            {/* Right actions on mobile */}
            <div className="flex items-center gap-2">
              {/* City Pill */}
              <button
                type="button"
                onClick={() => setCityModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-purple-400/30 text-white text-[11px] font-semibold"
              >
                <MapPin className="w-3 h-3 text-[#9EFF00]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-purple-200" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-1.5 rounded-full bg-white/10 text-white"
              >
                <ShoppingBag className="w-4 h-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#9EFF00] text-[#4C187C] text-[9px] font-bold flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* User Avatar */}
              <div className="w-7 h-7 rounded-full bg-white text-[#4C187C] flex items-center justify-center text-xs font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Bottom row: Rental Dates Pill on Mobile */}
          <div className="flex items-center justify-between rounded-full border-2 border-[#8A2BE2] bg-white px-3 py-1 shadow-xs">
            <div
              onClick={() => openDateModal()}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer flex-1"
            >
              <Calendar className="w-3.5 h-3.5 text-[#8A2BE2]" />
              <span className="truncate">
                {hasCustomDates
                  ? `${formattedDelivery} - ${formattedPickup} (${rentalDays}d)`
                  : 'Select Rental Dates'}
              </span>
            </div>

            <button
              onClick={() => openDateModal()}
              className="flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#4C187C] text-white text-[11px] font-bold shrink-0"
            >
              <Calendar className="w-3 h-3 text-[#9EFF00]" />
              <span>{hasCustomDates ? 'Change' : 'Select'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
