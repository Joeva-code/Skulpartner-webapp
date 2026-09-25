import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  Building2, 
  Lock, 
  DollarSign,
  Activity,
  FileText,
  Clock,
  Check,
  X
} from 'lucide-react';
import { AdminRole, ComplianceRecord, AuditLog } from '../../types';
import { INITIAL_COMPLIANCE_RECORDS, INITIAL_AUDIT_LOGS } from '../../data/mockData';
import { formatNaira, formatCompactNaira } from '../../utils/financial';

export const AdminDashboard: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<AdminRole>('Lead Partner');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'investments' | 'payouts' | 'compliance' | 'audit'>('overview');
  const [searchUser, setSearchUser] = useState('');
  const [kycQueue, setKycQueue] = useState<ComplianceRecord[]>(INITIAL_COMPLIANCE_RECORDS);
  const [auditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const handleApproveKyc = (id: string) => {
    setKycQueue(prev => prev.map(item => item.id === id ? { ...item, amlScreeningStatus: 'Cleared', scumlStatus: 'Compliant' } : item));
    alert('KYC Document & Sanctions check approved. User upgraded to Tier 2.');
  };

  const handleFlagKyc = (id: string) => {
    setKycQueue(prev => prev.map(item => item.id === id ? { ...item, amlScreeningStatus: 'Flagged' } : item));
    alert('User flagged for enhanced due diligence (EDD) under SCUML/EFCC guidelines.');
  };

  return (
    <div className="space-y-6">
      {/* Top Admin Header & Role-Based Access Switcher */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">ADMIN BACK-OFFICE CONSOLE</div>
          <h2 className="text-xl font-bold text-neutral-900 mt-0.5">Enterprise Oversight & Financial Operations</h2>
          <div className="text-xs text-neutral-500 mt-1 flex items-center gap-2">
            <span>Operating under Federal Dept of Cooperatives · NDIC Insured</span>
            <span>·</span>
            <span className="font-mono text-emerald-700 font-semibold">Active Session: Admin Console v2.6</span>
          </div>
        </div>

        {/* Role Selector Pill Dropdown */}
        <div className="flex items-center gap-2 bg-neutral-100 p-1.5 rounded-2xl border border-neutral-200 self-start md:self-center">
          <span className="text-[11px] font-bold text-neutral-500 pl-2">Viewing as:</span>
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
            className="bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-xs font-bold text-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-xs cursor-pointer"
          >
            <option value="Lead Partner">Lead Partner (Full Oversight)</option>
            <option value="Managing Partner">Managing Partner (Operations)</option>
            <option value="Compliance Officer">Compliance Officer (AML/KYC)</option>
            <option value="Finance & Payouts">Finance & Payouts (Settlement)</option>
            <option value="Customer Support">Customer Support (Ticketing)</option>
            <option value="Auditor (Read-Only)">Auditor (Read-Only Logs)</option>
          </select>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200/80 pb-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview & KPIs' },
          { id: 'users', label: 'User & KYC Queue' },
          { id: 'investments', label: 'Active Escrow Plans' },
          { id: 'payouts', label: 'Termly Payout Queue' },
          { id: 'compliance', label: 'Regulatory & AML' },
          { id: 'audit', label: 'Immutable Audit Logs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-neutral-900 text-white font-bold shadow-xs'
                : 'text-neutral-600 hover:bg-white hover:text-neutral-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & HIGH-LEVEL KPIS (60K SCALE IN YEAR 1) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 6 Key Metric Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Total Enrolled</span>
              <div className="text-xl font-bold font-mono-tabular text-neutral-900 mt-1">14,820</div>
              <div className="text-[10px] text-emerald-600 mt-1 font-semibold">24.7% of 60k Year 1 Goal</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Capital Deployed</span>
              <div className="text-xl font-bold font-mono-tabular text-neutral-900 mt-1">₦1.54B</div>
              <div className="text-[10px] text-neutral-500 mt-1">70% Principal Escrow</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Term Payouts Made</span>
              <div className="text-xl font-bold font-mono-tabular text-neutral-900 mt-1">₦892M</div>
              <div className="text-[10px] text-emerald-600 mt-1">100% On-Time to Schools</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Communal Surplus</span>
              <div className="text-xl font-bold font-mono-tabular text-emerald-700 mt-1">₦412M</div>
              <div className="text-[10px] text-neutral-500 mt-1">Educational Trust Pool</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Pending KYC</span>
              <div className="text-xl font-bold font-mono-tabular text-amber-600 mt-1">18</div>
              <div className="text-[10px] text-amber-600 mt-1 font-semibold">Needs Officer Review</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-400">AML Risk Flags</span>
              <div className="text-xl font-bold font-mono-tabular text-red-600 mt-1">1</div>
              <div className="text-[10px] text-neutral-500 mt-1">PEP Check In Progress</div>
            </div>
          </div>

          {/* Real-Time Operational Monitoring Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
                <h3 className="text-sm font-bold text-neutral-900">Termly Payout & Settlement Velocity</h3>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Paystack Live Automated
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-neutral-900 block">Corona Schools Trust Council</span>
                    <span className="text-[11px] text-neutral-500">142 Enrolled Beneficiaries · Zenith Bank</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-tabular font-bold text-neutral-900 text-sm">₦9,230,000</span>
                    <span className="block text-[10px] text-emerald-600 font-medium">Reconciled & Cleared</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-neutral-900 block">Kings College Lagos</span>
                    <span className="text-[11px] text-neutral-500">98 Enrolled Beneficiaries · Access Bank</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-tabular font-bold text-neutral-900 text-sm">₦5,880,000</span>
                    <span className="block text-[10px] text-emerald-600 font-medium">Reconciled & Cleared</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-neutral-900 block">Grange School Ikeja</span>
                    <span className="text-[11px] text-neutral-500">64 Enrolled Beneficiaries · Standard Chartered</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono-tabular font-bold text-neutral-900 text-sm">₦8,440,000</span>
                    <span className="block text-[10px] text-amber-600 font-medium">Pending Bursary Stamp</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
                <h3 className="text-sm font-bold text-neutral-900">Partner Waterfall Real-Time Yield Accrual</h3>
                <span className="text-xs text-neutral-500">PRD 41.9% Platform Share</span>
              </div>

              <div className="space-y-2 text-xs font-mono-tabular">
                <div className="flex justify-between p-2.5 bg-neutral-50 rounded-xl">
                  <span className="text-neutral-700">Lead Partner (15%):</span>
                  <span className="font-bold text-neutral-900">₦23,100,000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-neutral-50 rounded-xl">
                  <span className="text-neutral-700">Managing Partners (25%):</span>
                  <span className="font-bold text-neutral-900">₦38,500,000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-neutral-50 rounded-xl">
                  <span className="text-neutral-700">Consultant & Investment Partners (20%):</span>
                  <span className="font-bold text-neutral-900">₦30,800,000</span>
                </div>
                <div className="flex justify-between p-2.5 bg-neutral-50 rounded-xl">
                  <span className="text-neutral-700">Salaries, Ops & Liquidity Reserve (40%):</span>
                  <span className="font-bold text-neutral-900">₦61,600,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER & KYC APPROVAL QUEUE */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">KYC & AML Compliance Approval Queue</h3>
              <p className="text-xs text-neutral-500">Inspect BVN, NIN, and identity documents submitted by parents.</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search user ID or name..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-2.5 px-3">Parent User ID</th>
                  <th className="py-2.5 px-3">Full Legal Name</th>
                  <th className="py-2.5 px-3">BVN / NIN Match</th>
                  <th className="py-2.5 px-3">AML Screening</th>
                  <th className="py-2.5 px-3">SCUML Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {kycQueue.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50">
                    <td className="py-3 px-3 font-mono font-bold text-neutral-800">{user.userId}</td>
                    <td className="py-3 px-3 font-semibold text-neutral-900">{user.userName}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 font-semibold ${
                        user.bvnMatch && user.ninMatch ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {user.bvnMatch && user.ninMatch ? '✓ Verified 100%' : '⚠ Flagged Match'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        user.amlScreeningStatus === 'Cleared'
                          ? 'bg-emerald-50 text-emerald-800'
                          : user.amlScreeningStatus === 'Under Review'
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-red-50 text-red-800'
                      }`}>
                        {user.amlScreeningStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-neutral-600">{user.scumlStatus}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleApproveKyc(user.id)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                          title="Approve KYC"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleFlagKyc(user.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
                          title="Flag for AML Review"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: IMMUTABLE AUDIT LOGS */}
      {(activeTab === 'audit' || activeTab === 'compliance' || activeTab === 'investments' || activeTab === 'payouts') && (
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-neutral-900">Cryptographically Chained Audit Ledger</h3>
              <p className="text-xs text-neutral-500">Immutable record of all disbursements, KYC transitions, and yield calculations.</p>
            </div>
            <button
              onClick={() => alert('Downloading official regulatory CSV audit package...')}
              className="text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export Audit Log
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Actor & Role</th>
                  <th className="py-2.5 px-3">Action Event</th>
                  <th className="py-2.5 px-3">Entity & ID</th>
                  <th className="py-2.5 px-3">State Change Diff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-mono-tabular">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-neutral-50 text-[11px]">
                    <td className="py-3 px-3 text-neutral-500">{log.timestamp}</td>
                    <td className="py-3 px-3 font-semibold text-neutral-800">
                      {log.actor} <span className="text-[10px] text-neutral-400 font-normal">({log.actorRole})</span>
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-800">{log.action}</td>
                    <td className="py-3 px-3 text-neutral-700">{log.entityId}</td>
                    <td className="py-3 px-3 text-neutral-600">{log.afterState}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
