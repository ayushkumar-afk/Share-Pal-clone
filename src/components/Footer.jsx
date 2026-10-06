import React from 'react';
import SharePalLogo from './common/SharePalLogo';
import { ShieldCheck, Heart, MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { useRental } from '../context/RentalContext';

export const Footer = () => {
  const { selectedCity } = useRental();

  const rentalCategories = [
    'Action Cameras', 'Cameras', 'Trekking Gear', 'Riding Gear',
    'Creator Gear', 'Gaming Console', 'Winter Wear', 'Camping Gear',
    'Audio Visual Equipment', 'PS5 Consoles', 'Xbox Series X', 'VR Headsets'
  ];

  return (
    <footer className="bg-[#1F2937] text-gray-300 pt-12 pb-24 md:pb-12 border-t border-gray-800">
      <div className="container mx-auto px-4 lg:px-8 space-y-10">
        {/* Top: Categories link cloud */}
        <div className="border-b border-gray-700/80 pb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
            Popular Rental Categories in {selectedCity}
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            {rentalCategories.map((cat, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors cursor-pointer"
              >
                {cat} on Rent
              </span>
            ))}
          </div>
        </div>

        {/* Middle: Links columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          {/* Col 1: Brand & Contact */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="bg-[#4C187C] inline-block p-2 rounded-xl">
              <SharePalLogo className="h-6" />
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              India's most trusted lifestyle gear & gaming console rental platform. Zero deposit, free doorstep delivery.
            </p>
            <div className="space-y-1.5 pt-2 text-[11px] text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#9EFF00] shrink-0" />
                <span>Koramangala, Bangalore, Karnataka</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#9EFF00] shrink-0" />
                <span>+91 76192 20543</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9EFF00] shrink-0" />
                <span>care@sharepal.in</span>
              </div>
            </div>
          </div>

          {/* Col 2: SharePal */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">SharePal</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#top" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Why SharePal</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Zero Deposit Guarantee</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Col 3: Become a Pal */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Become a Pal</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#top" className="hover:text-white transition-colors">Partner With Us</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Rent Your Gear</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Franchise Opportunities</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Creator Program</a></li>
            </ul>
          </div>

          {/* Col 4: Information */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Information</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#top" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Verification Process</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Hygiene & Sanitization</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Col 5: Policies */}
          <div className="space-y-2.5">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">Policies</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#top" className="hover:text-white transition-colors">Cancellation & Refund</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#top" className="hover:text-white transition-colors">Rental Agreement</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span>© 2026 SharePal Technologies Pvt. Ltd. Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>in Bangalore.</span>
          </div>

          {/* Zero Deposit Badge */}
          <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-1 rounded-full border border-gray-700 text-gray-300">
            <ShieldCheck className="w-4 h-4 text-[#9EFF00]" />
            <span className="font-semibold text-[11px]">100% Zero Deposit Assured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
