import React from 'react';
import { subCategories } from '../data/categories';
import { useRental } from '../context/RentalContext';
import { Gamepad2, Flame, Tv, Box, Glasses, Disc, MonitorPlay } from 'lucide-react';

export const CategorySidebar = () => {
  const { activeSubCategory, setActiveSubCategory } = useRental();

  const getIcon = (fallback) => {
    switch (fallback) {
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5 text-[#8A2BE2]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-orange-500" />;
      case 'Tv': return <Tv className="w-5 h-5 text-[#8A2BE2]" />;
      case 'Box': return <Box className="w-5 h-5 text-emerald-600" />;
      case 'Glasses': return <Glasses className="w-5 h-5 text-indigo-500" />;
      case 'Disc': return <Disc className="w-5 h-5 text-red-500" />;
      case 'MonitorPlay': return <MonitorPlay className="w-5 h-5 text-purple-600" />;
      default: return <Gamepad2 className="w-5 h-5 text-[#8A2BE2]" />;
    }
  };

  return (
    <aside className="w-[72px] sm:w-[86px] md:w-[100px] lg:w-[110px] shrink-0">
      <div className="sticky top-[156px] lg:top-[144px] max-h-[calc(100vh-170px)] overflow-y-auto scrollbar-none rounded-2xl bg-white p-1.5 sm:p-2 shadow-sm border border-gray-200/80">
        <div className="flex flex-col gap-2.5 sm:gap-3.5 py-1">
          {subCategories.map((sub) => {
            const isActive = activeSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubCategory(sub.id)}
                className="group flex flex-col items-center justify-center gap-1 transition-all"
              >
                {/* Image / Icon container */}
                <div
                  className={`relative flex aspect-square w-11 sm:w-12 md:w-14 items-center justify-center overflow-hidden rounded-xl p-1 transition-all ${
                    isActive
                      ? 'border-2 border-[#8A2BE2] bg-purple-50/80 shadow-xs scale-105'
                      : 'border border-gray-200 bg-gray-50/80 hover:border-purple-300 hover:bg-gray-100/80'
                  }`}
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      // Graceful fallback to icon if image fails to load
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector('.fallback-icon')) {
                        const fallbackDiv = document.createElement('div');
                        fallbackDiv.className = 'fallback-icon flex items-center justify-center';
                        parent.appendChild(fallbackDiv);
                      }
                    }}
                  />
                  {/* Subtle icon backdrop */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
                    {getIcon(sub.iconFallback)}
                  </div>
                </div>

                {/* Subcategory Label */}
                <span
                  className={`text-center text-[10px] sm:text-[11px] font-bold leading-tight line-clamp-2 max-w-[68px] transition-colors ${
                    isActive
                      ? 'text-[#8A2BE2]'
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}
                >
                  {sub.name}
                  {isActive && (
                    <div className="mx-auto mt-0.5 h-[2px] w-4 rounded-full bg-[#8A2BE2]" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
