import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Upload, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { MOCK_CITATIONS } from '../data/mockKnowledgeBase';

export const DocumentUploadModal: React.FC = () => {
  const { isDocumentUploadOpen, setIsDocumentUploadOpen, openChatWithPrompt, setActiveCitation } = useApp();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [ocrResult, setOcrResult] = useState<{
    extractedText: string;
    topic: string;
    summary: string;
    citations: typeof MOCK_CITATIONS.sec3p[];
  } | null>(null);

  if (!isDocumentUploadOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      processMockOcr(file);
    }
  };

  const processMockOcr = (file: File) => {
    setIsProcessing(true);
    setOcrResult(null);

    setTimeout(() => {
      const fileName = file.name.toLowerCase();

      if (fileName.includes('ayurveda') || fileName.includes('herb') || fileName.includes('plant')) {
        setOcrResult({
          extractedText:
            '[OCR EXTRACTED TEXT] Traditional polyherbal formulation containing Curcuma longa (turmeric) and Azadirachta indica (neem) extracted via aqueous-ethanolic reflux methodology for anti-inflammatory topical application.',
          topic: 'Ayurvedic Herbal Extraction & Section 3(p) TK Screening',
          summary:
            'The document specifies an Ayurvedic botanical formulation. While turmeric and neem mixtures are barred under Section 3(p) as traditional knowledge, the specific aqueous-ethanolic reflux extraction process may be evaluated for process patentability subject to National Biodiversity Authority (NBA) clearance.',
          citations: [MOCK_CITATIONS.sec3p, MOCK_CITATIONS.sec3d],
        });
      } else if (fileName.includes('patent') || fileName.includes('claim')) {
        setOcrResult({
          extractedText:
            '[OCR EXTRACTED TEXT] Claim 1: A system comprising a hardware microcontroller coupled to an artificial intelligence neural network configured to process real-time sensor diagnostic data.',
          topic: 'Software / AI Technical Effect & Section 3(k) Screening',
          summary:
            'The uploaded patent specification describes an AI neural network coupled with physical microcontroller hardware. This hardware synergy satisfies the CRI Technical Effect test under Section 3(k).',
          citations: [MOCK_CITATIONS.sec3k],
        });
      } else {
        setOcrResult({
          extractedText:
            '[OCR EXTRACTED TEXT] Research specification detailing novel botanical extraction parameters, active constituent isolation, and preliminary bio-assay efficacy testing.',
          topic: 'General Invention & Section 3 Screening',
          summary:
            'The uploaded document contains technical research data. We recommend conducting a Section 3 Patentability Test and cross-referencing prior art against the CSIR-TKDL database.',
          citations: [MOCK_CITATIONS.sec3p],
        });
      }

      setIsProcessing(false);
    }, 1500);
  };

  const resetModal = () => {
    setSelectedFile(null);
    setOcrResult(null);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white border border-emerald-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 text-slate-800 relative overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-950">📄 Upload Document & OCR Extraction</h3>
              <p className="text-xs text-emerald-700 font-medium">Extract text, identify IP topics & retrieve statutory evidence</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsDocumentUploadOpen(false);
              resetModal();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-emerald-50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* File Upload Zone */}
        {!ocrResult && !isProcessing && (
          <div className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-8 text-center bg-emerald-50/40 transition space-y-3 cursor-pointer relative">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.txt"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Drag & drop your document here</h4>
              <p className="text-xs text-slate-500 mt-1">Supports PDF, PNG, JPG, or TXT research manuscripts & patent drafts</p>
            </div>
            <span className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition">
              Browse Files
            </span>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="p-8 text-center space-y-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <Sparkles className="w-8 h-8 text-emerald-700 animate-spin mx-auto" />
            <h4 className="font-bold text-emerald-950 text-sm">Running OCR Text Extraction & RAG Retrieval...</h4>
            <p className="text-xs text-emerald-800">Processing {selectedFile?.name} against IP India & TKDL corpus...</p>
          </div>
        )}

        {/* OCR Result View */}
        {ocrResult && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-extrabold text-emerald-900 tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> OCR Text Extraction Output
              </span>
              <p className="font-mono text-slate-700 bg-white p-2.5 rounded-lg border border-emerald-200 text-[11px] italic leading-relaxed">
                {ocrResult.extractedText}
              </p>
            </div>

            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-2">
              <span className="text-[10px] uppercase font-extrabold text-emerald-800 tracking-wider block">
                Detected Topic: {ocrResult.topic}
              </span>
              <p className="text-slate-800 leading-relaxed font-medium">{ocrResult.summary}</p>

              <div className="pt-2 border-t border-emerald-200 flex items-center justify-between">
                <span className="text-emerald-900 font-bold">Retrieved Statutory Citations:</span>
                <div className="flex gap-1.5">
                  {ocrResult.citations.map((cit) => (
                    <button
                      key={cit.id}
                      onClick={() => {
                        setIsDocumentUploadOpen(false);
                        setActiveCitation(cit);
                      }}
                      className="bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer"
                    >
                      {cit.section}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={resetModal}
                className="text-slate-600 hover:text-slate-900 font-bold text-xs underline cursor-pointer"
              >
                Upload Another File
              </button>

              <button
                onClick={() => {
                  setIsDocumentUploadOpen(false);
                  openChatWithPrompt(`Analyze this extracted document text: ${ocrResult.summary}`);
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow"
              >
                <span>Ask ATREYA About Document</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
