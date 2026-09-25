import React, { useState } from 'react';
import { 
  Home, 
  TrendingUp, 
  GraduationCap, 
  Wallet, 
  User, 
  Smartphone, 
  Wifi, 
  BatteryMedium, 
  Sparkles,
  Layers,
  ChevronRight,
  Maximize2,
  Sliders
} from 'lucide-react';
import { ParentUser, Beneficiary, InvestmentCycle, Transaction } from '../../types';
import { ScreenHome } from './ScreenHome';
import { ScreenInvestmentSetup } from './ScreenInvestmentSetup';
import { ScreenCycleTracker } from './ScreenCycleTracker';
import { ScreenSchoolFees } from './ScreenSchoolFees';
import { ScreenWallet } from './ScreenWallet';
import { ScreenOnboarding } from './ScreenOnboarding';
import { ScreenNotifications } from './ScreenNotifications';
import { ScreenAccount } from './ScreenAccount';
import { ScreenLifecycleProtocols } from './ScreenLifecycleProtocols';

interface MobileShellProps {
  parent: ParentUser;
  beneficiary: Beneficiary;
  cycle: InvestmentCycle;
  transactions: Transaction[];
  onOpenReceipt: () => void;
  onOpenCertificate: () => void;
}

export const MobileShell: React.FC<MobileShellProps> = ({
  parent,
  beneficiary,
  cycle,
  transactions,
  onOpenReceipt,
  onOpenCertificate,
}) => {
  const [activeScreen, setActiveScreen] = useState<string>('home');
  const [isWireframeMode, setIsWireframeMode] = useState<boolean>(false);
  const [showDeviceFrame, setShowDeviceFrame] = useState<boolean>(true);

  return (
    <div className="flex flex-col xl:flex-row items-start justify-center gap-8 py-2">
      {/* Interactive Controls & Wireframe Selector Sidebar */}
      <div className="w-full xl:w-72 bg-white rounded-3xl p-5 border border-neutral-200/90 shadow-sm space-y-4 shrink-0">
        <div>
          <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">PROTOTYPE CONTROLLER</div>
          <h3 className="text-sm font-bold text-neutral-900 mt-0.5">Mobile UX Wireframe Suite</h3>
          <p className="text-xs text-neutral-500 mt-1">
            Test all parent & guardian journeys built for Android smartphones in Nigeria.
          </p>
        </div>

        {/* View Mode Toggle: Hi-Fi vs Low-Fi Wireframe */}
        <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-neutral-700">
            <span>Visual Fidelity</span>
            <span className="text-[10px] text-emerald-700 font-bold uppercase">
              {isWireframeMode ? 'Blueprint Wireframe' : 'Production Hi-Fi'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-200/80 rounded-xl">
            <button
              onClick={() => setIsWireframeMode(false)}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                !isWireframeMode ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
              }`}
            >
              Hi-Fi Design
            </button>
            <button
              onClick={() => setIsWireframeMode(true)}
              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                isWireframeMode ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
              }`}
            >
              Wireframe
            </button>
          </div>
        </div>

        {/* Screen Jump Navigation */}
        <div className="space-y-1 text-xs">
          <div className="text-[10px] uppercase font-bold text-neutral-400 px-1 mb-1.5">MANDATORY SCREENS (PRD)</div>
          
          {[
            { id: 'onboarding', label: '1. Onboarding & KYC (8-Steps)' },
            { id: 'home', label: '2. Main Dashboard & Clock' },
            { id: 'investment_setup', label: '3. Investment Setup (70%)' },
            { id: 'cycle_tracker', label: '4. Cycle Tracker & ROI' },
            { id: 'school_fees', label: '5. School Fee Disbursement' },
            { id: 'wallet', label: '6. Dual Wallets & Ledger' },
            { id: 'notifications', label: '7. Notification Center' },
            { id: 'account', label: '8. Account & Security' },
            { id: 'lifecycle_protocols', label: '9. Lifecycle Protocols (Grad/48h)' },
          ].map((screen) => (
            <button
              key={screen.id}
              onClick={() => setActiveScreen(screen.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                activeScreen === screen.id
                  ? 'bg-neutral-900 text-white font-bold'
                  : 'hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <span>{screen.label}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          ))}
        </div>

        {/* Quick Modal Testing Triggers */}
        <div className="pt-2 border-t border-neutral-200 space-y-1.5">
          <div className="text-[10px] uppercase font-bold text-neutral-400 px-1 mb-1">INTERACTIVE MODALS</div>
          <button
            onClick={onOpenReceipt}
            className="w-full py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold text-left transition-colors flex items-center justify-between"
          >
            <span>Official Electronic Receipt</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenCertificate}
            className="w-full py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold text-left transition-colors flex items-center justify-between"
          >
            <span>70% Investment Certificate</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Android Device Canvas Frame */}
      <div className="relative mx-auto shrink-0">
        <div className={`relative w-[385px] sm:w-[412px] h-[820px] rounded-[48px] p-3 transition-all ${
          isWireframeMode 
            ? 'bg-neutral-200 border-4 border-dashed border-neutral-400 shadow-xl' 
            : 'bg-neutral-900 border-[8px] border-neutral-800 shadow-2xl ring-1 ring-black/50'
        }`}>
          {/* Inner Phone Screen */}
          <div className={`relative w-full h-full rounded-[38px] overflow-hidden flex flex-col ${
            isWireframeMode ? 'bg-[#FAFAFA] text-neutral-900' : 'bg-neutral-50 text-neutral-900'
          }`}>
            {/* Android Top Status Bar (09:41, 5G, Battery) */}
            <div className={`px-7 pt-3 pb-1.5 flex justify-between items-center text-xs font-semibold shrink-0 select-none z-30 ${
              isWireframeMode ? 'bg-neutral-200 text-neutral-600 font-mono' : 'bg-neutral-50/90 backdrop-blur-md text-neutral-800'
            }`}>
              <span className="font-mono text-[11px] tracking-tight">09:41</span>
              {/* Camera Notch Pinhole */}
              <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 mx-auto" />
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-[10px]">5G</span>
                <Wifi className="w-3.5 h-3.5" />
                <BatteryMedium className="w-4 h-4" />
              </div>
            </div>

            {/* Mobile App Top Brand Bar */}
            <div className={`px-5 py-2.5 flex items-center justify-between border-b shrink-0 z-20 ${
              isWireframeMode 
                ? 'bg-neutral-100 border-neutral-300 text-neutral-800 font-mono' 
                : 'bg-white/95 backdrop-blur-md border-neutral-200/80 text-neutral-900'
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-black text-xs flex items-center justify-center">
                  SP
                </div>
                <div>
                  <h1 className="text-xs font-extrabold tracking-tight text-neutral-900 leading-none">SKULPARTNERS</h1>
                  <span className="text-[9px] text-neutral-400 font-medium">Pay Once, Study Free</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-mono">
                  NGN (₦)
                </span>
              </div>
            </div>

            {/* Scrollable Screen Content Canvas */}
            <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar">
              {activeScreen === 'home' && (
                <ScreenHome
                  parent={parent}
                  beneficiary={beneficiary}
                  cycle={cycle}
                  transactions={transactions}
                  onNavigate={setActiveScreen}
                  onOpenReceipt={onOpenReceipt}
                  onOpenCertificate={onOpenCertificate}
                  isWireframeMode={isWireframeMode}
                />
              )}

              {activeScreen === 'investment_setup' && (
                <ScreenInvestmentSetup
                  onNavigate={setActiveScreen}
                  isWireframeMode={isWireframeMode}
                />
              )}

              {activeScreen === 'cycle_tracker' && (
                <ScreenCycleTracker
                  cycle={cycle}
                  onNavigate={setActiveScreen}
                  isWireframeMode={isWireframeMode}
                />
              )}

              {activeScreen === 'school_fees' && (
                <ScreenSchoolFees
                  beneficiary={beneficiary}
                  cycle={cycle}
                  disbursements={[]}
                  isWireframeMode={isWireframeMode}
                />
              )}

              {activeScreen === 'wallet' && (
                <ScreenWallet
                  transactions={transactions}
                  cycle={cycle}
                  onOpenReceipt={onOpenReceipt}
                  isWireframeMode={isWireframeMode}
                />
              )}

              {activeScreen === 'onboarding' && (
                <ScreenOnboarding
                  onComplete={() => setActiveScreen('home')}
                  isWireframeMode={isWireframeMode}
                />
              )}

              {activeScreen === 'notifications' && (
                <ScreenNotifications
                  notifications={[
                    {
                      id: 'n1',
                      title: 'School Fee Disbursement Ready',
                      message: 'Term 1 tuition for Zainab Oladipo (₦65,000) has been fully matched by Cycle 1 escrow yield.',
                      timestamp: 'Today, 08:30 AM',
                      type: 'payment',
                      isRead: false,
                      isImportant: true
                    },
                    {
                      id: 'n2',
                      title: 'Cycle 1 Milestone: Day 78',
                      message: 'Accrual continues at 0.8% daily ROI (+₦834.40 today).',
                      timestamp: 'Yesterday',
                      type: 'milestone',
                      isRead: true
                    }
                  ]}
                  onNavigate={setActiveScreen}
                  isWireframeMode={isWireframeMode}
                />
              )}

              {activeScreen === 'account' && (
                <ScreenAccount
                  parent={parent}
                  beneficiary={beneficiary}
                  onNavigate={setActiveScreen}
                  isWireframeMode={isWireframeMode}
                />
              )}

              {activeScreen === 'lifecycle_protocols' && (
                <ScreenLifecycleProtocols
                  parent={parent}
                  beneficiary={beneficiary}
                  isWireframeMode={isWireframeMode}
                />
              )}
            </div>

            {/* Android Ergonomic Bottom Navigation Bar (Thumb Zone) */}
            <div className={`grid grid-cols-5 items-center h-16 px-1 border-t shrink-0 z-30 select-none ${
              isWireframeMode 
                ? 'bg-neutral-100 border-neutral-300 font-mono' 
                : 'bg-white/95 backdrop-blur-md border-neutral-200/90'
            }`}>
              <button
                onClick={() => setActiveScreen('home')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
                  activeScreen === 'home' ? 'text-emerald-700 font-bold' : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 tracking-tight">Home</span>
              </button>

              <button
                onClick={() => setActiveScreen('investment_setup')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
                  activeScreen === 'investment_setup' ? 'text-emerald-700 font-bold' : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 tracking-tight">Invest</span>
              </button>

              <button
                onClick={() => setActiveScreen('school_fees')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
                  activeScreen === 'school_fees' ? 'text-emerald-700 font-bold' : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 tracking-tight">Fees</span>
              </button>

              <button
                onClick={() => setActiveScreen('wallet')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
                  activeScreen === 'wallet' ? 'text-emerald-700 font-bold' : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <Wallet className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 tracking-tight">Wallet</span>
              </button>

              <button
                onClick={() => setActiveScreen('account')}
                className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
                  activeScreen === 'account' ? 'text-emerald-700 font-bold' : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 tracking-tight">Profile</span>
              </button>
            </div>

            {/* Android Navigation Bar Pill Indicator */}
            <div className="bg-white pb-2 flex justify-center shrink-0">
              <div className="w-32 h-1 bg-neutral-300 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
