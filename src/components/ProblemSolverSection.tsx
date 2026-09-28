import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Leaf,
  Lightbulb,
  FileText,
  FlaskConical,
  Tag,
  Package,
  Wheat,
  BookOpen,
  Scale,
  Landmark,
  Search,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const ProblemSolverSection: React.FC<{ onOpenCheckIdea?: () => void }> = ({ onOpenCheckIdea }) => {
  const { openChatWithPrompt, setActivePage, t } = useApp();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const scenarios = [
    {
      key: 'tk',
      icon: Leaf,
      title: t('solver.options.tk', '🌿 I have traditional knowledge'),
      guidance: 'ATREYA evaluates your traditional knowledge under Section 3(p) of the Patents Act 1970 and cross-checks prior art against the CSIR-TKDL repository.',
      actionText: 'Explore Local Knowledge Bridge',
      action: () => setActivePage('tk')
    },
    {
      key: 'idea',
      icon: Lightbulb,
      title: t('solver.options.idea', '💡 I have a new Ayurveda idea'),
      guidance: 'Run our 8-point Smart Check My Idea tool to identify potential IP categories, research evidence, and official authorities to check.',
      actionText: 'Run Check My Idea',
      action: () => {
        if (onOpenCheckIdea) onOpenCheckIdea();
        else openChatWithPrompt('Check my Ayurvedic idea for Section 3 eligibility.');
      }
    },
    {
      key: 'paper',
      icon: FileText,
      title: t('solver.options.paper', '📄 I have a research paper'),
      guidance: 'Upload your paper manuscript for OCR text extraction, Section 3 eligibility evaluation, and automatic statutory citation mapping.',
      actionText: 'Upload Document OCR',
      action: () => openChatWithPrompt('I want to analyze my research paper manuscript for patent citations.')
    },
    {
      key: 'formulation',
      icon: FlaskConical,
      title: t('solver.options.formulation', '🧪 I have an Ayurveda formulation'),
      guidance: 'Herbal mixtures are excluded under Section 3(p), but novel extraction processes may be patentable subject to National Biodiversity Authority (NBA) approval.',
      actionText: 'Test Section 3 Eligibility',
      action: () => openChatWithPrompt('Check Section 3(p) eligibility for an Ayurvedic polyherbal formulation.')
    },
    {
      key: 'brand',
      icon: Tag,
      title: t('solver.options.brand', '🏷️ I want to protect a brand'),
      guidance: 'Trademark protection for Ayurvedic products falls under Class 5 (Pharmaceuticals & Traditional Medicines) at Intellectual Property India (CGPDTM).',
      actionText: 'Trademark Guidance',
      action: () => openChatWithPrompt('How do I register a Trademark for my Ayurvedic brand under Class 5?')
    },
    {
      key: 'food',
      icon: Package,
      title: t('solver.options.food', '📦 I want to sell an Ayurveda/food product'),
      guidance: 'Commercial Ayurvedic food products must comply with FSSAI Ayurveda Aahara Regulations 2022 and Ministry of Ayush Drug Licensing.',
      actionText: 'FSSAI & Ayush Guidelines',
      action: () => openChatWithPrompt('What regulations apply to selling Ayurveda Aahara food products under FSSAI?')
    },
    {
      key: 'localProduct',
      icon: Wheat,
      title: t('solver.options.localProduct', '🌾 I have a local traditional product'),
      guidance: 'Regional agricultural or traditional craft products may qualify for Geographical Indication (GI Tag) protection under the GI Act 1999.',
      actionText: 'Geographical Indication Search',
      action: () => openChatWithPrompt('Can my local traditional product get a Geographical Indication (GI) tag?')
    },
    {
      key: 'evidence',
      icon: BookOpen,
      title: t('solver.options.evidence', '📚 I need research evidence'),
      guidance: 'Access over 40,000+ indexed Ayurvedic clinical trials, statutory central acts, and WIPO international PCT resources.',
      actionText: 'Search Research Evidence',
      action: () => setActivePage('research')
    },
    {
      key: 'rule',
      icon: Scale,
      title: t('solver.options.rule', '⚖️ I need to understand an IP rule'),
      guidance: 'Browse our codified IP Vault explaining Section 3(p), 3(d), 3(k), statutory fee waivers, and Form 18A expedited examination.',
      actionText: 'Open IP Vault',
      action: () => setActivePage('knowledge')
    },
    {
      key: 'authority',
      icon: Landmark,
      title: t('solver.options.authority', '🏛️ I need to find the correct authority'),
      guidance: 'Locate official government bodies: IPO (Patents), India Code (Acts), TKDL (Prior Art), Ayush (Regulations), FSSAI (Food), NBA (Biodiversity), WIPO (Global).',
      actionText: 'Find Official Authority',
      action: () => setActivePage('authorities')
    },
    {
      key: 'search',
      icon: Search,
      title: t('solver.options.search', '🔎 I want to search official information'),
      guidance: 'Search our 9 official government portals, trusted gazettes, and official research databases with clear "Why this source?" justifications.',
      actionText: 'Search Official Directory',
      action: () => setActivePage('directory')
    }
  ];

  const currentScenario = scenarios.find((s) => s.key === selectedKey);

  return (
    <section className="bg-white border-2 border-emerald-200 rounded-3xl p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow">
            <HelpCircle className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <h2 className="text-lg font-black text-emerald-950">
              💡 {t('solver.title', 'What are you trying to do?')}
            </h2>
            <p className="text-xs text-slate-600 font-semibold">
              {t('solver.subtitle')}
            </p>
          </div>
        </div>
        <span className="bg-emerald-100 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
          11 Guided Pathways
        </span>
      </div>

      {/* Grid of 11 Scenarios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {scenarios.map((sc) => {
          const IconComp = sc.icon;
          const isSelected = selectedKey === sc.key;

          return (
            <button
              key={sc.key}
              onClick={() => setSelectedKey(isSelected ? null : sc.key)}
              className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex items-center space-x-3 ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-md'
                  : 'bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-950 border-emerald-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-emerald-800 text-emerald-200' : 'bg-white text-emerald-700 border border-emerald-200'}`}>
                <IconComp className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold leading-tight flex-1">{sc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Expanded Scenario Guidance Card */}
      {currentScenario && (
        <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl space-y-3 animate-fade-in text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Guided Pathway: {currentScenario.title}
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-950 border border-emerald-300 px-2 py-0.5 rounded font-bold">
              Step-by-Step Statutory Advice
            </span>
          </div>

          <p className="text-slate-800 leading-relaxed font-medium">
            {currentScenario.guidance}
          </p>

          <div className="pt-2 flex items-center justify-end">
            <button
              onClick={currentScenario.action}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow cursor-pointer text-xs"
            >
              <span>{currentScenario.actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
