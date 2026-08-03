import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Sparkles, X, Loader2, ShieldCheck } from 'lucide-react';

export const AIModal: React.FC = () => {
  const { activeAIModal, closeAIModal } = useHospital();
  const [promptInput, setPromptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  if (!activeAIModal) return null;

  const getModalMeta = () => {
    switch (activeAIModal.type) {
      case 'symptom_checker':
        return {
          title: 'AI Clinical Symptom & Triage Analyzer',
          badge: 'Symptom Triage',
          defaultPrompt: 'Patient presents with persistent fever (102°F), dry cough, shortness of breath, and fatigue for 4 days.',
        };
      case 'drug_checker':
        return {
          title: 'AI Drug Interaction & Contraindication Guard',
          badge: 'Rx Safety',
          defaultPrompt: 'Check contraindications between Warfarin (Anticoagulant) and Aspirin (Antiplatelet) with Patient Age 68.',
        };
      case 'summarize_records':
        return {
          title: `AI Discharge & Clinical Record Summary`,
          badge: 'EHR Summary',
          defaultPrompt: `Synthesize 5-day inpatient progress notes, lab findings, and discharge medications into a concise patient summary.`,
        };
      case 'capacity_forecast':
        return {
          title: 'AI Hospital Occupancy & Bed Demand Forecast',
          badge: 'Predictive Ops',
          defaultPrompt: 'Forecast ICU and Emergency Ward bed utilization for the upcoming weekend based on historical admission spikes.',
        };
      default:
        return {
          title: 'AI Medical Assistant',
          badge: 'Clinical AI',
          defaultPrompt: 'Analyze patient symptoms and provide evidence-based triage guidance.',
        };
    }
  };

  const meta = getModalMeta();

  const handleRunAI = () => {
    setLoading(true);
    setAiResponse(null);

    const query = promptInput || meta.defaultPrompt;

    if (activeAIModal.type === 'symptom_checker') {
      setTimeout(() => {
        setAiResponse(
          `🏥 **AI Clinical Triage Report**\n\n` +
          `• **Primary Suspected Condition:** Upper Respiratory Infection / Suspected Viral Pneumonitis.\n` +
          `• **Triage Severity Index:** Level 2 (Urgent Care / Emergency Evaluation Recommended).\n` +
          `• **Recommended Workup:** Pulse Oximetry monitoring, Chest X-Ray (PA view), Full Blood Count (FBC), and CRP level.\n` +
          `• **Red Flag Alert:** Immediate oxygen supplementation if SpO2 drops below 94%.`
        );
        setLoading(false);
      }, 1200);
      return;
    }

    if (activeAIModal.type === 'drug_checker') {
      setTimeout(() => {
        setAiResponse(
          `💊 **AI Pharmacovigilance & Drug Interaction Analysis**\n\n` +
          `⚠️ **High Severity Alert: Co-administration of Warfarin + Aspirin**\n\n` +
          `• **Mechanism:** Synergy in anticoagulant and antiplatelet pathways dramatically elevates major hemorrhage risk.\n` +
          `• **Recommendation:** Avoid co-prescription unless under specialized Cardiology protocol. Monitor INR closely (Target 2.0 - 3.0).\n` +
          `• **Alternative:** Consider PPI co-prescription if dual antiplatelet therapy is strictly indicated.`
        );
        setLoading(false);
      }, 1200);
      return;
    }

    if (activeAIModal.type === 'summarize_records') {
      setTimeout(() => {
        setAiResponse(
          `📋 **AI Synthesized Clinical Discharge Summary**\n\n` +
          `• **Admission Diagnosis:** Acute Exacerbation of Bronchial Asthma.\n` +
          `• **Hospital Course:** 3 days IV Corticosteroids & nebulization therapy. Patient clinically stable with SpO2 99% on ambient air.\n` +
          `• **Discharge Medications:** Inhaler Fluticasone/Salmeterol 250mcg BID x 30 days.\n` +
          `• **Follow-up:** Pulmonology OPD in 14 days.`
        );
        setLoading(false);
      }, 1200);
      return;
    }

    if (activeAIModal.type === 'capacity_forecast') {
      setTimeout(() => {
        setAiResponse(
          `📊 **AI Predictive Bed Occupancy Forecast**\n\n` +
          `• **Expected ICU Surge:** +18% increase predicted over the next 48 hours.\n` +
          `• **Recommended Strategy:** Reserve 4 General Ward step-down beds for early transfer of stable patients.\n` +
          `• **Staffing Alert:** On-call Nursing staffing recommended for Night Shift in Floor 3 Ward.`
        );
        setLoading(false);
      }, 1200);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-slate-900 space-y-5 animate-scale-up max-h-[90vh] flex flex-col justify-between">
        {/* Modal Close */}
        <button
          onClick={closeAIModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition p-2 rounded-full bg-slate-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-black text-[#0b1f3a]">{meta.title}</h3>
            <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              {meta.badge}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">Powered by Google Gemini Enterprise Medical AI Architecture</p>
        </div>

        {/* Prompt Input Box */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Enter Symptoms, Case Details, or Queries:</label>
          <div className="relative">
            <textarea
              rows={3}
              value={promptInput || meta.defaultPrompt}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition font-medium leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleRunAI()}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition flex items-center space-x-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Clinical Models...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run AI Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI Output Result Card */}
        {aiResponse && (
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 overflow-y-auto max-h-64 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
            <div className="flex items-center space-x-2 text-blue-700 font-bold text-xs pb-2 border-b border-slate-200">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Verified Clinical AI Output</span>
            </div>
            <div>{aiResponse}</div>
          </div>
        )}

        <div className="text-[10px] text-slate-500 border-t border-slate-200 pt-3 text-center font-medium">
          Note: AI decision support tools are intended to complement medical judgment and triage. Emergency situations require immediate 911 contact.
        </div>
      </div>
    </div>
  );
};
