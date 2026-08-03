import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Calendar,
  AlertTriangle,
  UserPlus,
  X,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';

export const ActionModals: React.FC = () => {
  const {
    activeActionModal,
    closeActionModal,
    doctors,
    patients,
    addAppointment,
    addPatient,
  } = useHospital();

  const [appointmentDoctor, setAppointmentDoctor] = useState(doctors[0]?.id || '');
  const [appointmentPatient, setAppointmentPatient] = useState('Sarah Jenkins');
  const [appointmentDate, setAppointmentDate] = useState('2026-08-05');
  const [appointmentTime, setAppointmentTime] = useState('10:30 AM');
  const [appointmentReason, setAppointmentReason] = useState('General Consultation & Checkup');

  const [sosLocation, setSosLocation] = useState('Outer Ring Road, Sector 5');
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(30);
  const [newGender, setNewGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [newBlood, setNewBlood] = useState('O+');
  const [newPhone, setNewPhone] = useState('+1 (555) 019-2831');

  const [successMsg, setSuccessMsg] = useState('');

  if (!activeActionModal) return null;

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = doctors.find((d) => d.id === appointmentDoctor) || doctors[0];
    addAppointment({
      id: `app-${Date.now()}`,
      patientName: appointmentPatient,
      doctorId: doc.id,
      doctorName: doc.name,
      departmentName: doc.department,
      date: appointmentDate,
      time: appointmentTime,
      status: 'Confirmed',
      reason: appointmentReason,
    });
    setSuccessMsg(`OPD Appointment reserved successfully with ${doc.name}!`);
    setTimeout(() => {
      setSuccessMsg('');
      closeActionModal();
    }, 3000);
  };

  const handleEmergencySOS = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(`CRITICAL ALERT: Ambulance Dispatched to ${sosLocation}. Telemetry Sent!`);
    setTimeout(() => {
      setSuccessMsg('');
      closeActionModal();
    }, 3500);
  };

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    addPatient({
      id: `pat-${Date.now()}`,
      mrn: `MRN-${Math.floor(100000 + Math.random() * 900000)}`,
      name: newName,
      age: newAge,
      gender: newGender,
      bloodType: newBlood,
      phone: newPhone,
      email: `${newName.toLowerCase().replace(/\s+/g, '.')}@patient.com`,
      admissionStatus: 'Outpatient',
      vitals: {
        bloodPressure: '120/80',
        heartRate: 72,
        spO2: 98,
        temperature: 98.6,
      },
    });
    setSuccessMsg(`Patient ${newName} registered with unique MRN!`);
    setTimeout(() => {
      setSuccessMsg('');
      closeActionModal();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-slate-900 space-y-5 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={closeActionModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition p-2 rounded-full bg-slate-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {successMsg ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <p className="text-sm font-bold">{successMsg}</p>
          </div>
        ) : (
          <>
            {/* Modal Type: New Appointment */}
            {activeActionModal === 'new_appointment' && (
              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-black text-[#0b1f3a]">Book OPD Clinical Appointment</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Doctor</label>
                  <select
                    value={appointmentDoctor}
                    onChange={(e) => setAppointmentDoctor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.specialty}) - Fee ${d.consultationFee}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={appointmentPatient}
                    onChange={(e) => setAppointmentPatient(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot</label>
                    <select
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                    >
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Visit</label>
                  <input
                    type="text"
                    required
                    value={appointmentReason}
                    onChange={(e) => setAppointmentReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer shadow"
                >
                  Confirm & Reserve Ticket
                </button>
              </form>
            )}

            {/* Modal Type: Emergency SOS */}
            {activeActionModal === 'emergency_sos' && (
              <form onSubmit={handleEmergencySOS} className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-rose-600">
                  <AlertTriangle className="w-5 h-5 animate-bounce" />
                  <h3 className="text-lg font-black text-[#0b1f3a]">24/7 National Emergency SOS Dispatch</h3>
                </div>

                <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs text-rose-800 font-medium">
                  Warning: Triggering emergency SOS alerts national paramedic control room and dispatches ALS Ambulance with ventilator crew.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current GPS Location Landmark</label>
                  <input
                    type="text"
                    required
                    value={sosLocation}
                    onChange={(e) => setSosLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer shadow flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>DISPATCH EMERGENCY AMBULANCE NOW</span>
                </button>
              </form>
            )}

            {/* Modal Type: Add Patient */}
            {activeActionModal === 'add_patient' && (
              <form onSubmit={handleRegisterPatient} className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
                  <UserPlus className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-black text-[#0b1f3a]">Register New Hospital Inpatient / OPD</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Patient Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robert Vance"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={newAge}
                      onChange={(e) => setNewAge(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Blood Type</label>
                    <select
                      value={newBlood}
                      onChange={(e) => setNewBlood(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                    >
                      <option value="O+">O+</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition cursor-pointer shadow"
                >
                  Create Patient MRN & Open File
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
