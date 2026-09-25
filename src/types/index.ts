export type KycStatus = 'not_started' | 'pending' | 'verified' | 'rejected';

export interface NextOfKin {
  fullName: string;
  relationship: string;
  phone: string;
  email: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface Beneficiary {
  id: string;
  fullName: string;
  dateOfBirth: string;
  schoolName: string;
  schoolAccountDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  classLevel: string;
  term1Fee: number;
  term2Fee: number;
  term3Fee: number;
  annualFees: number;
  avatarUrl?: string;
  status: 'active' | 'graduated' | 'transferred' | 'pending';
}

export interface ParentUser {
  id: string;
  userId: string; // e.g. SKP-2026-8842
  fullName: string;
  email: string;
  phone: string;
  bvn: string;
  nin: string;
  kycStatus: KycStatus;
  kycSubmittedAt?: string;
  kycVerifiedAt?: string;
  idDocumentType: 'National ID (NIN Slip)' | 'International Passport' | "Voter's Card" | "Driver's License";
  idDocumentUploaded: boolean;
  utilityBillUploaded: boolean;
  nextOfKin: NextOfKin;
  twoFactorEnabled: boolean;
  avatarUrl?: string;
}

export interface InvestmentCycle {
  id: string;
  cycleNumber: 1 | 2 | 3;
  cycleName: string;
  durationDays: number; // 123 for Cycle 1, 121 for Cycle 2, 121 for Cycle 3
  currentDay: number;
  startDate: string;
  endDate: string;
  principalAmount: number;
  dailyRoiRate: number; // e.g. 0.008 (0.8%)
  dailyProfit: number;
  totalProfitAccrued: number;
  payoutCommissionRate: number; // 0.10 (10%)
  payoutCommissionAccrued: number;
  netBalance: number;
  termFeeDue: number;
  termFeeStatus: 'accruing' | 'ready_for_payout' | 'disbursed' | 'receipt_verified';
  insuranceContribution: number;
  maintenanceFee: number;
  status: 'active' | 'completed' | 'paused_grace' | 'suspended';
}

export interface Transaction {
  id: string;
  reference: string;
  type: 'investment_upfront' | 'daily_roi' | 'school_fee_payout' | 'payout_commission' | 'maintenance_fee' | 'insurance_premium' | 'fine_penalty' | 'surplus_refund';
  amount: number;
  date: string;
  status: 'successful' | 'pending' | 'failed';
  wallet: 'investment' | 'disbursement';
  description: string;
  receiptNumber?: string;
  beneficiaryName?: string;
  schoolName?: string;
}

export interface SchoolDisbursement {
  id: string;
  reference: string;
  beneficiaryId: string;
  studentName: string;
  schoolName: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  session: string; // e.g. 2026/2027
  amount: number;
  disbursedAt: string;
  status: 'pending_approval' | 'disbursed' | 'confirmed_by_school' | 'receipt_uploaded' | 'verified';
  platformReceiptUrl: string;
  schoolOfficialReceiptUrl?: string;
  schoolBursarConfirmedAt?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'payment' | 'milestone' | 'grace_warning' | 'compliance' | 'report' | 'system';
  isRead: boolean;
  isImportant?: boolean;
}

export interface ComplianceRecord {
  id: string;
  userId: string;
  userName: string;
  riskScore: 'Low' | 'Medium' | 'High';
  bvnMatch: boolean;
  ninMatch: boolean;
  amlScreeningStatus: 'Cleared' | 'Under Review' | 'Flagged';
  scumlStatus: 'Compliant' | 'Pending Review';
  lastAuditDate: string;
  statusNotes: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  entity: string;
  entityId: string;
  beforeState?: string;
  afterState?: string;
  ipAddress: string;
}

export type AdminRole = 
  | 'Lead Partner'
  | 'Managing Partner'
  | 'Compliance Officer'
  | 'Finance & Payouts'
  | 'Customer Support'
  | 'Auditor (Read-Only)';

export type AppViewMode = 
  | 'web_dashboard'
  | 'web_investment'
  | 'web_disbursement'
  | 'web_ledger'
  | 'mobile_preview'
  | 'system_architecture'
  | 'financial_sandbox'
  | 'admin_portal'
  | 'school_portal';
