import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Ambulance as AmbulanceIcon, PhoneCall, AlertTriangle, MapPin, Clock, ShieldAlert, CheckCircle } from 'lucide-react';

export const EmergencyAmbulancePage: React.FC = () => {
  const { ambulances, openActionModal, dispatchAmbulance } = useHospital();
  const [patientLocation, setPatientLocation] = useState('');
  const [selectedAmbulance, setSelectedAmbulance] = useState(ambulances[0]?.id || '');
  const [emergencyDispatched, setEmergencyDispatched] = useState(false);

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientLocation) return;
    dispatchAmbulance(selectedAmbulance, patientLocation);
    setEmergencyDispatched(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-8 rounded-3xl shadow-2xl border border-red-500/50 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-red-100 font-bold text-xs uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4 animate-bounce text-white" />
            <span>24/7 National Emergency Command Centre</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Need Urgent Medical Assistance?</h1>
          <p className="text-red-100 text-xs sm:text-sm max-w-xl">
            Our Advanced Life Support (ALS) ambulances feature built-in ICU ventilators, defibrillators, and emergency paramedical crews.
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shrink-0 space-y-2">
          <p className="text-xs font-bold text-red-200 uppercase">Emergency Hotline Hotline</p>
          <a
            href="tel:911"
            className="block text-3xl font-black text-white hover:text-red-200 tracking-wider font-mono"
          >
            911 / +1 (555) 911-0000
          </a>
          <p className="text-[10px] text-red-200">Average Response Time: 8 Minutes</p>
        </div>
      </div>

      {/* Ambulance Dispatch Form & Fleet Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Dispatch Simulation */}
        <div className="lg:col-span-7 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center">
            <AmbulanceIcon className="w-5 h-5 mr-2 text-rose-400" />
            Request GPS Ambulance Dispatch
          </h3>

          {emergencyDispatched ? (
            <div className="bg-emerald-950/60 border border-emerald-500 p-6 rounded-2xl space-y-4 text-center">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-white">Ambulance Dispatched!</h4>
              <p className="text-xs text-slate-300">
                Unit is en route to <strong className="text-emerald-300">{patientLocation}</strong>. Paramedic control room is monitoring live telemetry.
              </p>
              <div className="text-xs bg-slate-900 p-3 rounded-xl border border-slate-700 font-mono text-emerald-400">
                ETA: 6 - 8 Minutes • Live Telemetry Active
              </div>
              <button
                onClick={() => setEmergencyDispatched(false)}
                className="text-xs font-semibold text-slate-400 hover:text-white underline pt-2"
              >
                Request Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleDispatchSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pickup Location Address / Landmark *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5th Avenue & Pine Street, Apt 4B"
                    value={patientLocation}
                    onChange={(e) => setPatientLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Select Ambulance Type
                </label>
                <select
                  value={selectedAmbulance}
                  onChange={(e) => setSelectedAmbulance(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white font-medium focus:outline-none focus:border-rose-500"
                >
                  {ambulances.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.vehicleNumber} ({a.type}) - Status: {a.status}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm py-3 rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                CONFIRM EMERGENCY DISPATCH
              </button>
            </form>
          )}
        </div>

        {/* Right: Fleet Live Roster */}
        <div className="lg:col-span-5 bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between">
            <span>Fleet Availability Status</span>
            <span className="text-xs text-emerald-400 font-mono">Live GPS</span>
          </h3>

          <div className="space-y-3">
            {ambulances.map((amb) => (
              <div
                key={amb.id}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white">{amb.vehicleNumber}</h4>
                    <p className="text-[11px] text-slate-400">{amb.type}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      amb.status === 'Available'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {amb.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 space-y-1">
                  <p>
                    <strong className="text-slate-400">Driver:</strong> {amb.driverName} ({amb.driverPhone})
                  </p>
                  <p>
                    <strong className="text-slate-400">Location:</strong> {amb.currentLocationName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
