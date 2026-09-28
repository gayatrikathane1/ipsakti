import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lightbulb, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

export interface CheckMyIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckMyIdeaModal: React.FC<CheckMyIdeaModalProps> = ({ isOpen, onClose }) => {
  const { openChatWithPrompt, saveToVault, t } = useApp();
  const [ideaInput, setIdeaInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!ideaInput.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      const q = ideaInput.toLowerCase();
      let isHerb = q.includes('ashwagandha') || q.includes('turmeric') || q.includes('neem') || q.includes('herb') || q.includes('plant') || q.includes('extract');

      setAnalysisResult({
        summary: ideaInput,
        relatedTk: isHerb
          ? 'Classical Ayurvedic herbal uses recorded in Charaka Samhita & CSIR-TKDL repository.'
          : 'None detected directly; general technical / AI innovation concept.',
        ipCategories: isHerb
          ? ['Process Patent (Sec 3p)', 'Trademarks (Class 5)', 'Geographical Indication (if regional)']
          : ['Process Patent (Sec 3k Technical Effect)', 'Trademarks (Class 9/42)', 'Copyright (Source Code)'],
        researchAreas: ['Pharmacognosy', 'Clinical Efficacy Bio-assays', 'Prior Art Examination'],
        authority: isHerb ? 'Intellectual Property India (CGPDTM) & National Biodiversity Authority (NBA)' : 'Intellectual Property India (CGPDTM - Patent Office)',
        verifyQuestions: [
          'Is this an aggregation of known plant properties or a novel bio-extraction process?',
          'Does this formulation require Section 6 clearance from the National Biodiversity Authority?',
          'Are there prior art publications in CSIR-TKDL or WIPO PATENTSCOPE?'
        ],
        sources: [
          { title: 'Patents Act 1970 (Section 3p)', url: 'https://ipindia.gov.in' },
          { title: 'Biological Diversity Act 2002', url: 'https://nbaindia.org' },
          { title: 'CSIR-TKDL Archive', url: 'https://www.tkdl.res.in' }
        ],
        nextStep: 'Conduct a preliminary prior art search on IP India and consult a registered Patent Agent.'
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-emerald-200 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-slate-800 relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-950">
              <Lightbulb className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-lg font-black text-emerald-950">💡 {t('checkIdea.title', 'Smart Check My Idea')}</h3>
              <p className="text-xs text-slate-600 font-semibold">{t('checkIdea.subtitle')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-xl text-slate-400 hover:bg-emerald-50 transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <textarea
            value={ideaInput}
            onChange={(e) => setIdeaInput(e.target.value)}
            placeholder={t('checkIdea.placeholder', 'Describe your idea in simple language...')}
            className="w-full bg-emerald-50/50 hover:bg-white focus:bg-white border border-emerald-200 focus:border-emerald-600 rounded-2xl p-4 text-xs text-slate-900 focus:outline-none min-h-[90px] font-medium transition"
          />

          <div className="flex items-center justify-between">
            <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t('localBridge.verificationStatus')}</span>
            </span>

            <button
              onClick={handleAnalyze}
              disabled={!ideaInput.trim() || isAnalyzing}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
                ideaInput.trim() && !isAnalyzing
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{isAnalyzing ? 'Analyzing Idea...' : 'Analyze Idea'}</span>
            </button>
          </div>
        </div>

        {/* Structured 8-point Output */}
        {analysisResult && (
          <div className="space-y-4 pt-2 border-t border-emerald-100 animate-fade-in text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <span className="font-extrabold text-emerald-950 text-[11px] flex items-center gap-1">
                ⚠️ Statutorily Grounded Notice:
              </span>
              <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                ATREYA provides preliminary AI research support. It does NOT state legal ownership or patentability. Always verify evidence with official statutory authorities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-extrabold text-emerald-950 text-xs block">{t('checkIdea.labels.summary')}</span>
                <p className="text-slate-700 font-medium">{analysisResult.summary}</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-extrabold text-emerald-950 text-xs block">{t('checkIdea.labels.tk')}</span>
                <p className="text-slate-700 font-medium">{analysisResult.relatedTk}</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-extrabold text-emerald-950 text-xs block">{t('checkIdea.labels.ipCategories')}</span>
                <ul className="list-disc list-inside text-slate-700 font-medium">
                  {analysisResult.ipCategories.map((c: string, idx: number) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-extrabold text-emerald-950 text-xs block">{t('checkIdea.labels.authority')}</span>
                <p className="text-slate-700 font-bold">{analysisResult.authority}</p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-2">
              <span className="font-extrabold text-emerald-950 text-xs block">{t('checkIdea.labels.verifyQuestions')}</span>
              <ul className="space-y-1">
                {analysisResult.verifyQuestions.map((q: string, idx: number) => (
                  <li key={idx} className="flex items-start space-x-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-emerald-700 text-white rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-200 block">{t('checkIdea.labels.nextStep')}</span>
                <p className="text-xs font-semibold">{analysisResult.nextStep}</p>
              </div>
              <button
                onClick={() => {
                  saveToVault({
                    title: `Idea Analysis: ${analysisResult.summary.substring(0, 40)}...`,
                    type: 'idea',
                    language: 'en',
                    notes: analysisResult.nextStep
                  });
                  onClose();
                  openChatWithPrompt(`Provide statutory guidance for my idea: ${analysisResult.summary}`);
                }}
                className="px-4 py-2 bg-white text-emerald-900 font-bold rounded-lg text-xs hover:bg-emerald-50 transition cursor-pointer shrink-0"
              >
                Ask AI Assistant →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
