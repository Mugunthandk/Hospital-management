import React, { useState, useEffect } from 'react';
import {
  QrCode,
  CreditCard,
  Building2,
  Smartphone,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  Copy,
  Download,
  AlertCircle,
  RefreshCw,
  Wallet,
  Building,
  Lock,
  Receipt,
  Printer,
  ChevronRight,
  X,
} from 'lucide-react';

export interface PaymentSuccessDetails {
  method: string;
  referenceId: string;
  timestamp: string;
  amount: number;
  patientName?: string;
  billingTitle: string;
  branchName?: string;
}

export interface PaymentComponentProps {
  amount: number;
  billingTitle: string;
  patientName?: string;
  patientPhone?: string;
  billId?: string;
  branchName?: string;
  onPaymentSuccess?: (details: PaymentSuccessDetails) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export const PaymentComponent: React.FC<PaymentComponentProps> = ({
  amount,
  billingTitle,
  patientName = 'Valued Patient',
  patientPhone = '+1 (555) 019-2831',
  billId = `BILL-${Math.floor(100000 + Math.random() * 900000)}`,
  branchName = 'HealthFlow Main Campus',
  onPaymentSuccess,
  onCancel,
  isModal = false,
}) => {
  type PaymentMethod = 'qr' | 'card' | 'netbanking' | 'wallet' | 'insurance' | 'counter';

  const [activeMethod, setActiveMethod] = useState<PaymentMethod>('qr');

  // QR Timer & State
  const [qrTimer, setQrTimer] = useState<number>(300); // 5 minutes
  const [qrExpired, setQrExpired] = useState<boolean>(false);
  const [qrPaid, setQrPaid] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [upiId, setUpiId] = useState<string>('');
  const [upiError, setUpiError] = useState<string>('');

  // Card State
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');

  // Net Banking & Insurance
  const [selectedBank, setSelectedBank] = useState<string>('chase');
  const [insuranceProvider, setInsuranceProvider] = useState<string>('aetna');
  const [policyNumber, setPolicyNumber] = useState<string>('');

  // Payment Confirmation State
  const [successDetails, setSuccessDetails] = useState<PaymentSuccessDetails | null>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  // QR Countdown Effect
  useEffect(() => {
    if (activeMethod !== 'qr' || qrPaid || qrExpired) return;

    const interval = setInterval(() => {
      setQrTimer((prev) => {
        if (prev <= 1) {
          setQrExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeMethod, qrPaid, qrExpired]);

  const resetQrTimer = () => {
    setQrTimer(300);
    setQrExpired(false);
    setQrPaid(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateTxnRef = () => `TXN-HF-${Math.floor(10000000 + Math.random() * 90000000)}`;

  const handleCompletePayment = (methodName: string, refPrefix?: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const refId = refPrefix || generateTxnRef();
      const details: PaymentSuccessDetails = {
        method: methodName,
        referenceId: refId,
        timestamp: new Date().toLocaleString(),
        amount,
        patientName,
        billingTitle,
        branchName,
      };
      setSuccessDetails(details);
      setQrPaid(true);
      if (onPaymentSuccess) {
        onPaymentSuccess(details);
      }
    }, 1500);
  };

  const handleCardPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvv) return;
    handleCompletePayment('Credit/Debit Card');
  };

  const handleUpiPayRequest = () => {
    if (!upiId.includes('@')) {
      setUpiError('Please enter a valid VPA / UPI ID (e.g. name@bank)');
      return;
    }
    setUpiError('');
    handleCompletePayment('UPI Direct Collect');
  };

  const formatCardNumberInput = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  const formatExpiryInput = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) {
      setCardExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2)}`);
    } else {
      setCardExpiry(cleaned);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const serviceTax = 0; // Waived
  const totalPayable = amount;

  const content = (
    <div className="bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-4xl w-full mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b1f3a] via-[#1e3a8a] to-[#0b1f3a] p-6 border-b border-slate-800 flex items-center justify-between relative text-white">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-sky-500/20 text-sky-300 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-sky-400/30 tracking-wider">
              Secure Hospital OPD Billing
            </span>
            <span className="text-slate-300 text-xs font-mono">ID: {billId}</span>
          </div>
          <h2 className="text-xl font-bold text-white">{billingTitle}</h2>
          <p className="text-xs text-slate-300">
            Patient: <strong className="text-white">{patientName}</strong> • {branchName}
          </p>
        </div>

        {isModal && onCancel && (
          <button
            onClick={onCancel}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Main Payment Layout */}
      {successDetails ? (
        /* SUCCESS RECEIPT VIEW */
        <div className="p-8 space-y-6 text-center animate-fade-in bg-white">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-200 shadow-sm">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              PAYMENT VERIFIED & RECORDED
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">OPD Payment Successful</h3>
            <p className="text-xs text-slate-500 mt-1">
              Transaction token generated. An official receipt has been issued to {patientPhone}.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left max-w-lg mx-auto space-y-3.5 text-xs font-mono">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Transaction Reference:</span>
              <span className="font-bold text-blue-600 flex items-center gap-1.5">
                {successDetails.referenceId}
                <button
                  onClick={() => copyToClipboard(successDetails.referenceId)}
                  className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
                  title="Copy Reference"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Billing Description:</span>
              <span className="font-bold text-slate-800">{successDetails.billingTitle}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Paid Amount:</span>
              <span className="font-bold text-blue-600 text-sm">${successDetails.amount}.00</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Payment Gateway/Method:</span>
              <span className="font-bold text-slate-800">{successDetails.method}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Date & Timestamp:</span>
              <span className="font-bold text-slate-600">{successDetails.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Hospital Facility:</span>
              <span className="font-bold text-slate-800">{successDetails.branchName}</span>
            </div>
          </div>

          {copiedRef && (
            <p className="text-xs text-blue-600 font-bold animate-pulse">
              ✓ Transaction ID copied to clipboard!
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-6 py-3 rounded-xl border border-slate-300 transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Print Official OPD Receipt</span>
            </button>
            {onCancel && (
              <button
                onClick={onCancel}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-8 py-3 rounded-xl transition cursor-pointer flex items-center justify-center space-x-1 shadow-sm"
              >
                <span>Done & Return</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* PAYMENT FORM & METHOD SELECTOR */
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white">
          {/* Left Column: Method Selector Sidebar */}
          <div className="lg:col-span-4 bg-slate-50 p-6 border-r border-slate-200 space-y-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select Payment Method
            </span>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveMethod('qr')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeMethod === 'qr'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${activeMethod === 'qr' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-600'}`}>
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold">Dynamic QR Code</span>
                    <span className={`text-[10px] font-normal ${activeMethod === 'qr' ? 'text-blue-100' : 'text-slate-500'}`}>GPay, PhonePe, UPI & Mobile</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  activeMethod === 'qr' ? 'bg-white/20 text-white border-white/30' : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  Instant
                </span>
              </button>

              <button
                onClick={() => setActiveMethod('card')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeMethod === 'card'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${activeMethod === 'card' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-600'}`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold">Credit / Debit Card</span>
                    <span className={`text-[10px] font-normal ${activeMethod === 'card' ? 'text-blue-100' : 'text-slate-500'}`}>Visa, Mastercard, Amex</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveMethod('netbanking')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeMethod === 'netbanking'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${activeMethod === 'netbanking' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-600'}`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold">Net Banking</span>
                    <span className={`text-[10px] font-normal ${activeMethod === 'netbanking' ? 'text-blue-100' : 'text-slate-500'}`}>50+ Major Banking Networks</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveMethod('wallet')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeMethod === 'wallet'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${activeMethod === 'wallet' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-600'}`}>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold">Apple / Google Pay</span>
                    <span className={`text-[10px] font-normal ${activeMethod === 'wallet' ? 'text-blue-100' : 'text-slate-500'}`}>One-click Biometric Express</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveMethod('insurance')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeMethod === 'insurance'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${activeMethod === 'insurance' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-600'}`}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold">Insurance / TPA Claim</span>
                    <span className={`text-[10px] font-normal ${activeMethod === 'insurance' ? 'text-blue-100' : 'text-slate-500'}`}>Co-pay & Direct Settlement</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveMethod('counter')}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-xs font-bold transition cursor-pointer border ${
                  activeMethod === 'counter'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${activeMethod === 'counter' ? 'bg-white/20 text-white' : 'bg-slate-100 text-blue-600'}`}>
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold">Pay at OPD Counter</span>
                    <span className={`text-[10px] font-normal ${activeMethod === 'counter' ? 'text-blue-100' : 'text-slate-500'}`}>Cash / POS Desk at Hospital</span>
                  </div>
                </div>
              </button>
            </nav>

            {/* Price Summary Breakdown */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs shadow-sm">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Billing Summary
              </span>
              <div className="flex justify-between text-slate-600">
                <span>Base Consultation Fee</span>
                <span className="text-slate-900 font-mono">${amount}.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Hospital Convenience Fee</span>
                <span className="text-blue-600 font-bold">$0 (Waived)</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
                <span>Total Amount Due</span>
                <span className="text-blue-600 font-mono">${totalPayable}.00</span>
              </div>
            </div>
          </div>

          {/* Right Column: Active Payment Method Form */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6 bg-white">
            {/* METHOD 1: DYNAMIC QR CODE */}
            {activeMethod === 'qr' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-blue-600" />
                      Dynamic OPD Payment QR Code
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Scan with any camera app, Google Pay, PhonePe, Paytm, or Mobile Banking app.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200 font-mono">
                    <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>{formatTimer(qrTimer)}</span>
                  </div>
                </div>

                {!qrExpired ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* SVG Stylized Dynamic QR Code Canvas */}
                    <div className="md:col-span-5 flex flex-col items-center">
                      <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-blue-600 relative shrink-0">
                        <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="100" height="100" fill="white" />
                          {/* Corner Targets */}
                          <rect x="5" y="5" width="28" height="28" rx="4" fill="#0b1f3a" />
                          <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
                          <rect x="13" y="13" width="12" height="12" fill="#2563eb" />

                          <rect x="67" y="5" width="28" height="28" rx="4" fill="#0b1f3a" />
                          <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
                          <rect x="75" y="13" width="12" height="12" fill="#2563eb" />

                          <rect x="5" y="67" width="28" height="28" rx="4" fill="#0b1f3a" />
                          <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
                          <rect x="13" y="75" width="12" height="12" fill="#2563eb" />

                          {/* Dynamic Pattern Matrix Dots */}
                          <rect x="38" y="10" width="8" height="8" fill="#0b1f3a" />
                          <rect x="50" y="10" width="8" height="8" fill="#2563eb" />
                          <rect x="38" y="22" width="12" height="8" fill="#0b1f3a" />
                          <rect x="54" y="22" width="6" height="8" fill="#2563eb" />

                          <rect x="10" y="38" width="12" height="8" fill="#0b1f3a" />
                          <rect x="26" y="38" width="8" height="8" fill="#2563eb" />
                          <rect x="38" y="38" width="24" height="24" rx="4" fill="#0b1f3a" />
                          <rect x="42" y="42" width="16" height="16" fill="#2563eb" />

                          <rect x="68" y="38" width="12" height="8" fill="#0b1f3a" />
                          <rect x="84" y="38" width="8" height="8" fill="#2563eb" />

                          <rect x="38" y="68" width="10" height="8" fill="#2563eb" />
                          <rect x="52" y="68" width="12" height="8" fill="#0b1f3a" />
                          <rect x="68" y="68" width="24" height="24" fill="#0b1f3a" />
                          <rect x="72" y="72" width="16" height="16" fill="white" />
                          <rect x="76" y="76" width="8" height="8" fill="#2563eb" />
                        </svg>

                        {/* Scanner animation bar */}
                        <div className="absolute left-2 right-2 top-2 h-1 bg-blue-500 rounded-full shadow-md animate-pulse" />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-2 font-mono">
                        Merchant: HealthFlow OPD Services
                      </span>
                    </div>

                    {/* Simulation & UPI Collector */}
                    <div className="md:col-span-7 space-y-4">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                        <span className="text-xs font-bold text-slate-800 block">
                          Option 1: Simulate Scan from Mobile Phone
                        </span>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Test the instant payment workflow by clicking below to trigger an automated payment notification.
                        </p>
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => handleCompletePayment('Dynamic QR Code Scan')}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center space-x-2"
                        >
                          {isProcessing ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Verifying Payment...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 text-sky-200" />
                              <span>Simulate Phone Scan & Pay (${amount}.00)</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                        <span className="text-xs font-bold text-slate-800 block">
                          Option 2: Enter VPA / UPI ID directly
                        </span>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. mobile@upi or name@okicici"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="bg-white border border-slate-300 text-slate-900 text-xs px-3 py-2.5 rounded-xl flex-1 focus:outline-none focus:border-blue-600"
                          />
                          <button
                            type="button"
                            onClick={handleUpiPayRequest}
                            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer shrink-0"
                          >
                            Send Request
                          </button>
                        </div>
                        {upiError && <p className="text-[11px] text-rose-600 font-medium">{upiError}</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* QR EXPIRED STATE */
                  <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                    <h4 className="text-base font-bold text-slate-900">QR Code Expired</h4>
                    <p className="text-xs text-slate-600">
                      The dynamic payment QR session expired for security reasons. Click below to refresh a new code.
                    </p>
                    <button
                      onClick={resetQrTimer}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer inline-flex items-center space-x-1.5 shadow-sm"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Generate Fresh QR Code</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* METHOD 2: CREDIT / DEBIT CARD */}
            {activeMethod === 'card' && (
              <form onSubmit={handleCardPaymentSubmit} className="space-y-4 animate-fade-in">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Credit or Debit Card Payment
                  </h3>
                  <p className="text-xs text-slate-500">256-bit SSL Encrypted Payment Processing</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-700 font-bold block mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="4532 0192 8374 9182"
                        value={cardNumber}
                        onChange={(e) => formatCardNumberInput(e.target.value)}
                        className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:border-blue-600 font-mono tracking-wider"
                      />
                      <div className="absolute right-3 top-3 flex space-x-1 text-[10px] font-bold text-slate-400">
                        <span>VISA</span>
                        <span>•</span>
                        <span>MC</span>
                        <span>•</span>
                        <span>AMEX</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-700 font-bold block mb-1">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => formatExpiryInput(e.target.value)}
                        className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:border-blue-600 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-700 font-bold block mb-1">CVV / Security Code</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:border-blue-600 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-700 font-bold block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing Card Charge...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Pay Total ${amount}.00 via Secure Card</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* METHOD 3: NET BANKING */}
            {activeMethod === 'netbanking' && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Direct Net Banking Authorization
                  </h3>
                  <p className="text-xs text-slate-500">Instant login & payment via your bank account</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'chase', name: 'Chase Bank', icon: Building },
                    { id: 'bofa', name: 'Bank of America', icon: Building },
                    { id: 'citi', name: 'Citi Bank', icon: Building },
                    { id: 'wells', name: 'Wells Fargo', icon: Building },
                    { id: 'hsbc', name: 'HSBC International', icon: Building },
                    { id: 'hdfc', name: 'HDFC / ICICI', icon: Building },
                  ].map((bank) => (
                    <button
                      key={bank.id}
                      type="button"
                      onClick={() => setSelectedBank(bank.id)}
                      className={`p-3 rounded-xl border text-xs font-bold transition text-left cursor-pointer flex items-center space-x-2.5 ${
                        selectedBank === bank.id
                          ? 'bg-blue-50 text-blue-700 border-blue-400 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      <bank.icon className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{bank.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleCompletePayment(`NetBanking (${selectedBank.toUpperCase()})`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Redirecting to Bank Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Building2 className="w-4 h-4" />
                        <span>Authorize NetBanking Payment (${amount}.00)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* METHOD 4: WALLET / APPLE / GOOGLE PAY */}
            {activeMethod === 'wallet' && (
              <div className="space-y-6 text-center py-4 animate-fade-in">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-center mx-auto text-blue-600">
                  <Wallet className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Apple Pay & Google Pay Express</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Pay instantly using Touch ID, Face ID, or your biometric wallet on your device.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleCompletePayment('Apple Pay Biometric')}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs transition shadow cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span> Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleCompletePayment('Google Pay Wallet')}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs transition shadow cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>G Pay Express</span>
                  </button>
                </div>
              </div>
            )}

            {/* METHOD 5: INSURANCE / TPA */}
            {activeMethod === 'insurance' && (
              <div className="space-y-4 animate-fade-in">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    Insurance & TPA Co-Pay Pre-authorization
                  </h3>
                  <p className="text-xs text-slate-500">Direct cashless OPD pre-clearance</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-700 font-bold block mb-1">Insurance Provider</label>
                    <select
                      value={insuranceProvider}
                      onChange={(e) => setInsuranceProvider(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:border-blue-600"
                    >
                      <option value="aetna">Aetna Health Care</option>
                      <option value="bcbs">Blue Cross Blue Shield</option>
                      <option value="united">UnitedHealthcare</option>
                      <option value="cigna">Cigna Global</option>
                      <option value="kaiser">Kaiser Permanente</option>
                      <option value="star">Star Health TPA</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-700 font-bold block mb-1">Policy / Member ID Number</label>
                    <input
                      type="text"
                      placeholder="e.g. POL-99201928"
                      value={policyNumber}
                      onChange={(e) => setPolicyNumber(e.target.value)}
                      className="w-full bg-white border border-slate-300 text-slate-900 text-xs px-3.5 py-3 rounded-xl focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center justify-between">
                    <span>Approved OPD Co-Pay Discount:</span>
                    <strong className="font-extrabold text-blue-700">100% Cashless Coverage</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleCompletePayment(`Insurance Settlement (${insuranceProvider.toUpperCase()})`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying Policy Claim...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Submit Insurance Pre-Approval Claim</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* METHOD 6: PAY AT OPD COUNTER */}
            {activeMethod === 'counter' && (
              <div className="space-y-5 text-center py-4 animate-fade-in">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl border border-blue-200 flex items-center justify-center mx-auto text-blue-600">
                  <Receipt className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">Pay Cash / Card at Hospital Counter</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Generate a physical billing token to pay directly at the OPD registration desk before seeing the doctor.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Desk Location:</span>
                    <span className="font-bold text-slate-900">{branchName} Counter 1 & 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Due at Desk:</span>
                    <span className="font-extrabold text-blue-600">${amount}.00</span>
                  </div>
                </div>

                <div className="pt-2 max-w-md mx-auto">
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={() => handleCompletePayment('Pay at Hospital OPD Counter', `TOKEN-DESK-${Math.floor(1000 + Math.random() * 9000)}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>Generate Counter Billing Token</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
        {content}
      </div>
    );
  }

  return content;
};
