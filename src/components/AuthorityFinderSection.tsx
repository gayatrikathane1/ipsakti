import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_AUTHORITIES } from '../data/officialAuthorities';
import { Landmark, ExternalLink, ShieldCheck, Info, Search } from 'lucide-react';

export const AuthorityFinderSection: React.FC = () => {
  const { openChatWithPrompt, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Patent',
    'Legal',
    'Traditional Knowledge',
    'Ayurveda',
    'Research',
    'Biodiversity',
    'Food Regulation',
    'International'
  ];

  const filteredAuthorities = OFFICIAL_AUTHORITIES.filter((auth) => {
    const matchesCat = selectedCategory === 'All' || auth.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      auth.name.toLowerCase().includes(q) ||
      auth.domain.toLowerCase().includes(q) ||
      auth.provides.toLowerCase().includes(q) ||
      auth.usefulFor.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-4 shadow-sm">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold">
          <Landmark className="w-3.5 h-3.5 text-emerald-700" />
          <span>Official Government Directory</span>
        </div>

        <h1 className="text-3xl font-black text-emerald-950 tracking-tight">
          📍 {t('authorities.title', 'FIND RELEVANT AUTHORITY')}
        </h1>

        <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-3xl">
          {t('authorities.subtitle')} Find exact official statutory authorities for Patents, Traditional Knowledge, Ayush Regulations, FSSAI Food Laws, and Biodiversity Clearances.
        </p>

        {/* Notice Card */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs font-bold flex items-center space-x-2">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{t('authorities.notice')} ATREYA is an AI research assistant that directs users to the relevant official government portal.</span>
        </div>

        {/* Search Bar & Filters */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patent office, TKDL, FSSAI, National Biodiversity Authority, or WIPO..."
              className="w-full bg-white border border-emerald-300 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-white text-slate-700 hover:text-emerald-900 border border-emerald-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Authority Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredAuthorities.map((auth) => (
          <div
            key={auth.id}
            className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-xs hover:border-emerald-400 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  🏛️ {auth.officialStatus}
                </span>
                <span className="text-[10px] font-bold text-slate-500">{auth.category}</span>
              </div>

              <h3 className="text-base font-bold text-emerald-950">{auth.name}</h3>

              <div className="space-y-1 text-xs">
                <p className="text-slate-600 font-semibold">
                  <strong className="text-emerald-900">Domain:</strong> {auth.domain}
                </p>
                <p className="text-slate-700 leading-relaxed font-medium bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                  <strong className="text-emerald-900">What it Provides:</strong> {auth.provides}
                </p>
                <p className="text-slate-700 leading-relaxed font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <strong className="text-emerald-900">Useful For:</strong> {auth.usefulFor}
                </p>
              </div>

              {/* Why This Source */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1 text-xs">
                <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Why this source?
                </span>
                <p className="text-slate-800 font-medium italic text-[11px]">
                  {auth.whyThisSource}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
              <button
                onClick={() => openChatWithPrompt(`Provide statutory guidance from ${auth.name}`)}
                className="text-emerald-800 hover:underline font-bold cursor-pointer"
              >
                Ask AI Assistant →
              </button>

              <a
                href={auth.url}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow"
              >
                <span>Open Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
