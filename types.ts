
// Fix: Import React to use React.ReactNode type.
import React from 'react';

export enum View {
  Landing,
  Chat,
  Eligibility,
  Recommendations,
  Application
}

export interface Message {
  id: number;
  text: string | React.ReactNode;
  sender: 'user' | 'ai';
  timestamp: string;
  file?: {
    name: string;
    url: string; // Data URL for preview
    type: string;
  };
}

export interface UserProfile {
  name: string;
  businessName: string;
  location: string;
  yearsInBusiness: number;
  annualRevenue: number;
  creditScore: number;
  employees: number;
  loanReason: string;
}

export interface LoanProduct {
  id: string;
  name: string;
  lender: string;
  amount: number;
  amountText: string;
  apr: string;
  term: string;
  monthlyPayment?: string;
  requirements: string[];
  processingTime: string;
  whyThisFits: string;
  features: string[];
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'uploaded' | 'error';
  progress?: number;
}
