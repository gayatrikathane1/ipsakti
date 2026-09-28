import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, X, Sparkles, Check, Info, Coins, ExternalLink } from 'lucide-react';

export const FeeCalculatorModal: React.FC = () => {
  const { isFeeCalcOpen, setIsFeeCalcOpen, t } = useApp();

  const [ipType, setIpType] = useState<'patent' | 'trademark'>('patent');
  const [entityType, setEntityType] = useState<'startup' | 'large'>('startup');
  const [includeForm1, setIncludeForm1] = useState<boolean>(true);
  const [includeForm9, setIncludeForm9] = useState<boolean>(false);
  const [examinationType, setExaminationType] = useState<'none' | 'normal' | 'expedited'>('expedited');
  const [extraClaims, setExtraClaims] = useState<number>(0);
  const [extraPages, setExtraPages] = useState<number>(0);
  const [tmClassesCount, setTmClassesCount] = useState<number>(1);

  if (!isFeeCalcOpen) return null;

  // Calculation Logic
  let totalFee = 0;
  const breakdown: { item: string; fee: number }[] = [];

  if (ipType === 'patent') {
    const isStartup = entityType === 'startup';

    // Form 1
    if (includeForm1) {
      const form1Fee = isStartup ? 1600 : 8000;
      breakdown.push({ item: `Form 1 (Application Filing)`, fee: form1Fee });
      totalFee += form1Fee;
    }

    // Form 9 (Early Publication)
    if (includeForm9) {
      const form9Fee = isStartup ? 2500 : 12500;
      breakdown.push({ item: `Form 9 (Early Publication Request)`, fee: form9Fee });
      totalFee += form9Fee;
    }

    // Examination (Form 18 / 18A)
    if (examinationType === 'normal') {
      const form18Fee = isStartup ? 4000 : 20000;
      breakdown.push({ item: `Form 18 (Normal Examination - RFE)`, fee: form18Fee });
      totalFee += form18Fee;
    } else if (examinationType === 'expedited') {
      const form18AFee = isStartup ? 8000 : 60000;
      breakdown.push({ item: `Form 18A (Expedited Examination Track)`, fee: form18AFee });
      totalFee += form18AFee;
    }

    // Extra Claims (beyond 10)
    if (extraClaims > 0) {
      const perClaim = isStartup ? 320 : 1600;
      const extraClaimsFee = extraClaims * perClaim;
      breakdown.push({ item: `Extra Claims (${extraClaims} × ₹${perClaim})`, fee: extraClaimsFee });
      totalFee += extraClaimsFee;
    }

    // Extra Pages (beyond 30)
    if (extraPages > 0) {
      const perPage = isStartup ? 160 : 800;
      const extraPagesFee = extraPages * perPage;
      breakdown.push({ item: `Extra Pages (${extraPages} × ₹${perPage})`, fee: extraPagesFee });
      totalFee += extraPagesFee;
    }
  } else {
    // Trademark (Form TM-A)
    const isStartup = entityType === 'startup';
    const baseFeePerClass = isStartup ? 4500 : 9000;
    const totalTmFee = baseFeePerClass * tmClassesCount;
    breakdown.push({
      item: `Form TM-A (${tmClassesCount} Class${tmClassesCount > 1 ? 'es' : ''} × ₹${baseFeePerClass})`,
      fee: totalTmFee,
    });
    totalFee = totalTmFee;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-emerald-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 text-slate-800 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-10 -left-10 w-36 h-36 bg-emerald-100 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-950">{t('feeCalculator')}</h3>
              <p className="text-xs text-emerald-800 font-semibold">Patent Rules 2024 (G.S.R. 204(E) Effective March 15, 2024)</p>
            </div>
          </div>
          <button
            onClick={() => setIsFeeCalcOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Fee Disclaimer */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs font-semibold flex items-center space-x-2">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{t('feeDisclaimer')}</span>
        </div>

        {/* Inputs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* IP Category Switch */}
          <div className="space-y-2">
            <label className="block text-emerald-900 font-bold uppercase tracking-wider text-[10px]">1. Select IP Type</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setIpType('patent')}
                className={`py-2 rounded-lg font-bold transition cursor-pointer ${
                  ipType === 'patent' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Patent Application
              </button>
              <button
                onClick={() => setIpType('trademark')}
                className={`py-2 rounded-lg font-bold transition cursor-pointer ${
                  ipType === 'trademark' ? 'bg-emerald-700 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Trademark (TM-A)
              </button>
            </div>
          </div>

          {/* Applicant Category Switch */}
          <div className="space-y-2">
            <label className="block text-emerald-900 font-bold uppercase tracking-wider text-[10px]">2. Applicant Category</label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setEntityType('startup')}
                className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                  entityType === 'startup'
                    ? 'bg-emerald-700 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                <span>Startup / Individual (80% Off)</span>
              </button>
              <button
                onClick={() => setEntityType('large')}
                className={`py-2 rounded-lg font-bold transition cursor-pointer ${
                  entityType === 'large' ? 'bg-slate-700 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Large Enterprise
              </button>
            </div>
          </div>

          {/* Patent Specific Options */}
          {ipType === 'patent' ? (
            <>
              {/* Form Toggles */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-emerald-900 font-bold uppercase tracking-wider text-[10px]">3. Required Statutory Forms</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer transition ${
                    includeForm1 ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <input
                      type="checkbox"
                      checked={includeForm1}
                      onChange={(e) => setIncludeForm1(e.target.checked)}
                      className="rounded accent-emerald-700"
                    />
                    <div>
                      <div>Form 1 (Application)</div>
                      <div className="text-[10px] text-slate-500 font-normal">Mandatory Initial Filing</div>
                    </div>
                  </label>

                  <label className={`flex items-center space-x-2 p-2.5 rounded-xl border cursor-pointer transition ${
                    includeForm9 ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    <input
                      type="checkbox"
                      checked={includeForm9}
                      onChange={(e) => setIncludeForm9(e.target.checked)}
                      className="rounded accent-emerald-700"
                    />
                    <div>
                      <div>Form 9 (Early Pub)</div>
                      <div className="text-[10px] text-slate-500 font-normal">Published in 1 month</div>
                    </div>
                  </label>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-600 font-bold">Examination Track (RFE)</label>
                    <select
                      value={examinationType}
                      onChange={(e) => setExaminationType(e.target.value as any)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-2 py-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-emerald-600"
                    >
                      <option value="none">No Examination Request</option>
                      <option value="normal">Form 18 (Normal Examination)</option>
                      <option value="expedited">Form 18A (Expedited Track ⚡)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Extra Claims & Pages */}
              <div className="space-y-2">
                <label className="block text-emerald-900 font-bold uppercase tracking-wider text-[10px]">Extra Claims (Beyond 10)</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={extraClaims}
                  onChange={(e) => setExtraClaims(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:border-emerald-600"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-emerald-900 font-bold uppercase tracking-wider text-[10px]">Extra Pages (Beyond 30)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={extraPages}
                  onChange={(e) => setExtraPages(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:border-emerald-600"
                />
              </div>
            </>
          ) : (
            <div className="space-y-2 md:col-span-2">
              <label className="block text-emerald-900 font-bold uppercase tracking-wider text-[10px]">Number of Trademark NICE Classes</label>
              <input
                type="number"
                min="1"
                max="45"
                value={tmClassesCount}
                onChange={(e) => setTmClassesCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:border-emerald-600"
              />
            </div>
          )}
        </div>

        {/* Calculation Result Breakdown */}
        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-950 border-b border-emerald-200 pb-2">
            <span>Form & Line Item Breakdown</span>
            <span>Statutory Fee</span>
          </div>

          <div className="space-y-2 text-xs font-medium">
            {breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  {item.item}
                </span>
                <span className="font-mono font-bold text-slate-900">₹{item.fee.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-600 block font-bold">Total Estimated Statutory Fee</span>
              {entityType === 'startup' && (
                <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-1">
                  <Coins className="w-3 h-3 text-emerald-700" /> Includes 80% DPIIT Startup Concession
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-emerald-800 font-mono">
              ₹{totalFee.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 font-semibold">
          <a
            href="https://ipindia.gov.in"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-emerald-800 hover:underline"
          >
            <span>Official Portal: ipindia.gov.in</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => setIsFeeCalcOpen(false)}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold px-4 py-2 rounded-xl transition cursor-pointer"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
