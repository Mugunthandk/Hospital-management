import React, { useState } from 'react';
import { PaymentComponent } from './PaymentComponent';
import { QrCode, Search, FileText, CheckCircle2, ShieldCheck, CreditCard, Building2 } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const BillPayPage: React.FC = () => {
  const { currentBranch } = useHospital();
  const [billNumber, setBillNumber] = useState('');
  const [patientMobile, setPatientMobile] = useState('');
  const [searchedBill, setSearchedBill] = useState<{
    billId: string;
    patientName: string;
    title: string;
    amount: number;
    department: string;
  } | null>({
    billId: 'OPD-BILL-882190',
    patientName: 'Sarah Jenkins',
    title: 'OPD Specialist Consultation & Diagnostic Billing',
    amount: 175,
    department: 'Gastroenterology & OPD',
  });

  const handleSearchBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billNumber) return;
    setSearchedBill({
      billId: billNumber.toUpperCase(),
      patientName: 'Patient ' + billNumber.slice(-4),
      title: 'OPD Consultation & Pharmacy Invoice',
      amount: 140,
      department: 'Outpatient Department',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#0b1f3a] via-[#004d40] to-[#0b1f3a] text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              Instant OPD & Lab Bill Payment Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">Pay OPD Bill & Scan QR Code</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Pay outpatient consultation fees, lab diagnostic bills, and pharmacy invoices securely via dynamic QR Code, UPI, Cards, NetBanking, or Health Insurance.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center text-xs space-y-1 shrink-0">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
            <span className="block font-extrabold text-white">256-Bit SSL Encrypted</span>
            <span className="text-[10px] text-emerald-300">Official Hospital Billing Gateway</span>
          </div>
        </div>

        {/* Bill Search bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-600" />
            <span>Search Bill or Enter OPD Receipt Reference Number</span>
          </h3>

          <form onSubmit={handleSearchBill} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-5 relative">
              <FileText className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="OPD Bill ID / Token (e.g. OPD-BILL-882190)"
                value={billNumber}
                onChange={(e) => setBillNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div className="sm:col-span-4">
              <input
                type="tel"
                placeholder="Registered Mobile Number"
                value={patientMobile}
                onChange={(e) => setPatientMobile(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full bg-[#0b1f3a] hover:bg-[#122b4f] text-white font-bold text-xs py-2.5 rounded-xl transition shadow cursor-pointer"
              >
                Fetch Bill Details
              </button>
            </div>
          </form>
        </div>

        {/* Interactive Payment Component */}
        {searchedBill && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-600 px-2">
              <span className="font-bold text-slate-800">
                Found Bill for <strong className="text-emerald-700">{searchedBill.patientName}</strong>
              </span>
              <span className="text-slate-500 font-mono">Status: UNPAID OPD INVOICE</span>
            </div>

            <PaymentComponent
              amount={searchedBill.amount}
              billingTitle={searchedBill.title}
              patientName={searchedBill.patientName}
              billId={searchedBill.billId}
              branchName={currentBranch.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};
