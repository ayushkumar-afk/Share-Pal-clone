import React, { useState } from 'react';
import bangaloreContent from '../data/bangaloreInfo';
import { ChevronDown, MapPin, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GoogleIcon } from './common/RatingStars';

export const BangaloreSeoSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { seoArticle, usps } = bangaloreContent;

  return (
    <section className="py-8 sm:py-12 border-t border-gray-200">
      {/* USPS Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
        {usps.map((usp, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#8A2BE2] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">{usp.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{usp.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Bangalore Article */}
      <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-8 space-y-6">
        {/* Article Title */}
        <div className="flex items-center gap-2 text-[#4C187C]">
          <MapPin className="w-5 h-5 text-[#8A2BE2]" />
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900">
            {seoArticle.title}
          </h2>
        </div>

        {/* Intro Paragraph */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {seoArticle.intro}
        </p>

        {/* Expandable Deep Content */}
        <div className={`space-y-6 transition-all overflow-hidden ${isExpanded ? 'block' : 'max-h-72 overflow-hidden relative'}`}>
          {!isExpanded && (
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          )}

          {/* Categories Grid */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 border-b pb-2">
              Categories on Rent in Bangalore
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {seoArticle.categories.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/60">
                  <h4 className="text-xs sm:text-sm font-bold text-purple-900 mb-1">
                    {cat.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Renting vs Buying */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 border-b pb-2">
              Why Renting Beats Buying
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {seoArticle.rentingVsBuying.map((rvb, idx) => (
                <div key={idx} className="flex gap-2.5 items-start p-3 rounded-xl bg-purple-50/40 border border-purple-100">
                  <span className="text-xs font-bold text-[#8A2BE2] mt-0.5">✓</span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-gray-900">{rvb.title}</h5>
                    <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">{rvb.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why SharePal in Bangalore */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 border-b pb-2">
              Why SharePal in Bangalore
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              {seoArticle.whySharePal.map((why, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 font-black">•</span>
                  <span>
                    <strong className="text-gray-900">{why.title}:</strong> {why.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Reviews Links */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-4">
            <span className="text-xs font-bold text-gray-700">Read Bangalore Customer Reviews:</span>
            {seoArticle.reviewsLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 transition-colors"
              >
                <GoogleIcon className="w-3.5 h-3.5" />
                <span>{link.title}</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            ))}
          </div>
        </div>

        {/* Read More / Read Less Toggle */}
        <div className="text-center pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-purple-200 text-xs font-bold text-[#8A2BE2] hover:bg-purple-50 transition-colors"
          >
            <span>{isExpanded ? 'Show Less' : 'Read More About SharePal Bangalore'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BangaloreSeoSection;
