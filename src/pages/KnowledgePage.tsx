import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_KNOWLEDGE_BASE } from '../data/mockKnowledgeBase';
import type { LegalCategory } from '../types/ip';
import {
  Search,
  BookOpen,
  Filter,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const KnowledgePage: React.FC = () => {
  const { setActiveCitation, openChatWithPrompt, t } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<LegalCategory | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('kb-pat-sec3p');

  const filteredItems = MOCK_KNOWLEDGE_BASE.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      item.title.toLowerCase().includes(query) ||
      item.actName.toLowerCase().includes(query) ||
      item.sectionOrRule.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  const categoryPills: { id: LegalCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Vault Cards' },
    { id: 'patent', label: 'Patent' },
    { id: 'trademark', label: 'Trademark' },
    { id: 'copyright', label: 'Copyright' },
    { id: 'gi', label: 'Geographical Indication' },
    { id: 'tk', label: 'Traditional Knowledge' },
    { id: 'biodiversity', label: 'Biodiversity' },
    { id: 'ayurveda_reg', label: 'Ayurveda Regulation' },
    { id: 'international_ip', label: 'International IP' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Statutory IP Vault (8 Legal Domains)</span>
            </div>
            <h1 className="text-3xl font-black text-emerald-950 tracking-tight">
              {t('knowledgeVault')}
            </h1>
            <p className="text-xs text-slate-700 font-semibold mt-1">
              Explore simple explanations, relevance guidelines, and official sources across 8 Intellectual Property domains.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-900 bg-white px-3.5 py-1.5 rounded-full border border-emerald-300 w-fit shadow-xs">
            {filteredItems.length} Knowledge Cards Available
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Section 3(p), 3(k), 3(d), TKDL, Ayurveda GMP, Trademark Class 5, or PCT..."
            className="w-full bg-white border border-emerald-300 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-emerald-800 shrink-0" />
          {categoryPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedCategory(pill.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedCategory === pill.id
                  ? 'bg-emerald-700 text-white shadow'
                  : 'bg-white text-slate-700 hover:text-emerald-900 border border-emerald-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Cards Grid */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-emerald-200 rounded-3xl space-y-3">
            <BookOpen className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No vault cards match your search</h3>
            <p className="text-xs text-slate-500">Try searching for "Traditional Knowledge", "Section 3(p)", or "Trademark".</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-xs transition hover:border-emerald-400"
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-950 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                        {item.sectionOrRule}
                      </span>
                      <span className="text-xs font-bold text-slate-600">{item.actName}</span>
                    </div>
                    <h3 className="text-base font-bold text-emerald-950">{item.title}</h3>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition cursor-pointer shrink-0"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">{item.description}</p>

                {/* Key Takeaways */}
                <div className="space-y-2 bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">When It Is Relevant & Key Takeaways</span>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                    {item.keyTakeaways.map((point: string, pIdx: number) => (
                      <li key={pIdx} className="flex items-start space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expanded Full Legal Text */}
                {isExpanded && (
                  <div className="space-y-3 pt-2 border-t border-emerald-100 text-xs animate-fade-in">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">Codified Statutory Text</span>
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 font-mono leading-relaxed text-[11px]">
                        "{item.fullText}"
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-emerald-100 text-xs">
                  {item.citations.length > 0 ? (
                    <button
                      onClick={() => setActiveCitation(item.citations[0])}
                      className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center space-x-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Inspect Legal Citation</span>
                    </button>
                  ) : (
                    <span className="text-slate-500 text-[11px] font-semibold">Statutory Reference Card</span>
                  )}

                  <button
                    onClick={() => openChatWithPrompt(`Explain ${item.title} (${item.sectionOrRule})`)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow"
                  >
                    <span>Learn More & Ask AI</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
