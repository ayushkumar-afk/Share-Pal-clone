import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ShieldCheck } from 'lucide-react';
import customerReviews from '../data/reviews';
import { GoogleIcon } from './common/RatingStars';

export const ReviewsCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-white/70 rounded-3xl border border-gray-200/80 p-4 sm:p-8 space-y-6">
      {/* Reviews Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Served more than <span className="text-[#8A2BE2]">1 Lakh Orders</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Read authentic reviews from gamers and gadget lovers across Bangalore and India.
          </p>
        </div>

        {/* Rating Badges + Navigation Arrows */}
        <div className="flex items-center gap-3">
          {/* Rating Summary */}
          <div className="flex items-center gap-2 bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-200">
            <GoogleIcon className="w-4 h-4" />
            <div className="flex items-center gap-1 text-xs font-bold text-gray-900">
              <span>4.8 / 5</span>
              <div className="flex text-[#E8AE19]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#E8AE19]" />
                ))}
              </div>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 transition-colors shadow-xs"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 transition-colors shadow-xs"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none pb-2 pt-1 snap-x snap-mandatory"
      >
        {customerReviews.map((rev) => (
          <div
            key={rev.id}
            className="flex flex-col justify-between gap-4 rounded-2xl md:rounded-3xl border border-gray-200/90 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all min-w-[280px] sm:min-w-[320px] max-w-[340px] shrink-0 snap-start"
          >
            {/* Top row: Google Icon + 5 Stars */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <GoogleIcon className="w-4 h-4" />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E8AE19] text-[#E8AE19]" />
                  ))}
                </div>
              </div>

              {/* Quote text */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-4 font-normal italic">
                “{rev.quote}”
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
              {/* Initials Avatar */}
              <div className="w-9 h-9 rounded-full bg-purple-100 text-[#4C187C] font-bold text-xs flex items-center justify-center shrink-0">
                {rev.initials}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                    {rev.name}
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                    ✓ Verified
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium truncate">
                  {rev.city} • {rev.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsCarousel;
