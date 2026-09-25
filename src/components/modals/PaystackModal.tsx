import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Building2, Smartphone, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { formatNaira } from '../../utils/financial';

interface PaystackModalProps {
  isOpen: boolean;
  amount: number;
  email: string;
  reference: string;
  onSuccess: (ref: string) => void;
  onClose: () => void;
}

export const PaystackModal: React.FC<PaystackModalProps> = ({
  isOpen,
  amount,
  email,
  reference,
  onSuccess,
  onClose,
}) => {
  const [channel, setChannel] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [cardNumber, setCardNumber] = useState('5399 8320 1920 4819');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('381');
  const [pin, setPin] = useState('1234');
  const [step, setStep] = useState<'input' | 'processing' | 'otp' | 'success'>('input');
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('otp');
    }, 1200);
  };

  const handleVerifyOtp = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess(reference);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 text-neutral-900">
        {/* Paystack Header */}
        <div className="bg-[#001E3C] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#09A5DB] flex items-center justify-center font-bold text-white text-base tracking-tighter">
              p
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Paystack Checkout</div>
              <div className="text-sm font-medium text-white">SKULPARTNERS Escrow</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount & Email Bar */}
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200 flex justify-between items-center text-xs text-neutral-600">
          <span className="truncate max-w-[200px]">{email}</span>
          <span className="text-base font-bold text-neutral-900 font-mono-tabular">{formatNaira(amount)}</span>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === 'input' && (
            <div>
              {/* Payment Channel Selector */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setChannel('card')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                    channel === 'card' 
                      ? 'border-[#09A5DB] bg-[#09A5DB]/5 text-[#001E3C] shadow-sm ring-1 ring-[#09A5DB]' 
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1" />
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setChannel('transfer')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                    channel === 'transfer' 
                      ? 'border-[#09A5DB] bg-[#09A5DB]/5 text-[#001E3C] shadow-sm ring-1 ring-[#09A5DB]' 
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <Building2 className="w-4 h-4 mb-1" />
                  Bank Transfer
                </button>
                <button
                  type="button"
                  onClick={() => setChannel('ussd')}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-xs font-medium transition-all ${
                    channel === 'ussd' 
                      ? 'border-[#09A5DB] bg-[#09A5DB]/5 text-[#001E3C] shadow-sm ring-1 ring-[#09A5DB]' 
                      : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mb-1" />
                  USSD
                </button>
              </div>

              {channel === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">CARD NUMBER</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm font-mono-tabular tracking-wider focus:outline-none focus:ring-2 focus:ring-[#09A5DB] focus:border-transparent"
                        placeholder="5399 0000 0000 0000"
                      />
                      <div className="absolute right-3 top-2.5 text-xs font-bold text-neutral-400">Mastercard</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1">CARD EXPIRY</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm font-mono-tabular focus:outline-none focus:ring-2 focus:ring-[#09A5DB]"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-neutral-600 mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm font-mono-tabular focus:outline-none focus:ring-2 focus:ring-[#09A5DB]"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-1">CARD PIN</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full px-3 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm tracking-widest text-center font-mono focus:outline-none focus:ring-2 focus:ring-[#09A5DB]"
                      placeholder="••••"
                    />
                  </div>

                  <button
                    onClick={handlePay}
                    className="w-full py-3 bg-[#09A5DB] hover:bg-[#078cbd] text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-4"
                  >
                    <Lock className="w-4 h-4" />
                    Pay {formatNaira(amount)}
                  </button>
                </div>
              )}

              {channel === 'transfer' && (
                <div className="space-y-4 text-center py-2">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-xs text-neutral-600 mb-1">Transfer exactly this amount to:</p>
                    <div className="text-xl font-bold font-mono-tabular text-neutral-900 mb-2">{formatNaira(amount)}</div>
                    <div className="text-sm font-semibold text-neutral-800">Wema Bank / Paystack-SKUL</div>
                    <div className="text-lg font-mono tracking-wider font-bold text-neutral-900 bg-white py-1 px-3 rounded border border-neutral-300 inline-block my-2">
                      7829103948
                    </div>
                    <p className="text-[11px] text-neutral-500">Account expires in 29:45 minutes</p>
                  </div>
                  <button
                    onClick={handlePay}
                    className="w-full py-3 bg-[#09A5DB] hover:bg-[#078cbd] text-white font-semibold rounded-xl text-sm transition-all shadow-md"
                  >
                    I have made this transfer
                  </button>
                </div>
              )}

              {channel === 'ussd' && (
                <div className="space-y-4 text-center py-3">
                  <div className="p-4 bg-neutral-100 rounded-xl">
                    <p className="text-xs text-neutral-600 mb-2">Dial the following USSD string on your registered phone:</p>
                    <div className="text-lg font-mono font-bold text-neutral-900 bg-white py-2 px-4 rounded border border-neutral-300 inline-block">
                      *737*50*110365*8842#
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-2">Guaranty Trust Bank (GTBank)</p>
                  </div>
                  <button
                    onClick={handlePay}
                    className="w-full py-3 bg-[#09A5DB] hover:bg-[#078cbd] text-white font-semibold rounded-xl text-sm transition-all"
                  >
                    Confirm USSD Dialed
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-10 h-10 text-[#09A5DB] animate-spin mb-3" />
              <div className="font-semibold text-neutral-900 text-sm">Authorizing with Issuing Bank...</div>
              <p className="text-xs text-neutral-500 mt-1">Please do not refresh or close this window.</p>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-neutral-900 text-base">Enter 6-Digit OTP</h4>
              <p className="text-xs text-neutral-600">
                A verification code was sent by your bank to <b>+234 803 *** **90</b>
              </p>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6 5 4 3 2 1"
                className="w-48 mx-auto px-4 py-3 bg-white border border-neutral-300 rounded-xl text-center text-xl font-mono tracking-widest focus:ring-2 focus:ring-[#09A5DB] focus:outline-none"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full py-3 bg-[#09A5DB] hover:bg-[#078cbd] text-white font-semibold rounded-xl text-sm transition-all shadow-md mt-3"
              >
                Authorize Payment
              </button>
              <div className="text-[11px] text-neutral-500">Resend OTP in 38s</div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-neutral-900 text-lg">Payment Successful!</h3>
              <p className="text-xs text-neutral-600 mt-1 max-w-xs">
                {formatNaira(amount)} has been secured in the SKULPARTNERS Educational Escrow. Ref: {reference}
              </p>
            </div>
          )}
        </div>

        {/* Footer Security Badges */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit TLS Encrypted</span>
          </div>
          <span>Secured by Paystack</span>
        </div>
      </div>
    </div>
  );
};
