import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { UserRole } from '../../types';
import {
  Users,
  Ambulance,
  Activity,
  Plus,
} from 'lucide-react';

interface GenericRolePortalProps {
  role: UserRole;
}

export const GenericRolePortal: React.FC<GenericRolePortalProps> = ({ role }) => {
  const {
    appointments,
    patients,
    ambulances,
    openActionModal,
  } = useHospital();

  const getRoleDetails = () => {
    switch (role) {
      case 'receptionist':
        return {
          title: 'Reception & Patient OPD Counter',
          subtitle: 'Walk-in Patient Token Issuance, Appointment Scheduling & Desk Billing',
          badge: 'Reception Desk',
        };
      case 'radiologist':
        return {
          title: 'Radiology PACS Imaging Suite',
          subtitle: 'MRI, CT-Scan & X-Ray DICOM Image Analysis Workstation',
          badge: 'PACS Imaging',
        };
      case 'ambulance_driver':
        return {
          title: 'Ambulance & Emergency SOS Dispatch',
          subtitle: 'GPS Telemetry, Emergency Siren Status & Paramedic Crew Roster',
          badge: 'Emergency Fleet',
        };
      case 'hr_manager':
        return {
          title: 'Hospital HR & Medical Staff Payroll',
          subtitle: 'Shift Scheduling, Doctor Attendance & Staff Certification Records',
          badge: 'HR Management',
        };
      case 'super_admin':
        return {
          title: 'Super Admin Multi-Tenant Governance',
          subtitle: 'Hospital Branch Provisioning, Enterprise Subscriptions & Audit Logs',
          badge: 'Multi-Tenant HQ',
        };
      default:
        return {
          title: `${role.toUpperCase()} Workspace`,
          subtitle: 'Hospital Clinical Operations Module',
          badge: role,
        };
    }
  };

  const details = getRoleDetails();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-[#0b1f3a]">{details.title}</h1>
            <span className="bg-blue-50 text-blue-800 text-xs font-bold px-2.5 py-1 rounded border border-blue-200">
              {details.badge}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">{details.subtitle}</p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => openActionModal('new_appointment')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1 shadow transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Action</span>
          </button>
        </div>
      </div>

      {/* Role-Specific Content Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
            <span>Today's Activity</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-[#0b1f3a]">{appointments.length}</div>
          <p className="text-xs text-slate-500 font-medium">Scheduled Queue Items</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
            <span>Active Patients</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-[#0b1f3a]">{patients.length}</div>
          <p className="text-xs text-slate-500 font-medium">In-House Registered MRNs</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
            <span>Emergency Status</span>
            <Ambulance className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">Standby</div>
          <p className="text-xs text-slate-500 font-medium">{ambulances.length} Units Fleet Ready</p>
        </div>
      </div>

      {/* Role Detail Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-black text-[#0b1f3a]">Active Queue Tasks & System Telemetry</h3>
        <div className="space-y-3">
          {appointments.slice(0, 4).map((app) => (
            <div key={app.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
              <div>
                <h4 className="font-bold text-slate-900">{app.patientName}</h4>
                <p className="text-slate-500 font-medium">Chamber / Dept: {app.departmentName} • {app.time}</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2 py-0.5 rounded text-[10px]">
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
