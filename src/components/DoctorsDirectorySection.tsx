import React, { useState, useMemo } from 'react';
import { Search, Star, Video, UserCheck, Calendar, Filter, Check, Award, GraduationCap, X, ChevronRight } from 'lucide-react';
import { DOCTORS, DEPARTMENTS, Doctor } from '../data/hospitalData';

interface DoctorsDirectorySectionProps {
  onBookWithDoctor: (doctor: Doctor) => void;
  selectedDeptFilter: string;
  onSelectDeptFilter: (deptId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const DoctorsDirectorySection: React.FC<DoctorsDirectorySectionProps> = ({
  onBookWithDoctor,
  selectedDeptFilter,
  onSelectDeptFilter,
  searchQuery,
  onSearchChange,
}) => {
  const [telehealthOnly, setTelehealthOnly] = useState(false);
  const [newPatientsOnly, setNewPatientsOnly] = useState(false);
  const [selectedDoctorModal, setSelectedDoctorModal] = useState<Doctor | null>(null);

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Dept filter
      if (selectedDeptFilter && selectedDeptFilter !== 'all') {
        if (doc.departmentId !== selectedDeptFilter) return false;
      }
      // Telehealth
      if (telehealthOnly && !doc.telehealthAvailable) return false;
      // New patients
      if (newPatientsOnly && !doc.acceptsNewPatients) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesDept = doc.departmentName.toLowerCase().includes(query);
        const matchesFocus = doc.clinicalFocus.some(f => f.toLowerCase().includes(query));
        const matchesBio = doc.biography.toLowerCase().includes(query);
        if (!matchesName && !matchesDept && !matchesFocus && !matchesBio) return false;
      }
      return true;
    });
  }, [selectedDeptFilter, telehealthOnly, newPatientsOnly, searchQuery]);

  return (
    <section id="doctors" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Medical Staff & Faculty
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
            Find a Physician or Subspecialist
          </h2>
          <p className="text-slate-600 mt-2 text-base leading-relaxed">
            Our medical staff comprises university faculty, board-certified surgeons, and clinical researchers committed to personalized patient care.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter by name, condition, or procedure..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Department Dropdown Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedDeptFilter}
                onChange={(e) => onSelectDeptFilter(e.target.value)}
                aria-label="Filter by Institute or Specialty"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700"
              >
                <option value="all">All Specialties & Institutes</option>
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={telehealthOnly}
                  onChange={(e) => setTelehealthOnly(e.target.checked)}
                  className="rounded text-teal-700 focus:ring-teal-700"
                />
                <span>Telehealth</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={newPatientsOnly}
                  onChange={(e) => setNewPatientsOnly(e.target.checked)}
                  className="rounded text-teal-700 focus:ring-teal-700"
                />
                <span>New Patients</span>
              </label>
            </div>

          </div>

          {/* Active filters indicators */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div>
              Showing <span className="font-semibold text-slate-800 tabular-nums">{filteredDoctors.length}</span> physicians matching criteria
            </div>
            {(selectedDeptFilter !== 'all' || searchQuery || telehealthOnly || newPatientsOnly) && (
              <button
                onClick={() => {
                  onSelectDeptFilter('all');
                  onSearchChange('');
                  setTelehealthOnly(false);
                  setNewPatientsOnly(false);
                }}
                className="text-teal-800 hover:text-teal-900 font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredDoctors.map((doc) => {
            const initials = doc.name.replace('Dr. ', '').split(' ').slice(0, 2).map(n => n[0]).join('');

            return (
              <div
                key={doc.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Doctor Card Top */}
                  <div className="flex items-start gap-4">
                    {/* Visual Avatar Container with CSS Fallback */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-800 to-slate-800 text-white flex items-center justify-center font-bold text-lg shadow-xs shrink-0">
                      {initials}
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {doc.name}
                      </h3>
                      <div className="text-xs text-teal-800 font-medium truncate">
                        {doc.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {doc.departmentName}
                      </div>
                    </div>
                  </div>

                  {/* Zero-Pill Unboxed Metadata */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                    <span className="font-semibold text-slate-800 flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
                      {doc.rating}
                    </span>
                    <span>({doc.reviewCount} reviews)</span>
                    <span aria-hidden="true">·</span>
                    <span>{doc.experienceYears} yrs experience</span>
                  </div>

                  {/* Clinical Focus List */}
                  <div className="mt-3">
                    <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
                      Clinical Focus:
                    </div>
                    <div className="flex flex-wrap gap-1 text-xs text-slate-600">
                      {doc.clinicalFocus.slice(0, 3).map((focus, i) => (
                        <span key={i} className="inline-block text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Availability indicators */}
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Next Availability:</span>
                      <span className="font-medium text-slate-800">
                        {doc.availableSlots[0] ? `${doc.availableSlots[0].date} at ${doc.availableSlots[0].time}` : 'Contact Office'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                      {doc.telehealthAvailable && (
                        <span className="inline-flex items-center gap-1 text-teal-700">
                          <Video className="w-3 h-3" /> Telehealth
                        </span>
                      )}
                      {doc.acceptsNewPatients && (
                        <span className="inline-flex items-center gap-1 text-emerald-700">
                          <UserCheck className="w-3 h-3" /> Accepting New Patients
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDoctorModal(doc)}
                    className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-center"
                  >
                    View Credentials
                  </button>
                  <button
                    onClick={() => onBookWithDoctor(doc)}
                    className="flex-1 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-700 rounded-lg transition-colors shadow-xs text-center inline-flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>Book Visit</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 mt-8 p-8">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 mt-3">No Physicians Match Your Search</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Try adjusting your specialty filter or clearing specific requirements such as telehealth or new patients.
            </p>
            <button
              onClick={() => {
                onSelectDeptFilter('all');
                onSearchChange('');
                setTelehealthOnly(false);
                setNewPatientsOnly(false);
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
            >
              Reset Search Criteria
            </button>
          </div>
        )}

      </div>

      {/* Doctor Detailed Credentials Modal */}
      {selectedDoctorModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
            
            {/* Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-800 to-slate-800 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
                  {selectedDoctorModal.name.replace('Dr. ', '').split(' ').slice(0, 2).map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedDoctorModal.name}
                  </h3>
                  <div className="text-xs text-teal-800 font-semibold mt-0.5">
                    {selectedDoctorModal.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {selectedDoctorModal.hospitalAffiliation}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoctorModal(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Physician Biography & Clinical Practice
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedDoctorModal.biography}
                </p>
              </div>

              {/* Education & Qualifications */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                <div>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-teal-700" />
                    <span>Education & Fellowship Training</span>
                  </div>
                  <div className="text-slate-600 mt-1 pl-5">
                    {selectedDoctorModal.education}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-teal-700" />
                    <span>Board Certifications</span>
                  </div>
                  <div className="text-slate-600 mt-1 pl-5">
                    {selectedDoctorModal.qualifications}
                  </div>
                </div>
              </div>

              {/* Clinical Focus Areas */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Specialized Clinical Focus
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDoctorModal.clinicalFocus.map((focus, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-medium">
                      {focus}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages & Telehealth */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-500 font-medium">Languages Spoken</div>
                  <div className="text-slate-800 font-semibold mt-1">
                    {selectedDoctorModal.languages.join(', ')}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-500 font-medium">Patient Satisfaction Score</div>
                  <div className="text-slate-800 font-semibold mt-1 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{selectedDoctorModal.rating} / 5.0 ({selectedDoctorModal.reviewCount} verified reviews)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Next Open Slot: <strong className="text-slate-800">{selectedDoctorModal.availableSlots[0]?.date}</strong>
              </span>
              <button
                onClick={() => {
                  const doc = selectedDoctorModal;
                  setSelectedDoctorModal(null);
                  onBookWithDoctor(doc);
                }}
                className="px-5 py-2.5 bg-teal-800 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
              >
                Schedule Appointment with {selectedDoctorModal.name}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
