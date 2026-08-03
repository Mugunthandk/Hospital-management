import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  HeartPulse,
  Building2,
  Users,
  Activity,
  CheckCircle,
  Sparkles,
  Phone,
  ArrowRight,
  MapPin,
  Stethoscope,
  Microscope,
  Eye,
  ActivitySquare,
  Clock,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

interface AboutPageProps {
  setPublicTab?: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setPublicTab }) => {
  const { currentHospital, branches } = useHospital();
  const [activeCampusTab, setActiveCampusTab] = useState<'all' | 'north' | 'westwing' | 'main'>('all');

  const milestones = [
    { year: '2008', title: 'Founded in Health City', desc: 'Started as a 50-bed multi-specialty hospital with basic OPD facilities.' },
    { year: '2014', title: 'JCI International Accreditation', desc: 'Achieved gold standard in international healthcare quality & safety.' },
    { year: '2019', title: 'Robotic Surgery & ER Fleet', desc: 'Launched state-of-the-art robotic surgical suite & 24/7 mobile ICU fleet.' },
    { year: '2024', title: 'AI-Powered EHR & Triage', desc: 'Integrated real-time clinical AI assist and instant telehealth networks.' },
  ];

  const leadership = [
    {
      name: 'Dr. Arthur Pendelton, MD',
      role: 'Chief Executive Officer & Founder',
      specialty: 'Cardiothoracic Surgery',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Dr. Elena Rostova, MD, PhD',
      role: 'Chief Medical Officer',
      specialty: 'Neurological Sciences',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Marcus Vance',
      role: 'Head of Hospital Operations',
      specialty: 'Healthcare Administration',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    },
    {
      name: 'Dr. Anita Desai, MD',
      role: 'Director of Clinical Quality & Safety',
      specialty: 'Pediatrics & Neonatology',
      image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=800',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 font-sans">
      {/* Hero Header */}
      <div className="bg-[#0b1f3a] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="inline-flex items-center space-x-1.5 bg-blue-500/20 text-sky-300 font-bold text-xs px-3 py-1 rounded-full border border-sky-400/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>PIONEERING HEALTHCARE SINCE 2008</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Compassionate Care Meets Medical Excellence
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {currentHospital.name} is a JCI-accredited, multi-tenant healthcare enterprise uniting top-tier physicians, advanced robotic surgery, and real-time AI triage to protect and restore human health.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-bold">
            <button
              onClick={() => setPublicTab && setPublicTab('doctors')}
              className="bg-sky-500 hover:bg-sky-600 text-white font-black px-6 py-3 rounded-xl transition shadow-md cursor-pointer flex items-center space-x-2"
            >
              <span>Explore Our Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPublicTab && setPublicTab('booking')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition border border-white/20 cursor-pointer"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Core Values & Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Patients Treated', stat: '150,000+', desc: 'Across 12 Specialties' },
          { icon: Award, label: 'Expert Specialists', stat: '120+', desc: 'Board Certified' },
          { icon: ShieldCheck, label: 'JCI Gold Accredited', stat: '100%', desc: 'Safety Compliance' },
          { icon: Activity, label: 'Emergency Response', stat: '< 8 Mins', desc: 'Mobile Trauma Dispatch' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-2 text-center sm:text-left">
            <item.icon className="w-8 h-8 text-sky-600 mx-auto sm:mx-0" />
            <p className="text-2xl font-black text-[#0b1f3a]">{item.stat}</p>
            <p className="text-xs font-bold text-slate-800">{item.label}</p>
            <p className="text-[11px] text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Mission & Vision Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">OUR MISSION</span>
          <h2 className="text-2xl font-black text-[#0b1f3a]">Delivering Accessible, High-Precision Medicine</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We are dedicated to placing the patient at the center of every clinical decision. By combining cutting-edge diagnostic infrastructure, empathetic care teams, and streamlined digital portals, we eliminate waiting friction and deliver personalized treatment plans.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 pt-2 font-medium">
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Zero-delay Level-1 Emergency Trauma Response</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Paperless digital prescriptions & instant lab delivery</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Affordable healthcare packages with transparent pricing</span>
            </li>
          </ul>
        </div>

        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-200">
          <img
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
            alt="Hospital Facility and Medical Team"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800';
            }}
          />
        </div>
      </div>

      {/* Multi-Branch Enterprise Campus Network Section */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="inline-flex items-center space-x-1.5 bg-sky-100 text-sky-700 font-bold text-xs px-3.5 py-1 rounded-full border border-sky-200">
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            <span>ENTERPRISE MULTI-BRANCH NETWORK</span>
          </span>
          <h2 className="text-3xl font-black text-[#0b1f3a]">
            Specialized Medical Campuses & Outpatient Clinics
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {currentHospital.name} operates dedicated specialty hubs across the region—bringing specialized care, organ transplant units, high-speed LASIK surgery, and OPD clinics directly to your community.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Hospital Campuses' },
              { id: 'north', label: 'North Campus Hub' },
              { id: 'westwing', label: 'West Wing Clinic' },
              { id: 'main', label: 'Main Campus Super-Specialty' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCampusTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  activeCampusTab === tab.id
                    ? 'bg-[#0b1f3a] text-white border-[#0b1f3a] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Campus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. NORTH CAMPUS SPECIALIST MEDICAL HUB */}
          {(activeCampusTab === 'all' || activeCampusTab === 'north') && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-lg transition overflow-hidden flex flex-col justify-between">
              <div>
                {/* Photo Header with Badge */}
                <div className="aspect-[16/9] w-full bg-slate-900 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                    alt="North Campus Specialist Medical Hub"
                    className="w-full h-full object-cover object-center opacity-90 hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-sky-500 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      North Suburbs Hub
                    </span>
                    <span className="bg-slate-900/90 text-slate-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                      HF-N4
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-black">North Campus Specialist Hub</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                      <span>742 Northern Parkway, Tech Park • (555) 555-0104</span>
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-5">
                  {/* Lead Doctor Banner */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clinical Leadership</span>
                      <p className="font-extrabold text-[#0b1f3a]">Dr. David K. O'Connor & Dr. Arthur Vance</p>
                    </div>
                    <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-sky-200">
                      Chief Nephrologist & GI
                    </span>
                  </div>

                  {/* Dedicated Medical Specialties */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-sky-600" />
                      <span>Core Medical Specialties & Departments</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Nephrology & Dialysis',
                        'Gastroenterology & Hepatology',
                        'ENT & Head-Neck Surgery',
                        'Pulmonology & Sleep Medicine',
                        'Advanced Endoscopic Oncology',
                        'Resistant Hypertension Unit',
                      ].map((spec, i) => (
                        <span
                          key={i}
                          className="bg-blue-50 text-blue-900 font-bold text-[11px] px-2.5 py-1 rounded-xl border border-blue-200/70"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Facilities & Technology */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Microscope className="w-4 h-4 text-sky-600" />
                      <span>Unique Facilities & Medical Infrastructure</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                      <li className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>24-Bed Hemodialysis & Acute Renal Unit</span>
                      </li>
                      <li className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>HD Video Endoscopy & IBD Suite</span>
                      </li>
                      <li className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Polysomnography Sleep Apnea Lab</span>
                      </li>
                      <li className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Minimally Invasive ENT Laser Suite</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">OPD Hours: 8:00 AM – 8:00 PM</span>
                <button
                  onClick={() => setPublicTab && setPublicTab('doctors')}
                  className="bg-[#0b1f3a] hover:bg-[#122b4f] text-white font-extrabold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center space-x-1"
                >
                  <span>View North Campus Doctors</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 2. WEST WING OUTPATIENT & DIAGNOSTIC CLINIC */}
          {(activeCampusTab === 'all' || activeCampusTab === 'westwing') && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-lg transition overflow-hidden flex flex-col justify-between">
              <div>
                {/* Photo Header with Badge */}
                <div className="aspect-[16/9] w-full bg-slate-900 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1200"
                    alt="West Wing Outpatient & Diagnostic Clinic"
                    className="w-full h-full object-cover object-center opacity-90 hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-sky-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      Westside Express OPD
                    </span>
                    <span className="bg-slate-900/90 text-slate-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                      HF-WW5
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-black">West Wing Diagnostic & Eye Clinic</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>320 West Wing Avenue, Suite 100 • (555) 555-0105</span>
                    </p>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 space-y-5">
                  {/* Lead Doctor Banner */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clinical Leadership</span>
                      <p className="font-extrabold text-[#0b1f3a]">Dr. Sophia Ramirez & Dr. Maya Lin</p>
                    </div>
                    <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-sky-200">
                      Endocrinology & LASIK Chief
                    </span>
                  </div>

                  {/* Dedicated Medical Specialties */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-sky-600" />
                      <span>Core Medical Specialties & Clinics</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Endocrinology & Diabetes',
                        'Ophthalmology & Blade-Free LASIK',
                        'Gestational Diabetes Management',
                        'Pediatric Immunization & OPD',
                        'Continuous Glucose Monitoring',
                        'Refractive Eye Care Center',
                      ].map((spec, i) => (
                        <span
                          key={i}
                          className="bg-sky-50 text-sky-900 font-bold text-[11px] px-2.5 py-1 rounded-xl border border-sky-200/70"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Advanced Facilities & Technology */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <ActivitySquare className="w-4 h-4 text-sky-600" />
                      <span>Unique Facilities & High-Tech Suites</span>
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                      <li className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Femto-LASIK Blade-Free Refractive Theater</span>
                      </li>
                      <li className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Continuous Glucose Monitor (CGM) Fitting Desk</span>
                      </li>
                      <li className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Express Executive Health Checkup Wing</span>
                      </li>
                      <li className="flex items-center space-x-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>Digital Optical Diagnostics & Cornea Topography</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">OPD Hours: 8:30 AM – 7:00 PM</span>
                <button
                  onClick={() => setPublicTab && setPublicTab('booking')}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition cursor-pointer flex items-center space-x-1"
                >
                  <span>Book at West Wing</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 3. MAIN CAMPUS SUPER-SPECIALTY */}
          {(activeCampusTab === 'all' || activeCampusTab === 'main') && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-lg transition overflow-hidden flex flex-col justify-between md:col-span-2">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 bg-slate-900 overflow-hidden relative min-h-[260px]">
                  <img
                    src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1200"
                    alt="Main Campus Super-Specialty"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      Super-Specialty Headquarters
                    </span>
                    <span className="bg-slate-900/90 text-slate-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                      HF-M1
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-black">Main Campus Super-Specialty</h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>123 Medical Plaza, Tower A, Health City • (555) 555-0101</span>
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-[#0b1f3a]">Chief of Staff: Dr. Sarah Johnson & Dr. Arthur Pendelton</span>
                      <span className="text-amber-700 bg-amber-50 font-bold text-[10px] px-2 py-0.5 rounded border border-amber-200">
                        580 Inpatient Beds
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      Our flag-ship multi-specialty medical center houses 580 inpatient beds, a Da Vinci Xi robotic surgical suite, Level-1 Emergency Trauma hub, and intensive neonatal ICU beds.
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {['Cardiology & Angioplasty', 'Neurological Sciences', 'Robotic Surgery Suite', 'Pediatrics & Neonatology', 'Oncology Radiation', '24/7 Mobile ICU Fleet'].map((s, i) => (
                        <span key={i} className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-xl border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <span className="text-xs text-slate-500 font-medium">24/7 Emergency & ICU Response</span>
                    <button
                      onClick={() => setPublicTab && setPublicTab('doctors')}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center space-x-1"
                    >
                      <span>Explore Main Campus Team</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Executive Leadership Team Showcase */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">EXECUTIVE LEADERSHIP</span>
          <h2 className="text-3xl font-black text-[#0b1f3a] mt-1">Guided by World-Class Medical Visionaries</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Our leadership team brings decades of clinical practice, global research, and administrative innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';
                  }}
                />
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-extrabold text-[#0b1f3a] text-sm group-hover:text-sky-600 transition">{member.name}</h3>
                <p className="text-xs font-semibold text-sky-600">{member.role}</p>
                <p className="text-[11px] text-slate-500">{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Milestones */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <h2 className="text-2xl font-black text-[#0b1f3a] text-center">Our Journey of Growth</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-black text-white bg-[#0b1f3a] px-3 py-1 rounded-full">
                {m.year}
              </span>
              <h3 className="font-bold text-slate-900 text-sm mt-3">{m.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
