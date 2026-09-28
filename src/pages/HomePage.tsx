import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VoiceController } from '../components/VoiceController';
import { ProblemSolverSection } from '../components/ProblemSolverSection';
import {
  Bot,
  BookOpen,
  Sparkles,
  Landmark,
  Scale,
  Zap,
  Leaf,
  Upload,
  ShieldCheck,
  AlertTriangle,
  Lightbulb,
  MapPin,
  Database,
  Mic,
  MessageSquare,
  HelpCircle,
  Image as ImageIcon,
} from 'lucide-react';

export const HomePage: React.FC<{ onOpenCheckIdea?: () => void }> = ({ onOpenCheckIdea }) => {
  const {
    setActivePage,
    setIsEligibilityWizardOpen,
    setIsDocumentUploadOpen,
    openChatWithPrompt,
    speakText,
    t,
  } = useApp();

  // Local Knowledge Bridge State
  const [localTkInput, setLocalTkInput] = useState('');
  const [bridgeResult, setBridgeResult] = useState<any | null>(null);

  const handleBridgeAction = (type: 'speak' | 'type' | 'explain' | 'image') => {
    if (type === 'speak') {
      speakText(
        localTkInput ||
          'Describe your traditional knowledge or herbal formulation in your local language to verify Section 3(p) and TKDL prior art evidence.'
      );
      return;
    }

    if (type === 'image') {
      setIsDocumentUploadOpen(true);
      return;
    }

    const inputVal = localTkInput.trim() || 'My village uses Turmeric and Neem paste formulation for joint inflammation';

    if (type === 'type') {
      openChatWithPrompt(`Analyze local traditional knowledge: "${inputVal}" under Section 3(p) and TKDL database.`);
    } else if (type === 'explain') {
      setBridgeResult({
        resourceName: 'Curcuma longa (Turmeric) & Azadirachta indica (Neem)',
        traditionalPractice: 'Topical application of aqueous-ethanolic botanical paste for joint inflammation.',
        localDescription: inputVal,
        region: 'Rural Community Knowledge',
        preparationProcess: 'Boiling and grinding fresh rhizome and leaves with water/oil base.',
        historicalContext: 'Recorded in classical treatises (Charaka Samhita & Ayurveda Pharmacopoeia).',
        evidenceFound: 'CSIR-TKDL Database Archive Entry TKDL-IN-AYU-4091.',
        relatedResearch: 'Peer-reviewed clinical studies indexed in AYUSH Research Portal.',
        ipRelevance: 'Raw traditional mixture is non-patentable under Section 3(p) of the Patents Act 1970.',
        regulatoryRelevance: 'Commercial use requires Section 6 clearance from National Biodiversity Authority (NBA).',
        verificationStatus: 'Requires Verification',
        recommendedNextStep: 'Verify whether your specific extraction method involves a novel technical effect or process enhancement.'
      });
    }
  };

  return (
    <div className="space-y-10 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* Clean White + Green Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-10 px-6 rounded-3xl bg-emerald-50/90 border border-emerald-200 shadow-xs text-slate-800">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          {/* Top Badge */}
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-950 border border-emerald-300 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ayurveda, Traditional Knowledge & Intellectual Property AI Assistant</span>
          </div>

          {/* Title & Tagline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-emerald-950 tracking-tight leading-tight">
            {t('hero.title')}
          </h1>

          <p className="text-xl sm:text-2xl font-black text-emerald-800 tracking-tight max-w-3xl mx-auto">
            "{t('hero.tagline')}"
          </p>

          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed font-semibold">
            {t('hero.subtitle')}
          </p>

          {/* Action Buttons Grid */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
            <button
              onClick={() => setActivePage('chat')}
              className="p-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-2xl shadow transition cursor-pointer flex flex-col items-center space-y-1.5 text-center"
            >
              <Bot className="w-5 h-5 text-emerald-200" />
              <span>{t('buttons.askQuestion')}</span>
            </button>

            <div className="p-2 bg-emerald-100/80 rounded-2xl border border-emerald-300 flex flex-col items-center justify-center">
              <VoiceController />
            </div>

            <button
              onClick={() => setIsDocumentUploadOpen(true)}
              className="p-3 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs rounded-2xl border border-emerald-300 shadow-xs transition cursor-pointer flex flex-col items-center space-y-1.5 text-center"
            >
              <Upload className="w-5 h-5 text-emerald-700" />
              <span>{t('buttons.uploadDocument')}</span>
            </button>

            <button
              onClick={() => setIsEligibilityWizardOpen(true)}
              className="p-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs rounded-2xl border border-emerald-300 transition cursor-pointer flex flex-col items-center space-y-1.5 text-center"
            >
              <Scale className="w-5 h-5 text-emerald-700" />
              <span>{t('buttons.checkSection3p')}</span>
            </button>

            <button
              onClick={() => setActivePage('research')}
              className="p-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-2xl shadow transition cursor-pointer flex flex-col items-center space-y-1.5 text-center"
            >
              <BookOpen className="w-5 h-5 text-emerald-200" />
              <span>📚 Research Evidence</span>
            </button>

            <button
              onClick={() => setActivePage('directory')}
              className="p-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs rounded-2xl shadow transition cursor-pointer flex flex-col items-center space-y-1.5 text-center"
            >
              <Landmark className="w-5 h-5 text-emerald-200" />
              <span>🏛️ Official Resources</span>
            </button>
          </div>
        </div>
      </section>

      {/* REQUIREMENT 18: UNIQUE ATREYA DASHBOARD - WHAT DO YOU NEED HELP WITH? */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
          <div>
            <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              {t('dashboard.title', 'WHAT DO YOU NEED HELP WITH?')}
            </h2>
            <p className="text-xs text-slate-600 font-semibold">{t('dashboard.subtitle')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
          <button
            onClick={() => setActivePage('tk')}
            className="p-3.5 bg-white hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition text-center space-y-1.5 cursor-pointer shadow-xs flex flex-col items-center justify-center"
          >
            <Leaf className="w-6 h-6 text-emerald-700" />
            <span className="text-xs font-extrabold text-emerald-950 leading-tight">{t('dashboard.tkCard')}</span>
          </button>

          <button
            onClick={() => {
              if (onOpenCheckIdea) onOpenCheckIdea();
              else openChatWithPrompt('Check my Ayurvedic idea for IP eligibility.');
            }}
            className="p-3.5 bg-white hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition text-center space-y-1.5 cursor-pointer shadow-xs flex flex-col items-center justify-center"
          >
            <Lightbulb className="w-6 h-6 text-emerald-600" />
            <span className="text-xs font-extrabold text-emerald-950 leading-tight">{t('dashboard.ideaCard')}</span>
          </button>

          <button
            onClick={() => setActivePage('research')}
            className="p-3.5 bg-white hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition text-center space-y-1.5 cursor-pointer shadow-xs flex flex-col items-center justify-center"
          >
            <BookOpen className="w-6 h-6 text-emerald-700" />
            <span className="text-xs font-extrabold text-emerald-950 leading-tight">{t('dashboard.researchCard')}</span>
          </button>

          <button
            onClick={() => setIsDocumentUploadOpen(true)}
            className="p-3.5 bg-white hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition text-center space-y-1.5 cursor-pointer shadow-xs flex flex-col items-center justify-center"
          >
            <Upload className="w-6 h-6 text-emerald-700" />
            <span className="text-xs font-extrabold text-emerald-950 leading-tight">{t('dashboard.docCard')}</span>
          </button>

          <button
            onClick={() => setActivePage('knowledge')}
            className="p-3.5 bg-white hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition text-center space-y-1.5 cursor-pointer shadow-xs flex flex-col items-center justify-center"
          >
            <Scale className="w-6 h-6 text-emerald-700" />
            <span className="text-xs font-extrabold text-emerald-950 leading-tight">{t('dashboard.ruleCard')}</span>
          </button>

          <button
            onClick={() => setActivePage('authorities')}
            className="p-3.5 bg-white hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition text-center space-y-1.5 cursor-pointer shadow-xs flex flex-col items-center justify-center"
          >
            <MapPin className="w-6 h-6 text-emerald-700" />
            <span className="text-xs font-extrabold text-emerald-950 leading-tight">{t('dashboard.authorityCard')}</span>
          </button>

          <button
            onClick={() => setActivePage('directory')}
            className="p-3.5 bg-white hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition text-center space-y-1.5 cursor-pointer shadow-xs flex flex-col items-center justify-center"
          >
            <Landmark className="w-6 h-6 text-emerald-700" />
            <span className="text-xs font-extrabold text-emerald-950 leading-tight">{t('dashboard.sourceCard')}</span>
          </button>

          <button
            onClick={() => openChatWithPrompt('Speak in my local language to search traditional knowledge evidence.')}
            className="p-3.5 bg-white hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition text-center space-y-1.5 cursor-pointer shadow-xs flex flex-col items-center justify-center"
          >
            <Mic className="w-6 h-6 text-emerald-700" />
            <span className="text-xs font-extrabold text-emerald-950 leading-tight">{t('dashboard.speakCard')}</span>
          </button>

          <button
            onClick={() => setActivePage('knowledge')}
            className="p-3.5 bg-white hover:bg-emerald-100/70 border border-emerald-200 rounded-2xl transition text-center space-y-1.5 cursor-pointer shadow-xs flex flex-col items-center justify-center"
          >
            <Database className="w-6 h-6 text-emerald-700" />
            <span className="text-xs font-extrabold text-emerald-950 leading-tight">{t('dashboard.vaultCard')}</span>
          </button>
        </div>
      </section>

      {/* REQUIREMENT 26: OFFICIAL LEGAL & GOVERNMENT SOURCES CARD */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-emerald-950 text-white p-6 sm:p-7 rounded-3xl shadow-lg border border-emerald-700/60 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/80 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-800 rounded-2xl text-emerald-200 border border-emerald-600 shadow-inner">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-200 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700 inline-block mb-0.5">
                🏛️ STATUTORY LEGAL & GOVERNMENT KNOWLEDGE
              </span>
              <h3 className="text-xl font-black text-white">
                OFFICIAL LEGAL & GOVERNMENT SOURCES
              </h3>
            </div>
          </div>
          <button
            onClick={() => setActivePage('directory')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow-md flex items-center space-x-1.5 border border-emerald-500"
          >
            <span>Explore All Sources →</span>
          </button>
        </div>

        <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed">
          Explore verified government laws, authorities, research institutions and official resources across India Code, IP India, TKDL, Ministry of Ayush, CCRAS, FSSAI, National Biodiversity Authority, and WIPO.
        </p>

        {/* Action Quick Buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => setActivePage('directory')}
            className="px-3 py-1.5 bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs border border-emerald-600 transition cursor-pointer flex items-center space-x-1"
          >
            <span>📜 EXPLORE LAWS</span>
          </button>
          <button
            onClick={() => setActivePage('directory')}
            className="px-3 py-1.5 bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs border border-emerald-600 transition cursor-pointer flex items-center space-x-1"
          >
            <span>🏛️ GOVERNMENT SOURCES</span>
          </button>
          <button
            onClick={() => setActivePage('tk')}
            className="px-3 py-1.5 bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs border border-emerald-600 transition cursor-pointer flex items-center space-x-1"
          >
            <span>🌿 TRADITIONAL KNOWLEDGE</span>
          </button>
          <button
            onClick={() => setActivePage('research')}
            className="px-3 py-1.5 bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs border border-emerald-600 transition cursor-pointer flex items-center space-x-1"
          >
            <span>📚 AYURVEDA RESEARCH</span>
          </button>
          <button
            onClick={() => setActivePage('directory')}
            className="px-3 py-1.5 bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs border border-emerald-600 transition cursor-pointer flex items-center space-x-1"
          >
            <span>⚖️ IP RIGHTS</span>
          </button>
        </div>
      </section>

      {/* REQUIREMENT 5: REAL-LIFE PROBLEM SOLVER - WHAT ARE YOU TRYING TO DO? */}
      <ProblemSolverSection onOpenCheckIdea={onOpenCheckIdea} />

      {/* REQUIREMENT 4: UNIQUE ATREYA FEATURE CARD - LOCAL KNOWLEDGE BRIDGE WITH 12-POINT OUTPUT */}
      <section className="bg-white border-2 border-emerald-300 rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow">
              <Leaf className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <span>🌿 {t('localBridge.title')}</span>
              </h2>
              <p className="text-xs text-slate-600 font-semibold">
                {t('localBridge.subtitle')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t('localBridge.verificationStatus')}</span>
            </span>
          </div>
        </div>

        {/* Interactive Input & Action Bar */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              value={localTkInput}
              onChange={(e) => setLocalTkInput(e.target.value)}
              placeholder={t('localBridge.placeholder')}
              className="w-full bg-emerald-50/50 hover:bg-white focus:bg-white border border-emerald-200 focus:border-emerald-600 rounded-2xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none min-h-[75px] font-medium transition"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleBridgeAction('speak')}
                className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 rounded-xl text-xs font-bold border border-emerald-300 transition cursor-pointer flex items-center space-x-1.5"
              >
                <Mic className="w-4 h-4 text-emerald-700" />
                <span>{t('buttons.speak')}</span>
              </button>

              <button
                onClick={() => handleBridgeAction('type')}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition cursor-pointer flex items-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>{t('buttons.type')}</span>
              </button>

              <button
                onClick={() => handleBridgeAction('explain')}
                className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 rounded-xl text-xs font-bold border border-emerald-300 transition cursor-pointer flex items-center space-x-1.5"
              >
                <HelpCircle className="w-4 h-4 text-emerald-700" />
                <span>{t('buttons.explainSimply')}</span>
              </button>

              <button
                onClick={() => handleBridgeAction('image')}
                className="px-4 py-2 bg-white hover:bg-emerald-50 text-slate-800 rounded-xl text-xs font-bold border border-slate-300 transition cursor-pointer flex items-center space-x-1.5"
              >
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <span>Upload Image</span>
              </button>
            </div>

            <span className="text-[11px] text-slate-500 font-semibold italic">
              Multilingual NLP • Section 3(p) • CSIR-TKDL
            </span>
          </div>

          {/* 12-Point Structured Output */}
          {bridgeResult && (
            <div className="mt-4 p-5 bg-emerald-50/80 border border-emerald-300 rounded-2xl space-y-4 animate-fade-in text-xs">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="font-black text-emerald-950 flex items-center gap-1.5 text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  Local Knowledge Bridge 12-Point Analysis
                </span>
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                  ℹ️ {bridgeResult.verificationStatus}
                </span>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-[11px] font-medium leading-relaxed">
                {t('localBridge.requiresVerificationNotice')}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">1. {t('localBridge.labels.resource')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.resourceName}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">2. {t('localBridge.labels.practice')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.traditionalPractice}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">3. {t('localBridge.labels.localDesc')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.localDescription}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">4. {t('localBridge.labels.region')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.region}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">5. {t('localBridge.labels.preparation')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.preparationProcess}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">6. {t('localBridge.labels.history')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.historicalContext}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">7. {t('localBridge.labels.evidence')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.evidenceFound}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">8. {t('localBridge.labels.research')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.relatedResearch}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">9. {t('localBridge.labels.ipRelevance')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.ipRelevance}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">10. {t('localBridge.labels.regulatory')}:</strong>
                  <span className="text-slate-700 font-medium">{bridgeResult.regulatoryRelevance}</span>
                </div>

                <div className="p-3 bg-emerald-100/80 rounded-xl border border-emerald-300">
                  <strong className="text-emerald-950 block text-[11px] mb-0.5">11. {t('localBridge.labels.status')}:</strong>
                  <span className="text-emerald-950 font-bold">{bridgeResult.verificationStatus}</span>
                </div>

                <div className="p-3 bg-emerald-800 text-white rounded-xl">
                  <strong className="text-emerald-200 block text-[11px] mb-0.5">12. {t('localBridge.labels.nextStep')}:</strong>
                  <span className="font-semibold text-[11px]">{bridgeResult.recommendedNextStep}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RESEARCH INSIGHT CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
          <h2 className="text-lg font-extrabold text-emerald-950 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-700" />
            Statutory Reference Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Section 3(p) */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 hover:border-emerald-400 transition space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 inline-block">
                📜 Section 3(p)
              </span>
              <h3 className="font-bold text-emerald-950 text-xs">Traditional Knowledge Screening</h3>
              
              <div className="space-y-1 text-[11px]">
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Official Source:</strong> Patents Act 1970
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Research Evidence:</strong> Bars patenting traditional remedies or aggregations of known plant properties.
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Why This Matters:</strong> Prevents biopiracy of ancient Indian remedies while allowing novel process inventions.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-bold">Patents Act 1970</span>
              <button onClick={() => openChatWithPrompt('What does Section 3(p) mean for traditional Ayurvedic knowledge?')} className="text-emerald-800 hover:underline font-bold cursor-pointer">
                Learn More →
              </button>
            </div>
          </div>

          {/* Card 2: TKDL */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 hover:border-emerald-400 transition space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 inline-block">
                🌿 TKDL
              </span>
              <h3 className="font-bold text-emerald-950 text-xs">Prior Art Defense Resource</h3>
              
              <div className="space-y-1 text-[11px]">
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Official Source:</strong> CSIR & Ministry of Ayush
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Research Evidence:</strong> 4.4+ lakh formulation entries translated into 5 international patent languages.
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Why This Matters:</strong> Over 300 erroneous biopirated patent claims thwarted globally.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-bold">CSIR / Ayush</span>
              <button onClick={() => setActivePage('tk')} className="text-emerald-800 hover:underline font-bold cursor-pointer">
                Learn More →
              </button>
            </div>
          </div>

          {/* Card 3: WIPO */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 hover:border-emerald-400 transition space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 inline-block">
                🌐 WIPO
              </span>
              <h3 className="font-bold text-emerald-950 text-xs">International IP Standards</h3>
              
              <div className="space-y-1 text-[11px]">
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Official Source:</strong> WIPO PCT System
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Research Evidence:</strong> Priority reservation across 157 PCT contracting states.
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Why This Matters:</strong> Protects Ayurvedic innovators expanding into global markets.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-bold">WIPO PCT</span>
              <button onClick={() => openChatWithPrompt('Does an Indian patent automatically protect me abroad?')} className="text-emerald-800 hover:underline font-bold cursor-pointer">
                Learn More →
              </button>
            </div>
          </div>

          {/* Card 4: IP India */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 hover:border-emerald-400 transition space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 inline-block">
                🇮🇳 IP India
              </span>
              <h3 className="font-bold text-emerald-950 text-xs">Indian Patent Office Portal</h3>
              
              <div className="space-y-1 text-[11px]">
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Official Source:</strong> CGPDTM Office
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Research Evidence:</strong> Form 1, Form 18A expedited track for startups.
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Why This Matters:</strong> Streamlines 80% fee concessions for DPIIT startups.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-bold">CGPDTM</span>
              <button onClick={() => setActivePage('directory')} className="text-emerald-800 hover:underline font-bold cursor-pointer">
                Learn More →
              </button>
            </div>
          </div>

          {/* Card 5: Research Evidence Library */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 hover:border-emerald-400 transition space-y-3 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300 inline-block">
                📚 Research Evidence
              </span>
              <h3 className="font-bold text-emerald-950 text-xs">Ayurveda & Traditional Knowledge Library</h3>
              
              <div className="space-y-1 text-[11px]">
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Official Source:</strong> CCRAS, Ayush Research Portal, Classical Treatises
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Research Evidence:</strong> Peer-reviewed papers, clinical trials, reference books.
                </p>
                <p className="text-slate-700 font-semibold">
                  <strong className="text-emerald-900">Why This Matters:</strong> Evidence-backed traditional knowledge verification.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-bold">ATREYA Library</span>
              <button onClick={() => setActivePage('research')} className="text-emerald-800 hover:underline font-bold cursor-pointer">
                Explore Library →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
