import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRP_PRP_REPOSITORY } from '../data/trpPrpRepository';
import {
  BookOpen,
  Printer,
  Download,
  Users,
  CheckCircle2,
  BookmarkPlus,
} from 'lucide-react';

export const PrpPage: React.FC = () => {
  const { saveToVault, t } = useApp();
  const [savedId, setSavedId] = useState<string | null>(null);

  const mainPrp = TRP_PRP_REPOSITORY.find((r) => r.category === 'PRP') || TRP_PRP_REPOSITORY[1];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  const handleSavePrp = (title: string) => {
    saveToVault({
      title: `PRP Paper: ${title.substring(0, 40)}...`,
      type: 'prp',
      language: 'en',
      notes: 'Saved from Project Research Paper (PRP) Repository'
    });
    setSavedId('prp-main');
    setTimeout(() => setSavedId(null), 2000);
  };

  const targetUsers = [
    { title: 'Ayurveda Researchers', desc: 'Ayurvedic doctors, Vaidyas, and herbal formulation scientists.' },
    { title: 'Startups & Founders', desc: 'DPIIT recognized startups developing herbal, biotech, or AI solutions.' },
    { title: 'Students & Academics', desc: 'Pharmacy, Law, and BAMS students researching Indian IP law.' },
    { title: 'IP Facilitators', desc: 'Registered Patent Agents and Trademark Attorneys conducting preliminary search.' },
    { title: 'Traditional Knowledge Holders', desc: 'Indigenous community members and herbal practitioners.' },
    { title: 'SIH Evaluators', desc: 'Smart India Hackathon 2026 Problem Statement 26045 judges.' },
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in max-w-5xl mx-auto print:max-w-none print:p-0">
      {/* Header & Export Actions */}
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-4 shadow-sm print:bg-white print:border-none print:p-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold print:hidden">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>SIH 2026 PS 26045 Project Document</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
              Project Research Paper (PRP)
            </h1>
            <p className="text-sm text-slate-700 font-bold">
              {mainPrp.translatedTitle ? `${mainPrp.title} / ${mainPrp.translatedTitle}` : mainPrp.title}
            </p>
          </div>

          <div className="flex items-center space-x-2 print:hidden shrink-0">
            <button
              onClick={() => handleSavePrp(mainPrp.title)}
              className="flex items-center space-x-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-300 transition cursor-pointer"
            >
              <BookmarkPlus className="w-4 h-4 text-emerald-700" />
              <span>{savedId === 'prp-main' ? 'Saved!' : 'Save to Vault'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t('buttons.prpPaper', 'Download PRP')}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-white hover:bg-emerald-100 text-emerald-900 font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-300 shadow-xs transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print PRP</span>
            </button>
          </div>
        </div>

        {/* Status Tag & Notice */}
        <div className="flex items-center justify-between border-t border-emerald-200 pt-3 text-xs">
          <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
            🏷️ Status: {mainPrp.status}
          </span>
          <span className="text-slate-600 font-medium italic">
            Institution: {mainPrp.institution} ({mainPrp.year})
          </span>
        </div>
      </div>

      {/* Target Users Grid */}
      <div className="bg-white border border-emerald-200 rounded-3xl p-6 space-y-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-700" />
          Target User Personas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {targetUsers.map((u, idx) => (
            <div key={idx} className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1">
              <div className="font-bold text-emerald-950 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{u.title}</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Sections */}
      <div className="space-y-6 text-xs text-slate-800 leading-relaxed font-medium">
        {mainPrp.projectSections &&
          Object.entries(mainPrp.projectSections).map(([secTitle, secContent], idx) => (
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
            Project References
          </h2>

          <ul className="space-y-2 list-disc list-inside text-slate-700 font-medium">
            {mainPrp.references.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
