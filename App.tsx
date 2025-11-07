
import React, { useState, useCallback, useEffect } from 'react';
import { View, LoanProduct } from './types';
import ChatView from './components/ChatView';
import EligibilityResultsView from './components/EligibilityResultsView';
import LoanRecommendationsView from './components/LoanRecommendationsView';
import { LOAN_PRODUCTS, USER_PROFILE } from './constants';
import ApplicationWizard from './components/ApplicationWizard';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Landing);
  const [panelView, setPanelView] = useState<View | null>(null);
  const [selectedLoan, setSelectedLoan] = useState<LoanProduct | null>(null);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();

  const handleGetStarted = (message?: string) => {
    setInitialMessage(message);
    setCurrentView(View.Chat);
  };

  const handleTalkToAI = () => {
    handleGetStarted("Hi, I need help with a business loan.");
  };

  const handleGoHome = () => {
    setCurrentView(View.Landing);
    setPanelView(null);
  };

  const openPanel = useCallback((view: View) => {
    setPanelView(view);
  }, []);

  const closePanel = useCallback(() => {
    setPanelView(null);
  }, []);
  
  const handleApply = useCallback((loan: LoanProduct) => {
    setSelectedLoan(loan);
    openPanel(View.Application);
  }, [openPanel]);

  useEffect(() => {
    // Close panel on escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePanel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closePanel]);

  const renderPanel = () => {
    switch (panelView) {
      case View.Eligibility:
        return <EligibilityResultsView userProfile={USER_PROFILE} onViewLoans={() => openPanel(View.Recommendations)} onClose={closePanel} />;
      case View.Recommendations:
        return <LoanRecommendationsView loanProducts={LOAN_PRODUCTS} onApply={handleApply} onClose={closePanel} />;
      case View.Application:
        return selectedLoan ? <ApplicationWizard loan={selectedLoan} userProfile={USER_PROFILE} onClose={() => openPanel(View.Recommendations)} /> : null;
      default:
        return null;
    }
  };

  if (currentView === View.Landing) {
    return <LandingPage onGetStarted={handleGetStarted} onTalkToAI={handleTalkToAI} />;
  }

  return (
    <div className="h-screen bg-neutral-light font-sans text-neutral-dark flex flex-col">
      <Header onTalkToAI={handleTalkToAI} onGoHome={handleGoHome} />
      <div className="flex-grow flex overflow-hidden">
        <div className={`transition-all duration-500 ease-in-out h-full ${panelView ? 'w-full md:w-1/2' : 'w-full'} shadow-xl z-10`}>
          <ChatView onConversationComplete={() => openPanel(View.Eligibility)} initialMessage={initialMessage} />
        </div>
        
        <div className={`transition-all duration-500 ease-in-out h-full ${panelView ? 'w-full md:w-1/2' : 'w-0'} border-l border-gray-200 overflow-hidden`}>
          <div className="h-full w-full">
            {renderPanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
