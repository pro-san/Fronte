import React, { useState } from 'react';
import { X, User, FileText, Pill, CreditCard, Calendar, CheckCircle2, AlertCircle, Download, Clock, ChevronRight } from 'lucide-react';
import { MOCK_PATIENT_LAB_RESULTS, PATIENT_PRESCRIPTIONS, LabResult } from '../data/hospitalData';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'labs' | 'prescriptions' | 'appointments' | 'billing'>('labs');
  const [refillStatus, setRefillStatus] = useState<{ [key: string]: boolean }>({});
  const [billPaid, setBillPaid] = useState(false);
  const [selectedLabReport, setSelectedLabReport] = useState<LabResult | null>(MOCK_PATIENT_LAB_RESULTS[0]);

  if (!isOpen) return null;

  const handleRequestRefill = (id: string) => {
    setRefillStatus(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
        
        {/* Top Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-white shadow-xs">
              JD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  MyHealth Patient Portal
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-teal-800 text-teal-200 px-2 py-0.5 rounded">
                  HIPAA Verified
                </span>
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Patient: <span className="font-semibold text-white">Jonathan Davis</span> · MRN: <span className="font-mono">#904-812-44</span> · DOB: May 14, 1978
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Segmented Controls) */}
        <div className="px-6 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('labs')}
            className={`px-3.5 py-1.5 font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'labs'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Diagnostic Lab & Imaging Reports</span>
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`px-3.5 py-1.5 font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'prescriptions'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Active Prescriptions & Refills</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-3.5 py-1.5 font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'appointments'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Visits & Follow-ups</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`px-3.5 py-1.5 font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'billing'
                ? 'bg-white text-teal-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Billing & Copay</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: LABS & IMAGING */}
          {activeTab === 'labs' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Reports List */}
              <div className="lg:col-span-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Recent Pathology & Diagnostics
                </div>
                {MOCK_PATIENT_LAB_RESULTS.map((report) => (
                  <div
                    key={report.id}
                    onClick={() => setSelectedLabReport(report)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedLabReport?.id === report.id
                        ? 'border-teal-700 bg-teal-50/30 ring-1 ring-teal-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {report.testName}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Ordered: {report.date}
                    </div>
                    <div className="flex items-center justify-between text-[11px] mt-2">
                      <span className="text-slate-600">{report.orderingDoctor}</span>
                      <span className="text-emerald-700 font-medium">Reviewed</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Report Detailed View */}
              {selectedLabReport && (
                <div className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {selectedLabReport.testName}
                      </h4>
                      <div className="text-xs text-slate-500">
                        Date: {selectedLabReport.date} · Reviewing Attending: {selectedLabReport.orderingDoctor}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-100 rounded-md">
                      Normal Result
                    </span>
                  </div>

                  {/* Parameters Table */}
                  <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Analyte / Biomarker</th>
                          <th className="py-2.5 px-3">Patient Value</th>
                          <th className="py-2.5 px-3">Reference Range</th>
                          <th className="py-2.5 px-3 text-right">Flag</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedLabReport.parameters.map((param, i) => (
                          <tr key={i} className="hover:bg-slate-50/50">
                            <td className="py-2 px-3 font-medium text-slate-900">{param.name}</td>
                            <td className="py-2 px-3 font-mono font-bold text-slate-800">{param.value}</td>
                            <td className="py-2 px-3 text-slate-500 font-mono">{param.range}</td>
                            <td className="py-2 px-3 text-right">
                              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Physician Notes */}
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                    <div className="font-bold text-slate-900 mb-1">Attending Physician Clinical Interpretation:</div>
                    <p className="leading-relaxed text-slate-600">{selectedLabReport.doctorNotes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRESCRIPTIONS */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Hospital Outpatient Prescriptions
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PATIENT_PRESCRIPTIONS.map((rx) => {
                  const isRequested = refillStatus[rx.id];

                  return (
                    <div key={rx.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{rx.medication}</h4>
                            <div className="text-xs text-teal-800 font-medium">{rx.dosage}</div>
                          </div>
                          <span className="px-2 py-0.5 text-[11px] font-semibold text-emerald-800 bg-emerald-100 rounded">
                            {rx.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 mt-3 space-y-1">
                          <div><strong>Instructions:</strong> {rx.frequency}</div>
                          <div><strong>Prescriber:</strong> {rx.prescriber}</div>
                          <div><strong>Refills Remaining:</strong> {rx.refillsRemaining}</div>
                          <div className="text-[11px] text-slate-400 mt-1">Dispensing: {rx.pharmacy}</div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-200">
                        {isRequested ? (
                          <div className="flex items-center gap-1.5 text-xs text-teal-800 font-bold bg-teal-50 p-2 rounded-lg border border-teal-200">
                            <CheckCircle2 className="w-4 h-4 text-teal-700" />
                            <span>Refill transmitted to Meridian Pharmacy (Ready in 2 hrs)</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRequestRefill(rx.id)}
                            className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                          >
                            Request 30-Day Refill
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: VISITS */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Scheduled Visits
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-700"
                >
                  Book New Visit
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                      Upcoming Consultation
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      Cardiology Follow-up with Dr. Sarah Lin, MD
                    </h4>
                    <div className="text-xs text-slate-500">
                      Meridian Heart & Vascular Institute · Pavilion A, Floor 3
                    </div>
                    <div className="text-xs font-semibold text-slate-800 mt-2">
                      Friday, Oct 2, 2026 at 10:30 AM
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold text-teal-800 bg-teal-100 rounded-md">
                    Confirmed
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Please arrive 15 minutes before appointment.</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert('Appointment reminder sent to your mobile phone.')}
                      className="text-teal-800 hover:text-teal-900 font-semibold"
                    >
                      Resend SMS Reminder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BILLING & COPAY */}
          {activeTab === 'billing' && (
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Outpatient Account Statement
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Visit Statement: Cardiac Diagnostic Ultrasound
                    </h4>
                    <div className="text-xs text-slate-500">Date of Service: Aug 14, 2026 · Claim #CLM-99214</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Copay Due</div>
                    <div className="text-xl font-bold font-mono text-slate-900">$35.00</div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Total Hospital Charges:</span>
                    <span className="font-mono">$840.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance Contract Adjustment (BlueCross):</span>
                    <span className="font-mono text-emerald-700">-$580.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance Paid:</span>
                    <span className="font-mono text-emerald-700">-$225.00</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-slate-200 text-slate-900">
                    <span>Patient Responsibility:</span>
                    <span className="font-mono">$35.00</span>
                  </div>
                </div>

                <div className="pt-2">
                  {billPaid ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Copay paid in full. Receipt #REC-7829 emailed to patient.</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setBillPaid(true)}
                      className="w-full py-2.5 bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
                    >
                      Pay $35.00 Copay via Card
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Need assistance? Call Patient Records: (555) 019-2111</span>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-slate-700 hover:text-slate-900"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
