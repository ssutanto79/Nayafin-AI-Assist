import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';

interface EligibilityResultsViewProps {
  userProfile: UserProfile;
  onViewLoans: () => void;
  onClose: () => void;
}

const EligibilityResultsView: React.FC<EligibilityResultsViewProps> = ({ userProfile, onViewLoans, onClose }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(75), 100);
        return () => clearTimeout(timer);
    }, []);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 bg-[#004AAD] text-white flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-medium">🎯 Your Eligibility Results</h2>
        <button onClick={onClose} className="p-1 rounded-full text-gray-200 hover:bg-white/20 hover:text-white">
          <XIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
            <p className="text-center mt-2 mb-8 text-neutral-medium">Here's a summary based on your conversation.</p>
            
            <div className="relative flex justify-center items-center mb-8">
                <svg className="w-48 h-48 transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="#E5E7EB" strokeWidth="16" fill="transparent" />
                    <circle 
                        cx="96" 
                        cy="96" 
                        r="88" 
                        stroke="#10B981" 
                        strokeWidth="16" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 88}
                        strokeDashoffset={(2 * Math.PI * 88) * (1 - progress / 100)}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-secondary">{progress}%</span>
                    <span className="text-lg font-semibold text-neutral-dark">Strong Match</span>
                </div>
            </div>

            <div className="bg-neutral-light p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-neutral-dark mb-4">Based on:</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-neutral-medium">
                  <CheckIcon className="h-5 w-5 text-success mr-3" />
                  <span>{userProfile.yearsInBusiness} years in business</span>
                </li>
                <li className="flex items-center text-neutral-medium">
                  <CheckIcon className="h-5 w-5 text-success mr-3" />
                  <span>${userProfile.annualRevenue.toLocaleString()} annual revenue</span>
                </li>
                <li className="flex items-center text-neutral-medium">
                  <CheckIcon className="h-5 w-5 text-success mr-3" />
                  <span>Good credit score (~{userProfile.creditScore})</span>
                </li>
                <li className="flex items-center text-neutral-medium">
                  <CheckIcon className="h-5 w-5 text-success mr-3" />
                  <span>Bakery industry</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center mb-6">
                <p className="text-neutral-medium">You are likely eligible for loans in the range of:</p>
                <p className="text-2xl font-bold text-primary">$25,000 - $75,000</p>
            </div>

            <button
              onClick={onViewLoans}
              className="w-full bg-primary text-white font-bold py-4 px-4 rounded-lg hover:bg-primary-hover transition-transform transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              View Loan Options
            </button>
        </div>
      </div>
    </div>
  );
};

export default EligibilityResultsView;