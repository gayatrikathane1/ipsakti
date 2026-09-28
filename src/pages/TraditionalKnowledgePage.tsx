import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Leaf, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';
import { TRUSTED_CORPUS } from '../data/trustedCorpus';

export const TraditionalKnowledgePage: React.FC = () => {
  const { openChatWithPrompt } = useApp();

  const tkSources = TRUSTED_CORPUS.filter((c) => c.domain.includes('Ayurveda') || c.domain.includes('Traditional'));

  return (
    <div className="space-y-8 pb-12 animate-fade-in max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-3xl space-y-4 shadow-sm">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold">
          <Leaf className="w-3.5 h-3.5 text-emerald-700" />
          <span>Section 3(p) & Heritage Safeguards</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
          🌿 Traditional Knowledge & TKDL Resource Hub
        </h1>

        <p className="text-sm text-slate-700 leading-relaxed font-medium max-w-3xl">
          Learn how India protects ancient medicinal heritage (Ayurveda, Siddha, Unani, Yoga) from biopiracy through Section 3(p) of the Patents Act 1970 and the CSIR-TKDL prior art defense system.
        </p>
      </div>

      {/* 4 Informational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1 */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-emerald-400 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            1
          </div>
          <h3 className="text-base font-bold text-emerald-950">What is Traditional Knowledge?</h3>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            Traditional Knowledge (TK) refers to indigenous innovations, medical practices, and biological usages passed down through generations. In India, classical remedies in texts like *Charaka Samhita* form part of public heritage.
          </p>
          <div className="pt-2 border-t border-emerald-100 text-xs font-bold text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Protected from Private Patent Monopolies</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-emerald-400 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            2
          </div>
          <h3 className="text-base font-bold text-emerald-950">What is TKDL?</h3>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            The **Traditional Knowledge Digital Library (TKDL)** is a pioneer digital database established by CSIR and the Ministry of Ayush. It translates over 4.4 lakh formulation entries into 5 international patent languages (English, French, German, Japanese, Spanish).
          </p>
          <div className="pt-2 border-t border-emerald-100 text-xs font-bold text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Provides Examiner Prior Art Evidence</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-emerald-400 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            3
          </div>
          <h3 className="text-base font-bold text-emerald-950">How TKDL Prevents Biopiracy</h3>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            TKDL provides global patent examiners (USPTO, EPO, JPO, IPO) access to prior art during examination. This has successfully led to the withdrawal or rejection of over 300 erroneous biopirated patent claims abroad (e.g., turmeric wound healing and neem patents).
          </p>
          <div className="pt-2 border-t border-emerald-100 text-xs font-bold text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Defends Indian Indigenous Rights</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-3 shadow-xs hover:border-emerald-400 transition">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
            4
          </div>
          <h3 className="text-base font-bold text-emerald-950">Why Source Documentation Matters</h3>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            Documenting biological resources ensures Fair and Equitable Benefit Sharing (FEBS) under Section 6 of the Biological Diversity Act 2002 managed by the National Biodiversity Authority (NBA).
          </p>
          <div className="pt-2 border-t border-emerald-100 text-xs font-bold text-emerald-900 flex items-center gap-1">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>Note: Full TKDL Database Access Restricted to Patent Offices</span>
          </div>
        </div>
      </div>

      {/* Restricted Access Note */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 text-xs font-semibold flex items-center space-x-3">
        <Lock className="w-5 h-5 text-emerald-700 shrink-0" />
        <div>
          <strong className="block">Statutory Access Notice:</strong>
          <span>The full TKDL database is restricted to authorized patent examination offices to prevent misappropriation. Public users can access structured summaries, regulatory guidelines, and research papers.</span>
        </div>
      </div>

      {/* Source Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-emerald-950 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          Curated Traditional Knowledge Corpus Sources
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tkSources.map((source) => (
            <div key={source.documentId} className="bg-white border border-emerald-200 rounded-2xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {source.documentId}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">{source.authority}</span>
              </div>
              <h4 className="font-bold text-emerald-950 text-sm">{source.title}</h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                "{source.textChunk}"
              </p>
              <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-xs">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-800 hover:underline font-bold flex items-center gap-1"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => openChatWithPrompt(`Explain ${source.title} and Section 3(p) implications.`)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1 rounded-lg transition cursor-pointer"
                >
                  Ask AI
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
