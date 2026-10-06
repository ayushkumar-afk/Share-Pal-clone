import React from 'react';
import { Star, ShieldCheck, Calendar, ThumbsUp, Check } from 'lucide-react';
import { useRental } from '../context/RentalContext';
import { ProductTagBadge } from './common/RatingStars';

export const ProductCard = ({ product }) => {
  const { openDateModal, calculatePrice, rentalDays, hasCustomDates, addToCart } = useRental();

  const isVoteToLaunch = product.tag?.toLowerCase().includes('vote');
  const isOutOfStock = product.out_of_stock;

  // Price calculations
  const priceInfo = calculatePrice(product.per_day_rent, rentalDays);

  const handleAction = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    if (isVoteToLaunch) {
      alert(`Thank you for voting to launch ${product.name}! We will notify you when it's available.`);
      return;
    }
    // Open dynamic date selection modal pre-filled with this product
    openDateModal(product);
  };

  return (
    <div
      onClick={handleAction}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-3.5 sm:p-4 transition-all duration-300 cursor-pointer ${
        isOutOfStock
          ? 'border-gray-200 opacity-80'
          : 'border-gray-200/90 hover:border-purple-300 hover:shadow-card-hover hover:-translate-y-1'
      }`}
    >
      {/* Top Badges: Tag and Stock */}
      <div className="flex items-start justify-between gap-1 mb-2 z-10">
        <div>
          {product.tag ? (
            <ProductTagBadge tag={product.tag} />
          ) : (
            <span className="inline-block h-5" />
          )}
        </div>

        {isOutOfStock ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200">
            Out of Stock
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            In Stock
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative aspect-4/3 w-full flex items-center justify-center p-2 mb-3 bg-gray-50/60 rounded-xl overflow-hidden group-hover:bg-purple-50/30 transition-colors">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-108"
          onError={(e) => {
            e.currentTarget.src = 'https://images.sharepal.in/sub-category-card/ps5-console-on-rent-sharepal.webp';
          }}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-gray-900/80 text-white text-xs font-bold shadow-md">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        {/* Title */}
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#4C187C] transition-colors">
          {product.name}
        </h3>

        {/* Rating & Booked Count */}
        <div className="flex items-center gap-2 text-xs">
          {product.rating > 0 ? (
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              <Star className="w-3.5 h-3.5 fill-[#E8AE19] text-[#E8AE19]" />
              <span className="text-xs font-bold text-gray-800">{product.rating}</span>
            </div>
          ) : (
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
              ⭐ New Arrival
            </span>
          )}

          {product.booked_count > 0 && (
            <span className="text-[11px] text-gray-500 font-medium truncate">
              {product.booked_count.toLocaleString()}+ booked
            </span>
          )}
        </div>

        {/* Pricing Area */}
        <div className="pt-2 border-t border-gray-100 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-gray-900">
                ₹{hasCustomDates ? priceInfo.total : product.per_day_rent}
              </span>
              <span className="text-[11px] text-gray-500 font-medium">
                {hasCustomDates ? `for ${rentalDays}d` : '/day'}
              </span>
            </div>
            {hasCustomDates && (
              <span className="text-[10px] text-emerald-600 font-semibold block">
                ₹{priceInfo.perDay}/day effective
              </span>
            )}
          </div>

          <span className="flex items-center gap-0.5 text-[10px] text-gray-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> ₹0 Deposit
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAction}
          disabled={isOutOfStock}
          className={`w-full py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 mt-2 ${
            isOutOfStock
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : isVoteToLaunch
              ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm hover:shadow-md'
              : 'bg-[#4C187C] hover:bg-[#391060] text-white shadow-sm hover:shadow-md active:scale-98'
          }`}
        >
          {isOutOfStock ? (
            'Out of Stock'
          ) : isVoteToLaunch ? (
            <>
              <ThumbsUp className="w-3.5 h-3.5 text-[#9EFF00]" />
              <span>Vote to Launch</span>
            </>
          ) : hasCustomDates ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#9EFF00]" />
              <span>Rent for ₹{priceInfo.total}</span>
            </>
          ) : (
            <>
              <Calendar className="w-3.5 h-3.5 text-[#9EFF00]" />
              <span>Select Rental Dates</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
