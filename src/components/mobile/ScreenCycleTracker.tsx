import React from 'react';
import { 
  Clock, 
  Calendar, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  Info,
  Layers
} from 'lucide-react';
import { InvestmentCycle } from '../../types';
import { formatNaira } from '../../utils/financial';

interface ScreenCycleTrackerProps {
  cycle: InvestmentCycle;
  onNavigate: (tab: string) => void;
  isWireframeMode?: boolean;
}

export const ScreenCycleTracker: React.FC<ScreenCycleTrackerProps> = ({
  cycle,
  onNavigate,
  isWireframeMode = false
}) => {
  const percentComplete = Math.min(100, Math.round((cycle.currentDay / cycle.durationDays) * 100));
  const daysLeft = Math.max(0, cycle.durationDays - cycle.currentDay);

  // Circular clock model
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentComplete / 100) * circumference;

  return (
    <div className={`space-y-4 pb-20 ${isWireframeMode ? 'font-mono' : ''}`}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-neutral-900 leading-tight">Investment Cycle Tracker</h2>
          <p className="text-[11px] text-neutral-500">Termly Accrual Clock & Yield Milestone Monitor</p>
        </div>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full uppercase">
          Cycle 1 Active
        </span>
      </div>

      {/* Main Clock Model Hero Card */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm text-center relative overflow-hidden">
        {/* Header Metadata */}
        <div className="flex justify-between items-center text-xs text-neutral-500 mb-4 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>{cycle.startDate} → {cycle.endDate}</span>
          </div>
          <div className="font-semibold text-neutral-800">{cycle.durationDays}-Day Session</div>
        </div>

        {/* Large Circular Clock */}
        <div className="relative w-48 h-48 mx-auto my-2 flex items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            {/* Background Track */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#F3F4F6"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Target 100% Marker Line */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#D1D5DB"
              strokeWidth="12"
              strokeDasharray="4 8"
              fill="transparent"
            />
            {/* Active Accrual Stroke */}
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="#059669"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Metrics */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black font-mono-tabular text-neutral-900 tracking-tight">
              {percentComplete}%
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mt-0.5">
              Day {cycle.currentDay} of {cycle.durationDays}
            </span>
            <span className="text-[10px] text-neutral-400 mt-1 font-mono-tabular">
              {daysLeft} days remaining
            </span>
          </div>
        </div>

        {/* Live Daily Growth Pacer */}
        <div className="mt-4 p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-left">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-800">Daily ROI Accrual</div>
              <div className="font-bold text-neutral-900 font-mono-tabular">+{formatNaira(cycle.dailyProfit)} / day</div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-neutral-500">Configured Rate</span>
            <div className="text-xs font-bold text-emerald-700">0.80% / day</div>
          </div>
        </div>
      </div>

      {/* Financial Ledger & Term Target Coverage */}
      <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400">FINANCIAL ENGINE METRICS</div>
            <div className="text-sm font-bold text-white mt-0.5">Yield Accumulation Breakdown</div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
            Term 1 Funded
          </span>
        </div>

        <div className="space-y-2 text-xs divide-y divide-white/5">
          <div className="flex justify-between py-1">
            <span className="text-neutral-400">Invested Principal (70%):</span>
            <span className="font-mono-tabular font-bold text-white">{formatNaira(cycle.principalAmount)}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-neutral-400">Gross Accrued Profit ({cycle.currentDay} days):</span>
            <span className="font-mono-tabular font-bold text-emerald-400">+{formatNaira(cycle.totalProfitAccrued)}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-neutral-400">Payout Commission (10%):</span>
            <span className="font-mono-tabular text-neutral-400">-{formatNaira(cycle.payoutCommissionAccrued)}</span>
          </div>

          <div className="flex justify-between py-1.5 font-bold text-sm text-emerald-300">
            <span>Net Available Balance:</span>
            <span className="font-mono-tabular">+{formatNaira(cycle.netBalance)}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-neutral-400">Term 1 School Fee Due:</span>
            <span className="font-mono-tabular text-white">{formatNaira(cycle.termFeeDue)}</span>
          </div>
        </div>

        {/* Ready for Disbursement CTA */}
        <div className="pt-2">
          <button
            onClick={() => onNavigate('school_fees')}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-[0.98]"
          >
            <span>Proceed to School Fee Disbursement</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cycle Rules & Calendar Specification (From PRD) */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-700" />
          <h3 className="text-xs font-bold text-neutral-900">Standard Cycle Architecture</h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex justify-between items-center">
            <div>
              <div className="font-bold text-emerald-950">Cycle 1 (1st Term)</div>
              <div className="text-[10px] text-emerald-700">123 Days · Jul – Nov</div>
            </div>
            <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">
              Current Cycle
            </span>
          </div>

          <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl flex justify-between items-center text-neutral-600">
            <div>
              <div className="font-semibold text-neutral-900">Cycle 2 (2nd Term)</div>
              <div className="text-[10px] text-neutral-400">121 Days · Nov – Mar</div>
            </div>
            <span className="text-[10px] text-neutral-400">Upcoming</span>
          </div>

          <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl flex justify-between items-center text-neutral-600">
            <div>
              <div className="font-semibold text-neutral-900">Cycle 3 (3rd Term)</div>
              <div className="text-[10px] text-neutral-400">121 Days · Mar – Jul</div>
            </div>
            <span className="text-[10px] text-neutral-400">Upcoming</span>
          </div>

          <div className="p-2 bg-neutral-100/60 rounded-lg text-[10px] text-neutral-500">
            * Note: A-Level programs run in special twin cycles (183 days + 182 days) with dedicated Cambridge curriculum fee schedules.
          </div>
        </div>
      </div>
    </div>
  );
};
