import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Bed, Users, DollarSign, Activity, Plus, Sparkles } from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    currentHospital,
    currentBranch,
    wardBeds,
    invoices,
    appointments,
    doctors,
    updateBedStatus,
    openActionModal,
    openAIModal,
  } = useHospital();

  const [activeTab, setActiveTab] = useState<'overview' | 'beds' | 'revenue' | 'staff'>('overview');

  const beds = wardBeds || [];
  const safeInvoices = invoices || [];

  const totalBedsCount = beds.length;
  const occupiedBedsCount = beds.filter((b) => b.status === 'Occupied' || b.status === 'ICU').length;
  const occupancyRate = Math.round((occupiedBedsCount / (totalBedsCount || 1)) * 100);

  const totalRevenue = safeInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Executive Command Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-[#0b1f3a]">{currentHospital.name}</h1>
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md border border-blue-200">
              {currentBranch.name} Campus
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Enterprise Operations • Hospital Command Centre & Resource Telemetry
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => openAIModal('capacity_forecast')}
            className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow cursor-pointer transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Capacity Forecast</span>
          </button>
          <button
            onClick={() => openActionModal('add_patient')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 border border-slate-300 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-600" />
            <span>Register Patient</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Bed Occupancy</span>
          <div className="text-3xl font-black text-blue-600">{occupancyRate}%</div>
          <p className="text-[11px] text-slate-500 font-medium">
            {occupiedBedsCount} of {totalBedsCount} beds occupied
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Hospital Revenue</span>
          <div className="text-3xl font-black text-emerald-600">${totalRevenue.toLocaleString()}</div>
          <p className="text-[11px] text-emerald-600 font-bold">↑ 14% vs previous month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active OPD Appointments</span>
          <div className="text-3xl font-black text-sky-600">{appointments.length}</div>
          <p className="text-[11px] text-slate-500 font-medium">Across {doctors.length} active doctors</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Medical Staff</span>
          <div className="text-3xl font-black text-indigo-600">{doctors.length + 12}</div>
          <p className="text-[11px] text-slate-500 font-medium">Doctors, Nurses & Technicians</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-bold">
        {[
          { id: 'overview', label: 'Inpatient & OPD Overview', icon: Activity },
          { id: 'beds', label: 'Ward Bed Allocation Grid', icon: Bed },
          { id: 'revenue', label: 'Revenue & Billing Analytics', icon: DollarSign },
          { id: 'staff', label: 'Doctor & Nurse Roster', icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 border-b-2 flex items-center space-x-2 transition cursor-pointer ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0b1f3a]">Department Occupancy & Capacity Utilization</h3>
            <div className="space-y-3">
              {[
                { name: 'Cardiology ICU', pct: 90, color: 'bg-rose-500' },
                { name: 'General Medicine Ward', pct: 75, color: 'bg-emerald-500' },
                { name: 'Orthopedics OT & Surgical', pct: 60, color: 'bg-blue-500' },
                { name: 'Pediatric NICU', pct: 85, color: 'bg-amber-500' },
              ].map((d, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-700 font-semibold">
                    <span>{d.name}</span>
                    <span>{d.pct}% Capacity</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className={`h-full ${d.color}`} style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-black text-[#0b1f3a]">System Alerts & Notices</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl font-medium">
                <strong>ICU Bed Alert:</strong> 1 ICU bed remaining in Main Tower.
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl font-medium">
                <strong>Pharmacy Inventory:</strong> Paracetamol IV stock under 100 units.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Bed Allocation Grid */}
      {activeTab === 'beds' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-black text-[#0b1f3a]">Live Inpatient Bed Roster</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beds.map((b) => (
              <div key={b.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#0b1f3a] text-sm">Bed #{b.bedNumber}</h4>
                    <p className="text-xs text-slate-500 font-medium">{b.wardName} • {b.type}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      b.status === 'Available'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : b.status === 'ICU'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                {b.patientName && (
                  <div className="text-xs text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="font-bold text-slate-900">Patient: {b.patientName}</p>
                    <p className="text-[10px] text-slate-500">Admitted: {b.admittedDate}</p>
                  </div>
                )}

                <div className="flex space-x-2 pt-1">
                  {b.status === 'Occupied' ? (
                    <button
                      onClick={() => updateBedStatus(b.id, 'Available')}
                      className="w-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold py-1.5 rounded-lg border border-slate-200 transition"
                    >
                      Process Discharge
                    </button>
                  ) : b.status === 'Available' ? (
                    <button
                      onClick={() => updateBedStatus(b.id, 'Occupied', 'Sarah Jenkins')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 rounded-lg transition"
                    >
                      Assign Patient
                    </button>
                  ) : (
                    <span className="text-[10px] text-rose-600 font-bold text-center w-full block">
                      ICU Critical Care
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Revenue */}
      {activeTab === 'revenue' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-black text-[#0b1f3a]">Billing & Financial Invoices</h3>
          <div className="space-y-3">
            {safeInvoices.map((inv) => (
              <div key={inv.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{inv.patientName}</h4>
                  <p className="text-slate-500">Invoice #{inv.id} • Date: {inv.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-emerald-600">${inv.totalAmount}</div>
                  <span className="text-[10px] font-bold text-slate-500">{inv.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Staff */}
      {activeTab === 'staff' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-black text-[#0b1f3a]">Consultants & Medical Staff Directory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doc) => (
              <div key={doc.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-12 h-12 rounded-full object-cover border border-blue-400"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{doc.name}</h4>
                  <p className="text-[11px] font-semibold text-blue-600">{doc.specialty}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Chamber: {doc.roomNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
