import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Users,
  Search,
  CheckCircle2,
  Sparkles,
  Pill,
  Microscope,
  Activity,
  ShieldAlert,
  FileText,
  Plus,
  Save,
} from 'lucide-react';

export const DoctorPortal: React.FC = () => {
  const {
    patients,
    appointments,
    doctors,
    openAIModal,
    openActionModal,
    addPrescription,
    addLabTest,
    updateAppointmentStatus,
  } = useHospital();

  const currentDoctor = doctors[0]; // Primary doctor context
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'queue' | 'ehr' | 'prescription' | 'labs'>('queue');
  const [searchQuery, setSearchQuery] = useState('');

  // Prescription Form state
  const [rxMeds, setRxMeds] = useState<{ drugName: string; dosage: string; frequency: string; duration: string }[]>([
    { drugName: 'Amoxicillin 500mg', dosage: '1 Capsule', frequency: 'Three times daily (TID)', duration: '5 Days' },
  ]);
  const [rxDiagnosis, setRxDiagnosis] = useState('Acute Upper Respiratory Tract Infection (J06.9)');
  const [rxNotes, setRxNotes] = useState('Drink warm fluids, rest for 3 days. Revisit if fever persists over 101°F.');
  const [rxSuccessMsg, setRxSuccessMsg] = useState('');

  // Lab Test state
  const [selectedLabTest, setSelectedLabTest] = useState('Complete Blood Count (CBC) with Differential');
  const [labNotes, setLabNotes] = useState('Stat lab request prior to evening rounds.');

  const selectedPatient = (patients || []).find((p) => p.id === selectedPatientId) || patients?.[0];

  const doctorAppointments = (appointments || []).filter(
    (app) => app.doctorId === currentDoctor?.id || app.doctorName === currentDoctor?.name
  );

  const filteredAppointments = doctorAppointments.filter((app) =>
    app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMedRow = () => {
    setRxMeds([...rxMeds, { drugName: '', dosage: '1 Tablet', frequency: 'Twice daily (BID)', duration: '7 Days' }]);
  };

  const handleRemoveMedRow = (index: number) => {
    setRxMeds(rxMeds.filter((_, i) => i !== index));
  };

  const handleSavePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    addPrescription({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      date: new Date().toISOString().split('T')[0],
      diagnosis: rxDiagnosis,
      medications: rxMeds.map((m) => ({
        drugName: m.drugName || 'Generic Supplement',
        dosage: m.dosage,
        frequency: m.frequency,
        duration: m.duration,
        instructions: 'Take after meals with water.',
      })),
      notes: rxNotes,
    });

    setRxSuccessMsg('Electronic Prescription (e-Rx) issued successfully and synced to Pharmacy POS!');
    setTimeout(() => setRxSuccessMsg(''), 4000);
  };

  const handleOrderLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    addLabTest({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      testName: selectedLabTest,
      category: 'Bloodwork',
      requestedBy: currentDoctor.name,
      orderDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      results: {},
      urgency: 'Routine',
    });

    setRxSuccessMsg(`Lab Test "${selectedLabTest}" ordered & sent to Diagnostic LIMS Queue!`);
    setTimeout(() => setRxSuccessMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Banner & Doctor Greeting */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentDoctor?.avatar}
            alt={currentDoctor?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500 shadow-sm"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';
            }}
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-[#0b1f3a]">{currentDoctor?.name}</h1>
              <span className="bg-teal-50 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded border border-teal-200">
                {currentDoctor?.specialty}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              OPD Chamber: {currentDoctor?.roomNumber} • OPD Schedule: Today (9:00 AM - 5:00 PM)
            </p>
          </div>
        </div>

        {/* AI Clinical Helper Quick Launcher */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => openAIModal('clinical_support', { patientName: selectedPatient?.name })}
            className="flex-1 md:flex-none bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow cursor-pointer transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Clinical Decision Support</span>
          </button>
          <button
            onClick={() => openActionModal('new_appointment')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 border border-slate-300 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-600" />
            <span>Add Walk-in OPD</span>
          </button>
        </div>
      </div>

      {rxSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center shadow-sm">
          <CheckCircle2 className="w-5 h-5 mr-2 shrink-0 text-emerald-600" />
          <span>{rxSuccessMsg}</span>
        </div>
      )}

      {/* Main Grid: Left OPD Queue & Right EHR Patient Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Patient OPD Queue & Search */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-[#0b1f3a] text-base flex items-center">
                <Users className="w-4 h-4 mr-2 text-teal-600" />
                Today's Patient Queue
              </h3>
              <span className="text-xs bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-200">
                {filteredAppointments.length} Booked
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-teal-500 font-medium"
              />
            </div>

            {/* Appointment Queue Cards */}
            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {filteredAppointments.map((app) => {
                const pat = patients.find((p) => p.id === app.patientId || p.name === app.patientName);
                const isSelected = selectedPatient?.id === pat?.id;

                return (
                  <div
                    key={app.id}
                    onClick={() => pat && setSelectedPatientId(pat.id)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50 border-teal-400 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{app.patientName}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {app.time} • Token: <strong className="text-teal-700 font-bold">#{app.id.slice(-3)}</strong>
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          app.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : app.status === 'Scheduled'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                      <span className="truncate max-w-[180px]">Reason: {app.type}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateAppointmentStatus(app.id, 'Completed');
                        }}
                        className="text-[10px] bg-white hover:bg-emerald-600 hover:text-white text-slate-700 font-bold px-2 py-1 rounded border border-slate-300 transition shadow-sm"
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => openActionModal('add_patient')}
            className="w-full bg-slate-100 hover:bg-slate-200 text-xs text-slate-800 font-bold py-2.5 rounded-xl border border-slate-200 transition cursor-pointer mt-4"
          >
            + Register New OPD Patient
          </button>
        </div>

        {/* Right Column: Detailed Patient EHR & Clinical Station */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          {selectedPatient ? (
            <>
              {/* Selected Patient Header Strip */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 border border-teal-300 text-teal-800 flex items-center justify-center font-bold text-lg">
                    {selectedPatient.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-lg font-black text-[#0b1f3a]">{selectedPatient.name}</h2>
                      <span className="text-xs text-slate-500 font-mono">ID: {selectedPatient.mrn}</span>
                      <span className="bg-white text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">
                        {selectedPatient.gender}, {selectedPatient.age} yrs
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Blood Group: <strong className="text-rose-700 font-bold">{selectedPatient.bloodType}</strong> • Phone: {selectedPatient.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openAIModal('summarize_records', { patientName: selectedPatient.name })}
                    className="bg-white hover:bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-1 cursor-pointer shadow-sm transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>AI EHR Summary</span>
                  </button>
                </div>
              </div>

              {/* Workspace Action Tabs */}
              <div className="flex border-b border-slate-200 space-x-4 text-xs font-bold">
                {[
                  { id: 'queue', label: 'Patient Vitals & History', icon: Activity },
                  { id: 'prescription', label: 'Write e-Prescription (Rx)', icon: Pill },
                  { id: 'labs', label: 'Order Diagnostic Lab/Scan', icon: Microscope },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 border-b-2 flex items-center space-x-1.5 transition cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-teal-600 text-teal-600 font-black'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab 1: Patient Vitals & EHR Overview */}
              {activeTab === 'queue' && (
                <div className="space-y-6">
                  {/* Current Vitals Cards */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Recorded Patient Vitals</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-[11px] text-slate-500 font-bold">Blood Pressure</span>
                        <div className="text-lg font-black text-emerald-700 mt-1">{selectedPatient?.vitals?.bloodPressure || '120/80'}</div>
                        <span className="text-[10px] text-slate-500 font-medium">mmHg (Normal)</span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-[11px] text-slate-500 font-bold">Heart Rate</span>
                        <div className="text-lg font-black text-rose-700 mt-1">{selectedPatient?.vitals?.heartRate ?? 72} bpm</div>
                        <span className="text-[10px] text-slate-500 font-medium">Resting Pulse</span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-[11px] text-slate-500 font-bold">Body Temperature</span>
                        <div className="text-lg font-black text-amber-700 mt-1">{selectedPatient?.vitals?.temperature ?? 98.6} °F</div>
                        <span className="text-[10px] text-slate-500 font-medium">Afebril</span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <span className="text-[11px] text-slate-500 font-bold">Oxygen SpO2</span>
                        <div className="text-lg font-black text-sky-700 mt-1">{selectedPatient?.vitals?.spO2 ?? 98}%</div>
                        <span className="text-[10px] text-slate-500 font-medium">Room Air</span>
                      </div>
                    </div>
                  </div>

                  {/* Medical History & Allergies */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="text-xs font-bold text-slate-800 flex items-center">
                        <ShieldAlert className="w-4 h-4 mr-1 text-rose-600" />
                        Known Allergies & Contraindications
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedPatient?.allergies || ['Penicillin (Mild)', 'Dust Mites']).map((alg, idx) => (
                          <span key={idx} className="bg-rose-50 text-rose-800 text-xs font-bold px-2.5 py-1 rounded border border-rose-200">
                            {alg}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <h4 className="text-xs font-bold text-slate-800 flex items-center">
                        <FileText className="w-4 h-4 mr-1 text-teal-600" />
                        Chronic Conditions History
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedPatient?.medicalHistory || ['Type-2 Diabetes', 'Essential Hypertension']).map((hist, idx) => (
                          <span key={idx} className="bg-teal-50 text-teal-800 text-xs font-bold px-2.5 py-1 rounded border border-teal-200">
                            {hist}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Insurance details */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 flex justify-between items-center font-medium">
                    <div>
                      <span className="text-slate-500">Insurance Network:</span>{' '}
                      <strong className="text-slate-900">{selectedPatient?.insuranceProvider || 'Star Health TPA'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Policy No:</span>{' '}
                      <strong className="font-mono text-teal-700 font-bold">{selectedPatient?.insurancePolicyNumber || 'POL-994827-X'}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Write e-Prescription (Rx) */}
              {activeTab === 'prescription' && (
                <form onSubmit={handleSavePrescription} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Clinical Diagnosis / ICD-10 Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={rxDiagnosis}
                      onChange={(e) => setRxDiagnosis(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition font-medium"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700">Medications List (Rx)</label>
                      <button
                        type="button"
                        onClick={handleAddMedRow}
                        className="text-xs text-teal-700 hover:text-teal-800 font-bold flex items-center cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" /> Add Medication
                      </button>
                    </div>

                    <div className="space-y-2">
                      {rxMeds.map((med, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 items-center">
                          <input
                            type="text"
                            placeholder="Drug Name (e.g. Paracetamol 500mg)"
                            value={med.drugName}
                            onChange={(e) => {
                              const updated = [...rxMeds];
                              updated[idx].drugName = e.target.value;
                              setRxMeds(updated);
                            }}
                            className="col-span-5 bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-medium"
                          />
                          <input
                            type="text"
                            placeholder="Dosage (1 Tab)"
                            value={med.dosage}
                            onChange={(e) => {
                              const updated = [...rxMeds];
                              updated[idx].dosage = e.target.value;
                              setRxMeds(updated);
                            }}
                            className="col-span-2 bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-medium"
                          />
                          <input
                            type="text"
                            placeholder="Frequency (BID/TID)"
                            value={med.frequency}
                            onChange={(e) => {
                              const updated = [...rxMeds];
                              updated[idx].frequency = e.target.value;
                              setRxMeds(updated);
                            }}
                            className="col-span-3 bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-900 font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveMedRow(idx)}
                            className="col-span-2 text-xs text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dietary & Lifestyle Instructions</label>
                    <textarea
                      rows={2}
                      value={rxNotes}
                      onChange={(e) => setRxNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 shadow"
                  >
                    <Save className="w-4 h-4" />
                    <span>Issue Digital e-Prescription & Sync to Pharmacy</span>
                  </button>
                </form>
              )}

              {/* Tab 3: Order Diagnostic Lab/Scan */}
              {activeTab === 'labs' && (
                <form onSubmit={handleOrderLab} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Select Required Diagnostic Test</label>
                    <select
                      value={selectedLabTest}
                      onChange={(e) => setSelectedLabTest(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition"
                    >
                      <option value="Complete Blood Count (CBC) with Differential">Complete Blood Count (CBC) with Differential</option>
                      <option value="Comprehensive Metabolic Panel (CMP)">Comprehensive Metabolic Panel (CMP)</option>
                      <option value="Lipid Profile & Hs-CRP">Lipid Profile & Hs-CRP</option>
                      <option value="HbA1c & Fasting Glucose">HbA1c & Fasting Glucose</option>
                      <option value="High-Resolution Chest CT Scan">High-Resolution Chest CT Scan</option>
                      <option value="Brain MRI with Contrast">Brain MRI with Contrast</option>
                      <option value="2D Echocardiogram">2D Echocardiogram</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Indication & Special Notes</label>
                    <textarea
                      rows={3}
                      value={labNotes}
                      onChange={(e) => setLabNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 shadow"
                  >
                    <Microscope className="w-4 h-4" />
                    <span>Dispatch Order to LIMS Laboratory Queue</span>
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-slate-500 font-medium text-sm">Select a patient from the OPD queue to begin consultation.</div>
          )}
        </div>
      </div>
    </div>
  );
};
