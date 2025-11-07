import React, { useState } from 'react';
import { LoanProduct, UserProfile } from '../types';
import XIcon from './icons/XIcon';
import DocumentUpload from './DocumentUpload';

interface ApplicationWizardProps {
  loan: LoanProduct;
  userProfile: UserProfile;
  onClose: () => void;
}

const steps = ['Business Info', 'Financial Details', 'Documents', 'Review'];

const ApplicationWizard: React.FC<ApplicationWizardProps> = ({ loan, userProfile, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Business Info
        return (
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Business Information</h3>
            <p className="mt-1 text-sm text-gray-500">Confirm or update your business details.</p>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                    <label htmlFor="business-name" className="block text-sm font-medium text-gray-700">Business Name</label>
                    <input type="text" id="business-name" defaultValue={userProfile.businessName} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2"/>
                </div>
                 <div className="sm:col-span-3">
                    <label htmlFor="ein" className="block text-sm font-medium text-gray-700">EIN/Tax ID</label>
                    <input type="text" id="ein" placeholder="XX-XXXXXXX" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2"/>
                </div>
            </div>
          </div>
        );
      case 1: // Financial Details
        return (
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Financial Details</h3>
             <p className="mt-1 text-sm text-gray-500">Let's talk numbers.</p>
             <div className="mt-6">
                <label htmlFor="loan-amount" className="block text-sm font-medium text-gray-700">Loan Amount Requested</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input type="text" id="loan-amount" defaultValue={loan.amount.toLocaleString()} className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md p-2" />
                </div>
             </div>
          </div>
        );
      case 2: // Documents
        return <DocumentUpload />;
      case 3: // Review
        return <div className="text-center p-8"><h3 className="text-xl font-semibold">Ready to Submit!</h3><p className="mt-2 text-gray-600">Please review all your information before submitting your application for {loan.name}.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white h-full w-full flex flex-col">
      <div className="flex justify-between items-center p-4 bg-[#004AAD] text-white flex-shrink-0">
        <h2 className="text-xl font-medium">Apply for: {loan.name}</h2>
        <button onClick={onClose} className="p-1 rounded-full text-gray-200 hover:bg-white/20 hover:text-white">
          <XIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 flex-shrink-0">
          <div className="mb-8">
              <ol className="flex items-center">
                  {steps.map((step, index) => (
                      <li key={step} className="relative flex-1">
                          <div className={`flex items-center text-sm ${index <= currentStep ? 'text-primary' : 'text-gray-500'}`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                                  {index + 1}
                              </div>
                              <span className="ml-3 hidden sm:inline">{step}</span>
                          </div>
                          {index < steps.length - 1 && <div className={`absolute top-1/2 -translate-y-1/2 left-4 h-0.5 w-full ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />}
                      </li>
                  ))}
              </ol>
          </div>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-6">
        {renderStepContent()}
      </div>

      <div className="p-4 border-t flex justify-between bg-gray-50 rounded-b-lg flex-shrink-0">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-neutral-dark bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>
        {currentStep === steps.length - 1 ? (
           <button
              onClick={onClose}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-success hover:bg-green-700"
            >
              Submit Application
            </button>
        ) : (
           <button
              onClick={nextStep}
              className="px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-hover"
            >
              Next
            </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationWizard;