import React from 'react';
import { X, BookOpen, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ExplainSimplyModalProps {
  title?: string;
  simpleExplanation?: string;
  realLifeExample?: string;
  whyItMatters?: string;
  nextSteps?: string;
  officialUrl?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ExplainSimplyModal: React.FC<ExplainSimplyModalProps> = ({
  title = 'Explain Simply',
  simpleExplanation = 'This statutory rule or research paper clarifies the legal boundary for traditional knowledge and intellectual property protection.',
  realLifeExample = 'For example: If a village remedy uses neem and turmeric for skin healing as handed down through generations, Section 3(p) bars an entity from patenting that exact formulation without adding a novel technical process.',
  whyItMatters = 'It prevents corporate biopiracy of traditional Indian remedies while encouraging genuine scientific process innovation.',
  nextSteps = 'Check the CSIR-TKDL database or consult the National Biodiversity Authority (NBA) if commercializing biological resources.',
  officialUrl = 'https://ipindia.gov.in/',
  isOpen,
  onClose,
}) => {
  const { t } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col border border-emerald-100">
        {/* Header */}
        <div className="bg-emerald-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-950 flex items-center justify-center font-black text-xl shadow border border-emerald-300">
              📖
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight">{t('buttons.explainSimply', 'Explain Simply')}</h2>
              <p className="text-xs text-emerald-200">Local Language Phrasing & Real-Life Context</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 text-xs">
          <h3 className="text-sm font-extrabold text-emerald-950 border-b border-emerald-100 pb-2">
            {title}
          </h3>

          {/* Section 1: What does this mean? */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
            <strong className="text-emerald-950 font-black flex items-center gap-1.5 text-xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              1. What does this mean?
            </strong>
            <p className="text-slate-800 font-medium leading-relaxed">{simpleExplanation}</p>
          </div>

          {/* Section 2: Why does it matter? */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-1">
            <strong className="text-slate-900 font-black flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              2. Why does it matter?
            </strong>
            <p className="text-slate-700 font-medium leading-relaxed">{whyItMatters}</p>
          </div>

          {/* Section 3: Real-Life Example */}
          <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl space-y-1">
            <strong className="text-emerald-950 font-black flex items-center gap-1.5 text-xs">
              💡 3. Real-Life Example
            </strong>
            <p className="text-slate-800 font-medium leading-relaxed">{realLifeExample}</p>
          </div>

          {/* Section 4: What should I check next? */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
            <strong className="text-emerald-950 font-black flex items-center gap-1.5 text-xs">
              🔍 4. What should I check next?
            </strong>
            <p className="text-slate-800 font-medium leading-relaxed">{nextSteps}</p>
          </div>

          {/* Footer Official Link */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <span className="text-[11px] text-slate-500 font-semibold">
              Always verify against the latest official statutory source.
            </span>

            {officialUrl && (
              <a
                href={officialUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow text-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Open Official Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
