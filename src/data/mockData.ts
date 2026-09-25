import { 
  ParentUser, 
  Beneficiary, 
  InvestmentCycle, 
  Transaction, 
  SchoolDisbursement, 
  NotificationItem, 
  ComplianceRecord, 
  AuditLog 
} from '../types';

export const INITIAL_PARENT: ParentUser = {
  id: 'usr_01J8K9X3A',
  userId: 'SKP-2026-8842',
  fullName: 'Alhaji Adebayo Oladipo',
  email: 'adebayo.oladipo@lagosgroup.ng',
  phone: '+234 803 456 7890',
  bvn: '22194830192',
  nin: '74910283741',
  kycStatus: 'verified',
  kycSubmittedAt: '2026-06-12 09:14',
  kycVerifiedAt: '2026-06-12 09:22',
  idDocumentType: 'National ID (NIN Slip)',
  idDocumentUploaded: true,
  utilityBillUploaded: true,
  nextOfKin: {
    fullName: 'Mrs. Folashade Oladipo',
    relationship: 'Spouse',
    phone: '+234 802 334 1122',
    email: 'folashade.oladipo@lagosgroup.ng',
    bankName: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0129481023',
    accountName: 'FOLASHADE BUKOLA OLADIPO'
  },
  twoFactorEnabled: true,
  avatarUrl: '/src/assets/images/parent_avatar_adebayo_1790332256792.jpg'
};

export const INITIAL_BENEFICIARY: Beneficiary = {
  id: 'ben_99A1',
  fullName: 'Zainab Kemi Oladipo',
  dateOfBirth: '2010-04-18',
  schoolName: 'Corona Secondary School, Agbara',
  schoolAccountDetails: {
    bankName: 'Zenith Bank PLC',
    accountNumber: '1013488201',
    accountName: 'CORONA SCHOOLS TRUST COUNCIL - FEES'
  },
  classLevel: 'Senior Secondary 2 (SS2)',
  term1Fee: 65000,
  term2Fee: 42000,
  term3Fee: 42000,
  annualFees: 149000,
  avatarUrl: '/src/assets/images/student_avatar_zainab_1790332269355.jpg',
  status: 'active'
};

export const INITIAL_CYCLE: InvestmentCycle = {
  id: 'cyc_01_2026',
  cycleNumber: 1,
  cycleName: 'Cycle 1 (1st Term 2026/2027 Session)',
  durationDays: 123,
  currentDay: 78,
  startDate: '2026-07-09',
  endDate: '2026-11-09',
  principalAmount: 104300, // 70% of 149,000
  dailyRoiRate: 0.008, // 0.8% daily
  dailyProfit: 834.40, // 104,300 * 0.008
  totalProfitAccrued: 65083.20, // 78 * 834.40
  payoutCommissionRate: 0.10, // 10%
  payoutCommissionAccrued: 6508.32,
  netBalance: 58574.88,
  termFeeDue: 65000,
  termFeeStatus: 'ready_for_payout', // ready as cycle is past day 75 with sufficient funds
  insuranceContribution: 1564.50, // 1.5% of 104,300
  maintenanceFee: 4500, // Configurable: ₦4,500
  status: 'active'
};

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_01',
    reference: 'SKP-PAY-8842-001',
    type: 'investment_upfront',
    amount: 110364.50,
    date: '2026-07-09 11:32',
    status: 'successful',
    wallet: 'investment',
    description: 'Upfront 70% Educational Capital + Insurance & Maintenance (via Paystack)',
    receiptNumber: 'REC-SKP-2026-0091'
  },
  {
    id: 'tx_02',
    reference: 'SKP-INS-8842',
    type: 'insurance_premium',
    amount: 1564.50,
    date: '2026-07-09 11:32',
    status: 'successful',
    wallet: 'investment',
    description: '1.5% Educational Underwriting Guarantee Contribution'
  },
  {
    id: 'tx_03',
    reference: 'SKP-MNT-8842',
    type: 'maintenance_fee',
    amount: 4500.00,
    date: '2026-07-09 11:32',
    status: 'successful',
    wallet: 'investment',
    description: 'Platform Maintenance & Portal Administration Fee'
  },
  {
    id: 'tx_04',
    reference: 'SKP-ROI-DAY-77',
    type: 'daily_roi',
    amount: 834.40,
    date: '2026-09-24 00:00',
    status: 'successful',
    wallet: 'investment',
    description: 'Daily Educational ROI Accrual @ 0.8% (Day 77/123)'
  },
  {
    id: 'tx_05',
    reference: 'SKP-ROI-DAY-78',
    type: 'daily_roi',
    amount: 834.40,
    date: '2026-09-25 00:00',
    status: 'successful',
    wallet: 'investment',
    description: 'Daily Educational ROI Accrual @ 0.8% (Day 78/123)'
  }
];

export const INITIAL_DISBURSEMENTS: SchoolDisbursement[] = [
  {
    id: 'dsb_term1_2026',
    reference: 'SKP-DISB-CRN-2026-01',
    beneficiaryId: 'ben_99A1',
    studentName: 'Zainab Kemi Oladipo',
    schoolName: 'Corona Secondary School, Agbara',
    term: 'Term 1',
    session: '2026/2027',
    amount: 65000,
    disbursedAt: '2026-09-20 14:10',
    status: 'confirmed_by_school',
    platformReceiptUrl: 'https://skulpartners.ng/receipts/SKP-DISB-CRN-2026-01.pdf',
    schoolOfficialReceiptUrl: 'https://corona.edu.ng/bursar/receipts/CRN-2026-SS2-0941.pdf',
    schoolBursarConfirmedAt: '2026-09-21 10:45'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'School Fee Disbursement Confirmed',
    message: 'Corona Secondary School bursary has acknowledged receipt of ₦65,000 for Zainab Kemi Oladipo (Term 1).',
    timestamp: 'Yesterday, 10:45 AM',
    type: 'payment',
    isRead: false,
    isImportant: true
  },
  {
    id: 'notif_2',
    title: 'Cycle 1 Milestone: Day 75 Passed',
    message: 'Your investment cycle has crossed 60% completion. Daily yield continues at ₦834.40 / day.',
    timestamp: '3 days ago',
    type: 'milestone',
    isRead: true
  },
  {
    id: 'notif_3',
    title: 'Monthly Statement Generated',
    message: 'August 2026 Educational Yield & Compliance Statement is available for download.',
    timestamp: 'Sep 1, 2026',
    type: 'report',
    isRead: true
  }
];

export const INITIAL_COMPLIANCE_RECORDS: ComplianceRecord[] = [
  {
    id: 'cmp_01',
    userId: 'SKP-2026-8842',
    userName: 'Alhaji Adebayo Oladipo',
    riskScore: 'Low',
    bvnMatch: true,
    ninMatch: true,
    amlScreeningStatus: 'Cleared',
    scumlStatus: 'Compliant',
    lastAuditDate: '2026-09-20',
    statusNotes: 'Passed PEP & Sanctions screening. Validated against NIBSS BVN database.'
  },
  {
    id: 'cmp_02',
    userId: 'SKP-2026-4419',
    userName: 'Chief Emeka Okonkwo',
    riskScore: 'Low',
    bvnMatch: true,
    ninMatch: true,
    amlScreeningStatus: 'Cleared',
    scumlStatus: 'Compliant',
    lastAuditDate: '2026-09-18',
    statusNotes: 'Dual high-school enrollment verified with Kings College Lagos.'
  },
  {
    id: 'cmp_03',
    userId: 'SKP-2026-1102',
    userName: 'Dr. Fatima Danjuma',
    riskScore: 'Medium',
    bvnMatch: true,
    ninMatch: false,
    amlScreeningStatus: 'Under Review',
    scumlStatus: 'Pending Review',
    lastAuditDate: '2026-09-24',
    statusNotes: 'NIN slip photo blurry on corner. Re-verification requested from user.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud_901',
    timestamp: '2026-09-25 09:12:44',
    actor: 'System Auto-Engine',
    actorRole: 'Automated Worker',
    action: 'DISBURSEMENT_SETTLED',
    entity: 'SchoolDisbursement',
    entityId: 'SKP-DISB-CRN-2026-01',
    beforeState: 'status: pending_school_acknowledgement',
    afterState: 'status: confirmed_by_school (₦65,000 to Zenith Bank)',
    ipAddress: '10.0.4.12 (Internal VPC)'
  },
  {
    id: 'aud_902',
    timestamp: '2026-09-24 16:30:19',
    actor: 'Folake Adeleke',
    actorRole: 'Compliance Officer',
    action: 'KYC_DOCUMENT_APPROVED',
    entity: 'ParentUser',
    entityId: 'SKP-2026-8842',
    beforeState: 'kycStatus: pending',
    afterState: 'kycStatus: verified (BVN + NIN Match 100%)',
    ipAddress: '197.210.54.21 (Lagos Office)'
  },
  {
    id: 'aud_903',
    timestamp: '2026-09-24 00:00:01',
    actor: 'Yield Engine (Cron)',
    actorRole: 'System Batch Service',
    action: 'DAILY_ROI_ACCRUED',
    entity: 'InvestmentCycle',
    entityId: 'cyc_01_2026',
    beforeState: 'accrued: ₦64,248.80, day: 77',
    afterState: 'accrued: ₦65,083.20, day: 78 (+₦834.40)',
    ipAddress: '10.0.2.8 (Internal Cron)'
  }
];
