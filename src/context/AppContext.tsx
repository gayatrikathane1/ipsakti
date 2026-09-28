import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { PageView, LanguageCode, JurisdictionCode, LegalCitation, VaultItem, LocalWordEntry } from '../types/ip';
import { UI_STRINGS, LANGUAGES } from '../data/translations';

// Import 30 Locale JSON Files
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import mr from '../locales/mr.json';
import bn from '../locales/bn.json';
import ta from '../locales/ta.json';
import te from '../locales/te.json';
import gu from '../locales/gu.json';
import kn from '../locales/kn.json';
import ml from '../locales/ml.json';
import pa from '../locales/pa.json';
import or from '../locales/or.json';
import as from '../locales/as.json';
import ur from '../locales/ur.json';
import kok from '../locales/kok.json';
import ne from '../locales/ne.json';
import ks from '../locales/ks.json';
import sd from '../locales/sd.json';
import mai from '../locales/mai.json';
import doi from '../locales/doi.json';
import sa from '../locales/sa.json';
import brx from '../locales/brx.json';
import sat from '../locales/sat.json';
import mni from '../locales/mni.json';
import lus from '../locales/lus.json';
import kha from '../locales/kha.json';
import fr from '../locales/fr.json';
import es from '../locales/es.json';
import ar from '../locales/ar.json';
import zh from '../locales/zh.json';
import ja from '../locales/ja.json';

const LOCALES: Partial<Record<LanguageCode, any>> = {
  en, hi, mr, bn, ta, te, gu, kn, ml, pa, or, as, ur, kok, ne,
  ks, sd, mai, doi, sa, brx, sat, mni, lus, kha,
  fr, es, ar, zh, ja
};

interface AppContextType {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  jurisdiction: JurisdictionCode;
  setJurisdiction: (jur: JurisdictionCode) => void;
  jurisdictionFilter: 'india' | 'international';
  setJurisdictionFilter: (filter: 'india' | 'international') => void;
  activeCitation: LegalCitation | null;
  setActiveCitation: (cit: LegalCitation | null) => void;
  isFeeCalcOpen: boolean;
  setIsFeeCalcOpen: (open: boolean) => void;
  isEligibilityWizardOpen: boolean;
  setIsEligibilityWizardOpen: (open: boolean) => void;
  isDisclaimerOpen: boolean;
  setIsDisclaimerOpen: (open: boolean) => void;
  isDocumentUploadOpen: boolean;
  setIsDocumentUploadOpen: (open: boolean) => void;
  isLocalWordModalOpen: boolean;
  setIsLocalWordModalOpen: (open: boolean) => void;
  isSimpleMode: boolean;
  setIsSimpleMode: (simple: boolean) => void;
  toggleSimpleMode: () => void;
  savedVaultItems: VaultItem[];
  saveToVault: (item: Omit<VaultItem, 'id' | 'date'>) => void;
  removeFromVault: (id: string) => void;
  savedLocalWords: LocalWordEntry[];
  saveLocalWord: (entry: Omit<LocalWordEntry, 'id' | 'createdAt'>) => void;
  deleteLocalWord: (id: string) => void;
  chatPromptInput: string;
  setChatPromptInput: (prompt: string) => void;
  t: (keyPath: string, fallback?: string) => string;
  openChatWithPrompt: (prompt: string) => void;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('atreya_lang') || localStorage.getItem('atreya_language');
    return (saved as LanguageCode) || 'en';
  });
  const [jurisdiction, setJurisdiction] = useState<JurisdictionCode>('IPO_IN');
  const [jurisdictionFilter, setJurisdictionFilter] = useState<'india' | 'international'>('india');
  const [activeCitation, setActiveCitation] = useState<LegalCitation | null>(null);
  const [isFeeCalcOpen, setIsFeeCalcOpen] = useState<boolean>(false);
  const [isEligibilityWizardOpen, setIsEligibilityWizardOpen] = useState<boolean>(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState<boolean>(false);
  const [isLocalWordModalOpen, setIsLocalWordModalOpen] = useState<boolean>(false);
  const [isSimpleMode, setIsSimpleModeState] = useState<boolean>(() => {
    return localStorage.getItem('atreya_simple_mode') === 'true';
  });
  const [savedVaultItems, setSavedVaultItems] = useState<VaultItem[]>(() => {
    try {
      const saved = localStorage.getItem('atreya_vault');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedLocalWords, setSavedLocalWords] = useState<LocalWordEntry[]>(() => {
    try {
      const saved = localStorage.getItem('atreya_local_words');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'word-1',
              localWord: 'Kadukai / Kadukkai',
              meaning: 'Haritaki (Terminalia chebula) fruit rind used for digestive & wound care',
              languageOrRegion: 'Tamil Nadu / South India',
              englishEquivalent: 'Chebulic Myrobalan',
              hindiEquivalent: 'Harad / Haritaki',
              marathiEquivalent: 'Hirda',
              verificationStatus: 'Requires Verification',
              createdAt: '2026-09-27',
            },
            {
              id: 'word-2',
              localWord: 'Kombu Kashaayam',
              meaning: 'Traditional decoction prepared from neem leaves, turmeric, and local herbs for fever',
              languageOrRegion: 'Varhadi / Vidarbha Maharashtra',
              englishEquivalent: 'Herbal Immune Decoction',
              hindiEquivalent: 'Kada / Kwath',
              marathiEquivalent: 'Khadya Kadha',
              verificationStatus: 'User-provided local meaning',
              createdAt: '2026-09-27',
            },
          ];
    } catch {
      return [];
    }
  });

  const [chatPromptInput, setChatPromptInput] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const saveLocalWord = (entry: Omit<LocalWordEntry, 'id' | 'createdAt'>) => {
    const newEntry: LocalWordEntry = {
      ...entry,
      id: `word-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newEntry, ...savedLocalWords];
    setSavedLocalWords(updated);
    localStorage.setItem('atreya_local_words', JSON.stringify(updated));
  };

  const deleteLocalWord = (id: string) => {
    const updated = savedLocalWords.filter((w) => w.id !== id);
    setSavedLocalWords(updated);
    localStorage.setItem('atreya_local_words', JSON.stringify(updated));
  };

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('atreya_lang', lang);
  };

  const setIsSimpleMode = (simple: boolean) => {
    setIsSimpleModeState(simple);
    localStorage.setItem('atreya_simple_mode', simple ? 'true' : 'false');
  };

  const toggleSimpleMode = () => {
    setIsSimpleMode(!isSimpleMode);
  };

  const saveToVault = (item: Omit<VaultItem, 'id' | 'date'>) => {
    const newItem: VaultItem = {
      ...item,
      id: `vault-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toLocaleDateString()
    };
    const updated = [newItem, ...savedVaultItems];
    setSavedVaultItems(updated);
    localStorage.setItem('atreya_vault', JSON.stringify(updated));
  };

  const removeFromVault = (id: string) => {
    const updated = savedVaultItems.filter((i) => i.id !== id);
    setSavedVaultItems(updated);
    localStorage.setItem('atreya_vault', JSON.stringify(updated));
  };

  useEffect(() => {
    // Handle RTL for Arabic and Urdu
    if (language === 'ur' || language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl');
    }
  }, [language]);

  // Nested JSON Key Translation Resolver
  const t = (keyPath: string, fallback?: string): string => {
    const resolvePath = (obj: any, path: string) => {
      if (!obj) return undefined;
      const parts = path.split('.');
      let current = obj;
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          return undefined;
        }
      }
      return typeof current === 'string' ? current : undefined;
    };

    // 1. Try selected locale JSON
    const currentLocaleObj = LOCALES[language];
    let val = resolvePath(currentLocaleObj, keyPath);
    if (val) return val;

    // 2. Try fallbackBaseLang locale JSON if selecting a village dialect
    const langMeta = LANGUAGES.find((l) => l.code === language);
    if (langMeta && langMeta.fallbackBaseLang) {
      const fallbackObj = LOCALES[langMeta.fallbackBaseLang];
      val = resolvePath(fallbackObj, keyPath);
      if (val) return val;
    }

    // 3. Try English locale JSON
    val = resolvePath(LOCALES['en'], keyPath);
    if (val) return val;

    // 4. Try legacy UI_STRINGS
    if (UI_STRINGS[keyPath] && UI_STRINGS[keyPath][language]) {
      return UI_STRINGS[keyPath][language]!;
    }
    if (UI_STRINGS[keyPath] && UI_STRINGS[keyPath]['en']) {
      return UI_STRINGS[keyPath]['en']!;
    }

    return fallback || keyPath;
  };

  const openChatWithPrompt = (prompt: string) => {
    setChatPromptInput(prompt);
    setActivePage('chat');
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*`_>]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Map language code to BCP 47 tag
    const langMap: Partial<Record<LanguageCode, string>> = {
      en: 'en-IN',
      hi: 'hi-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      ml: 'ml-IN',
      pa: 'pa-IN',
      or: 'or-IN',
      as: 'as-IN',
      ur: 'ur-IN',
      kok: 'kok-IN',
      ne: 'ne-NP',
      ks: 'ks-IN',
      sd: 'sd-IN',
      mai: 'mai-IN',
      doi: 'doi-IN',
      sa: 'sa-IN',
      brx: 'brx-IN',
      sat: 'sat-IN',
      mni: 'mni-IN',
      lus: 'lus-IN',
      kha: 'kha-IN',
      fr: 'fr-FR',
      es: 'es-ES',
      ar: 'ar-SA',
      zh: 'zh-CN',
      ja: 'ja-JP',
    };

    utterance.lang = langMap[language] || 'en-IN';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        language,
        setLanguage,
        jurisdiction,
        setJurisdiction,
        jurisdictionFilter,
        setJurisdictionFilter,
        activeCitation,
        setActiveCitation,
        isFeeCalcOpen,
        setIsFeeCalcOpen,
        isEligibilityWizardOpen,
        setIsEligibilityWizardOpen,
        isDisclaimerOpen,
        setIsDisclaimerOpen,
        isDocumentUploadOpen,
        setIsDocumentUploadOpen,
        isLocalWordModalOpen,
        setIsLocalWordModalOpen,
        isSimpleMode,
        setIsSimpleMode,
        toggleSimpleMode,
        savedVaultItems,
        saveToVault,
        removeFromVault,
        savedLocalWords,
        saveLocalWord,
        deleteLocalWord,
        chatPromptInput,
        setChatPromptInput,
        t,
        openChatWithPrompt,
        speakText,
        isSpeaking,
        stopSpeaking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
