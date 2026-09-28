import type { TrpPrpRecord } from '../types/ip';

export const TRP_PRP_REPOSITORY: TrpPrpRecord[] = [
  {
    id: 'trp-2026-001',
    title: 'Technical Research Paper (TRP): Retrieval-Augmented Generation Architecture for Indian IP & Traditional Knowledge Safeguards',
    translatedTitle: 'तकनीकी अनुसंधान पत्र (TRP): भारतीय बौद्धिक संपदा एवं पारंपरिक ज्ञान सुरक्षा हेतु आरएजी आर्किटेक्चर',
    problemStatement: 'SIH 2026 Problem Statement 26045: Developing an AI-assisted legal intelligence system grounded in official statutory IP laws and CSIR-TKDL repository.',
    category: 'TRP',
    authors: ['ATREYA Research Team', 'AI Legal Engineering Division'],
    team: 'ATREYA Innovators',
    institution: 'Smart India Hackathon 2026 / DPIIT Innovation Track',
    year: '2026',
    abstract: 'This paper outlines the technical engineering of ATREYA, an evidence-grounded client-side Retrieval-Augmented Generation (RAG) system designed to analyze Indian patentability exclusions under Section 3(p), Section 3(k), Section 3(d), and CSIR-TKDL prior art rules across 20 languages.',
    keywords: ['Section 3(p)', 'TKDL', 'RAG Engine', 'Patents Act 1970', 'Multilingual NLP', 'Biological Diversity Act 2002'],
    technicalSections: {
      '1. Problem Understanding': 'Traditional knowledge holders and Ayurvedic innovators face complex statutory hurdles under Section 3(p) and prior art verification against CSIR-TKDL.',
      '2. Proposed Solution': 'ATREYA implements an end-to-end client-side RAG engine that classifies intent, evaluates jurisdiction (IPO IN vs WIPO PCT), and provides evidence-grounded answers.',
      '3. RAG System Architecture': '11-stage pipeline: Question Input -> Multilingual Detection (20 Languages) -> Intent Classifier -> Hybrid Vector Retrieval -> Citation Validation -> Safety Abstention.',
      '4. Statutory Grounding': 'Grounds responses strictly in codified central acts: Patents Act 1970, Trade Marks Act 1999, Biological Diversity Act 2002, and Patent Rules 2024 schedules.',
      '5. Safety & Abstention': 'If evidence level is insufficient, the engine explicitly abstains and flags "Requires Verification" rather than hallucinating legal citations.'
    },
    references: [
      'The Patents Act, 1970 (Act No. 39 of 1970) as amended.',
      'CSIR & Ministry of Ayush, Traditional Knowledge Digital Library (TKDL) Prior Art Framework (2001-2026).',
      'Biological Diversity Act, 2002 (Sec 6 & 8 - National Biodiversity Authority).',
      'WIPO Patent Cooperation Treaty (PCT) Guidelines (2025 Edition).'
    ],
    sourceUrl: 'https://ipindia.gov.in',
    documentUrl: '#',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-27T00:00:00Z',
    language: 'en',
    status: 'Demo Record'
  },
  {
    id: 'prp-2026-002',
    title: 'Project Research Paper (PRP): ATREYA Product Strategy, User Impact & Feasibility',
    translatedTitle: 'परियोजना अनुसंधान पत्र (PRP): आत्रेय उत्पाद रणनीति, उपयोगकर्ता प्रभाव एवं व्यवहार्यता',
    problemStatement: 'SIH 2026 Problem Statement 26045: Product design, user persona feasibility, and societal impact of a multilingual IP assistant in rural India.',
    category: 'PRP',
    authors: ['ATREYA Product Strategy Team'],
    team: 'ATREYA Innovators',
    institution: 'Smart India Hackathon 2026 / Ministry of Commerce & Industry',
    year: '2026',
    abstract: 'This project paper documents the user-centered design, persona accessibility, 20-language localization strategy, and feasibility roadmap of ATREYA for rural Ayurvedic practitioners, DPIIT startups, and academic scholars.',
    keywords: ['User Accessibility', 'Ayurveda Practitioners', 'Startup Fee Waivers', 'Form 18A', 'Biopiracy Prevention', 'Rural IP Literacy'],
    projectSections: {
      '1. Target User Personas': 'Ayurvedic doctors, traditional healers, DPIIT-recognized startups, pharmacy/law students, research scientists, and SIH evaluators.',
      '2. User Workflow': 'User selects language -> Voice/Text input -> Problem Solver classification -> Evidence retrieval -> Step-by-step simple explanation with official links.',
      '3. Innovation & Feasibility': '100% client-side execution with zero external API key requirements. Full localization in 20 languages (15 Indian + 5 International).',
      '4. Societal Impact': 'Democratizes IP legal literacy in rural India, thwarts global biopiracy of traditional medicinal herbs, and accelerates startup patent filings via Form 18A.'
    },
    references: [
      'CGPDTM Annual Report 2024-2025, Intellectual Property India.',
      'DPIIT Startup India IP Protection Scheme (SIPP Guidelines).',
      'Food Safety and Standards (Ayurveda Aahara) Regulations, 2022.'
    ],
    sourceUrl: 'https://ayush.gov.in',
    documentUrl: '#',
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-09-27T00:00:00Z',
    language: 'en',
    status: 'Demo Record'
  }
];

export const searchTrpPrpRepository = (
  query: string = '',
  categoryFilter: 'All' | 'TRP' | 'PRP' = 'All',
  yearFilter: string = 'All',
  languageFilter: string = 'All'
): TrpPrpRecord[] => {
  return TRP_PRP_REPOSITORY.filter((rec) => {
    const matchesCategory = categoryFilter === 'All' || rec.category === categoryFilter;
    const matchesYear = yearFilter === 'All' || rec.year === yearFilter;
    const matchesLang = languageFilter === 'All' || rec.language === languageFilter;
    
    const q = query.toLowerCase().trim();
    const matchesQuery =
      !q ||
      rec.title.toLowerCase().includes(q) ||
      rec.abstract.toLowerCase().includes(q) ||
      rec.keywords.some((k) => k.toLowerCase().includes(q)) ||
      rec.institution.toLowerCase().includes(q);

    return matchesCategory && matchesYear && matchesLang && matchesQuery;
  });
};
