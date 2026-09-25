import React, { useState } from 'react';
import { 
  GraduationCap, 
  Repeat, 
  HeartHandshake, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Building2, 
  DollarSign,
  FileCheck
} from 'lucide-react';
import { ParentUser, Beneficiary } from '../../types';
import { formatNaira } from '../../utils/financial';

interface ScreenLifecycleProtocolsProps {
  parent: ParentUser;
  beneficiary: Beneficiary;
  isWireframeMode?: boolean;
}

export const ScreenLifecycleProtocols: React.FC<ScreenLifecycleProtocolsProps> = ({
  parent,
  beneficiary,
  isWireframeMode = false
}) => {
  const [activeTab, setActiveTab] = useState<'graduation' | 'transfer' | 'deceased' | 'compliance'>('compliance');

  // Interactive fine state
  const [finePaid, setFinePaid] = useState(false);
  const [transferSchool, setTransferSchool] = useState('Kings College, Lagos Island');
  const [transferNewFee, setTransferNewFee] = useState(165000);
  const [isTransferred, setIsTransferred] = useState(false);
  const [deceasedStep, setDeceasedStep] = useState<'frozen' | 'nok_verified' | 'transferred'>('frozen');

  return (
    <div className={`space-y-4 pb-20 ${isWireframeMode ? 'font-mono' : ''}`}>
      {/* Title */}
      <div>
        <h2 className="text-base font-bold text-neutral-900 leading-tight">Lifecycle Protocols & Exceptions</h2>
        <p className="text-[11px] text-neutral-500">Graduation, Transfers, Deceased User & Compliance Rules</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-neutral-200/80 rounded-2xl text-[11px] font-bold">
        <button
          onClick={() => setActiveTab('compliance')}
          className={`py-2 px-1 rounded-xl transition-all ${
            activeTab === 'compliance' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600'
          }`}
        >
          Compliance
        </button>
        <button
          onClick={() => setActiveTab('graduation')}
          className={`py-2 px-1 rounded-xl transition-all ${
            activeTab === 'graduation' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600'
          }`}
        >
          Graduation
        </button>
        <button
          onClick={() => setActiveTab('transfer')}
          className={`py-2 px-1 rounded-xl transition-all ${
            activeTab === 'transfer' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600'
          }`}
        >
          Transfer
        </button>
        <button
          onClick={() => setActiveTab('deceased')}
          className={`py-2 px-1 rounded-xl transition-all ${
            activeTab === 'deceased' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600'
          }`}
        >
          Deceased
        </button>
      </div>

      {/* 1. NON-COMPLIANCE PROTOCOL (PRD 48-Hour Grace & 5% Fine Timeline) */}
      {activeTab === 'compliance' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 text-xs text-amber-950 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-sm">Non-Compliance Escalation Ladder</h3>
            </div>
            <p className="text-amber-800 leading-relaxed">
              When a parent misses the mandatory pre-session academic update, the platform engages this regulatory 7-step sequence:
            </p>

            {/* Stepper Timeline */}
            <div className="space-y-2 pt-2 text-neutral-800">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  <div className="font-semibold text-xs">Missed Pre-Session Update</div>
                  <div className="text-[10px] text-neutral-500">Student enrollment not re-verified 5 days before term</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  <div className="font-semibold text-xs">48-Hour Grace Period Initiated</div>
                  <div className="text-[10px] text-neutral-500">SMS, Email, and Push alerts dispatched continuously</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-200 text-red-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  <div className="font-semibold text-xs">Temporary Account Suspension</div>
                  <div className="text-[10px] text-neutral-500">Automated disbursement freeze; wallet locked</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-200 text-red-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                <div>
                  <div className="font-semibold text-xs">5% Late Penalty Fine Levied</div>
                  <div className="text-[10px] text-neutral-500">5% of Term 1 fee = ₦3,250.00 assessed</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">5</span>
                <div>
                  <div className="font-semibold text-xs">Fine Payment & Reactivation</div>
                  <div className="text-[10px] text-neutral-500">Escrow cycle re-engaged; school settlement cleared</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-sm text-xs space-y-3">
            <h4 className="font-bold text-neutral-900">Fine Clearance Simulation</h4>
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div>
                <span className="text-neutral-600 block">5% Re-activation Penalty:</span>
                <span className="font-mono-tabular font-bold text-base text-red-600">₦3,250.00</span>
              </div>
              {finePaid ? (
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Penalty Settled
                </span>
              ) : (
                <button
                  onClick={() => setFinePaid(true)}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold"
                >
                  Pay Fine (₦3,250)
                </button>
              )}
            </div>
            {finePaid && (
              <p className="text-[11px] text-emerald-700 font-medium">
                ✓ Account status restored to Active. Cycle 1 disbursement schedule unimpeded.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 2. GRADUATION PROTOCOL */}
      {activeTab === 'graduation' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-sm text-neutral-900">Graduation & Surplus Policy</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Upon final year completion (SS3 or Year 13 graduation), the academic cycle concludes successfully.
            </p>

            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
              <div className="text-[10px] uppercase font-bold text-neutral-400">PRD SURPLUS PROTOCOL</div>
              <p className="text-neutral-800">
                Any residual yield or surplus remaining upon student graduation moves into the <b>SKULPARTNERS Communal Educational Pool</b> to sponsor underprivileged beneficiaries.
              </p>
              <div className="flex justify-between pt-2 border-t border-neutral-200 text-neutral-700">
                <span>Accrued Communal Surplus:</span>
                <span className="font-mono-tabular font-bold text-emerald-700">₦27,678.00</span>
              </div>
            </div>

            <button
              onClick={() => alert('Certificate of Educational Completion Issued for Zainab Oladipo')}
              className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              Generate Academic Completion Certificate
            </button>
          </div>
        </div>
      )}

      {/* 3. SCHOOL TRANSFER PROTOCOL */}
      {activeTab === 'transfer' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <Repeat className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-sm text-neutral-900">School Transfer & Fee Recalculation</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              When a student transfers between schools, their tuition schedule changes. The platform recalculates the 70% requirement.
            </p>

            <div className="space-y-2">
              <div>
                <label className="block text-[10px] font-bold text-neutral-600 mb-1">New Target School</label>
                <input
                  type="text"
                  value={transferSchool}
                  onChange={(e) => setTransferSchool(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-600 mb-1">New Annual Tuition (₦)</label>
                <input
                  type="number"
                  value={transferNewFee}
                  onChange={(e) => setTransferNewFee(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-xs font-mono-tabular font-bold"
                />
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 space-y-1">
              <div className="flex justify-between">
                <span>Revised 70% Principal:</span>
                <span className="font-mono-tabular font-bold">{formatNaira(transferNewFee * 0.70)}</span>
              </div>
              <div className="flex justify-between">
                <span>Current Capital Deposited:</span>
                <span className="font-mono-tabular font-bold">{formatNaira(104300)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-blue-200 text-xs font-bold text-blue-950">
                <span>Adjustment Required:</span>
                <span className="font-mono-tabular">+{formatNaira((transferNewFee * 0.70) - 104300)}</span>
              </div>
            </div>

            <button
              onClick={() => setIsTransferred(true)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <span>Authorize School Transfer & Bursary Update</span>
            </button>

            {isTransferred && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-center font-medium">
                ✓ Destination bursary updated to {transferSchool}. New fee schedule active.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. DECEASED USER PROTOCOL */}
      {activeTab === 'deceased' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-sm text-neutral-900">Deceased User Protocol</h3>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              A formal, dignified legal workflow that guarantees uninterrupted tuition for the beneficiary if the primary parent passes away.
            </p>

            <div className="space-y-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
              <div className="font-bold text-neutral-900">Designated Next of Kin:</div>
              <div className="text-neutral-700">{parent.nextOfKin.fullName} ({parent.nextOfKin.relationship})</div>
              <div className="text-[11px] text-neutral-500 font-mono-tabular">
                {parent.nextOfKin.bankName} · {parent.nextOfKin.accountNumber}
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                deceasedStep === 'frozen' ? 'bg-amber-50 border-amber-300' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div>
                  <span className="font-bold text-neutral-900">1. Account Freeze</span>
                  <p className="text-[10px] text-neutral-500">Capital ring-fenced; withdrawals paused pending proof</p>
                </div>
                <button
                  onClick={() => setDeceasedStep('nok_verified')}
                  className="px-2.5 py-1 bg-neutral-900 text-white rounded text-[11px] font-semibold"
                >
                  Verify NOK
                </button>
              </div>

              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                deceasedStep === 'nok_verified' ? 'bg-purple-50 border-purple-300' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div>
                  <span className="font-bold text-neutral-900">2. Bank Match Check</span>
                  <p className="text-[10px] text-neutral-500">GTBank NIBSS name verification with Folashade Oladipo</p>
                </div>
                <button
                  onClick={() => setDeceasedStep('transferred')}
                  className="px-2.5 py-1 bg-purple-700 text-white rounded text-[11px] font-semibold"
                >
                  Confirm Match
                </button>
              </div>

              <div className={`p-3 rounded-xl border ${
                deceasedStep === 'transferred' ? 'bg-emerald-50 border-emerald-300' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <span className="font-bold text-neutral-900">3. Custodianship Transfer</span>
                <p className="text-[10px] text-neutral-500">
                  Beneficiary tuition remains active. Full account ownership transferred seamlessly.
                </p>
                {deceasedStep === 'transferred' && (
                  <span className="text-[10px] font-bold text-emerald-700 mt-1 block">
                    ✓ Custodianship transferred to Mrs. Folashade Oladipo. Zainab's schooling is protected.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
