import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Doctor } from '../../types';
import {
  Search,
  Star,
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const DoctorDirectory: React.FC = () => {
  const { doctors, branches, openActionModal } = useHospital();
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('Any');
  const [selectedDay, setSelectedDay] = useState('Any');
  const [selectedDoctorProfile, setSelectedDoctorProfile] = useState<Doctor | null>(null);

  const safeDoctors = doctors || [];
  const specialties = ['All', ...Array.from(new Set(safeDoctors.map((d) => d.specialty)))];

  const filtered = safeDoctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    const matchesBranch = selectedBranch === 'All' || doc.branchId === selectedBranch;
    const matchesExp =
      selectedExperience === 'Any' || doc.experienceYears >= parseInt(selectedExperience, 10);
    return matchesSearch && matchesSpec && matchesBranch && matchesExp;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0b1f3a]">Find the Right Specialist</h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">
          Search from our network of 120+ top medical specialists.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Doctor Name Search Input */}
          <div className="lg:col-span-3 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Doctor name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Department Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Specialties ({specialties.length - 1})</option>
              {specialties.filter((s) => s !== 'All').map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Campus / Branch Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Campuses ({branches.length})</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="Any">Any Experience</option>
              <option value="5">5+ Years</option>
              <option value="10">10+ Years</option>
              <option value="15">15+ Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Grid (3 per row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((doc) => {
          const docBranch = branches.find((b) => b.id === doc.branchId);
          return (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Doctor Photo */}
                <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>Available OPD</span>
                  </span>

                  <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                    {doc.roomNumber}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">{doc.name}</h3>
                    <p className="text-xs font-semibold text-blue-600">{doc.title}</p>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="flex items-center font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                      {doc.rating} ({doc.reviewCount} reviews)
                    </span>
                    <span className="text-slate-500">• {doc.experienceYears} years exp</span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{docBranch ? docBranch.name : 'Main Campus'} • Fee: <strong className="text-slate-800">${doc.consultationFee}</strong></span>
                  </p>
                </div>
              </div>

            {/* Card Buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center space-x-2">
              <button
                onClick={() => setSelectedDoctorProfile(doc)}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold py-2 rounded-xl border border-slate-300 transition cursor-pointer"
              >
                View Profile
              </button>
              <button
                onClick={() => openActionModal('new_appointment', { doctorId: doc.id })}
                className="flex-1 bg-[#0b1f3a] hover:bg-[#122b4f] text-white text-xs font-bold py-2 rounded-xl transition shadow-sm cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>
        );
      })}
      </div>

      {/* Pagination pill */}
      <div className="mt-12 text-center">
        <button className="bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs px-6 py-3 rounded-full border border-slate-300 shadow-sm transition cursor-pointer">
          Load More Specialists
        </button>
      </div>

      {/* Doctor Modal */}
      {selectedDoctorProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative space-y-4 text-slate-800">
            <button
              onClick={() => setSelectedDoctorProfile(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>

            <div className="flex items-center space-x-4">
              <img
                src={selectedDoctorProfile.avatar}
                alt={selectedDoctorProfile.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-600"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';
                }}
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedDoctorProfile.name}</h3>
                <p className="text-xs font-bold text-blue-600">{selectedDoctorProfile.title}</p>
                <p className="text-xs text-slate-500">{selectedDoctorProfile.qualification}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedDoctorProfile.bio}</p>

            <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedDoctorProfile(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const docId = selectedDoctorProfile.id;
                  setSelectedDoctorProfile(null);
                  openActionModal('new_appointment', { doctorId: docId });
                }}
                className="px-5 py-2 text-xs font-bold bg-[#0b1f3a] text-white hover:bg-[#122b4f] rounded-xl shadow-sm"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
