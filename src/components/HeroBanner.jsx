import React from 'react';
import { useRental } from '../context/RentalContext';
import { ShieldCheck, Star, Zap } from 'lucide-react';
import bangaloreContent from '../data/bangaloreInfo';

export const HeroBanner = () => {
  const { selectedCity } = useRental();
  const { hero } = bangaloreContent;

  return (
    <div
      className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-md border border-purple-800/20 text-white min-h-[150px] sm:min-h-[180px] md:min-h-[200px] flex items-center justify-center mb-6"
      style={{
        background: 'linear-gradient(360deg, #8A2BE2 0%, #4C187C 100%)'
      }}
    >
      {/* Decorative Left Visual (Gaming Console / Controllers) */}
      <div className="absolute -left-2 sm:-left-4 -bottom-6 hidden sm:block w-36 sm:w-48 md:w-56 lg:w-60 pointer-events-none select-none z-0 opacity-90">
        <img
          src={hero.bannerLeft}
          alt="Gaming Console"
          className="w-full h-auto object-contain drop-shadow-lg"
          onError={(e) => {
            e.currentTarget.src = hero.fallbackLeft;
          }}
        />
      </div>

      {/* Decorative Right Visual (Kratos / Controller) */}
      <div className="absolute -right-2 sm:-right-4 -bottom-6 hidden sm:block w-36 sm:w-48 md:w-56 lg:w-60 pointer-events-none select-none z-0 opacity-90">
        <img
          src={hero.bannerRight}
          alt="Controller & Accessories"
          className="w-full h-auto object-contain drop-shadow-lg"
          onError={(e) => {
            e.currentTarget.src = hero.fallbackRight;
          }}
        />
      </div>

      {/* Central Content */}
      <div className="relative z-10 w-full px-4 sm:px-12 md:px-20 py-5 sm:py-6 text-center flex flex-col items-center justify-center space-y-2">
        {/* Title */}
        <h1 className="font-ubuntu text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white drop-shadow-md">
          {hero.title}
        </h1>

        {/* Subtitle */}
        <h2 className="text-xs sm:text-sm md:text-base font-medium text-purple-100 max-w-lg mx-auto leading-relaxed drop-shadow-xs">
          {hero.subtitle}
        </h2>

        {/* Compact trust badges */}
        <div className="pt-1.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-semibold text-purple-100">
          <span className="flex items-center gap-1 bg-black/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9EFF00]" /> Zero Deposit
          </span>
          <span className="flex items-center gap-1 bg-black/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            <Zap className="w-3.5 h-3.5 text-amber-300" /> Free Doorstep Delivery
          </span>
          <span className="flex items-center gap-1 bg-black/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> 4.8/5 Rated
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
