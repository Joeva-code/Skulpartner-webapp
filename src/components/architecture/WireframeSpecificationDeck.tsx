import React from 'react';
import { 
  Smartphone, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const WireframeSpecificationDeck: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm">
        <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">UX & WIREFRAME BLUEPRINTS</div>
        <h2 className="text-xl font-bold text-neutral-900 mt-0.5">Product Design Specifications & Wireframe Rationale</h2>
        <p className="text-xs text-neutral-600 mt-1 max-w-2xl leading-relaxed">
          Ground-up ergonomics and interaction patterns designed to meet the PRD’s core UX principles: Trust, Simplicity for low digital literacy, Transparency, and Reassurance.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
            01
          </div>
          <h3 className="font-bold text-sm text-neutral-900">Trust & Security First</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Parents are depositing 70% of annual school fees upfront. Every screen features NDIC, SCUML, and CBN trust indicators, along with downloadable official certificates.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
            02
          </div>
          <h3 className="font-bold text-sm text-neutral-900">Low Digital Literacy</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Avoids dense financial jargon. Replaces complex yield curves with an intuitive <b>Circular Clock Model</b> that parents can scan in 2 seconds.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
            03
          </div>
          <h3 className="font-bold text-sm text-neutral-900">Thumb-Zone Ergonomics</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            All primary triggers ("Pay School Fees", "View Investment", tab switches) are anchored in the bottom 40% natural reach zone with hitboxes of at least 48px.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
            04
          </div>
          <h3 className="font-bold text-sm text-neutral-900">Nigeria-First Localization</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Formatted strictly in Nigerian Naira (₦), supporting Nigerian BVN, NIN, IKEDC/EKEDC utility bills, and local bank settlement rails via Paystack & NIBSS.
          </p>
        </div>
      </div>

      {/* Wireframe Architecture Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Onboarding & KYC Flow Map */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-neutral-900">10-Minute Parent Onboarding Architecture</h3>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Targeting registration-to-investment in under 10 minutes through progressive disclosure:
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-neutral-900">Phase A: Zero-Friction Lead Capture</span>
                <p className="text-[11px] text-neutral-500">Email + +234 phone + OTP verification (takes ~90 seconds)</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-neutral-200 px-2 py-0.5 rounded">Step 1-3</span>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-neutral-900">Phase B: Automated NIBSS KYC Verification</span>
                <p className="text-[11px] text-neutral-500">BVN & NIN live validation + camera snap of ID and utility bill</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-neutral-200 px-2 py-0.5 rounded">Step 4</span>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-neutral-900">Phase C: Beneficiary & Next-of-Kin Binding</span>
                <p className="text-[11px] text-neutral-500">Student school fees schedule + designated family emergency contact</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-neutral-200 px-2 py-0.5 rounded">Step 5-6</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-emerald-950">
              <div>
                <span className="font-bold">Phase D: User ID Generation & Paystack Checkout</span>
                <p className="text-[11px] text-emerald-700">Permanent ID issued (`SKP-2026-8842`) + 70% upfront payment</p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">Step 7-8</span>
            </div>
          </div>
        </div>

        {/* Dual Receipt Verification Loop Rationale */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-neutral-900">Dual-Receipt Verification Mechanism</h3>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Eliminates school tuition fraud and ensures schools never claim non-payment:
          </p>

          <div className="p-4 bg-neutral-900 text-white rounded-2xl space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
              <div>
                <div className="font-bold text-white">Platform Settlement Receipt</div>
                <div className="text-[11px] text-neutral-400">Cryptographically signed digital receipt with NIBSS transaction reference and QR code.</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
              <div>
                <div className="font-bold text-white">School Bursary Stamped Receipt</div>
                <div className="text-[11px] text-neutral-400">School uploads stamped official proof of receipt, completing the two-way audit trail before Cycle 2 unlocks.</div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
            <span className="font-bold text-neutral-900 block mb-1">Audit Reconciliation Guarantee:</span>
            Every disbursement is verified against both banking settlement logs and institutional academic admission files.
          </div>
        </div>
      </div>

      {/* PRD Open Questions Resolution Matrix */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <h3 className="text-base font-bold text-neutral-900">Design Answers to PRD Open Questions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-200 text-neutral-400 text-[10px] uppercase font-bold tracking-wider">
                <th className="py-2.5 px-3">PRD Open Question</th>
                <th className="py-2.5 px-3">Alternative Values</th>
                <th className="py-2.5 px-3">Design Implementation Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-700">
              <tr>
                <td className="py-3 px-3 font-semibold text-neutral-900">1. Maintenance Fee: ₦4,500 vs ₦500</td>
                <td className="py-3 px-3 font-mono-tabular">₦4,500 or ₦500</td>
                <td className="py-3 px-3">
                  Implemented as a dynamic configurable parameter in both mobile calculator and admin back-office. Default set to ₦4,500 with instant ₦500 toggle.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-neutral-900">2. Daily ROI: Fixed 0.8% vs Variable 0.8%–1%</td>
                <td className="py-3 px-3 font-mono-tabular">0.80% – 1.00%</td>
                <td className="py-3 px-3">
                  Interactive slider allows testing returns across the 0.8% to 1.0% range. The UI communicates guaranteed baseline coverage at 0.8% with upside surplus.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-neutral-900">3. School Portal: Phase 1 or Phase 2?</td>
                <td className="py-3 px-3">Phase 1 MVP vs Phase 2</td>
                <td className="py-3 px-3">
                  Phase 1 includes the dual-receipt mobile upload; Phase 2 introduces the dedicated School Bursar Portal (accessible via the top navigation switcher).
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-neutral-900">4. Beneficiary Lifecycle Events</td>
                <td className="py-3 px-3">Graduation, Transfer, Deceased</td>
                <td className="py-3 px-3">
                  Built full dedicated exception screens for graduation surplus to communal pool, fee recalculation for transfers, and sensitive deceased-user NOK transfers.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
