import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Database, Trash2, ExternalLink, Filter, BookOpen, FileText, Lightbulb, Search } from 'lucide-react';

export const VaultDrawer: React.FC = () => {
  const { savedVaultItems, removeFromVault, openChatWithPrompt, t } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = savedVaultItems.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const q = searchQuery.toLowerCase();
    const matchesQuery = !q || item.title.toLowerCase().includes(q) || (item.notes && item.notes.toLowerCase().includes(q));
    return matchesType && matchesQuery;
  });

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'idea':
        return <Lightbulb className="w-4 h-4 text-emerald-600" />;
      case 'trp':
      case 'prp':
      case 'doc':
        return <FileText className="w-4 h-4 text-emerald-700" />;
      default:
        return <BookOpen className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>Personal Knowledge Storage</span>
            </div>
            <h1 className="text-3xl font-black text-emerald-950 tracking-tight">
              💾 {t('vault.title', 'MY IP VAULT')}
            </h1>
            <p className="text-xs text-slate-700 font-semibold mt-1">
              {t('vault.subtitle')} Save research evidence, official citations, traditional knowledge records, TRP/PRP papers, and custom ideas.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-emerald-900 bg-white px-3.5 py-1.5 rounded-full border border-emerald-300 w-fit shadow-xs">
            {savedVaultItems.length} Items Saved
          </span>
        </div>

        {/* Search & Filter */}
        <div className="space-y-3 pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved vault items..."
              className="w-full bg-white border border-emerald-300 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-4 h-4 text-emerald-800 shrink-0" />
            {['all', 'question', 'evidence', 'source', 'tk', 'trp', 'prp', 'idea'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer capitalize ${
                  filterType === type
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-white text-slate-700 hover:text-emerald-900 border border-emerald-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white border border-emerald-200 rounded-3xl space-y-3">
            <Database className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">{t('vault.empty')}</h3>
            <p className="text-xs text-slate-500">Save answers, research cards, or ideas to view them here later.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-emerald-200 rounded-2xl p-5 shadow-xs hover:border-emerald-400 transition flex items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                  {getItemIcon(item.type)}
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {item.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">{item.date}</span>
                </div>
                <h3 className="font-bold text-emerald-950 text-sm">{item.title}</h3>
                {item.notes && <p className="text-xs text-slate-600 font-medium">{item.notes}</p>}
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => openChatWithPrompt(`Review my saved vault item: ${item.title}`)}
                  className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition cursor-pointer"
                  title="Ask AI about this item"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>

                <button
                  onClick={() => removeFromVault(item.id)}
                  className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition cursor-pointer"
                  title="Remove from vault"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
