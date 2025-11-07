import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import SparklesIcon from './icons/SparklesIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import PlusIcon from './icons/PlusIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import ImageIcon from './icons/ImageIcon';
import DocumentTextIcon from './icons/DocumentTextIcon';

interface LandingPageProps {
  onGetStarted: (message?: string) => void;
  onTalkToAI: () => void;
}

const loanOptions = [
    { 
        name: 'Equipment Financing', 
        whatIsIt: 'A loan to acquire essential machinery, vehicles, or technology, with the equipment itself serving as collateral. Terms are typically 1-7 years.', 
        whoIsItFor: 'Businesses needing to purchase physical assets without a large upfront cash payment.', 
        keyRequirements: 'Decent credit (600+), equipment quotes, and a positive trade record. DSCR of 1.25+ preferred.',
        imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
        name: 'Working Capital Loan', 
        whatIsIt: 'A short-term loan (3-18 months) to cover operational needs and manage cash flow, like payroll or inventory.', 
        whoIsItFor: 'Businesses needing immediate cash for day-to-day operations or to bridge seasonal gaps.', 
        keyRequirements: '6+ months in business, 475+ credit score, $5k-$10k+ minimum monthly revenue.',
        imageUrl: 'https://images.pexels.com/photos/7648437/pexels-photo-7648437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
        name: 'Term Loan', 
        whatIsIt: 'A traditional loan with a lump sum paid upfront and repaid over a fixed period (2-7 years) with interest.', 
        whoIsItFor: 'Established businesses planning for strategic growth, expansion, or large investments.', 
        keyRequirements: '2-3+ years in business, $100k+ annual revenue, good credit (650+), and profitability.',
        imageUrl: 'https://images.pexels.com/photos/2228580/pexels-photo-2228580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
        name: 'Invoice Financing', 
        whatIsIt: 'Access immediate cash by selling your unpaid B2B invoices to a lender at a discount.', 
        whoIsItFor: 'B2B businesses with creditworthy clients but slow payment cycles that create cash flow gaps.', 
        keyRequirements: 'Primarily B2B operations, quality invoices from reputable clients, 3-6+ months in business.',
        imageUrl: 'https://images.pexels.com/photos/7948011/pexels-photo-7948011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: 'Merchant Cash Advance (MCA)',
        whatIsIt: 'An upfront lump sum in exchange for a percentage of your future debit and credit card sales.',
        whoIsItFor: 'Businesses with consistent card sales (retail, restaurants) that need fast, flexible funding.',
        keyRequirements: 'Consistent credit card sales ($5k-$10k+/month), 3-6+ months in business.',
        imageUrl: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
        name: 'Business Line of Credit',
        whatIsIt: 'A flexible credit facility allowing you to draw, repay, and redraw funds as needed up to a set limit.',
        whoIsItFor: 'Businesses that need to manage short-term cash flow fluctuations or cover unexpected expenses.',
        keyRequirements: '6 months - 2+ years in business, $50k+ annual revenue, good credit score (600-650+).',
        imageUrl: 'https://images.pexels.com/photos/7112023/pexels-photo-7112023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    { 
        name: 'SBA Loan', 
        whatIsIt: 'Government-backed loans with favorable terms (low rates, long repayment periods) offered by lenders like Nayafin.', 
        whoIsItFor: 'Creditworthy small businesses seeking financing for major investments like real estate or expansion.', 
        keyRequirements: 'Strict criteria including excellent credit (680+), strong cash flow, owner equity, and being a for-profit US business.',
        imageUrl: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
];

const PRESET_PROMPTS = [
    "I need a loan for equipment purchase",
    "What's my business loan eligibility?",
    "Help me understand loan requirements",
    "I want to expand my restaurant",
    "Need working capital for my retail store",
    "Looking for startup business funding"
];

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onTalkToAI }) => {
    const [userInput, setUserInput] = useState('');
    const [expandedLoan, setExpandedLoan] = useState<string | null>(loanOptions[0].name);
    const [activeImageLoanName, setActiveImageLoanName] = useState<string>(loanOptions[0].name);
    const [showUploadOptions, setShowUploadOptions] = useState(false);
    const uploadButtonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (expandedLoan) {
            setActiveImageLoanName(expandedLoan);
        }
    }, [expandedLoan]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (uploadButtonRef.current && !uploadButtonRef.current.contains(event.target as Node)) {
                setShowUploadOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGetStarted(userInput || "Hi, I need help with a business loan.");
    };

    const handlePresetClick = (prompt: string) => {
        onGetStarted(prompt);
    };

    const handleToggleLoan = (loanName: string) => {
        setExpandedLoan(prev => (prev === loanName ? null : loanName));
    };

    const handleUploadOptionClick = (type: 'image' | 'document') => {
        if (type === 'image') {
          onGetStarted("I'd like to upload an image to discuss.");
        } else {
          onGetStarted("I need help with a document I want to upload.");
        }
        setShowUploadOptions(false);
    };

    return (
        <div className="bg-neutral-light">
             {/* Hero Section */}
            <div className="relative bg-[#004AAD]">
                <div className="relative flex flex-col min-h-screen">
                    <Header onTalkToAI={onTalkToAI} variant="transparent" />
                    <main className="flex-grow flex flex-col justify-center items-center text-center px-4 py-12">
                        <div className="flex items-center gap-2 text-blue-200 font-semibold tracking-wider">
                            <SparklesIcon className="w-5 h-5" />
                            <span>AI-POWERED LOAN ASSISTANT</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-4 font-heading text-white">Get Funding for <span className="text-highlight-blue">Your Business</span></h1>
                        <p className="mt-4 text-base text-gray-200 max-w-2xl">Start a conversation to assess your loan eligibility in minutes</p>

                        <div className="mt-10 max-w-4xl w-full bg-white text-neutral-dark p-6 sm:p-8 rounded-2xl shadow-2xl text-left">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-primary rounded-lg flex items-center justify-center">
                                    <ChatBubbleIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">How can we help you today?</h2>
                                    <p className="mt-1 text-neutral-medium">Ask your question or choose a topic below</p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="relative mt-6">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Type your question here..."
                                    className="w-full p-4 pr-28 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                                />
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                                    <div ref={uploadButtonRef} className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setShowUploadOptions(prev => !prev)}
                                            className="p-2.5 text-gray-500 hover:text-primary rounded-lg transition-colors"
                                            aria-label="Attach file"
                                        >
                                            <PlusIcon className="w-5 h-5" />
                                        </button>
                                        {showUploadOptions && (
                                            <div className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-md shadow-lg border z-10 py-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleUploadOptionClick('image')}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                                                >
                                                    <ImageIcon className="w-5 h-5 text-gray-500" />
                                                    <span>Upload Image</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleUploadOptionClick('document')}
                                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                                                >
                                                    <DocumentTextIcon className="w-5 h-5 text-gray-500" />
                                                    <span>Upload Document</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="p-2.5 bg-interactive-blue text-white rounded-lg hover:bg-interactive-blue-hover disabled:bg-gray-400 transition-colors"
                                        disabled={!userInput.trim()}
                                        aria-label="Send message"
                                    >
                                        <PaperAirplaneIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {PRESET_PROMPTS.map((prompt) => (
                                    <button key={prompt} onClick={() => handlePresetClick(prompt)} className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-neutral-dark hover:bg-gray-100 transition text-left shadow-sm hover:shadow-md">
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="mt-6 text-sm text-gray-300">
                            No credit card required • Free eligibility assessment • Secure & confidential
                        </p>
                    </main>
                </div>
            </div>

            {/* Loan Exploration Section */}
            <div className="bg-white py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-neutral-dark sm:text-5xl font-heading">
                            Explore Loan Options
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-neutral-medium">
                            From securing equipment to managing cash flow, find the right financing to propel <span className="text-highlight-blue font-semibold">your business</span> forward.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 items-start">
                        <div className="lg:sticky lg:top-24">
                            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden">
                                <div className="bg-gray-100 absolute inset-0"></div>
                                {loanOptions.map((loan) => (
                                    <img 
                                        key={loan.name}
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${activeImageLoanName === loan.name ? 'opacity-100' : 'opacity-0'}`} 
                                        src={loan.imageUrl} 
                                        alt={loan.name} 
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            {loanOptions.map((loan) => {
                                const isExpanded = expandedLoan === loan.name;
                                return (
                                    <div key={loan.name} className="border-b border-gray-200 transition-all duration-300">
                                        <button
                                            onClick={() => handleToggleLoan(loan.name)}
                                            className="w-full flex justify-between items-center py-6 text-left focus:outline-none"
                                            aria-expanded={isExpanded}
                                        >
                                            <h3 className="text-2xl font-medium text-neutral-dark font-heading sm:text-3xl">{loan.name}</h3>
                                            <ChevronDownIcon className={`w-6 h-6 text-neutral-medium transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                        <div
                                            className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}
                                        >
                                            <div className="py-6">
                                                <div className="space-y-4 text-base">
                                                    <div>
                                                        <h4 className="font-semibold text-neutral-dark">What is it?</h4>
                                                        <p className="text-neutral-medium mt-1">{loan.whatIsIt}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-neutral-dark">Who is it for?</h4>
                                                        <p className="text-neutral-medium mt-1">{loan.whoIsItFor}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-neutral-dark">Key Requirements</h4>
                                                        <p className="text-neutral-medium mt-1">{loan.keyRequirements}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => onGetStarted(`Tell me more about ${loan.name}`)}
                                                    className="mt-6 w-auto text-center px-5 py-2.5 border border-primary/50 text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                >
                                                    Ask Fin about this loan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;