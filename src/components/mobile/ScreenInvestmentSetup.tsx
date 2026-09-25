import React, { useState } from 'react';
import { 
  Calculator, 
  UploadCloud, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Award, 
  Info,
  CreditCard
} from 'lucide-react';
import { computeInvestmentPlan, formatNaira } from '../../utils/financial';
import { PaystackModal } from '../modals/PaystackModal';
import { CertificateModal } from '../modals/CertificateModal';
import { DocumentUploadModal } from '../modals/DocumentUploadModal';

interface ScreenInvestmentSetupProps {
  onPlanCreated?: () => void;
  onNavigate: (tab: string) => void;
  isWireframeMode?: boolean;
}

export const ScreenInvestmentSetup: React.FC<ScreenInvestmentSetupProps> = ({
  onNavigate,
  isWireframeMode = false
}) => {
  const [term1, setTerm1] = useState(65000);
  const [term2, setTerm2] = useState(42000);
  const [term3, setTerm3] = useState(42000);
  const [maintenanceFeeOption, setMaintenanceFeeOption] = useState<4500 | 500>(4500);
  const [voucherUploaded, setVoucherUploaded] = useState(true);
  const [voucherFileName, setVoucherFileName] = useState('Corona_Term3_Paid_Voucher.pdf');

  // Modals
  const [isPaystackOpen, setIsPaystackOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [paymentSuccessRef, setPaymentSuccessRef] = useState<string | null>(null);

  const plan = computeInvestmentPlan(term1, term2, term3, 0.008, 123, maintenanceFeeOption);

  const handlePaystackSuccess = (ref: string) => {
    setIsPaystackOpen(false);
    setPaymentSuccessRef(ref);
    setIsCertificateOpen(true);
  };

  return (
    <div className={`space-y-4 pb-20 ${isWireframeMode ? 'font-mono' : ''}`}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-neutral-900 leading-tight">Educational Investment Setup</h2>
            <p className="text-[11px] text-neutral-500">“Pay Once, Study Free” · 70% Upfront Funding Model</p>
          </div>
        </div>
      </div>

      {/* Payment Success Banner if paid */}
      {paymentSuccessRef && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold text-sm">Educational Escrow Funded!</div>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              Ref: {paymentSuccessRef}. Your 123-day Cycle 1 has commenced with daily yield accrual at 0.8%.
            </p>
            <button
              onClick={() => setIsCertificateOpen(true)}
              className="mt-2 text-xs font-semibold text-emerald-800 underline flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" /> View Investment Certificate
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Termly Fees Input */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">STEP 1: ANNUAL TUITION SCHEDULE</span>
          <span className="text-[11px] font-bold text-neutral-900 font-mono-tabular">Total: {formatNaira(plan.annualFees)}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-semibold text-neutral-600 mb-1">Term 1 Fee (₦)</label>
            <input
              type="number"
              value={term1}
              onChange={(e) => setTerm1(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-2 border border-neutral-300 rounded-lg text-xs font-mono-tabular focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-neutral-600 mb-1">Term 2 Fee (₦)</label>
            <input
              type="number"
              value={term2}
              onChange={(e) => setTerm2(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-2 border border-neutral-300 rounded-lg text-xs font-mono-tabular focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-neutral-600 mb-1">Term 3 Fee (₦)</label>
            <input
              type="number"
              value={term3}
              onChange={(e) => setTerm3(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-2 border border-neutral-300 rounded-lg text-xs font-mono-tabular focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Voucher Upload */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">STEP 2: PREVIOUS FEE VOUCHER</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            voucherUploaded ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
          }`}>
            {voucherUploaded ? 'Verified' : 'Upload Required'}
          </span>
        </div>

        {voucherUploaded ? (
          <div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
            <div className="flex items-center gap-2 truncate">
              <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate text-neutral-800 font-medium">{voucherFileName}</span>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold ml-2 shrink-0"
            >
              Replace
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="w-full py-3 border-2 border-dashed border-neutral-300 hover:border-emerald-600 rounded-xl flex items-center justify-center gap-2 text-xs font-medium text-neutral-600 transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-neutral-400" />
            Upload Previous Term Fee Voucher/Receipt
          </button>
        )}
      </div>

      {/* Step 3: Exact Transparent Calculation Breakdown Card */}
      <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">PRD COMPUTATION BREAKDOWN</div>
            <div className="text-sm font-bold text-white mt-0.5">What You Pay Upfront</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-neutral-400">Total Upfront</div>
            <div className="text-lg font-bold font-mono-tabular text-emerald-400">
              {formatNaira(plan.totalUpfront)}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs divide-y divide-white/5">
          <div className="flex justify-between py-1">
            <span className="text-neutral-300">1. Annual Tuition Total:</span>
            <span className="font-mono-tabular text-neutral-200">{formatNaira(plan.annualFees)}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-neutral-300">2. Investment Principal (70%):</span>
            <span className="font-mono-tabular font-bold text-emerald-300">{formatNaira(plan.principalAmount)}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-neutral-300">3. Insurance Guarantee (1.5%):</span>
            <span className="font-mono-tabular text-neutral-200">{formatNaira(plan.insuranceFee)}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-300">4. Maintenance Fee:</span>
              <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-neutral-400">
                PRD Option
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMaintenanceFeeOption(4500)}
                className={`text-[10px] px-2 py-0.5 rounded ${
                  maintenanceFeeOption === 4500 ? 'bg-emerald-600 text-white font-bold' : 'bg-white/10 text-neutral-400'
                }`}
              >
                ₦4,500
              </button>
              <button
                onClick={() => setMaintenanceFeeOption(500)}
                className={`text-[10px] px-2 py-0.5 rounded ${
                  maintenanceFeeOption === 500 ? 'bg-emerald-600 text-white font-bold' : 'bg-white/10 text-neutral-400'
                }`}
              >
                ₦500
              </button>
            </div>
          </div>
        </div>

        {/* Projected Return Visual */}
        <div className="bg-white/5 rounded-xl p-3 text-xs border border-white/10">
          <div className="text-[10px] text-neutral-400 font-semibold uppercase">Projected Cycle 1 Output</div>
          <div className="flex justify-between mt-1">
            <span className="text-neutral-300">Daily Profit @ 0.8%:</span>
            <span className="font-mono-tabular font-bold text-emerald-400">+{formatNaira(plan.dailyProfit)} / day</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-neutral-300">123-Day Cycle Gross Yield:</span>
            <span className="font-mono-tabular text-white">{formatNaira(plan.totalCycleProfit)}</span>
          </div>
          <div className="flex justify-between mt-1 text-[11px] text-neutral-400">
            <span>Net Yield after 10% Commission:</span>
            <span className="font-mono-tabular text-emerald-300 font-semibold">{formatNaira(plan.netCycleBalance)}</span>
          </div>
          <div className="flex justify-between mt-1 text-[11px] text-emerald-400 font-medium">
            <span>Term 1 Fee Coverage:</span>
            <span>100% Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Pay Action Button */}
      <button
        onClick={() => setIsPaystackOpen(true)}
        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-[0.98] transition-all"
      >
        <CreditCard className="w-4 h-4" />
        <span>Pay {formatNaira(plan.totalUpfront)} via Paystack</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Trust & Regulatory Reassurance */}
      <div className="p-3 bg-neutral-100/70 rounded-xl border border-neutral-200 text-[11px] text-neutral-600 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p>
          Funds are held in a ring-fenced educational trust account backed by NDIC underwriting and SCUML/EFCC compliance.
        </p>
      </div>

      {/* Modals */}
      <PaystackModal
        isOpen={isPaystackOpen}
        amount={plan.totalUpfront}
        email="adebayo.oladipo@lagosgroup.ng"
        reference={`SKP-UPFRONT-${Date.now()}`}
        onSuccess={handlePaystackSuccess}
        onClose={() => setIsPaystackOpen(false)}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        data={{
          parentName: 'Alhaji Adebayo Oladipo',
          studentName: 'Zainab Kemi Oladipo',
          schoolName: 'Corona Secondary School, Agbara',
          annualFees: plan.annualFees,
          principalInvested: plan.principalAmount,
          certificateNumber: 'CERT-SKP-2026-9041',
          issueDate: '25 Sep 2026'
        }}
      />

      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        title="Upload Previous Fee Voucher"
        description="Attach receipt from last term to verify student enrollment and fee tier."
        onSuccess={(name) => {
          setVoucherUploaded(true);
          setVoucherFileName(name);
        }}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};
