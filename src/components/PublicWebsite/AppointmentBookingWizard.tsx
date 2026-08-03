import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { PaymentComponent } from './PaymentComponent';
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  HeartPulse,
  Stethoscope,
  ShieldCheck,
  Building2,
  FileText,
  Sparkles,
  QrCode,
  Download,
  CreditCard,
} from 'lucide-react';

interface AppointmentBookingWizardProps {
  setPublicTab?: (tab: string) => void;
}

export const AppointmentBookingWizard: React.FC<AppointmentBookingWizardProps> = ({ setPublicTab }) => {
  const { doctors, branches, addAppointment, currentBranch } = useHospital();

  const [step, setStep] = useState<number>(1);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(branches[0]?.id || 'branch-1');
  const [selectedService, setSelectedService] = useState<string>('Cardiology Consultation');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(doctors[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('2026-06-20');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');

  // Patient Info Form
  const [patientName, setPatientName] = useState('Sarah Jenkins');
  const [patientEmail, setPatientEmail] = useState('sarah.j@example.com');
  const [patientPhone, setPatientPhone] = useState('+1 (555) 234-5678');
  const [patientAge, setPatientAge] = useState('34');
  const [reasonForVisit, setReasonForVisit] = useState('Routine Medical Checkup');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card' | 'counter'>('qr');
  const [qrPaid, setQrPaid] = useState(false);
  const [txnRef, setTxnRef] = useState('');
  const [createdAppointmentToken, setCreatedAppointmentToken] = useState<string | null>(null);

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || doctors[0];

  const services = [
    { title: 'Cardiology Consultation', dept: 'Cardiology', fee: 150, duration: '30 mins' },
    { title: 'General Health Checkup', dept: 'General Medicine', fee: 90, duration: '20 mins' },
    { title: 'Orthopedic Evaluation', dept: 'Orthopedics', fee: 140, duration: '30 mins' },
    { title: 'Pediatric Care', dept: 'Pediatrics', fee: 110, duration: '25 mins' },
    { title: 'Neurology Assessment', dept: 'Neurology', fee: 180, duration: '45 mins' },
    { title: 'Dermatology Consultation', dept: 'Dermatology', fee: 120, duration: '20 mins' },
    { title: 'Gastroenterology Consultation', dept: 'Gastroenterology', fee: 175, duration: '35 mins' },
    { title: 'Endocrinology & Diabetes Care', dept: 'Endocrinology', fee: 140, duration: '30 mins' },
    { title: 'Nephrology & Dialysis Check', dept: 'Nephrology', fee: 180, duration: '40 mins' },
    { title: 'Ophthalmology & LASIK Check', dept: 'Ophthalmology', fee: 135, duration: '25 mins' },
    { title: 'ENT & Head-Neck Surgery Consultation', dept: 'ENT & Head-Neck', fee: 130, duration: '25 mins' },
    { title: 'Pulmonology & Respiratory Assessment', dept: 'Pulmonology', fee: 145, duration: '30 mins' },
  ];

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:15 AM',
    '02:00 PM',
    '02:30 PM',
    '03:15 PM',
    '04:00 PM',
  ];

  const handleSimulateQrPayment = () => {
    const ref = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
    setTxnRef(ref);
    setQrPaid(true);
  };

  const handleConfirmBooking = () => {
    const token = 'HF-' + Math.floor(100000 + Math.random() * 900000);
    const isAlreadyPaid = paymentMethod === 'qr' ? qrPaid : paymentMethod === 'card';

    addAppointment({
      id: token,
      patientId: 'p1',
      patientName,
      patientPhone,
      patientEmail,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      date: selectedDate,
      time: selectedTimeSlot,
      status: 'scheduled',
      type: 'in_person',
      hospitalId: 'h1',
      branchId: currentBranch.id,
      notes: reasonForVisit + (txnRef ? ` [Paid via QR Ref: ${txnRef}]` : ''),
      fee: selectedDoctor.consultationFee,
      isPaid: isAlreadyPaid,
    });

    setCreatedAppointmentToken(token);
    setStep(5);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Title */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0b1f3a]">Book an Appointment</h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">
          Select service, doctor, and slot for instant online booking confirmation.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[600px] text-xs font-bold">
          {[
            { num: 1, label: '1. Service' },
            { num: 2, label: '2. Doctor' },
            { num: 3, label: '3. Schedule' },
            { num: 4, label: '4. Details' },
            { num: 5, label: '5. Confirm' },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center space-x-2 ${
                step === s.num
                  ? 'text-blue-600 font-extrabold'
                  : step > s.num
                  ? 'text-sky-600 font-bold'
                  : 'text-slate-400'
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                  step === s.num
                    ? 'bg-blue-600 text-white'
                    : step > s.num
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-500 border border-slate-300'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </span>
              <span>{s.label}</span>
              {s.num < 5 && <span className="text-slate-300 mx-2">—</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Wizard Form Container */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-[#0b1f3a]">Select Medical Service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((serv) => (
                  <div
                    key={serv.title}
                    onClick={() => setSelectedService(serv.title)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
                      selectedService === serv.title
                        ? 'border-2 border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                        {serv.dept}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-2">{serv.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">Duration: {serv.duration}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-200/80">
                      <span className="text-sm font-extrabold text-slate-900">${serv.fee}.00</span>
                      <span className="text-xs font-bold text-blue-600">
                        {selectedService === serv.title ? 'Selected ✓' : 'Select'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#0b1f3a] hover:bg-[#122b4f] text-white font-bold px-6 py-3 rounded-xl text-xs transition flex items-center space-x-1 cursor-pointer"
                >
                  <span>Select Doctor</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Doctor */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-[#0b1f3a]">Select Physician</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-center space-x-4 ${
                      selectedDoctorId === doc.id
                        ? 'border-2 border-blue-600 bg-blue-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                    }`}
                  >
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-300 shrink-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h3>
                      <p className="text-xs font-semibold text-blue-600 truncate">{doc.title}</p>
                      <p className="text-[11px] text-slate-500 mt-1">Fee: ${doc.consultationFee}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-xl text-xs transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-[#0b1f3a] hover:bg-[#122b4f] text-white font-bold px-6 py-3 rounded-xl text-xs transition flex items-center space-x-1 cursor-pointer"
                >
                  <span>Pick Date & Slot</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Schedule Date & Time Slot */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-[#0b1f3a]">Select Date & Time Slot</h2>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Preferred Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Available Time Slots</label>
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-3 rounded-xl text-xs font-bold transition border cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'bg-[#0b1f3a] text-white border-[#0b1f3a] shadow'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-xl text-xs transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="bg-[#0b1f3a] hover:bg-[#122b4f] text-white font-bold px-6 py-3 rounded-xl text-xs transition flex items-center space-x-1 cursor-pointer"
                >
                  <span>Patient Details</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Patient Details Form */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-[#0b1f3a]">Patient Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Patient Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Reason for Visit / Symptoms</label>
                  <textarea
                    rows={2}
                    value={reasonForVisit}
                    onChange={(e) => setReasonForVisit(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Payment Method Selector Section */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-extrabold text-[#0b1f3a] flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                    Select Payment Method
                  </h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                    Instant Receipt Available
                  </span>
                </div>

                <PaymentComponent
                  amount={selectedDoctor.consultationFee}
                  billingTitle={`${selectedService} - ${selectedDoctor.name}`}
                  patientName={patientName}
                  patientPhone={patientPhone}
                  branchName={currentBranch.name}
                  onPaymentSuccess={(details) => {
                    setQrPaid(true);
                    setTxnRef(details.referenceId);
                  }}
                />
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-xl text-xs transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-xl text-xs transition shadow-md cursor-pointer flex items-center space-x-1"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Confirm & Complete Booking</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Instant Confirmation */}
          {step === 5 && createdAppointmentToken && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  TOKEN: {createdAppointmentToken}
                </span>
                <h2 className="text-2xl font-black text-[#0b1f3a] mt-2">Appointment Confirmed!</h2>
                <p className="text-xs text-slate-600 mt-1">
                  A digital confirmation receipt and SMS reminder have been sent to {patientPhone}.
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-bold text-slate-900">{selectedDoctor.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-900">{selectedService}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-bold text-slate-900">{selectedDate} @ {selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">OPD Room:</span>
                  <span className="font-bold text-slate-900">{selectedDoctor.roomNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consultation Fee:</span>
                  <span className="font-bold text-blue-600">${selectedDoctor.consultationFee}.00</span>
                </div>
              </div>

              <div className="flex justify-center space-x-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="bg-white hover:bg-slate-100 text-slate-800 font-bold px-5 py-2.5 rounded-xl border border-slate-300 text-xs transition flex items-center space-x-1 cursor-pointer"
                >
                  <Download className="w-4 h-4 mr-1" />
                  <span>Download Ticket</span>
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="bg-[#0b1f3a] hover:bg-[#122b4f] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Floating Summary Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 sticky top-20">
          <h3 className="text-base font-extrabold text-[#0b1f3a] pb-3 border-b border-slate-100">
            Appointment Summary
          </h3>

          <div className="flex items-center space-x-3">
            <img
              src={selectedDoctor.avatar}
              alt={selectedDoctor.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-300"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';
              }}
            />
            <div>
              <h4 className="text-xs font-bold text-slate-900">{selectedDoctor.name}</h4>
              <p className="text-[11px] font-semibold text-blue-600">{selectedDoctor.title}</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Service:</span>
              <span className="font-bold text-slate-800">{selectedService}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Hospital:</span>
              <span className="font-semibold text-slate-800">{currentBranch.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date:</span>
              <span className="font-semibold text-slate-800">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Time:</span>
              <span className="font-semibold text-slate-800">{selectedTimeSlot}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm">
            <span className="font-bold text-slate-700">Total Fee:</span>
            <span className="text-lg font-black text-blue-600">${selectedDoctor.consultationFee}.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
