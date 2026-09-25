export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  qualifications: string;
  experienceYears: number;
  education: string;
  hospitalAffiliation: string;
  languages: string[];
  telehealthAvailable: boolean;
  acceptsNewPatients: boolean;
  rating: number;
  reviewCount: number;
  biography: string;
  clinicalFocus: string[];
  availableSlots: { date: string; time: string }[];
}

export interface Department {
  id: string;
  name: string;
  tagline: string;
  description: string;
  director: string;
  location: string;
  procedures: string[];
  technology: string[];
  phone: string;
  hours: string;
}

export interface EmergencyCampus {
  id: string;
  name: string;
  address: string;
  type: string;
  currentWaitMinutes: number;
  bedsOccupied: number;
  totalBeds: number;
  status: 'Normal' | 'Moderate' | 'High Demand';
  traumaLevel: string;
  contactNumber: string;
  historicalWaitTrend: {
    hourLabel: string;
    waitMinutes: number;
    patientsWaiting: number;
  }[];
}

export interface TriageCondition {
  id: string;
  symptomTitle: string;
  category: string;
  urgency: 'critical' | 'urgent' | 'same-day' | 'routine';
  guidance: string;
  recommendedDepartment: string;
  actionText: string;
  redFlags: string[];
}

export interface LabResult {
  id: string;
  testName: string;
  date: string;
  orderingDoctor: string;
  status: 'Normal' | 'Action Needed' | 'Review Required';
  parameters: {
    name: string;
    value: string;
    range: string;
    status: 'in-range' | 'high' | 'low';
  }[];
  doctorNotes: string;
}

export const EMERGENCY_CAMPUSES: EmergencyCampus[] = [
  {
    id: 'main-campus',
    name: 'Meridian University Hospital - Main Campus',
    address: '800 Hospital Way, Medical District',
    type: 'Adult Level 1 Trauma Center',
    currentWaitMinutes: 12,
    bedsOccupied: 82,
    totalBeds: 100,
    status: 'Normal',
    traumaLevel: 'Level 1 Trauma & Comprehensive Stroke',
    contactNumber: '(555) 019-2000',
    historicalWaitTrend: [
      { hourLabel: '3 PM', waitMinutes: 18, patientsWaiting: 14 },
      { hourLabel: '4 PM', waitMinutes: 22, patientsWaiting: 19 },
      { hourLabel: '5 PM', waitMinutes: 26, patientsWaiting: 24 },
      { hourLabel: '6 PM', waitMinutes: 19, patientsWaiting: 16 },
      { hourLabel: '7 PM', waitMinutes: 15, patientsWaiting: 11 },
      { hourLabel: '8 PM (Now)', waitMinutes: 12, patientsWaiting: 8 }
    ]
  },
  {
    id: 'north-pavilion',
    name: 'North Pavilion Emergency & Urgent Care',
    address: '1420 Northern Boulevard, Suite 100',
    type: 'Community Emergency Department',
    currentWaitMinutes: 8,
    bedsOccupied: 34,
    totalBeds: 50,
    status: 'Normal',
    traumaLevel: 'Level 2 Emergency Care',
    contactNumber: '(555) 019-2040',
    historicalWaitTrend: [
      { hourLabel: '3 PM', waitMinutes: 12, patientsWaiting: 6 },
      { hourLabel: '4 PM', waitMinutes: 14, patientsWaiting: 8 },
      { hourLabel: '5 PM', waitMinutes: 16, patientsWaiting: 11 },
      { hourLabel: '6 PM', waitMinutes: 11, patientsWaiting: 7 },
      { hourLabel: '7 PM', waitMinutes: 9, patientsWaiting: 5 },
      { hourLabel: '8 PM (Now)', waitMinutes: 8, patientsWaiting: 4 }
    ]
  },
  {
    id: 'pediatric-er',
    name: 'Children’s Memorial Emergency Pavilion',
    address: '820 Hospital Way, West Wing',
    type: 'Dedicated Pediatric Emergency',
    currentWaitMinutes: 5,
    bedsOccupied: 26,
    totalBeds: 40,
    status: 'Normal',
    traumaLevel: 'Level 1 Pediatric Trauma Center',
    contactNumber: '(555) 019-2088',
    historicalWaitTrend: [
      { hourLabel: '3 PM', waitMinutes: 6, patientsWaiting: 3 },
      { hourLabel: '4 PM', waitMinutes: 9, patientsWaiting: 6 },
      { hourLabel: '5 PM', waitMinutes: 11, patientsWaiting: 8 },
      { hourLabel: '6 PM', waitMinutes: 8, patientsWaiting: 5 },
      { hourLabel: '7 PM', waitMinutes: 6, patientsWaiting: 4 },
      { hourLabel: '8 PM (Now)', waitMinutes: 5, patientsWaiting: 2 }
    ]
  },
  {
    id: 'cardiac-urgent',
    name: 'Cardiovascular Rapid Response & Chest Pain Unit',
    address: '810 Hospital Way, Heart Institute 1st Floor',
    type: 'Direct Catheterization Standby',
    currentWaitMinutes: 3,
    bedsOccupied: 16,
    totalBeds: 24,
    status: 'Normal',
    traumaLevel: 'Accredited Chest Pain Center v6',
    contactNumber: '(555) 019-2022',
    historicalWaitTrend: [
      { hourLabel: '3 PM', waitMinutes: 4, patientsWaiting: 2 },
      { hourLabel: '4 PM', waitMinutes: 5, patientsWaiting: 3 },
      { hourLabel: '5 PM', waitMinutes: 6, patientsWaiting: 4 },
      { hourLabel: '6 PM', waitMinutes: 4, patientsWaiting: 2 },
      { hourLabel: '7 PM', waitMinutes: 3, patientsWaiting: 1 },
      { hourLabel: '8 PM (Now)', waitMinutes: 3, patientsWaiting: 1 }
    ]
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiovascular',
    name: 'Heart & Vascular Institute',
    tagline: 'Comprehensive cardiac care, valve replacement, and coronary interventions.',
    description: 'Our Heart & Vascular Institute is internationally recognized for breakthrough therapies in structural heart disease, minimally invasive valve repair, advanced electrophysiology, and preventive cardiology.',
    director: 'Dr. Sarah Lin, MD, FACC',
    location: 'Pavilion A, Floors 2-4',
    procedures: ['TAVR Valve Replacement', 'Coronary Angioplasty & Stenting', 'Arrhythmia Ablation', 'Cardiopulmonary Stress Diagnostics', 'Heart Failure Management'],
    technology: ['Dual-plane Hybrid Cath Labs', 'Carto 3 3D Cardiac Mapping', 'Advanced Intracardiac Echocardiography'],
    phone: '(555) 019-2210',
    hours: 'Mon - Fri: 7:00 AM - 6:00 PM (Emergency 24/7)'
  },
  {
    id: 'neurology',
    name: 'Neurological Sciences & Stroke Center',
    tagline: 'Leading center for acute stroke intervention, spine surgery, and neurological care.',
    description: 'Designated as a Comprehensive Stroke Center, our neurovascular and neurosurgery teams offer around-the-clock endovascular thrombectomy, complex cranial surgery, and specialized memory disorders care.',
    director: 'Dr. Robert Vance, MD, PhD, FAANS',
    location: 'Pavilion B, Floors 3-5',
    procedures: ['Mechanical Thrombectomy for Acute Stroke', 'Minimally Invasive Spine Decompression', 'Stereotactic Radiosurgery', 'Epilepsy Monitoring & Resection'],
    technology: ['Intraoperative 3T MRI Suite', 'StealthStation S8 Surgical Navigation', 'Continuous 64-channel Video EEG'],
    phone: '(555) 019-2340',
    hours: 'Mon - Fri: 8:00 AM - 5:30 PM (Stroke Team 24/7)'
  },
  {
    id: 'oncology',
    name: 'Comprehensive Cancer Institute',
    tagline: 'Precision cancer medicine, immunotherapy, and multidisciplinary tumor boards.',
    description: 'An NCI-designated comprehensive center integrating genomic tumor profiling, outpatient chemotherapy and cellular therapies, robotic-assisted surgical oncology, and holistic palliative support.',
    director: 'Dr. Elena Rostova, MD, PhD',
    location: 'Cancer Center Building, Floors 1-6',
    procedures: ['Targeted Molecular Therapies & Immunotherapy', 'SBRT Stereotactic Body Radiation', 'Surgical Resection with Da Vinci Xi', 'Infusion Suite Treatments'],
    technology: ['Varian TrueBeam Linear Accelerator', 'Next-Generation Gene Sequencers', 'Quiet Botanical Infusion Suites'],
    phone: '(555) 019-2450',
    hours: 'Mon - Fri: 7:30 AM - 6:30 PM'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedic & Joint Reconstruction',
    tagline: 'Pioneering robotic joint replacement and specialized sports injury recovery.',
    description: 'Providing elite care for athletes, active adults, and joint reconstruction candidates utilizing robotic-assisted total hip and knee arthroplasty, cartilage preservation, and specialized physical therapy.',
    director: 'Dr. James Chen, MD, FAAOS',
    location: 'Pavilion C, Floors 1-2',
    procedures: ['Mako Robotic-Arm Assisted Knee & Hip Arthroplasty', 'Rotator Cuff & Shoulder Arthroscopy', 'ACL & Meniscal Reconstruction', 'Cervical & Lumbar Disc Repair'],
    technology: ['Mako SmartRobotics System', 'Zero-Gravity Physical Rehabilitation Track', 'Digital Motion Capture Lab'],
    phone: '(555) 019-2500',
    hours: 'Mon - Fri: 8:00 AM - 5:00 PM'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Neonatal Intensive Care',
    tagline: 'Compassionate pediatric specialty care and Level IV neonatal life support.',
    description: 'A dedicated child-friendly environment featuring a 40-bed Level IV Neonatal Intensive Care Unit (NICU), pediatric surgery, pediatric cardiology, and adolescent health.',
    director: 'Dr. Marcus Thorne, MD, FAAP',
    location: 'West Wing Children’s Center',
    procedures: ['Neonatal Surgery & ECMO Life Support', 'Pediatric Asthma Management', 'Congenital Defect Repair', 'Child Development Assessments'],
    technology: ['Giraffe Omnibed Incubators', 'Pediatric ECMO Circuit Systems', 'Family-Centered Private NICU Suites'],
    phone: '(555) 019-2620',
    hours: '24/7 Inpatient & Emergency / Clinic: Mon - Sat: 8:00 AM - 6:00 PM'
  },
  {
    id: 'maternal',
    name: 'Women’s Health & Maternal Fetal Medicine',
    tagline: 'High-risk obstetrics, private birth suites, and gynecologic surgery.',
    description: 'Comprehensive women’s health center equipped for high-risk maternal-fetal care, natural and assisted childbirth, pelvic reconstruction, and minimally invasive gynecological surgery.',
    director: 'Dr. Aaliyah Washington, MD, FACOG',
    location: 'Women’s Health Wing, 3rd Floor',
    procedures: ['High-Risk Maternal Ultrasound & Amniocentesis', 'Private LDRP Suites (Labor, Delivery, Recovery, Postpartum)', 'Robotic Myomectomy & Hysterectomy'],
    technology: ['GE Voluson E10 4D High-Definition Ultrasound', 'Wireless Fetal Telemetry Monitoring'],
    phone: '(555) 019-2700',
    hours: '24/7 Labor & Delivery / Clinic: Mon - Fri: 8:30 AM - 5:00 PM'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-lin',
    name: 'Dr. Sarah Lin, MD, FACC',
    title: 'Chief of Cardiovascular Surgery',
    departmentId: 'cardiovascular',
    departmentName: 'Heart & Vascular Institute',
    qualifications: 'MD, Johns Hopkins School of Medicine · Board Certified in Thoracic Surgery',
    experienceYears: 19,
    education: 'Johns Hopkins School of Medicine (MD) · Harvard Brigham & Women’s (Fellowship)',
    hospitalAffiliation: 'Meridian University Hospital',
    languages: ['English', 'Mandarin'],
    telehealthAvailable: true,
    acceptsNewPatients: true,
    rating: 4.96,
    reviewCount: 312,
    biography: 'Dr. Lin is an internationally distinguished cardiothoracic surgeon specializing in minimally invasive aortic valve surgery, coronary revascularization, and hybrid cardiovascular intervention.',
    clinicalFocus: ['Aortic Valve Replacement', 'Coronary Bypass (CABG)', 'Transcatheter Valve Repair', 'Thoracic Aneurysm'],
    availableSlots: [
      { date: 'Tomorrow', time: '09:30 AM' },
      { date: 'Tomorrow', time: '02:00 PM' },
      { date: 'Friday', time: '11:00 AM' }
    ]
  },
  {
    id: 'dr-vance',
    name: 'Dr. Robert Vance, MD, PhD',
    title: 'Director of Neurological Sciences & Stroke Center',
    departmentId: 'neurology',
    departmentName: 'Neurological Sciences',
    qualifications: 'MD, PhD, Columbia University · Board Certified in Neurological Surgery',
    experienceYears: 22,
    education: 'Columbia University Vagelos College of Physicians & Surgeons · Barrow Neurological Institute',
    hospitalAffiliation: 'Meridian University Hospital',
    languages: ['English'],
    telehealthAvailable: false,
    acceptsNewPatients: true,
    rating: 4.94,
    reviewCount: 284,
    biography: 'Dr. Vance leads the tertiary stroke and neurosurgical unit at Meridian, known for microvascular decompression, complex intracranial aneurysms, and skull base tumor resection.',
    clinicalFocus: ['Acute Ischemic Stroke', 'Brain Aneurysm Coiling', 'Skull Base Surgery', 'Trigeminal Neuralgia'],
    availableSlots: [
      { date: 'Tomorrow', time: '01:30 PM' },
      { date: 'Monday', time: '10:00 AM' },
      { date: 'Tuesday', time: '03:15 PM' }
    ]
  },
  {
    id: 'dr-rostova',
    name: 'Dr. Elena Rostova, MD',
    title: 'Lead Medical Oncologist & Immunotherapy Director',
    departmentId: 'oncology',
    departmentName: 'Comprehensive Cancer Institute',
    qualifications: 'MD, Stanford University · Board Certified in Medical Oncology & Hematology',
    experienceYears: 16,
    education: 'Stanford University School of Medicine · Memorial Sloan Kettering Cancer Center',
    hospitalAffiliation: 'Meridian University Hospital',
    languages: ['English', 'Russian', 'French'],
    telehealthAvailable: true,
    acceptsNewPatients: true,
    rating: 4.98,
    reviewCount: 418,
    biography: 'Dr. Rostova specializes in targeted molecular therapies and immune checkpoint inhibitor protocols for solid tumors, personalized cancer genomics, and innovative clinical trial protocols.',
    clinicalFocus: ['Targeted Breast & Lung Oncology', 'Checkpoint Immunotherapies', 'Genetic Risk Screening', 'Tumor Board Consultations'],
    availableSlots: [
      { date: 'Thursday', time: '10:30 AM' },
      { date: 'Friday', time: '01:15 PM' },
      { date: 'Monday', time: '09:00 AM' }
    ]
  },
  {
    id: 'dr-chen',
    name: 'Dr. James Chen, MD, FAAOS',
    title: 'Chief of Orthopedic Surgery & Sports Medicine',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedic & Joint Reconstruction',
    qualifications: 'MD, Penn Medicine · Fellowship in Adult Reconstruction & Sports Injury',
    experienceYears: 17,
    education: 'University of Pennsylvania Perelman School of Medicine · Hospital for Special Surgery',
    hospitalAffiliation: 'Meridian University Hospital & North Pavilion',
    languages: ['English', 'Cantonese'],
    telehealthAvailable: true,
    acceptsNewPatients: true,
    rating: 4.92,
    reviewCount: 389,
    biography: 'Dr. Chen is a pioneer in computer-navigated and robotic joint replacement. He has restored mobility to thousands of active adults and collegiate athletes using muscle-sparing approaches.',
    clinicalFocus: ['Robotic Total Knee Replacement', 'Anterior Approach Hip Arthroplasty', 'ACL & Cartilage Restoration', 'Shoulder Instability'],
    availableSlots: [
      { date: 'Tomorrow', time: '11:15 AM' },
      { date: 'Friday', time: '03:45 PM' },
      { date: 'Tuesday', time: '08:45 AM' }
    ]
  },
  {
    id: 'dr-thorne',
    name: 'Dr. Marcus Thorne, MD, FAAP',
    title: 'Director of Pediatric Medicine & NICU Services',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics & Neonatal Care',
    qualifications: 'MD, Duke University · Board Certified in Pediatric Critical Care Medicine',
    experienceYears: 20,
    education: 'Duke University School of Medicine · Boston Children’s Hospital',
    hospitalAffiliation: 'Meridian Children’s Memorial Pavilion',
    languages: ['English', 'Spanish'],
    telehealthAvailable: true,
    acceptsNewPatients: true,
    rating: 4.97,
    reviewCount: 520,
    biography: 'Dr. Thorne oversees emergency pediatric resuscitation and tertiary neonatal care. He is revered by families for his gentle demeanor and dedication to child-first clinical excellence.',
    clinicalFocus: ['Pediatric Critical Care', 'Complex Neonatal Conditions', 'Pediatric Pulmonology & Asthma', 'Congenital Disorders'],
    availableSlots: [
      { date: 'Tomorrow', time: '08:30 AM' },
      { date: 'Tomorrow', time: '01:00 PM' },
      { date: 'Monday', time: '11:30 AM' }
    ]
  },
  {
    id: 'dr-washington',
    name: 'Dr. Aaliyah Washington, MD, FACOG',
    title: 'Director of Maternal-Fetal Medicine',
    departmentId: 'maternal',
    departmentName: 'Women’s Health & Maternal Fetal',
    qualifications: 'MD, Yale School of Medicine · Board Certified in Maternal-Fetal Medicine & OB/GYN',
    experienceYears: 15,
    education: 'Yale School of Medicine · Brigham & Women’s Maternal Fetal Fellowship',
    hospitalAffiliation: 'Meridian University Hospital',
    languages: ['English', 'Spanish'],
    telehealthAvailable: true,
    acceptsNewPatients: true,
    rating: 4.95,
    reviewCount: 440,
    biography: 'Dr. Washington specializes in high-risk pregnancy consultations, multiple gestations, gestational cardiovascular management, and minimally invasive robotic gynecologic procedures.',
    clinicalFocus: ['High-Risk Pregnancy Care', 'Prenatal Ultrasound Diagnostics', 'Preeclampsia & Gestational Health', 'Minimally Invasive Surgery'],
    availableSlots: [
      { date: 'Thursday', time: '02:00 PM' },
      { date: 'Friday', time: '10:00 AM' },
      { date: 'Monday', time: '02:30 PM' }
    ]
  },
  {
    id: 'dr-patel',
    name: 'Dr. Maya Patel, MD, FACEP',
    title: 'Chief Medical Officer & Trauma Resuscitation Lead',
    departmentId: 'cardiovascular',
    departmentName: 'Emergency & Critical Medicine',
    qualifications: 'MD, University of Chicago Pritzker · Board Certified in Emergency Medicine',
    experienceYears: 14,
    education: 'University of Chicago Pritzker School of Medicine · Bellevue Hospital Trauma Fellowship',
    hospitalAffiliation: 'Meridian University Hospital Level 1 Trauma Center',
    languages: ['English', 'Hindi', 'Gujarati'],
    telehealthAvailable: false,
    acceptsNewPatients: true,
    rating: 4.93,
    reviewCount: 260,
    biography: 'Dr. Patel directs the 100-bed Level 1 Emergency Department and rapid response triage command, setting operational clinical guidelines for acute polytrauma and stroke resuscitation.',
    clinicalFocus: ['Emergency Resuscitation', 'Acute Polytrauma', 'Disaster Medicine Protocol', 'Cardiovascular Crisis Triage'],
    availableSlots: [
      { date: 'Friday', time: '09:00 AM' },
      { date: 'Monday', time: '01:00 PM' }
    ]
  },
  {
    id: 'dr-kim',
    name: 'Dr. David Kim, MD, FCCP',
    title: 'Pulmonary Medicine & ICU Critical Care Director',
    departmentId: 'cardiovascular',
    departmentName: 'Pulmonology & Respiratory Medicine',
    qualifications: 'MD, Northwestern University · Board Certified in Pulmonary Disease & Critical Care',
    experienceYears: 16,
    education: 'Northwestern University Feinberg School of Medicine · Mayo Clinic Pulmonology Fellowship',
    hospitalAffiliation: 'Meridian University Hospital',
    languages: ['English', 'Korean'],
    telehealthAvailable: true,
    acceptsNewPatients: true,
    rating: 4.91,
    reviewCount: 305,
    biography: 'Specializing in advanced diagnostic bronchoscopy, interstitial lung diseases, chronic respiratory insufficiency, and acute respiratory distress syndrome management in the ICU.',
    clinicalFocus: ['Interventional Pulmonology', 'COPD & Complex Asthma', 'Lung Nodule Evaluation', 'Post-Acute ICU Rehabilitation'],
    availableSlots: [
      { date: 'Thursday', time: '11:00 AM' },
      { date: 'Friday', time: '02:30 PM' },
      { date: 'Tuesday', time: '09:15 AM' }
    ]
  }
];

export const TRIAGE_CONDITIONS: TriageCondition[] = [
  {
    id: 'chest-pain',
    symptomTitle: 'Chest Pain, Pressure, or Arm Radiation',
    category: 'Cardiovascular',
    urgency: 'critical',
    guidance: 'Potentially life-threatening emergency. Do not drive yourself. Call 911 immediately or go directly to the nearest Level 1 Emergency Department.',
    recommendedDepartment: 'Emergency Department / Chest Pain Center',
    actionText: 'Call 911 Immediately',
    redFlags: ['Crushing chest pressure or tightness', 'Pain radiating to jaw, neck, left arm, or back', 'Cold sweat, dizziness, or shortness of breath', 'Sudden palpitations with faintness']
  },
  {
    id: 'stroke-signs',
    symptomTitle: 'Sudden Weakness, Numbness, or Slurred Speech',
    category: 'Neurological',
    urgency: 'critical',
    guidance: 'F.A.S.T. signs indicate potential acute stroke. Every second counts. Time is brain tissue. Proceed to Comprehensive Stroke Center immediately via ambulance.',
    recommendedDepartment: 'Comprehensive Stroke Center / Emergency',
    actionText: 'Call 911 / Stroke Alert',
    redFlags: ['Facial drooping on one side', 'Inability to lift or hold one arm', 'Slurred speech or difficulty understanding words', 'Sudden loss of vision or sudden severe thunderclap headache']
  },
  {
    id: 'severe-shortness-breath',
    symptomTitle: 'Severe Difficulty Breathing or Cyanosis',
    category: 'Respiratory',
    urgency: 'critical',
    guidance: 'Respiratory distress requiring immediate supplemental oxygen, airway evaluation, or rapid bronchodilation.',
    recommendedDepartment: 'Emergency Department (Main Campus)',
    actionText: 'Seek Immediate Emergency Care',
    redFlags: ['Struggling to speak full sentences', 'Bluish lips or fingertips', 'Stridor or audible high-pitched wheezing', 'History of severe asthma or anaphylaxis']
  },
  {
    id: 'high-fever-child',
    symptomTitle: 'High Fever in Infant / Pediatric Lethargy',
    category: 'Pediatric',
    urgency: 'urgent',
    guidance: 'Fevers above 100.4°F in infants under 3 months, or persistent high fevers accompanied by dehydration or unusual lethargy, require prompt medical assessment.',
    recommendedDepartment: 'Children’s Memorial Emergency Pavilion',
    actionText: 'Go to Pediatric Emergency',
    redFlags: ['Infant under 90 days with rectal temp > 100.4°F', 'Unresponsive, difficult to awaken, or inconsolable crying', 'Signs of dehydration (no wet diapers in 8+ hours, no tears)', 'Rapid breathing or retractions (ribs pulling in)']
  },
  {
    id: 'suspected-fracture',
    symptomTitle: 'Suspected Bone Fracture or Severe Joint Sprain',
    category: 'Orthopedic',
    urgency: 'urgent',
    guidance: 'Deformity, severe swelling, and inability to bear weight require immediate immobilization, digital X-ray, and orthopedic stabilization.',
    recommendedDepartment: 'North Pavilion Urgent & Orthopedic Care',
    actionText: 'Visit Urgent Care / Walk-in',
    redFlags: ['Visible bone through skin (open fracture - GO TO ER)', 'Loss of pulse or sensation distal to injury', 'Severe angulation or visible deformity', 'Uncontrolled acute pain with inability to walk']
  },
  {
    id: 'persistent-headache',
    symptomTitle: 'Chronic or Recurrent Migraines / Neuropathy',
    category: 'Neurology',
    urgency: 'routine',
    guidance: 'For non-sudden, ongoing chronic headaches or recurrent neuropathy without acute red flags, an outpatient consultation with a neurologist provides optimal diagnostic workup.',
    recommendedDepartment: 'Neurological Sciences Outpatient Clinic',
    actionText: 'Schedule Specialist Appointment',
    redFlags: ['Sudden explosive onset ("worst headache of life" = ER)', 'Accompanied by stiff neck and high fever (= ER)', 'Associated with sudden localized muscle weakness (= ER)']
  },
  {
    id: 'general-consult',
    symptomTitle: 'Second Opinion, Oncology Consultation, or Routine Exam',
    category: 'General & Specialty',
    urgency: 'routine',
    guidance: 'Non-emergency diagnostic review, specialty referral, prescription review, or preventive cardiovascular checkup.',
    recommendedDepartment: 'Outpatient Specialty Suites',
    actionText: 'Book Outpatient Appointment',
    redFlags: ['No acute emergency signs present', 'Stable vital signs']
  }
];

export const MOCK_PATIENT_LAB_RESULTS: LabResult[] = [
  {
    id: 'lab-0924',
    testName: 'Comprehensive Metabolic Panel (CMP) & Lipid Profile',
    date: 'Sep 18, 2026',
    orderingDoctor: 'Dr. Sarah Lin, MD',
    status: 'Normal',
    parameters: [
      { name: 'Fasting Blood Glucose', value: '92 mg/dL', range: '70 - 99 mg/dL', status: 'in-range' },
      { name: 'Estimated GFR (Kidney Function)', value: '> 90 mL/min', range: '> 60 mL/min', status: 'in-range' },
      { name: 'Serum Creatinine', value: '0.88 mg/dL', range: '0.60 - 1.20 mg/dL', status: 'in-range' },
      { name: 'Total Cholesterol', value: '178 mg/dL', range: '< 200 mg/dL', status: 'in-range' },
      { name: 'HDL (High Density Lipoprotein)', value: '58 mg/dL', range: '> 45 mg/dL', status: 'in-range' },
      { name: 'LDL (Low Density Lipoprotein)', value: '98 mg/dL', range: '< 100 mg/dL', status: 'in-range' },
      { name: 'Triglycerides', value: '110 mg/dL', range: '< 150 mg/dL', status: 'in-range' }
    ],
    doctorNotes: 'Excellent metabolic and lipid profile. Cardiovascular risk parameters remain well within targeted preventive benchmarks. Continue current dietary regimen.'
  },
  {
    id: 'lab-0814',
    testName: 'Cardiovascular 12-Lead Electrocardiogram (ECG)',
    date: 'Aug 14, 2026',
    orderingDoctor: 'Dr. Sarah Lin, MD',
    status: 'Normal',
    parameters: [
      { name: 'Resting Heart Rate', value: '64 bpm', range: '60 - 100 bpm', status: 'in-range' },
      { name: 'PR Interval', value: '154 ms', range: '120 - 200 ms', status: 'in-range' },
      { name: 'QRS Duration', value: '88 ms', range: '80 - 120 ms', status: 'in-range' },
      { name: 'QTc Interval (Bazett)', value: '412 ms', range: '< 450 ms', status: 'in-range' }
    ],
    doctorNotes: 'Normal sinus rhythm. No acute ischemic ST-T changes. Baseline parameters unchanged compared to prior evaluation.'
  }
];

export const PATIENT_PRESCRIPTIONS = [
  {
    id: 'rx-1',
    medication: 'Atorvastatin Calcium',
    dosage: '20 mg oral tablet',
    frequency: 'Once daily at bedtime',
    prescriber: 'Dr. Sarah Lin, MD',
    refillsRemaining: 3,
    status: 'Active',
    pharmacy: 'Meridian Outpatient Pharmacy (Main Campus Ground Floor)'
  },
  {
    id: 'rx-2',
    medication: 'Lisinopril',
    dosage: '10 mg oral tablet',
    frequency: 'Once daily in the morning',
    prescriber: 'Dr. Sarah Lin, MD',
    refillsRemaining: 2,
    status: 'Active',
    pharmacy: 'Meridian Outpatient Pharmacy (Main Campus Ground Floor)'
  }
];

export const VISITOR_INFO = {
  visitingHours: [
    { area: 'General Medical & Surgical Units', hours: '8:00 AM - 8:30 PM daily', guidelines: 'Up to 2 visitors at bedside simultaneously. Children accompanied by adult.' },
    { area: 'Intensive Care Units (ICU / CCU)', hours: '10:00 AM - 6:00 PM & 7:30 PM - 9:00 PM', guidelines: 'Immediate family members only. Quiet hours strictly observed 1:00 PM - 3:00 PM.' },
    { area: 'Maternity & Labor / Delivery', hours: '24 Hours for designated birth partner', guidelines: 'General family: 9:00 AM - 8:00 PM. Siblings welcome with adult supervision.' },
    { area: 'Pediatrics / NICU', hours: '24 Hours for parents & primary guardians', guidelines: 'Sleep accommodations provided in private patient suites.' }
  ],
  parking: [
    { name: 'Plaza Parking Garage A (Emergency & Ambulatory)', rate: '$3/hr (Complimentary for Emergency arrivals & validation at nurse desk)', evChargers: '8 Level-2 Ports' },
    { name: 'Pavilion Garage B (Specialty Clinics & Surgery)', rate: '$2/hr or $8 daily maximum', evChargers: '12 Level-2 Ports' },
    { name: 'Valet Service (Main Hospital Portico)', rate: '$10 flat fee for patients with limited mobility', evChargers: 'Available on request' }
  ],
  amenities: [
    { title: 'The Terrace Bistro & Cafeteria', location: 'Lower Level, Pavilion A', hours: '6:30 AM - 9:00 PM daily', description: 'Fresh farm-to-table entrees, gluten-free & vegan options, espresso bar.' },
    { title: 'Full-Service 24-Hour Pharmacy', location: 'Ground Floor, Main Entrance', hours: 'Open 24/7/365', description: 'Bedside prescription delivery before hospital discharge available.' },
    { title: 'Interfaith Meditation & Chapel', location: '2nd Floor, Garden Promenade', hours: 'Open 24/7', description: 'Serene contemplative space with chaplain services on call.' },
    { title: 'Patient Resource & Family Business Center', location: '1st Floor, Near Concierge', hours: '7:00 AM - 7:00 PM', description: 'Complimentary high-speed Wi-Fi, private workstations, printing, and medical librarians.' }
  ]
};
