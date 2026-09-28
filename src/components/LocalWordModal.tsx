import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, BookOpen, Plus, Trash2, CheckCircle2, AlertTriangle, Search, Sparkles } from 'lucide-react';

export const LocalWordModal: React.FC = () => {
  const {
    isLocalWordModalOpen,
    setIsLocalWordModalOpen,
    savedLocalWords,
    saveLocalWord,
    deleteLocalWord,
    openChatWithPrompt,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [localWord, setLocalWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [languageOrRegion, setLanguageOrRegion] = useState('');
  const [englishEquivalent, setEnglishEquivalent] = useState('');
  const [hindiEquivalent, setHindiEquivalent] = useState('');
  const [marathiEquivalent, setMarathiEquivalent] = useState('');
  const [context, setContext] = useState('');
  const [userMeaning, setUserMeaning] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');

  if (!isLocalWordModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localWord.trim() || !meaning.trim()) {
      alert('Please fill in at least the Local Word and Meaning.');
      return;
    }

    saveLocalWord({
      localWord: localWord.trim(),
      meaning: meaning.trim(),
      languageOrRegion: languageOrRegion.trim() || 'Local Dialect',
      englishEquivalent: englishEquivalent.trim() || undefined,
      hindiEquivalent: hindiEquivalent.trim() || undefined,
      marathiEquivalent: marathiEquivalent.trim() || undefined,
      context: context.trim() || undefined,
      userMeaning: userMeaning.trim() || undefined,
      verificationStatus: 'User-provided local meaning',
    });

    // Reset form
    setLocalWord('');
    setMeaning('');
    setLanguageOrRegion('');
    setEnglishEquivalent('');
    setHindiEquivalent('');
    setMarathiEquivalent('');
    setContext('');
    setUserMeaning('');
    setActiveTab('list');
  };

  const filteredWords = savedLocalWords.filter(
    (w) =>
      w.localWord.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.languageOrRegion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-emerald-100">
        {/* Header */}
        <div className="bg-emerald-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-950 flex items-center justify-center font-black text-xl shadow border border-emerald-300">
              🏡
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                <span>Speak Like My Village</span>
                <span className="text-[10px] bg-emerald-700 text-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold border border-emerald-600">
                  Local Word Mode
                </span>
              </h2>
              <p className="text-xs text-emerald-200">
                Capture local dialect terms, village expressions, and traditional herbal vocabulary.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLocalWordModalOpen(false)}
            className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-950 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Verification Notice:</strong> Terms entered here are tagged as{' '}
            <span className="bg-emerald-200 text-emerald-950 font-bold px-1.5 py-0.5 rounded">
              User-provided local meaning
            </span>{' '}
            and require scientific verification before formal prior art submission.
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-emerald-100 px-6 pt-3 bg-slate-50 gap-3">
          <button
            onClick={() => setActiveTab('list')}
            className={`pb-2 text-xs font-bold transition border-b-2 cursor-pointer ${
              activeTab === 'list'
                ? 'border-emerald-600 text-emerald-950 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📚 Village Vocabulary ({savedLocalWords.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-2 text-xs font-bold transition border-b-2 cursor-pointer flex items-center gap-1 ${
              activeTab === 'add'
                ? 'border-emerald-600 text-emerald-950 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Village Word</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'list' ? (
            <>
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search village word, plant name, or region..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              {/* Word List */}
              {filteredWords.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-500">No village words match your search.</p>
                  <button
                    onClick={() => setActiveTab('add')}
                    className="mt-3 px-4 py-1.5 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition"
                  >
                    + Add New Village Word
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredWords.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 p-4 rounded-2xl transition space-y-2 relative group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-extrabold text-sm text-emerald-950">{item.localWord}</h3>
                            <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              🏡 {item.languageOrRegion}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 mt-1 font-medium">{item.meaning}</p>
                        </div>
                        <button
                          onClick={() => deleteLocalWord(item.id)}
                          className="text-slate-400 hover:text-emerald-900 transition p-1"
                          title="Delete entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Translations Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
                        {item.englishEquivalent && (
                          <div>
                            <strong className="text-slate-500 font-semibold">English:</strong> {item.englishEquivalent}
                          </div>
                        )}
                        {item.hindiEquivalent && (
                          <div>
                            <strong className="text-slate-500 font-semibold">Hindi:</strong> {item.hindiEquivalent}
                          </div>
                        )}
                        {item.marathiEquivalent && (
                          <div>
                            <strong className="text-slate-500 font-semibold">Marathi:</strong> {item.marathiEquivalent}
                          </div>
                        )}
                      </div>

                      {item.context && (
                        <p className="text-[11px] text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100">
                          <strong>Context:</strong> "{item.context}"
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        <span className="inline-flex items-center gap-1 text-emerald-900 font-extrabold bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          {item.verificationStatus}
                        </span>
                        <button
                          onClick={() => {
                            setIsLocalWordModalOpen(false);
                            openChatWithPrompt(
                              `Check traditional knowledge & prior art evidence for the village term: "${item.localWord}" (${item.meaning}) used in ${item.languageOrRegion}.`
                            );
                          }}
                          className="text-emerald-700 hover:underline font-bold flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          Search Evidence for Term
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Add Word Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Local Word / Expression *
                  </label>
                  <input
                    type="text"
                    required
                    value={localWord}
                    onChange={(e) => setLocalWord(e.target.value)}
                    placeholder="e.g. Kadukai, Kombu Kashaayam, Nimba Kwath..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Language / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={languageOrRegion}
                    onChange={(e) => setLanguageOrRegion(e.target.value)}
                    placeholder="e.g. Varhadi (Vidarbha), Bhojpuri (Bihar), Tamil Nadu..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Local Meaning / Explanation *
                </label>
                <textarea
                  required
                  rows={2}
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  placeholder="Describe how this word is understood and used in your village..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              {/* Equivalent Translations */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    English Equivalent
                  </label>
                  <input
                    type="text"
                    value={englishEquivalent}
                    onChange={(e) => setEnglishEquivalent(e.target.value)}
                    placeholder="e.g. Chebulic Myrobalan"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-2.5 py-1.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Hindi Equivalent
                  </label>
                  <input
                    type="text"
                    value={hindiEquivalent}
                    onChange={(e) => setHindiEquivalent(e.target.value)}
                    placeholder="e.g. हरड़ / हरितकी"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-2.5 py-1.5 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Marathi Equivalent
                  </label>
                  <input
                    type="text"
                    value={marathiEquivalent}
                    onChange={(e) => setMarathiEquivalent(e.target.value)}
                    placeholder="e.g. हिरडा"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-2.5 py-1.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Usage Context & Traditional Remedy Context
                </label>
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="e.g. Used for joint pain preparation during winter season in local households..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-emerald-700 hover:bg-emerald-800 text-white transition shadow-md"
                >
                  Save Village Word
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
