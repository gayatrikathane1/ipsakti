export type PageView =
  | 'home'
  | 'chat'
  | 'knowledge'
  | 'tk'
  | 'research'
  | 'trp'
  | 'prp'
  | 'authorities'
  | 'directory'
  | 'solver'
  | 'idea'
  | 'localword';

export type LanguageCode =
  | 'en'
  | 'hi'
  | 'mr'
  | 'bn'
  | 'ta'
  | 'te'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or'
  | 'as'
  | 'ur'
  | 'kok'
  | 'ne'
  | 'ks'
  | 'sd'
  | 'mai'
  | 'doi'
  | 'sa'
  | 'brx'
  | 'sat'
  | 'mni'
  | 'lus'
  | 'kha'
  // Village & Regional Languages
  | 'var'
  | 'zad'
  | 'mly'
  | 'ahi'
  | 'hne'
  | 'nim'
  | 'mup'
  | 'bfy'
  | 'bns'
  | 'mwr'
  | 'mtr'
  | 'dhd'
  | 'hoj'
  | 'bho'
  | 'mag'
  | 'anp'
  | 'fiu'
  | 'kru'
  | 'awa'
  | 'bra'
  | 'bgc'
  | 'pa_reg'
  | 'bn_reg'
  | 'or_reg'
  | 'kn_reg'
  | 'ml_reg'
  | 'ta_reg'
  | 'te_reg'
  | 'as_reg'
  // International Languages
  | 'fr'
  | 'es'
  | 'ar'
  | 'zh'
  | 'ja';

export type LanguageCategory = 'indian' | 'village' | 'international';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  isRtl?: boolean;
  isIndian?: boolean;
  isVillage?: boolean;
  category?: LanguageCategory;
  stateRegion?: string;
  fallbackBaseLang?: LanguageCode;
}

export type JurisdictionCode =
  | 'IPO_IN'
  | 'DELHI_IPO'
  | 'MUMBAI_IPO'
  | 'CHENNAI_IPO'
  | 'KOLKATA_IPO'
  | 'WIPO'
  | 'USPTO'
  | 'EPO';

export interface JurisdictionOption {
  code: JurisdictionCode;
  name: string;
  shortName: string;
  region: string;
  flag: string;
  authority: string;
  isInternational?: boolean;
}

export type LegalCategory =
  | 'patent'
  | 'trademark'
  | 'copyright'
  | 'gi'
  | 'tk'
  | 'biodiversity'
  | 'ayurveda_reg'
  | 'international_ip'
  | 'case_law'
  | 'form_fee';

export interface LegalCitation {
  id: string;
  title: string;
  act: string;
  section: string;
  legalText: string;
  plainEnglishSummary: string;
  jurisdiction: JurisdictionCode;
  relevanceScore: number;
  gazetteRef?: string;
  officialUrl?: string;
  penaltyOrTerm?: string;
}

export interface LegalItem {
  id: string;
  title: string;
  category: LegalCategory;
  actName: string;
  sectionOrRule: string;
  description: string;
  fullText: string;
  keyTakeaways: string[];
  citations: LegalCitation[];
  formNumber?: string;
  feeDetails?: {
    individualFee: number;
    startupFee: number;
    largeEntityFee: number;
    currency: string;
  };
  tags: string[];
}

export interface OfficialSource {
  id?: string;
  name?: string;
  organization?: string;
  category?: string;
  authorityLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  sourceType?: string;
  legalStatus?: string;
  description?: string;
  topics?: string[];
  officialUrl?: string;
  directLegalUrl?: string;
  jurisdiction?: string;
  lastVerified?: string;
  verificationStatus?:
    | 'verified-official'
    | 'official-informational'
    | 'research'
    | 'international-official'
    | 'secondary'
    | 'requires-verification'
    | 'broken';
  relatedActs?: string[];
  relatedSections?: string[];
  whyThisSource?: string;
  title?: string;
  authority?: string;
  url?: string;
  alternativeUrl?: string;
  legalDatabaseUrl?: string;
  officialPdfUrl?: string;
  navigationGuide?: string;
  publicationDate?: string;
  effectiveDate?: string;
  sectionOrPage?: string;
  documentId?: string;
  status?: string;
  isTrusted?: boolean;
}

export interface TrdReferenceCard {
  id: string;
  title: string;
  organization: string;
  dateOrYear: string;
  jurisdiction: string;
  shortExplanation: string;
  openSourceUrl: string;
  category:
    | 'SIH Problem Statement 26045'
    | 'IP India / CGPDTM'
    | 'Indian Patents Act, 1970'
    | 'CSIR-TKDL'
    | 'Ministry of Ayush'
    | 'National Biodiversity Authority'
    | 'WIPO'
    | 'WIPO/PCT resources';
}

export type EvidenceLevel = 'high' | 'moderate' | 'insufficient';

export interface RagAnswer {
  answer: string;
  simpleExplanation?: string;
  realLifeExample?: string;
  relevantLaw?: string;
  whatIsRight?: string[];
  whatIsWrong?: string[];
  steps?: string[];
  whyPoints?: string[];
  evidence?: string;
  sources?: OfficialSource[];
  researchReferences?: Array<{
    title: string;
    authors?: string;
    journalOrPublisher?: string;
    year?: string;
    doiOrIsbn?: string;
    findings?: string;
    url?: string;
  }>;
  nextSteps?: string[];
  importantNotice?: string;
  evidenceLevel?: EvidenceLevel;
  category?: string;
  citations?: LegalCitation[];
  sourceHierarchyLevel?: number;
  sourceTypeLabel?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  category?: string;
  ragAnswer?: RagAnswer;
  citations?: LegalCitation[];
  officialSources?: OfficialSource[];
  isStreaming?: boolean;
  suggestedFollowups?: string[];
  disclaimerAlert?: boolean;
}

export interface TrustedCorpusItem {
  documentId: string;
  title: string;
  authority: string;
  jurisdiction: string;
  domain: string;
  publicationDate: string;
  effectiveDate: string;
  status: string;
  url: string;
  sectionOrPage: string;
  textChunk: string;
  embeddingRef: string;
}

export interface ResearchResourceItem {
  id: string;
  title: string;
  authorOrOrg: string;
  year: string;
  category:
    | 'Indian Laws & Acts'
    | 'Government Resources'
    | 'Traditional Knowledge'
    | 'WIPO Resources'
    | 'Research Papers'
    | 'Books & Publications'
    | 'Case/Legal Resources'
    | 'Ayurveda & Regulatory Resources';
  type: string;
  description: string;
  officialUrl: string;
  isTrusted: boolean;
  whyThisSource?: string;
}

export interface ScreeningResult {
  inventionTitle: string;
  noveltyDescription: string;
  isTkRelated: boolean;
  isAyurvedicFormulation: boolean;
  type: 'product' | 'process';
  jurisdiction: string;
  preliminaryVerdict: string;
  relevantSection: string;
  explanation: string;
  evidence: string;
  sources: OfficialSource[];
  possibleIssue: string;
  nextStep: string;
}

export interface VaultItem {
  id: string;
  title: string;
  type: 'question' | 'evidence' | 'source' | 'tk' | 'trp' | 'prp' | 'doc' | 'idea';
  language: LanguageCode;
  date: string;
  source?: string;
  notes?: string;
  data?: any;
}

export interface TrpPrpRecord {
  id: string;
  title: string;
  translatedTitle?: string;
  problemStatement: string;
  category: 'TRP' | 'PRP';
  authors: string[];
  team: string;
  institution: string;
  year: string;
  abstract: string;
  keywords: string[];
  technicalSections?: Record<string, string>;
  projectSections?: Record<string, string>;
  references: string[];
  sourceUrl?: string;
  documentUrl?: string;
  createdAt: string;
  updatedAt: string;
  language: LanguageCode;
  status: 'Demo Record' | 'Verified';
}

export interface OfficialAuthority {
  id: string;
  name: string;
  officialStatus: string;
  domain: string;
  provides: string;
  usefulFor: string;
  url: string;
  whyThisSource: string;
  category: string;
}

export interface LocalWordEntry {
  id: string;
  localWord: string;
  meaning: string;
  languageOrRegion: string;
  englishEquivalent?: string;
  hindiEquivalent?: string;
  marathiEquivalent?: string;
  context?: string;
  userMeaning?: string;
  verificationStatus: 'User-provided local meaning' | 'Requires Verification' | 'Verified';
  createdAt?: string;
}

export interface LocalBridgeSubmission {
  villageOrRegion?: string;
  localLanguage?: string;
  localName?: string;
  resourceName: string;
  traditionalPractice: string;
  traditionalUse?: string;
  localDescription: string;
  region: string;
  preparationProcess: string;
  historicalContext: string;
  evidenceFound: string;
  relatedResearch: string;
  ipRelevance: string;
  regulatoryRelevance: string;
  verificationStatus: 'Requires Verification';
  recommendedNextStep: string;
}

export interface ReferenceBook {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  publisher: string;
  edition?: string;
  year: string;
  isbn?: string;
  topic: string;
  category:
    | 'Ayurveda'
    | 'Traditional Knowledge'
    | 'Indian Medical Systems'
    | 'Intellectual Property'
    | 'Patent Law'
    | 'Biodiversity'
    | 'Food Regulation'
    | 'Research Methods';
  whyUseful: string;
  officialSourceUrl: string;
  publisherUrl?: string;
  badge: '🟢 OFFICIAL GOVERNMENT SOURCE' | '🔵 OFFICIAL RESEARCH SOURCE' | '📖 REFERENCE BOOK' | '📘 PEER-REVIEWED RESEARCH';
}
