import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import type { ChatMessage, EvidenceLevel } from '../types/ip';
import { getMockAIResponse, DEMO_QUESTIONS } from '../data/mockChatResponses';
import { VoiceController } from '../components/VoiceController';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Download,
  Trash2,
  Copy,
  Check,
  Zap,
  ExternalLink,
  Info,
  Scale,
  Filter,
  Volume2,
  Layers,
  Leaf,
  BookmarkPlus,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { chatPromptInput, setChatPromptInput, speakText, saveToVault, t } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Namaste! I am ATREYA, your Multilingual AI Assistant grounded in Indian Intellectual Property Laws, Ayurveda, and Traditional Knowledge.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'Overview',
      ragAnswer: {
        answer:
          'Welcome to ATREYA! I retrieve verified statutory provisions from the Patents Act 1970 (Section 3p), Trade Marks Act 1999, Biological Diversity Act 2002, and CSIR-TKDL repository.',
        simpleExplanation:
          'ATREYA helps you check if your Ayurvedic remedy or formulation has any issues under Indian patent laws or traditional knowledge rules.',
        realLifeExample:
          'For example: A raw paste of Turmeric and Neem is public traditional knowledge. But a novel temperature-controlled bio-extraction method may qualify for a process patent.',
        whyPoints: [
          'Grounded in official Indian IP laws and WIPO PCT international treaties.',
          'RAG Evidence Pipeline ensures answers cite official government sources.',
          'Provides clear distinction between unpatentable traditional knowledge and eligible process innovations.'
        ],
        relevantLaw: 'The Patents Act, 1970 (Sec 3p) & Biological Diversity Act, 2002',
        evidence:
          'CORPUS-IN-PAT-1970-SEC3P: Traditional knowledge or aggregations of known properties are statutorily excluded from patent grants.',
        sources: [
          {
            title: 'IP India Official Intellectual Property Portal',
            authority: 'Controller General of Patents, Designs & Trade Marks',
            url: 'https://ipindia.gov.in',
            whyThisSource: 'Apex central statutory authority for Indian patent grants under DPIIT.',
            sourceType: '1. Central Legislation & Statutory Authority'
          },
          {
            title: 'Traditional Knowledge Digital Library (TKDL)',
            authority: 'CSIR & Ministry of Ayush',
            url: 'https://www.tkdl.res.in',
            whyThisSource: 'Official prior art repository created by CSIR to thwart global biopiracy.',
            sourceType: '3. Official Prior Art Repository'
          }
        ],
        evidenceLevel: 'high',
        sourceHierarchyLevel: 1,
        sourceTypeLabel: 'Official Statutory Authority'
      },
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedMsgId, setSavedMsgId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  useEffect(() => {
    if (chatPromptInput) {
      handleSendMessage(chatPromptInput);
      setChatPromptInput('');
    }
  }, [chatPromptInput]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsGenerating(true);

    setTimeout(() => {
      const ragResult = getMockAIResponse(query);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: ragResult.ragAnswer.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: ragResult.ragAnswer.category,
        ragAnswer: {
          ...ragResult.ragAnswer,
          simpleExplanation: `Simplified: ${ragResult.ragAnswer.answer}`,
          realLifeExample: 'Practical Example: Ayurvedic practitioners extracted active botanical bio-compounds using specific pressure parameters.',
          sourceHierarchyLevel: 1,
          sourceTypeLabel: 'Official Government & Statutory Authority'
        },
        citations: ragResult.citations,
        officialSources: ragResult.officialSources,
        suggestedFollowups: ragResult.suggestedFollowups,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsGenerating(false);
    }, 1000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToVault = (msg: ChatMessage) => {
    saveToVault({
      title: msg.ragAnswer?.answer.substring(0, 50) || msg.text.substring(0, 50),
      type: 'question',
      language: 'en',
      notes: `Saved from AI Chat on ${msg.timestamp}`
    });
    setSavedMsgId(msg.id);
    setTimeout(() => setSavedMsgId(null), 2000);
  };

  const exportChat = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `atreya-chat-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const clearChat = () => {
    setMessages([messages[0]]);
  };

  const categories = [
    'All',
    'Patent',
    'Traditional Knowledge',
    'Ayurveda',
    'Trademark',
    'Copyright',
    'International IP',
    'AI & IP',
  ];

  const filteredDemoQuestions = DEMO_QUESTIONS.filter(
    (q) => selectedCategoryFilter === 'All' || q.category === selectedCategoryFilter
  );

  const renderEvidenceBadge = (level?: EvidenceLevel) => {
    switch (level) {
      case 'high':
        return (
          <span className="bg-emerald-100 text-emerald-950 font-black border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 shadow-xs">
            <Check className="w-3 h-3 text-emerald-700" /> High Statutory Grounding
          </span>
        );
      case 'moderate':
        return (
          <span className="bg-emerald-100 text-emerald-950 font-black border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1">
            <Info className="w-3 h-3 text-emerald-700" /> Moderate Evidence
          </span>
        );
      default:
        return (
          <span className="bg-emerald-100 text-emerald-950 font-black border border-emerald-300 px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1">
            <Info className="w-3 h-3 text-emerald-700" /> {t('localBridge.verificationStatus', 'Requires Verification')}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] max-w-5xl mx-auto space-y-3 animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl shrink-0 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow">
            <Leaf className="w-4.5 h-4.5 text-emerald-200" />
          </div>
          <div>
            <h2 className="text-xs font-black text-emerald-950 flex items-center gap-2">
              <span>ATREYA RAG Grounded Engine</span>
              <span className="bg-emerald-200 text-emerald-950 text-[10px] px-2 py-0.5 rounded-full border border-emerald-300 font-bold">
                Source Grounded
              </span>
            </h2>
            <p className="text-[10px] text-slate-600 font-semibold">Patents • Ayurveda • TKDL Archive • WIPO • FSSAI</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <VoiceController />

          <button
            onClick={exportChat}
            className="flex items-center space-x-1 text-xs text-slate-700 hover:text-emerald-900 bg-white hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition cursor-pointer font-bold shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('buttons.exportChat', 'Export')}</span>
          </button>

          <button
            onClick={clearChat}
            className="flex items-center space-x-1 text-xs text-emerald-900 hover:text-emerald-950 bg-white hover:bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300 transition cursor-pointer font-bold shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t('buttons.clearChat', 'Clear Chat')}</span>
          </button>
        </div>
      </div>

      {/* RAG Pipeline Bar */}
      <div className="bg-white border border-emerald-200 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-600 flex items-center justify-between shrink-0 overflow-x-auto scrollbar-none shadow-xs">
        <span className="text-emerald-950 flex items-center gap-1 shrink-0 font-extrabold">
          <Layers className="w-3 h-3 text-emerald-700" /> ATREYA Pipeline:
        </span>
        <div className="flex items-center space-x-1.5 text-slate-600 shrink-0">
          <span className="bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-900">Question</span>
          <span>→</span>
          <span className="bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-900">Intent & Jurisdiction</span>
          <span>→</span>
          <span className="bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-900">Trusted Corpus</span>
          <span>→</span>
          <span className="bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-900">Citation Check</span>
          <span>→</span>
          <span className="bg-emerald-800 text-white px-1.5 py-0.5 rounded font-bold">Grounded Answer</span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-emerald-200">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 text-xs ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-1 shadow">
                <Bot className="w-4.5 h-4.5 text-emerald-200" />
              </div>
            )}

            <div
              className={`max-w-3xl rounded-2xl p-5 shadow-sm space-y-3 relative transition ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white rounded-tr-none shadow font-semibold'
                  : 'bg-white border border-emerald-200 text-slate-800 rounded-tl-none'
              }`}
            >
              {/* Header Row */}
              <div className="flex items-center justify-between border-b border-emerald-100 pb-2 text-[10px] text-slate-500">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-slate-800">
                    {msg.sender === 'user' ? 'You' : 'ATREYA Engine'}
                  </span>
                  {msg.sender === 'assistant' && msg.ragAnswer && renderEvidenceBadge(msg.ragAnswer.evidenceLevel)}
                </div>
                <span>{msg.timestamp}</span>
              </div>

              {/* REQUIREMENT 13: EVIDENCE-FIRST ANSWER STRUCTURE */}
              {msg.sender === 'assistant' && msg.ragAnswer ? (
                <div className="space-y-3 font-sans text-xs">
                  {/* 1. ANSWER */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block flex items-center gap-1">
                      <span>🟢 ANSWER</span>
                    </span>
                    <p className="text-slate-900 font-bold leading-relaxed text-sm bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                      {msg.ragAnswer.answer}
                    </p>
                  </div>

                  {/* 2. IN SIMPLE WORDS */}
                  {msg.ragAnswer.simpleExplanation && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block flex items-center gap-1">
                        <span>📖 IN SIMPLE WORDS</span>
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs">
                        {msg.ragAnswer.simpleExplanation}
                      </p>
                    </div>
                  )}

                  {/* 3. REAL-LIFE EXAMPLE */}
                  {msg.ragAnswer.realLifeExample && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block flex items-center gap-1">
                        <span>🔎 REAL-LIFE EXAMPLE</span>
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                        {msg.ragAnswer.realLifeExample}
                      </p>
                    </div>
                  )}

                  {/* 4. WHAT THE LAW SAYS */}
                  {msg.ragAnswer.relevantLaw && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block flex items-center gap-1">
                        <span>⚖️ WHAT THE LAW SAYS</span>
                      </span>
                      <div className="p-3 bg-emerald-100/80 border border-emerald-300 rounded-xl text-emerald-950 font-bold text-xs flex items-center gap-2">
                        <Scale className="w-4 h-4 text-emerald-800 shrink-0" />
                        <span>{msg.ragAnswer.relevantLaw}</span>
                      </div>
                    </div>
                  )}

                  {/* STATUTORY REASONING / WHY POINTS */}
                  {msg.ragAnswer.whyPoints && msg.ragAnswer.whyPoints.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block">
                        STATUTORY REASONING
                      </span>
                      <ul className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        {msg.ragAnswer.whyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start space-x-2 text-slate-700 font-medium">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 5. WHAT IS RIGHT / GOOD PRACTICE */}
                  {msg.ragAnswer.whatIsRight && msg.ragAnswer.whatIsRight.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block flex items-center gap-1">
                        <span>✅ WHAT IS RIGHT / GOOD PRACTICE</span>
                      </span>
                      <ul className="space-y-1.5 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                        {msg.ragAnswer.whatIsRight.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-slate-800 font-medium text-[11px]">
                            <span className="text-emerald-700 font-extrabold shrink-0">✅</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 6. WHAT IS NOT RIGHT / WHAT TO AVOID */}
                  {msg.ragAnswer.whatIsWrong && msg.ragAnswer.whatIsWrong.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-950 tracking-wider block flex items-center gap-1">
                        <span>⚠️ WHAT IS NOT RIGHT / WHAT TO AVOID</span>
                      </span>
                      <ul className="space-y-1.5 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                        {msg.ragAnswer.whatIsWrong.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-slate-800 font-medium text-[11px]">
                            <span className="text-emerald-700 font-extrabold shrink-0">❌</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 7. STEP-BY-STEP PROCEDURAL GUIDE */}
                  {msg.ragAnswer.steps && msg.ragAnswer.steps.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block flex items-center gap-1">
                        <span>📋 STEP-BY-STEP PROCEDURE</span>
                      </span>
                      <ol className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                        {msg.ragAnswer.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start space-x-2.5 text-slate-800 font-medium text-xs">
                            <span className="bg-emerald-700 text-white font-extrabold px-2 py-0.5 rounded-md text-[10px] shrink-0">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* 8. EVIDENCE CHUNK */}
                  {msg.ragAnswer.evidence && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                        STATUTORY EVIDENCE CHUNK
                      </span>
                      <div className="p-3 bg-emerald-50 border border-emerald-200 text-slate-800 rounded-xl font-mono text-[11px] leading-relaxed italic">
                        "{msg.ragAnswer.evidence}"
                      </div>
                    </div>
                  )}

                  {/* 9. OFFICIAL SOURCES */}
                  {msg.ragAnswer.sources && msg.ragAnswer.sources.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-emerald-100">
                      <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block flex items-center gap-1">
                        <span>🏛️ OFFICIAL GOVERNMENT SOURCES</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {msg.ragAnswer.sources.map((source, sIdx) => (
                          <div key={sIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                            <div className="font-bold text-slate-900">{source.title || source.name}</div>
                            <div className="text-[10px] text-slate-500 font-semibold">{source.authority || source.organization}</div>
                            {source.whyThisSource && (
                              <p className="text-[10px] text-slate-700 italic border-t border-slate-200 pt-1 mt-1">
                                <strong>Why this source?</strong> {source.whyThisSource}
                              </p>
                            )}
                            <a
                              href={source.url || source.officialUrl || 'https://ipindia.gov.in'}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center space-x-1 text-[11px] text-emerald-800 font-bold hover:underline pt-1"
                            >
                              <span>{t('buttons.openOfficialSource', 'Open Official Source')}</span>
                              <ExternalLink className="w-3 h-3 text-emerald-700" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 10. RESEARCH / REFERENCE BOOKS */}
                  {msg.ragAnswer.researchReferences && msg.ragAnswer.researchReferences.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-emerald-100">
                      <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block flex items-center gap-1">
                        <span>📚 RESEARCH EVIDENCE & REFERENCES</span>
                      </span>
                      <div className="space-y-2">
                        {msg.ragAnswer.researchReferences.map((ref, rIdx) => (
                          <div key={rIdx} className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
                            <div className="font-extrabold text-emerald-950">{ref.title}</div>
                            {ref.authors && <div className="text-[11px] text-slate-700"><strong>Authors:</strong> {ref.authors}</div>}
                            {ref.journalOrPublisher && <div className="text-[11px] text-slate-700"><strong>Source:</strong> {ref.journalOrPublisher} ({ref.year})</div>}
                            {ref.doiOrIsbn && <div className="text-[10px] font-mono text-slate-500"><strong>DOI/ISBN:</strong> {ref.doiOrIsbn}</div>}
                            {ref.findings && <p className="text-[11px] text-slate-800 italic pt-1">{ref.findings}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 11. WHAT TO DO NEXT */}
                  {msg.ragAnswer.nextSteps && msg.ragAnswer.nextSteps.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-emerald-100">
                      <span className="text-[10px] font-black uppercase text-emerald-900 tracking-wider block flex items-center gap-1">
                        <span>➡️ WHAT TO DO NEXT</span>
                      </span>
                      <ul className="space-y-1.5 bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-xs">
                        {msg.ragAnswer.nextSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-slate-800 font-medium">
                            <span className="text-emerald-700 font-bold">👉</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 12. IMPORTANT UNCERTAINTY NOTICE */}
                  {msg.ragAnswer.importantNotice && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1 text-xs">
                      <span className="text-[10px] font-black uppercase text-emerald-900 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-emerald-700" />
                        IMPORTANT LIMITATION & UNCERTAINTY:
                      </span>
                      <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                        {msg.ragAnswer.importantNotice}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="whitespace-pre-wrap leading-relaxed font-medium">{msg.text}</div>
              )}

              {/* Action Buttons: Save to Vault, Listen, Translate */}
              {msg.sender === 'assistant' && (
                <div className="pt-2 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => speakText(msg.text)}
                      className="flex items-center space-x-1 text-emerald-800 hover:text-emerald-950 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{t('buttons.listen', 'Listen')}</span>
                    </button>

                    <button
                      onClick={() => handleSaveToVault(msg)}
                      className="flex items-center space-x-1 text-emerald-800 hover:text-emerald-950 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 cursor-pointer"
                    >
                      {savedMsgId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                      <span>{savedMsgId === msg.id ? 'Saved!' : t('buttons.saveToVault', 'Save to IP Vault')}</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    ATREYA Grounded Engine
                  </span>
                </div>
              )}

              {/* REQUIREMENT 21: LEGAL DISCLAIMER ON EVERY RESPONSE */}
              {msg.sender === 'assistant' && (
                <div className="text-[10px] text-slate-600 font-semibold italic flex items-center gap-1 pt-2 border-t border-slate-100">
                  <Info className="w-3 h-3 text-emerald-700 shrink-0" />
                  <span>{t('app.disclaimer')}</span>
                </div>
              )}

              {/* Copy Action */}
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => copyToClipboard(msg.text, msg.id)}
                  className="p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  title="Copy response"
                >
                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 shrink-0 mt-1">
                <User className="w-4.5 h-4.5" />
              </div>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center space-x-3 text-xs text-slate-600">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-emerald-200 px-4 py-2.5 rounded-2xl flex items-center space-x-2 shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-700 animate-spin" />
              <span className="font-bold text-slate-800">Retrieving Statutory Evidence from IP India & CSIR-TKDL...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar Section */}
      <div className="bg-white border border-emerald-200 p-2 rounded-2xl shrink-0 shadow-sm flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask any question on Section 3(p), TKDL, Ayurveda extraction patents, AI algorithms, or Trademarks..."
          className="flex-1 bg-transparent px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isGenerating}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
            inputQuery.trim() && !isGenerating
              ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Suggested Questions */}
      <div className="bg-white border border-emerald-200 p-3 rounded-2xl space-y-2.5 shrink-0 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-2">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-emerald-700" />
            <span className="text-xs font-extrabold text-emerald-950">Suggested Questions</span>
            <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">(Click to test AI RAG response)</span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none max-w-full">
            <Filter className="w-3 h-3 text-emerald-700 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition cursor-pointer whitespace-nowrap ${
                  selectedCategoryFilter === cat
                    ? 'bg-emerald-700 text-white shadow'
                    : 'bg-emerald-50 text-slate-700 hover:text-emerald-950 border border-emerald-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Question Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-emerald-200">
          {filteredDemoQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => handleSendMessage(q.question)}
              className="p-2.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer text-left space-y-1 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white text-emerald-900 border border-emerald-300">
                  {q.category}
                </span>
                <Sparkles className="w-3 h-3 text-emerald-600 group-hover:text-emerald-700 transition" />
              </div>
              <p className="text-xs font-bold text-emerald-950 group-hover:text-emerald-800 transition line-clamp-2">
                {q.question}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
