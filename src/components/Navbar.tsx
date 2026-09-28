import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/translations';
import type { LanguageCode } from '../types/ip';
import {
  Globe,
  ShieldAlert,
  ChevronDown,
  Bot,
  Home,
  Sparkles,
  Search,
  Leaf,
  Scale,
  Landmark,
  Database,
  SlidersHorizontal,
  Check
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    language,
    setLanguage,
    setJurisdiction,
    jurisdictionFilter,
    setJurisdictionFilter,
    setIsDisclaimerOpen,
    isSimpleMode,
    toggleSimpleMode,
    openChatWithPrompt,
    t,
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [globalSearchInput, setGlobalSearchInput] = useState('');

  const activeLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const handleSelectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setIsLangOpen(false);
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearchInput.trim()) {
      openChatWithPrompt(globalSearchInput);
      setGlobalSearchInput('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 text-slate-800 shadow-xs print:hidden">
      {/* Top Banner Disclaimer */}
      <div className="bg-emerald-800 text-emerald-50 px-4 py-1.5 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2 container mx-auto px-2">
          <ShieldAlert className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="truncate font-medium">
            <strong className="text-emerald-200">ATREYA Notice:</strong> {t('app.disclaimer')}
          </span>
          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="ml-2 underline text-emerald-200 hover:text-white text-xs shrink-0 font-bold cursor-pointer"
          >
            Read Notice
          </button>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md group-hover:bg-emerald-800 transition relative">
            <Leaf className="w-5 h-5 text-emerald-200" />
            <Scale className="w-3 h-3 text-emerald-100 absolute -bottom-0.5 -right-0.5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-black text-2xl tracking-tight text-emerald-950">
                {t('app.name')}
              </h1>
              <span className="bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-300 uppercase tracking-wide">
                AI Assistant
              </span>
            </div>
            <p className="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              {t('app.headerSub')}
            </p>
          </div>
        </div>

        {/* Global Search Input Bar */}
        <form onSubmit={handleGlobalSearch} className="hidden lg:flex items-center flex-1 max-w-xs relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
          <input
            type="text"
            value={globalSearchInput}
            onChange={(e) => setGlobalSearchInput(e.target.value)}
            placeholder="Search Section 3(p), TKDL, patents, trademarks..."
            className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-emerald-500 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition"
          />
        </form>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActivePage('home')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePage === 'home'
                ? 'bg-emerald-700 text-white shadow'
                : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t('nav.home')}</span>
          </button>

          <button
            onClick={() => setActivePage('chat')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePage === 'chat'
                ? 'bg-emerald-700 text-white shadow'
                : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-200" />
            <span>{t('nav.chat')}</span>
          </button>

          <button
            onClick={() => setActivePage('tk')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePage === 'tk'
                ? 'bg-emerald-700 text-white shadow'
                : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-200'
            }`}
          >
            <span>🌿 {t('nav.tk')}</span>
          </button>

          <button
            onClick={() => setActivePage('knowledge')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePage === 'knowledge'
                ? 'bg-emerald-700 text-white shadow'
                : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{t('nav.vault')}</span>
          </button>

          <button
            onClick={() => setActivePage('authorities')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePage === 'authorities'
                ? 'bg-emerald-700 text-white shadow'
                : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-200'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>{t('nav.authorities')}</span>
          </button>

          <button
            onClick={() => setActivePage('directory')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePage === 'directory'
                ? 'bg-emerald-700 text-white shadow'
                : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-200'
            }`}
          >
            <span>🏛️ {t('nav.directory')}</span>
          </button>

          <button
            onClick={() => setActivePage('research')}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePage === 'research'
                ? 'bg-emerald-700 text-white shadow'
                : 'text-slate-700 hover:text-emerald-900 hover:bg-slate-200'
            }`}
          >
            <span>📚 {t('nav.research', 'Research Evidence')}</span>
          </button>
        </nav>

        {/* Right Tools & Language Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Simple Mode Toggle */}
          <button
            onClick={toggleSimpleMode}
            className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
              isSimpleMode
                ? 'bg-emerald-700 text-white border-emerald-800 shadow'
                : 'bg-emerald-50 text-emerald-950 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Toggle Simple Phrasing for Rural & Local Users"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-200" />
            <span className="hidden sm:inline">🟢 {t('nav.simpleMode', 'Simple Mode')}</span>
          </button>

          {/* India / International Toggle */}
          <div className="hidden sm:flex bg-emerald-50 border border-emerald-200 rounded-xl p-0.5 items-center text-xs font-bold">
            <button
              onClick={() => {
                setJurisdictionFilter('india');
                setJurisdiction('IPO_IN');
              }}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                jurisdictionFilter === 'india'
                  ? 'bg-emerald-700 text-white shadow'
                  : 'text-slate-700 hover:text-emerald-900'
              }`}
            >
              🇮🇳 India
            </button>
            <button
              onClick={() => {
                setJurisdictionFilter('international');
                setJurisdiction('WIPO');
              }}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                jurisdictionFilter === 'international'
                  ? 'bg-emerald-700 text-white shadow'
                  : 'text-slate-700 hover:text-emerald-900'
              }`}
            >
              🌍 Intl
            </button>
          </div>

          {/* Clean 5-Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1.5 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 text-emerald-950 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>{activeLangObj.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-emerald-700" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-emerald-200 rounded-2xl shadow-2xl z-50 py-2 overflow-hidden">
                <div className="px-3 py-1.5 text-[10px] font-bold text-emerald-900 uppercase tracking-wider border-b border-emerald-100 flex items-center justify-between">
                  <span>Select Language</span>
                  <span className="text-emerald-700 font-extrabold">5 Active</span>
                </div>

                <div className="py-1">
                  {LANGUAGES.map((l) => {
                    const isSelected = language === l.code;
                    return (
                      <button
                        key={l.code}
                        onClick={() => handleSelectLanguage(l.code)}
                        className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-100/70 text-emerald-950 font-bold'
                            : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold">{l.nativeName}</span>
                          {l.name !== l.nativeName && (
                            <span className="text-[10px] text-slate-400 font-normal">({l.name})</span>
                          )}
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="xl:hidden flex items-center justify-around bg-emerald-50 border-t border-emerald-200 px-2 py-2 text-xs font-bold text-slate-700 overflow-x-auto">
        <button onClick={() => setActivePage('home')} className={`px-2 py-1 rounded whitespace-nowrap ${activePage === 'home' ? 'bg-emerald-700 text-white' : ''}`}>
          {t('nav.home')}
        </button>
        <button onClick={() => setActivePage('chat')} className={`px-2 py-1 rounded whitespace-nowrap ${activePage === 'chat' ? 'bg-emerald-700 text-white' : ''}`}>
          {t('nav.chat')}
        </button>
        <button onClick={() => setActivePage('tk')} className={`px-2 py-1 rounded whitespace-nowrap ${activePage === 'tk' ? 'bg-emerald-700 text-white' : ''}`}>
          {t('nav.tk')}
        </button>
        <button onClick={() => setActivePage('knowledge')} className={`px-2 py-1 rounded whitespace-nowrap ${activePage === 'knowledge' ? 'bg-emerald-700 text-white' : ''}`}>
          {t('nav.vault')}
        </button>
        <button onClick={() => setActivePage('authorities')} className={`px-2 py-1 rounded whitespace-nowrap ${activePage === 'authorities' ? 'bg-emerald-700 text-white' : ''}`}>
          {t('nav.authorities')}
        </button>
        <button onClick={() => setActivePage('directory')} className={`px-2 py-1 rounded whitespace-nowrap ${activePage === 'directory' ? 'bg-emerald-700 text-white' : ''}`}>
          {t('nav.directory')}
        </button>
        <button onClick={() => setActivePage('research')} className={`px-2 py-1 rounded whitespace-nowrap ${activePage === 'research' ? 'bg-emerald-700 text-white' : ''}`}>
          📚 Research Evidence
        </button>
      </div>
    </header>
  );
};
