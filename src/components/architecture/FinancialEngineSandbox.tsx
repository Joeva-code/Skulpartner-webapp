import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  PieChart, 
  Sliders, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { computeInvestmentPlan, formatNaira, formatCompactNaira } from '../../utils/financial';

export const FinancialEngineSandbox: React.FC = () => {
  const [term1, setTerm1] = useState(65000);
  const [term2, setTerm2] = useState(42000);
  const [term3, setTerm3] = useState(42000);
  const [dailyRoi, setDailyRoi] = useState(0.008); // 0.8%
  const [cycleDays, setCycleDays] = useState(123); // Cycle 1 default
  const [maintenanceOption, setMaintenanceOption] = useState<number>(4500);

  const plan = computeInvestmentPlan(term1, term2, term3, dailyRoi, cycleDays, maintenanceOption);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">MATHEMATICAL MODEL SANDBOX</div>
            <h2 className="text-xl font-bold text-neutral-900 mt-0.5">PRD Financial Calculation & Waterfall Simulator</h2>
            <p className="text-xs text-neutral-600 mt-1 max-w-2xl leading-relaxed">
              Verify the exact "Pay Once, Study Free" economics: 70% upfront payment, 0.8%–1.0% daily ROI, 10% commission, and the 58.1% / 41.9% partner waterfall.
            </p>
          </div>
          <button
            onClick={() => {
              setTerm1(65000);
              setTerm2(42000);
              setTerm3(42000);
              setDailyRoi(0.008);
              setCycleDays(123);
              setMaintenanceOption(4500);
            }}
            className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-colors self-start md:self-center"
          >
            Reset to PRD Benchmark (₦149k)
          </button>
        </div>
      </div>

      {/* Simulator Inputs & Key Upfront Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Input Sliders & Controls */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
            <Sliders className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-neutral-900">Configurable Model Parameters</h3>
          </div>

          {/* Term Fees Inputs */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">Tuition Fees Schedule</span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-neutral-600 mb-1 font-semibold">Term 1 (₦)</label>
                <input
                  type="number"
                  value={term1}
                  onChange={(e) => setTerm1(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-2 border border-neutral-300 rounded-lg text-xs font-mono-tabular font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-600 mb-1 font-semibold">Term 2 (₦)</label>
                <input
                  type="number"
                  value={term2}
                  onChange={(e) => setTerm2(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-2 border border-neutral-300 rounded-lg text-xs font-mono-tabular font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-neutral-600 mb-1 font-semibold">Term 3 (₦)</label>
                <input
                  type="number"
                  value={term3}
                  onChange={(e) => setTerm3(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-2 border border-neutral-300 rounded-lg text-xs font-mono-tabular font-bold"
                />
              </div>
            </div>
            <div className="text-[11px] text-neutral-500 flex justify-between font-mono-tabular">
              <span>Annual Tuition Total:</span>
              <span className="font-bold text-neutral-900">{formatNaira(plan.annualFees)}</span>
            </div>
          </div>

          {/* Daily ROI Slider (0.8% - 1.0%) */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-neutral-800">Daily ROI Rate:</span>
              <span className="font-mono-tabular font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                {(dailyRoi * 100).toFixed(2)}% / day
              </span>
            </div>
            <input
              type="range"
              min={0.008}
              max={0.010}
              step={0.0005}
              value={dailyRoi}
              onChange={(e) => setDailyRoi(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono-tabular">
              <span>0.80% (Conservative)</span>
              <span>0.90%</span>
              <span>1.00% (Aggressive)</span>
            </div>
          </div>

          {/* Cycle Days Buttons */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <span className="text-[11px] font-bold text-neutral-800 block">Cycle Duration</span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { days: 123, label: 'Cycle 1 (123d)' },
                { days: 121, label: 'Cycle 2/3 (121d)' },
                { days: 183, label: 'A-Level (183d)' },
              ].map((c) => (
                <button
                  key={c.days}
                  onClick={() => setCycleDays(c.days)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                    cycleDays === c.days
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Maintenance Fee Toggle (₦4,500 vs ₦500) */}
          <div className="space-y-2 pt-2 border-t border-neutral-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-neutral-800">Maintenance Fee (Open Question):</span>
              <span className="font-mono-tabular font-bold text-neutral-900">{formatNaira(maintenanceOption)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMaintenanceOption(4500)}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  maintenanceOption === 4500 ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-neutral-50 text-neutral-600'
                }`}
              >
                ₦4,500 Option (Standard)
              </button>
              <button
                onClick={() => setMaintenanceOption(500)}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  maintenanceOption === 500 ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-neutral-50 text-neutral-600'
                }`}
              >
                ₦500 Option (Discounted)
              </button>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Results & Complete Waterfall */}
        <div className="lg:col-span-7 space-y-6">
          {/* Total Upfront Parent Requirement Card */}
          <div className="bg-neutral-900 text-white rounded-3xl p-6 shadow-xl border border-neutral-800 space-y-4">
            <div className="flex justify-between items-start border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">UPFRONT INVESTMENT SUMMARY</span>
                <h3 className="text-base font-bold text-white mt-0.5">Parent Payment at Inception</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400">Total Upfront to Pay</span>
                <div className="text-2xl font-bold font-mono-tabular text-emerald-400">
                  {formatNaira(plan.totalUpfront)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-neutral-400 block mb-0.5">Principal (70%)</span>
                <div className="font-mono-tabular font-bold text-white text-sm">{formatNaira(plan.principalAmount)}</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-neutral-400 block mb-0.5">Insurance (1.5%)</span>
                <div className="font-mono-tabular font-bold text-neutral-200 text-sm">{formatNaira(plan.insuranceFee)}</div>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-neutral-400 block mb-0.5">Maintenance</span>
                <div className="font-mono-tabular font-bold text-neutral-200 text-sm">{formatNaira(plan.maintenanceFee)}</div>
              </div>
            </div>

            {/* Cycle Accrual & Net Balance */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Daily Profit Generated:</span>
                <span className="font-mono-tabular font-bold text-emerald-400">+{formatNaira(plan.dailyProfit)} / day</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Gross Cycle Accrual ({cycleDays} days):</span>
                <span className="font-mono-tabular font-bold text-white">{formatNaira(plan.totalCycleProfit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Platform Payout Commission (10%):</span>
                <span className="font-mono-tabular text-neutral-400">-{formatNaira(plan.payoutCommission)}</span>
              </div>
              <div className="flex justify-between text-emerald-300 font-bold text-sm pt-1 border-t border-white/10">
                <span>Net Available for Term 1 Fee:</span>
                <span className="font-mono-tabular">+{formatNaira(plan.netCycleBalance)}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Term 1 Fee Due:</span>
                <span className="font-mono-tabular">{formatNaira(term1)}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-400 pt-1 border-t border-white/10">
                <span>Surplus Remaining (Returns to Pool):</span>
                <span className="font-mono-tabular">+{formatNaira(Math.max(0, plan.surplusAfterTerm1))}</span>
              </div>
            </div>
          </div>

          {/* Profit Distribution Waterfall Card (From PRD: 58.1% School / 41.9% Platform) */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-neutral-900">PRD Profit Distribution & Partner Waterfall</h3>
              </div>
              <span className="text-[10px] font-bold text-neutral-500 uppercase font-mono">
                Total Yield: {formatCompactNaira(plan.totalCycleProfit)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">School Fees Allocation</span>
                  <span className="font-mono font-bold text-xs bg-emerald-200 px-1.5 py-0.5 rounded">58.1%</span>
                </div>
                <div className="text-base font-bold font-mono-tabular mt-1 text-emerald-900">
                  {formatNaira((plan.totalCycleProfit * 58.1) / 100)}
                </div>
                <p className="text-[10px] text-emerald-700 mt-1">Guarantees 100% full-year tuition coverage for student.</p>
              </div>

              <div className="p-3 bg-neutral-100 rounded-xl border border-neutral-200 text-neutral-900">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">Platform Allocation</span>
                  <span className="font-mono font-bold text-xs bg-neutral-300 px-1.5 py-0.5 rounded">41.9%</span>
                </div>
                <div className="text-base font-bold font-mono-tabular mt-1 text-neutral-900">
                  {formatNaira(plan.platformShareAmount)}
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">Operating revenue, partner split & liquidity reserve.</p>
              </div>
            </div>

            {/* Platform Sub-Distribution Waterfall (PRD Exact Breakdown) */}
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 text-xs">
              <div className="text-[10px] uppercase font-bold text-neutral-400">PLATFORM REVENUE SHARE WATERFALL (41.9%)</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono-tabular text-[11px]">
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Lead Partner (15%)</span>
                  <span className="font-bold text-neutral-900">{formatNaira(plan.platformSplit.leadPartner)}</span>
                </div>
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Consultant (10%)</span>
                  <span className="font-bold text-neutral-900">{formatNaira(plan.platformSplit.consultantPartner)}</span>
                </div>
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Investment Partner (10%)</span>
                  <span className="font-bold text-neutral-900">{formatNaira(plan.platformSplit.investmentPartner)}</span>
                </div>
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Managing Partners (25%)</span>
                  <span className="font-bold text-neutral-900">{formatNaira(plan.platformSplit.managingPartners)}</span>
                </div>
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Salaries & Ops (20%)</span>
                  <span className="font-bold text-neutral-900">{formatNaira(plan.platformSplit.salariesAndRunning)}</span>
                </div>
                <div className="p-2 bg-white rounded border border-neutral-200">
                  <span className="text-[10px] text-neutral-500 block">Liquidity Reserve (20%)</span>
                  <span className="font-bold text-neutral-900">{formatNaira(plan.platformSplit.liquidityCosts)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
