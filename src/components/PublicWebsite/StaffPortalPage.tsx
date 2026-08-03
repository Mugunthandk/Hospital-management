import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { mockStaff } from '../../data/mockData';
import { StaffMember, UserRole } from '../../types';
import {
  Users,
  Search,
  Building2,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Pill,
  TestTube,
  FileText,
  Truck,
  UserCheck,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  BadgeAlert,
  SlidersHorizontal,
  User,
  Activity,
  Calendar,
  Lock,
  Radio,
  ClipboardList,
  AlertCircle,
  FileSpreadsheet,
  Zap,
  LogIn,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';

interface StaffPortalPageProps {
  setPublicTab?: (tab: string) => void;
  setViewMode?: (mode: 'public' | 'portal') => void;
}

export const StaffPortalPage: React.FC<StaffPortalPageProps> = ({ setPublicTab, setViewMode }) => {
  const { currentRole, setCurrentRole, setViewMode: globalSetViewMode, branches, appointments, wardBeds, medicines, labTests, ambulances } = useHospital();

  const [activePortalTab, setActivePortalTab] = useState<'login' | 'gateways' | 'roster' | 'shifts' | 'security'>('login');
  const [employeeId, setEmployeeId] = useState('DOC-1002');
  const [password, setPassword] = useState('password123');
  const [loginRole, setLoginRole] = useState<UserRole>('doctor');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMsg, setLoginMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [selectedStaffModal, setSelectedStaffModal] = useState<StaffMember | null>(null);

  const handlePerformLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginMsg('');

    setTimeout(() => {
      setIsLoggingIn(false);
      setCurrentRole(loginRole);
      setLoginMsg(`Authenticated successfully! Transitioning to ${loginRole.toUpperCase()} portal...`);

      setTimeout(() => {
        if (setViewMode) {
          setViewMode('portal');
        } else {
          globalSetViewMode('portal');
        }
      }, 500);
    }, 400);
  };

  const handleLogout = () => {
    if (setViewMode) {
      setViewMode('public');
    } else {
      globalSetViewMode('public');
    }
    if (setPublicTab) {
      setPublicTab('home');
    }
  };

  const handleLaunchRolePortal = (role: UserRole) => {
    setCurrentRole(role);
    if (setViewMode) {
      setViewMode('portal');
    } else {
      globalSetViewMode('portal');
    }
  };

  // Comprehensive Portal Gateways List covering all 10 hospital roles requested
  const portalGateways: {
    role: UserRole;
    title: string;
    subtitle: string;
    systemCode: string;
    icon: any;
    colorTheme: {
      border: string;
      bg: string;
      badge: string;
      text: string;
      btn: string;
      hover: string;
    };
    metrics: string;
    features: string[];
    leadPerson: string;
  }[] = [
    {
      role: 'doctor',
      title: 'Doctor Portal',
      subtitle: 'Clinical EHR, Consultations & Prescriptions',
      systemCode: 'SYS-DOC-EHR',
      icon: Stethoscope,
      colorTheme: {
        border: 'border-blue-200',
        bg: 'bg-blue-50/40',
        badge: 'bg-blue-100 text-blue-800 border-blue-300',
        text: 'text-blue-900',
        btn: 'bg-blue-600 hover:bg-blue-700 text-white',
        hover: 'hover:border-blue-400 hover:shadow-blue-100',
      },
      metrics: `${appointments?.length || 12} Active OPD Consultations`,
      features: ['Electronic Health Records (EHR)', 'Digital E-Prescription Generator', 'Patient Vitals & History Tracker', 'Lab & Radiology Order Dispatch'],
      leadPerson: 'Dr. Sarah Johnson, MD (Head of Cardiology)',
    },
    {
      role: 'patient',
      title: 'Patient Portal',
      subtitle: 'My Health Records, Appointments & Bills',
      systemCode: 'SYS-PAT-SELF',
      icon: User,
      colorTheme: {
        border: 'border-emerald-200',
        bg: 'bg-emerald-50/40',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        text: 'text-emerald-900',
        btn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        hover: 'hover:border-emerald-400 hover:shadow-emerald-100',
      },
      metrics: '24/7 Patient Self-Service Access',
      features: ['Instant Appointment Booking', 'Downloadable Diagnostic Reports', 'Online OPD & IPD Invoice Payments', 'Personalized Prescription Wallet'],
      leadPerson: 'Self-Service Patient Gateway',
    },
    {
      role: 'receptionist',
      title: 'Reception & Queue Portal',
      subtitle: 'Patient Intake, Tokens & Desk Dispatch',
      systemCode: 'SYS-RCP-QUEUE',
      icon: UserCheck,
      colorTheme: {
        border: 'border-indigo-200',
        bg: 'bg-indigo-50/40',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        text: 'text-indigo-900',
        btn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        hover: 'hover:border-indigo-400 hover:shadow-indigo-100',
      },
      metrics: 'OPD Token Counter Live Queue',
      features: ['Walk-in Patient Token Issuance', 'Emergency Triage Check-in', 'Doctor OPD Slot Counter', 'Visitor Pass Authorization'],
      leadPerson: 'Arthur Pendelton (Front Desk Manager)',
    },
    {
      role: 'nurse',
      title: 'Nurse & Ward Portal',
      subtitle: 'IPD Bed Management & Hourly Vitals Log',
      systemCode: 'SYS-NRS-WARD',
      icon: HeartPulse,
      colorTheme: {
        border: 'border-rose-200',
        bg: 'bg-rose-50/40',
        badge: 'bg-rose-100 text-rose-800 border-rose-300',
        text: 'text-rose-900',
        btn: 'bg-rose-600 hover:bg-rose-700 text-white',
        hover: 'hover:border-rose-400 hover:shadow-rose-100',
      },
      metrics: `${wardBeds?.filter((b) => b.status === 'Occupied' || b.status === 'ICU').length || 18} Occupied Ward/ICU Beds`,
      features: ['ICU & General Bed Matrix', 'Hourly Vitals Logging (BP, SpO2, HR)', 'Medication Administration Record (MAR)', 'Shift Handover Nurse Notes'],
      leadPerson: 'Nancy Drew, BSN, RN (ICU Lead Nurse)',
    },
    {
      role: 'pharmacist',
      title: 'Pharmacy POS Portal',
      subtitle: 'Medication Dispensing & Inventory Control',
      systemCode: 'SYS-PHM-POS',
      icon: Pill,
      colorTheme: {
        border: 'border-amber-200',
        bg: 'bg-amber-50/40',
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
        text: 'text-amber-900',
        btn: 'bg-amber-600 hover:bg-amber-700 text-white',
        hover: 'hover:border-amber-400 hover:shadow-amber-100',
      },
      metrics: `${medicines?.length || 85} Meds in Active Stock`,
      features: ['Prescription Barcode Dispenser', 'Batch Expiry & Low Stock Alerts', 'OTC Medicine Billing Counter', 'Narcotic Controlled Drug Vault'],
      leadPerson: 'Rachel Green, PharmD (Chief Pharmacist)',
    },
    {
      role: 'lab_technician',
      title: 'Laboratory LIMS Portal',
      subtitle: 'Blood Tests, Specimen Tracking & LIMS',
      systemCode: 'SYS-LAB-LIMS',
      icon: TestTube,
      colorTheme: {
        border: 'border-cyan-200',
        bg: 'bg-cyan-50/40',
        badge: 'bg-cyan-100 text-cyan-800 border-cyan-300',
        text: 'text-cyan-900',
        btn: 'bg-cyan-600 hover:bg-cyan-700 text-white',
        hover: 'hover:border-cyan-400 hover:shadow-cyan-100',
      },
      metrics: `${labTests?.length || 24} Diagnostic Samples Pending`,
      features: ['Automated Blood Analyzer Sync', 'Pathology Test Report Generator', 'Specimen Barcode Tracking', 'Critical Value Alerts to Doctors'],
      leadPerson: 'Marcus Sterling, B.Sc (Senior Lab Tech)',
    },
    {
      role: 'radiologist',
      title: 'Radiology PACS Portal',
      subtitle: '3T MRI, CT Scan DICOM & Imaging Reports',
      systemCode: 'SYS-RAD-PACS',
      icon: FileText,
      colorTheme: {
        border: 'border-purple-200',
        bg: 'bg-purple-50/40',
        badge: 'bg-purple-100 text-purple-800 border-purple-300',
        text: 'text-purple-900',
        btn: 'bg-purple-600 hover:bg-purple-700 text-white',
        hover: 'hover:border-purple-400 hover:shadow-purple-100',
      },
      metrics: '3T MRI / PET-CT DICOM Viewer',
      features: ['PACS DICOM Image Suite', 'Radiological Diagnosis Reporting', 'Urgent Trauma Scan Queue', '3D Volumetric Reconstruction'],
      leadPerson: 'Dr. David Vance, MD (Radiology Specialist)',
    },
    {
      role: 'ambulance_driver',
      title: 'Ambulance & SOS Portal',
      subtitle: 'GPS Fleet Management & Emergency Dispatch',
      systemCode: 'SYS-AMB-DISPATCH',
      icon: Truck,
      colorTheme: {
        border: 'border-red-200',
        bg: 'bg-red-50/40',
        badge: 'bg-red-100 text-red-800 border-red-300',
        text: 'text-red-900',
        btn: 'bg-red-600 hover:bg-red-700 text-white',
        hover: 'hover:border-red-400 hover:shadow-red-100',
      },
      metrics: `${ambulances?.length || 4} On-Call Emergency Fleet Units`,
      features: ['Real-Time GPS Vehicle Tracking', 'ALS Cardiac Monitor Connectivity', 'Emergency Dispatch Telemetry', 'Hospital Trauma Bay Pre-Arrival Notice'],
      leadPerson: 'Captain Frank Miller (Emergency Fleet Lead)',
    },
    {
      role: 'hr_manager',
      title: 'HR & Payroll Portal',
      subtitle: 'Staff Roster, Credentialing & Attendance',
      systemCode: 'SYS-HR-OPS',
      icon: Users,
      colorTheme: {
        border: 'border-teal-200',
        bg: 'bg-teal-50/40',
        badge: 'bg-teal-100 text-teal-800 border-teal-300',
        text: 'text-teal-900',
        btn: 'bg-teal-600 hover:bg-teal-700 text-white',
        hover: 'hover:border-teal-400 hover:shadow-teal-100',
      },
      metrics: `${mockStaff.length} Enrolled Employees`,
      features: ['Biometric Attendance Tracking', 'Medical License Renewal Audit', 'Monthly Automated Payroll Engine', 'Duty Roster Shift Planner'],
      leadPerson: 'Victoria Hastings (HR Operations Manager)',
    },
    {
      role: 'hospital_admin',
      title: 'Hospital Admin Portal',
      subtitle: 'Executive Oversight, Revenue & Security Audits',
      systemCode: 'SYS-ADM-EXEC',
      icon: ShieldCheck,
      colorTheme: {
        border: 'border-slate-300',
        bg: 'bg-slate-100/60',
        badge: 'bg-slate-200 text-slate-800 border-slate-300',
        text: 'text-slate-900',
        btn: 'bg-slate-900 hover:bg-blue-700 text-white',
        hover: 'hover:border-slate-400 hover:shadow-slate-200',
      },
      metrics: 'Full Enterprise System Control',
      features: ['Real-Time Revenue Analytics', 'Bed Occupancy & Census Control', 'HIPAA Compliance Audit Logs', 'Multi-Campus Branch Management'],
      leadPerson: 'Dr. Arthur Vance, MD (Chief Medical Officer)',
    },
  ];

  const rolesConfig: { role: string; label: string; icon: any }[] = [
    { role: 'All', label: 'All Staff Roster', icon: Users },
    { role: 'doctor', label: 'Doctors & Surgeons', icon: Stethoscope },
    { role: 'nurse', label: 'Nurses & Ward Staff', icon: HeartPulse },
    { role: 'pharmacist', label: 'Pharmacists', icon: Pill },
    { role: 'lab_technician', label: 'Lab Technicians', icon: TestTube },
    { role: 'radiologist', label: 'Radiologists', icon: FileText },
    { role: 'receptionist', label: 'Reception & Tokens', icon: UserCheck },
    { role: 'ambulance_driver', label: 'Emergency Drivers', icon: Truck },
    { role: 'hr_manager', label: 'HR & Payroll', icon: Users },
    { role: 'hospital_admin', label: 'Administration', icon: ShieldCheck },
  ];

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesQuery =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (staff.specialization && staff.specialization.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = selectedRole === 'All' || staff.role === selectedRole;
    const matchesBranch = selectedBranch === 'All' || (staff.branchName && staff.branchName.includes(selectedBranch));

    return matchesQuery && matchesRole && matchesBranch;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'doctor':
        return { label: 'Attending Physician', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'nurse':
        return { label: 'Registered Nurse', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'pharmacist':
        return { label: 'Clinical Pharmacist', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'lab_technician':
        return { label: 'Senior Pathologist / Tech', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      case 'radiologist':
        return { label: 'Radiology Specialist', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'receptionist':
        return { label: 'Front Desk Lead', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'ambulance_driver':
        return { label: 'Paramedic Fleet Lead', color: 'bg-red-50 text-red-700 border-red-200' };
      case 'hr_manager':
        return { label: 'HR Operations Manager', color: 'bg-teal-50 text-teal-700 border-teal-200' };
      case 'hospital_admin':
        return { label: 'Executive Admin / CMO', color: 'bg-slate-100 text-slate-800 border-slate-300' };
      default:
        return { label: 'Hospital Staff', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen pb-24 selection:bg-blue-500 selection:text-white">
      {/* Top Header Section - Clean Light Design */}
      <section className="bg-white border-b border-slate-200 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>ENTERPRISE STAFF PORTAL & SYSTEM GATEWAYS</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>System Online</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0b1f3a] tracking-tight">
                Staff Portal & Operations Gateway
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
                Single sign-on access point for medical officers, ward nursing staff, clinical pharmacists, lab pathologists, radiologists, receptionists, emergency drivers, and hospital administration.
              </p>
            </div>

            {/* Quick System Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                <span className="text-xl font-black text-[#0b1f3a] block">10</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Portals</span>
              </div>
              <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 text-center">
                <span className="text-xl font-black text-blue-700 block">{mockStaff.length}</span>
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Active Staff</span>
              </div>
              <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-center">
                <span className="text-xl font-black text-emerald-700 block">98.5%</span>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Attendance</span>
              </div>
              <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 text-center">
                <span className="text-xl font-black text-purple-700 block">3</span>
                <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">Campuses</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="pt-4 border-t border-slate-200 flex items-center space-x-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'login', label: 'Staff Login & SSO', icon: LogIn },
              { id: 'gateways', label: 'All 10 Portal Gateways', icon: Zap },
              { id: 'roster', label: 'Staff Roster & Directory', icon: Users },
              { id: 'shifts', label: 'On-Call Shift Schedule', icon: Calendar },
              { id: 'security', label: 'System Access & Credentials', icon: Lock },
            ].map((tab) => {
              const IconComponent = tab.icon;
              const isActive = activePortalTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePortalTab(tab.id as any)}
                  className={`text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer flex items-center space-x-2 shrink-0 ${
                    isActive
                      ? 'bg-[#0b1f3a] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">

        {/* TAB 0: STAFF LOGIN & AUTHENTICATION GATEWAY */}
        {activePortalTab === 'login' && (
          <section className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            {/* Active Session Alert Banner */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">
                    Hospital Authentication Gateway Active
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Logged in as: <strong className="uppercase font-extrabold text-emerald-900">{currentRole}</strong> (Branch: Main Campus)
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => handleLaunchRolePortal(currentRole)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm cursor-pointer"
                >
                  Launch My Active Portal
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm cursor-pointer flex items-center space-x-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* Login Credentials Box */}
            <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-[#0b1f3a]">Staff Member Login</h3>
                    <p className="text-xs text-slate-500 font-medium">Enter your official hospital credentials & select portal role</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-sky-50 text-sky-700 px-2.5 py-1 rounded-md border border-sky-200 font-bold">
                  256-Bit SSL Encrypted
                </span>
              </div>

              {loginMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center space-x-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{loginMsg}</span>
                </div>
              )}

              <form onSubmit={handlePerformLogin} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Employee ID */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Employee ID / Badge Code
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        placeholder="e.g. DOC-1002"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Security Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Role Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Target Staff Role
                    </label>
                    <select
                      value={loginRole}
                      onChange={(e) => setLoginRole(e.target.value as UserRole)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition font-medium"
                    >
                      <option value="doctor">Doctor (Clinical EHR & Consults)</option>
                      <option value="patient">Patient (Health Records & Bills)</option>
                      <option value="nurse">Nurse (Ward Bed Management)</option>
                      <option value="pharmacist">Pharmacist (Pharmacy POS & Inventory)</option>
                      <option value="lab_technician">Lab Technician (Pathology LIMS)</option>
                      <option value="radiologist">Radiologist (DICOM PACS Reports)</option>
                      <option value="receptionist">Receptionist (OPD Token Desk)</option>
                      <option value="ambulance_driver">Ambulance Driver (24/7 Dispatch)</option>
                      <option value="hr_manager">HR Manager (Payroll & Roster)</option>
                      <option value="hospital_admin">Hospital Admin (CMO Dashboard)</option>
                    </select>
                  </div>

                  {/* Branch Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Hospital Campus Branch
                    </label>
                    <select
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition font-medium"
                    >
                      {branches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.city})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-[11px] text-slate-500 font-medium">
                    Forgot Password? Contact Hospital IT Desk: <span className="text-blue-600 font-bold font-mono">ext-8811</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{isLoggingIn ? 'Verifying Credentials...' : 'Log In & Access Portal'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Quick One-Click Access for all 10 Roles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#0b1f3a]">Or One-Touch Quick Demo Login</h4>
                <span className="text-xs text-slate-500 font-medium">Select any role below for instant portal access</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { role: 'doctor', name: 'Doctor', color: 'bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200' },
                  { role: 'patient', name: 'Patient', color: 'bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200' },
                  { role: 'nurse', name: 'Nurse', color: 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200' },
                  { role: 'pharmacist', name: 'Pharmacy', color: 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200' },
                  { role: 'lab_technician', name: 'Lab Tech', color: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border border-cyan-200' },
                  { role: 'radiologist', name: 'Radiologist', color: 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200' },
                  { role: 'receptionist', name: 'Reception', color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200' },
                  { role: 'ambulance_driver', name: 'Ambulance', color: 'bg-blue-50/80 hover:bg-blue-100 text-blue-900 border border-blue-200' },
                  { role: 'hr_manager', name: 'HR Manager', color: 'bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200' },
                  { role: 'hospital_admin', name: 'Admin', color: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300' },
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => handleLaunchRolePortal(item.role as UserRole)}
                    className={`${item.color} p-3 rounded-xl text-xs font-bold transition shadow-sm hover:shadow cursor-pointer flex flex-col items-center justify-center space-y-1 text-center`}
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] opacity-80 font-semibold">Login &rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TAB 1: ALL PORTAL GATEWAYS GRID */}
        {activePortalTab === 'gateways' && (
          <section className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-blue-950">Select Portal Gateway to Launch</h3>
                  <p className="text-xs text-blue-700 font-medium">Click any portal card below to launch the dedicated workspace with live simulated state.</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
                Logged in as: <strong className="text-blue-900 uppercase">Staff Gateway User</strong>
              </span>
            </div>

            {/* Grid of 10 Portals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portalGateways.map((portal) => {
                const IconComponent = portal.icon;
                return (
                  <div
                    key={portal.role}
                    className={`bg-white rounded-3xl p-6 border ${portal.colorTheme.border} ${portal.colorTheme.hover} transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-5 group relative`}
                  >
                    <div className="space-y-4">
                      {/* Card Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-2xl ${portal.colorTheme.bg} border ${portal.colorTheme.border} flex items-center justify-center`}>
                            <IconComponent className={`w-6 h-6 ${portal.colorTheme.text}`} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {portal.systemCode}
                            </span>
                            <h3 className="text-lg font-black text-[#0b1f3a] group-hover:text-blue-600 transition mt-0.5">
                              {portal.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {portal.subtitle}
                      </p>

                      {/* Live Metric Badge */}
                      <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium flex items-center space-x-1.5">
                          <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                          <span>Status:</span>
                        </span>
                        <strong className="text-slate-900 font-bold">{portal.metrics}</strong>
                      </div>

                      {/* Features Bullet List */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Capabilities:</span>
                        <ul className="space-y-1">
                          {portal.features.map((feat, idx) => (
                            <li key={idx} className="text-xs text-slate-600 flex items-center space-x-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Lead Officer Info */}
                      <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-700">Lead Officer: </span>
                        {portal.leadPerson}
                      </div>
                    </div>

                    {/* Launch Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleLaunchRolePortal(portal.role)}
                        className={`w-full ${portal.colorTheme.btn} font-bold text-xs py-3 px-4 rounded-2xl transition cursor-pointer flex items-center justify-center space-x-2 shadow-sm`}
                      >
                        <span>Launch {portal.title}</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* TAB 2: STAFF ROSTER & DIRECTORY */}
        {(activePortalTab === 'roster' || activePortalTab === 'gateways') && (
          <section className="space-y-6 pt-4 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-[#0b1f3a] tracking-tight">
                  Hospital Medical & Operational Roster
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Search active personnel, filter by department, view shift details, or launch individual portals.
                </p>
              </div>

              <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                Showing {filteredStaff.length} of {mockStaff.length} Staff Members
              </div>
            </div>

            {/* Filters Toolbar */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search Input */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search staff by name, emp ID, or department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                {/* Branch Filter Dropdown */}
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full md:w-64 bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
                  >
                    <option value="All">All Hospital Campuses</option>
                    <option value="Main Campus">Main Campus Super-Specialty</option>
                    <option value="North Campus">North Campus Specialist Hub</option>
                    <option value="West Wing">West Wing Diagnostic & Eye Clinic</option>
                  </select>
                </div>
              </div>

              {/* Role Filter Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-200/80">
                {rolesConfig.map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedRole === item.role;
                  return (
                    <button
                      key={item.role}
                      onClick={() => setSelectedRole(item.role)}
                      className={`text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer shrink-0 flex items-center space-x-1.5 border ${
                        isSelected
                          ? 'bg-[#0b1f3a] text-white border-[#0b1f3a] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStaff.map((staff) => {
                const badge = getRoleBadge(staff.role);
                return (
                  <div
                    key={staff.id}
                    className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group relative"
                  >
                    {/* Header Profile */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3.5">
                          <div className="relative">
                            <img
                              src={staff.avatar || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300'}
                              alt={staff.name}
                              className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200 shadow-sm"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="Active On Duty">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {staff.employeeCode}
                            </span>
                            <h3 className="text-base font-black text-[#0b1f3a] group-hover:text-blue-600 transition mt-0.5">
                              {staff.name}
                            </h3>
                            <p className="text-xs text-slate-500 font-medium">{staff.department}</p>
                          </div>
                        </div>
                      </div>

                      {/* Role & Specialization Badge */}
                      <div className="space-y-1.5">
                        <span className={`inline-flex items-center space-x-1 text-[11px] font-bold px-3 py-1 rounded-full border ${badge.color}`}>
                          <ShieldCheck className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>

                        {staff.specialization && (
                          <p className="text-xs text-slate-600 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            {staff.specialization}
                          </p>
                        )}
                      </div>

                      {/* Details List */}
                      <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium flex items-center space-x-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>Campus Branch:</span>
                          </span>
                          <strong className="text-slate-800 text-[11px] truncate max-w-[180px]">
                            {staff.branchName || 'Main Campus'}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>Shift:</span>
                          </span>
                          <strong className="text-slate-800 text-[11px]">{staff.shift}</strong>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium flex items-center space-x-1">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Attendance:</span>
                          </span>
                          <span className="text-xs font-black text-emerald-600">{staff.attendancePercent}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Action Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center space-x-2">
                      <button
                        onClick={() => handleLaunchRolePortal(staff.role)}
                        className="flex-1 bg-[#0b1f3a] hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm"
                      >
                        <span>Launch Portal</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedStaffModal(staff)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-3 rounded-xl transition cursor-pointer"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredStaff.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No staff members match your criteria</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your search query, role filter, or hospital branch selection above.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRole('All');
                    setSelectedBranch('All');
                  }}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer border border-blue-200"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* TAB 3: SHIFT SCHEDULE & ON-CALL ROSTER */}
        {(activePortalTab === 'shifts' || activePortalTab === 'gateways') && (
          <section className="space-y-6 pt-4 border-t border-slate-200">
            <div>
              <h2 className="text-2xl font-black text-[#0b1f3a] tracking-tight">
                Current Shift Roster & Emergency On-Call Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Live coverage across Morning (07:00–15:00), Evening (15:00–23:00), and Night (23:00–07:00) shifts across hospital departments.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Morning Shift */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Morning (07:00 - 15:00)</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">Active Shift</span>
                  </div>

                  <div className="space-y-3">
                    {mockStaff
                      .filter((s) => s.shift.includes('Morning'))
                      .map((s) => (
                        <div key={s.id} className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <h4 className="font-bold text-slate-900">{s.name}</h4>
                            <p className="text-[10px] text-slate-500">{s.department}</p>
                          </div>
                          <button
                            onClick={() => handleLaunchRolePortal(s.role)}
                            className="text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded border border-blue-200"
                          >
                            Launch
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Evening Shift */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Evening (15:00 - 23:00)</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">Upcoming</span>
                  </div>

                  <div className="space-y-3">
                    {mockStaff
                      .filter((s) => s.shift.includes('Evening') || s.shift.includes('General'))
                      .slice(0, 4)
                      .map((s) => (
                        <div key={s.id} className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <h4 className="font-bold text-slate-900">{s.name}</h4>
                            <p className="text-[10px] text-slate-500">{s.department}</p>
                          </div>
                          <button
                            onClick={() => handleLaunchRolePortal(s.role)}
                            className="text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded border border-blue-200"
                          >
                            Launch
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Night Shift */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Night (23:00 - 07:00)</span>
                    </span>
                    <span className="text-[10px] text-red-600 font-bold">Critical Care</span>
                  </div>

                  <div className="space-y-3">
                    {mockStaff
                      .filter((s) => s.shift.includes('Night'))
                      .map((s) => (
                        <div key={s.id} className="flex items-center justify-between text-xs p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <h4 className="font-bold text-slate-900">{s.name}</h4>
                            <p className="text-[10px] text-slate-500">{s.department}</p>
                          </div>
                          <button
                            onClick={() => handleLaunchRolePortal(s.role)}
                            className="text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded border border-blue-200"
                          >
                            Launch
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: SYSTEM ACCESS & SECURITY CREDENTIALS */}
        {activePortalTab === 'security' && (
          <section className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-black text-[#0b1f3a] tracking-tight">
                System Access, Role Authorization & Compliance Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Security roles, permissions matrix, and single sign-on parameters enforced by hospital cybersecurity policies.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { roleTitle: 'Doctor & Surgeon', level: 'Level 4 Clinical', rights: 'EHR Write, Prescription Signing, Lab/Rad Orders', auth: 'Hardware Token + Biometric' },
                  { roleTitle: 'Nurse & Ward Specialist', level: 'Level 3 Ward', rights: 'Vitals Log, Bed Transfer, MAR Administration', auth: 'RFID Badge + PIN' },
                  { roleTitle: 'Clinical Pharmacist', level: 'Level 3 Pharmacy', rights: 'RX Dispensing, Inventory Vault, Controlled Drug Register', auth: 'MFA SMS + Password' },
                  { roleTitle: 'Pathologist & Lab Tech', level: 'Level 3 LIMS', rights: 'Sample Verification, Result Signing, Analyzer Calibration', auth: 'Smartcard Login' },
                  { roleTitle: 'Radiologist', level: 'Level 4 Imaging', rights: 'PACS Image Annotation, Diagnostic DICOM Approval', auth: 'MFA Hardware Key' },
                  { roleTitle: 'Emergency Fleet Driver', level: 'Level 2 Mobile', rights: 'GPS Dispatch Telemetry, Patient Vital Streaming', auth: 'Mobile Terminal PIN' },
                  { roleTitle: 'Front Desk Reception', level: 'Level 2 OPD', rights: 'Token Generation, Patient Registration, OPD Slot Desk', auth: 'SSO LDAP Login' },
                  { roleTitle: 'Hospital Administrator', level: 'Level 5 Super-User', rights: 'Audit Log Access, Revenue Analytics, System Override', auth: '2FA Hardware Key + YubiKey' },
                  { roleTitle: 'Patient Self-Service', level: 'Level 1 External', rights: 'Read-only Personal Records, Invoice Payment, Booking', auth: 'OTP Mobile Authentication' },
                ].map((sec, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-[#0b1f3a]">{sec.roleTitle}</h4>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{sec.level}</span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1.5">
                      <p><strong className="text-slate-800">Permissions:</strong> {sec.rights}</p>
                      <p><strong className="text-slate-800">Auth Standard:</strong> {sec.auth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>

      {/* Staff Profile Modal */}
      {selectedStaffModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedStaffModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center space-x-4">
              <img
                src={selectedStaffModal.avatar || 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300'}
                alt={selectedStaffModal.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500 shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {selectedStaffModal.employeeCode}
                </span>
                <h3 className="text-xl font-black text-[#0b1f3a]">{selectedStaffModal.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{selectedStaffModal.department}</p>
                <p className="text-xs font-bold text-blue-600">{selectedStaffModal.branchName}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email Address:</span>
                </span>
                <strong className="text-slate-900">{selectedStaffModal.email}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Contact Phone:</span>
                </span>
                <strong className="text-slate-900">{selectedStaffModal.phone}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Shift Schedule:</span>
                </span>
                <strong className="text-slate-900">{selectedStaffModal.shift}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center space-x-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Attendance Rate:</span>
                </span>
                <strong className="text-emerald-700 font-black">{selectedStaffModal.attendancePercent}%</strong>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  const roleToLaunch = selectedStaffModal.role;
                  setSelectedStaffModal(null);
                  handleLaunchRolePortal(roleToLaunch);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3.5 rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 shadow"
              >
                <span>Log In & Open {selectedStaffModal.name.split(' ')[0]}'s Portal</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
