import React from 'react';
import { mockDepartments } from '../../data/mockData';
import { Building2, MapPin, Users, Stethoscope, ChevronRight } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const DepartmentList: React.FC = () => {
  const { openActionModal } = useHospital();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Hospital Departments & Specialised Centres</h1>
        <p className="text-sm text-slate-600 mt-1">
          Explore our multidisciplinary departments, chief consultants, and dedicated surgical facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockDepartments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                  {dept.code}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {dept.location}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">{dept.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{dept.description}</p>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Head of Department:</span>
                  <span className="font-semibold text-slate-900">{dept.headDoctor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Active Medical Specialists:</span>
                  <span className="font-semibold text-teal-700">{dept.totalDoctors} Consultants</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openActionModal('new_appointment', { departmentName: dept.name })}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-3 rounded-xl transition cursor-pointer flex items-center justify-center"
            >
              <Stethoscope className="w-4 h-4 mr-2" />
              Book Department OPD
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
