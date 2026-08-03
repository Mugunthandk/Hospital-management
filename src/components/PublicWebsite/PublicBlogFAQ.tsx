import React, { useState } from 'react';
import { HelpCircle, FileText, ChevronDown, ChevronUp, Mail, Send, MapPin, Phone } from 'lucide-react';

export const PublicBlogFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const faqs = [
    {
      q: 'How do I book an appointment with a specialist?',
      a: 'You can book an appointment online via our "Book Appointment" button, choose your preferred doctor and time slot, or call our 24/7 OPD desk at +1 (555) HEALTH-01.',
    },
    {
      q: 'What insurance providers does HealthFlow accept?',
      a: 'We partner with BlueCross Shield, Aetna, UnitedHealthcare, Cigna, Medicare, and over 40 major international insurance networks for direct cashless billing.',
    },
    {
      q: 'How do I access my lab and radiology test reports?',
      a: 'Reports are automatically published to your Patient Portal as soon as verified by our pathologists. You can view, download, or request an AI summary directly.',
    },
    {
      q: 'Does HealthFlow provide home sample collection for lab tests?',
      a: 'Yes, our phlebotomy team offers home sample collection. You can request it through our Lab & Pharmacy portal or by calling our central laboratory.',
    },
  ];

  const articles = [
    {
      title: 'Understanding Modern Coronary Stents & Cardiac Rehabilitation',
      date: 'Aug 01, 2026',
      author: 'Dr. Sarah Johnson, MD',
      category: 'Cardiology',
      excerpt: 'Learn about drug-eluting stents, post-angioplasty dietary precautions, and exercise milestones for long-term heart health.',
    },
    {
      title: 'Migraine Triggers & Neurological Interventions in 2026',
      date: 'Jul 28, 2026',
      author: 'Dr. Michael Chen, PhD',
      category: 'Neurology',
      excerpt: 'Exploring CGRP inhibitors, dietary migraine triggers, and stress-reduction protocols for chronic headache prevention.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* FAQ Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h1>
          <p className="text-sm text-slate-600 mt-1">Everything you need to know about appointments, insurance claims, and hospital services.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 text-sm font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-teal-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {openFaq === idx && (
                <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Health Articles */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Latest Health Insights & Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">{art.category}</span>
                <span className="text-slate-400">{art.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{art.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{art.excerpt}</p>
              <p className="text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">By {art.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form & Location Map */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-900">Get in Touch with HealthFlow</h3>
          <p className="text-xs text-slate-600">
            Have questions regarding medical services, insurance approvals, or international patient care? Fill out the form below.
          </p>

          {contactSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-semibold">
              Thank you! Your message has been sent to our patient care coordinator.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setContactSubmitted(true);
              }}
              className="space-y-3"
            >
              <input
                type="text"
                required
                placeholder="Your Full Name"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
              <input
                type="email"
                required
                placeholder="Your Email Address"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
              <textarea
                required
                rows={3}
                placeholder="How can we assist you?"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer flex items-center"
              >
                <Send className="w-3.5 h-3.5 mr-2" />
                Submit Message
              </button>
            </form>
          )}
        </div>

        <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Hospital Main Location</h4>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-teal-600 shrink-0" />
                123 Medical Plaza, Health City, HC 56789
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-teal-600 shrink-0" />
                +1 (555) HEALTH-01
              </p>
            </div>
          </div>

          <div className="bg-slate-200 rounded-xl h-48 flex items-center justify-center text-slate-500 font-mono text-xs border border-slate-300">
            [ Interactive Google Map View ]
          </div>
        </div>
      </div>
    </div>
  );
};
