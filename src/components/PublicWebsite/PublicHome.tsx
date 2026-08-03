import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Calendar,
  Search,
  PhoneCall,
  ShieldCheck,
  Award,
  Users,
  Clock,
  HeartPulse,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Activity,
  Bed,
  Ambulance,
  Pill,
  Microscope,
  Star,
  MapPin,
  ChevronRight,
  Shield,
  FileText,
  Mail,
  Send,
  QrCode,
  Brain,
  Bone,
  Baby,
  Heart,
  Bot,
  ChevronLeft,
  X,
  BookOpen,
  Tag,
  Eye,
  CheckCircle,
  Filter,
} from 'lucide-react';

interface PublicHomeProps {
  setPublicTab: (tab: string) => void;
  setViewMode: (mode: 'public' | 'portal') => void;
}

interface HealthArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Cardiology & Diet' | 'Diabetes & Lifestyle' | 'Pediatric Health' | 'Mental Wellness' | 'Preventive Medicine' | 'Orthopedics & Tech';
  author: string;
  authorTitle: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  img: string;
  summary: string;
  keyTakeaways: string[];
  fullContent: string[];
  healthyTips: string[];
}

const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'news-1',
    title: '5 Superfoods for Heart & Vascular Longevity',
    subtitle: 'Evidence-based nutritional strategies to protect your cardiovascular system',
    category: 'Cardiology & Diet',
    author: 'Dr. Sarah Johnson',
    authorTitle: 'Chief of Cardiology',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    date: 'July 28, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800',
    summary: 'Essential nutritional recommendations from our lead cardiology department to prevent arterial plaque, optimize blood pressure, and maintain healthy cholesterol levels.',
    keyTakeaways: [
      'Omega-3 fatty acids in wild salmon and walnuts actively reduce arterial inflammation.',
      'Antioxidants (anthocyanins) in dark berries lower systolic blood pressure by 8%.',
      'Dietary nitrates in spinach and kale improve endothelial vascular flexibility.',
    ],
    fullContent: [
      'Cardiovascular health is deeply intertwined with daily dietary choices. According to recent clinical trials conducted by the HealthFlow Cardiology Institute, integrating nutrient-dense superfoods into your routine can reduce long-term coronary heart disease risks by up to 34%.',
      'Focusing on unrefined, whole plant foods rich in soluble fiber helps clear LDL cholesterol before it deposits in arterial walls. Additionally, reducing sodium intake while bolstering potassium levels via avocados and bananas helps stabilize blood pressure naturally.',
      'Our clinical cardiologists recommend incorporating at least two servings of fatty fish weekly or plant-based ALA sources like chia seeds and flaxseeds.',
    ],
    healthyTips: [
      'Consume 1 cup of fresh blueberries or blackberries daily for vascular repair.',
      'Replace cooking butter with cold-pressed Extra Virgin Olive Oil.',
      'Aim for 30 grams of dietary fiber every day from whole oats and legumes.',
    ],
  },
  {
    id: 'news-2',
    title: 'Managing Type-2 Diabetes: Daily Diet, Blood Sugar & Exercise',
    subtitle: 'A practical medical roadmap to stable glycemia and metabolic health',
    category: 'Diabetes & Lifestyle',
    author: 'Dr. Sophia Ramirez',
    authorTitle: 'Senior Endocrinologist',
    authorAvatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
    date: 'July 22, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    summary: 'A step-by-step metabolic guide on meal planning, continuous glucose monitoring (CGM), post-meal walking routines, and insulin sensitivity enhancement.',
    keyTakeaways: [
      'Pairing complex carbohydrates with lean protein prevents rapid glucose spikes.',
      'A 10-minute walk after lunch and dinner enhances postprandial glucose uptake.',
      'Hydration keeps kidneys active in filtering excess blood glucose naturally.',
    ],
    fullContent: [
      'Type-2 Diabetes management has evolved significantly beyond restrictive dieting. Modern endocrinology emphasizes metabolic flexibility—training the body to burn glucose efficiently through balanced plate design and light physical movement.',
      'By utilizing Continuous Glucose Monitoring (CGM) sensors, patients can observe real-time blood sugar trends and identify personal trigger foods. This empowers patients to make informed dietary adjustments without guesswork.',
      'Strength training twice a week increases skeletal muscle mass, which acts as a primary sink for circulating blood glucose independent of high insulin levels.',
    ],
    healthyTips: [
      'Follow the "Plate Method": 50% non-starchy veggies, 25% lean protein, 25% complex grains.',
      'Drink 8-10 glasses of water daily to prevent dehydration-induced glucose spikes.',
      'Take a brisk 10-minute walk within 30 minutes of finishing dinner.',
    ],
  },
  {
    id: 'news-3',
    title: 'Robotic Joint Replacement: Faster Recovery & Less Pain',
    subtitle: 'How 3D robotic guidance transforms knee and hip arthroplasty outcomes',
    category: 'Orthopedics & Tech',
    author: 'Dr. James Wilson',
    authorTitle: 'Joint Replacement Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    date: 'July 15, 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    summary: 'Explore how sub-millimeter robotic precision in total knee and hip replacements minimizes soft tissue trauma, allowing patients to walk within 24 hours of surgery.',
    keyTakeaways: [
      '3D CT-scan patient modeling allows custom implant placement tailored to your anatomy.',
      'Sparing healthy ligaments leads to a natural-feeling knee joint after surgery.',
      'Hospital stays are reduced from 5 days down to 24-48 hours with rapid rehab protocols.',
    ],
    fullContent: [
      'Orthopedic joint replacement surgery has reached unprecedented levels of accuracy thanks to robotic-assisted surgical arms. Unlike conventional manual alignment, robotic navigation provides real-time intraoperative feedback on soft tissue tension and joint mechanics.',
      'Because precision cuts preserve healthy bone stock and surrounding ligaments, post-operative inflammation and pain are drastically reduced.',
      'Our physical therapy team initiates gentle weight-bearing exercises on the very afternoon of surgery, helping patients return to active hobbies like golf, cycling, and hiking with full confidence.',
    ],
    healthyTips: [
      'Maintain quadriceps strength through daily straight-leg raises before planned joint surgery.',
      'Ensure adequate Vitamin D3 (2000 IU/day) and Calcium intake for optimal bone density.',
      'Engage in low-impact swimming or stationary cycling to preserve joint lubrication.',
    ],
  },
  {
    id: 'news-4',
    title: 'Childhood Immunity & Growth: Essential Guidelines',
    subtitle: 'Nurturing robust immune defenses in toddlers and young children',
    category: 'Pediatric Health',
    author: 'Dr. Elena Rodriguez',
    authorTitle: 'Senior Pediatrician',
    authorAvatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400',
    date: 'July 10, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800',
    summary: 'Pediatric guidelines on essential vaccinations, gut microbiota building, balanced school lunches, and adequate sleep for growing children.',
    keyTakeaways: [
      '70% of a child immune system resides in gut lymph tissue nurtured by fiber & probiotics.',
      'Children aged 3-10 require 10 to 11 hours of uninterrupted nocturnal sleep.',
      'Outdoor sunshine play stimulates natural Vitamin D synthesis essential for immune T-cells.',
    ],
    fullContent: [
      'A child developing immune system requires exposure to healthy nutrition, regular physical activity, and timely pediatric vaccinations. Ensuring children consume colorful fruits and fermented foods like yogurt supports healthy gut flora.',
      'Avoiding excessive refined sugar is critical, as sugar spikes can temporarily suppress white blood cell phagocytic activity for up to 5 hours post-consumption.',
      'Regular pediatric wellness checkups enable early tracking of growth percentiles, developmental milestones, and routine allergy screenings.',
    ],
    healthyTips: [
      'Offer colorful snack plates with carrot sticks, berries, and almond butter.',
      'Establish a calm 8:30 PM bedtime routine free of blue-light screen devices.',
      'Keep your child updated on national pediatric vaccination schedules.',
    ],
  },
  {
    id: 'news-5',
    title: 'Mindfulness & Sleep Hygiene in High-Pressure Careers',
    subtitle: 'Protecting neural wellness and preventing burnout in demanding work environments',
    category: 'Mental Wellness',
    author: 'Dr. Michael Chen',
    authorTitle: 'Chief Neurosurgeon',
    authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    date: 'June 30, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    summary: 'Neurological strategies to de-excite the sympathetic nervous system, reset circadian rhythms, and prevent chronic fatigue and cognitive brain fog.',
    keyTakeaways: [
      'Box breathing (4s inhale, 4s hold, 4s exhale, 4s hold) immediately lowers heart rate.',
      'Discontinuing screen exposure 60 minutes before bed enhances melatonin secretion.',
      'Magnesium Glycinate supplementation promotes deep slow-wave restorative sleep.',
    ],
    fullContent: [
      'Chronic high-stress environments trigger persistent cortisol elevation, which over time can impair hippocampal neuroplasticity and impair executive decision-making. Neurologists recommend structured cognitive reset breaks during intense workdays.',
      'Sleep is the brain ultimate glymphatic cleaning cycle—removing metabolic waste products like beta-amyloid proteins that accumulate during waking hours.',
      'Prioritizing 7 to 8 hours of quality restorative sleep per night is not a luxury; it is a vital neuro-protective medical necessity.',
    ],
    healthyTips: [
      'Practice 5 minutes of morning sunlight exposure within 30 minutes of waking.',
      'Avoid caffeine after 2:00 PM to prevent adenosine receptor blockade during sleep onset.',
      'Keep bedroom temperatures cool (around 65°F to 68°F / 18°C to 20°C) for optimal sleep.',
    ],
  },
  {
    id: 'news-6',
    title: 'Essential Annual Health Screenings Every Adult Over 30 Needs',
    subtitle: 'Preventive diagnostic panels that catch silent health conditions early',
    category: 'Preventive Medicine',
    author: "Dr. David K. O'Connor",
    authorTitle: 'Gastroenterologist & Preventive Care',
    authorAvatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    date: 'June 18, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    summary: 'A comprehensive checklist of annual blood panels, blood pressure monitoring, lipid profiling, and screening benchmarks to protect long-term wellness.',
    keyTakeaways: [
      'Fasting blood lipid profile & HbA1c tests reveal hidden metabolic risks before symptoms show.',
      'Annual blood pressure checks prevent silent hypertensive damage to kidneys and retina.',
      'Colorectal screening guidelines recommend starting routine checks at age 45.',
    ],
    fullContent: [
      'Preventive medicine is the cornerstone of long-term longevity. Many common chronic conditions—including early hypertension, fatty liver disease, and high cholesterol—develop quietly without overt pain or discomfort.',
      'An annual OPD clinical screening visit gives your primary physician baseline data to track small physiological shifts year over year.',
      'Early lifestyle adjustments based on annual laboratory findings can successfully reverse early pre-diabetic or pre-hypertensive markers without reliance on long-term medications.',
    ],
    healthyTips: [
      'Schedule your annual physical exam on or near your birthday month for easy tracking.',
      'Maintain a written family medical history log to share with your physician.',
      'Keep copies of all lab diagnostic reports in your HealthFlow Patient Portal digital wallet.',
    ],
  },
];

export interface PatientTestimonial {
  id: string;
  patientName: string;
  age: number;
  location: string;
  avatar: string;
  category: 'Cardiac Care' | 'Orthopedics & Spine' | 'Maternity & Pediatrics' | 'Nephrology & Dialysis' | 'Ophthalmology & Eye' | 'OPD & Diagnostics';
  treatmentTitle: string;
  doctorName: string;
  branchName: string;
  rating: number;
  date: string;
  badgeTag: string;
  shortQuote: string;
  fullStory: string;
}

const PATIENT_TESTIMONIALS: PatientTestimonial[] = [
  {
    id: 'testi-1',
    patientName: 'Elena Rostova',
    age: 44,
    location: 'Health City',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    category: 'Cardiac Care',
    treatmentTitle: 'Emergency Cardiac Angioplasty & Stent Placement',
    doctorName: 'Dr. Sarah Johnson',
    branchName: 'Main Campus Super-Specialty',
    rating: 5,
    date: 'July 2026',
    badgeTag: 'Life-Saving Cardiac Care',
    shortQuote: 'The emergency cardiac response team saved my life. Dr. Johnson and her ICU staff treated me with world-class medical expertise.',
    fullStory: 'I experienced acute chest pain at 2:00 AM. The emergency mobile ICU ambulance arrived in under 8 minutes. Dr. Sarah Johnson performed a successful emergency angioplasty within the critical golden hour. Today, 3 weeks later, I am back to work feeling healthier than ever. The hospital facilities and cardiac rehab team are truly outstanding!',
  },
  {
    id: 'testi-2',
    patientName: 'Marcus Sterling',
    age: 59,
    location: 'Tech Corridor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    category: 'Orthopedics & Spine',
    treatmentTitle: 'Robotic Total Knee Replacement Surgery',
    doctorName: 'Dr. Arthur Pendelton',
    branchName: 'Main Campus Super-Specialty',
    rating: 5,
    date: 'June 2026',
    badgeTag: 'Pain-Free Recovery in 48h',
    shortQuote: 'After 6 years of severe osteoarthritis pain, I walked completely unassisted 48 hours post-surgery thanks to robotic navigation!',
    fullStory: 'I was terrified of knee replacement surgery due to past horror stories from friends. Dr. Pendelton explained their Da Vinci robotic orthopedics suite which minimizes tissue trauma. The procedure went seamlessly, and the dedicated physical therapy team had me walking down stairs pain-free within 2 days. Highly recommended!',
  },
  {
    id: 'testi-3',
    patientName: 'Priya & Baby Anya',
    age: 32,
    location: 'North Suburbs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    category: 'Maternity & Pediatrics',
    treatmentTitle: 'High-Risk Pregnancy Delivery & Level-3 NICU Support',
    doctorName: 'Dr. Emily Zhang',
    branchName: 'Main Campus Super-Specialty',
    rating: 5,
    date: 'May 2026',
    badgeTag: 'High-Risk Delivery Success',
    shortQuote: 'Dr. Zhang and the 24/7 NICU nursing team delivered baby Anya safely at 33 weeks. We couldn\'t be more grateful.',
    fullStory: 'When pre-eclampsia struck during my 33rd week of pregnancy, Dr. Emily Zhang acted with incredible speed and reassurance. Our daughter Anya spent 12 days in the Level-3 NICU. The neonatal nurses provided round-the-clock updates, skin-to-skin kangaroo care guidance, and compassionate emotional support for our family.',
  },
  {
    id: 'testi-4',
    patientName: 'Robert Vance',
    age: 63,
    location: 'North District',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    category: 'Nephrology & Dialysis',
    treatmentTitle: 'Chronic Renal Hemodialysis & Dietary Rehabilitation',
    doctorName: "Dr. David K. O'Connor",
    branchName: 'North Campus Specialist Hub',
    rating: 5,
    date: 'July 2026',
    badgeTag: 'Comfortable Dialysis Suite',
    shortQuote: 'The North Campus Dialysis Hub is clean, modern, and incredibly peaceful. Dr. O\'Connor fine-tuned my treatment perfectly.',
    fullStory: 'Undergoing tri-weekly hemodialysis can be exhausting, but the staff at the North Campus hub make it feel like home. The reclining heated massage chairs, private entertainment consoles, and attentive renal nurses make every session seamless. My energy levels and kidney metrics have stabilized significantly.',
  },
  {
    id: 'testi-5',
    patientName: 'Hannah Brooks',
    age: 28,
    location: 'Westside',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    category: 'Ophthalmology & Eye',
    treatmentTitle: 'Blade-Free Femto-LASIK Vision Correction',
    doctorName: 'Dr. Maya Lin',
    branchName: 'West Wing Diagnostic & Eye Clinic',
    rating: 5,
    date: 'June 2026',
    badgeTag: '20/15 Vision Corrected',
    shortQuote: 'I woke up the morning after my Femto-LASIK procedure with 20/15 HD vision! The entire laser treatment took less than 10 minutes.',
    fullStory: 'I had been wearing high-prescription glasses since age 10. Dr. Maya Lin performed corneal mapping at the West Wing Eye Clinic and guided me through the custom Femto-LASIK laser process. The procedure was totally pain-free and took under 10 minutes. Throwing away my thick glasses was the best decision of my life!',
  },
  {
    id: 'testi-6',
    patientName: 'Gregory Alvarez',
    age: 51,
    location: 'East Park',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300',
    category: 'OPD & Diagnostics',
    treatmentTitle: 'Endoscopic Gastro Screening & QR Bill Payment',
    doctorName: 'Dr. Arthur Vance',
    branchName: 'North Campus Specialist Hub',
    rating: 5,
    date: 'July 2026',
    badgeTag: 'Seamless OPD & QR Billing',
    shortQuote: 'Booking online, receiving digital prescriptions, and paying OPD bills via QR code was incredibly smooth and fast.',
    fullStory: 'I booked my consultation with Dr. Vance online, checked in using the self-service kiosk, and had my diagnostic ultrasound completed in less than 45 minutes. Paying the OPD bill was instantaneous using their UPI QR code portal. Truly a 21st-century modern digital hospital experience!',
  },
];

export const PublicHome: React.FC<PublicHomeProps> = ({ setPublicTab, setViewMode }) => {
  const { doctors, branches, openAIModal, openActionModal } = useHospital();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('All');

  const [selectedDocSpecialty, setSelectedDocSpecialty] = useState<string>('All');
  const [selectedDocForModal, setSelectedDocForModal] = useState<any | null>(null);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('All');
  const [selectedNewsModal, setSelectedNewsModal] = useState<HealthArticle | null>(null);
  const [selectedTestimonialCategory, setSelectedTestimonialCategory] = useState<string>('All');
  const [selectedTestimonialModal, setSelectedTestimonialModal] = useState<PatientTestimonial | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPublicTab('doctors');
  };

  const safeDoctors = doctors || [];
  const doctorSpecialties = ['All', ...Array.from(new Set(safeDoctors.map((d) => d.specialty)))];

  const filteredDoctorsOnHome = safeDoctors.filter((doc) => {
    if (selectedDocSpecialty === 'All') return true;
    return doc.specialty.toLowerCase() === selectedDocSpecialty.toLowerCase();
  });

  const newsCategories = ['All', 'Cardiology & Diet', 'Diabetes & Lifestyle', 'Pediatric Health', 'Mental Wellness', 'Preventive Medicine', 'Orthopedics & Tech'];

  const filteredNews = HEALTH_ARTICLES.filter((article) => {
    if (selectedNewsCategory === 'All') return true;
    return article.category === selectedNewsCategory;
  });

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative bg-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                <span className="text-[#0b1f3a]">World-Class Care,</span> <br />
                <span className="text-[#00796b]">Closer to You.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Experience medical excellence with our team of board-certified specialists. We combine compassionate care with the latest medical technology for your family's health.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setPublicTab('booking')}
                  className="bg-[#0b1f3a] hover:bg-[#122b4f] text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer text-sm flex items-center space-x-2.5 border border-slate-700/50"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Book OPD Clinical Appointment</span>
                </button>

                <button
                  onClick={() => setPublicTab('doctors')}
                  className="bg-white hover:bg-slate-50 text-[#0b1f3a] border border-slate-300 font-extrabold px-6 py-3.5 rounded-2xl transition cursor-pointer text-sm shadow-sm flex items-center space-x-2"
                >
                  <Stethoscope className="w-4 h-4 text-[#00796b]" />
                  <span>Explore Doctors</span>
                </button>

                <button
                  onClick={() => setPublicTab('bill_pay')}
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold px-6 py-3.5 rounded-2xl transition cursor-pointer text-sm shadow-sm flex items-center space-x-2"
                >
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>Pay OPD Bill & QR</span>
                </button>
              </div>

              {/* Quick Info Badges */}
              <div className="pt-6 border-t border-slate-100 flex items-center space-x-8 text-xs font-semibold text-slate-500">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>JCI Accredited</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-slate-400" />
                  <span>Top Medical Center 2023</span>
                </div>
              </div>
            </div>

            {/* Right Column: Doctor Hero Image with Floating Card */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200"
                    alt="Dr. Sarah Johnson, MD"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                  {/* Doctor Name Tag Overlay */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs flex items-center space-x-2 border border-slate-700/60 shadow">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-semibold text-slate-100">Dr. Sarah Johnson, MD</span>
                  </div>
                </div>

                {/* Floating Overlay Badge 1: HAPPY PATIENTS 150,000+ */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#0b1f3a] text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">HAPPY PATIENTS</p>
                    <p className="text-xl font-black text-[#0b1f3a]">150,000+</p>
                  </div>
                </div>

                {/* Floating Overlay Badge 2: Top Specialists Stack */}
                <div className="absolute -top-4 -right-4 hidden sm:flex bg-white/95 backdrop-blur-md p-2.5 px-3.5 rounded-2xl shadow-xl border border-slate-100 items-center space-x-3">
                  <div className="flex -space-x-2.5 overflow-hidden">
                    {doctors.slice(0, 4).map((doc, idx) => (
                      <img
                        key={idx}
                        src={doc.avatar}
                        alt={doc.name}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-[#0b1f3a]">50+ Specialists</p>
                    <p className="text-[10px] text-emerald-600 font-bold">● Available Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Search Bar (Overlapping) */}
          <div className="mt-14 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-5 max-w-4xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Find a doctor or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs text-slate-800 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#00796b]"
                />
              </div>

              <div className="md:col-span-4 relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-xs text-slate-800 font-medium pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#00796b]"
                >
                  <option value="All">All Hospital Campuses ({branches.length})</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <button
                  type="submit"
                  className="w-full bg-[#00796b] hover:bg-[#005a50] text-white font-bold text-xs py-3.5 rounded-xl transition shadow-md cursor-pointer flex items-center justify-center space-x-1"
                >
                  <span>Search Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Our Specialties Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-[#0b1f3a]">Our Specialties</h2>
          <p className="text-sm text-slate-600">
            Comprehensive medical services for every stage of life backed by leading technology.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Cardiology',
              desc: 'Advanced heart care, 3D cardiac diagnostics, and minimally invasive cardiac procedures.',
              icon: HeartPulse,
              color: 'text-blue-600 bg-blue-50',
            },
            {
              title: 'Orthopedics',
              desc: 'Expert care for bones, joints, spine surgery, and sports medicine rehabilitation.',
              icon: Bone,
              color: 'text-sky-600 bg-sky-50',
            },
            {
              title: 'Pediatrics',
              desc: 'Gentle, specialized medical care for infants, children, and adolescents.',
              icon: Baby,
              color: 'text-amber-600 bg-amber-50',
            },
            {
              title: 'Neurology',
              desc: 'Diagnosis and surgical treatment for brain, nerve, and spinal disorders.',
              icon: Brain,
              color: 'text-purple-600 bg-purple-50',
            },
          ].map((spec, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
              onClick={() => setPublicTab('departments')}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl ${spec.color} flex items-center justify-center mb-4`}>
                  <spec.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                  {spec.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{spec.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Doctors & Specialists Section (Doctor Faces Showcase) */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#00796b] uppercase tracking-widest flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                BOARD-CERTIFIED PHYSICIANS & SPECIALISTS
              </span>
              <h2 className="text-3xl font-black text-[#0b1f3a] mt-1">
                Meet Our Top Doctors & Clinical Specialists
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Consult with world-class medical experts, surgeons, and specialists available for direct OPD clinical consultation.
              </p>
            </div>
            <button
              onClick={() => setPublicTab('doctors')}
              className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-[#00796b] hover:text-[#005a50] bg-teal-50 hover:bg-teal-100/80 px-5 py-3 rounded-xl transition cursor-pointer border border-teal-200/80 shadow-sm self-start md:self-auto"
            >
              <span>View Full Directory ({doctors.length} Doctors)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Specialty Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 flex items-center mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Specialty:
            </span>
            {doctorSpecialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedDocSpecialty(spec)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition cursor-pointer shrink-0 border ${
                  selectedDocSpecialty === spec
                    ? 'bg-[#0b1f3a] text-white border-[#0b1f3a] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Doctor Grid (Displaying filtered list) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctorsOnHome.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Doctor Face Image Container */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedDocForModal(doc)}>
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

                    {/* Status Badge */}
                    <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>{doc.status === 'in_consultation' ? 'In Consultation' : 'Available OPD'}</span>
                    </span>

                    {/* Specialty & Room Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-white/95 backdrop-blur-md text-[#0b1f3a] text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">
                        {doc.specialty}
                      </span>
                      <span className="bg-slate-900/80 backdrop-blur-md text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700">
                        {doc.roomNumber}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-400 text-[11px] font-normal">({doc.reviewCount} reviews)</span>
                      </div>
                      <span className="text-xs font-black text-[#00796b] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200/60">
                        ${doc.consultationFee} Fee
                      </span>
                    </div>

                    <div>
                      <h3
                        onClick={() => setSelectedDocForModal(doc)}
                        className="text-base font-extrabold text-[#0b1f3a] group-hover:text-[#00796b] transition cursor-pointer"
                      >
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 mt-0.5">{doc.title}</p>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed pt-2 border-t border-slate-100">
                      <strong>{doc.qualification}</strong> • {doc.experienceYears}+ years exp.
                    </p>

                    {/* Available Days Mini Pills */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {(doc.availableDays || []).slice(0, 4).map((day: string) => (
                        <span key={day} className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {day.slice(0, 3)}
                        </span>
                      ))}
                      {(doc.availableDays?.length || 0) > 4 && (
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-400 px-1 py-0.5 rounded">
                          +{(doc.availableDays?.length || 0) - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 space-y-2">
                  <button
                    onClick={() => setPublicTab('booking')}
                    className="w-full bg-[#0b1f3a] hover:bg-[#00796b] text-white text-xs font-bold py-3 rounded-xl transition shadow-sm cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Book OPD Clinical Appointment</span>
                  </button>

                  <button
                    onClick={() => setSelectedDocForModal(doc)}
                    className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold py-1.5 rounded-lg border border-slate-200 transition cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3 h-3 text-slate-500" />
                    <span>View Profile & Schedule</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Patients Trust HealthFlow (Excellence in Healthcare) */}
      <section className="bg-slate-100/80 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-slate-300 relative">
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
                  alt="Robotic Surgery System at HealthFlow"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                  Tech Enabled
                </span>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  EXCELLENCE IN HEALTHCARE
                </span>
                <h2 className="text-3xl font-extrabold text-[#0b1f3a] mt-1">Why Patients Trust HealthFlow</h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Advanced Technology</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      State-of-the-art diagnostic tools and robotic surgical systems for faster, safer recovery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">24/7 Expert Care</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Board-certified emergency physicians and critical care specialists available around the clock.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">National Specialists</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      A world-class multidisciplinary team of experienced doctors covering 40+ medical specialties.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPublicTab('departments')}
                className="bg-[#0b1f3a] hover:bg-[#122b4f] text-white font-bold px-6 py-3 rounded-xl text-xs shadow transition cursor-pointer"
              >
                Learn About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Testimonials & Recovery Stories Section */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>VERIFIED PATIENT RECOVERY STORIES</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0b1f3a]">
                Voices of Care & Patient Testimonials
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Read authentic recovery stories, clinical experiences, and feedback from patients treated across our multi-branch hospital network.
              </p>
            </div>

            {/* Rating Highlight Box */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4 shrink-0">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center">
                <span className="text-2xl font-black text-amber-600 block leading-none">4.9</span>
                <span className="text-[10px] font-bold text-amber-700 uppercase">out of 5.0</span>
              </div>
              <div>
                <div className="flex text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-extrabold text-slate-900">3,480+ Verified Patients</p>
                <p className="text-[11px] text-slate-500 font-medium">99.4% Clinical Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Cardiac Care', 'Orthopedics & Spine', 'Maternity & Pediatrics', 'Nephrology & Dialysis', 'Ophthalmology & Eye', 'OPD & Diagnostics'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTestimonialCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shrink-0 border ${
                  selectedTestimonialCategory === cat
                    ? 'bg-[#0b1f3a] text-white border-[#0b1f3a] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATIENT_TESTIMONIALS.filter((t) => selectedTestimonialCategory === 'All' || t.category === selectedTestimonialCategory).map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group relative"
              >
                {/* Top Badge & Rating */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-200/80 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{testimonial.badgeTag}</span>
                    </span>

                    <div className="flex text-amber-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Treatment Department & Branch info */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px]">
                    <span className="font-extrabold text-[#0b1f3a] block">{testimonial.treatmentTitle}</span>
                    <span className="text-slate-500 font-medium">Under {testimonial.doctorName} • {testimonial.branchName}</span>
                  </div>

                  {/* Feedback Quote */}
                  <p className="text-xs text-slate-700 leading-relaxed italic font-medium">
                    "{testimonial.shortQuote}"
                  </p>
                </div>

                {/* Patient Profile Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.patientName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/30 shadow-sm shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-black text-slate-900 flex items-center gap-1">
                        <span>{testimonial.patientName}</span>
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Age {testimonial.age} • {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTestimonialModal(testimonial)}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition cursor-pointer border border-blue-200/60 shrink-0"
                  >
                    Read Story
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health News & Wellness Articles Section */}
      <section className="bg-slate-100/90 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                MEDICAL INSIGHTS & WELLNESS GUIDES
              </span>
              <h2 className="text-3xl font-black text-[#0b1f3a] mt-1">Latest Clinical Health News & Articles</h2>
              <p className="text-sm text-slate-600 mt-1">
                Evidence-based medical advice, preventive nutrition, and healthy lifestyle tips curated by HealthFlow physicians.
              </p>
            </div>
            <button
              onClick={() => setPublicTab('faq')}
              className="text-xs font-extrabold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition cursor-pointer border border-blue-200/60 self-start md:self-auto flex items-center"
            >
              <span>Explore All Articles</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 flex items-center mr-1 shrink-0">
              <Tag className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Category:
            </span>
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedNewsCategory(cat)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition cursor-pointer shrink-0 border ${
                  selectedNewsCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <div
                key={news.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-200 cursor-pointer" onClick={() => setSelectedNewsModal(news)}>
                    <img
                      src={news.img}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-blue-700 text-[10px] font-extrabold px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">
                      {news.category}
                    </span>

                    <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-slate-200 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{news.readTime}</span>
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-semibold">
                      <span>{news.date}</span>
                      <span>•</span>
                      <span className="text-slate-600 font-bold">{news.author}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedNewsModal(news)}
                      className="text-base font-extrabold text-[#0b1f3a] group-hover:text-blue-600 transition cursor-pointer leading-snug"
                    >
                      {news.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{news.summary}</p>

                    {/* Key Takeaways Preview */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider block">Key Medical Note:</span>
                      <p className="text-[11px] text-slate-700 font-medium line-clamp-1">
                        ✓ {news.keyTakeaways[0]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedNewsModal(news)}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-extrabold py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center space-x-1 border border-blue-200/80"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Read Full Health Article</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Quick Profile Modal */}
      {selectedDocForModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-6 p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedDocForModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
              <img
                src={selectedDocForModal.avatar}
                alt={selectedDocForModal.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-slate-200 shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  {selectedDocForModal.specialty} Specialist
                </span>
                <h3 className="text-xl font-black text-[#0b1f3a]">{selectedDocForModal.name}</h3>
                <p className="text-xs font-bold text-slate-600">{selectedDocForModal.title}</p>
                <p className="text-xs text-slate-500 font-medium">{selectedDocForModal.qualification}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-3 pt-1 text-xs">
                  <span className="font-bold text-amber-500 flex items-center">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    {selectedDocForModal.rating} ({selectedDocForModal.reviewCount})
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="font-bold text-slate-700">{selectedDocForModal.experienceYears}+ Yrs Experience</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">Doctor Biography & Expertise</h4>
                <p className="leading-relaxed text-slate-600">{selectedDocForModal.bio}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Consultation Fee</span>
                  <p className="font-extrabold text-[#00796b] text-base">${selectedDocForModal.consultationFee}.00</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">OPD Consultation Desk</span>
                  <p className="font-extrabold text-slate-900 text-sm font-mono">{selectedDocForModal.roomNumber}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">OPD Available Weekly Slots</h4>
              <div className="flex flex-wrap gap-2">
                {(selectedDocForModal.availableDays || []).map((day: string) => (
                  <span key={day} className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">
                    {day}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setSelectedDocForModal(null);
                  setPublicTab('booking');
                }}
                className="w-full bg-[#0b1f3a] hover:bg-[#00796b] text-white font-black py-3.5 rounded-xl transition shadow text-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Book OPD Clinical Appointment Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Health Article Reader Modal */}
      {selectedNewsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative space-y-6">
            <button
              onClick={() => setSelectedNewsModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedNewsModal.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold">• {selectedNewsModal.readTime}</span>
              </div>
              <h2 className="text-2xl font-black text-[#0b1f3a] leading-snug">{selectedNewsModal.title}</h2>
              <p className="text-xs text-slate-500 font-medium italic">{selectedNewsModal.subtitle}</p>
            </div>

            {/* Banner Image */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
              <img
                src={selectedNewsModal.img}
                alt={selectedNewsModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800';
                }}
              />
            </div>

            {/* Author Doctor Card */}
            <div className="flex items-center space-x-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <img
                src={selectedNewsModal.authorAvatar}
                alt={selectedNewsModal.author}
                className="w-11 h-11 rounded-full object-cover border border-slate-300"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">{selectedNewsModal.author}</h4>
                <p className="text-[11px] text-slate-500">{selectedNewsModal.authorTitle} • HealthFlow Medical Board</p>
              </div>
            </div>

            {/* Key Medical Takeaways */}
            <div className="bg-teal-50/70 p-4 rounded-2xl border border-teal-200/80 space-y-2">
              <h4 className="font-extrabold text-xs text-[#00796b] uppercase tracking-wider flex items-center">
                <CheckCircle className="w-4 h-4 mr-1.5 text-teal-600" />
                Key Clinical Takeaways
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {(selectedNewsModal.keyTakeaways || []).map((takeaway, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-teal-600 font-bold mr-2">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {(selectedNewsModal.fullContent || []).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Healthy Daily Tips Box */}
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 space-y-2">
              <h4 className="font-extrabold text-xs text-amber-900 uppercase tracking-wider flex items-center">
                <Sparkles className="w-4 h-4 mr-1.5 text-amber-600" />
                Recommended Healthy Habits
              </h4>
              <div className="space-y-1.5 text-xs text-amber-950">
                {(selectedNewsModal.healthyTips || []).map((tip, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-white/80 p-2 rounded-lg border border-amber-200/50">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setSelectedNewsModal(null);
                  setPublicTab('booking');
                }}
                className="flex-1 bg-[#0b1f3a] hover:bg-[#00796b] text-white text-xs font-bold py-3.5 rounded-xl transition shadow cursor-pointer flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Book OPD Consultation With Specialist</span>
              </button>
              <button
                onClick={() => setSelectedNewsModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3.5 px-6 rounded-xl transition cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Testimonial Detailed Story Modal */}
      {selectedTestimonialModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedTestimonialModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
              <img
                src={selectedTestimonialModal.avatar}
                alt={selectedTestimonialModal.patientName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Patient Story
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">{selectedTestimonialModal.date}</span>
                </div>
                <h3 className="text-xl font-black text-[#0b1f3a]">{selectedTestimonialModal.patientName}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Age {selectedTestimonialModal.age} • Patient from {selectedTestimonialModal.location}
                </p>

                <div className="flex text-amber-400 pt-1 justify-center sm:justify-start">
                  {[...Array(selectedTestimonialModal.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Treatment Summary Pill */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Clinical Treatment & Facility</span>
              <p className="font-extrabold text-[#0b1f3a] text-sm">{selectedTestimonialModal.treatmentTitle}</p>
              <p className="text-xs text-slate-600">
                Attending Physician: <strong className="text-emerald-700">{selectedTestimonialModal.doctorName}</strong> at <strong className="text-slate-800">{selectedTestimonialModal.branchName}</strong>
              </p>
            </div>

            {/* Detailed Story Quote */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Full Recovery Experience & Patient Words</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 italic">
                "{selectedTestimonialModal.fullStory}"
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setSelectedTestimonialModal(null);
                  setPublicTab('booking');
                }}
                className="flex-1 bg-[#0b1f3a] hover:bg-[#00796b] text-white text-xs font-bold py-3.5 rounded-xl transition shadow cursor-pointer flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Book Appointment With {selectedTestimonialModal.doctorName}</span>
              </button>
              <button
                onClick={() => setSelectedTestimonialModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3.5 px-6 rounded-xl transition cursor-pointer"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
