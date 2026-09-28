import React from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, ShieldCheck, Award, Leaf } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsDisclaimerOpen, t } = useApp();

  return (
    <footer className="bg-white border-t border-emerald-200 text-slate-700 py-10 px-4 mt-auto print:hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand & SIH Info */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <Leaf className="w-4 h-4 text-emerald-200" />
            </div>
            <span className="font-extrabold text-emerald-950 text-base">{t('appName')}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {t('heroTagline', 'Multilingual AI Assistant for Ayurveda, Traditional Knowledge & Intellectual Property')}.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-emerald-800 font-bold">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>Ayurveda & Traditional Knowledge Safeguards</span>
          </div>
        </div>

        {/* Official Statutory Acts */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-3">Statutory Frameworks</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <a href="https://ipindia.gov.in/acts/patent-act-1970" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition flex items-center gap-1">
                The Patents Act, 1970 (Sec 3p) <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://ipindia.gov.in/resource/patents-resources-act" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition flex items-center gap-1">
                The Trade Marks Act, 1999 <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://nbaindia.org" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition flex items-center gap-1">
                Biological Diversity Act, 2002 <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://copyright.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition flex items-center gap-1">
                The Copyright Act, 1957 <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
          </ul>
        </div>

        {/* Curated Government Resources */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-3">Trusted Official Portals</h4>
          <ul className="space-y-2 text-xs font-medium">
            <li>
              <a href="https://ipindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition flex items-center gap-1">
                IP India (CGPDTM Portal) <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://www.tkdl.res.in" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition flex items-center gap-1">
                CSIR-TKDL Database <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://ayush.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition flex items-center gap-1">
                Ministry of Ayush <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
            <li>
              <a href="https://www.wipo.int/pct/en/" target="_blank" rel="noreferrer" className="hover:text-emerald-800 transition flex items-center gap-1">
                WIPO PCT International <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </li>
          </ul>
        </div>

        {/* Safety Disclaimer */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2">Legal Safety & Notice</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed mb-2 font-medium">
            ATREYA uses authoritative government, statutory and research sources where available. Source availability and legal requirements may change. Always verify important legal and regulatory information from the latest official source.
          </p>
          <p className="text-[11px] text-slate-500 italic leading-relaxed mb-3">
            ATREYA provides information and research assistance. It is not a substitute for professional legal, regulatory or medical advice.
          </p>
          <button
            onClick={() => setIsDisclaimerOpen(true)}
            className="flex items-center space-x-1.5 text-xs text-emerald-900 font-bold border border-emerald-300 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl transition cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>View Full Legal Disclaimer</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto pt-6 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 ATREYA • Evidence-First Legal & Research Assistant.</p>
        <p>White & Green Design System • Multilingual Grounded RAG Engine</p>
      </div>
    </footer>
  );
};
