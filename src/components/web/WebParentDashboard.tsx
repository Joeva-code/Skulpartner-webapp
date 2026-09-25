import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ChevronRight, 
  Award, 
  GraduationCap, 
  Building2, 
  Wallet,
  Sparkles,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { ParentUser, Beneficiary, InvestmentCycle, Transaction } from '../../types';
import { formatNaira, formatCompactNaira } from '../../utils/financial';

interface WebParentDashboardProps {
  parent: ParentUser;
  beneficiary: Beneficiary;
  cycle: InvestmentCycle;
  transactions: Transaction[];
  onNavigate: (tab: string) => void;
  onOpenReceipt: () => void;
  onOpenCertificate: () => void;
}

export const WebParentDashboard: React.FC<WebParentDashboardProps> = ({
  parent,
  beneficiary,
  cycle,
  transactions,
  onNavigate,
  onOpenReceipt,
  onOpenCertificate,
}) => {
  const percentComplete = Math.min(100, Math.round((cycle.currentDay / cycle.durationDays) * 100));
  const daysLeft = Math.max(0, cycle.durationDays - cycle.currentDay);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentComplete / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Top Welcome & Trust Strip */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img 
            src={parent.avatarUrl || '/src/assets/images/parent_avatar_adebayo_1790332256792.jpg'} 
            alt={parent.fullName}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-neutral-900">{parent.fullName}</h2>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                KYC Tier 2 Verified
              </span>
            </div>
            <div className="text-xs text-neutral-500 mt-1 flex items-center gap-3">
              <span className="font-mono-tabular">ID: {parent.userId}</span>
              <span>·</span>
              <span>Beneficiary: <strong className="text-neutral-800">{beneficiary.fullName}</strong> ({beneficiary.classLevel})</span>
              <span>·</span>
              <span>{beneficiary.schoolName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center">
          <button
            onClick={onOpenCertificate}
            className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Investment Certificate</span>
          </button>
          <button
            onClick={() => onNavigate('investment_setup')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Add Beneficiary / Plan</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase font-bold text-neutral-400">Total Upfront Capital</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-neutral-900 mt-2">
            {formatNaira(cycle.principalAmount)}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>70% of Annual Fees (100% Tuition Covered)</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase font-bold text-neutral-400">Accrued Cycle Net Yield</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-emerald-700 mt-2">
            +{formatNaira(cycle.netBalance)}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1 flex items-center gap-1">
            <span>+{formatNaira(cycle.dailyProfit)} / day (@ 0.8% ROI)</span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase font-bold text-neutral-400">Term 1 School Payment</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-neutral-900 mt-2">
            {formatNaira(cycle.termFeeDue)}
          </div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">
            ✓ 100% Funded & Ready for Settlement
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase font-bold text-neutral-400">Cycle 1 Clock Status</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-neutral-900 mt-2">
            Day {cycle.currentDay} / {cycle.durationDays}
          </div>
          <div className="text-[11px] text-neutral-500 mt-1">
            {daysLeft} days remaining in Term 1 cycle
          </div>
        </div>
      </div>

      {/* Main 2-Column Split: Clock & Workflow Card vs Beneficiary & Settlement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Investment Cycle Clock & Yield Accumulator */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
            <div>
              <div className="text-[10px] uppercase font-bold text-neutral-400">PRD 123-DAY CYCLE ENGINE</div>
              <h3 className="text-base font-bold text-neutral-900 mt-0.5">Circular Clock Progress & Yield Accrual</h3>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Cycle 1 of 3 Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Clock Visualizer */}
            <div className="flex flex-col items-center justify-center p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth="11"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="#059669"
                    strokeWidth="11"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black font-mono-tabular text-neutral-900">
                    {percentComplete}%
                  </span>
                  <span className="text-[9px] uppercase font-bold text-neutral-500 mt-0.5">
                    Day {cycle.currentDay}/{cycle.durationDays}
                  </span>
                </div>
              </div>
              <div className="text-xs text-neutral-500 mt-3 text-center">
                {cycle.startDate} → {cycle.endDate}
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Configured Daily ROI:</span>
                <span className="font-bold text-neutral-900 font-mono-tabular">0.80% / day</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Daily Profit Credit:</span>
                <span className="font-bold text-emerald-700 font-mono-tabular">+{formatNaira(cycle.dailyProfit)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Gross Accrued Profit ({cycle.currentDay}d):</span>
                <span className="font-bold text-neutral-900 font-mono-tabular">{formatNaira(cycle.totalProfitAccrued)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500">Platform Payout Fee (10%):</span>
                <span className="font-semibold text-neutral-500 font-mono-tabular">-{formatNaira(cycle.payoutCommissionAccrued)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold text-sm text-emerald-800">
                <span>Net Escrow Yield:</span>
                <span className="font-mono-tabular">+{formatNaira(cycle.netBalance)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-950">Term 1 School Fee Settlement Available</div>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Yield fully satisfies ₦65,000 required for Corona Secondary School Term 1 fees.
              </p>
            </div>
            <button
              onClick={() => onNavigate('school_fees')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Disburse to School</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Beneficiary School Profile & Direct Settlement Preview */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
            <h3 className="text-base font-bold text-neutral-900">Enrolled Student & School</h3>
            <span className="text-[11px] font-semibold text-neutral-500">Session 2026/2027</span>
          </div>

          {/* Student Profile Card */}
          <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
            <img 
              src={beneficiary.avatarUrl || '/src/assets/images/student_avatar_zainab_1790332269355.jpg'} 
              alt={beneficiary.fullName}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover border border-neutral-200"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-neutral-900 truncate">{beneficiary.fullName}</h4>
              <p className="text-xs text-neutral-600 truncate">{beneficiary.schoolName}</p>
              <div className="text-[11px] text-neutral-500 mt-0.5">{beneficiary.classLevel}</div>
            </div>
          </div>

          {/* School Bursary Bank Details */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs space-y-2">
            <div className="text-[10px] uppercase font-bold text-neutral-400">SCHOOL BURSARY BANK WIRE ROUTING</div>
            <div className="flex justify-between text-neutral-600">
              <span>Institution Bank:</span>
              <span className="font-semibold text-neutral-900">{beneficiary.schoolAccountDetails.bankName}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Account Number:</span>
              <span className="font-mono-tabular font-bold text-neutral-900">{beneficiary.schoolAccountDetails.accountNumber}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Account Name:</span>
              <span className="font-semibold text-neutral-900 truncate max-w-[180px]">{beneficiary.schoolAccountDetails.accountName}</span>
            </div>
          </div>

          {/* Recent Direct Disbursement Receipt CTA */}
          <div className="p-4 bg-neutral-900 text-white rounded-2xl space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-emerald-400">Electronic Payment Certificate</span>
              <span className="text-[10px] text-neutral-400">Ref: SKP-DISB-CRN-2026-01</span>
            </div>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Term 1 settlement has been acknowledged by Corona Secondary School bursary with official stamp #CRN-2026-SS2-0941.
            </p>
            <button
              onClick={onOpenReceipt}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Official Electronic Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ledger Table: Recent Transactions */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Recent Escrow & Disbursement Ledger</h3>
            <p className="text-xs text-neutral-500">Authoritative audit ledger of all capital, ROI accruals, and settlements.</p>
          </div>
          <button
            onClick={() => onNavigate('wallet')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Transactions</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-2.5 px-3">Date & Time</th>
                <th className="py-2.5 px-3">Reference</th>
                <th className="py-2.5 px-3">Transaction Description</th>
                <th className="py-2.5 px-3">Wallet</th>
                <th className="py-2.5 px-3 text-right">Amount (NGN)</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-50">
                  <td className="py-3 px-3 text-neutral-500 font-mono-tabular">{tx.date}</td>
                  <td className="py-3 px-3 font-mono font-bold text-neutral-700">{tx.reference}</td>
                  <td className="py-3 px-3 font-medium text-neutral-900">{tx.description}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] uppercase font-semibold bg-neutral-100 px-2 py-0.5 rounded text-neutral-700">
                      {tx.wallet}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold font-mono-tabular">
                    <span className={tx.type === 'daily_roi' ? 'text-emerald-700' : 'text-neutral-900'}>
                      {tx.type === 'daily_roi' ? '+' : ''}{formatNaira(tx.amount)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Successful
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
