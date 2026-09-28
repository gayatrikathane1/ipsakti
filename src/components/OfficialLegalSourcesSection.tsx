import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  OFFICIAL_SOURCES_DATABASE,
  OFFICIAL_LEGAL_CATEGORIES,
  AUTHORITY_LEVEL_LABELS,
  PATENTS_ACT_INDEXED_SECTIONS,
} from '../data/officialSources';
import {
  Landmark,
  Search,
  ExternalLink,
  ShieldCheck,
  Scale,
  Bookmark,
  AlertTriangle,
  Info,
  SlidersHorizontal,
  Lock,
  Sparkles,
  FileText,
  BookOpen,
  Building2,
} from 'lucide-react';
import type { OfficialSource } from '../types/ip';

export const OfficialLegalSourcesSection: React.FC = () => {
  const { openChatWithPrompt, saveToVault } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'sources' | 'sections' | 'specialCards'>('sources');
  const [selectedSection, setSelectedSection] = useState<string | null>('Section 3(p)');
  const [savedId, setSavedId] = useState<string | null>(null);

  // Filter Sources
  const filteredSources = OFFICIAL_SOURCES_DATABASE.filter((source) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || source.category === selectedCategory;

    const matchesLevel = selectedLevel === 'all' || source.authorityLevel === selectedLevel;

    const q = searchQuery.toLowerCase().trim();
    const nameStr = source.name || source.title || '';
    const orgStr = source.organization || source.authority || '';
    const descStr = source.description || '';
    const topicsArr = source.topics || [];

    const matchesSearch =
      !q ||
      nameStr.toLowerCase().includes(q) ||
      orgStr.toLowerCase().includes(q) ||
      descStr.toLowerCase().includes(q) ||
      topicsArr.some((t) => t.toLowerCase().includes(q)) ||
      (source.relatedActs && source.relatedActs.some((a) => a.toLowerCase().includes(q)));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  // Handle Save Source to IP Vault
  const handleSaveToVault = (source: OfficialSource) => {
    const sId = source.id || 'src-unk';
    const sName = source.name || source.title || 'Official Source';
    const sOrg = source.organization || source.authority || '';

    saveToVault({
      title: `${sName} (${sOrg})`,
      type: 'source',
      language: 'en',
      source: source.officialUrl || source.url || 'https://ipindia.gov.in/',
      notes: `Saved Official Source: ${source.legalStatus || 'Verified'} — Level ${source.authorityLevel || 1}`,
      data: source,
    });
    setSavedId(sId);
    setTimeout(() => setSavedId(null), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-700/50 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-800/80 rounded-2xl text-emerald-300 border border-emerald-600/60 shadow-inner">
            <Landmark className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-700 inline-block mb-1">
              🏛️ STATUTORY GROUNDING & VERIFIED SOURCES
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Official Legal & Government Sources
            </h1>
          </div>
        </div>
        <p className="text-emerald-100 text-sm font-medium leading-relaxed max-w-4xl">
          Find laws, government portals, statutory authorities, official research institutions and authoritative reference sources for Ayurveda, Traditional Knowledge, Intellectual Property, Biodiversity, and Food Regulations.
        </p>

        {/* TAB CONTROLS */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-emerald-800/60">
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
              activeTab === 'sources'
                ? 'bg-emerald-700 text-white shadow-md font-extrabold border border-emerald-500'
                : 'bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Official Sources Database ({OFFICIAL_SOURCES_DATABASE.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
              activeTab === 'sections'
                ? 'bg-emerald-700 text-white shadow-md font-extrabold border border-emerald-500'
                : 'bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Patents Act 1970 Sections ({PATENTS_ACT_INDEXED_SECTIONS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('specialCards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 cursor-pointer ${
              activeTab === 'specialCards'
                ? 'bg-emerald-700 text-white shadow-md font-extrabold border border-emerald-500'
                : 'bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Special Statutory Provisions (Sec 3p, TKDL, WIPO 2024)</span>
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTERS BAR */}
      <div className="bg-white border border-emerald-200 p-5 rounded-2xl shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-emerald-700" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Laws, Government Sources & Research (e.g. 'Section 3(p)', 'India Code', 'TKDL', 'FSSAI')..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-emerald-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-emerald-950 tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
            <span>Filter by Category ({OFFICIAL_LEGAL_CATEGORIES.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {OFFICIAL_LEGAL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Authority Level Hierarchy Filters */}
        <div className="space-y-1.5 pt-2 border-t border-emerald-100">
          <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-emerald-950 tracking-wider">
            <Landmark className="w-3.5 h-3.5 text-emerald-700" />
            <span>Source Authority Level Hierarchy</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                selectedLevel === 'all'
                  ? 'bg-emerald-900 text-white border-emerald-950 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              All Levels (1 - 7)
            </button>
            {[1, 2, 3, 4, 5, 6, 7].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer border ${
                  selectedLevel === lvl
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-emerald-50'
                }`}
              >
                Level {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TAB 1: OFFICIAL SOURCES DATABASE */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              Showing {filteredSources.length} of {OFFICIAL_SOURCES_DATABASE.length} Official Sources
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredSources.map((source) => {
              const levelMeta = AUTHORITY_LEVEL_LABELS[source.authorityLevel || 1];

              return (
                <div
                  key={source.id || source.name}
                  className="bg-white border border-emerald-200 hover:border-emerald-400 transition rounded-2xl p-6 space-y-4 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Source Authority Header & Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-2.5">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md border inline-block ${levelMeta.color}`}>
                        {levelMeta.badge}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        🟢 Verified Official
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                        Authority: {source.organization || source.authority}
                      </span>
                      <h3 className="text-base font-extrabold text-emerald-950 mt-0.5">
                        {source.name || source.title}
                      </h3>
                      {source.navigationGuide && (
                        <div className="mt-1 bg-emerald-50 text-emerald-950 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                          🧭 Navigation: {source.navigationGuide}
                        </div>
                      )}
                    </div>

                    {/* What it Covers & Purpose */}
                    <div className="space-y-2 text-xs">
                      <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 space-y-1">
                        <strong className="text-emerald-950 text-[11px] uppercase tracking-wider block font-black">
                          What it Covers:
                        </strong>
                        <p className="text-slate-800 font-medium leading-relaxed">
                          {source.description}
                        </p>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(source.topics || []).map((tp, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200"
                          >
                            #{tp}
                          </span>
                        ))}
                      </div>

                      {/* Why ATREYA Uses It */}
                      <div className="p-2.5 bg-emerald-50/90 border border-emerald-200 rounded-xl space-y-1">
                        <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                          Why ATREYA Uses It:
                        </span>
                        <p className="text-slate-800 text-[11px] font-medium italic leading-relaxed">
                          {source.whyThisSource}
                        </p>
                      </div>

                      {/* Browser SSL / Connection Fallback Banner */}
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-[11px]">
                        <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                          <Info className="w-3.5 h-3.5 text-slate-500" />
                          Official Website Verification:
                        </span>
                        <p className="text-slate-700 font-medium">
                          Official website connection could not be verified in your browser? Use another official source below:
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Source Statutory Action Links */}
                  <div className="pt-3 border-t border-emerald-100 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Primary Source */}
                      {source.officialUrl && (
                        <a
                          href={source.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs text-xs"
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>PRIMARY SOURCE</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {/* Alternative Official Source */}
                      {source.alternativeUrl && (
                        <a
                          href={source.alternativeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-300 text-xs"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                          <span>ALTERNATIVE OFFICIAL SOURCE</span>
                          <ExternalLink className="w-3 h-3 text-emerald-700" />
                        </a>
                      )}

                      {/* Legal Database */}
                      {source.legalDatabaseUrl && (
                        <a
                          href={source.legalDatabaseUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-300 text-xs"
                        >
                          <Scale className="w-3.5 h-3.5 text-emerald-700" />
                          <span>LEGAL DATABASE (INDIA CODE)</span>
                          <ExternalLink className="w-3 h-3 text-emerald-700" />
                        </a>
                      )}

                      {/* Official PDF Document */}
                      {source.officialPdfUrl && (
                        <a
                          href={source.officialPdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-300 text-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-800" />
                          <span>OPEN OFFICIAL PDF</span>
                          <ExternalLink className="w-3 h-3 text-emerald-800" />
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <button
                        onClick={() => handleSaveToVault(source)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-[11px] transition cursor-pointer flex items-center space-x-1 border border-slate-300"
                      >
                        <Bookmark className="w-3 h-3 text-emerald-700" />
                        <span>{savedId === source.id ? 'Saved!' : 'Save to IP Vault'}</span>
                      </button>

                      <button
                        onClick={() =>
                          openChatWithPrompt(`Provide official statutory details for source: ${source.name}`)
                        }
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold rounded-lg text-[11px] transition cursor-pointer border border-emerald-200 flex items-center space-x-1"
                      >
                        <Info className="w-3 h-3 text-emerald-700" />
                        <span>Ask AI About Source</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PATENTS ACT 1970 INDEXED SECTIONS */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl space-y-2">
            <h3 className="text-sm font-black text-emerald-950 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-700" />
              Indexed Sections of The Patents Act, 1970
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Click any statutory section below to inspect its official title, simplified explanation, statutory legal text snippet, and primary/alternative IP India & India Code source links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Section Index Selector */}
            <div className="md:col-span-1 bg-white border border-emerald-200 rounded-2xl p-4 space-y-2 h-fit">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 block border-b border-emerald-100 pb-2">
                📜 Select Section ({PATENTS_ACT_INDEXED_SECTIONS.length})
              </span>
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                {PATENTS_ACT_INDEXED_SECTIONS.map((sec) => (
                  <button
                    key={sec.sectionNumber}
                    onClick={() => setSelectedSection(sec.sectionNumber)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-between ${
                      selectedSection === sec.sectionNumber
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-800 hover:bg-emerald-50 hover:text-emerald-950'
                    }`}
                  >
                    <span>{sec.sectionNumber}</span>
                    <span className="text-[10px] opacity-80 font-normal truncate max-w-[120px]">
                      {sec.officialTitle}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section Details Card */}
            <div className="md:col-span-2 bg-white border border-emerald-200 rounded-2xl p-6 space-y-5 shadow-xs">
              {(() => {
                const sec =
                  PATENTS_ACT_INDEXED_SECTIONS.find((s) => s.sectionNumber === selectedSection) ||
                  PATENTS_ACT_INDEXED_SECTIONS[2];

                return (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between border-b border-emerald-100 pb-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 inline-block mb-1">
                          LEVEL 1 — PRIMARY LEGAL SOURCE
                        </span>
                        <h2 className="text-xl font-black text-emerald-950">
                          {sec.sectionNumber}: {sec.officialTitle}
                        </h2>
                        {sec.navigationGuide && (
                          <div className="mt-1 bg-emerald-50 text-emerald-950 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                            🧭 Navigation: {sec.navigationGuide}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-bold">
                        Last Verified: {sec.lastVerified}
                      </span>
                    </div>

                    {/* Simplified Explanation */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 block">
                        📖 Simplified Explanation:
                      </span>
                      <p className="text-slate-800 text-xs font-medium leading-relaxed bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
                        {sec.simplifiedExplanation}
                      </p>
                    </div>

                    {/* Statutory Legal Text */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 block">
                        ⚖️ Statutory Legal Text (The Patents Act 1970):
                      </span>
                      <blockquote className="text-slate-900 text-xs font-mono bg-slate-900 text-emerald-300 p-4 rounded-xl border border-slate-800 leading-relaxed italic">
                        "{sec.legalText}"
                      </blockquote>
                    </div>

                    {/* Related Topics */}
                    <div className="flex flex-wrap gap-1.5">
                      {sec.relatedTopics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-100 text-emerald-950 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-300"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>

                    {/* Safety Disclaimer */}
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs">
                      <span className="text-[10px] font-black uppercase text-emerald-900 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-emerald-700" />
                        Statutory Disclaimer:
                      </span>
                      <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                        {sec.disclaimer} ATREYA provides legal intelligence research assistance and does NOT provide personalized legal advice.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-emerald-100 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={sec.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer text-xs shadow-xs"
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>PRIMARY SOURCE (IP INDIA)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={sec.alternativeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-300 text-xs"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                          <span>ALTERNATIVE OFFICIAL SOURCE</span>
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                        </a>

                        <a
                          href={sec.legalDatabaseUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-200 text-xs"
                        >
                          <Scale className="w-3.5 h-3.5 text-emerald-700" />
                          <span>LEGAL DATABASE (INDIA CODE)</span>
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                        </a>

                        <a
                          href={sec.officialPdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-300 text-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-800" />
                          <span>OPEN OFFICIAL PDF</span>
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-800" />
                        </a>
                      </div>

                      <button
                        onClick={() =>
                          openChatWithPrompt(`Analyze Patents Act ${sec.sectionNumber} (${sec.officialTitle}) for my formulation idea.`)
                        }
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer border border-slate-300"
                      >
                        Ask ATREYA AI About {sec.sectionNumber}
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPECIAL STATUTORY PROVISIONS & CARDS */}
      {activeTab === 'specialCards' && (
        <div className="space-y-6">
          {/* Card 1: Section 3(p) Traditional Knowledge Card */}
          <div className="bg-white border-2 border-emerald-400 rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
              <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-300 inline-block">
                🌿 SECTION 3(p) TRADITIONAL KNOWLEDGE & PATENT ELIGIBILITY
              </span>
              <span className="text-xs font-bold text-emerald-800">LEVEL 1 — PRIMARY LEGAL SOURCE</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-black text-emerald-950">
                Traditional Knowledge & Patent Eligibility Card
              </h2>
              <div className="bg-emerald-50 text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 inline-block">
                🧭 Navigation Helper: Chapter II → Inventions Not Patentable → Section 3(p)
              </div>
              <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200 text-xs leading-relaxed space-y-2">
                <p className="text-slate-900 font-bold">
                  <strong>Simplified Explanation:</strong> An invention that is effectively traditional knowledge, or an aggregation/duplication of known properties of traditionally known components, falls statutorily under Section 3(p) of the Patents Act, 1970.
                </p>
                <p className="text-slate-700 font-medium">
                  <strong>Statutory Authority:</strong> Controller General of Patents, Designs and Trade Marks (CGPDTM), IP India.
                </p>
              </div>

              {/* Non-Presumptive Verdict Box */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-1 text-xs">
                <span className="text-[10px] font-black uppercase text-emerald-900 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-emerald-700" />
                  Statutory Evaluation Standard:
                </span>
                <p className="text-emerald-950 font-black text-sm italic">
                  "Possible relevance identified. Professional/legal verification required."
                </p>
                <p className="text-slate-700 text-[11px] font-medium">
                  ATREYA does NOT tell users that their particular idea is definitely patentable or non-patentable. Always verify prior art against CSIR-TKDL and consult an IP attorney.
                </p>
              </div>

              {/* SSL Browser Fallback Notice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  Browser Verification:
                </span>
                <p className="text-slate-700 text-[11px] font-medium">
                  Official website connection could not be verified in your browser? Use another official source:
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-100">
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://ipindia.gov.in/acts/patent-act-1970"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer text-xs shadow-md"
                >
                  <Building2 className="w-4 h-4" />
                  <span>PRIMARY SOURCE (IP INDIA)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://ipindia.gov.in/pages/patents/publications/acts"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-300 text-xs"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>ALTERNATIVE OFFICIAL SOURCE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                </a>

                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-200 text-xs"
                >
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>LEGAL DATABASE (INDIA CODE)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                </a>

                <a
                  href="https://ipindia.gov.in/writereaddata/Portal/IPOAct/1_113_1_The_Patents_Act__1970___incorporating_all_amendments_till_1-08-2024.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-300 text-xs"
                >
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span>OPEN OFFICIAL PDF</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-800" />
                </a>
              </div>

              <button
                onClick={() => openChatWithPrompt('Explain Section 3(p) traditional knowledge rules in simple terms.')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer border border-slate-300"
              >
                VERIFY CURRENT LAW WITH AI
              </button>
            </div>
          </div>

          {/* Card 2: TKDL Card */}
          <div className="bg-white border-2 border-emerald-400 rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
              <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-300 inline-block">
                🔒 TRADITIONAL KNOWLEDGE DIGITAL LIBRARY (TKDL)
              </span>
              <span className="text-xs font-bold text-emerald-800">LEVEL 2 — STATUTORY PRIOR ART REPOSITORY</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-black text-emerald-950">
                TKDL Prior Art Defense Repository
              </h2>
              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                TKDL contains structured prior art information derived from published literature concerning Indian traditional medicine systems (Ayurveda, Unani, Siddha, Sowa Rigpa, Yoga).
              </p>

              {/* Access Restriction Banner */}
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center space-x-3">
                <Lock className="w-5 h-5 text-emerald-700 shrink-0" />
                <div className="text-xs text-emerald-950 font-bold">
                  <span>Full database access is restricted under TKDL access arrangements.</span>
                  <p className="text-[11px] font-normal text-slate-700 mt-0.5">
                    The official TKDL site states that full database access is provided exclusively to international patent offices under non-disclosure access agreements to prevent biopiracy.
                  </p>
                </div>
              </div>

              {/* SSL Browser Fallback Notice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  Browser Verification:
                </span>
                <p className="text-slate-700 text-[11px] font-medium">
                  Official website connection could not be verified in your browser? Use another official source:
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-100">
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.tkdl.res.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer text-xs shadow-md"
                >
                  <Building2 className="w-4 h-4" />
                  <span>PRIMARY SOURCE (TKDL PORTAL)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://ayush.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-300 text-xs"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>ALTERNATIVE OFFICIAL SOURCE (MINISTRY OF AYUSH)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                </a>

                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-200 text-xs"
                >
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>LEGAL DATABASE (INDIA CODE)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                </a>
              </div>

              <button
                onClick={() => openChatWithPrompt('What is TKDL and how does CSIR use it to defend Ayurvedic prior art?')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer border border-slate-300"
              >
                Learn About TKDL
              </button>
            </div>
          </div>

          {/* Card 3: WIPO 2024 GRATK Treaty Card */}
          <div className="bg-white border-2 border-emerald-400 rounded-3xl p-6 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
              <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-300 inline-block">
                🌍 WIPO 2024 GRATK TREATY
              </span>
              <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                STATUS: ADOPTED — 24 MAY 2024
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-black text-emerald-950">
                WIPO Treaty on IP, Genetic Resources & Associated Traditional Knowledge
              </h2>
              
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-xs space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 block">
                  ⚖️ Mandatory International Legal Distinction:
                </span>
                <p className="text-slate-900 font-bold leading-relaxed">
                  "The treaty was adopted by WIPO Member States in 2024. Its international legal effect depends on its entry into force and applicable national implementation."
                </p>
                <p className="text-slate-700 text-[11px] leading-relaxed">
                  ATREYA does not present international treaties as automatically being domestic Indian law. Domestic patent obligations in India continue to be governed by the Patents Act, 1970 and Biological Diversity Act, 2002.
                </p>
              </div>

              {/* SSL Browser Fallback Notice */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-600 uppercase flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  Browser Verification:
                </span>
                <p className="text-slate-700 text-[11px] font-medium">
                  Official website connection could not be verified in your browser? Use another official source:
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-emerald-100">
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.wipo.int/en/web/traditional-knowledge/wipo-treaty-on-ip-gr-and-associated-tk"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer text-xs shadow-md"
                >
                  <Building2 className="w-4 h-4" />
                  <span>PRIMARY SOURCE (WIPO TREATY)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://www.wipo.int/tk/en/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-300 text-xs"
                >
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>ALTERNATIVE OFFICIAL SOURCE (WIPO TK)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                </a>

                <a
                  href="https://www.wipo.int/wipolex/en/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer border border-emerald-200 text-xs"
                >
                  <Scale className="w-4 h-4 text-emerald-700" />
                  <span>LEGAL DATABASE (WIPO LEX)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                </a>
              </div>

              <button
                onClick={() => openChatWithPrompt('Explain the 2024 WIPO GRATK Treaty disclosure requirements for traditional knowledge.')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer border border-slate-300"
              >
                Read Treaty Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
