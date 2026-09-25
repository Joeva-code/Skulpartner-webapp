import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  GraduationCap, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  Filter, 
  Search, 
  FileText,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Transaction, InvestmentCycle } from '../../types';
import { formatNaira, formatCompactNaira } from '../../utils/financial';

interface ScreenWalletProps {
  transactions: Transaction[];
  cycle: InvestmentCycle;
  onOpenReceipt: () => void;
  isWireframeMode?: boolean;
}

export const ScreenWallet: React.FC<ScreenWalletProps> = ({
  transactions,
  cycle,
  onOpenReceipt,
  isWireframeMode = false
}) => {
  const [walletTab, setWalletTab] = useState<'investment' | 'disbursement'>('investment');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType !== 'all' && tx.type !== filterType) return false;
    if (searchQuery) {
      return (
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.reference.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className={`space-y-4 pb-20 ${isWireframeMode ? 'font-mono' : ''}`}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-neutral-900 leading-tight">Financial Wallets & Ledger</h2>
          <p className="text-[11px] text-neutral-500">Dual-Wallet Architecture · Capital & Tuition Escrow</p>
        </div>
        <button
          onClick={() => alert('Exporting Official Statement (CSV / PDF)...')}
          className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Statement
        </button>
      </div>

      {/* Dual Wallet Segmented Switcher */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-200/70 rounded-2xl">
        <button
          onClick={() => setWalletTab('investment')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            walletTab === 'investment'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>Investment Wallet</span>
        </button>

        <button
          onClick={() => setWalletTab('disbursement')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            walletTab === 'disbursement'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
          <span>School Payout Wallet</span>
        </button>
      </div>

      {/* Active Wallet Showcase Card */}
      {walletTab === 'investment' ? (
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-emerald-950 text-white rounded-3xl p-5 shadow-xl relative overflow-hidden space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">INVESTMENT CAPITAL WALLET</span>
              <div className="text-2xl font-bold font-mono-tabular mt-0.5">
                {formatNaira(cycle.principalAmount)}
              </div>
              <div className="text-[11px] text-neutral-300 mt-0.5">Original 70% Principal Escrow</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-400">Total Accrued Yield</span>
              <div className="text-base font-bold font-mono-tabular text-emerald-400">
                +{formatNaira(cycle.totalProfitAccrued)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
            <div className="bg-white/5 rounded-xl p-2.5">
              <div className="text-[10px] text-neutral-400">Current Daily Accrual</div>
              <div className="font-bold font-mono-tabular text-white mt-0.5">+{formatNaira(cycle.dailyProfit)} / day</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5">
              <div className="text-[10px] text-neutral-400">Net Return after 10% Fee</div>
              <div className="font-bold font-mono-tabular text-emerald-300 mt-0.5">+{formatNaira(cycle.netBalance)}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-neutral-900 text-white rounded-3xl p-5 shadow-xl relative overflow-hidden space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">BENEFICIARY SCHOOL FEE WALLET</span>
              <div className="text-2xl font-bold font-mono-tabular mt-0.5">
                {formatNaira(cycle.termFeeDue)}
              </div>
              <div className="text-[11px] text-blue-200 mt-0.5">Term 1 Allocation · Corona Secondary</div>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              Funded & Ready
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
            <div className="bg-white/5 rounded-xl p-2.5">
              <div className="text-[10px] text-neutral-400">Remaining Annual Fees</div>
              <div className="font-bold font-mono-tabular text-white mt-0.5">₦84,000.00 (Terms 2 & 3)</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5">
              <div className="text-[10px] text-neutral-400">Surplus Pool Balance</div>
              <div className="font-bold font-mono-tabular text-emerald-300 mt-0.5">+{formatNaira(cycle.netBalance - cycle.termFeeDue > 0 ? cycle.netBalance - cycle.termFeeDue : 0)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search reference, description, fee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-neutral-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Transactions' },
            { id: 'daily_roi', label: 'Daily ROI' },
            { id: 'investment_upfront', label: 'Upfront Capital' },
            { id: 'school_fee_payout', label: 'School Payouts' },
            { id: 'insurance_premium', label: 'Insurance' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1 rounded-lg whitespace-nowrap text-xs font-medium transition-colors ${
                filterType === tab.id
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Feed */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm divide-y divide-neutral-100 overflow-hidden">
        {filteredTransactions.map((tx) => (
          <div key={tx.id} className="p-3.5 hover:bg-neutral-50 transition-colors flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                tx.type === 'daily_roi'
                  ? 'bg-emerald-50 text-emerald-700'
                  : tx.type === 'school_fee_payout'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-neutral-100 text-neutral-700'
              }`}>
                {tx.type === 'daily_roi' && <TrendingUp className="w-4 h-4" />}
                {tx.type === 'school_fee_payout' && <GraduationCap className="w-4 h-4" />}
                {tx.type === 'investment_upfront' && <Wallet className="w-4 h-4" />}
                {tx.type === 'insurance_premium' && <FileText className="w-4 h-4" />}
                {tx.type === 'maintenance_fee' && <FileText className="w-4 h-4" />}
              </div>

              <div>
                <div className="font-semibold text-neutral-900 line-clamp-1">{tx.description}</div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-400 mt-0.5">
                  <span className="font-mono">{tx.reference}</span>
                  <span>·</span>
                  <span>{tx.date}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 ml-3">
              <div className={`font-bold font-mono-tabular ${
                tx.type === 'daily_roi' ? 'text-emerald-700' : 'text-neutral-900'
              }`}>
                {tx.type === 'daily_roi' ? '+' : ''}{formatNaira(tx.amount)}
              </div>
              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Successful
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
