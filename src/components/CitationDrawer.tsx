import React from 'react';
import { useApp } from '../context/AppContext';
import { X, BookOpen, ExternalLink, ShieldCheck, Scale, FileText, CheckCircle } from 'lucide-react';

export const CitationDrawer: React.FC = () => {
  const { activeCitation, setActiveCitation } = useApp();

  if (!activeCitation) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-emerald-200 text-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-emerald-100 bg-emerald-50/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-950">Statutory Citation Inspector</h3>
                <p className="text-[11px] text-emerald-800 font-bold">{activeCitation.section}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveCitation(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
            {/* Title & Act */}
            <div className="space-y-1 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200">
              <span className="text-[10px] uppercase font-extrabold text-emerald-900 tracking-wider">
                Official Title
              </span>
              <h4 className="text-sm font-bold text-emerald-950">{activeCitation.title}</h4>
              <p className="text-slate-600 font-semibold">{activeCitation.act}</p>
            </div>

            {/* AI Match Confidence Score */}
            <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-700 flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Statutory Match Relevance
                </span>
                <span className="font-extrabold text-emerald-800">
                  {Math.round(activeCitation.relevanceScore * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-700 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${activeCitation.relevanceScore * 100}%` }}
                />
              </div>
            </div>

            {/* Official Legal Text Excerpt */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-emerald-950 font-bold uppercase tracking-wider text-[11px]">
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>Statutory Provision Text</span>
              </div>
              <div className="bg-emerald-50/90 p-4 rounded-xl border border-emerald-200 text-emerald-950 font-mono text-[11px] leading-relaxed italic">
                "{activeCitation.legalText}"
              </div>
            </div>

            {/* Plain English Explanation */}
            <div className="space-y-2">
              <div className="flex items-center space-x-1.5 text-slate-800 font-bold uppercase tracking-wider text-[11px]">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>Plain Language Interpretation</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-medium">
                {activeCitation.plainEnglishSummary}
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {activeCitation.gazetteRef && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-500 block font-semibold">Official Gazette Ref</span>
                  <span className="text-slate-800 font-bold">{activeCitation.gazetteRef}</span>
                </div>
              )}

              {activeCitation.penaltyOrTerm && (
                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <span className="text-[10px] text-emerald-800 block font-bold">Statutory Impact / Exclusion</span>
                  <span className="text-emerald-950 font-extrabold">{activeCitation.penaltyOrTerm}</span>
                </div>
              )}
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-emerald-100 bg-emerald-50/60 flex items-center justify-between">
            <div className="flex items-center space-x-1 text-slate-600 text-[11px] font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Verified IP Gazette Record</span>
            </div>

            {activeCitation.officialUrl && (
              <a
                href={activeCitation.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer"
              >
                <span>Open Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
