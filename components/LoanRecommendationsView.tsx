import React, { useState } from 'react';
import { LoanProduct } from '../types';
import LoanProductCard from './LoanProductCard';
import XIcon from './icons/XIcon';

interface LoanRecommendationsViewProps {
  loanProducts: LoanProduct[];
  onApply: (loan: LoanProduct) => void;
  onClose: () => void;
}

const LoanRecommendationsView: React.FC<LoanRecommendationsViewProps> = ({ loanProducts, onApply, onClose }) => {
  const [selectedToCompare, setSelectedToCompare] = useState<string[]>([]);

  const handleCompareToggle = (id: string) => {
    setSelectedToCompare(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  const comparisonItems = loanProducts.filter(lp => selectedToCompare.includes(lp.id));

  return (
    <div className="h-full flex flex-col bg-gray-50 relative">
       <div className="p-4 bg-[#004AAD] text-white flex justify-between items-center flex-shrink-0 sticky top-0 z-10">
        <h2 className="text-xl font-medium">Your Loan Recommendations</h2>
        <button onClick={onClose} className="p-1 rounded-full text-gray-200 hover:bg-white/20 hover:text-white">
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <p className="text-center text-lg text-neutral-medium mb-8">
            We've found these options based on your business profile.
          </p>
          
          <div className="grid gap-8 md:grid-cols-1 xl:grid-cols-2">
            {loanProducts.map(loan => (
              <LoanProductCard
                key={loan.id}
                loan={loan}
                onApply={onApply}
                onCompareToggle={handleCompareToggle}
                isSelectedForCompare={selectedToCompare.includes(loan.id)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {comparisonItems.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-20 border-t animate-slide-in-bottom">
            <div className="">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Comparing {comparisonItems.length} Loan{comparisonItems.length > 1 ? 's' : ''}</h3>
                    <button onClick={() => setSelectedToCompare([])} className="p-1 rounded-full hover:bg-gray-100">
                      <XIcon className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <div className="mt-4 grid gap-4" style={{gridTemplateColumns: `repeat(${comparisonItems.length}, minmax(0, 1fr))`}}>
                    {comparisonItems.map(item => (
                        <div key={item.id} className="text-sm p-2 bg-gray-50 rounded">
                            <p className="font-bold">{item.name}</p>
                            <p>{item.amountText}</p>
                            <p>{item.apr} APR</p>
                            <p>{item.term}</p>
                        </div>
                    ))}
                </div>
                 <button className="mt-4 w-full bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition">
                    Compare Now
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default LoanRecommendationsView;