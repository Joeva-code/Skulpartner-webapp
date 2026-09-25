import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  UploadCloud, 
  User, 
  GraduationCap, 
  Lock, 
  Smartphone, 
  Mail, 
  FileText,
  KeyRound,
  Sparkles,
  Info
} from 'lucide-react';
import { formatNaira } from '../../utils/financial';

interface ScreenOnboardingProps {
  onComplete: () => void;
  isWireframeMode?: boolean;
}

export const ScreenOnboarding: React.FC<ScreenOnboardingProps> = ({
  onComplete,
  isWireframeMode = false
}) => {
  const [step, setStep] = useState<number>(1); // 1 to 8

  // Form State
  const [email, setEmail] = useState('adebayo.oladipo@lagosgroup.ng');
  const [phone, setPhone] = useState('+234 803 456 7890');
  const [password, setPassword] = useState('••••••••••••');
  const [otp, setOtp] = useState('849201');
  const [bvn, setBvn] = useState('22194830192');
  const [nin, setNin] = useState('74910283741');
  const [idUploaded, setIdUploaded] = useState(true);
  const [utilityUploaded, setUtilityUploaded] = useState(true);

  // Beneficiary
  const [studentName, setStudentName] = useState('Zainab Kemi Oladipo');
  const [dob, setDob] = useState('2010-04-18');
  const [school, setSchool] = useState('Corona Secondary School, Agbara');
  const [grade, setGrade] = useState('Senior Secondary 2 (SS2)');
  const [annualFees, setAnnualFees] = useState(149000);

  // Next of Kin
  const [nokName, setNokName] = useState('Mrs. Folashade Oladipo');
  const [nokRel, setNokRel] = useState('Spouse');
  const [nokPhone, setNokPhone] = useState('+234 802 334 1122');
  const [nokBank, setNokBank] = useState('Guaranty Trust Bank (GTBank)');
  const [nokAccount, setNokAccount] = useState('0129481023');

  // Consent
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [ndprAccepted, setNdprAccepted] = useState(true);

  return (
    <div className={`space-y-4 pb-20 ${isWireframeMode ? 'font-mono' : ''}`}>
      {/* Step Indicator Header (unless on welcome) */}
      {step > 1 && step < 8 && (
        <div className="flex items-center justify-between pb-1 border-b border-neutral-200">
          <button
            onClick={() => setStep(step - 1)}
            className="p-1 rounded-full text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">
            Step {step - 1} of 6
          </div>
          <div className="w-5" />
        </div>
      )}

      {/* STEP 1: WELCOME / LANDING */}
      {step === 1 && (
        <div className="space-y-5 text-center pt-2">
          {/* Hero Banner Asset */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-neutral-200 aspect-[16/10]">
            <img 
              src="/src/assets/images/skulpartners_family_hero_1790332243685.jpg" 
              alt="SKULPARTNERS Family Education"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-left text-white">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                PAY ONCE, STUDY FREE
              </span>
              <h2 className="text-xl font-bold leading-tight mt-0.5">
                Fund Your Child’s Entire Year with 70% Upfront.
              </h2>
            </div>
          </div>

          <div className="space-y-2 text-xs text-neutral-600 max-w-xs mx-auto">
            <p>
              SKULPARTNERS uses safe, cooperative escrow yields to pay 100% of your child’s termly tuition directly to their school.
            </p>
          </div>

          {/* Value Props Bullet */}
          <div className="space-y-2 text-left bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs">
            <div className="flex items-center gap-2 text-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Pay 70% upfront · Zero future term fees for the year</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct automated settlements to accredited schools</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>NDIC Underwritten & SCUML/EFCC Compliant</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-[0.98] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onComplete()}
              className="w-full py-3 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold rounded-2xl text-xs border border-neutral-300 transition-colors"
            >
              Already Registered? Log In with User ID
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: REGISTRATION */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Create Parent Account</h3>
            <p className="text-xs text-neutral-500">Provide official contact information for KYC matching.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="parent@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Nigerian Phone Number</label>
              <div className="relative">
                <Smartphone className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-mono-tabular focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="+234 803 000 0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Account Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="••••••••••••"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(3)}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
          >
            <span>Continue to OTP Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: OTP VERIFICATION */}
      {step === 3 && (
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-900">Verify Your Identity</h3>
            <p className="text-xs text-neutral-500 mt-1">
              We sent a 6-digit authentication token to <span className="font-semibold text-neutral-800">{phone}</span> and <span className="font-semibold text-neutral-800">{email}</span>.
            </p>
          </div>

          <div className="py-2">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-48 mx-auto px-4 py-3 bg-white border-2 border-emerald-600 rounded-xl text-center text-xl font-mono-tabular tracking-widest focus:outline-none"
            />
          </div>

          <div className="text-[11px] text-neutral-500">
            Didn't receive code? <button className="font-bold text-emerald-700 underline">Resend in 24s</button>
          </div>

          <button
            onClick={() => setStep(4)}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
          >
            <span>Confirm & Proceed to KYC</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 4: KYC VERIFICATION */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-neutral-900">KYC & AML Verification</h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">Mandated by CBN, NIBSS, and SCUML Anti-Money Laundering frameworks.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Bank Verification Number (BVN)</label>
              <input
                type="text"
                maxLength={11}
                value={bvn}
                onChange={(e) => setBvn(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-mono-tabular focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                placeholder="22194830192"
              />
              <p className="text-[10px] text-neutral-400 mt-1">BVN is encrypted and cross-matched against NIBSS records.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">National Identity Number (NIN)</label>
              <input
                type="text"
                maxLength={11}
                value={nin}
                onChange={(e) => setNin(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-mono-tabular focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                placeholder="74910283741"
              />
            </div>

            {/* Document Upload Status Boxes */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Government ID</span>
                <span className="font-semibold text-emerald-700 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> NIN Slip Attached
                </span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-center">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">Proof of Address</span>
                <span className="font-semibold text-emerald-700 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> IKEDC Bill Attached
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(5)}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
          >
            <span>Proceed to Beneficiary Setup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 5: BENEFICIARY PROFILE */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-neutral-900">Beneficiary Student Profile</h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">The child who will benefit from full school fee coverage.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Student Full Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Current Class / Level</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">School Name</label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Annual School Fees (₦)</label>
              <input
                type="number"
                value={annualFees}
                onChange={(e) => setAnnualFees(Number(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-mono-tabular font-bold text-neutral-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={() => setStep(6)}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
          >
            <span>Proceed to Next of Kin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 6: NEXT OF KIN */}
      {step === 6 && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-neutral-900">Next of Kin & Deceased Protocol</h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">Designated beneficiary to protect tuition continuity.</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Next of Kin Full Name</label>
              <input
                type="text"
                value={nokName}
                onChange={(e) => setNokName(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={nokRel}
                  onChange={(e) => setNokRel(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={nokPhone}
                  onChange={(e) => setNokPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-mono-tabular focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={nokBank}
                  onChange={(e) => setNokBank(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={nokAccount}
                  onChange={(e) => setNokAccount(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-xl text-xs font-mono-tabular focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(7)}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
          >
            <span>Proceed to Terms & Consent</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 7: TERMS & NDPR CONSENT */}
      {step === 7 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Regulatory Consent & NDPR</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Please review the escrow terms governing the 70% upfront model.</p>
          </div>

          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-600 space-y-2 max-h-48 overflow-y-auto">
            <p className="font-semibold text-neutral-900">1. Educational Trust Governance</p>
            <p>
              Capital invested into SKULPARTNERS is managed under the Federal Department of Cooperatives framework and underwritten for primary term tuition settlement.
            </p>
            <p className="font-semibold text-neutral-900">2. Termly Payout Commission</p>
            <p>
              A 10% platform commission is calculated on the gross accrued investment profit at the culmination of each 121-123 day cycle.
            </p>
            <p className="font-semibold text-neutral-900">3. NDPR & Data Privacy</p>
            <p>
              All BVN, NIN, and bank data are stored according to Nigeria Data Protection Regulation (NDPR) standards.
            </p>
          </div>

          <div className="space-y-2 pt-2 text-xs">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-neutral-700">I agree to the SKULPARTNERS Terms of Service and Escrow Governance.</span>
            </label>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={ndprAccepted}
                onChange={(e) => setNdprAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-neutral-700">I consent to NDPR compliant verification of my BVN & identity.</span>
            </label>
          </div>

          <button
            onClick={() => setStep(8)}
            disabled={!termsAccepted || !ndprAccepted}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4 disabled:opacity-50"
          >
            <span>Complete Registration & Issue User ID</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 8: USER ID ISSUED (SUCCESS) */}
      {step === 8 && (
        <div className="space-y-5 text-center pt-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-8 h-8 text-emerald-600" />
          </div>

          <div>
            <span className="text-xs uppercase font-bold text-emerald-700 tracking-wider">REGISTRATION SUCCESSFUL</span>
            <h3 className="text-xl font-bold text-neutral-900 mt-1">Your SKULPARTNERS ID is Ready</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Use this unique User ID for authentication, portal login, and school fee reconciliation.
            </p>
          </div>

          {/* User ID Badge */}
          <div className="bg-neutral-900 text-white p-5 rounded-3xl shadow-xl max-w-xs mx-auto border border-neutral-700">
            <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">OFFICIAL PARENT USER ID</div>
            <div className="text-2xl font-black font-mono-tabular tracking-wider text-emerald-400 my-2">
              SKP-2026-8842
            </div>
            <div className="text-xs text-neutral-300">{email}</div>
            <div className="text-[10px] text-emerald-400/80 mt-1">KYC Tier 2 · Cleared</div>
          </div>

          <div className="p-3 bg-neutral-100/70 rounded-2xl text-xs text-neutral-600 max-w-xs mx-auto text-left flex items-start gap-2">
            <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
            <p>
              Target onboarding time achieved (under 10 minutes). You can now fund your upfront 70% tuition plan.
            </p>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-[0.98] transition-all"
          >
            <span>Enter Main Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
