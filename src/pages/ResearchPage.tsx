import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RESEARCH_RESOURCES, REFERENCE_BOOKS } from '../data/mockKnowledgeBase';
import { BookOpen, Search, ExternalLink, Filter, HelpCircle } from 'lucide-react';
import { WhyThisSourceModal } from '../components/WhyThisSourceModal';
import { ExplainSimplyModal } from '../components/ExplainSimplyModal';
import type { OfficialSource } from '../types/ip';

export const ResearchPage: React.FC = () => {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<'papers' | 'books'>('papers');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSourceForWhy, setSelectedSourceForWhy] = useState<OfficialSource | null>(null);
  const [selectedItemForExplain, setSelectedItemForExplain] = useState<any | null>(null);

  const categories = [
    'All',
    'Ayurveda Research',
    'Traditional Knowledge',
    'Medicinal Plants',
    'IP & Traditional Knowledge',
    'Biodiversity',
    'Food Regulation',
    'Patent Research',
    'Local Health Traditions',
  ];

  const filteredResources = RESEARCH_RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === 'All' || res.category.includes(selectedCategory) || selectedCategory === 'All';
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      res.title.toLowerCase().includes(q) ||
      res.authorOrOrg.toLowerCase().includes(q) ||
      res.description.toLowerCase().includes(q) ||
      res.type.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const filteredBooks = REFERENCE_BOOKS.filter((book) => {
    const matchesCat = selectedCategory === 'All' || book.category === selectedCategory || selectedCategory === 'All';
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.publisher.toLowerCase().includes(q) ||
      book.topic.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-4 shadow-sm">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
          <span>Verified Statutory & Academic Corpus</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight flex items-center gap-2">
          📚 ATREYA Research Library & Reference Books
        </h1>

        <p className="text-sm text-slate-700 leading-relaxed font-medium max-w-3xl">
          Verified research papers, peer-reviewed journals, CSIR-TKDL prior art evidence, and classical Ayurvedic reference treatises.
        </p>

        {/* Tab Selection */}
        <div className="flex border-b border-emerald-200 pt-2 gap-4">
          <button
            onClick={() => setActiveTab('papers')}
            className={`pb-2 text-xs font-extrabold transition border-b-2 cursor-pointer ${
              activeTab === 'papers'
                ? 'border-emerald-700 text-emerald-950'
                : 'border-transparent text-slate-500 hover:text-emerald-900'
            }`}
          >
            📚 Research Papers ({RESEARCH_RESOURCES.length})
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`pb-2 text-xs font-extrabold transition border-b-2 cursor-pointer ${
              activeTab === 'books'
                ? 'border-emerald-700 text-emerald-950'
                : 'border-transparent text-slate-500 hover:text-emerald-900'
            }`}
          >
            📖 Reference Books ({REFERENCE_BOOKS.length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified papers, classical treatises, authors, or topics..."
            className="w-full bg-white border border-emerald-300 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-4 h-4 text-emerald-800 shrink-0" />
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

      {/* Grid of Content */}
      {activeTab === 'papers' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-xs hover:border-emerald-400 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                    🔵 OFFICIAL RESEARCH SOURCE
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">{item.year}</span>
                </div>

                <h3 className="text-base font-bold text-emerald-950">{item.title}</h3>
                <p className="text-xs text-slate-500 font-bold">{item.authorOrOrg}</p>

                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed font-medium">
                  {item.description}
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-100 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
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
                          authority: item.authorOrOrg,
                          url: item.officialUrl,
                          status: 'Peer-Reviewed Research Document',
                          sourceType: 'Official Research Source',
                          whyThisSource: item.whyThisSource || 'Peer-reviewed research and CSIR-TKDL statutory documentation.',
                        })
                      }
                      className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition cursor-pointer border border-emerald-300"
                    >
                      🔍 WHY THIS SOURCE?
                    </button>
                  </div>

                  <a
                    href={item.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs transition flex items-center gap-1 cursor-pointer shadow"
                  >
                    <span>Open Paper</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Reference Books Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-xs hover:border-emerald-400 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300">
                    {book.badge}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">{book.year}</span>
                </div>

                <h3 className="text-base font-extrabold text-emerald-950">{book.title}</h3>
                {book.originalTitle && (
                  <p className="text-xs text-emerald-800 font-bold italic">{book.originalTitle}</p>
                )}
                <p className="text-xs text-slate-600 font-semibold">
                  <strong>Author / Editor:</strong> {book.author}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <p className="text-slate-700 font-medium">
                    <strong>Publisher:</strong> {book.publisher} ({book.edition})
                  </p>
                  {book.isbn && (
                    <p className="text-slate-500 text-[11px] font-mono">
                      <strong>ISBN:</strong> {book.isbn}
                    </p>
                  )}
                  <p className="text-slate-800 font-semibold pt-1">
                    <strong>Why Useful:</strong> {book.whyUseful}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-100 flex items-center justify-between">
                <button
                  onClick={() =>
                    setSelectedSourceForWhy({
                      title: book.title,
                      authority: book.publisher,
                      url: book.officialSourceUrl,
                      status: 'Classical Treatises & Legal Manuals',
                      sourceType: 'Reference Book Source',
                      whyThisSource: book.whyUseful,
                    })
                  }
                  className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-xl text-xs transition cursor-pointer border border-emerald-300"
                >
                  🔍 WHY THIS SOURCE?
                </button>

                <a
                  href={book.officialSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition flex items-center gap-1 cursor-pointer shadow"
                >
                  <span>Publisher / Library Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <WhyThisSourceModal
        source={selectedSourceForWhy}
        onClose={() => setSelectedSourceForWhy(null)}
      />

      <ExplainSimplyModal
        isOpen={!!selectedItemForExplain}
        onClose={() => setSelectedItemForExplain(null)}
        title={selectedItemForExplain?.title}
        simpleExplanation={selectedItemForExplain?.description}
        whyItMatters="Peer-reviewed scientific validation helps substantiate novel extract formulations or process claims."
        realLifeExample={`Cited in ${selectedItemForExplain?.authorOrOrg} research documentation.`}
        officialUrl={selectedItemForExplain?.officialUrl}
      />
    </div>
  );
};

