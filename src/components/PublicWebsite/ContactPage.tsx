import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, AlertTriangle, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

interface ContactPageProps {
  setPublicTab?: (tab: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const { currentHospital, branches, openActionModal } = useHospital();

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('General Enquiry');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-sans">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#00796b] uppercase tracking-wider">24/7 SUPPORT & CARE</span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0b1f3a]">Contact {currentHospital.name}</h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Reach our medical helpline, schedule hospital visits, or request immediate emergency assistance.
        </p>
      </div>

      {/* Urgent Emergency Alert Card */}
      <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 text-slate-900 p-6 sm:p-8 rounded-3xl shadow-sm border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Phone className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-md border border-blue-200">
              24/7 CRITICAL EMERGENCY HOTLINE
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{currentHospital.emergencyPhone}</h2>
            <p className="text-xs text-slate-600 mt-1">Direct level-1 trauma dispatch center available 24 hours / 365 days.</p>
          </div>
        </div>

        <button
          onClick={() => openActionModal('emergency_sos')}
          className="bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs px-6 py-3.5 rounded-xl shadow transition shrink-0 flex items-center space-x-2 cursor-pointer"
        >
          <Phone className="w-4 h-4 text-white" />
          <span>Dispatch Mobile ICU Ambulance</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-[#0b1f3a]">Send Us a Message</h3>
                <p className="text-xs text-slate-500 mt-1">Our patient relationship team responds within 2 business hours.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 123-4567"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Inquiry Topic</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Appointment Help">Appointment Scheduling Assistance</option>
                    <option value="Billing & Insurance">Billing & Medical Insurance</option>
                    <option value="International Patients">International Patient Care Services</option>
                    <option value="Feedback & Support">Feedback & Patient Support</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Message / Medical Inquiry *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you today?"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b1f3a] hover:bg-[#00796b] text-white font-bold py-3.5 rounded-xl text-xs transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
              <h3 className="text-2xl font-black text-[#0b1f3a]">Message Sent Successfully!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Thank you, <strong>{formName}</strong>. Our care team has received your message and will reply to <strong>{formEmail}</strong> shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* Right Info Sidebar & Hospital Branches */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-[#0b1f3a] border-b border-slate-100 pb-3">
              Central Contact Hub
            </h3>

            <div className="space-y-3 text-slate-700">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#00796b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Hospital Address</p>
                  <p className="text-slate-500">123 Medical Plaza, Health City, HC 90210</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#00796b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">General OPD Board</p>
                  <p className="text-slate-500">+1 (800) 555-FLOW / +1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#00796b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Email Enquiries</p>
                  <p className="text-slate-500">care@healthflow.org</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#00796b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">OPD & Consultation Hours</p>
                  <p className="text-slate-500">Mon - Sat: 08:00 AM - 08:00 PM | Sun: 09:00 AM - 02:00 PM</p>
                  <p className="text-emerald-600 font-bold mt-0.5">24/7 Emergency & ICU Always Open</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hospital Network Campuses */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 text-xs">
            <h3 className="text-base font-extrabold text-[#0b1f3a] border-b border-slate-100 pb-3">
              Hospital Branches ({branches.length})
            </h3>

            <div className="space-y-3">
              {branches.map((b) => (
                <div key={b.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-900">{b.name}</h4>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                      {b.city}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Chief Officer: {b.headDoctor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
