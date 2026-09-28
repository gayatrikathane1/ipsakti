import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, X, ArrowRight, ArrowLeft, Sparkles, ShieldAlert } from 'lucide-react';
import type { ScreeningResult } from '../types/ip';

export const EligibilityWizard: React.FC = () => {
  const { isEligibilityWizardOpen, setIsEligibilityWizardOpen, t } = useApp();

  const [step, setStep] = useState<number>(1);
  const [inventionTitle, setInventionTitle] = useState<string>('Novel Extraction Process for Medicinal Botanical Compounds');
  const [noveltyDescription, setNoveltyDescription] = useState<string>('High-efficiency aqueous-ethanolic reflux extraction method yielding purified bio-active flavonoids');
  const [isTkRelated, setIsTkRelated] = useState<boolean>(true);
  const [isAyurvedicFormulation, setIsAyurvedicFormulation] = useState<boolean>(false);
  const [type, setType] = useState<'product' | 'process'>('process');
  const [jurisdictionTarget, setJurisdictionTarget] = useState<string>('India (IPO)');

  if (!isEligibilityWizardOpen) return null;

  const resetWizard = () => {
    setStep(1);
    setInventionTitle('Novel Extraction Process for Medicinal Botanical Compounds');
    setNoveltyDescription('High-efficiency aqueous-ethanolic reflux extraction method yielding purified bio-active flavonoids');
    setIsTkRelated(true);
    setIsAyurvedicFormulation(false);
    setType('process');
    setJurisdictionTarget('India (IPO)');
  };

  const calculateScreening = (): ScreeningResult => {
    if (isAyurvedicFormulation && type === 'product') {
      return {
        inventionTitle,
        noveltyDescription,
        isTkRelated,
        isAyurvedicFormulation,
        type,
        jurisdiction: jurisdictionTarget,
        preliminaryVerdict: 'High Section 3(p) Screening Challenge',
        relevantSection: 'Section 3(p) & Section 3(e) — Indian Patents Act 1970',
        explanation:
          'Classical Ayurvedic formulations or mere admixtures of known medicinal plants are statutorily non-patentable under Section 3(p). Public domain traditional remedies documented in ancient texts lack novelty.',
        evidence:
          'CORPUS-IN-PAT-1970-SEC3P: Traditional knowledge or aggregations of known properties of traditional components are excluded from patent grants.',
        sources: [
          {
            title: 'The Patents Act, 1970 (Section 3(p))',
            authority: 'IP India (CGPDTM)',
            url: 'https://ipindia.gov.in/acts/patent-act-1970',
          },
          {
            title: 'Traditional Knowledge Digital Library (TKDL)',
            authority: 'CSIR & Ministry of Ayush',
            url: 'https://www.tkdl.res.in',
          },
        ],
        possibleIssue:
          'High probability of Section 3(p) biopiracy objection during examination at the Indian Patent Office.',
        nextStep:
          'Consider protecting brand name via Trademark (Form TM-A Class 5) and explore process claims if novel extraction techniques were developed.',
      };
    }

    if (type === 'process' && isTkRelated) {
      return {
        inventionTitle,
        noveltyDescription,
        isTkRelated,
        isAyurvedicFormulation,
        type,
        jurisdiction: jurisdictionTarget,
        preliminaryVerdict: 'Potentially Patentable Process Claim (Requires NBA Clearance)',
        relevantSection: 'Section 2(1)(j) Patents Act & Section 6 Biological Diversity Act 2002',
        explanation:
          'While the traditional plant material itself is excluded, a novel, non-obvious technical extraction process may be eligible for a process patent in India.',
        evidence:
          'CORPUS-NBA-BDA-2002-SEC6: Biological resource-based inventions require prior National Biodiversity Authority clearance under Form III.',
        sources: [
          {
            title: 'Biological Diversity Act, 2002 (Section 6)',
            authority: 'National Biodiversity Authority (NBA India)',
            url: 'https://nbaindia.org',
          },
        ],
        possibleIssue:
          'Must file Form III with NBA before patent grant to avoid statutory bar.',
        nextStep:
          'Submit Form 1 + Form 2 with comparative extraction efficacy charts and file NBA clearance application.',
      };
    }

    return {
      inventionTitle,
      noveltyDescription,
      isTkRelated,
      isAyurvedicFormulation,
      type,
      jurisdiction: jurisdictionTarget,
      preliminaryVerdict: 'Eligible for Baseline Patentability Screening',
      relevantSection: 'Section 2(1)(j) — Invention & Industrial Applicability',
      explanation:
        'Your innovation satisfies baseline statutory criteria. Complete Specification should detail inventive steps and technical effect.',
      evidence:
        'CORPUS-IN-PAT-1970: Technical inventions demonstrating novelty, non-obviousness, and industrial applicability are patentable.',
      sources: [
        {
          title: 'IP India Patent Manual',
          authority: 'CGPDTM',
          url: 'https://ipindia.gov.in',
        },
      ],
      possibleIssue: 'Ensure prior art novelty is verified across WIPO and Google Patents databases.',
      nextStep: 'Conduct prior art search and prepare Form 1 & Form 2 specification.',
    };
  };

  const result = calculateScreening();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-emerald-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 text-slate-800 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-950">{t('section3Test')}</h3>
              <p className="text-xs text-emerald-800 font-semibold">Guided Section 3 Screening Tool</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsEligibilityWizardOpen(false);
              resetWizard();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Safety Notice */}
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{t('section3Disclaimer')}</span>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
          <span className={`px-2.5 py-1 rounded-full ${step === 1 ? 'bg-emerald-700 text-white' : 'bg-slate-100'}`}>1. Invention</span>
          <span>→</span>
          <span className={`px-2.5 py-1 rounded-full ${step === 2 ? 'bg-emerald-700 text-white' : 'bg-slate-100'}`}>2. TK & Type</span>
          <span>→</span>
          <span className={`px-2.5 py-1 rounded-full ${step === 3 ? 'bg-emerald-700 text-white' : 'bg-slate-100'}`}>3. Screening</span>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-emerald-950 font-bold">1. What is your invention?</label>
              <input
                type="text"
                value={inventionTitle}
                onChange={(e) => setInventionTitle(e.target.value)}
                placeholder="e.g. Extraction process for neem and turmeric bioactive flavonoids"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-emerald-950 font-bold">2. What is new about it?</label>
              <textarea
                rows={2}
                value={noveltyDescription}
                onChange={(e) => setNoveltyDescription(e.target.value)}
                placeholder="Describe non-obvious technical steps or novel isolated compounds..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4 text-xs font-medium">
            <div className="space-y-2">
              <label className="block text-emerald-950 font-bold">3. Innovation Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setType('product')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                    type === 'product' ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  Product / Formulation
                </button>
                <button
                  onClick={() => setType('process')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                    type === 'process' ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  Process / Method
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-start space-x-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTkRelated}
                  onChange={(e) => setIsTkRelated(e.target.checked)}
                  className="mt-0.5 rounded accent-emerald-700"
                />
                <div>
                  <span className="font-bold text-slate-900">Is it related to traditional knowledge or medicinal plants?</span>
                  <p className="text-[11px] text-slate-500">Uses plants like Neem, Turmeric, Ashwagandha, Tulsi, or classical remedies</p>
                </div>
              </label>

              <label className="flex items-start space-x-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAyurvedicFormulation}
                  onChange={(e) => setIsAyurvedicFormulation(e.target.checked)}
                  className="mt-0.5 rounded accent-emerald-700"
                />
                <div>
                  <span className="font-bold text-slate-900">Is it an Ayurvedic formulation product?</span>
                  <p className="text-[11px] text-slate-500">Formulation containing classical Ayurvedic ingredients</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-3 text-xs">
            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-black text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                  Preliminary Screening Result
                </span>
                <Sparkles className="w-4 h-4 text-emerald-700" />
              </div>

              <h4 className="text-sm font-bold text-emerald-950">{result.preliminaryVerdict}</h4>
              <p className="text-slate-800 leading-relaxed font-medium">{result.explanation}</p>

              <div className="p-2.5 bg-white rounded-lg border border-emerald-200 text-emerald-900 font-bold text-[11px]">
                Relevant Provision: {result.relevantSection}
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Possible Challenge</span>
                <p className="text-emerald-950 bg-emerald-50 p-2 rounded border border-emerald-200 font-medium">{result.possibleIssue}</p>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Recommended Next Step</span>
                <p className="text-slate-800 font-bold">{result.nextStep}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-emerald-100">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center space-x-1 text-slate-600 hover:text-slate-900 font-bold text-xs py-2 px-3 rounded-lg cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition shadow cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEligibilityWizardOpen(false);
                resetWizard();
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition shadow cursor-pointer"
            >
              Finish Screening
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
