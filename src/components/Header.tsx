import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { UserRole } from '../types';
import {
  Building2,
  ChevronDown,
  Bell,
  Sparkles,
  AlertTriangle,
  Globe,
  UserCheck,
  Search,
  Activity,
  CalendarPlus,
  Bot,
  HeartPulse,
  Phone,
  LogOut,
  LogIn,
  Menu,
  X,
} from 'lucide-react';

interface HeaderProps {
  viewMode: 'public' | 'portal';
  setViewMode: (mode: 'public' | 'portal') => void;
  publicTab: string;
  setPublicTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  publicTab,
  setPublicTab,
}) => {
  const {
    currentRole,
    setCurrentRole,
    currentHospital,
    currentBranch,
    hospitals,
    branches,
    setCurrentHospitalId,
    setCurrentBranchId,
    currentLanguage,
    setCurrentLanguage,
    notifications,
    markNotificationsRead,
    openAIModal,
    openActionModal,
  } = useHospital();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const rolesList: { role: UserRole; label: string; badge: string; color: string }[] = [
    { role: 'doctor', label: 'Doctor Portal', badge: 'EHR & OPD', color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
    { role: 'patient', label: 'Patient Portal', badge: 'My Health', color: 'bg-sky-500/10 text-sky-600 border-sky-200' },
    { role: 'receptionist', label: 'Reception & Queue', badge: 'Registration', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200' },
    { role: 'nurse', label: 'Nurse & Ward', badge: 'Vitals & Beds', color: 'bg-rose-500/10 text-rose-600 border-rose-200' },
    { role: 'pharmacist', label: 'Pharmacy POS', badge: 'Inventory', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
    { role: 'lab_technician', label: 'Laboratory LIMS', badge: 'Samples & Tests', color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
    { role: 'radiologist', label: 'Radiology PACS', badge: 'Scans & Reports', color: 'bg-purple-500/10 text-purple-600 border-purple-200' },
    { role: 'ambulance_driver', label: 'Ambulance & SOS', badge: 'Emergency Fleet', color: 'bg-red-500/10 text-red-600 border-red-200' },
    { role: 'hr_manager', label: 'HR & Payroll', badge: 'Staff Roster', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200' },
    { role: 'hospital_admin', label: 'Hospital Admin', badge: 'Operations', color: 'bg-slate-500/10 text-slate-700 border-slate-200' },
    { role: 'super_admin', label: 'Super Admin', badge: 'Multi-Tenant', color: 'bg-violet-500/10 text-violet-700 border-violet-200' },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const isPublic = viewMode === 'public';

  return (
    <header className="sticky top-0 z-40 transition-colors bg-white border-b border-slate-200 shadow-sm text-slate-800">
      {/* Top Banner Notice for Emergency / Multi-tenant (Compact) */}
      {!isPublic && (
        <div className="bg-sky-50 text-xs py-1.5 px-4 flex justify-between items-center text-slate-700 border-b border-sky-100">
          <div className="flex items-center space-x-3 overflow-hidden">
            <span className="flex items-center bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
              <Activity className="w-3 h-3 mr-1 animate-pulse" />
              24/7 ER ACTIVE
            </span>
            <span className="hidden md:inline truncate">
              {currentHospital.name} • {currentBranch.name} • Emergency Hotline: <strong className="text-blue-900 font-extrabold">{currentHospital.emergencyPhone}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-700 shrink-0">
            <button
              onClick={() => openAIModal('symptom_checker')}
              className="hover:text-blue-700 flex items-center font-bold text-blue-600 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1 text-blue-600" />
              AI Symptom Triage
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => openActionModal('emergency_sos')}
              className="bg-sky-100 hover:bg-sky-200 text-blue-900 font-bold px-2.5 py-0.5 rounded text-xs flex items-center border border-sky-300 shadow-sm cursor-pointer"
            >
              <Phone className="w-3 h-3 mr-1 text-blue-600" />
              DISPATCH AMBULANCE
            </button>
          </div>
        </div>
      )}

      {/* Main Header Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Brand & Public Nav Links */}
        <div className="flex items-center space-x-8">
          <button
            onClick={() => {
              setViewMode('public');
              setPublicTab('home');
            }}
            className="flex items-center space-x-2 text-left group cursor-pointer"
          >
            <span className={`font-black text-xl tracking-tight ${isPublic ? 'text-[#0b1f3a]' : 'text-white'}`}>
              HealthFlow Medical
            </span>
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => {
                setViewMode('public');
                setPublicTab('home');
              }}
              className={`transition cursor-pointer pb-1 ${
                viewMode === 'public' && publicTab === 'home'
                  ? isPublic
                    ? 'text-[#0b1f3a] font-bold border-b-2 border-[#0b1f3a]'
                    : 'text-sky-400 font-bold border-b-2 border-sky-400'
                  : isPublic
                  ? 'text-slate-600 hover:text-[#0b1f3a]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setViewMode('public');
                setPublicTab('doctors');
              }}
              className={`transition cursor-pointer pb-1 ${
                viewMode === 'public' && publicTab === 'doctors'
                  ? isPublic
                    ? 'text-[#0b1f3a] font-bold border-b-2 border-[#0b1f3a]'
                    : 'text-sky-400 font-bold border-b-2 border-sky-400'
                  : isPublic
                  ? 'text-slate-600 hover:text-[#0b1f3a]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => {
                setViewMode('public');
                setPublicTab('departments');
              }}
              className={`transition cursor-pointer pb-1 ${
                viewMode === 'public' && publicTab === 'departments'
                  ? isPublic
                    ? 'text-[#0b1f3a] font-bold border-b-2 border-[#0b1f3a]'
                    : 'text-sky-400 font-bold border-b-2 border-sky-400'
                  : isPublic
                  ? 'text-slate-600 hover:text-[#0b1f3a]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Departments
            </button>
            <button
              onClick={() => {
                setViewMode('public');
                setPublicTab('staff');
              }}
              className={`transition cursor-pointer pb-1 ${
                viewMode === 'public' && (publicTab === 'staff' || publicTab === 'staff_portal')
                  ? isPublic
                    ? 'text-[#0b1f3a] font-bold border-b-2 border-[#0b1f3a]'
                    : 'text-sky-400 font-bold border-b-2 border-sky-400'
                  : isPublic
                  ? 'text-slate-600 hover:text-[#0b1f3a]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Staff Login
            </button>
            <button
              onClick={() => {
                setViewMode('public');
                setPublicTab('about');
              }}
              className={`transition cursor-pointer pb-1 ${
                viewMode === 'public' && publicTab === 'about'
                  ? isPublic
                    ? 'text-[#0b1f3a] font-bold border-b-2 border-[#0b1f3a]'
                    : 'text-sky-400 font-bold border-b-2 border-sky-400'
                  : isPublic
                  ? 'text-slate-600 hover:text-[#0b1f3a]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              About
            </button>
            <button
              onClick={() => {
                setViewMode('public');
                setPublicTab('careers');
              }}
              className={`transition cursor-pointer pb-1 ${
                viewMode === 'public' && publicTab === 'careers'
                  ? isPublic
                    ? 'text-[#0b1f3a] font-bold border-b-2 border-[#0b1f3a]'
                    : 'text-sky-400 font-bold border-b-2 border-sky-400'
                  : isPublic
                  ? 'text-slate-600 hover:text-[#0b1f3a]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Careers
            </button>
            <button
              onClick={() => {
                setViewMode('public');
                setPublicTab('contact');
              }}
              className={`transition cursor-pointer pb-1 ${
                viewMode === 'public' && publicTab === 'contact'
                  ? isPublic
                    ? 'text-[#0b1f3a] font-bold border-b-2 border-[#0b1f3a]'
                    : 'text-sky-400 font-bold border-b-2 border-sky-400'
                  : isPublic
                  ? 'text-slate-600 hover:text-[#0b1f3a]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => {
                setViewMode('public');
                setPublicTab('bill_pay');
              }}
              className={`transition cursor-pointer pb-1 ${
                viewMode === 'public' && publicTab === 'bill_pay'
                  ? isPublic
                    ? 'text-emerald-700 font-bold border-b-2 border-emerald-600'
                    : 'text-emerald-400 font-bold border-b-2 border-emerald-400'
                  : isPublic
                  ? 'text-emerald-600 font-semibold hover:text-emerald-800'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              Pay OPD Bill
            </button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Public Right Action Buttons matching screenshot */}
          {isPublic ? (
            <>
              <button
                onClick={() => setPublicTab('booking')}
                className="bg-[#0b1f3a] hover:bg-[#122b4f] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
              >
                Book Appointment
              </button>

              <button
                onClick={() => openActionModal('emergency_sos')}
                className="bg-sky-50 hover:bg-sky-100 text-blue-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center space-x-1.5 border border-sky-300 shadow-sm transition cursor-pointer"
              >
                <span className="font-extrabold text-base leading-none text-blue-600">✻</span>
                <span>Emergency Call</span>
              </button>

              {/* Staff Login Button */}
              <button
                onClick={() => {
                  setViewMode('public');
                  setPublicTab('staff');
                }}
                className="bg-sky-50 hover:bg-sky-100 text-blue-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl flex items-center space-x-1.5 border border-sky-300 shadow-sm transition cursor-pointer"
                title="Staff Login Gateway"
              >
                <LogIn className="w-4 h-4 text-blue-600" />
                <span>Staff Login</span>
              </button>
            </>
          ) : (
            <>
              {/* Branch Selector (Portal Mode) */}
              <div className="hidden md:flex items-center relative">
                <button
                  onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                  className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-300 transition cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold truncate max-w-[150px]">{currentBranch.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {showBranchDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl py-2 z-50 text-slate-900">
                    <div className="px-3 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Select Hospital Branch
                    </div>
                    {branches.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          setCurrentBranchId(b.id);
                          setShowBranchDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition cursor-pointer ${
                          b.id === currentBranch.id ? 'text-blue-700 font-bold bg-blue-50' : 'text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{b.name}</p>
                          <p className="text-[11px] text-slate-500">{b.city} • Head: {b.headDoctor}</p>
                        </div>
                        {b.id === currentBranch.id && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick AI Assistant */}
              <button
                onClick={() => openAIModal('assistant')}
                className="hidden sm:flex items-center space-x-1.5 bg-sky-100 hover:bg-sky-200 text-blue-900 border border-sky-300 text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm transition cursor-pointer"
              >
                <Bot className="w-4 h-4 text-blue-600" />
                <span>AI Assistant</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    markNotificationsRead();
                  }}
                  className="relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-2xl p-3 z-50 text-slate-900">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                      <h4 className="text-xs font-bold text-slate-900 flex items-center">
                        <Bell className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                        Live System Alerts
                      </h4>
                      <span className="text-[10px] text-slate-500">{notifications.length} recent</span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-lg text-xs border ${
                            n.type === 'urgent'
                              ? 'bg-rose-50 border-rose-200 text-rose-900'
                              : n.type === 'warning'
                              ? 'bg-amber-50 border-amber-200 text-amber-900'
                              : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-500 shrink-0 ml-1">{n.time}</span>
                          </div>
                          <p className="mt-1 text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Role Switcher Toolbar Button */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="flex items-center space-x-2 bg-sky-50 hover:bg-sky-100 border border-sky-300 text-blue-900 text-xs px-3 py-1.5 rounded-lg transition shadow-sm cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <div className="text-left hidden sm:block">
                    <span className="block font-bold leading-none text-blue-950">
                      {rolesList.find((r) => r.role === currentRole)?.label || currentRole}
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold leading-none">Switch Portal View</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
                </button>

                {showRoleDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-2xl p-2 z-50 text-slate-900">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900">Role-Based Access Control (RBAC)</p>
                      <p className="text-[11px] text-slate-500">Switch role to simulate specific portal features</p>
                    </div>
                    <div className="space-y-1 max-h-80 overflow-y-auto">
                      {rolesList.map((item) => (
                        <button
                          key={item.role}
                          onClick={() => {
                            setCurrentRole(item.role);
                            setViewMode('portal');
                            setShowRoleDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                            currentRole === item.role
                              ? 'bg-blue-600 text-white font-bold'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="font-medium">{item.label}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded border ${item.color}`}>
                            {item.badge}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2 mt-1 border-t border-slate-200">
                      <button
                        onClick={() => {
                          setViewMode('public');
                          setPublicTab('home');
                          setShowRoleDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between text-rose-700 hover:bg-rose-50 transition cursor-pointer font-bold"
                      >
                        <span className="flex items-center space-x-1.5">
                          <LogOut className="w-3.5 h-3.5 text-rose-600" />
                          <span>Log Out of Portal</span>
                        </span>
                        <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
                          Exit Session
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Portal Logout Button */}
              <button
                onClick={() => {
                  setViewMode('public');
                  setPublicTab('home');
                }}
                className="flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-sm transition cursor-pointer"
                title="Log Out of Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg ${isPublic ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'}`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 p-4 space-y-3">
          <div className="flex rounded-lg bg-slate-900 p-1">
            <button
              onClick={() => { setViewMode('public'); setMobileMenuOpen(false); }}
              className={`flex-1 py-2 text-xs font-semibold rounded ${viewMode === 'public' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
            >
              Public Website
            </button>
            <button
              onClick={() => { setViewMode('portal'); setMobileMenuOpen(false); }}
              className={`flex-1 py-2 text-xs font-semibold rounded ${viewMode === 'portal' ? 'bg-teal-600 text-white' : 'text-slate-400'}`}
            >
              Management Portal
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400">Current Branch:</p>
            <select
              value={currentBranch.id}
              onChange={(e) => setCurrentBranchId(e.target.value)}
              className="w-full bg-slate-900 text-slate-200 border border-slate-700 rounded-lg p-2 text-xs"
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id}>{b.name} ({b.city})</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              onClick={() => { openAIModal('assistant'); setMobileMenuOpen(false); }}
              className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center"
            >
              <Bot className="w-4 h-4 mr-1.5" />
              AI Assistant
            </button>
            <button
              onClick={() => { openActionModal('emergency_sos'); setMobileMenuOpen(false); }}
              className="flex-1 bg-rose-600 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center"
            >
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              Emergency SOS
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
