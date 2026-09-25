import React, { useState } from 'react';
import { ShieldAlert, Clock, AlertTriangle, Phone, CheckCircle2, ChevronRight, Navigation, RefreshCw, HeartPulse, Info } from 'lucide-react';
import { EMERGENCY_CAMPUSES, TRIAGE_CONDITIONS, EmergencyCampus, TriageCondition } from '../data/hospitalData';

interface EmergencyTriageSectionProps {
  onOpenBooking: () => void;
  onSelectDoctorBySpecialty?: (deptId: string) => void;
}

export const EmergencyTriageSection: React.FC<EmergencyTriageSectionProps> = ({
  onOpenBooking,
}) => {
  const [campuses, setCampuses] = useState<EmergencyCampus[]>(EMERGENCY_CAMPUSES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [selectedCampus, setSelectedCampus] = useState<EmergencyCampus>(EMERGENCY_CAMPUSES[0]);

  // Triage state
  const [selectedCondition, setSelectedCondition] = useState<TriageCondition>(TRIAGE_CONDITIONS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate slight variation in telemetry
      setCampuses(prev => prev.map(c => ({
        ...c,
        currentWaitMinutes: Math.max(2, c.currentWaitMinutes + (Math.random() > 0.5 ? 1 : -1))
      })));
      setIsRefreshing(false);
      setLastUpdated('Updated just now');
    }, 600);
  };

  const categories = ['All', 'Cardiovascular', 'Neurological', 'Respiratory', 'Pediatric', 'Orthopedic'];

  const filteredConditions = activeCategory === 'All'
    ? TRIAGE_CONDITIONS
    : TRIAGE_CONDITIONS.filter(c => c.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="emergency" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>Emergency Services & Rapid Triage</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">
            Real-Time Emergency Intake & Care Navigator
          </h2>
          <p className="text-slate-600 mt-2 text-base leading-relaxed">
            If you or a loved one is experiencing a life-threatening medical crisis, call 911 immediately. For urgent walk-in conditions, view live department wait times across our campuses below.
          </p>
        </div>

        {/* Live Wait Times Across Campuses */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="text-lg font-bold text-slate-900">
                  Live Emergency Department Wait Times
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Telemetry synchronized with clinical nurse triage stations across metropolitan facilities.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-mono">{lastUpdated}</span>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh Times</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {campuses.map((campus) => {
              const isSelected = selectedCampus.id === campus.id;
              const occupancyPercent = Math.round((campus.bedsOccupied / campus.totalBeds) * 100);

              return (
                <div
                  key={campus.id}
                  onClick={() => setSelectedCampus(campus)}
                  className={`p-5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-teal-700 bg-teal-50/30 ring-1 ring-teal-700 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {campus.type}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 rounded">
                      {campus.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">
                    {campus.name}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1">{campus.address}</div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl font-bold font-mono text-slate-900">
                        {campus.currentWaitMinutes} <span className="text-xs font-normal text-slate-500">mins</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Current triage wait</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-medium text-slate-700">
                        {occupancyPercent}%
                      </div>
                      <div className="text-[11px] text-slate-400">Capacity</div>
                    </div>
                  </div>

                  {/* Bed capacity progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${occupancyPercent > 85 ? 'bg-amber-500' : 'bg-teal-600'}`}
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <span className="text-slate-600 font-mono text-[11px]">{campus.contactNumber}</span>
                    <span className="text-teal-700 font-medium inline-flex items-center gap-0.5">
                      Details <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Campus Quick Actions Bar */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-900">
                Selected Facility: {selectedCampus.name}
              </div>
              <div className="text-xs text-slate-500">
                Designation: <span className="font-medium text-slate-700">{selectedCampus.traumaLevel}</span> · Direct line: <span className="font-mono text-slate-700">{selectedCampus.contactNumber}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${selectedCampus.contactNumber.replace(/[^0-9]/g, '')}`}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>Call Emergency Desk</span>
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedCampus.name + ' ' + selectedCampus.address)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Triage & Symptom Care Navigator */}
        <div className="mt-12">
          <div className="border-t border-slate-200 pt-10">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                Clinical Decision Support
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Symptom & Care Navigator
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Select your presenting symptoms to determine the most clinically appropriate level of care (Emergency, Urgent Care, or Outpatient Specialist).
              </p>
            </div>

            {/* Category Filter Pills (Functional Buttons) */}
            <div className="flex flex-wrap items-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Triage Grid: Condition selector + Clinical Guidance Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              
              {/* Left Column: Symptom list */}
              <div className="lg:col-span-5 space-y-2">
                {filteredConditions.map((condition) => {
                  const isCurrent = selectedCondition.id === condition.id;
                  const isCrit = condition.urgency === 'critical';
                  const isUrg = condition.urgency === 'urgent';

                  return (
                    <button
                      key={condition.id}
                      onClick={() => setSelectedCondition(condition)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'border-teal-700 bg-white ring-2 ring-teal-700/20 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1 pr-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCrit ? 'bg-rose-500' : isUrg ? 'bg-amber-500' : 'bg-teal-500'
                            }`}
                          />
                          <span className="text-xs font-medium text-slate-500">
                            {condition.category}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {condition.symptomTitle}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 ${isCurrent ? 'text-teal-700' : ''}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Triage Assessment & Protocol */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-teal-700" />
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Triage Assessment Recommendation
                      </span>
                    </div>

                    {/* Urgency Indicator */}
                    <div className="flex items-center gap-2">
                      {selectedCondition.urgency === 'critical' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-rose-800 bg-rose-100 rounded-md">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Emergency Level 1
                        </span>
                      )}
                      {selectedCondition.urgency === 'urgent' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-amber-800 bg-amber-100 rounded-md">
                          Urgent Care Needed
                        </span>
                      )}
                      {selectedCondition.urgency === 'routine' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-teal-800 bg-teal-100 rounded-md">
                          Outpatient Clinic
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-4">
                    {selectedCondition.symptomTitle}
                  </h3>

                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                    {selectedCondition.guidance}
                  </p>

                  {/* Red flags warning box */}
                  <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                      Critical Red Flags to Watch:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedCondition.redFlags.map((flag, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold leading-none mt-0.5">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                    <Info className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>
                      Recommended Unit: <strong className="text-slate-800">{selectedCondition.recommendedDepartment}</strong>
                    </span>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Clinical guidance protocol approved by Meridian Emergency Medicine Board.
                  </div>

                  {selectedCondition.urgency === 'critical' ? (
                    <a
                      href="tel:911"
                      className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg shadow-sm transition-colors text-center inline-flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call 911 Immediately</span>
                    </a>
                  ) : (
                    <button
                      onClick={onOpenBooking}
                      className="w-full sm:w-auto px-6 py-2.5 bg-teal-800 hover:bg-teal-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors text-center inline-flex items-center justify-center gap-2"
                    >
                      <span>{selectedCondition.actionText}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
