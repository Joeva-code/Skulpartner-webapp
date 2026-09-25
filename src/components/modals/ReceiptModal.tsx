import React from 'react';
import { X, Printer, Download, CheckCircle, Shield, QrCode } from 'lucide-react';
import { formatNaira } from '../../utils/financial';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    reference: string;
    studentName: string;
    schoolName: string;
    term: string;
    session: string;
    amount: number;
    disbursedAt: string;
    bankName: string;
    accountNumber: string;
    parentName: string;
    parentId: string;
  };
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 text-neutral-900 max-h-[90vh] flex flex-col">
        {/* Modal Action Bar */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm">Official Electronic Payment Certificate</span>
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
              onClick={() => alert(`Receipt downloaded for ${data.reference}`)}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Canvas */}
        <div className="overflow-y-auto p-8 bg-neutral-50" id="printable-receipt">
          <div className="bg-white p-8 rounded-xl border border-neutral-300 shadow-sm relative overflow-hidden">
            {/* Watermark Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center rotate-[-30deg]">
              <span className="text-7xl font-black text-neutral-900 uppercase tracking-widest">SKULPARTNERS DISBURSED</span>
            </div>

            {/* Header Lockup */}
            <div className="flex justify-between items-start border-b border-neutral-200 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                    SP
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-neutral-900">SKULPARTNERS</h2>
                    <p className="text-[11px] text-neutral-500">Pay Once, Study Free · Educational Escrow</p>
                  </div>
                </div>
                <div className="text-xs text-neutral-600 mt-3 space-y-0.5">
                  <p>RC Number: 1849201 · SCUML/EFCC/RN: 2026/0849</p>
                  <p>NDIC Protected Educational Trust Fund</p>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  PAYMENT SETTLED
                </div>
                <div className="mt-2 text-right">
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">Receipt Reference</div>
                  <div className="font-mono text-xs font-bold text-neutral-800">{data.reference}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{data.disbursedAt}</div>
                </div>
              </div>
            </div>

            {/* Beneficiary & School Details Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6 text-xs">
              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">STUDENT & SPONSOR</div>
                <div className="font-semibold text-neutral-900 text-sm">{data.studentName}</div>
                <div className="text-neutral-600 mt-0.5">Academic Session: {data.session}</div>
                <div className="text-neutral-600">Period: {data.term}</div>
                <div className="mt-2 pt-2 border-t border-neutral-200 text-neutral-500">
                  <span>Sponsor: {data.parentName}</span>
                  <span className="block font-mono text-[10px]">{data.parentId}</span>
                </div>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-2">DESTINATION INSTITUTION</div>
                <div className="font-semibold text-neutral-900 text-sm">{data.schoolName}</div>
                <div className="text-neutral-600 mt-0.5">Beneficiary Bank: {data.bankName}</div>
                <div className="text-neutral-600 font-mono-tabular">Account: {data.accountNumber}</div>
                <div className="mt-2 pt-2 border-t border-neutral-200 text-neutral-500">
                  <span>Routing: Direct NIBSS/Paystack Escrow Wire</span>
                </div>
              </div>
            </div>

            {/* Fee Itemization Table */}
            <table className="w-full text-xs mb-6">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider text-left">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-center">Session / Term</th>
                  <th className="py-2 text-right">Amount (NGN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="py-3 font-medium text-neutral-900">
                    Tuition, Boarding & Educational Term Fees
                    <span className="block text-[11px] text-neutral-500 font-normal">Disbursed via automated Cycle 1 Yield Fund</span>
                  </td>
                  <td className="py-3 text-center text-neutral-600">{data.term} ({data.session})</td>
                  <td className="py-3 text-right font-bold font-mono-tabular text-neutral-900">{formatNaira(data.amount)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-neutral-600">Disbursement Processing Commission (Paid by Platform)</td>
                  <td className="py-2 text-center text-neutral-500">Included</td>
                  <td className="py-2 text-right font-mono-tabular text-neutral-500">₦0.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-neutral-900 font-bold">
                  <td className="pt-3 text-neutral-900 text-sm" colSpan={2}>TOTAL DISBURSED TO SCHOOL</td>
                  <td className="pt-3 text-right text-base text-emerald-800 font-mono-tabular">{formatNaira(data.amount)}</td>
                </tr>
              </tfoot>
            </table>

            {/* Verification Footer & QR Code */}
            <div className="border-t border-neutral-200 pt-4 flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-neutral-100 border border-neutral-300 rounded flex items-center justify-center p-1">
                  <QrCode className="w-14 h-14 text-neutral-800" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-700">Digital Seal of Payment</div>
                  <p className="text-[10px] leading-tight text-neutral-500 max-w-xs mt-0.5">
                    Scan with any smartphone or school bursary scanner to verify cryptographic authenticity on the SKULPARTNERS NIBSS-synced ledger.
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="w-24 h-10 border border-dashed border-neutral-400 rounded flex items-center justify-center text-[10px] font-mono text-neutral-400 mb-1 ml-auto">
                  [BURSAR STAMP]
                </div>
                <div className="text-[10px] text-neutral-400">School Bursary Stamped Verification</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
