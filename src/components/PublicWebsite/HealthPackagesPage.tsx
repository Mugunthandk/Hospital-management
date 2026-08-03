import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { ShieldCheck, CheckCircle2, HeartPulse, User, Sparkles } from 'lucide-react';

export const HealthPackagesPage: React.FC = () => {
  const { openActionModal } = useHospital();

  const packages = [
    {
      title: 'Master Executive Full-Body Screening',
      subtitle: 'Comprehensive annual preventative diagnostic package for working professionals.',
      price: '$299',
      testsCount: '88 Blood & Diagnostic Tests',
      highlights: ['Lipid & Kidney Function', 'HbA1c & Fasting Glucose', 'Chest X-Ray & Abdomen USG', 'Physician & Nutrition Consult'],
      badge: 'Most Popular',
      color: 'border-emerald-500',
    },
    {
      title: 'Advanced Cardiac Protection Package',
      subtitle: 'Targeted cardiovascular evaluation for hypertension, stent history & chest discomfort.',
      price: '$199',
      testsCount: '62 Heart Specialty Tests',
      highlights: ['High-Sensitivity CRP', 'ECHO & Treadmill Stress Test', 'ECG & Lipid Sub-fractions', 'Senior Cardiologist Review'],
      badge: 'Heart Care',
      color: 'border-rose-500',
    },
    {
      title: 'Senior Citizen Golden Wellness Package',
      subtitle: 'Comprehensive screening for arthritis, bone density, renal health, and cardiac reserve.',
      price: '$249',
      testsCount: '75 Tests',
      highlights: ['DEXA Bone Mineral Density', 'Thyroid Profile (T3/T4/TSH)', 'Vitamin D3 & B12 Levels', 'Orthopedic & Geriatric Consult'],
      badge: 'Ages 60+',
      color: 'border-amber-500',
    },
    {
      title: 'Women’s Wellness & Hormonal Balance',
      subtitle: 'Dedicated screening for thyroid, breast wellness, anemia, and bone metabolism.',
      price: '$220',
      testsCount: '68 Targeted Tests',
      highlights: ['Pap Smear & Mammography', 'Hormonal Assay (FSH/LH/PRL)', 'Serum Iron & Ferritin', 'Gynecologist Consultation'],
      badge: 'Women Health',
      color: 'border-teal-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Preventative Health Packages</h1>
        <p className="text-sm text-slate-600 mt-1">
          Early diagnostic detection saves lives. Choose a pre-packaged clinical health checkup with home sample collection options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-2xl border-l-4 ${pkg.color} border-x border-b border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-6`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                    {pkg.badge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-2">{pkg.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-extrabold text-slate-900">{pkg.price}</div>
                  <div className="text-[10px] text-slate-500 font-semibold">{pkg.testsCount}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{pkg.subtitle}</p>

              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Key Package Coverage:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {pkg.highlights.map((h, hidx) => (
                    <div key={hidx} className="flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => openActionModal('new_appointment', { packageTitle: pkg.title })}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition shadow-sm cursor-pointer"
              >
                Book Package Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
