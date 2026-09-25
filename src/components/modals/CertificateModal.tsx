import React from 'react';
import { X, Award, ShieldCheck, Printer, Download } from 'lucide-react';
import { formatNaira } from '../../utils/financial';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    parentName: string;
    studentName: string;
    schoolName: string;
    annualFees: number;
    principalInvested: number;
    certificateNumber: string;
    issueDate: string;
  };
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 text-neutral-900 max-h-[90vh] flex flex-col">
        {/* Top Controls */}
        <div className="bg-neutral-900 text-white px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm">Certificate of Educational Investment</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button 
              onClick={() => alert(`Certificate downloaded for ${data.certificateNumber}`)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper */}
        <div className="overflow-y-auto p-8 bg-amber-50/40 flex items-center justify-center">
          <div className="bg-[#FCFBF7] p-10 rounded-2xl border-4 border-double border-amber-900/30 shadow-lg text-center max-w-xl w-full relative">
            {/* Top Seal */}
            <div className="w-16 h-16 rounded-full bg-emerald-800 text-white mx-auto flex items-center justify-center shadow-md mb-4 border-2 border-amber-400">
              <ShieldCheck className="w-9 h-9 text-amber-300" />
            </div>

            <div className="text-xs uppercase tracking-widest text-amber-900/80 font-bold mb-1">
              Federal Republic of Nigeria · Cooperative Trust & Escrow
            </div>
            <h2 className="text-2xl font-serif font-black tracking-tight text-neutral-900">
              SKULPARTNERS EDUCATIONAL TRUST
            </h2>
            <div className="text-[11px] text-neutral-500 mb-6 italic">
              "Pay Once, Study Free" · Guaranteed Academic Underwriting
            </div>

            <p className="text-xs text-neutral-600 mb-4">This document formally certifies that</p>
            <div className="text-xl font-bold text-neutral-900 border-b border-neutral-300 pb-2 inline-block px-8 mb-4">
              {data.parentName}
            </div>

            <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed mb-6">
              has completed the full upfront educational principal investment of{' '}
              <span className="font-bold text-neutral-900 font-mono-tabular">{formatNaira(data.principalInvested)}</span> (70% of annual fees),
              guaranteeing the 100% full-year academic tuition and termly disbursement coverage for the beneficiary:
            </p>

            <div className="bg-white/80 border border-amber-200 rounded-xl p-4 max-w-sm mx-auto mb-6 text-xs">
              <div className="font-bold text-neutral-900 text-sm">{data.studentName}</div>
              <div className="text-neutral-600 mt-0.5">{data.schoolName}</div>
              <div className="text-neutral-500 font-mono-tabular mt-1">Full Annual Coverage: {formatNaira(data.annualFees)}</div>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-neutral-200 pt-6 text-xs text-neutral-500">
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-neutral-400">Certificate Reference</div>
                <div className="font-mono text-neutral-800 font-semibold">{data.certificateNumber}</div>
                <div className="text-[10px] mt-0.5">Date Issued: {data.issueDate}</div>
              </div>
              <div className="text-right">
                <div className="font-serif italic font-bold text-emerald-900 text-sm">Managing Partner & Trustee</div>
                <div className="text-[10px] text-neutral-400 mt-1">Authorized Custodian Signature</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
