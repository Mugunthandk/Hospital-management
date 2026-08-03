import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Calendar,
  FileText,
  Pill,
  Microscope,
  DollarSign,
  Download,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Heart,
  Activity,
  Sparkles,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react';

export const PatientPortal: React.FC = () => {
  const {
    patients,
    appointments,
    prescriptions,
    labTests,
    invoices,
    openActionModal,
    openAIModal,
  } = useHospital();

  const currentPatient = patients[0]; // Patient view context
  const [activeTab, setActiveTab] = useState<'appointments' | 'prescriptions' | 'labs' | 'bills'>('appointments');
  const [downloadNotice, setDownloadNotice] = useState('');

  const patientAppointments = (appointments || []).filter(
    (a) => a.patientId === currentPatient?.id || a.patientName === currentPatient?.name
  );
  const patientPrescriptions = (prescriptions || []).filter(
    (p) => p.patientId === currentPatient?.id || p.patientName === currentPatient?.name
  );
  const patientLabTests = (labTests || []).filter(
    (l) => l.patientId === currentPatient?.id || l.patientName === currentPatient?.name
  );
  const patientInvoices = (invoices || []).filter(
    (i) => i.patientId === currentPatient?.id || i.patientName === currentPatient?.name
  );

  const handleDownloadPDF = (title: string) => {
    setDownloadNotice(`Generating official PDF export for "${title}"... Download started!`);
    setTimeout(() => setDownloadNotice(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Patient Profile Card Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 text-white font-black text-2xl flex items-center justify-center shadow-md">
            {currentPatient?.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-slate-900">{currentPatient?.name}</h1>
              <span className="bg-teal-50 text-teal-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
                MRN: {currentPatient?.mrn}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {currentPatient?.gender}, {currentPatient?.age} yrs • Blood Type: <strong className="text-rose-600">{currentPatient?.bloodType}</strong> • Phone: {currentPatient?.phone}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => openActionModal('new_appointment')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Book New OPD Appointment</span>
          </button>
          <button
            onClick={() => openAIModal('summarize_records', { patientName: currentPatient?.name })}
            className="bg-slate-900 hover:bg-slate-800 text-emerald-400 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Record Summarizer</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
          <span>{downloadNotice}</span>
        </div>
      )}

      {/* Patient Vitals Quick Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Blood Pressure</span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{currentPatient?.vitals?.bloodPressure || '120/80'}</div>
          <span className="text-[10px] text-emerald-600 font-bold">Optimal Range</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Heart Pulse</span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{currentPatient?.vitals?.heartRate ?? 72} bpm</div>
          <span className="text-[10px] text-teal-600 font-bold">Resting BPM</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Oxygen Level</span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{currentPatient?.vitals?.spO2 ?? 98}%</div>
          <span className="text-[10px] text-cyan-600 font-bold">Normal SpO2</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Body Temp</span>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{currentPatient?.vitals?.temperature ?? 98.6} °F</div>
          <span className="text-[10px] text-amber-600 font-bold">Normal Afebril</span>
        </div>
      </div>

      {/* Main Workspace Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 flex space-x-2 text-xs font-bold shadow-sm">
        {[
          { id: 'appointments', label: `My Appointments (${patientAppointments.length})`, icon: Calendar },
          { id: 'prescriptions', label: `Digital Prescriptions (${patientPrescriptions.length})`, icon: Pill },
          { id: 'labs', label: `Lab & Diagnostics (${patientLabTests.length})`, icon: Microscope },
          { id: 'bills', label: `Billing & Claims (${patientInvoices.length})`, icon: DollarSign },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Appointments Roster */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientAppointments.map((app) => (
              <div key={app.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Token #{app.id.slice(-3)}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{app.doctorName}</h3>
                    <p className="text-xs text-slate-500">{app.departmentName}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      app.status === 'Scheduled'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : app.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{app.date} at {app.time}</span>
                  </div>
                  <span className="font-semibold text-slate-700">Type: {app.type}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => handleDownloadPDF(`Appointment Ticket #${app.id}`)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2 rounded-xl border border-slate-200 transition flex items-center justify-center"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Download Slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Digital Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          {patientPrescriptions.map((rx) => (
            <div key={rx.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{rx.diagnosis}</h3>
                  <p className="text-xs text-slate-500">
                    Prescribed by <strong className="text-slate-700">{rx.doctorName}</strong> on {rx.date}
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadPDF(`Prescription Rx #${rx.id}`)}
                  className="bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> PDF Rx
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Prescribed Medications:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(rx.medications || []).map((m, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <div className="flex justify-between font-bold text-xs text-slate-900">
                        <span>{m.drugName}</span>
                        <span className="text-teal-700">{m.dosage}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        Frequency: {m.frequency} • Duration: {m.duration}
                      </p>
                      <p className="text-[10px] text-slate-500 italic">{m.instructions}</p>
                    </div>
                  ))}
                </div>
              </div>

              {rx.notes && (
                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 text-xs text-amber-900">
                  <strong>Doctor Advice:</strong> {rx.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Lab Test Reports */}
      {activeTab === 'labs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientLabTests.map((lab) => (
              <div key={lab.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {lab.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{lab.testName}</h3>
                    <p className="text-xs text-slate-500">Ordered by {lab.requestedBy} • {lab.orderDate}</p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      lab.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {lab.status}
                  </span>
                </div>

                {lab.status === 'Completed' && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs text-slate-700">
                    <p className="font-bold text-slate-900">Lab Values:</p>
                    {Object.entries(lab.results || {}).map(([key, val]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-600">{key}:</span>
                        <span className="font-semibold text-teal-700">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => handleDownloadPDF(`Lab Report #${lab.id}`)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2.5 rounded-xl transition flex items-center justify-center"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Download Full Diagnostic PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Invoices & Insurance Claims */}
      {activeTab === 'bills' && (
        <div className="space-y-4">
          {patientInvoices.map((inv) => (
            <div key={inv.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Invoice #{inv.id}</h3>
                  <p className="text-xs text-slate-500">Billing Date: {inv.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900">${inv.totalAmount}</div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                {(inv.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-50">
                    <span>{item.description}</span>
                    <span className="font-semibold text-slate-900">${item.amount}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs pt-2">
                <span className="text-slate-500">Insurance Network Claim: <strong className="text-slate-800">{currentPatient?.insuranceProvider}</strong></span>
                {inv.status === 'Pending' && (
                  <button
                    onClick={() => handleDownloadPDF(`Payment Receipt #${inv.id}`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                  >
                    Pay Invoice Online
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
