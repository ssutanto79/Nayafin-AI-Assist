
import React from 'react';

interface HeaderProps {
  onTalkToAI?: () => void;
  onGoHome?: () => void;
  variant?: 'solid' | 'transparent';
}

const Header: React.FC<HeaderProps> = ({ onTalkToAI, onGoHome, variant = 'solid' }) => {
  const isSolid = variant === 'solid';
  
  const headerBaseClasses = "z-30";
  const headerVariantClasses = isSolid
    ? "bg-[#004AAD]"
    : "absolute top-0 left-0 right-0";
  
  const linkColorClasses = "text-gray-200 hover:text-white";
  const logoColorClass = "text-white";


  return (
    <header className={`${headerBaseClasses} ${headerVariantClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => { e.preventDefault(); onGoHome?.(); }} className="flex items-center">
                <span className={`font-heading text-3xl font-extrabold ${logoColorClass}`} style={{ letterSpacing: '0.3px' }}>
                    NAYAFIN
                </span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" onClick={(e) => { e.preventDefault(); onGoHome?.(); }} className={`${linkColorClasses} px-3 py-2 rounded-md text-sm font-medium transition-colors`}>Home</a>
              <button onClick={onTalkToAI} className="px-4 py-2 bg-white text-primary rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">Talk to AI assistant</button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button type="button" className={`${isSolid ? 'text-white' : 'text-gray-200'} inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`} aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;