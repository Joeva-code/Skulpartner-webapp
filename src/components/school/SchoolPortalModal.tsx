import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  UploadCloud, 
  Download, 
  Search, 
  ShieldCheck, 
  FileText,
  Clock,
  Printer
} from 'lucide-react';
import { formatNaira } from '../../utils/financial';
import { DocumentUploadModal } from '../modals/DocumentUploadModal';

export const SchoolPortalModal: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>('Zainab Kemi Oladipo');
  const [receiptUploaded, setReceiptUploaded] = useState(true);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-900 text-white flex items-center justify-center font-bold text-lg">
            CRN
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">PHASE 2 INSTITUTIONAL BURSARY PORTAL</div>
            <h2 className="text-xl font-bold text-neutral-900 mt-0.5">Corona Secondary School, Agbara</h2>
            <p className="text-xs text-neutral-500 mt-0.5">Bursary Terminal · Account: Zenith Bank 1013488201 · 142 Enrolled</p>
          </div>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors self-start md:self-center"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Stamped Termly Receipt Batch</span>
        </button>
      </div>

      {/* Main Roster of Beneficiary Tuition Payments */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-neutral-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Enrolled Student Tuition Disbursements</h3>
            <p className="text-xs text-neutral-500">Term 1 2026/2027 Academic Session settlement records.</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-mono">
            Total Settled: ₦9,230,000.00
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Class Level</th>
                <th className="py-2.5 px-3">Parent Sponsor</th>
                <th className="py-2.5 px-3">Term 1 Fee</th>
                <th className="py-2.5 px-3">NIBSS Settlement Ref</th>
                <th className="py-2.5 px-3">Bursary Stamped Proof</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr className="hover:bg-neutral-50">
                <td className="py-3 px-3 font-bold text-neutral-900">Zainab Kemi Oladipo</td>
                <td className="py-3 px-3 text-neutral-600">Senior Secondary 2 (SS2)</td>
                <td className="py-3 px-3 text-neutral-700">Alhaji Adebayo Oladipo (SKP-2026-8842)</td>
                <td className="py-3 px-3 font-mono-tabular font-bold text-neutral-900">{formatNaira(65000)}</td>
                <td className="py-3 px-3 font-mono text-[11px] text-neutral-500">SKP-DISB-CRN-2026-01</td>
                <td className="py-3 px-3">
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> #CRN-2026-SS2-0941
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Settled & Acknowledged
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-neutral-50">
                <td className="py-3 px-3 font-bold text-neutral-900">Chukwudi Emeka Okonkwo</td>
                <td className="py-3 px-3 text-neutral-600">Junior Secondary 3 (JS3)</td>
                <td className="py-3 px-3 text-neutral-700">Chief Emeka Okonkwo (SKP-2026-4419)</td>
                <td className="py-3 px-3 font-mono-tabular font-bold text-neutral-900">{formatNaira(60000)}</td>
                <td className="py-3 px-3 font-mono text-[11px] text-neutral-500">SKP-DISB-CRN-2026-02</td>
                <td className="py-3 px-3">
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> #CRN-2026-JS3-0118
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Settled & Acknowledged
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <DocumentUploadModal
        isOpen={isUploadOpen}
        title="Upload Bursary Stamped Receipts"
        description="Attach officially stamped proof of fee receipt for Corona Secondary School beneficiaries."
        onSuccess={() => {
          setReceiptUploaded(true);
          alert('Batch stamped receipt proof uploaded to the audit repository.');
        }}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
};
