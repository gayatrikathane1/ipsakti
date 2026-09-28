import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle2, Code, Layers } from 'lucide-react';

export const TrpPrpPage: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<'trp' | 'prp'>('trp');

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold mb-2">
              <FileText className="w-3.5 h-3.5 text-emerald-700" />
              <span>SIH 2026 Problem Statement 26045 Documentation</span>
            </div>
            <h1 className="text-3xl font-black text-emerald-950 tracking-tight">
              📑 TRP & PRP Research Documentation
            </h1>
            <p className="text-xs text-slate-700 font-semibold mt-1">
              Technical Research Paper (TRP) & Project Research Paper (PRP) for ATREYA MVP
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl border border-emerald-200 shadow-xs">
            <button
              onClick={() => setActiveDoc('trp')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeDoc === 'trp' ? 'bg-emerald-700 text-white shadow' : 'text-slate-700 hover:text-emerald-900'
              }`}
            >
              Technical Research Paper (TRP)
            </button>
            <button
              onClick={() => setActiveDoc('prp')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeDoc === 'prp' ? 'bg-emerald-700 text-white shadow' : 'text-slate-700 hover:text-emerald-900'
              }`}
            >
              Project Research Paper (PRP)
            </button>
          </div>
        </div>

        {/* AI-Assisted Draft Label */}
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs font-bold flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Note: Formatted as AI-assisted draft grounded in official statutory evidence.</span>
        </div>
      </div>

      {/* TRP Content */}
      {activeDoc === 'trp' && (
        <div className="bg-white border border-emerald-200 rounded-3xl p-8 space-y-6 shadow-xs text-slate-800 text-xs leading-relaxed">
          <div className="border-b border-emerald-100 pb-4">
            <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">DOCUMENT ID: SIH-2026-TRP-26045</span>
            <h2 className="text-2xl font-black text-emerald-950 mt-1">Technical Research Paper (TRP): Retrieval-Augmented Generation Architecture for Indian IP & Traditional Knowledge Safeguards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 1. Problem Statement
              </h3>
              <p className="text-slate-700 font-medium">
                Indian traditional knowledge holders, Ayurveda practitioners, and startups face significant hurdles in navigating non-patentability exclusions under Section 3(p) of the Patents Act 1970, prior art verification against CSIR-TKDL, and statutory IPO fee schedules.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 2. Technical Background & Literature
              </h3>
              <p className="text-slate-700 font-medium">
                Grounding in codified statutes (Patents Act 1970, Trade Marks Act 1999, Biological Diversity Act 2002) and prior art archives (TKDL, WIPO PCT, CGPDTM manuals) to prevent biopiracy and ensure Fair & Equitable Benefit Sharing (FEBS).
              </p>
            </div>

            <div className="space-y-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-700" /> 3. RAG System Architecture
              </h3>
              <p className="text-slate-700 font-medium">
                11-step execution pipeline: Question $\rightarrow$ Language Detection (20 Languages) $\rightarrow$ Intent & Jurisdiction Classifier $\rightarrow$ Trusted Corpus Vector Retrieval $\rightarrow$ Reranking $\rightarrow$ Citation Validation $\rightarrow$ Evidence Indicator Assessment $\rightarrow$ Response Output.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <Code className="w-4 h-4 text-emerald-700" /> 4. Technology Stack
              </h3>
              <p className="text-slate-700 font-medium">
                React 19, TypeScript v5.6, Tailwind CSS v4, Vite v8, Web Speech API (speech-to-text & synthesis), Client-Side RAG Evidence Engine, PDF/Image OCR processing.
              </p>
            </div>
          </div>

          <div className="space-y-3 p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-emerald-950 text-sm">5. Testing, Limitations & Future Scope</h3>
            <ul className="list-disc list-inside space-y-1.5 text-slate-700 font-medium">
              <li>Tested across module compilations with 0 production build errors.</li>
              <li>Limitation: Full TKDL database access remains restricted to official patent offices per CSIR policy.</li>
              <li>Future Scope: Real-time integration with CGPDTM E-Filing API endpoints and National Biodiversity Authority online portal.</li>
            </ul>
          </div>
        </div>
      )}

      {/* PRP Content */}
      {activeDoc === 'prp' && (
        <div className="bg-white border border-emerald-200 rounded-3xl p-8 space-y-6 shadow-xs text-slate-800 text-xs leading-relaxed">
          <div className="border-b border-emerald-100 pb-4">
            <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">DOCUMENT ID: SIH-2026-PRP-26045</span>
            <h2 className="text-2xl font-black text-emerald-950 mt-1">Project Research Paper (PRP): ATREYA Product Strategy, User Impact & Feasibility</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 1. Target Users & Beneficiaries
              </h3>
              <p className="text-slate-700 font-medium">
                Ayurvedic practitioners, traditional knowledge holders, rural innovators, MSMEs, DPIIT startups, IP research students, and patent attorneys across India.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 2. Proposed Solution & Workflow
              </h3>
              <p className="text-slate-700 font-medium">
                A 100% accessible, multilingual White + Green interface offering instant voice input, document OCR upload, guided Section 3 screening, official IPO fee calculation, and evidence-grounded answers.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 3. Innovation & Feasibility
              </h3>
              <p className="text-slate-700 font-medium">
                Runs 100% client-side with zero external API key requirements. Full localization in 20 languages with strict statutory disclaimers.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 4. Expected Impact
              </h3>
              <p className="text-slate-700 font-medium">
                Democratizes IP legal literacy in rural India, prevents biopiracy of traditional medicinal herbs, and accelerates startup patent filings via Form 18A expedited examination.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
