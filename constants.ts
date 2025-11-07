
import { UserProfile, LoanProduct } from './types';

export const USER_PROFILE: UserProfile = {
  name: 'Maria Rodriguez',
  businessName: 'Sweet Dreams Bakery',
  location: 'Austin, TX',
  yearsInBusiness: 2,
  annualRevenue: 150000,
  creditScore: 680,
  employees: 3,
  loanReason: 'Equipment upgrade (new commercial oven)',
};

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'sba-microloan',
    name: 'SBA Microloan',
    lender: 'Community First Bank',
    amount: 50000,
    amountText: '$50,000',
    apr: '7.5% - 9.5%',
    term: '5 year term',
    monthlyPayment: '~ $1,000',
    requirements: ['2+ years in business', '$100K+ revenue'],
    processingTime: '2-3 weeks',
    whyThisFits: 'Perfect for bakeries in your revenue range seeking favorable terms.',
    features: ['No collateral required', 'Fast approval process'],
  },
  {
    id: 'loc',
    name: 'Business Line of Credit',
    lender: 'Online Lender Plus',
    amount: 75000,
    amountText: 'Up to $75,000',
    apr: '12% - 18%',
    term: 'Revolving credit',
    requirements: ['1+ year in business', '$75K+ revenue'],
    processingTime: '3-5 days',
    whyThisFits: 'Great for flexible cash flow to manage day-to-day expenses.',
    features: ['Draw as needed', 'Pay interest only on used funds'],
  },
  {
    id: 'equipment-financing',
    name: 'Equipment Financing',
    lender: 'Capital Equipment Co',
    amount: 100000,
    amountText: 'Up to $100,000',
    apr: '6% - 10%',
    term: 'Up to 7 years',
    requirements: ['Purchase invoice required'],
    processingTime: '1-2 weeks',
    whyThisFits: 'Specifically designed for purchasing equipment, just like your new oven.',
    features: ['Equipment serves as collateral', 'Competitive rates'],
  },
];
