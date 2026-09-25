import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Users, 
  Building2, 
  HelpCircle, 
  FileText, 
  LogOut, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { ParentUser, Beneficiary } from '../../types';

interface ScreenAccountProps {
  parent: ParentUser;
  beneficiary: Beneficiary;
  onNavigate: (tab: string) => void;
  isWireframeMode?: boolean;
}

export const ScreenAccount: React.FC<ScreenAccountProps> = ({
  parent,
  beneficiary,
  onNavigate,
  isWireframeMode = false
}) => {
  const [twoFactor, setTwoFactor] = useState(parent.twoFactorEnabled);

  return (
    <div className={`space-y-4 pb-20 ${isWireframeMode ? 'font-mono' : ''}`}>
      {/* Title */}
      <div>
        <h2 className="text-base font-bold text-neutral-900 leading-tight">Account & Security</h2>
        <p className="text-[11px] text-neutral-500">Parent Profile, KYC Tier, 2FA & Trust Credentials</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-sm flex items-center gap-4">
        <img 
          src={parent.avatarUrl || '/src/assets/images/parent_avatar_adebayo_1790332256792.jpg'} 
          alt={parent.fullName}
          referrerPolicy="no-referrer"
          className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600/30"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-neutral-900 truncate">{parent.fullName}</h3>
            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded-full shrink-0">
              Verified
            </span>
          </div>
          <div className="text-[11px] text-neutral-500 font-mono-tabular">ID: {parent.userId}</div>
          <div className="text-[11px] text-neutral-400 truncate">{parent.email}</div>
        </div>
      </div>

      {/* KYC Compliance Status Card */}
      <div className="bg-neutral-900 text-white rounded-2xl p-4 shadow-md space-y-2.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold">KYC & AML Level: Tier 2</span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
            Cleared
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 pt-1">
          <div className="bg-white/5 p-2 rounded-lg">
            <span className="text-[9px] text-neutral-400 uppercase font-semibold">BVN Match</span>
            <div className="font-mono text-white font-semibold">NIBSS Verified</div>
          </div>
          <div className="bg-white/5 p-2 rounded-lg">
            <span className="text-[9px] text-neutral-400 uppercase font-semibold">NIN Record</span>
            <div className="font-mono text-white font-semibold">NIMC Confirmed</div>
          </div>
        </div>
      </div>

      {/* Beneficiaries & Next of Kin Links */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm divide-y divide-neutral-100 text-xs overflow-hidden">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-neutral-900">Registered Beneficiaries</div>
              <div className="text-[11px] text-neutral-500">{beneficiary.fullName} ({beneficiary.classLevel})</div>
            </div>
          </div>
          <span className="text-[11px] font-bold text-neutral-400">1 Student</span>
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-neutral-900">Next of Kin Protocol</div>
              <div className="text-[11px] text-neutral-500">{parent.nextOfKin.fullName} ({parent.nextOfKin.relationship})</div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('lifecycle_protocols')}
            className="text-[11px] font-semibold text-emerald-700 hover:underline"
          >
            Manage
          </button>
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-neutral-900">School Profile & Bursary</div>
              <div className="text-[11px] text-neutral-500">{beneficiary.schoolName}</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* Security & Authentication Settings */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm space-y-3 text-xs">
        <h4 className="font-bold text-neutral-900">Security & Protection</h4>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-neutral-500" />
            <div>
              <div className="font-semibold text-neutral-900">2-Factor Authentication (2FA)</div>
              <div className="text-[11px] text-neutral-500">Require OTP code for all disbursements</div>
            </div>
          </div>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              twoFactor ? 'bg-emerald-600' : 'bg-neutral-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform transform ${
              twoFactor ? 'translate-x-5' : 'translate-x-0.5'
            } shadow-sm`} />
          </button>
        </div>

        <div className="flex items-center justify-between py-1 border-t border-neutral-100">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-neutral-500" />
            <div>
              <div className="font-semibold text-neutral-900">Registered Devices</div>
              <div className="text-[11px] text-neutral-500">Samsung Galaxy S24 (Current Session)</div>
            </div>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Active</span>
        </div>
      </div>

      {/* Support & Legal */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm divide-y divide-neutral-100 text-xs overflow-hidden">
        <button
          onClick={() => alert('Opening live parent concierge support...')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 text-left transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-neutral-500" />
            <span className="font-semibold text-neutral-800">Support Concierge & Ticketing</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>

        <button
          onClick={() => alert('Viewing NDPR & Cooperative Escrow Terms')}
          className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 text-left transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-neutral-500" />
            <span className="font-semibold text-neutral-800">Privacy Policy (NDPR) & Terms</span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </button>
      </div>

      <button
        onClick={() => onNavigate('onboarding')}
        className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors border border-red-200"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out of Parent Portal</span>
      </button>
    </div>
  );
};
