import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OFFICIAL_AUTHORITIES } from '../data/officialAuthorities';
import { Landmark, Search, ExternalLink, ShieldCheck, Filter } from 'lucide-react';
import { WhyThisSourceModal } from './WhyThisSourceModal';
import type { OfficialSource } from '../types/ip';

export const OfficialResourceDirectory: React.FC = () => {
  const { openChatWithPrompt, t } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSourceForWhy, setSelectedSourceForWhy] = useState<OfficialSource | null>(null);

  const filterOptions = [
    'All',
    'Government',
    'Legal',
    'Patent',
    'Trademark',
    'Design',
    'GI',
    'Ayurveda',
    'Traditional Knowledge',
    'Biodiversity',
    'Food Regulation',
    'Research',
    'International',
  ];

  const getTrustBadge = (category: string) => {
    if (category === 'International') return '🌍 INTERNATIONAL OFFICIAL SOURCE';
    if (category === 'Research') return '🔵 OFFICIAL RESEARCH SOURCE';
    if (category === 'Biodiversity' || category === 'Food Regulation') return '🟣 STATUTORY AUTHORITY';
    return '🟢 OFFICIAL GOVERNMENT SOURCE';
  };

  const filteredResources = OFFICIAL_AUTHORITIES.filter((res) => {
    const matchesFilter =
      selectedFilter === 'All' ||
      res.category === selectedFilter ||
      res.officialStatus.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      res.domain.toLowerCase().includes(selectedFilter.toLowerCase());

    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      res.name.toLowerCase().includes(q) ||
      res.domain.toLowerCase().includes(q) ||
      res.provides.toLowerCase().includes(q) ||
      res.usefulFor.toLowerCase().includes(q);

    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-4 shadow-sm">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold">
          <Landmark className="w-3.5 h-3.5 text-emerald-700" />
          <span>Statutory & Research Portal Directory</span>
        </div>

        <h1 className="text-3xl font-black text-emerald-950 tracking-tight">
          🏛️ {t('directory.title', 'OFFICIAL GOVERNMENT & RESEARCH RESOURCES')}
        </h1>

        <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-3xl">
          {t('directory.subtitle')} Official central government portals, central acts repository, TKDL prior art archives, Ayush regulatory councils, and WIPO international treaty resources.
        </p>

        {/* Search & Category Filter Bar */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search IP India, India Code, TKDL, Ayush, FSSAI, CCRAS, NBA, or WIPO..."
              className="w-full bg-white border border-emerald-300 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-4 h-4 text-emerald-800 shrink-0" />
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedFilter === opt
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-white text-slate-700 hover:text-emerald-900 border border-emerald-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredResources.map((item) => {
          const trustBadge = getTrustBadge(item.category);

          return (
            <div
              key={item.id}
              className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-xs hover:border-emerald-400 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {trustBadge}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{item.category}</span>
                </div>

                <h3 className="text-base font-extrabold text-emerald-950">{item.name}</h3>

                <div className="space-y-2 text-xs">
                  <p className="text-slate-700 font-medium">
                    <strong className="text-emerald-950 block mb-0.5">What it Provides:</strong>
                    <span className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 block">{item.provides}</span>
                  </p>

                  <p className="text-slate-700 font-medium">
                    <strong className="text-emerald-950 block mb-0.5">Useful For:</strong>
                    <span className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 block">{item.usefulFor}</span>
                  </p>
                </div>

                {/* Specific Resource Action Buttons */}
                {item.id === 'auth-ipindia' && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      onClick={() => openChatWithPrompt('How do I search patent availability on IP India (CGPDTM)?')}
                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg text-[10px] font-bold"
                    >
                      Search Patent
                    </button>
                    <button
                      onClick={() => openChatWithPrompt('How do I check trademark availability on IP India TM-Search?')}
                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg text-[10px] font-bold"
                    >
                      Search Trademark
                    </button>
                    <button
                      onClick={() => openChatWithPrompt('How do I file for design registration on IP India?')}
                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg text-[10px] font-bold"
                    >
                      Search Design
                    </button>
                    <button
                      onClick={() => openChatWithPrompt('How to search Geographical Indications (GI) on IP India?')}
                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg text-[10px] font-bold"
                    >
                      Search GI
                    </button>
                    <a
                      href="https://ipindia.gov.in/acts/patent-act-1970"
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-800 rounded-lg text-[10px] font-bold flex items-center gap-1"
                    >
                      View IPR Acts & Rules ↗
                    </a>
                  </div>
                )}

                {item.id === 'auth-indiacode' && (
                  <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 space-y-1">
                    <span className="text-[10px] font-black text-emerald-950 uppercase flex items-center gap-1">
                      <Search className="w-3 h-3 text-emerald-700" />
                      🔎 Search Indian Law (Act / Section)
                    </span>
                    <input
                      type="text"
                      placeholder="Type Act name or section (e.g. 'Patents Act 3(p)')..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          openChatWithPrompt(`Search India Code legislation for: ${(e.target as HTMLInputElement).value}`);
                        }
                      }}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-[11px] text-slate-800"
                    />
                  </div>
                )}

                {/* Why This Source Banner */}
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs">
                  <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Why this source?
                  </span>
                  <p className="text-slate-800 font-medium text-[11px] italic leading-relaxed">
                    {item.whyThisSource}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <button
                  onClick={() =>
                    setSelectedSourceForWhy({
                      title: item.name,
                      authority: item.name,
                      url: item.url,
                      status: item.officialStatus,
                      sourceType: trustBadge,
                      whyThisSource: item.whyThisSource,
                    })
                  }
                  className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition cursor-pointer border border-emerald-300"
                >
                  🔍 WHY THIS SOURCE?
                </button>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <span>Open Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <WhyThisSourceModal
        source={selectedSourceForWhy}
        onClose={() => setSelectedSourceForWhy(null)}
      />
    </div>
  );
};

