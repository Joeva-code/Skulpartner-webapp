import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { WebParentDashboard } from './components/web/WebParentDashboard';
import { WebInvestmentSetup } from './components/web/WebInvestmentSetup';
import { WebSchoolFeeSettlement } from './components/web/WebSchoolFeeSettlement';
import { WebWalletLedger } from './components/web/WebWalletLedger';
import { MobileShell } from './components/mobile/MobileShell';
import { SystemArchitectureDiagram } from './components/architecture/SystemArchitectureDiagram';
import { FinancialEngineSandbox } from './components/architecture/FinancialEngineSandbox';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SchoolPortalModal } from './components/school/SchoolPortalModal';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { CertificateModal } from './components/modals/CertificateModal';

import { 
  INITIAL_PARENT, 
  INITIAL_BENEFICIARY, 
  INITIAL_CYCLE, 
  INITIAL_TRANSACTIONS,
  INITIAL_DISBURSEMENTS
} from './data/mockData';
import { AppViewMode } from './types';

export default function App() {
  // Web application is now default primary landing mode
  const [viewMode, setViewMode] = useState<AppViewMode>('web_dashboard');

  // Interactive shared state
  const [parent] = useState(INITIAL_PARENT);
  const [beneficiary] = useState(INITIAL_BENEFICIARY);
  const [cycle] = useState(INITIAL_CYCLE);
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [disbursements] = useState(INITIAL_DISBURSEMENTS);

  // Global modals
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D1117] text-neutral-100 flex flex-col antialiased">
      {/* Universal Web Header Navigation */}
      <Header viewMode={viewMode} onSelectViewMode={setViewMode} />

      {/* Main Web App Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {viewMode === 'web_dashboard' && (
          <WebParentDashboard
            parent={parent}
            beneficiary={beneficiary}
            cycle={cycle}
            transactions={transactions}
            onNavigate={(tab) => {
              if (tab === 'investment_setup') setViewMode('web_investment');
              if (tab === 'school_fees') setViewMode('web_disbursement');
              if (tab === 'wallet') setViewMode('web_ledger');
            }}
            onOpenReceipt={() => setIsReceiptOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {viewMode === 'web_investment' && (
          <WebInvestmentSetup
            onNavigate={(tab) => {
              if (tab === 'dashboard') setViewMode('web_dashboard');
            }}
          />
        )}

        {viewMode === 'web_disbursement' && (
          <WebSchoolFeeSettlement
            beneficiary={beneficiary}
            cycle={cycle}
            disbursements={disbursements}
            onOpenReceipt={() => setIsReceiptOpen(true)}
          />
        )}

        {viewMode === 'web_ledger' && (
          <WebWalletLedger
            transactions={transactions}
            cycle={cycle}
            onOpenReceipt={() => setIsReceiptOpen(true)}
          />
        )}

        {viewMode === 'financial_sandbox' && (
          <FinancialEngineSandbox />
        )}

        {viewMode === 'admin_portal' && (
          <AdminDashboard />
        )}

        {viewMode === 'school_portal' && (
          <SchoolPortalModal />
        )}

        {viewMode === 'mobile_preview' && (
          <MobileShell
            parent={parent}
            beneficiary={beneficiary}
            cycle={cycle}
            transactions={transactions}
            onOpenReceipt={() => setIsReceiptOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {viewMode === 'system_architecture' && (
          <SystemArchitectureDiagram />
        )}
      </main>

      {/* Web App Global Footer */}
      <footer className="border-t border-neutral-800/80 bg-neutral-950 py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-300">SKULPARTNERS Web Platform</span>
            <span>·</span>
            <span>Educational Finance & Escrow</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <span>NDIC Protected Trust Account</span>
            <span>·</span>
            <span>SCUML/EFCC RN: 2026/0849</span>
            <span>·</span>
            <span>Federal Dept of Cooperatives</span>
            <span>·</span>
            <span>NDPR Data Privacy</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        data={{
          reference: 'SKP-DISB-CRN-2026-01',
          studentName: beneficiary.fullName,
          schoolName: beneficiary.schoolName,
          term: 'Term 1',
          session: '2026/2027',
          amount: 65000,
          disbursedAt: '2026-09-21 10:45 AM',
          bankName: beneficiary.schoolAccountDetails.bankName,
          accountNumber: beneficiary.schoolAccountDetails.accountNumber,
          parentName: parent.fullName,
          parentId: parent.userId
        }}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        data={{
          parentName: parent.fullName,
          studentName: beneficiary.fullName,
          schoolName: beneficiary.schoolName,
          annualFees: beneficiary.annualFees,
          principalInvested: cycle.principalAmount,
          certificateNumber: 'CERT-SKP-2026-8842',
          issueDate: '25 Sep 2026'
        }}
      />
    </div>
  );
}
