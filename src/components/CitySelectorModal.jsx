import React from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { useRental } from '../context/RentalContext';
import { availableCities } from '../data/categories';

export const CitySelectorModal = () => {
  const { selectedCity, setSelectedCity, cityModalOpen, setCityModalOpen } = useRental();

  if (!cityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#4C187C] text-white">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#9EFF00]" />
            <h3 className="text-lg font-bold">Select Your City</h3>
          </div>
          <button
            onClick={() => setCityModalOpen(false)}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* City list */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
            Popular Cities (Doorstep Delivery Available)
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {availableCities.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city.name);
                    setCityModalOpen(false);
                  }}
                  className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#8A2BE2] bg-purple-50 text-[#4C187C] font-bold shadow-sm'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <div>
                    <div className="text-sm font-semibold">{city.name}</div>
                    <div className="text-[11px] text-gray-400">{city.state}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#8A2BE2]" />}
                </button>
              );
            })}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-purple-50 border border-purple-100 flex items-start gap-3">
            <span className="text-xl">🚀</span>
            <p className="text-xs text-purple-900 leading-relaxed">
              <strong>Free doorstep delivery & return</strong> is fully active across Bangalore and major tech corridors!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelectorModal;
