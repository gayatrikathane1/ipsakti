import React from 'react';
import { X, ExternalLink, Globe, CheckCircle2 } from 'lucide-react';
import type { OfficialSource } from '../types/ip';

interface WhyThisSourceModalProps {
  source: OfficialSource | null;
  onClose: () => void;
}

export const WhyThisSourceModal: React.FC<WhyThisSourceModalProps> = ({ source, onClose }) => {
  if (!source) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col border border-emerald-100">
        {/* Modal Header */}
        <div className="bg-emerald-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-950 flex items-center justify-center font-black text-xl shadow border border-emerald-300">
              🔍
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight">WHY THIS SOURCE?</h2>
              <p className="text-xs text-emerald-200">Statutory & Verification Rationale</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
            <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">
              Organization / Portal
            </span>
            <h3 className="text-sm font-extrabold text-emerald-950">{source.authority}</h3>
            <p className="text-slate-700 font-semibold">{source.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-slate-700">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="block text-[10px] text-slate-400 uppercase font-extrabold mb-1">
                Source Type
              </strong>
              <span className="font-bold text-slate-900">
                {source.sourceType || 'Official Statutory Authority'}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="block text-[10px] text-slate-400 uppercase font-extrabold mb-1">
                Official Status
              </strong>
              <span className="font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {source.status || 'Verified Official Portal'}
              </span>
            </div>
          </div>

          {source.publicationDate && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700">
              <strong className="block text-[10px] text-slate-400 uppercase font-extrabold mb-0.5">
                Publication / Update Date
              </strong>
              <span className="font-bold text-slate-900">{source.publicationDate}</span>
            </div>
          )}

          <div className="space-y-1 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
            <strong className="text-emerald-950 font-extrabold text-xs block mb-1">
              Why this source is trusted by ATREYA:
            </strong>
            <p className="text-slate-800 font-medium leading-relaxed">
              {source.whyThisSource ||
                'This source represents official legislation, statutory gazette notifications, or government-backed research institutions recognized by the Govt of India or UN WIPO.'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              Direct Official URL
            </span>

            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow"
            >
              <span>Open Official Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
