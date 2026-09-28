import type { LanguageOption, JurisdictionOption, LanguageCode } from '../types/ip';

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🌐', isIndian: true, category: 'indian' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', isIndian: true, category: 'indian' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', isIndian: true, category: 'indian' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', isIndian: true, category: 'indian' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', isIndian: true, category: 'indian' },
];

export const JURISDICTIONS: JurisdictionOption[] = [
  {
    code: 'IPO_IN',
    name: 'India Patent Office (IPO - CGPDTM)',
    shortName: '🇮🇳 India (IPO)',
    region: 'National',
    flag: '🇮🇳',
    authority: 'Controller General of Patents, Designs & Trade Marks',
    isInternational: false,
  },
  {
    code: 'DELHI_IPO',
    name: 'Delhi Patent Office Branch',
    shortName: 'IPO Delhi',
    region: 'North India',
    flag: '🇮🇳',
    authority: 'Northern Regional IP Office (Bahadur Shah Zafar Marg)',
    isInternational: false,
  },
  {
    code: 'MUMBAI_IPO',
    name: 'Mumbai Patent Office Branch',
    shortName: 'IPO Mumbai',
    region: 'West India',
    flag: '🇮🇳',
    authority: 'Western Regional IP Office (Antop Hill)',
    isInternational: false,
  },
  {
    code: 'CHENNAI_IPO',
    name: 'Chennai Patent Office Branch',
    shortName: 'IPO Chennai',
    region: 'South India',
    flag: '🇮🇳',
    authority: 'Southern Regional IP Office (Guindy)',
    isInternational: false,
  },
  {
    code: 'KOLKATA_IPO',
    name: 'Kolkata Patent Office (HQ)',
    shortName: 'IPO Kolkata HQ',
    region: 'East India',
    flag: '🇮🇳',
    authority: 'Patent Office HQ (Salt Lake)',
    isInternational: false,
  },
  {
    code: 'WIPO',
    name: 'World Intellectual Property Organization (WIPO PCT)',
    shortName: '🌐 WIPO (International)',
    region: 'Global',
    flag: '🌐',
    authority: 'PCT International Bureau, Geneva',
    isInternational: true,
  },
  {
    code: 'USPTO',
    name: 'United States Patent & Trademark Office',
    shortName: '🇺🇸 USPTO (USA)',
    region: 'North America',
    flag: '🇺🇸',
    authority: 'U.S. Dept of Commerce, Alexandria VA',
    isInternational: true,
  },
  {
    code: 'EPO',
    name: 'European Patent Office (EPO)',
    shortName: '🇪🇺 EPO (Europe)',
    region: 'Europe',
    flag: '🇪🇺',
    authority: 'European Patent Organisation, Munich',
    isInternational: true,
  },
];

export const UI_STRINGS: Record<string, Partial<Record<LanguageCode, string>>> = {
  appName: {
    en: 'ATREYA',
  }
};
