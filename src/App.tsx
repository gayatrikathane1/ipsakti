import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DisclaimerModal } from './components/DisclaimerModal';
import { CitationDrawer } from './components/CitationDrawer';
import { FeeCalculatorModal } from './components/FeeCalculatorModal';
import { EligibilityWizard } from './components/EligibilityWizard';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { CheckMyIdeaModal } from './components/CheckMyIdeaModal';
import { LocalWordModal } from './components/LocalWordModal';
import { AuthorityFinderSection } from './components/AuthorityFinderSection';
import { OfficialLegalSourcesSection } from './components/OfficialLegalSourcesSection';
import { VaultDrawer } from './components/VaultDrawer';

import { HomePage } from './pages/HomePage';
import { ChatPage } from './pages/ChatPage';
import { TraditionalKnowledgePage } from './pages/TraditionalKnowledgePage';
import { ResearchPage } from './pages/ResearchPage';
import { TrpPage } from './pages/TrpPage';
import { PrpPage } from './pages/PrpPage';

const MainContent: React.FC<{ onOpenCheckIdea: () => void }> = ({ onOpenCheckIdea }) => {
  const { activePage } = useApp();

  return (
    <main className="flex-1 container mx-auto px-4 py-6">
      {activePage === 'home' && <HomePage onOpenCheckIdea={onOpenCheckIdea} />}
      {activePage === 'chat' && <ChatPage />}
      {activePage === 'knowledge' && <VaultDrawer />}
      {activePage === 'tk' && <TraditionalKnowledgePage />}
      {activePage === 'research' && <ResearchPage />}
      {activePage === 'trp' && <TrpPage />}
      {activePage === 'prp' && <PrpPage />}
      {activePage === 'authorities' && <AuthorityFinderSection />}
      {activePage === 'directory' && <OfficialLegalSourcesSection />}
    </main>
  );
};

export const AppContent: React.FC = () => {
  const [isCheckIdeaOpen, setIsCheckIdeaOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased selection:bg-emerald-600 selection:text-white">
      <Navbar />
      <MainContent onOpenCheckIdea={() => setIsCheckIdeaOpen(true)} />
      <Footer />
      <DisclaimerModal />
      <CitationDrawer />
      <FeeCalculatorModal />
      <EligibilityWizard />
      <DocumentUploadModal />
      <CheckMyIdeaModal isOpen={isCheckIdeaOpen} onClose={() => setIsCheckIdeaOpen(false)} />
      <LocalWordModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
