import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  GraduationCap, 
  Download, 
  Search, 
  Filter, 
  FileText,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Transaction, InvestmentCycle } from '../../types';
import { formatNaira } from '../../utils/financial';

interface WebWalletLedgerProps {
  transactions: Transaction[];
  cycle: InvestmentCycle;
  onOpenReceipt: () => void;
}

export const WebWalletLedger: React.FC<WebWalletLedgerProps> = ({
  transactions,
  cycle,
  onOpenReceipt,
}) => {
  const [walletTab, setWalletTab] = useState<'all' | 'investment' | 'disbursement'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = transactions.filter((tx) => {
    if (walletTab !== 'all' && tx.wallet !== walletTab) return false;
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
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">DUAL-WALLET ARCHITECTURE</div>
          <h2 className="text-xl font-bold text-neutral-900 mt-0.5">Financial Wallets & Audit Ledger</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Separates ring-fenced 70% Investment Capital from the School Fee Disbursement Escrow.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting full NIBSS statement in CSV and PDF format...')}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 self-start md:self-center"
        >
          <Download className="w-4 h-4" />
          <span>Download Financial Statement (PDF/CSV)</span>
        </button>
      </div>

      {/* Dual Wallet Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet 1: Investment Capital */}
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-emerald-950 text-white rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">WALLET 1: INVESTMENT ESCROW</span>
              <div className="text-3xl font-bold font-mono-tabular mt-1">
                {formatNaira(cycle.principalAmount)}
              </div>
              <div className="text-xs text-neutral-300 mt-1">Underwritten by NDIC & Cooperative Trust</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-400 uppercase">Current Daily Accrual</span>
              <div className="text-base font-bold font-mono-tabular text-emerald-400 mt-0.5">
                +{formatNaira(cycle.dailyProfit)} / day
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
            <div className="bg-white/5 p-3 rounded-xl">
              <span className="text-[10px] text-neutral-400 block">Gross Accrued Profit</span>
              <span className="font-mono-tabular font-bold text-white text-sm">+{formatNaira(cycle.totalProfitAccrued)}</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl">
              <span className="text-[10px] text-neutral-400 block">Net Return (after 10% fee)</span>
              <span className="font-mono-tabular font-bold text-emerald-300 text-sm">+{formatNaira(cycle.netBalance)}</span>
            </div>
          </div>
        </div>

        {/* Wallet 2: Beneficiary School Fee */}
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-neutral-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300">WALLET 2: BENEFICIARY SCHOOL FEE</span>
              <div className="text-3xl font-bold font-mono-tabular mt-1">
                {formatNaira(cycle.termFeeDue)}
              </div>
              <div className="text-xs text-blue-200 mt-1">Corona Secondary School · Term 1 Fees</div>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
              ✓ 100% Funded
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
            <div className="bg-white/5 p-3 rounded-xl">
              <span className="text-[10px] text-neutral-400 block">Remaining Terms 2 & 3 Fees</span>
              <span className="font-mono-tabular font-bold text-white text-sm">₦84,000.00</span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl">
              <span className="text-[10px] text-neutral-400 block">Accrued Communal Surplus</span>
              <span className="font-mono-tabular font-bold text-emerald-300 text-sm">+{formatNaira(27678)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {/* Segmented Wallet Filter */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => setWalletTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                walletTab === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
              }`}
            >
              All Wallets
            </button>
            <button
              onClick={() => setWalletTab('investment')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                walletTab === 'investment' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
              }`}
            >
              Investment Capital
            </button>
            <button
              onClick={() => setWalletTab('disbursement')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                walletTab === 'disbursement' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
              }`}
            >
              School Disbursements
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search reference or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-2.5 px-3">Date & Time</th>
                <th className="py-2.5 px-3">Reference</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-right">Amount (NGN)</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-neutral-50">
                  <td className="py-3 px-3 text-neutral-500 font-mono-tabular">{tx.date}</td>
                  <td className="py-3 px-3 font-mono font-bold text-neutral-700">{tx.reference}</td>
                  <td className="py-3 px-3 font-medium text-neutral-900">{tx.description}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] uppercase font-semibold bg-neutral-100 px-2 py-0.5 rounded text-neutral-700">
                      {tx.type.replace('_', ' ')}
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
