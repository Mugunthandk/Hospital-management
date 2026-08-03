import React, { useState } from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Header } from './components/Header';
import { PublicHome } from './components/PublicWebsite/PublicHome';
import { DoctorDirectory } from './components/PublicWebsite/DoctorDirectory';
import { DepartmentList } from './components/PublicWebsite/DepartmentList';
import { HealthPackagesPage } from './components/PublicWebsite/HealthPackagesPage';
import { EmergencyAmbulancePage } from './components/PublicWebsite/EmergencyAmbulancePage';
import { PublicBlogFAQ } from './components/PublicWebsite/PublicBlogFAQ';
import { AppointmentBookingWizard } from './components/PublicWebsite/AppointmentBookingWizard';
import { AboutPage } from './components/PublicWebsite/AboutPage';
import { StaffPortalPage } from './components/PublicWebsite/StaffPortalPage';
import { CareersPage } from './components/PublicWebsite/CareersPage';
import { ContactPage } from './components/PublicWebsite/ContactPage';
import { BillPayPage } from './components/PublicWebsite/BillPayPage';
import { DoctorPortal } from './components/Portals/DoctorPortal';
import { PatientPortal } from './components/Portals/PatientPortal';
import { AdminPortal } from './components/Portals/AdminPortal';
import { NursePortal } from './components/Portals/NursePortal';
import { PharmacyPortal } from './components/Portals/PharmacyPortal';
import { LabPortal } from './components/Portals/LabPortal';
import { GenericRolePortal } from './components/Portals/GenericRolePortal';
import { ActionModals } from './components/Modals/ActionModals';
import { AIModal } from './components/Modals/AIModal';
import { HeartPulse, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentRole, currentHospital } = useHospital();
  const [viewMode, setViewMode] = useState<'public' | 'portal'>('public');
  const [publicTab, setPublicTab] = useState<string>('home');

  const renderPortalView = () => {
    switch (currentRole) {
      case 'doctor':
        return <DoctorPortal />;
      case 'patient':
        return <PatientPortal />;
      case 'hospital_admin':
        return <AdminPortal />;
      case 'nurse':
        return <NursePortal />;
      case 'pharmacist':
        return <PharmacyPortal />;
      case 'lab_technician':
        return <LabPortal />;
      default:
        return <GenericRolePortal role={currentRole} />;
    }
  };

  const renderPublicView = () => {
    switch (publicTab) {
      case 'doctors':
        return <DoctorDirectory />;
      case 'departments':
        return <DepartmentList />;
      case 'packages':
        return <HealthPackagesPage />;
      case 'emergency':
        return <EmergencyAmbulancePage />;
      case 'faq':
        return <PublicBlogFAQ />;
      case 'about':
        return <AboutPage setPublicTab={setPublicTab} />;
      case 'careers':
        return <CareersPage setPublicTab={setPublicTab} />;
      case 'contact':
        return <ContactPage setPublicTab={setPublicTab} />;
      case 'bill_pay':
        return <BillPayPage />;
      case 'booking':
        return <AppointmentBookingWizard setPublicTab={setPublicTab} />;
      case 'staff':
      case 'staff_portal':
        return <StaffPortalPage setPublicTab={setPublicTab} setViewMode={setViewMode} />;
      case 'home':
      default:
        return <PublicHome setPublicTab={setPublicTab} setViewMode={setViewMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-slate-950">
      <div>
        {/* Navigation Bar */}
        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          publicTab={publicTab}
          setPublicTab={setPublicTab}
        />

        {/* View Switcher Container */}
        <main id="app-main-content">
          {viewMode === 'portal' ? renderPortalView() : renderPublicView()}
        </main>
      </div>

      {/* Global Modals */}
      <ActionModals />
      <AIModal />

      {/* Footer for Public Site */}
      {viewMode === 'public' && (
        <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-white font-bold text-base">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
                <span>{currentHospital.name}</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                JCI-Accredited Multi-Specialty Enterprise Medical System & Level-1 Emergency Trauma Center.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setPublicTab('doctors')} className="hover:text-emerald-400">
                    Find a Doctor
                  </button>
                </li>
                <li>
                  <button onClick={() => setPublicTab('departments')} className="hover:text-emerald-400">
                    Centres of Excellence
                  </button>
                </li>
                <li>
                  <button onClick={() => setPublicTab('packages')} className="hover:text-emerald-400">
                    Preventative Health Checkups
                  </button>
                </li>
                <li>
                  <button onClick={() => setPublicTab('emergency')} className="hover:text-emerald-400">
                    24/7 Emergency Ambulance
                  </button>
                </li>
                <li>
                  <button onClick={() => setPublicTab('staff')} className="hover:text-emerald-400 text-left">
                    Staff Login & Roster
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Patient Portals</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setViewMode('portal');
                    }}
                    className="hover:text-emerald-400 text-left"
                  >
                    OPD Ticket & e-Prescriptions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setViewMode('portal');
                    }}
                    className="hover:text-emerald-400 text-left"
                  >
                    Lab Diagnostic Reports
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Contact & Support</h4>
              <p className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0" />
                123 Medical Plaza, Health City
              </p>
              <p className="flex items-center">
                <Phone className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0" />
                Emergency Hotline: {currentHospital.emergencyPhone}
              </p>
              <p className="flex items-center">
                <Mail className="w-3.5 h-3.5 mr-2 text-emerald-400 shrink-0" />
                care@healthflow.org
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-900 text-center text-[11px] text-slate-500">
            © 2026 {currentHospital.name}. All rights reserved. Enterprise Healthcare System with AI Integration.
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <MainAppContent />
    </HospitalProvider>
  );
}
