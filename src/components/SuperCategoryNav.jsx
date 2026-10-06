import React from 'react';
import { superCategories } from '../data/categories';
import { useRental } from '../context/RentalContext';

export const SuperCategoryNav = () => {
  const { activeSuperCategory, setActiveSuperCategory } = useRental();

  return (
    <div className="sticky top-[68px] sm:top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/90 shadow-xs transition-all h-[44px] flex items-center">
      <div className="container mx-auto px-4 max-w-4xl h-full flex items-center justify-between sm:justify-center sm:gap-12 md:gap-16">
        {superCategories.map((category) => {
          const isActive = activeSuperCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveSuperCategory(category.id)}
              className="group relative flex flex-col items-center justify-center h-full px-3 text-xs sm:text-sm font-semibold transition-all shrink-0"
            >
              <span
                className={`transition-colors ${
                  isActive
                    ? 'text-[#4C187C] font-bold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category.name}
              </span>

              {/* Active Indicator Underline */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[#8A2BE2] shadow-xs" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SuperCategoryNav;
