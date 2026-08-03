import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Microscope,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const LabPortal: React.FC = () => {
  const { labTests, updateLabTestStatus, openAIModal } = useHospital();
  const [selectedLabId, setSelectedLabId] = useState(labTests[0]?.id || '');

  const [hbValue, setHbValue] = useState('13.5 g/dL');
  const [wbcValue, setWbcValue] = useState('7,200 /uL');
  const [plateletValue, setPlateletValue] = useState('250,000 /uL');
  const [successMsg, setSuccessMsg] = useState('');

  const selectedTest = labTests.find((t) => t.id === selectedLabId) || labTests[0];

  const handlePublishResults = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) return;

    updateLabTestStatus(selectedTest.id, 'Completed', {
      Hemoglobin: hbValue,
      'WBC Count': wbcValue,
      Platelets: plateletValue,
    });

    setSuccessMsg(`Lab results published & auto-synced to Patient Portal for ${selectedTest.patientName}!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-[#0b1f3a]">Diagnostic LIMS Laboratory & Radiology PACS</h1>
            <span className="bg-teal-50 text-teal-800 text-xs font-bold px-2.5 py-1 rounded border border-teal-200">
              Pathology & Imaging Workstation
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Sample Verification, Automated Pathological Analysis & Digital PACS Imaging
          </p>
        </div>

        <button
          onClick={() => openAIModal('summarize_records', { patientName: selectedTest?.patientName })}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 cursor-pointer shadow transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Critical Value Analysis</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center">
          <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Lab Request Roster */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-[#0b1f3a] text-base flex items-center justify-between">
            <span className="flex items-center">
              <Microscope className="w-4 h-4 mr-2 text-teal-600" /> Test Order Queue
            </span>
            <span className="text-xs bg-teal-50 text-teal-800 font-bold px-2 py-0.5 rounded border border-teal-200">
              {labTests.length} Orders
            </span>
          </h3>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {labTests.map((test) => {
              const isSelected = test.id === selectedTest?.id;
              return (
                <div
                  key={test.id}
                  onClick={() => setSelectedLabId(test.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50 border-teal-400 text-slate-900 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{test.patientName}</h4>
                      <p className="text-[11px] text-teal-700 font-bold">{test.testName}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        test.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {test.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium mt-2">
                    Requested by: Dr. {test.requestedBy} • Date: {test.orderDate}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Result Publisher */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          {selectedTest ? (
            <>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded border border-teal-200">
                  {selectedTest.category}
                </span>
                <h2 className="text-lg font-black text-[#0b1f3a] mt-1">{selectedTest.testName}</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Patient: <strong className="text-slate-900">{selectedTest.patientName}</strong> • Requisition ID: #{selectedTest.id}
                </p>
              </div>

              <form onSubmit={handlePublishResults} className="space-y-4">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Enter Pathology Test Findings</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Hemoglobin (Hb)</label>
                    <input
                      type="text"
                      value={hbValue}
                      onChange={(e) => setHbValue(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WBC Count</label>
                    <input
                      type="text"
                      value={wbcValue}
                      onChange={(e) => setWbcValue(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Platelet Count</label>
                    <input
                      type="text"
                      value={plateletValue}
                      onChange={(e) => setPlateletValue(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-3 rounded-xl transition shadow cursor-pointer"
                  >
                    Verify & Publish Lab Report to Patient Record
                  </button>
                </div>
              </form>
            </>
          ) : (
            <p className="text-xs text-slate-500 text-center py-12 font-medium">Select a test from the queue.</p>
          )}
        </div>
      </div>
    </div>
  );
};
