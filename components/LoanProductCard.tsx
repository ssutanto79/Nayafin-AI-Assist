
import React from 'react';
import { LoanProduct } from '../types';
import BriefcaseIcon from './icons/BriefcaseIcon';
import CheckIcon from './icons/CheckIcon';

interface LoanProductCardProps {
  loan: LoanProduct;
  onApply: (loan: LoanProduct) => void;
  onCompareToggle: (id: string) => void;
  isSelectedForCompare: boolean;
}

const LoanProductCard: React.FC<LoanProductCardProps> = ({ loan, onApply, onCompareToggle, isSelectedForCompare }) => {
  return (
    <div className={`flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isSelectedForCompare ? 'ring-2 ring-primary' : ''}`}>
      <div className="p-6 bg-gray-50 border-b flex items-center justify-between">
        <div className="flex items-center">
            <BriefcaseIcon className="w-8 h-8 text-primary mr-3" />
            <h3 className="text-xl font-bold text-neutral-dark">{loan.name}</h3>
        </div>
        <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" checked={isSelectedForCompare} onChange={() => onCompareToggle(loan.id)} />
            <label className="ml-2 text-sm text-gray-600">Compare</label>
        </div>
      </div>

      <div className="p-6 flex-grow">
        <p className="text-sm font-medium text-neutral-medium">{loan.lender}</p>
        <div className="mt-4 flex flex-col space-y-2">
            <p className="text-3xl font-bold text-neutral-dark">{loan.amountText}</p>
            <p className="text-lg font-semibold text-secondary">{loan.apr} APR</p>
            <p className="text-neutral-medium">{loan.term}</p>
        </div>

        <ul className="mt-6 space-y-2">
          {loan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="w-5 h-5 text-success flex-shrink-0 mr-2 mt-1" />
              <span className="text-neutral-medium">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800">Why this fits:</h4>
            <p className="text-sm text-blue-700 mt-1">{loan.whyThisFits}</p>
        </div>
      </div>
      
      <div className="p-6 bg-gray-50 flex flex-col sm:flex-row gap-3">
        <button className="flex-1 whitespace-nowrap px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-neutral-dark bg-white hover:bg-gray-50">
          Learn More
        </button>
        <button
          onClick={() => onApply(loan)}
          className="flex-1 whitespace-nowrap px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-hover"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default LoanProductCard;
