import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRP_PRP_REPOSITORY } from '../data/trpPrpRepository';
import {
  FileText,
  Printer,
  Download,
  BookOpen,
  Zap,
  BookmarkPlus,
  CheckCircle2,
} from 'lucide-react';

export const TrpPage: React.FC = () => {
  const { saveToVault, t } = useApp();
  const [savedId, setSavedId] = useState<string | null>(null);

  const mainTrp = TRP_PRP_REPOSITORY.find((r) => r.category === 'TRP') || TRP_PRP_REPOSITORY[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  const handleSaveTrp = (title: string) => {
    saveToVault({
      title: `TRP Paper: ${title.substring(0, 40)}...`,
      type: 'trp',
      language: 'en',
      notes: 'Saved from Technical Research Paper (TRP) Repository'
    });
    setSavedId('trp-main');
    setTimeout(() => setSavedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in max-w-5xl mx-auto print:max-w-none print:p-0">
      {/* Header & Export Actions */}
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-4 shadow-sm print:bg-white print:border-none print:p-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold print:hidden">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>SIH 2026 PS 26045 Technical Document</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
              Technical Research Paper (TRP)
            </h1>
            <p className="text-sm text-slate-700 font-bold">
              {mainTrp.translatedTitle ? `${mainTrp.title} / ${mainTrp.translatedTitle}` : mainTrp.title}
            </p>
          </div>

          <div className="flex items-center space-x-2 print:hidden shrink-0">
            <button
              onClick={() => handleSaveTrp(mainTrp.title)}
              className="flex items-center space-x-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-300 transition cursor-pointer"
            >
              <BookmarkPlus className="w-4 h-4 text-emerald-700" />
              <span>{savedId === 'trp-main' ? 'Saved!' : 'Save to Vault'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t('buttons.trpPaper', 'Download TRP')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-white hover:bg-emerald-100 text-emerald-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-300 shadow-xs transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print TRP</span>
            </button>
          </div>
        </div>

        {/* Demo Record Badge & Notice */}
        <div className="flex items-center justify-between border-t border-emerald-200 pt-3 text-xs">
          <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
            🏷️ Status: {mainTrp.status}
          </span>
          <span className="text-slate-600 font-medium italic">
            Institution: {mainTrp.institution} ({mainTrp.year})
          </span>
        </div>
      </div>

      {/* Structured TRP Database Record Details */}
      <div className="bg-white border border-emerald-200 rounded-3xl p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-700" />
          TRP Structured Database Record
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-950 block text-[11px]">Authors & Team:</span>
            <p className="text-slate-700 font-medium">{mainTrp.authors.join(', ')} ({mainTrp.team})</p>
          </div>

          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-950 block text-[11px]">Keywords:</span>
            <div className="flex flex-wrap gap-1">
              {mainTrp.keywords.map((kw, idx) => (
                <span key={idx} className="bg-white border border-emerald-300 text-emerald-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1">
          <span className="font-extrabold text-emerald-950 block">Abstract:</span>
          <p className="text-slate-800 leading-relaxed font-medium">{mainTrp.abstract}</p>
        </div>
      </div>

      {/* Visual RAG Workflow Diagram Card */}
      <div className="bg-white border border-emerald-200 rounded-3xl p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-700" />
          RAG Execution Workflow Diagram
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-bold text-center">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">1. User Question</div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">2. Language Detection</div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">3. Intent Detection</div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">4. Jurisdiction & IP-Type</div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">5. Hybrid Retrieval</div>
          <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-950">6. Reranking</div>
          <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-950">7. Evidence Answer</div>
          <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-950">8. Citation Validation</div>
          <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-950">9. Safety & Abstention</div>
          <div className="p-3 bg-emerald-800 text-white rounded-xl shadow">10. Translated Output</div>
        </div>
      </div>

      {/* Technical Sections */}
      <div className="space-y-6 text-xs text-slate-800 leading-relaxed font-medium">
        {mainTrp.technicalSections &&
          Object.entries(mainTrp.technicalSections).map(([secTitle, secContent], idx) => (
            <section key={idx} className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-2 shadow-xs">
              <h2 className="text-base font-bold text-emerald-950 flex items-center gap-1.5">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700" />
                {secTitle}
              </h2>
              <p className="text-slate-700">{secContent}</p>
            </section>
          ))}

        {/* References Section */}
        <section className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-emerald-950 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            Statutory References
          </h2>

          <ul className="space-y-2 list-disc list-inside text-slate-700 font-medium">
            {mainTrp.references.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
