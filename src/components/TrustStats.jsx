import React from 'react';
import bangaloreContent from '../data/bangaloreInfo';
import { Award, Leaf, Users, ShieldCheck } from 'lucide-react';

export const TrustStats = () => {
  const { stats } = bangaloreContent;

  const icons = [
    <Award className="w-6 h-6 text-amber-500" />,
    <Leaf className="w-6 h-6 text-emerald-500" />,
    <Users className="w-6 h-6 text-blue-500" />
  ];

  return (
    <section className="py-8">
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-[#4C187C] to-purple-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-purple-700/60">
          {stats.map((s, idx) => (
            <div key={idx} className="pt-4 md:pt-0 px-4 flex flex-col items-center space-y-1">
              <div className="p-3 bg-white/10 rounded-2xl mb-2 backdrop-blur-xs">
                {icons[idx]}
              </div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#9EFF00] font-ubuntu">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                {s.label}
              </div>
              <p className="text-[11px] sm:text-xs text-purple-200">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
