import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Building2, 
  FileText, 
  UploadCloud, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Printer, 
  Download, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Beneficiary, InvestmentCycle, SchoolDisbursement } from '../../types';
import { formatNaira } from '../../utils/financial';
import { ReceiptModal } from '../modals/ReceiptModal';
import { DocumentUploadModal } from '../modals/DocumentUploadModal';

interface ScreenSchoolFeesProps {
  beneficiary: Beneficiary;
  cycle: InvestmentCycle;
  disbursements: SchoolDisbursement[];
  onDisbursementComplete?: () => void;
  isWireframeMode?: boolean;
}

export const ScreenSchoolFees: React.FC<ScreenSchoolFeesProps> = ({
  beneficiary,
  cycle,
  disbursements,
  isWireframeMode = false
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [disbursed, setDisbursed] = useState(disbursements.length > 0);
  const [activeReceipt, setActiveReceipt] = useState<SchoolDisbursement | null>(disbursements[0] || null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isUploadReceiptOpen, setIsUploadReceiptOpen] = useState(false);
  const [schoolReceiptStatus, setSchoolReceiptStatus] = useState<'not_uploaded' | 'under_review' | 'verified'>('verified');

  const handleDisburseToSchool = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setDisbursed(true);
      const newDisbursement: SchoolDisbursement = {
        id: `dsb_${Date.now()}`,
        reference: `SKP-DISB-CRN-${Math.floor(1000 + Math.random() * 9000)}`,
        beneficiaryId: beneficiary.id,
        studentName: beneficiary.fullName,
        schoolName: beneficiary.schoolName,
        term: 'Term 1',
        session: '2026/2027',
        amount: 65000,
        disbursedAt: 'Just now',
        status: 'confirmed_by_school',
        platformReceiptUrl: 'https://skulpartners.ng/receipts/latest.pdf',
        schoolBursarConfirmedAt: 'Instant Settlement via NIBSS/Paystack'
      };
      setActiveReceipt(newDisbursement);
      setIsReceiptModalOpen(true);
    }, 1800);
  };

  return (
    <div className={`space-y-4 pb-20 ${isWireframeMode ? 'font-mono' : ''}`}>
      {/* Title */}
      <div>
        <h2 className="text-base font-bold text-neutral-900 leading-tight">School Fee Disbursement</h2>
        <p className="text-[11px] text-neutral-500">Automated Direct-to-School Tuition Settlement</p>
      </div>

      {/* Main Readiness Card */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-sm space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400">TERM 1 PAYMENT STATUS</span>
              <h3 className="text-sm font-bold text-neutral-900 leading-tight">{beneficiary.schoolName}</h3>
              <p className="text-[11px] text-neutral-500">{beneficiary.fullName} · {beneficiary.classLevel}</p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
            disbursed ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {disbursed ? 'Disbursed' : 'Ready for Payout'}
          </span>
        </div>

        {/* Institution Bank Settlement Destination */}
        <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs space-y-1.5">
          <div className="flex justify-between text-neutral-500 text-[11px]">
            <span>Receiving School Account:</span>
            <span className="font-semibold text-neutral-800">{beneficiary.schoolAccountDetails.bankName}</span>
          </div>
          <div className="flex justify-between text-neutral-500 text-[11px]">
            <span>Account Number:</span>
            <span className="font-mono-tabular font-bold text-neutral-900">{beneficiary.schoolAccountDetails.accountNumber}</span>
          </div>
          <div className="flex justify-between text-neutral-500 text-[11px]">
            <span>Account Name:</span>
            <span className="font-semibold text-neutral-800 truncate max-w-[200px]">{beneficiary.schoolAccountDetails.accountName}</span>
          </div>
        </div>

        {/* Financial Amount Due vs Covered */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
            <span className="text-[10px] font-bold uppercase text-emerald-800">Amount Due</span>
            <div className="text-lg font-bold font-mono-tabular text-emerald-950 mt-0.5">
              {formatNaira(cycle.termFeeDue)}
            </div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Full Tuition & Levies</div>
          </div>

          <div className="bg-neutral-100/70 p-3 rounded-2xl border border-neutral-200">
            <span className="text-[10px] font-bold uppercase text-neutral-500">Escrow Yield Fund</span>
            <div className="text-lg font-bold font-mono-tabular text-neutral-900 mt-0.5">
              {formatNaira(cycle.termFeeDue)}
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">100% Fully Covered</div>
          </div>
        </div>

        {/* Action Button */}
        {!disbursed ? (
          <button
            onClick={handleDisburseToSchool}
            disabled={isProcessing}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Executing Automated NIBSS Transfer...</span>
              </>
            ) : (
              <>
                <span>Disburse {formatNaira(cycle.termFeeDue)} to School</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        ) : (
          <div className="space-y-2">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">Term 1 Fees Paid Successfully!</span>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Ref: {activeReceipt?.reference || 'SKP-DISB-CRN-2026-01'}. Funds settled in Zenith Bank.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsReceiptModalOpen(true)}
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Official Electronic Certificate & Receipt</span>
            </button>
          </div>
        )}
      </div>

      {/* Dual Receipt Verification Loop (Crucial PRD Requirement) */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs font-bold text-neutral-900">Dual Receipt Verification Loop</h3>
          </div>
          <span className="text-[10px] text-neutral-400 font-medium">Anti-Fraud Protocol</span>
        </div>

        <p className="text-xs text-neutral-600 leading-relaxed">
          SKULPARTNERS implements a dual-confirmation mechanism:
          1. Platform issues an electronic settlement receipt to parent & school.
          2. Parent or School Bursar uploads the official physical stamped receipt for audit reconciliation.
        </p>

        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <div className="font-semibold text-neutral-900">Official School Stamped Receipt</div>
              <div className="text-[10px] text-neutral-500">Corona Schools Trust Council #CRN-2026-SS2-0941</div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Reconciled & Verified
          </span>
        </div>

        <button
          onClick={() => setIsUploadReceiptOpen(true)}
          className="w-full py-2.5 border border-neutral-300 hover:border-emerald-600 hover:bg-emerald-50/50 rounded-xl text-xs font-medium text-neutral-700 flex items-center justify-center gap-1.5 transition-colors"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload Additional School Receipt / Stamp</span>
        </button>
      </div>

      {/* Next Cycle Preview */}
      <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
        <div>
          <div className="font-bold text-neutral-900">Next: Cycle 2 (Term 2)</div>
          <p className="text-[11px] text-neutral-500">Starts automatically upon completion of Cycle 1</p>
        </div>
        <span className="text-[11px] font-semibold text-emerald-800 bg-white border border-neutral-200 px-3 py-1.5 rounded-xl shadow-xs">
          121 Days
        </span>
      </div>

      {/* Modals */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        data={{
          reference: activeReceipt?.reference || 'SKP-DISB-CRN-2026-01',
          studentName: beneficiary.fullName,
          schoolName: beneficiary.schoolName,
          term: 'Term 1',
          session: '2026/2027',
          amount: 65000,
          disbursedAt: '2026-09-21 10:45 AM',
          bankName: beneficiary.schoolAccountDetails.bankName,
          accountNumber: beneficiary.schoolAccountDetails.accountNumber,
          parentName: 'Alhaji Adebayo Oladipo',
          parentId: 'SKP-2026-8842'
        }}
      />

      <DocumentUploadModal
        isOpen={isUploadReceiptOpen}
        title="Upload School Stamped Receipt"
        description="Photograph or scan the official paper receipt issued by Corona Secondary School bursary."
        onSuccess={() => {
          setSchoolReceiptStatus('verified');
        }}
        onClose={() => setIsUploadReceiptOpen(false)}
      />
    </div>
  );
};
