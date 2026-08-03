import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, CheckCircle2, UserCheck, Send, Sparkles, HeartPulse, Building2 } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

interface CareersPageProps {
  setPublicTab?: (tab: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = () => {
  const { currentHospital } = useHospital();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [applicantModalOpen, setApplicantModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateExperience, setCandidateExperience] = useState('3-5 years');
  const [candidateCover, setCandidateCover] = useState('');

  const jobListings = [
    {
      id: 'job-1',
      title: 'Senior Cardiothoracic Surgeon',
      dept: 'Cardiology',
      category: 'Medical',
      type: 'Full Time',
      location: 'Main Branch - Health City',
      experience: '8+ Years',
      salary: '$180k - $240k / yr',
      desc: 'Lead cardiac surgeries, perform angioplasties, and consult on complex vascular pathologies using robotic surgical suites.',
    },
    {
      id: 'job-2',
      title: 'ICU Critical Care Lead Nurse',
      dept: 'Nursing & Emergency',
      category: 'Nursing',
      type: 'Full Time (Shifts)',
      location: 'Central Trauma Wing',
      experience: '4+ Years',
      salary: '$85k - $110k / yr',
      desc: 'Manage continuous vitals monitoring, ventilator settings, and rapid response ICU interventions in a fast-paced environment.',
    },
    {
      id: 'job-3',
      title: 'Diagnostic Radiology Technologist',
      dept: 'Radiology',
      category: 'Diagnostics',
      type: 'Full Time',
      location: 'Main Imaging Center',
      experience: '2+ Years',
      salary: '$70k - $90k / yr',
      desc: 'Operate 3T MRI, 128-slice CT scanners, and PACS imaging systems while ensuring patient safety and position comfort.',
    },
    {
      id: 'job-4',
      title: 'Clinical Pharmacist & Inventory Lead',
      dept: 'Pharmacy',
      category: 'Pharmacy',
      type: 'Full Time',
      location: 'Outpatient Pharmacy POS',
      experience: '3+ Years',
      salary: '$95k - $120k / yr',
      desc: 'Dispense prescription medications, audit contraindications, manage cold-chain vaccine inventories, and counsel patients.',
    },
    {
      id: 'job-5',
      title: 'Hospital Operations HR Manager',
      dept: 'Administration',
      category: 'Admin',
      type: 'Full Time',
      location: 'Corporate Suite',
      experience: '5+ Years',
      salary: '$80k - $105k / yr',
      desc: 'Oversee staff roster management, physician credentials, payroll automation, and healthcare compliance standard audits.',
    },
    {
      id: 'job-6',
      title: 'Emergency Medical Dispatch Officer',
      dept: 'Emergency Response',
      category: 'Emergency',
      type: 'Full Time (24/7 Roster)',
      location: 'Ambulance Command Hub',
      experience: '2+ Years',
      salary: '$60k - $75k / yr',
      desc: 'Coordinate GPS ambulance dispatches, triage incoming 911 calls, and alert trauma teams prior to patient arrival.',
    },
  ];

  const categories = ['All', 'Medical', 'Nursing', 'Diagnostics', 'Pharmacy', 'Admin', 'Emergency'];

  const filteredJobs = selectedCategory === 'All'
    ? jobListings
    : jobListings.filter((j) => j.category === selectedCategory);

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setApplicantModalOpen(true);
    setSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setApplicantModalOpen(false);
      setCandidateName('');
      setCandidateEmail('');
      setCandidatePhone('');
      setCandidateCover('');
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-sans">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0b1f3a] via-slate-900 to-sky-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-slate-800">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-flex items-center space-x-1.5 bg-sky-400/20 text-sky-200 font-bold text-xs px-3 py-1 rounded-full border border-sky-300/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>JOIN OUR WORLD-CLASS MEDICAL TEAM</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Build Your Career with {currentHospital.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Work alongside renowned medical pioneers in a technology-first, supportive hospital environment. Competitive compensation, health benefits, and career advancement.
          </p>
        </div>
      </div>

      {/* Perks & Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Competitive Compensation', desc: 'Industry-leading salaries, annual performance bonuses & 401(k) matching.', icon: DollarSign },
          { title: 'Health & Wellness Cover', desc: 'Full premium medical, dental, vision, and mental health coverage for families.', icon: HeartPulse },
          { title: 'State-of-the-Art Tech', desc: 'Work with 3T MRIs, robotic surgery suites, and instant AI diagnostic tools.', icon: Building2 },
          { title: 'Continued Medical Education', desc: 'Full tuition sponsorship for medical conferences, board certifications & research.', icon: Sparkles },
        ].map((perk, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold border border-sky-100">
              <perk.icon className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-[#0b1f3a] text-sm">{perk.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{perk.desc}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-black text-[#0b1f3a]">Current Openings ({filteredJobs.length})</h2>
            <p className="text-xs text-slate-500">Explore active positions and apply online instantly.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0b1f3a] text-white shadow'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-extrabold text-blue-700 bg-sky-50 border border-sky-200/70 px-2.5 py-0.5 rounded">
                    {job.dept}
                  </span>
                  <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded">
                    {job.salary}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-[#0b1f3a]">{job.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{job.desc}</p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />{job.location}</span>
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />{job.type}</span>
                  <span className="flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1 text-slate-400" />{job.experience}</span>
                </div>
              </div>

              <button
                onClick={() => handleApplyClick(job.title)}
                className="w-full bg-[#0b1f3a] hover:bg-sky-700 text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>Apply for Position</span>
                <Send className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal */}
      {applicantModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setApplicantModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-bold"
            >
              ✕
            </button>

            {!submitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">JOB APPLICATION</span>
                  <h3 className="text-xl font-black text-[#0b1f3a]">{selectedJobTitle}</h3>
                  <p className="text-xs text-slate-500 mt-1">Submit your details for HR preliminary review.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Candidate Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. John Doe"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Clinical Experience</label>
                    <select
                      value={candidateExperience}
                      onChange={(e) => setCandidateExperience(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
                    >
                      <option value="1-2 years">1 - 2 Years</option>
                      <option value="3-5 years">3 - 5 Years</option>
                      <option value="5-8 years">5 - 8 Years</option>
                      <option value="8+ years">8+ Years Senior Practice</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Brief Cover Statement / Resume Link</label>
                    <textarea
                      rows={3}
                      placeholder="Mention your board certifications, licenses, and background summary..."
                      value={candidateCover}
                      onChange={(e) => setCandidateCover(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setApplicantModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#0b1f3a] hover:bg-sky-700 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-sky-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-black text-[#0b1f3a]">Application Received!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{candidateName}</strong>. Our HR recruitment team will review your application for <strong>{selectedJobTitle}</strong> and contact you via email.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
