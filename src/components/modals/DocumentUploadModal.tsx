import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, FileText, Camera, Loader2 } from 'lucide-react';

interface DocumentUploadModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  acceptedTypes?: string;
  onSuccess: (fileName: string) => void;
  onClose: () => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  title,
  description,
  onSuccess,
  onClose,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateFile = (name: string) => {
    setSelectedFile(name);
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onSuccess(name);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 text-neutral-900">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-base font-bold text-neutral-900">{title}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isUploading ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-3" />
              <div className="font-semibold text-neutral-900 text-sm">Processing & Encrypting Document...</div>
              <p className="text-xs text-neutral-500 mt-1">Verifying image clarity and OCR integrity</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-neutral-300 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors bg-neutral-50/50">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-neutral-700">Drag and drop file here, or tap to browse</p>
                <p className="text-[11px] text-neutral-400 mt-1">Supported formats: PDF, JPG, PNG (Max 10MB)</p>

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={() => handleSimulateFile('School_Fee_Voucher_Term_Prev.pdf')}
                    className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Select Sample Document
                  </button>
                  <button
                    onClick={() => handleSimulateFile('Camera_Snap_Official_Receipt.jpg')}
                    className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 rounded-lg text-xs font-medium hover:bg-neutral-50 transition-colors flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Snap Photo
                  </button>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-neutral-900">NDPR Privacy Compliance</div>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Your documents are stored in an encrypted vault accessible strictly for KYC/bursary validation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
