import React, { useState } from 'react';
import { 
  Calculator, 
  UploadCloud, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  FileCheck, 
  Award, 
  CreditCard,
  Building2,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';
import { computeInvestmentPlan, formatNaira } from '../../utils/financial';
import { PaystackModal } from '../modals/PaystackModal';
import { CertificateModal } from '../modals/CertificateModal';
import { DocumentUploadModal } from '../modals/DocumentUploadModal';

interface WebInvestmentSetupProps {
  onNavigate: (tab: string) => void;
}

export const WebInvestmentSetup: React.FC<WebInvestmentSetupProps> = ({ onNavigate }) => {
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
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">EDUCATIONAL INVESTMENT ENGINE</div>
          <h2 className="text-xl font-bold text-neutral-900 mt-0.5">Set Up "Pay Once, Study Free" Plan</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Deposit 70% of your child’s annual school fees upfront. Our escrow yield pays 100% of all termly tuition fees directly to the school.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>NDIC Insured Escrow</span>
          </span>
        </div>
      </div>

      {paymentSuccessRef && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-950 flex items-start gap-4">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-sm">Educational Escrow Funded Successfully!</h3>
            <p className="text-xs text-emerald-800 mt-1">
              Payment reference: <span className="font-mono font-bold">{paymentSuccessRef}</span>. Cycle 1 yield has commenced at 0.8% daily ROI.
            </p>
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={() => setIsCertificateOpen(true)}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>View Official Investment Certificate</span>
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-xs font-semibold text-emerald-800 hover:underline"
              >
                Return to Dashboard →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main 2-Column Desktop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Fee Input & Voucher */}
        <div className="lg:col-span-6 space-y-5">
          {/* Step 1: Tuition Schedule Input */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400">STEP 1 OF 3</span>
                <h3 className="text-sm font-bold text-neutral-900 mt-0.5">Enter Termly Tuition Schedule</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400">Annual Total</span>
                <div className="text-base font-bold font-mono-tabular text-neutral-900">{formatNaira(plan.annualFees)}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Term 1 Fee (₦)</label>
                <input
                  type="number"
                  value={term1}
                  onChange={(e) => setTerm1(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs font-mono-tabular font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Term 2 Fee (₦)</label>
                <input
                  type="number"
                  value={term2}
                  onChange={(e) => setTerm2(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs font-mono-tabular font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Term 3 Fee (₦)</label>
                <input
                  type="number"
                  value={term3}
                  onChange={(e) => setTerm3(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs font-mono-tabular font-bold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[11px] text-neutral-500">
              * Enter the exact figures from your school bill or invoice.
            </p>
          </div>

          {/* Step 2: Voucher Verification */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400">STEP 2 OF 3</span>
                <h3 className="text-sm font-bold text-neutral-900 mt-0.5">Attach Previous Fee Voucher</h3>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                voucherUploaded ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {voucherUploaded ? 'Verified' : 'Upload Required'}
              </span>
            </div>

            {voucherUploaded ? (
              <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-neutral-900 block">{voucherFileName}</span>
                    <span className="text-[10px] text-neutral-400">OCR & Enrollment Verified</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="text-xs text-emerald-700 font-semibold hover:underline"
                >
                  Replace File
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="w-full py-6 border-2 border-dashed border-neutral-300 hover:border-emerald-600 rounded-2xl flex flex-col items-center justify-center gap-1 text-xs text-neutral-600 transition-colors"
              >
                <UploadCloud className="w-6 h-6 text-neutral-400" />
                <span className="font-semibold text-neutral-800">Upload Previous Term Fee Receipt or Voucher</span>
                <span className="text-[10px] text-neutral-400">PDF, JPG, or PNG (Max 10MB)</span>
              </button>
            )}
          </div>
        </div>

        {/* Right 6 Cols: Calculation Card & Checkout Trigger */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-neutral-900 text-white rounded-3xl p-6 shadow-xl border border-neutral-800 space-y-4">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">PRD COMPUTATION BREAKDOWN</span>
                <h3 className="text-base font-bold text-white mt-0.5">What You Pay Upfront</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400">Total Upfront</span>
                <div className="text-2xl font-bold font-mono-tabular text-emerald-400">
                  {formatNaira(plan.totalUpfront)}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs divide-y divide-white/5">
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-300">1. Annual Tuition Total:</span>
                <span className="font-mono-tabular text-neutral-200">{formatNaira(plan.annualFees)}</span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-neutral-300">2. Investment Principal (70%):</span>
                <span className="font-mono-tabular font-bold text-emerald-300">{formatNaira(plan.principalAmount)}</span>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="text-neutral-300">3. Insurance Guarantee (1.5%):</span>
                <span className="font-mono-tabular text-neutral-200">{formatNaira(plan.insuranceFee)}</span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-300">4. Platform Maintenance Fee:</span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-neutral-400 font-mono">
                    PRD Option
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMaintenanceFeeOption(4500)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors ${
                      maintenanceFeeOption === 4500 ? 'bg-emerald-600 text-white' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    ₦4,500
                  </button>
                  <button
                    onClick={() => setMaintenanceFeeOption(500)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors ${
                      maintenanceFeeOption === 500 ? 'bg-emerald-600 text-white' : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    ₦500
                  </button>
                </div>
              </div>
            </div>

            {/* Projected Yield Projection */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="text-[10px] uppercase font-bold text-neutral-400">Cycle 1 Projected Output</div>
              <div className="flex justify-between">
                <span className="text-neutral-300">Daily ROI Yield @ 0.8%:</span>
                <span className="font-mono-tabular font-bold text-emerald-400">+{formatNaira(plan.dailyProfit)} / day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">123-Day Gross Accrual:</span>
                <span className="font-mono-tabular text-white">{formatNaira(plan.totalCycleProfit)}</span>
              </div>
              <div className="flex justify-between text-emerald-300 font-bold pt-1 border-t border-white/10">
                <span>Net Return (After 10% Platform Fee):</span>
                <span className="font-mono-tabular">+{formatNaira(plan.netCycleBalance)}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={() => setIsPaystackOpen(true)}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay {formatNaira(plan.totalUpfront)} with Paystack</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
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
