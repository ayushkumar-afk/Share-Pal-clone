import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import faqsData from '../data/faqs';

export const FAQSection = () => {
  // Allow toggling accordions, first item open by default
  const [openIds, setOpenIds] = useState([7]);

  const toggleAccordion = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-8 sm:py-12 space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-xl bg-purple-100 text-[#8A2BE2]">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Got questions? Everything you need to know about renting gaming gadgets from SharePal.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqsData.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden transition-all shadow-xs hover:border-purple-200"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-800 hover:text-[#4C187C] transition-colors"
              >
                <span className="pr-4 leading-snug">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-600 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#8A2BE2]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 pt-1 sm:px-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
