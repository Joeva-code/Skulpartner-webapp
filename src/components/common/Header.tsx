import React from 'react';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  TrendingUp, 
  GraduationCap, 
  Wallet, 
  Smartphone, 
  Server, 
  Sliders, 
  Building2,
  Lock,
  ChevronDown
} from 'lucide-react';
import { AppViewMode } from '../../types';

interface HeaderProps {
  viewMode: AppViewMode;
  onSelectViewMode: (mode: AppViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ viewMode, onSelectViewMode }) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-neutral-950 font-black text-sm flex items-center justify-center shadow-sm">
            SP
          </div>
          <button
            onClick={() => onSelectViewMode('web_dashboard')}
            className="text-base font-extrabold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap text-left"
          >
            SKULPARTNERS
            <span className="block text-[9px] uppercase tracking-wider text-emerald-400 font-semibold font-mono">
              Pay Once, Study Free
            </span>
          </button>
        </div>

        {/* Primary Web Application Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-neutral-400">
          <button
            onClick={() => onSelectViewMode('web_dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'web_dashboard'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onSelectViewMode('web_investment')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'web_investment'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>70% Investment Plan</span>
          </button>

          <button
            onClick={() => onSelectViewMode('web_disbursement')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'web_disbursement'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>School Payouts</span>
          </button>

          <button
            onClick={() => onSelectViewMode('web_ledger')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'web_ledger'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Dual Wallets & Ledger</span>
          </button>

          <div className="h-4 w-px bg-neutral-800 mx-1" />

          <button
            onClick={() => onSelectViewMode('financial_sandbox')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'financial_sandbox'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Financial Engine</span>
          </button>

          <button
            onClick={() => onSelectViewMode('admin_portal')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'admin_portal'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <span>Admin</span>
          </button>

          <button
            onClick={() => onSelectViewMode('school_portal')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'school_portal'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>School Portal</span>
          </button>

          <button
            onClick={() => onSelectViewMode('mobile_preview')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              viewMode === 'mobile_preview'
                ? 'bg-neutral-800 text-emerald-400 font-bold'
                : 'hover:text-white hover:bg-neutral-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
            <span>Mobile Preview</span>
          </button>
        </nav>

        {/* Regulatory Badge */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 rounded-full text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>NDIC Protected Trust</span>
          </div>

          <div className="text-[10px] text-neutral-400 font-mono-tabular border border-neutral-800 px-2.5 py-1 rounded-lg">
            ₦ NGN
          </div>
        </div>
      </div>

      {/* Responsive Horizontal Scroll Nav for Tablet/Mobile Viewports */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 bg-neutral-900 overflow-x-auto border-t border-neutral-800 text-xs font-semibold">
        <button
          onClick={() => onSelectViewMode('web_dashboard')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${
            viewMode === 'web_dashboard' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onSelectViewMode('web_investment')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${
            viewMode === 'web_investment' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          Invest (70%)
        </button>
        <button
          onClick={() => onSelectViewMode('web_disbursement')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${
            viewMode === 'web_disbursement' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          School Payouts
        </button>
        <button
          onClick={() => onSelectViewMode('web_ledger')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${
            viewMode === 'web_ledger' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          Ledger
        </button>
        <button
          onClick={() => onSelectViewMode('financial_sandbox')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${
            viewMode === 'financial_sandbox' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          Sandbox
        </button>
        <button
          onClick={() => onSelectViewMode('admin_portal')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${
            viewMode === 'admin_portal' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          Admin
        </button>
        <button
          onClick={() => onSelectViewMode('school_portal')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${
            viewMode === 'school_portal' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          School
        </button>
        <button
          onClick={() => onSelectViewMode('mobile_preview')}
          className={`px-3 py-1 rounded-lg whitespace-nowrap ${
            viewMode === 'mobile_preview' ? 'bg-emerald-500 text-neutral-950 font-bold' : 'text-neutral-400'
          }`}
        >
          Mobile
        </button>
      </div>
    </header>
  );
};
