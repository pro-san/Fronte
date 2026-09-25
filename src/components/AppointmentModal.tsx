import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, User, Shield, FileText, ChevronRight, ChevronLeft, MapPin, Download, Printer } from 'lucide-react';
import { DOCTORS, DEPARTMENTS, Doctor, Department } from '../data/hospitalData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor: Doctor | null;
  preselectedDeptId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctor,
  preselectedDeptId
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [visitType, setVisitType] = useState<'in-person' | 'telehealth' | 'second-opinion'>('in-person');
  const [selectedDeptId, setSelectedDeptId] = useState<string>(preselectedDeptId || (preselectedDoctor ? preselectedDoctor.departmentId : DEPARTMENTS[0].id));
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(preselectedDoctor ? preselectedDoctor.id : DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow');
  const [selectedTime, setSelectedTime] = useState<string>('09:30 AM');

  // Patient Info
  const [patientName, setPatientName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [insurance, setInsurance] = useState('BlueCross BlueShield');
  const [reason, setReason] = useState('');
  const [validationError, setValidationError] = useState('');

  // Confirmation result
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctorId(preselectedDoctor.id);
      setSelectedDeptId(preselectedDoctor.departmentId);
      if (preselectedDoctor.availableSlots[0]) {
        setSelectedDate(preselectedDoctor.availableSlots[0].date);
        setSelectedTime(preselectedDoctor.availableSlots[0].time);
      }
    } else if (preselectedDeptId) {
      setSelectedDeptId(preselectedDeptId);
      const matchedDoc = DOCTORS.find(d => d.departmentId === preselectedDeptId);
      if (matchedDoc) {
        setSelectedDoctorId(matchedDoc.id);
      }
    }
  }, [preselectedDoctor, preselectedDeptId]);

  if (!isOpen) return null;

  const currentDoctor = DOCTORS.find(d => d.id === selectedDoctorId) || DOCTORS[0];
  const currentDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  const handleNextStep = () => {
    setValidationError('');
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!patientName.trim()) {
        setValidationError('Please enter the patient full legal name.');
        return;
      }
      if (!phone.trim()) {
        setValidationError('Please enter a valid telephone contact number.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setValidationError('Please enter a valid email address for confirmation notifications.');
        return;
      }

      // Generate realistic reference
      const randomCode = `MMC-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmationCode(randomCode);
      setCurrentStep(4);
    }
  };

  const handleDownloadCalendar = () => {
    const calendarData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Meridian Medical Center//Appointment Scheduler//EN
BEGIN:VEVENT
SUMMARY:Medical Appointment with ${currentDoctor.name}
DESCRIPTION:Specialty: ${currentDoctor.departmentName}\\nConfirmation Code: ${confirmationCode}\\nReason: ${reason || 'Consultation'}
LOCATION:Meridian Medical Center, ${currentDept.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([calendarData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Meridian_Appointment_${confirmationCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
        
        {/* Top Header */}
        <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-sm">
              M
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Online Outpatient Scheduling
              </h3>
              <div className="text-xs text-slate-500">
                Step {currentStep} of 4 · Meridian Clinical Access
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-teal-800 h-1 transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-6 max-h-[72vh] overflow-y-auto">
          
          {/* STEP 1: Visit Type & Department */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Select Visit Modality
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose whether you need an in-person physical clinical exam or a secure telehealth consultation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setVisitType('in-person')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      visitType === 'in-person'
                        ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">In-Person Clinic Visit</div>
                    <div className="text-[11px] text-slate-500 mt-1">Full physical examination & diagnostics on campus</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('telehealth')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      visitType === 'telehealth'
                        ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Video Telehealth</div>
                    <div className="text-[11px] text-slate-500 mt-1">HIPAA-compliant high definition video consult from home</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitType('second-opinion')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      visitType === 'second-opinion'
                        ? 'border-teal-700 bg-teal-50/40 ring-1 ring-teal-700'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Second Opinion</div>
                    <div className="text-[11px] text-slate-500 mt-1">Comprehensive pathology & surgical review</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Select Clinical Specialty or Institute
                </label>
                <select
                  value={selectedDeptId}
                  onChange={(e) => {
                    setSelectedDeptId(e.target.value);
                    const matched = DOCTORS.find(d => d.departmentId === e.target.value);
                    if (matched) setSelectedDoctorId(matched.id);
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} — {dept.location}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-slate-500 mt-1.5">
                  Clinic Hours: {currentDept.hours}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Doctor & Time Slot Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Choose Attending Specialist
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {DOCTORS.filter(d => d.departmentId === selectedDeptId || !selectedDeptId).map((doc) => {
                    const isSelected = selectedDoctorId === doc.id;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorId(doc.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-teal-700 bg-teal-50/30 ring-1 ring-teal-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {doc.name.replace('Dr. ', '').split(' ').slice(0, 2).map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{doc.name}</div>
                            <div className="text-[11px] text-slate-500">{doc.title}</div>
                          </div>
                        </div>
                        <div className="text-right text-[11px] text-slate-500 font-mono">
                          ★ {doc.rating}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Slot Dates & Times */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Select Preferred Day & Time
                </h4>
                
                <div className="flex items-center gap-2 mb-3">
                  {['Tomorrow', 'Friday', 'Monday', 'Tuesday'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        selectedDate === d
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {['08:30 AM', '09:30 AM', '11:00 AM', '01:15 PM', '02:30 PM', '03:45 PM', '04:30 PM'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-2 text-xs font-mono rounded-lg border transition-all text-center ${
                        selectedTime === t
                          ? 'border-teal-700 bg-teal-700 text-white font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-800 bg-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Intake Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {validationError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
                  {validationError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email for Confirmation & Telehealth Link *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Medical Insurance Carrier
                </label>
                <select
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                >
                  <option value="BlueCross BlueShield">Blue Cross Blue Shield (PPO / HMO)</option>
                  <option value="Medicare">Medicare Part B / Advantage</option>
                  <option value="Aetna">Aetna Choice POS II</option>
                  <option value="Cigna">Cigna Open Access</option>
                  <option value="UnitedHealthcare">UnitedHealthcare Choice Plus</option>
                  <option value="Kaiser">Kaiser Permanente Referral</option>
                  <option value="Self-Pay">Self-Pay / Hospital Financial Assistance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reason for Visit / Chief Complaint (Optional)
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe your current symptoms or diagnosis..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation Receipt */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-teal-50 border border-teal-200 p-5 rounded-xl">
                <CheckCircle2 className="w-10 h-10 text-teal-800 shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Appointment Confirmed
                  </h4>
                  <p className="text-xs text-teal-900 mt-0.5">
                    A clinical confirmation receipt and calendar dispatch have been registered.
                  </p>
                </div>
                <div className="sm:ml-auto text-center sm:text-right">
                  <div className="text-[11px] text-slate-500 font-medium">Confirmation Code</div>
                  <div className="text-lg font-mono font-bold text-teal-900">{confirmationCode}</div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-slate-500">Patient:</span>
                    <div className="font-semibold text-slate-800">{patientName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Visit Modality:</span>
                    <div className="font-semibold text-slate-800 capitalize">{visitType}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-slate-500">Attending Specialist:</span>
                    <div className="font-semibold text-slate-800">{currentDoctor.name}</div>
                    <div className="text-[11px] text-slate-500">{currentDoctor.departmentName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Scheduled Date & Time:</span>
                    <div className="font-semibold text-slate-800">{selectedDate} at {selectedTime}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500">Location:</span>
                    <div className="font-semibold text-slate-800">{currentDept.location}</div>
                    <div className="text-[11px] text-slate-500">Meridian University Hospital Main Campus</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Insurance Verification:</span>
                    <div className="font-semibold text-slate-800">{insurance} (In-Network)</div>
                  </div>
                </div>
              </div>

              {/* Arrival Instructions Checklist */}
              <div className="text-xs text-slate-600 bg-white border border-slate-200 rounded-xl p-4 text-left">
                <div className="font-bold text-slate-800 mb-2">Important Instructions Before Arrival:</div>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                  <li>Please arrive 15 minutes early for check-in and vital signs assessment.</li>
                  <li>Bring your government-issued photo ID and insurance card.</li>
                  <li>Bring a current list of all prescription medications and supplements.</li>
                  <li>Complimentary parking validation available at the clinic check-in desk.</li>
                </ul>
              </div>

              {/* Utility actions */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-teal-800" />
                  <span>Add to Calendar (.ics)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-teal-800" />
                  <span>Print Intake Slip</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 && currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep((currentStep - 1) as any)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-700 rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <span>{currentStep === 3 ? 'Confirm & Book Appointment' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm"
            >
              Done & Return to Portal
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
