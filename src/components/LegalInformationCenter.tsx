import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_KNOWLEDGE_BASE } from '../data/mockKnowledgeBase';
import { Scale, Search, ShieldAlert, ExternalLink, HelpCircle, Filter } from 'lucide-react';
import { WhyThisSourceModal } from './WhyThisSourceModal';
import { ExplainSimplyModal } from './ExplainSimplyModal';
import type { OfficialSource } from '../types/ip';

export const LegalInformationCenter: React.FC = () => {
  const { t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSourceForWhy, setSelectedSourceForWhy] = useState<OfficialSource | null>(null);
  const [selectedItemForExplain, setSelectedItemForExplain] = useState<any | null>(null);

  const categories = [
    'All',
    'patent',
    'trademark',
    'copyright',
    'gi',
    'tk',
    'biodiversity',
    'ayurveda_reg',
    'international_ip',
  ];

  const categoryLabels: Record<string, string> = {
    All: 'All Categories',
    patent: 'Patent Law',
    trademark: 'Trademark',
    copyright: 'Copyright',
    gi: 'Geographical Indications',
    tk: 'Traditional Knowledge',
    biodiversity: 'Biodiversity Act',
    ayurveda_reg: 'Ayurveda Regulations',
    international_ip: 'International IP / WIPO',
  };

  const filteredItems = MOCK_KNOWLEDGE_BASE.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.actName.toLowerCase().includes(q) ||
      item.sectionOrRule.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-8 rounded-3xl space-y-4 shadow-lg border border-emerald-800">
        <div className="inline-flex items-center space-x-2 bg-emerald-800/80 text-emerald-200 border border-emerald-700 px-3.5 py-1 rounded-full text-xs font-extrabold">
          <Scale className="w-4 h-4 text-emerald-300" />
          <span>Statutory Legislation & Case Law Repository</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
          ⚖️ ATREYA Legal Information Center
        </h1>

        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium max-w-3xl">
          Search un-amended Indian Acts, statutory sections, Supreme Court precedents, and regulatory rules under Patents Act 1970, Trade Marks Act 1999, and Biological Diversity Act 2002.
        </p>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔎 Search Indian Law (e.g., 'Section 3(p)', 'Novartis', 'Form 18A', 'NBA clearance')..."
            className="w-full bg-white border border-emerald-300 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-semibold shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-2">
          <Filter className="w-4 h-4 text-emerald-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md font-black border border-emerald-500'
                  : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-800 border border-emerald-700'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mandatory Notice Banner */}
      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center space-x-3 text-emerald-950 text-xs">
        <ShieldAlert className="w-5 h-5 text-emerald-700 shrink-0" />
        <div>
          <strong className="font-bold">Legal Information Assistant Notice:</strong> ATREYA provides research assistance based on statutory documents. It is not legal counsel.{' '}
          <span className="underline font-bold">Always verify important information against the latest official source.</span>
        </div>
      </div>

      {/* Grid of Legal Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-xs hover:border-emerald-400 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300">
                  📜 {item.actName}
                </span>
                <span className="text-[10px] font-black text-emerald-950 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                  {item.sectionOrRule}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-emerald-950">{item.title}</h3>
              <p className="text-xs text-slate-600 font-medium">{item.description}</p>

              {/* Full Text / Takeaway Box */}
              <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-2 text-xs">
                <strong className="text-emerald-950 block text-[11px]">Statutory Interpretation & Key Provisions:</strong>
                <p className="text-slate-800 font-medium leading-relaxed">{item.fullText}</p>

                {item.keyTakeaways.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700 font-medium pt-1">
                    {item.keyTakeaways.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Actions & Verification */}
            <div className="pt-3 border-t border-emerald-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                <span>Verified Statutory Section</span>
                <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  Verify Original Source
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedItemForExplain(item)}
                    className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1 border border-emerald-300"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t('buttons.explainSimply', 'Explain Simply')}</span>
                  </button>

                  <button
                    onClick={() =>
                      setSelectedSourceForWhy({
                        title: item.title,
                        authority: item.actName,
                        url: item.citations[0]?.officialUrl || 'https://www.indiacode.nic.in/',
                        status: 'Official Statutory Legislation',
                        sourceType: 'Official Government Source',
                        whyThisSource:
                          'Statutory law enacted by the Parliament of India and published in the Official Gazette.',
                      })
                    }
                    className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition cursor-pointer border border-emerald-300"
                  >
                    🔍 WHY THIS SOURCE?
                  </button>
                </div>

                <a
                  href={item.citations[0]?.officialUrl || 'https://www.indiacode.nic.in/'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1 cursor-pointer shadow"
                >
                  <span>Open Act</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <WhyThisSourceModal
        source={selectedSourceForWhy}
        onClose={() => setSelectedSourceForWhy(null)}
      />

      <ExplainSimplyModal
        isOpen={!!selectedItemForExplain}
        onClose={() => setSelectedItemForExplain(null)}
        title={selectedItemForExplain?.title}
        simpleExplanation={selectedItemForExplain?.fullText}
        realLifeExample={selectedItemForExplain?.keyTakeaways?.[0]}
        whyItMatters={selectedItemForExplain?.description}
        nextSteps="Consult official IP India gazette rules or India Code for un-amended statutory text."
        officialUrl={selectedItemForExplain?.citations?.[0]?.officialUrl || 'https://ipindia.gov.in/'}
      />
    </div>
  );
};
