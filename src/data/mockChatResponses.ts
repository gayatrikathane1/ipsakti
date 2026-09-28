import type { LegalCitation, OfficialSource, RagAnswer } from '../types/ip';
import { MOCK_CITATIONS } from './mockKnowledgeBase';

export interface DemoQuestion {
  id: string;
  category: 'Patent' | 'Traditional Knowledge' | 'Ayurveda' | 'Trademark' | 'Copyright' | 'International IP' | 'AI & IP';
  question: string;
  shortTitle: string;
}

export const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: 'q-what-is-ipr',
    category: 'Patent',
    shortTitle: 'What is IPR?',
    question: 'What is IPR?',
  },
  {
    id: 'q-what-is-patent',
    category: 'Patent',
    shortTitle: 'What is a Patent?',
    question: 'What is a patent?',
  },
  {
    id: 'q-apply-patent',
    category: 'Patent',
    shortTitle: 'How to Apply for a Patent',
    question: 'How do I apply for a patent?',
  },
  {
    id: 'q-novelty',
    category: 'Patent',
    shortTitle: 'What is Novelty?',
    question: 'What is novelty?',
  },
  {
    id: 'q-inventive-step',
    category: 'Patent',
    shortTitle: 'What is Inventive Step?',
    question: 'What is inventive step?',
  },
  {
    id: 'q-prior-art',
    category: 'Patent',
    shortTitle: 'What is Prior Art?',
    question: 'What is prior art?',
  },
  {
    id: 'q1',
    category: 'Traditional Knowledge',
    shortTitle: 'Section 3(p) Meaning',
    question: 'What is Section 3(p)?',
  },
  {
    id: 'q-provisional-spec',
    category: 'Patent',
    shortTitle: 'Provisional vs Complete Spec',
    question: 'What is a provisional specification?',
  },
  {
    id: 'q-patent-cost',
    category: 'Patent',
    shortTitle: 'Patent Application Cost',
    question: 'How much does a patent application cost?',
  },
  {
    id: 'q-patent-duration',
    category: 'Patent',
    shortTitle: 'How Long Does a Patent Last?',
    question: 'How long does a patent last?',
  },
  {
    id: 'q7',
    category: 'Traditional Knowledge',
    shortTitle: 'What is TKDL?',
    question: 'What is TKDL?',
  },
];

export interface RAGPipelineResult {
  ragAnswer: RagAnswer;
  citations: LegalCitation[];
  officialSources: OfficialSource[];
  suggestedFollowups: string[];
}

export function getMockAIResponse(userQuery: string): RAGPipelineResult {
  const q = userQuery.toLowerCase().trim();

  // 1. WHAT IS IPR / INTELLECTUAL PROPERTY?
  if (q === 'what is ipr?' || q === 'what is ipr' || q === 'what is ip?' || q === 'what is ip' || q.includes('intellectual property rights') || q.includes('what is ipr')) {
    return {
      ragAnswer: {
        answer:
          'Intellectual Property Rights (IPR) are legal rights granted to creators and innovators over creations of the mind. These rights protect inventions, brand names, original literary/artistic works, industrial aesthetic designs, and geographical indications.',
        simpleExplanation:
          'In simple words: Just like you own physical property (such as land or a vehicle), IPR gives you legal ownership over your intellectual creations so that others cannot copy or use them without permission.',
        realLifeExample:
          'Suppose you develop a novel solar-powered herb drying machine (Patent), market it under the brand name "SolarVeda" (Trademark), write an instruction user guide (Copyright), and style its unique outer casing (Industrial Design). Each component is protected by a different form of IPR.',
        relevantLaw: 'The Patents Act 1970, Trade Marks Act 1999, Copyright Act 1957, Designs Act 2000, GI Act 1999',
        whyPoints: [
          'Encourages innovation by offering legal protection and commercial exclusivity.',
          'Provides mechanisms to prevent unauthorized copying, biopiracy, or brand misuse.',
          'Allows creators to monetize their work through licensing, assignment, or commercial sale.'
        ],
        whatIsRight: [
          'Identify which legal category fits your specific creation.',
          'Conduct prior searches on official databases before commercial launch.',
          'Use official government filing portals (IP India / India Code / WIPO).'
        ],
        whatIsWrong: [
          'Assuming one single registration covers all forms of intellectual property.',
          'Failing to check existing trademarks or patent databases before using a name or selling a product.',
          'Confusing Copyright (which protects expression) with a Patent (which protects technical inventions).'
        ],
        steps: [
          'Identify the nature of your creation (Invention, Brand Name, Design, Work).',
          'Search existing registries on IP India to check availability.',
          'File the appropriate application with the official authority.'
        ],
        sources: [
          {
            title: 'WIPO — Basics of Intellectual Property',
            authority: 'World Intellectual Property Organization (UN)',
            url: 'https://www.wipo.int/en/web/about-ip',
            whyThisSource: 'Apex global United Nations agency defining international IP standards.'
          },
          {
            title: 'IP India — Controller General of Patents, Designs & Trade Marks',
            authority: 'DPIIT, Ministry of Commerce & Industry, Govt of India',
            url: 'https://ipindia.gov.in/',
            whyThisSource: 'Official Indian statutory authority managing IP registrations.'
          }
        ],
        nextSteps: [
          'Determine if your creation is an invention, brand, design, or written work.',
          'Search IP India databases for prior filings.',
          'Consult a registered IP agent for professional guidance.'
        ],
        importantNotice: 'ATREYA provides statutory guidance for public educational purposes. Specific IP strategy should be verified with a registered patent/trademark attorney.',
        evidenceLevel: 'high',
        category: 'Patent'
      },
      citations: [MOCK_CITATIONS.sec3p],
      officialSources: [
        {
          title: 'IP India Official Portal',
          authority: 'CGPDTM, Govt of India',
          url: 'https://ipindia.gov.in/'
        }
      ],
      suggestedFollowups: [
        'What is a patent?',
        'How do I apply for a patent?',
        'What is the difference between a patent and a trademark?'
      ]
    };
  }

  // 2. WHAT IS A PATENT?
  if (q === 'what is a patent?' || q === 'what is a patent' || q === 'what is patent' || q.includes('define patent')) {
    return {
      ragAnswer: {
        answer:
          'A patent is an exclusive legal right granted by the government for an invention for a limited period (20 years in India), subject to statutory patent law requirements. It provides the patentee with the legal right to prevent others from making, using, selling, or importing the patented invention without consent.',
        simpleExplanation:
          'In simple words: A patent is a legal monopoly granted for a qualifying new technical invention. A patent is NOT simply a registration of an idea—the invention must be new, non-obvious, and practically useful.',
        realLifeExample:
          'Suppose you invent a new temperature-controlled botanical extraction machine that yields 40% more active Ayurvedic bio-extracts using less energy. If it satisfies novelty and inventive step, you can apply for a patent to stop competitors from copying your exact machine.',
        relevantLaw: 'The Patents Act, 1970 — Sections 2(1)(j), 2(1)(m), 6, 48 & 53',
        whyPoints: [
          'Grants exclusive commercial exploitation rights for 20 years from the filing date.',
          'Requires full public disclosure of the technical invention in exchange for exclusivity.',
          'Subject to statutory exclusions in Sections 3 and 4 of the Patents Act, 1970.'
        ],
        whatIsRight: [
          'Search existing patents and prior art before filing.',
          'Understand the three core criteria: Novelty, Inventive Step, Industrial Applicability.',
          'Prepare technical descriptions and claims for official examination.'
        ],
        whatIsWrong: [
          'Assuming every abstract idea or mental concept is patentable.',
          'Assuming that filing an application automatically guarantees grant of a patent.',
          'Copying an existing public machine or ancient traditional remedy and claiming it as a new invention.'
        ],
        steps: [
          'Verify your invention solves a technical problem in a new way.',
          'Conduct a prior art search on IP India and PATENTSCOPE.',
          'Prepare provisional or complete specification (Form 2).',
          'File with the Patent Office branch having regional jurisdiction.'
        ],
        sources: [
          {
            title: 'IP India — Basics of Patents',
            authority: 'Office of the Controller General of Patents, Designs & Trade Marks',
            url: 'https://ipindia.gov.in/basics-of-patents',
            whyThisSource: 'Official educational guide published by the Indian Patent Office.'
          },
          {
            title: 'The Patents Act, 1970',
            authority: 'Legislative Department, Ministry of Law and Justice',
            url: 'https://ipindia.gov.in/acts/patent-act-1970',
            whyThisSource: 'Primary parliamentary statute governing patents in India.'
          }
        ],
        nextSteps: [
          'Perform a preliminary prior art search on IP India.',
          'Document the technical specifications and working examples of your invention.',
          'Decide whether to file a Provisional or Complete Specification.'
        ],
        importantNotice: 'A patent grant depends on formal examination by the Patent Office. No AI tool or agent can guarantee a patent grant.',
        evidenceLevel: 'high',
        category: 'Patent'
      },
      citations: [MOCK_CITATIONS.sec3p],
      officialSources: [
        {
          title: 'IP India — Basics of Patents',
          authority: 'CGPDTM, Govt of India',
          url: 'https://ipindia.gov.in/basics-of-patents'
        }
      ],
      suggestedFollowups: [
        'How do I apply for a patent?',
        'What is novelty?',
        'What is Section 3(p)?'
      ]
    };
  }

  // 3. HOW DO I APPLY FOR A PATENT / HOW TO PATENT MY INVENTION
  if (q.includes('apply for a patent') || q.includes('how to patent') || q.includes('how do i patent') || q.includes('patent process') || q.includes('filing process')) {
    return {
      ragAnswer: {
        answer:
          'Applying for a patent in India involves a statutory 10-step process: identifying the technical invention, verifying patentability criteria (novelty, inventive step, utility), searching prior art, drafting specifications, preparing official forms (Form 1, 2, 3, 5), submitting through IP India e-filing, undergoing examination, responding to objections, and proceeding to grant.',
        simpleExplanation:
          'In simple words: You cannot patent an abstract idea. You must document a concrete technical product or process, prove it is new worldwide, file official forms with the Indian Patent Office, and clear examination by patent examiners.',
        realLifeExample:
          'An innovator creates a novel herbal drying device. They search prior art, draft a complete specification with technical drawings, file Form 1 and Form 2 on the IP India portal, pay the official fee (₹1,600 for natural persons/startups), request examination (Form 18), and respond to the examiner\'s First Examination Report (FER).',
        relevantLaw: 'The Patents Act 1970 & The Patent Rules 2003 (as amended 2024)',
        whyPoints: [
          'Establishing early priority protects against third-party filings.',
          'Compliance with statutory deadlines (e.g. 12-month complete specification rule) is non-negotiable.',
          'Official examination verifies novelty against global prior art and Section 3 exclusions.'
        ],
        whatIsRight: [
          'File a Provisional Specification early if the invention is still under active development.',
          'File Complete Specification strictly within 12 months of Provisional filing.',
          'Use official IP India e-services portal (https://ipindia.gov.in/pages/e-services).',
          'Keep accurate experimental logs and inventor assignment records.'
        ],
        whatIsWrong: [
          'Publishing or publicly disclosing your invention in a journal or exhibition BEFORE filing a patent application.',
          'Missing the 12-month complete specification deadline after filing provisional.',
          'Paying unauthorized third-party websites claiming to issue instant "patent certificates".'
        ],
        steps: [
          'STEP 1 — IDENTIFY YOUR INVENTION: Define the specific technical product or process and the problem it solves.',
          'STEP 2 — CHECK PATENTABILITY: Verify Novelty, Inventive Step, Industrial Applicability, and Section 3/4 exclusions.',
          'STEP 3 — SEARCH PRIOR ART: Conduct public searches on IP India, PATENTSCOPE, and scientific literature.',
          'STEP 4 — DOCUMENT YOUR INVENTION: Prepare title, description, drawings, working examples, and claims.',
          'STEP 5 — DECIDE PROVISIONAL OR COMPLETE: File Provisional for early priority, or Complete directly.',
          'STEP 6 — PREPARE APPLICATION FORMS: Fill Form 1 (Application), Form 2 (Spec), Form 3 (Foreign filings), Form 5 (Inventorship).',
          'STEP 7 — FILE APPLICATION ONLINE: Upload documents and pay official fee on IP India e-services portal.',
          'STEP 8 — REQUEST EXAMINATION: File Form 18 (or Form 18A for expedited track) within statutory timeline.',
          'STEP 9 — RESPOND TO OBJECTIONS: Answer First Examination Report (FER) objections raised by Patent Examiners.',
          'STEP 10 — GRANT OF PATENT: If all statutory requirements are satisfied, the Patent Office grants the patent.'
        ],
        sources: [
          {
            title: 'IP India — Patent Filing Process',
            authority: 'Office of the Controller General of Patents, Designs & Trade Marks',
            url: 'https://ipindia.gov.in/filing-process',
            whyThisSource: 'Official step-by-step procedural manual published by Indian Patent Office.'
          },
          {
            title: 'IP India — Forms & Official Fees',
            authority: 'CGPDTM, Govt of India',
            url: 'https://ipindia.gov.in/patents-before-you-apply-forms-official-fees',
            whyThisSource: 'Official fee schedule and downloadable statutory forms.'
          },
          {
            title: 'IP India e-Services Portal',
            authority: 'CGPDTM, Govt of India',
            url: 'https://ipindia.gov.in/pages/e-services',
            whyThisSource: 'Official government portal for filing patent applications online.'
          }
        ],
        nextSteps: [
          'Conduct a preliminary prior art search on IP India.',
          'Prepare your invention description and drawings.',
          'Select the appropriate branch office (Delhi, Mumbai, Kolkata, Chennai) or use online e-filing.'
        ],
        importantNotice: 'Filing a patent application does not guarantee a grant. Approval depends on formal examination by the Patent Office.',
        evidenceLevel: 'high',
        category: 'Patent'
      },
      citations: [MOCK_CITATIONS.sec3p],
      officialSources: [
        {
          title: 'IP India — Filing Process',
          authority: 'CGPDTM, Govt of India',
          url: 'https://ipindia.gov.in/filing-process'
        }
      ],
      suggestedFollowups: [
        'What documents are required for filing a patent?',
        'How much does a patent application cost?',
        'What is a provisional specification?'
      ]
    };
  }

  // 4. WHAT IS NOVELTY?
  if (q === 'what is novelty?' || q === 'what is novelty' || q.includes('define novelty') || q.includes('meaning of novelty')) {
    return {
      ragAnswer: {
        answer:
          'Novelty means that an invention must be new and must not have been disclosed to the public anywhere in the world by publication, oral description, use, or in any other way before the date of filing of the patent application.',
        simpleExplanation:
          'In simple words: The exact same invention should not already be publicly known or published anywhere in the world. Novelty is a global legal standard—not just whether you personally have seen it before.',
        realLifeExample:
          'If an inventor creates a novel solar herb grinder but published a detailed YouTube video explaining how to make it 6 months prior to filing, the invention has lost statutory novelty due to prior public disclosure.',
        relevantLaw: 'The Patents Act, 1970 — Section 2(1)(l) & Sections 13, 29-34',
        whyPoints: [
          'Novelty is evaluated strictly against all prior art available before the priority date.',
          'Prior publication by the inventor themselves can destroy novelty if done prior to filing.',
          'Secret commercial use or public display without confidentiality agreements invalidates novelty.'
        ],
        whatIsRight: [
          'Keep your invention confidential until an official patent application is filed.',
          'Search global patent databases (IP India, Google Patents, ESPACENET) before filing.',
          'File a Provisional Specification before presenting at conferences or trade shows.'
        ],
        whatIsWrong: [
          'Publishing a scientific paper or thesis before filing a patent application.',
          'Assuming that because something is not sold in India, it is automatically new.',
          'Relying solely on your personal memory instead of searching formal patent literature.'
        ],
        sources: [
          {
            title: 'IP India — Basics of Patents',
            authority: 'CGPDTM, Govt of India',
            url: 'https://ipindia.gov.in/basics-of-patents',
            whyThisSource: 'Statutory definition of novelty under Indian Patent Law.'
          }
        ],
        nextSteps: [
          'Avoid public disclosure or sales of your invention prior to filing.',
          'Perform a thorough prior art search on IP India and PATENTSCOPE.',
          'File Form 1 and Form 2 to secure your priority date.'
        ],
        importantNotice: 'Novelty is assessed globally by Patent Examiners during formal examination.',
        evidenceLevel: 'high',
        category: 'Patent'
      },
      citations: [MOCK_CITATIONS.sec3p],
      officialSources: [
        {
          title: 'IP India — Basics of Patents',
          authority: 'CGPDTM, Govt of India',
          url: 'https://ipindia.gov.in/basics-of-patents'
        }
      ],
      suggestedFollowups: [
        'What is inventive step?',
        'What is prior art?',
        'How do I search existing patents?'
      ]
    };
  }

  // 5. WHAT IS INVENTIVE STEP?
  if (q === 'what is inventive step?' || q === 'what is inventive step' || q.includes('inventive step')) {
    return {
      ragAnswer: {
        answer:
          'Inventive step is a feature of an invention that involves technical advance as compared to existing knowledge or has economic significance or both, and that makes the invention non-obvious to a person skilled in the art.',
        simpleExplanation:
          'In simple words: Even if your invention is technically new, it must not be an obvious modification or routine adjustment that a skilled technician or professional in that field would easily make.',
        realLifeExample:
          'Replacing a metal screw with a plastic screw in a known grain machine is technically new, but it is obvious to an engineer and lacks an inventive step. However, modifying the internal gear mechanism to reduce friction by 60% through a novel structural geometry involves an inventive step.',
        relevantLaw: 'The Patents Act, 1970 — Section 2(1)(ja)',
        whyPoints: [
          'Requires proving a non-obvious technical advance over combined prior art disclosures.',
          'Evaluated from the perspective of a "Person Skilled in the Art" (PSITA).',
          'Economic significance alone or technical advance alone (or both) can satisfy the legal standard.'
        ],
        whatIsRight: [
          'Document unexpected technical results, higher efficiency, or overcome technical hurdles in your specification.',
          'Provide comparative experimental data against existing state-of-the-art methods.',
          'Highlight non-obvious design choices in your patent claims.'
        ],
        whatIsWrong: [
          'Combining two known devices without any synergistic or unexpected technical result.',
          'Making routine material substitutions without demonstrating enhanced performance.',
          'Assuming that solving a simple problem automatically proves an inventive step.'
        ],
        sources: [
          {
            title: 'The Patents Act, 1970 — Section 2(1)(ja)',
            authority: 'IP India (CGPDTM), Govt of India',
            url: 'https://ipindia.gov.in/acts/patent-act-1970',
            whyThisSource: 'Statutory definition of inventive step.'
          }
        ],
        nextSteps: [
          'Identify the closest existing prior art to your invention.',
          'Draft comparative experimental data highlighting non-obvious technical advances.',
          'Consult a patent agent to draft robust independent and dependent claims.'
        ],
        importantNotice: 'Inventive step assessment is determined by Patent Examiners based on established case law.',
        evidenceLevel: 'high',
        category: 'Patent'
      },
      citations: [MOCK_CITATIONS.sec3p],
      officialSources: [
        {
          title: 'IP India Patents Act',
          authority: 'CGPDTM',
          url: 'https://ipindia.gov.in/acts/patent-act-1970'
        }
      ],
      suggestedFollowups: [
        'What is novelty?',
        'What is prior art?',
        'Can I patent my idea?'
      ]
    };
  }

  // 6. WHAT IS PRIOR ART?
  if (q === 'what is prior art?' || q === 'what is prior art' || q.includes('prior art')) {
    return {
      ragAnswer: {
        answer:
          'Prior art refers to any technical information, patents, published applications, scientific papers, books, public uses, or traditional knowledge that was publicly available anywhere in the world before the priority date of a patent application.',
        simpleExplanation:
          'In simple words: Prior art is the sum of all existing public knowledge before your filing date. Patent examiners compare your invention against prior art to determine if your claim is truly new and non-obvious.',
        realLifeExample:
          'Before filing a patent for an Ayurvedic neem formulation, a prior art search checks ancient classical texts (TKDL), existing granted patents on neem extracts, journal articles, and public market products to see if the formulation is already known.',
        relevantLaw: 'The Patents Act, 1970 — Sections 13, 29, 30, 31, 32, 33 & Section 3(p)',
        whyPoints: [
          'Prior art determines the baseline against which novelty and inventive step are judged.',
          'Includes disclosures in any language, anywhere in the world, in printed or digital form.',
          'Ancient traditional knowledge documented in classical texts (e.g. Charaka Samhita) constitutes valid prior art.'
        ],
        whatIsRight: [
          'Conduct multi-database prior art searches (IP India, PATENTSCOPE, TKDL, PubMed).',
          'Use prior art findings to refine your patent claims to focus on genuine novel aspects.',
          'Acknowledge known prior art in the background section of your patent specification.'
        ],
        whatIsWrong: [
          'Claiming that "nothing similar exists" without actually performing a database search.',
          'Ignoring non-patent literature like scientific journals or traditional knowledge texts.',
          'Assuming prior art search guarantees 100% absence of conflicting disclosures.'
        ],
        sources: [
          {
            title: 'IP India — Public Patent Search Portal',
            authority: 'CGPDTM, Govt of India',
            url: 'https://ipindia.gov.in/',
            whyThisSource: 'Official Indian Patent Office search portal.'
          },
          {
            title: 'WIPO PATENTSCOPE',
            authority: 'World Intellectual Property Organization',
            url: 'https://www.wipo.int/patentscope/en/',
            whyThisSource: 'Official international database of PCT applications and global patents.'
          }
        ],
        nextSteps: [
          'Search IP India public patent database.',
          'Search CSIR-TKDL for traditional knowledge prior art.',
          'Refine technical claims based on search results.'
        ],
        importantNotice: 'No search can guarantee that zero prior art exists. Searching reduces risk but does not eliminate examiner objections.',
        evidenceLevel: 'high',
        category: 'Patent'
      },
      citations: [MOCK_CITATIONS.sec3p],
      officialSources: [
        {
          title: 'IP India Search Portal',
          authority: 'CGPDTM',
          url: 'https://ipindia.gov.in/'
        }
      ],
      suggestedFollowups: [
        'How do I search existing patents?',
        'What is Section 3(p)?',
        'What is novelty?'
      ]
    };
  }

  // 7. WHAT IS SECTION 3(P)? / TRADITIONAL KNOWLEDGE
  if (q.includes('section 3(p)') || q.includes('3(p)') || q.includes('traditional knowledge be patented') || q.includes('patent traditional knowledge')) {
    return {
      ragAnswer: {
        answer:
          'Section 3(p) of the Patents Act, 1970 explicitly excludes traditional knowledge or an aggregation/duplication of known properties of traditionally known components from being patented in India. It ensures ancient traditional medical knowledge remains in the public domain and protects India\'s herbal heritage from biopiracy.',
        simpleExplanation:
          'In simple words: You cannot patent a traditional remedy (such as a raw paste of Turmeric and Neem for healing) because it is already known traditional knowledge. Merely mixing two known traditional herbs together without a synergistic non-obvious technical effect is barred under Section 3(p).',
        realLifeExample:
          'Mixing Tulsi and Ginger powder into a syrup is traditional knowledge and non-patentable under Section 3(p). However, developing a novel, non-obvious chemical extraction process that isolates a specific active bio-fraction using a novel synthetic catalyst may be eligible for a process patent if it satisfies novelty and inventive step.',
        relevantLaw: 'The Patents Act, 1970 — Section 3(p) & Biological Diversity Act, 2002',
        whyPoints: [
          'Prevents private commercial entities from acquiring patent monopolies over centuries-old public domain knowledge.',
          'CSIR-TKDL provides prior art evidence to examiners globally to enforce Section 3(p) standards.',
          'Mandates that any Ayurvedic or botanical invention must demonstrate genuine technical advancement beyond traditionally known efficacy.'
        ],
        whatIsRight: [
          'Verify if your formulation is documented in classical Ayurvedic texts (Charaka Samhita, Sushruta Samhita, Ayurvedic Pharmacopoeia of India).',
          'Focus patent claims on novel, non-obvious processing methods, synthetic derivatives, or novel delivery mechanisms.',
          'Obtain National Biodiversity Authority (NBA) approval under Section 6 of the Biological Diversity Act if using Indian biological resources.'
        ],
        whatIsWrong: [
          'Assuming a traditional home remedy can be patented simply because you packaged it in a capsule.',
          'Failing to disclose the source of biological material as required under Section 10(4)(D) of the Patents Act.',
          'Assuming Section 3(p) means NO Ayurvedic research can ever be patented—novel process innovations may qualify.'
        ],
        sources: [
          {
            title: 'IP India — Patents Act 1970 (Section 3)',
            authority: 'Office of the Controller General of Patents, Designs & Trade Marks',
            url: 'https://ipindia.gov.in/acts/patent-act-1970',
            whyThisSource: 'Statutory legal text of Section 3 exclusions.'
          },
          {
            title: 'Traditional Knowledge Digital Library (TKDL)',
            authority: 'CSIR & Ministry of Ayush',
            url: 'https://www.tkdl.res.in/',
            whyThisSource: 'Official prior art database used to prevent biopiracy under Section 3(p).'
          }
        ],
        nextSteps: [
          'Search classical texts and TKDL prior art repository.',
          'Determine if your invention contains a novel non-obvious process or synthetic modification.',
          'Consult an IP attorney specializing in Ayurvedic and biological patent law.'
        ],
        importantNotice: 'Section 3(p) applicability depends on the specific claims filed in your application.',
        evidenceLevel: 'high',
        category: 'Traditional Knowledge'
      },
      citations: [MOCK_CITATIONS.sec3p],
      officialSources: [
        {
          title: 'IP India — Section 3(p)',
          authority: 'CGPDTM',
          url: 'https://ipindia.gov.in/acts/patent-act-1970'
        }
      ],
      suggestedFollowups: [
        'What is TKDL?',
        'How do I obtain NBA approval for biological resources?',
        'Can an Ayurvedic process be patented?'
      ]
    };
  }

  // 8. PROVISIONAL SPECIFICATION / COMPLETE SPECIFICATION
  if (q.includes('provisional specification') || q.includes('complete specification') || q.includes('provisional vs complete')) {
    return {
      ragAnswer: {
        answer:
          'A Provisional Specification (Form 2) is a preliminary document filed to secure an early priority date when an invention is still under development. A Complete Specification (Form 2) is the full technical document containing enablement details, working examples, and legal claims required for examination.',
        simpleExplanation:
          'In simple words: A Provisional application acts like locking in your spot in line (priority date) while you finish testing. A Complete Specification contains the final detailed blueprint and legal boundary claims.',
        realLifeExample:
          'An innovator invents a new solar engine prototype. They file a Provisional Specification on Jan 1, 2026 to secure priority date. They have strictly 12 months (until Jan 1, 2027) to complete testing and file the Complete Specification.',
        relevantLaw: 'The Patents Act, 1970 — Sections 9 & 10, Patent Rules 2003',
        whyPoints: [
          'Filing Provisional establishes an official priority date before public testing or fundraising.',
          'IMPORTANT OFFICIAL RULE: The Complete Specification MUST be filed within 12 months from the Provisional filing date. No further extension is granted by law.',
          'If Complete Specification is not filed within 12 months, the application is deemed abandoned.'
        ],
        whatIsRight: [
          'File Provisional Specification as soon as the core inventive concept is developed.',
          'Include sufficient technical description in the Provisional so claims in the Complete Specification can claim valid priority.',
          'Track the 12-month complete specification deadline strictly.'
        ],
        whatIsWrong: [
          'Assuming the 12-month complete specification deadline can be extended beyond statutory limits.',
          'Filing a Provisional Specification with just a 1-line abstract devoid of technical description.',
          'Disclosing completely new technical concepts in the Complete Specification that were missing from the Provisional.'
        ],
        steps: [
          'Draft Provisional Specification (Title, Description, Drawings).',
          'File Form 1 and Form 2 (Provisional) on IP India portal.',
          'Complete R&D and testing within 12 months.',
          'Draft Complete Specification including Claims and Abstract.',
          'File Complete Specification (Form 2) before 12-month expiry.'
        ],
        sources: [
          {
            title: 'IP India — Filing Process & Specifications',
            authority: 'Office of the Controller General of Patents, Designs & Trade Marks',
            url: 'https://ipindia.gov.in/filing-process',
            whyThisSource: 'Official guidance on filing Provisional and Complete Specifications.'
          }
        ],
        nextSteps: [
          'Prepare technical draft for Form 2.',
          'Ensure claims are supported by enabled description.',
          'Set a calendar reminder for 12-month Complete filing deadline.'
        ],
        importantNotice: 'Failure to file Complete Specification within 12 months results in application abandonment.',
        evidenceLevel: 'high',
        category: 'Patent'
      },
      citations: [MOCK_CITATIONS.sec3p],
      officialSources: [
        {
          title: 'IP India Filing Process',
          authority: 'CGPDTM',
          url: 'https://ipindia.gov.in/filing-process'
        }
      ],
      suggestedFollowups: [
        'What documents are required for filing a patent?',
        'How do I apply for a patent?',
        'How much does a patent application cost?'
      ]
    };
  }

  // 9. DEFAULT / GENERAL QUERY HANDLER
  return {
    ragAnswer: {
      answer:
        'ATREYA is an AI public information assistant grounded in Indian Intellectual Property Laws (Patents Act 1970, Trade Marks Act 1999, BD Act 2002), CSIR-TKDL prior art repository, and WIPO PCT international framework.',
      simpleExplanation:
        'In simple words: You can ask ATREYA about patent eligibility, Section 3(p) traditional knowledge exclusions, prior art searches, official forms, filing steps, trademark rules, and research evidence.',
      realLifeExample:
        'For example: Ask "How do I apply for a patent?", "What is Section 3(p)?", "What is novelty?", or "Can traditional knowledge be patented?" to receive step-by-step statutory guidance.',
      relevantLaw: 'The Patents Act 1970, Trade Marks Act 1999, Biological Diversity Act 2002',
      whyPoints: [
        'Provides evidence-based statutory responses grounded in official IP India sources.',
        'Supports 5 active languages: English, Hindi (हिन्दी), Marathi (मराठी), Tamil (தமிழ்), Bengali (বাংলা).',
        'Directs users to official government portals and legal databases (India Code).'
      ],
      whatIsRight: [
        'Verify your technical concepts against official statutory requirements.',
        'Use official government filing portals (https://ipindia.gov.in/).',
        'Consult registered patent agents for legal prosecution.'
      ],
      whatIsWrong: [
        'Assuming an abstract idea is automatically patentable.',
        'Failing to check global prior art databases before investing money.',
        'Relying on unverified secondary blogs for statutory legal advice.'
      ],
      steps: [
        'Ask your IP or Ayurveda statutory question in the chat input.',
        'Review the 10-part grounded answer structure.',
        'Click official source links to inspect original government documents.'
      ],
      sources: [
        {
          title: 'IP India Official Website',
          authority: 'Office of the Controller General of Patents, Designs & Trade Marks',
          url: 'https://ipindia.gov.in/',
          whyThisSource: 'Apex statutory authority under DPIIT for Indian intellectual property.'
        },
        {
          title: 'India Code Statute Repository',
          authority: 'Legislative Department, Ministry of Law and Justice',
          url: 'https://www.indiacode.nic.in/',
          whyThisSource: 'Official digital repository of Indian Parliamentary Acts.'
        }
      ],
      nextSteps: [
        'Try asking one of the suggested sample questions below.',
        'Explore the Official Portals Directory in the main navigation menu.'
      ],
      importantNotice: 'ATREYA provides public statutory intelligence for educational and research guidance. Consult a registered patent agent for formal legal opinion.',
      evidenceLevel: 'high',
      category: 'Patent'
    },
    citations: [MOCK_CITATIONS.sec3p],
    officialSources: [
      {
        title: 'IP India Portal',
        authority: 'CGPDTM, Govt of India',
        url: 'https://ipindia.gov.in/'
      }
    ],
    suggestedFollowups: [
      'What is a patent?',
      'How do I apply for a patent?',
      'What is Section 3(p)?'
    ]
  };
}
