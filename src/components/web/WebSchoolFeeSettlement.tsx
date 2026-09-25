import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  UploadCloud, 
  Printer, 
  Download,
  Loader2,
  Building2
} from 'lucide-react';
import { Beneficiary, InvestmentCycle, SchoolDisbursement } from '../../types';
import { formatNaira } from '../../utils/financial';
import { ReceiptModal } from '../modals/ReceiptModal';
import { DocumentUploadModal } from '../modals/DocumentUploadModal';

interface WebSchoolFeeSettlementProps {
  beneficiary: Beneficiary;
  cycle: InvestmentCycle;
  disbursements: SchoolDisbursement[];
  onOpenReceipt: () => void;
}

export const WebSchoolFeeSettlement: React.FC<WebSchoolFeeSettlementProps> = ({
  beneficiary,
  cycle,
  disbursements,
  onOpenReceipt,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [disbursed, setDisbursed] = useState(disbursements.length > 0);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isUploadReceiptOpen, setIsUploadReceiptOpen] = useState(false);

  const handleDisburseToSchool = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setDisbursed(true);
      setIsReceiptModalOpen(true);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">DIRECT-TO-SCHOOL TUITION SETTLEMENT</div>
          <h2 className="text-xl font-bold text-neutral-900 mt-0.5">Automated Termly Tuition Disbursement</h2>
          <p className="text-xs text-neutral-500 mt-1">
            SKULPARTNERS wires school fees directly to the institution bursary account via Paystack/NIBSS settlement rails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dual-Receipt Verification Protected</span>
          </span>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Settlement Action & Status */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-start border-b border-neutral-200 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400">TERM 1 PAYMENT SCHEDULE</span>
              <h3 className="text-base font-bold text-neutral-900 mt-0.5">{beneficiary.schoolName}</h3>
              <p className="text-xs text-neutral-500">{beneficiary.fullName} · {beneficiary.classLevel}</p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              disbursed ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {disbursed ? '✓ Disbursed & Acknowledged' : 'Ready for Automated Wire'}
            </span>
          </div>

          {/* Amount Due vs Escrow Coverage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-800">Amount Due to School</span>
              <div className="text-2xl font-bold font-mono-tabular text-emerald-950 mt-1">
                {formatNaira(cycle.termFeeDue)}
              </div>
              <div className="text-xs text-emerald-700 mt-1">Term 1 Full Tuition & Boarding</div>
            </div>

            <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Escrow Yield Coverage</span>
              <div className="text-2xl font-bold font-mono-tabular text-neutral-900 mt-1">
                {formatNaira(cycle.termFeeDue)}
              </div>
              <div className="text-xs text-emerald-700 font-bold mt-1">100% Fully Matched & Ready</div>
            </div>
          </div>

          {/* School Wire Bank Account Details */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs space-y-2">
            <div className="text-[10px] uppercase font-bold text-neutral-400">BENEFICIARY INSTITUTION BANK DETAILS</div>
            <div className="grid grid-cols-2 gap-2 text-neutral-700">
              <div>
                <span className="text-neutral-500 block">Bank Name:</span>
                <span className="font-semibold text-neutral-900">{beneficiary.schoolAccountDetails.bankName}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Account Number:</span>
                <span className="font-mono-tabular font-bold text-neutral-900">{beneficiary.schoolAccountDetails.accountNumber}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-neutral-200">
                <span className="text-neutral-500 block">Account Name:</span>
                <span className="font-semibold text-neutral-900">{beneficiary.schoolAccountDetails.accountName}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {!disbursed ? (
            <button
              onClick={handleDisburseToSchool}
              disabled={isProcessing}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Automated Wire to {beneficiary.schoolName}...</span>
                </>
              ) : (
                <>
                  <span>Disburse {formatNaira(cycle.termFeeDue)} Directly to School Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-950">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-sm block">Payment Cleared & Settled</span>
                  <span className="text-emerald-800">
                    Ref: SKP-DISB-CRN-2026-01. Funds confirmed by Corona Secondary School bursary.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsReceiptModalOpen(true)}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>View Official Digital Electronic Certificate & Receipt</span>
              </button>
            </div>
          )}
        </div>

        {/* Right 5 Cols: Dual-Receipt Mechanism & Next Cycle */}
        <div className="lg:col-span-5 space-y-5">
          {/* Dual Receipt Verification Rationale Card */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-neutral-900">Dual-Receipt Verification Mechanism</h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              To eliminate non-payment disputes, SKULPARTNERS pairs platform digital electronic receipts with physical bursary stamped receipts.
            </p>

            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block">Corona Bursar Official Stamp</span>
                  <span className="text-[10px] text-neutral-500 font-mono">#CRN-2026-SS2-0941</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Reconciled
              </span>
            </div>

            <button
              onClick={() => setIsUploadReceiptOpen(true)}
              className="w-full py-2.5 border border-neutral-300 hover:border-emerald-600 rounded-xl text-xs font-bold text-neutral-700 flex items-center justify-center gap-2 transition-colors"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Additional School Paper Receipt</span>
            </button>
          </div>

          {/* Next Cycle Card */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl p-6 shadow-md space-y-3">
            <span className="text-[10px] uppercase font-bold text-emerald-400">UPCOMING TERM</span>
            <h4 className="text-base font-bold text-white">Cycle 2 (Term 2 Session)</h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Cycle 2 will commence automatically upon conclusion of Cycle 1, covering the ₦42,000 Term 2 fees with 121 days of daily yield accrual.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        data={{
          reference: 'SKP-DISB-CRN-2026-01',
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
          alert('School receipt uploaded to audit vault.');
        }}
        onClose={() => setIsUploadReceiptOpen(false)}
      />
    </div>
  );
};
