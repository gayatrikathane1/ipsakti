import type { OfficialAuthority } from '../types/ip';

export const OFFICIAL_AUTHORITIES: OfficialAuthority[] = [
  {
    id: 'auth-ipindia',
    name: 'Intellectual Property India (CGPDTM)',
    officialStatus: 'Official Government Statutory Authority',
    domain: 'Patents, Trademarks, Designs, Geographical Indications',
    provides: 'Official e-filing portal, Form 1 / Form 18A expedited examination, TM search engine, and Public Patent Records.',
    usefulFor: 'Filing patent applications, checking trademark availability, paying official statutory fees, and inspecting granted patent specifications.',
    url: 'https://ipindia.gov.in/',
    whyThisSource: 'The sole official statutory authority under D內容 / DPIIT, Ministry of Commerce and Industry for grant of Indian Intellectual Property Rights.',
    category: 'Patent'
  },
  {
    id: 'auth-indiacode',
    name: 'India Code (Digital Repository of Acts)',
    officialStatus: 'Official Legislative Repository',
    domain: 'Central & State Acts, Gazette Notifications, Codified Rules',
    provides: 'Un-amended statutory text of the Patents Act 1970, Trade Marks Act 1999, Biological Diversity Act 2002, and Copyright Act 1957.',
    usefulFor: 'Searching legal section numbers, reading original statutory phrasing, and verifying gazette amendment dates.',
    url: 'https://www.indiacode.nic.in/',
    whyThisSource: 'Official digital repository of all Indian Parliamentary Acts managed by Legislative Department, Ministry of Law and Justice.',
    category: 'Legal'
  },
  {
    id: 'auth-tkdl',
    name: 'Traditional Knowledge Digital Library (TKDL)',
    officialStatus: 'Official CSIR & Ayush Prior Art Defense Repository',
    domain: 'Ayurveda, Siddha, Unani, Yoga & Traditional Remedies',
    provides: 'Digital archive translating 4.4+ lakh ancient manuscript formulations into 5 international patent examiner languages.',
    usefulFor: 'Establishing prior art evidence during patent examination to thwart global biopiracy of traditional Indian knowledge.',
    url: 'https://www.tkdl.res.in/',
    whyThisSource: 'Established joint initiative of CSIR and Ministry of Ayush providing statutory prior art defense under Section 3(p).',
    category: 'Traditional Knowledge'
  },
  {
    id: 'auth-ayush',
    name: 'Ministry of Ayush',
    officialStatus: 'Union Executive Ministry',
    domain: 'Ayurveda, Yoga & Naturopathy, Unani, Siddha, Sowa-Rigpa, Homoeopathy',
    provides: 'Regulatory guidelines, Pharmacopoeia Standards, Drug Rules 1945 notifications, and Research Schemes.',
    usefulFor: 'Regulatory compliance for manufacturing Ayurvedic medicines, licensing under Drugs & Cosmetics Act, and institutional grants.',
    url: 'https://ayush.gov.in/',
    whyThisSource: 'Apex Union Government Ministry overseeing policy, research, and legal standards for traditional medicine systems in India.',
    category: 'Ayurveda'
  },
  {
    id: 'auth-arp',
    name: 'AYUSH Research Portal',
    officialStatus: 'Official Government Clinical & Research Database',
    domain: 'Ayurveda Research Papers, Clinical Trials, Pharmacognosy',
    provides: 'Indexed database of over 40,000+ peer-reviewed Ayurvedic clinical trials, pharmacological studies, and manuscript evidence.',
    usefulFor: 'Retrieving bio-activity clinical evidence to support novelty or non-obviousness process claims under Section 3(d).',
    url: 'https://arp.ayush.gov.in/',
    whyThisSource: 'Official research aggregator maintained by Ministry of Ayush for evidence-based scientific validation of Ayurveda.',
    category: 'Research'
  },
  {
    id: 'auth-ccras',
    name: 'Central Council for Research in Ayurvedic Sciences (CCRAS)',
    officialStatus: 'Autonomous Government Research Body',
    domain: 'Ayurvedic Formulations, Botanical Standardization, Clinical Research',
    provides: 'Standardization monographs, Safety toxicity data, and official clinical research publications.',
    usefulFor: 'Verifying scientific botanical safety, extraction protocols, and institutional research validation.',
    url: 'https://ccras.nic.in/',
    whyThisSource: 'Premier autonomous research organization under Ministry of Ayush conducting scientific formulation research.',
    category: 'Research'
  },
  {
    id: 'auth-nba',
    name: 'National Biodiversity Authority (NBA)',
    officialStatus: 'Statutory Autonomous Regulatory Body',
    domain: 'Biological Diversity, Fair & Equitable Benefit Sharing (FEBS)',
    provides: 'Section 6 clearance applications for accessing Indian biological resources for commercialization or patent filing.',
    usefulFor: 'Obtaining mandatory statutory approval before commercializing or filing patent applications involving Indian biological resources.',
    url: 'https://nbaindia.org/',
    whyThisSource: 'Statutory body established under Section 8 of the Biological Diversity Act 2002 to enforce conservation and benefit sharing.',
    category: 'Biodiversity'
  },
  {
    id: 'auth-fssai',
    name: 'Food Safety and Standards Authority of India (FSSAI)',
    officialStatus: 'Statutory Food Regulatory Authority',
    domain: 'Ayurveda Aahara, Nutraceuticals, Food Product Licensing',
    provides: 'Food Safety and Standards (Ayurveda Aahara) Regulations 2022, labeling guidelines, and FSSAI e-licensing portal.',
    usefulFor: 'Licensing Ayurvedic food products, herbal health supplements, and commercial retail packaging compliance.',
    url: 'https://www.fssai.gov.in/',
    whyThisSource: 'Apex statutory regulator under Ministry of Health & Family Welfare for food safety, including Ayurveda Aahara.',
    category: 'Food Regulation'
  },
  {
    id: 'auth-wipo',
    name: 'World Intellectual Property Organization (WIPO)',
    officialStatus: 'United Nations Specialized Agency',
    domain: 'International Patents (PCT), Madrid Trademarks, Traditional Knowledge (IGC)',
    provides: 'Patent Cooperation Treaty (PCT) filing system, PATENTSCOPE global database, and IGC normative legal guidelines.',
    usefulFor: 'Filing international patent priority applications across 157 contracting states and searching global prior art.',
    url: 'https://www.wipo.int/',
    whyThisSource: 'Global UN forum for intellectual property services, international treaties, and policy harmonization.',
    category: 'International'
  }
];
