import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Bed,
  Activity,
  Pill,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';

export const NursePortal: React.FC = () => {
  const { patients, updatePatientVitals, openActionModal, openAIModal } = useHospital();
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');

  // Vitals entry form state
  const [bp, setBp] = useState('120/80');
  const [hr, setHr] = useState(72);
  const [spo2, setSpo2] = useState(98);
  const [temp, setTemp] = useState(98.6);
  const [vitalsSavedNotice, setVitalsSavedNotice] = useState('');

  // MAR Checklist state
  const [marDone, setMarDone] = useState<{ [key: string]: boolean }>({
    'med-1': true,
    'med-2': false,
  });

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    updatePatientVitals(selectedPatient.id, {
      bloodPressure: bp,
      heartRate: Number(hr),
      spO2: Number(spo2),
      temperature: Number(temp),
    });

    setVitalsSavedNotice('Patient Vitals logged successfully to EHR Chart!');
    setTimeout(() => setVitalsSavedNotice(''), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-[#0b1f3a]">Inpatient Ward Nurse Workstation</h1>
            <span className="bg-rose-50 text-rose-700 text-xs font-bold px-2.5 py-1 rounded border border-rose-200">
              Floor 3 ICU & Surgical Ward
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Real-Time Bed Monitoring, Vitals Charting & Medication Administration (MAR)
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => openActionModal('emergency_sos')}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow cursor-pointer transition"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>TRIGGER CODE BLUE / EMERGENCY CALL</span>
          </button>
        </div>
      </div>

      {vitalsSavedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
          <span>{vitalsSavedNotice}</span>
        </div>
      )}

      {/* Grid: Left Patient Roster & Right Vitals Charting */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Ward Patients List */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-[#0b1f3a] text-base flex items-center justify-between">
            <span className="flex items-center">
              <Bed className="w-4 h-4 mr-2 text-rose-600" /> Ward Inpatient Roster
            </span>
            <span className="text-xs bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-200 font-bold">
              {patients.length} Inpatients
            </span>
          </h3>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {patients.map((pat) => {
              const isSelected = pat.id === selectedPatient?.id;
              return (
                <div
                  key={pat.id}
                  onClick={() => {
                    setSelectedPatientId(pat.id);
                    setBp(pat.vitals?.bloodPressure || '120/80');
                    setHr(pat.vitals?.heartRate || 72);
                    setSpo2(pat.vitals?.spO2 || 98);
                    setTemp(pat.vitals?.temperature || 98.6);
                  }}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50 border-rose-400 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-slate-900">{pat.name}</h4>
                    <span className="text-[10px] font-mono text-rose-700 font-bold">MRN: {pat.mrn}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 flex justify-between font-medium">
                    <span>BP: <strong className="text-slate-900">{pat.vitals?.bloodPressure || '120/80'}</strong></span>
                    <span>SpO2: <strong className="text-sky-700 font-bold">{pat.vitals?.spO2 ?? 98}%</strong></span>
                    <span>Pulse: <strong className="text-rose-700 font-bold">{pat.vitals?.heartRate ?? 72}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Vitals Entry & Medication Administration (MAR) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Selected Patient Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-[#0b1f3a]">{selectedPatient?.name}</h2>
              <p className="text-xs text-slate-500 font-medium">
                {selectedPatient?.gender}, {selectedPatient?.age} yrs • Blood Type: <strong className="text-rose-700 font-bold">{selectedPatient?.bloodType}</strong>
              </p>
            </div>
            <button
              onClick={() => openAIModal('symptom_checker')}
              className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold px-3 py-2 rounded-xl flex items-center space-x-1 transition cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              <span>AI Triage Protocol</span>
            </button>
          </div>

          {/* Vitals Logging Form */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0b1f3a] flex items-center">
              <Activity className="w-4 h-4 mr-2 text-emerald-600" /> Chart Patient Vitals
            </h3>

            <form onSubmit={handleSaveVitals} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Blood Pressure</label>
                <input
                  type="text"
                  required
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pulse (bpm)</label>
                <input
                  type="number"
                  required
                  value={hr}
                  onChange={(e) => setHr(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SpO2 Oxygen (%)</label>
                <input
                  type="number"
                  required
                  value={spo2}
                  onChange={(e) => setSpo2(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Temperature (°F)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition font-medium"
                />
              </div>

              <div className="col-span-2 sm:col-span-4 pt-2">
                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 rounded-xl transition shadow cursor-pointer"
                >
                  Save Vitals to Chart
                </button>
              </div>
            </form>
          </div>

          {/* Medication Administration Checklist (MAR) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0b1f3a] flex items-center">
              <Pill className="w-4 h-4 mr-2 text-amber-600" /> Scheduled Medication Administration (MAR)
            </h3>

            <div className="space-y-3">
              {[
                { id: 'med-1', time: '08:00 AM', name: 'IV Ceftriaxone 1g', route: 'IV Drip over 30 mins' },
                { id: 'med-2', time: '12:00 PM', name: 'Tab Paracetamol 500mg', route: 'Oral with water' },
                { id: 'med-3', time: '04:00 PM', name: 'Subcutaneous Insulin 8 units', route: 'Sub-Q' },
              ].map((m) => {
                const checked = marDone[m.id];
                return (
                  <div
                    key={m.id}
                    onClick={() => setMarDone({ ...marDone, [m.id]: !checked })}
                    className={`p-4 rounded-xl border transition cursor-pointer flex justify-between items-center ${
                      checked
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                        {m.time}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{m.name}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{m.route}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold">{checked ? 'Administered' : 'Pending'}</span>
                      <CheckCircle2
                        className={`w-5 h-5 ${checked ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
