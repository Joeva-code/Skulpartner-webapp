import React from 'react';
import { 
  ArrowUpRight, 
  Clock, 
  ChevronRight, 
  Bell, 
  GraduationCap, 
  CheckCircle2, 
  TrendingUp, 
  FileText, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { ParentUser, Beneficiary, InvestmentCycle, Transaction } from '../../types';
import { formatNaira, formatCompactNaira } from '../../utils/financial';

interface ScreenHomeProps {
  parent: ParentUser;
  beneficiary: Beneficiary;
  cycle: InvestmentCycle;
  transactions: Transaction[];
  onNavigate: (tab: string) => void;
  onOpenReceipt: () => void;
  onOpenCertificate: () => void;
  isWireframeMode?: boolean;
}

export const ScreenHome: React.FC<ScreenHomeProps> = ({
  parent,
  beneficiary,
  cycle,
  transactions,
  onNavigate,
  onOpenReceipt,
  onOpenCertificate,
  isWireframeMode = false
}) => {
  const progressPercent = Math.min(100, Math.round((cycle.currentDay / cycle.durationDays) * 100));
  const daysRemaining = Math.max(0, cycle.durationDays - cycle.currentDay);

  // SVG circular calculation for clock model
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className={`space-y-4 pb-20 ${isWireframeMode ? 'font-mono text-neutral-800' : ''}`}>
      {/* Top Greeting Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img 
              src={parent.avatarUrl || '/src/assets/images/parent_avatar_adebayo_1790332256792.jpg'} 
              alt={parent.fullName}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border-2 border-emerald-600/40"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" title="KYC Verified" />
          </div>
          <div>
            <div className="text-[11px] text-neutral-500 font-medium">Welcome back,</div>
            <h2 className="text-sm font-bold text-neutral-900 leading-tight">{parent.fullName}</h2>
            <div className="text-[10px] text-neutral-400 font-mono-tabular">ID: {parent.userId}</div>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('notifications')}
          className="relative p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full ring-2 ring-white" />
        </button>
      </div>

      {/* Hero Financial Summary Card */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-neutral-900 text-white rounded-3xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold">Active Educational Escrow</div>
            <div className="text-2xl font-bold font-mono-tabular mt-0.5 tracking-tight">
              {formatNaira(cycle.principalAmount)}
            </div>
            <div className="text-[11px] text-emerald-200/80 mt-0.5">
              70% upfront payment · 100% full-year tuition covered
            </div>
          </div>
          <button 
            onClick={onOpenCertificate}
            className="text-[10px] bg-white/10 hover:bg-white/20 text-emerald-100 px-2.5 py-1 rounded-full border border-white/15 flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            Certificate
          </button>
        </div>

        {/* 2-Column Mini Stat Strip */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
          <div className="bg-white/5 rounded-xl p-2.5">
            <div className="text-[10px] text-neutral-300">Accrued Term Yield (Net)</div>
            <div className="text-sm font-bold font-mono-tabular text-emerald-300 mt-0.5">
              +{formatNaira(cycle.netBalance)}
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>@ 0.8% daily ROI</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-2.5">
            <div className="text-[10px] text-neutral-300">Next School Disbursement</div>
            <div className="text-sm font-bold font-mono-tabular text-white mt-0.5">
              {formatNaira(cycle.termFeeDue)}
            </div>
            <div className="text-[10px] text-emerald-300 mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Fund Ready for Payout</span>
            </div>
          </div>
        </div>

        {/* Primary Action Button inside Hero */}
        <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
          <button
            onClick={() => onNavigate('school_fees')}
            className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-transform"
          >
            <span>Disburse Term 1 Fees</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('cycle_tracker')}
            className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Tracker</span>
          </button>
        </div>
      </div>

      {/* Clock Model Cycle Progress Card */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-neutral-900">Cycle 1 Clock Progress</h3>
              <p className="text-[10px] text-neutral-500">{cycle.durationDays}-Day Termly Yield Cycle</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('cycle_tracker')}
            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5"
          >
            Details <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Circular Clock Visualizer and Stats */}
        <div className="flex items-center gap-4 py-2">
          {/* Circular Progress Ring */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="9"
                fill="transparent"
              />
              <circle
                cx="56"
                cy="56"
                r={radius}
                stroke="#059669"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black font-mono-tabular text-neutral-900 leading-none">
                {progressPercent}%
              </span>
              <span className="text-[9px] uppercase font-bold text-neutral-400 mt-1">
                Day {cycle.currentDay}/{cycle.durationDays}
              </span>
            </div>
          </div>

          {/* Accrual Breakdown Column */}
          <div className="flex-1 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 text-[11px]">Daily ROI Rate:</span>
              <span className="font-semibold text-neutral-900 font-mono-tabular">0.8% / day</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 text-[11px]">Daily Profit:</span>
              <span className="font-bold text-emerald-700 font-mono-tabular">+{formatNaira(cycle.dailyProfit)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 text-[11px]">Gross Accrued:</span>
              <span className="font-semibold text-neutral-900 font-mono-tabular">{formatNaira(cycle.totalProfitAccrued)}</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-neutral-100">
              <span className="text-neutral-500 text-[11px]">Days Remaining:</span>
              <span className="font-bold text-neutral-800 font-mono-tabular">{daysRemaining} days left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Beneficiary Student Card */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">BENEFICIARY COVERAGE</div>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Active Student
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img 
            src={beneficiary.avatarUrl || '/src/assets/images/student_avatar_zainab_1790332269355.jpg'} 
            alt={beneficiary.fullName}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-neutral-900 truncate">{beneficiary.fullName}</h4>
            <p className="text-[11px] text-neutral-600 truncate">{beneficiary.schoolName}</p>
            <div className="text-[10px] text-neutral-400 mt-0.5">{beneficiary.classLevel}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] text-neutral-400">Annual Tuition</div>
            <div className="text-xs font-bold font-mono-tabular text-neutral-900">{formatCompactNaira(beneficiary.annualFees)}</div>
          </div>
        </div>
      </div>

      {/* Quick Service Action Grid */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <button
          onClick={() => onNavigate('school_fees')}
          className="bg-white hover:bg-neutral-50 p-2.5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col items-center justify-center transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold text-neutral-800 leading-tight">Pay Fees</span>
        </button>

        <button
          onClick={() => onNavigate('investment_setup')}
          className="bg-white hover:bg-neutral-50 p-2.5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col items-center justify-center transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-1.5">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold text-neutral-800 leading-tight">New Plan</span>
        </button>

        <button
          onClick={() => onNavigate('wallet')}
          className="bg-white hover:bg-neutral-50 p-2.5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col items-center justify-center transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold text-neutral-800 leading-tight">Statement</span>
        </button>

        <button
          onClick={() => onNavigate('lifecycle_protocols')}
          className="bg-white hover:bg-neutral-50 p-2.5 rounded-2xl border border-neutral-200/80 shadow-xs flex flex-col items-center justify-center transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-1.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-semibold text-neutral-800 leading-tight">Protocols</span>
        </button>
      </div>

      {/* Recent Ledger Activity */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-neutral-900">Recent Transactions</h3>
          <button 
            onClick={() => onNavigate('wallet')}
            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View all
          </button>
        </div>

        <div className="space-y-3">
          {transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  tx.type === 'daily_roi' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-700'
                }`}>
                  {tx.type === 'daily_roi' ? <TrendingUp className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 line-clamp-1">{tx.description}</div>
                  <div className="text-[10px] text-neutral-400">{tx.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold font-mono-tabular ${
                  tx.type === 'daily_roi' ? 'text-emerald-700' : 'text-neutral-900'
                }`}>
                  {tx.type === 'daily_roi' ? '+' : ''}{formatNaira(tx.amount)}
                </div>
                <div className="text-[9px] text-emerald-600 font-medium">Completed</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
