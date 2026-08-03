import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Hospital,
  Branch,
  Doctor,
  Patient,
  Appointment,
  Prescription,
  PatientVital,
  WardBed,
  LabTestRequest,
  RadiologyReport,
  MedicineItem,
  BloodInventoryItem,
  Ambulance,
  BillInvoice,
  StaffMember,
  AuditLog,
} from '../types';
import {
  mockHospitals,
  mockBranches,
  mockDoctors,
  mockPatients,
  mockAppointments,
  mockPrescriptions,
  mockVitals,
  mockWardBeds,
  mockLabTests,
  mockRadiologyReports,
  mockMedicines,
  mockBloodInventory,
  mockAmbulances,
  mockBills,
  mockStaff,
  mockAuditLogs,
} from '../data/mockData';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'urgent' | 'info' | 'success' | 'warning';
}

interface HospitalContextType {
  // Role & Location Context
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentHospital: Hospital;
  currentBranch: Branch;
  hospitals: Hospital[];
  branches: Branch[];
  setCurrentHospitalId: (id: string) => void;
  setCurrentBranchId: (id: string) => void;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;

  // View Navigation inside Portals
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Domain Data State
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  vitals: PatientVital[];
  wardBeds: WardBed[];
  beds: WardBed[];
  labTests: LabTestRequest[];
  radiologyReports: RadiologyReport[];
  medicines: MedicineItem[];
  inventory: MedicineItem[];
  bloodInventory: BloodInventoryItem[];
  ambulances: Ambulance[];
  bills: BillInvoice[];
  invoices: BillInvoice[];
  staff: StaffMember[];
  auditLogs: AuditLog[];
  notifications: NotificationItem[];

  // Data Mutations
  addAppointment: (apt: Omit<Appointment, 'id' | 'appointmentNumber' | 'tokenNumber'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  updateBedStatus: (bedId: string, status: WardBed['status']) => void;
  addPatient: (patient: Omit<Patient, 'id' | 'mrn'>) => Patient;
  addPrescription: (rx: Omit<Prescription, 'id' | 'digitalSignature'>) => void;
  addVital: (vital: Omit<PatientVital, 'id'>) => void;
  allocateBed: (bedId: string, patientId: string, patientName: string) => void;
  dischargeBed: (bedId: string) => void;
  addLabTest: (test: Omit<LabTestRequest, 'id' | 'barcode'>) => void;
  updateLabStatus: (id: string, status: LabTestRequest['status'], results?: LabTestRequest['results']) => void;
  addBill: (bill: Omit<BillInvoice, 'id' | 'invoiceNumber'>) => void;
  dispatchAmbulance: (id: string, destination: string) => void;
  markNotificationsRead: () => void;

  // AI Modal Controller
  activeAIModal: 'symptom_checker' | 'assistant' | 'diet_planner' | 'interaction_checker' | 'report_summarizer' | 'prescription_explainer' | null;
  aiPayload: any;
  openAIModal: (modal: 'symptom_checker' | 'assistant' | 'diet_planner' | 'interaction_checker' | 'report_summarizer' | 'prescription_explainer', payload?: any) => void;
  closeAIModal: () => void;

  // Action Modals
  activeActionModal: 'new_appointment' | 'new_patient' | 'new_prescription' | 'add_vitals' | 'allocate_bed' | 'new_bill' | 'emergency_sos' | null;
  openActionModal: (modal: 'new_appointment' | 'new_patient' | 'new_prescription' | 'add_vitals' | 'allocate_bed' | 'new_bill' | 'emergency_sos', payload?: any) => void;
  closeActionModal: () => void;
  actionModalPayload: any;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('doctor');
  const [hospitals] = useState<Hospital[]>(mockHospitals);
  const [branches] = useState<Branch[]>(mockBranches);
  const [currentHospitalId, setCurrentHospitalId] = useState<string>('hosp-1');
  const [currentBranchId, setCurrentBranchId] = useState<string>('branch-1');
  const [currentLanguage, setCurrentLanguage] = useState<string>('EN');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [vitals, setVitals] = useState<PatientVital[]>(mockVitals);
  const [wardBeds, setWardBeds] = useState<WardBed[]>(mockWardBeds);
  const [labTests, setLabTests] = useState<LabTestRequest[]>(mockLabTests);
  const [radiologyReports] = useState<RadiologyReport[]>(mockRadiologyReports);
  const [medicines, setMedicines] = useState<MedicineItem[]>(mockMedicines);
  const [bloodInventory, setBloodInventory] = useState<BloodInventoryItem[]>(mockBloodInventory);
  const [ambulances, setAmbulances] = useState<Ambulance[]>(mockAmbulances);
  const [bills, setBills] = useState<BillInvoice[]>(mockBills);
  const [staff] = useState<StaffMember[]>(mockStaff);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Emergency SOS Alert',
      message: 'ALS Ambulance AMB-101 dispatched to 5th Ave for cardiac distress.',
      time: '10 mins ago',
      read: false,
      type: 'urgent',
    },
    {
      id: 'notif-2',
      title: 'Low Blood Bank Inventory',
      message: 'O-Negative Blood supply at 6 units (Threshold: 10 units).',
      time: '25 mins ago',
      read: false,
      type: 'warning',
    },
    {
      id: 'notif-3',
      title: 'Lab Report Ready',
      message: 'CBC & Lipid report verified for Robert J. Henderson.',
      time: '1 hour ago',
      read: false,
      type: 'info',
    },
  ]);

  // AI & Action Modal States
  const [activeAIModal, setActiveAIModal] = useState<'symptom_checker' | 'assistant' | 'diet_planner' | 'interaction_checker' | 'report_summarizer' | 'prescription_explainer' | null>(null);
  const [aiPayload, setAiPayload] = useState<any>(null);

  const [activeActionModal, setActiveActionModal] = useState<'new_appointment' | 'new_patient' | 'new_prescription' | 'add_vitals' | 'allocate_bed' | 'new_bill' | 'emergency_sos' | null>(null);
  const [actionModalPayload, setActionModalPayload] = useState<any>(null);

  const currentHospital = hospitals.find((h) => h.id === currentHospitalId) || hospitals[0];
  const currentBranch = branches.find((b) => b.id === currentBranchId) || branches[0];

  const logAudit = (action: string, module: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      userId: `usr-${currentRole}`,
      userName: `Current ${currentRole.replace('_', ' ').toUpperCase()}`,
      role: currentRole,
      action,
      module,
      ipAddress: '127.0.0.1',
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addAppointment = (aptData: Omit<Appointment, 'id' | 'appointmentNumber' | 'tokenNumber'>) => {
    const tokenNum = appointments.filter((a) => a.doctorId === aptData.doctorId && a.date === aptData.date).length + 1;
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      appointmentNumber: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      tokenNumber: tokenNum,
    };
    setAppointments((prev) => [newApt, ...prev]);
    logAudit('Appointment Created', 'Appointments', `Created appointment ${newApt.appointmentNumber} for ${newApt.patientName}`);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Appointment Booked',
        message: `${newApt.patientName} scheduled with ${newApt.doctorName} on ${newApt.date} at ${newApt.timeSlot}`,
        time: 'Just now',
        read: false,
        type: 'success',
      },
      ...prev,
    ]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    logAudit('Appointment Status Updated', 'Appointments', `Updated appointment ${id} to ${status}`);
  };

  const addPatient = (patientData: Omit<Patient, 'id' | 'mrn'>): Patient => {
    const newMrn = `HF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPatient: Patient = {
      ...patientData,
      id: `pat-${Date.now()}`,
      mrn: newMrn,
    };
    setPatients((prev) => [newPatient, ...prev]);
    logAudit('New Patient Registered', 'Patients', `Registered patient ${newPatient.name} (MRN: ${newMrn})`);
    return newPatient;
  };

  const addPrescription = (rxData: Omit<Prescription, 'id' | 'digitalSignature'>) => {
    const newRx: Prescription = {
      ...rxData,
      id: `rx-${Date.now()}`,
      digitalSignature: `SIG-${currentRole.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}-VERIFIED`,
    };
    setPrescriptions((prev) => [newRx, ...prev]);
    logAudit('Prescription Issued', 'EHR & Prescriptions', `Issued digital prescription for ${newRx.patientName}`);
  };

  const addVital = (vitalData: Omit<PatientVital, 'id'>) => {
    const newVital: PatientVital = {
      ...vitalData,
      id: `vit-${Date.now()}`,
    };
    setVitals((prev) => [newVital, ...prev]);
    logAudit('Vitals Recorded', 'Nursing', `Recorded vitals for ${newVital.patientName}`);
  };

  const allocateBed = (bedId: string, patientId: string, patientName: string) => {
    setWardBeds((prev) =>
      prev.map((b) =>
        b.id === bedId
          ? {
              ...b,
              status: 'Occupied',
              patientId,
              patientName,
              allocatedDate: new Date().toISOString().split('T')[0],
            }
          : b
      )
    );
    logAudit('Bed Allocated', 'Ward Management', `Allocated bed ${bedId} to patient ${patientName}`);
  };

  const dischargeBed = (bedId: string) => {
    setWardBeds((prev) =>
      prev.map((b) =>
        b.id === bedId
          ? {
              ...b,
              status: 'Available',
              patientId: undefined,
              patientName: undefined,
              allocatedDate: undefined,
            }
          : b
      )
    );
    logAudit('Bed Discharged', 'Ward Management', `Discharged bed ${bedId}`);
  };

  const updateBedStatus = (bedId: string, status: WardBed['status']) => {
    setWardBeds((prev) =>
      prev.map((b) => (b.id === bedId ? { ...b, status } : b))
    );
    logAudit('Bed Status Updated', 'Ward Management', `Updated bed ${bedId} status to ${status}`);
  };

  const addLabTest = (testData: Omit<LabTestRequest, 'id' | 'barcode'>) => {
    const newTest: LabTestRequest = {
      ...testData,
      id: `lab-${Date.now()}`,
      barcode: `BC-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setLabTests((prev) => [newTest, ...prev]);
    logAudit('Lab Test Ordered', 'Laboratory', `Ordered test ${newTest.testName} for ${newTest.patientName}`);
  };

  const updateLabStatus = (id: string, status: LabTestRequest['status'], results?: LabTestRequest['results']) => {
    setLabTests((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, results: results || t.results } : t))
    );
    logAudit('Lab Test Updated', 'Laboratory', `Updated lab request ${id} status to ${status}`);
  };

  const addBill = (billData: Omit<BillInvoice, 'id' | 'invoiceNumber'>) => {
    const newBill: BillInvoice = {
      ...billData,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setBills((prev) => [newBill, ...prev]);
    logAudit('Invoice Generated', 'Billing', `Generated bill ${newBill.invoiceNumber} for ${newBill.patientName}`);
  };

  const dispatchAmbulance = (id: string, destination: string) => {
    setAmbulances((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'On Emergency Call',
              currentLocationName: `En route to ${destination}`,
              etaMinutes: 8,
            }
          : a
      )
    );
    logAudit('Ambulance Dispatched', 'Ambulance & Emergency', `Dispatched vehicle ${id} to ${destination}`);
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const openAIModal = (modal: typeof activeAIModal, payload?: any) => {
    setAiPayload(payload);
    setActiveAIModal(modal);
  };

  const closeAIModal = () => {
    setActiveAIModal(null);
    setAiPayload(null);
  };

  const openActionModal = (modal: typeof activeActionModal, payload?: any) => {
    setActionModalPayload(payload);
    setActiveActionModal(modal);
  };

  const closeActionModal = () => {
    setActiveActionModal(null);
    setActionModalPayload(null);
  };

  return (
    <HospitalContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentHospital,
        currentBranch,
        hospitals,
        branches,
        setCurrentHospitalId,
        setCurrentBranchId,
        currentLanguage,
        setCurrentLanguage,
        activeTab,
        setActiveTab,
        doctors,
        patients,
        appointments,
        prescriptions,
        vitals,
        wardBeds,
        beds: wardBeds,
        labTests,
        radiologyReports,
        medicines,
        inventory: medicines,
        bloodInventory,
        ambulances,
        bills,
        invoices: bills,
        staff,
        auditLogs,
        notifications,
        addAppointment,
        updateAppointmentStatus,
        updateBedStatus,
        addPatient,
        addPrescription,
        addVital,
        allocateBed,
        dischargeBed,
        addLabTest,
        updateLabStatus,
        addBill,
        dispatchAmbulance,
        markNotificationsRead,
        activeAIModal,
        aiPayload,
        openAIModal,
        closeAIModal,
        activeActionModal,
        actionModalPayload,
        openActionModal,
        closeActionModal,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) throw new Error('useHospital must be used within HospitalProvider');
  return context;
};
