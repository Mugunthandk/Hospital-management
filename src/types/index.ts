export type UserRole =
  | 'super_admin'
  | 'hospital_admin'
  | 'branch_admin'
  | 'doctor'
  | 'receptionist'
  | 'nurse'
  | 'patient'
  | 'pharmacist'
  | 'lab_technician'
  | 'radiologist'
  | 'hr_manager'
  | 'accountant'
  | 'inventory_manager'
  | 'ambulance_driver';

export interface Hospital {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  emergencyPhone: string;
  accreditation: string;
  branchesCount: number;
  totalBeds: number;
}

export interface Branch {
  id: string;
  hospitalId: string;
  name: string;
  code: string;
  city: string;
  address: string;
  phone: string;
  headDoctor: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  icon: string;
  description: string;
  headDoctor: string;
  totalDoctors: number;
  location: string;
}

export interface Doctor {
  id: string;
  hospitalId: string;
  branchId: string;
  name: string;
  title: string;
  specialty: string;
  departmentId: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  availableDays: string[];
  timeSlots: string[];
  consultationFee: number;
  roomNumber: string;
  avatar: string;
  status: 'available' | 'in_consultation' | 'on_leave' | 'offline';
  bio: string;
}

export interface Patient {
  id: string;
  hospitalId: string;
  branchId: string;
  mrn: string; // Medical Record Number
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  insurance: {
    provider: string;
    policyNumber: string;
    validTill: string;
    coverageAmount: number;
  };
  bmi: {
    heightCm: number;
    weightKg: number;
    val: number;
  };
  assignedDoctorId?: string;
  wardBedId?: string;
  vitals?: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    spO2: number;
  };
}

export interface Appointment {
  id: string;
  appointmentNumber: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  departmentName: string;
  date: string;
  timeSlot: string;
  type: 'In-Person' | 'Video Consultation' | 'Emergency Walk-In';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' | 'Waiting';
  tokenNumber: number;
  symptoms: string;
  fee: number;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string; // e.g. "1-0-1"
    durationDays: number;
    instructions: string; // e.g. "After meals"
  }[];
  advice: string;
  followUpDate?: string;
  digitalSignature: string;
}

export interface PatientVital {
  id: string;
  patientId: string;
  patientName: string;
  recordedAt: string;
  recordedByNurse: string;
  bpSystolic: number;
  bpDiastolic: number;
  pulseBpM: number;
  spO2Percent: number;
  temperatureF: number;
  respiratoryRate: number;
  bloodGlucoseMgDl: number;
  notes: string;
}

export interface WardBed {
  id: string;
  hospitalId: string;
  branchId: string;
  wardName: string; // "General Ward", "Semi-Private", "ICU", "NICU", "Operation Theatre"
  bedNumber: string;
  type: 'Standard' | 'ICU' | 'NICU' | 'Isolation' | 'Ventilator';
  status: 'Available' | 'Occupied' | 'Under Maintenance' | 'Reserved';
  patientId?: string;
  patientName?: string;
  allocatedDate?: string;
  dailyRate: number;
}

export interface LabTestRequest {
  id: string;
  testCode: string;
  testName: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  orderedDate: string;
  sampleType: string; // "Blood", "Urine", "Swab", "Tissue"
  barcode: string;
  status: 'Pending Collection' | 'Sample Collected' | 'In Analysis' | 'Report Ready';
  results?: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    isAbnormal: boolean;
  }[];
  pdfReportUrl?: string;
  cost: number;
}

export interface RadiologyReport {
  id: string;
  accessionNumber: string;
  modality: 'X-Ray' | 'CT Scan' | 'MRI' | 'Ultrasound';
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  studyDate: string;
  bodyPart: string;
  imageUrl: string;
  status: 'Scheduled' | 'Scanning Complete' | 'Report Written';
  findings: string;
  impression: string;
  radiologistName: string;
}

export interface MedicineItem {
  id: string;
  code: string;
  name: string;
  genericName: string;
  category: 'Antibiotics' | 'Analgesics' | 'Cardiovascular' | 'Antidiabetic' | 'Respiratory' | 'Supplements';
  unitPrice: number;
  stockQuantity: number;
  minThreshold: number;
  expiryDate: string;
  batchNumber: string;
  manufacturer: string;
  rackLocation: string;
  requiresPrescription: boolean;
}

export interface BloodInventoryItem {
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  unitsAvailable: number;
  unitsReserved: number;
  lastUpdated: string;
}

export interface BloodDonor {
  id: string;
  donorCode: string;
  name: string;
  bloodGroup: string;
  phone: string;
  lastDonatedDate: string;
  totalDonations: number;
  eligibilityStatus: 'Eligible' | 'Temporary Deferred' | 'Ineligible';
}

export interface Ambulance {
  id: string;
  vehicleNumber: string;
  type: 'Basic Life Support (BLS)' | 'Advanced Life Support (ALS)' | 'Neonatal Transport';
  driverName: string;
  driverPhone: string;
  status: 'Available' | 'On Emergency Call' | 'In Maintenance';
  currentLocationName: string;
  lat: number;
  lng: number;
  etaMinutes?: number;
}

export interface BillInvoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  items: {
    description: string;
    category: 'Consultation' | 'Pharmacy' | 'Laboratory' | 'Ward/Bed' | 'Procedure' | 'Ambulance';
    amount: number;
    gstRate: number;
  }[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  insuranceCoverageAmount: number;
  netPayable: number;
  paymentMethod: 'Cash' | 'Credit Card' | 'UPI/QR' | 'Insurance Claim' | 'Net Banking';
  status: 'Paid' | 'Partially Paid' | 'Unpaid' | 'Claim Pending';
}

export interface StaffMember {
  id: string;
  employeeCode: string;
  name: string;
  role: UserRole;
  department: string;
  phone: string;
  email: string;
  shift: 'Morning (07:00-15:00)' | 'Evening (15:00-23:00)' | 'Night (23:00-07:00)' | 'General (09:00-17:00)';
  status: 'Active' | 'On Leave' | 'Off Duty';
  monthlySalary: number;
  attendancePercent: number;
  avatar?: string;
  branchName?: string;
  specialization?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  module: string;
  ipAddress: string;
  details: string;
}
