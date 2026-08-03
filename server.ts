import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString(), aiEnabled: !!ai });
});

// AI Symptom Checker & Triage
app.post("/api/ai/symptom-checker", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured on server." });
    }
    const { symptoms, age, gender, duration, severity, history } = req.body;

    const prompt = `Analyze the following patient presentation as an enterprise medical triage assistant:
- Symptoms: ${symptoms}
- Patient Age: ${age || 'Not specified'}
- Gender: ${gender || 'Not specified'}
- Duration: ${duration || 'Not specified'}
- Severity (1-10): ${severity || 'Not specified'}
- Medical History: ${history || 'None reported'}

Provide a structured clinical triage assessment in JSON format with:
1. triageLevel: One of "Emergency", "Urgent", "Routine", "Self-Care"
2. triageColor: Color code ("red", "orange", "yellow", "green")
3. summary: Concise 2-3 sentence clinical summary.
4. potentialConditions: Array of 3 possible differential diagnoses with confidence percentage and explanation.
5. recommendedSpecialist: The specific department/doctor specialty to consult.
6. immediateActions: Array of 3-4 recommended first-aid or immediate precautions.
7. questionsForDoctor: Array of 3 relevant questions the patient should ask their physician.
8. redFlags: Array of critical warning signs that mandate immediate ER visit.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are HealthFlow AI Clinical Triage System. Return strictly JSON formatted medical triage evaluations. Always include standard disclaimer that this is AI support, not definitive medical diagnosis.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            triageLevel: { type: Type.STRING },
            triageColor: { type: Type.STRING },
            summary: { type: Type.STRING },
            potentialConditions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  condition: { type: Type.STRING },
                  probability: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            recommendedSpecialist: { type: Type.STRING },
            immediateActions: { type: Type.ARRAY, items: { type: Type.STRING } },
            questionsForDoctor: { type: Type.ARRAY, items: { type: Type.STRING } },
            redFlags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["triageLevel", "summary", "potentialConditions", "recommendedSpecialist"]
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("AI Symptom Checker error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze symptoms" });
  }
});

// AI Report Summarizer
app.post("/api/ai/report-summary", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured on server." });
    }
    const { reportType, reportText, patientName } = req.body;

    const prompt = `Analyze and summarize this medical report (${reportType || 'Lab / Scan'}) for patient ${patientName || 'Patient'}:
Report Content:
${reportText}

Provide a structured response in JSON with:
1. plainEnglishSummary: Clear, non-technical breakdown for the patient.
2. keyFindings: Array of notable test results / anatomical observations.
3. abnormalValues: Array of findings that fall outside reference ranges with explanations.
4. clinicalImpression: Medical impression for attending physicians.
5. recommendedFollowUp: Recommended follow-up tests or consults.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert radiologist and pathologist AI assistant. Translate complex lab & radiology reports into both patient-accessible insights and physician summary points.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            plainEnglishSummary: { type: Type.STRING },
            keyFindings: { type: Type.ARRAY, items: { type: Type.STRING } },
            abnormalValues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  value: { type: Type.STRING },
                  referenceRange: { type: Type.STRING },
                  status: { type: Type.STRING },
                  meaning: { type: Type.STRING }
                }
              }
            },
            clinicalImpression: { type: Type.STRING },
            recommendedFollowUp: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("AI Report Summary error:", error);
    res.status(500).json({ error: error.message || "Failed to summarize report" });
  }
});

// AI Prescription Explainer
app.post("/api/ai/prescription-explainer", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured on server." });
    }
    const { medicines, patientAge, allergies } = req.body;

    const prompt = `Explain this prescription regimen:
Medicines: ${JSON.stringify(medicines)}
Patient Age: ${patientAge || 'Adult'}
Known Allergies: ${allergies || 'None'}

Return JSON:
1. summary: Brief overview of treatment goals.
2. medicationGuides: Array of guides for each medicine (name, purpose, dosageInstructions, bestTimeToTake, foodInteractions, commonSideEffects).
3. safetyPrecautions: Key safety warnings or contraindications.
4. missedDoseGuidance: What to do if a dose is missed.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are HealthFlow Clinical Pharmacist AI. Provide comprehensive, patient-friendly guidance on medication schedules, food interactions, and safety.",
        responseMimeType: "application/json"
      }
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (error: any) {
    console.error("AI Prescription Explainer error:", error);
    res.status(500).json({ error: error.message || "Failed to explain prescription" });
  }
});

// AI Medical Assistant Chatbot
app.post("/api/ai/assistant", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured on server." });
    }
    const { message, context, chatHistory } = req.body;

    const chatPrompt = `You are HealthFlow Enterprise Medical AI, a compassionate and expert clinical assistant.
Context: ${context || 'General hospital visitor / patient guidance'}
User Message: ${message}

Provide a clear, reassuring, structured, professional response. Use Markdown formatting (bullet points, bold text). Include relevant next steps or hospital departments if applicable.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: chatPrompt,
      config: {
        systemInstruction: "You are HealthFlow AI Medical Assistant. Assist patients and medical staff with health queries, appointments guidance, pre-op instructions, department finding, and symptom management."
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("AI Assistant error:", error);
    res.status(500).json({ error: error.message || "Failed to process message" });
  }
});

// AI Diet & Fitness Planner
app.post("/api/ai/diet-planner", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured on server." });
    }
    const { condition, goal, dietaryType, age } = req.body;

    const prompt = `Create a customized medical nutrition and fitness plan for a patient:
- Primary Condition: ${condition}
- Goal: ${goal || 'General Health & Recovery'}
- Dietary Preference: ${dietaryType || 'Omnivore'}
- Age: ${age || '40'}

Return JSON:
1. planTitle: Title of the plan
2. dietaryOverview: Key nutritional guidelines
3. mealPlan: Object with breakfast, lunch, dinner, snacks suggestions
4. foodsToEmphasize: Array of recommended foods
5. foodsToAvoid: Array of restricted foods
6. exerciseRecommendations: Safe physical activity plan for this medical condition`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a clinical dietitian and physical rehab specialist. Return strict JSON structured medical nutrition plans.",
        responseMimeType: "application/json"
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("AI Diet Planner error:", error);
    res.status(500).json({ error: error.message || "Failed to generate plan" });
  }
});

// AI Medicine Interaction Checker
app.post("/api/ai/interaction-checker", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: "Gemini API key is not configured on server." });
    }
    const { drugList } = req.body;

    const prompt = `Evaluate potential drug-drug and drug-food interactions for this medication combination: ${JSON.stringify(drugList)}

Return JSON:
1. overallRiskLevel: "High", "Moderate", "Low", or "None"
2. interactionList: Array of identified interactions ({ drugs: [], severity: "Major/Moderate/Minor", mechanism: "", management: "" })
3. recommendations: Clinical advice for prescribing doctor / pharmacist.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a senior clinical pharmacologist. Analyze drug interactions with highest precision.",
        responseMimeType: "application/json"
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("AI Interaction Checker error:", error);
    res.status(500).json({ error: error.message || "Failed to check interactions" });
  }
});

// Vite Integration Mode
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`HealthFlow Enterprise Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
