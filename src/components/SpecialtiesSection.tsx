import React, { useState } from 'react';
import { Heart, Brain, Activity, Bone, Baby, Shield, ArrowRight, X, Phone, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { DEPARTMENTS, Department } from '../data/hospitalData';

interface SpecialtiesSectionProps {
  onSelectDepartmentForBooking: (deptId: string) => void;
  onFilterDoctorsByDept: (deptId: string) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  onSelectDepartmentForBooking,
  onFilterDoctorsByDept
}) => {
  const [activeModalDept, setActiveModalDept] = useState<Department | null>(null);

  const getIconForDept = (id: string) => {
    switch (id) {
      case 'cardiovascular':
        return <Heart className="w-5 h-5 text-rose-600" />;
      case 'neurology':
        return <Brain className="w-5 h-5 text-blue-600" />;
      case 'oncology':
        return <Activity className="w-5 h-5 text-purple-600" />;
      case 'orthopedics':
        return <Bone className="w-5 h-5 text-emerald-600" />;
      case 'pediatrics':
        return <Baby className="w-5 h-5 text-amber-600" />;
      case 'maternal':
        return <Shield className="w-5 h-5 text-teal-600" />;
      default:
        return <Activity className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="specialties" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Centers of Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
              Tertiary Institutes & Clinical Specialties
            </h2>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              Multi-disciplinary clinical care teams partnering across specialized surgical pavilions, high-resolution diagnostic imaging, and university clinical research trials.
            </p>
          </div>

          <div className="text-sm text-slate-500 font-medium">
            <span>6 Major Institutes</span>
            <span className="mx-2">·</span>
            <span>42 Subspecialty Divisions</span>
          </div>
        </div>

        {/* Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {DEPARTMENTS.map((dept, index) => {
            const isMarquee = index === 0 || index === 1;

            return (
              <div
                key={dept.id}
                className={`group bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-7 transition-all flex flex-col justify-between hover:shadow-md ${
                  isMarquee ? 'lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-xs">
                      {getIconForDept(dept.id)}
                    </div>
                    <span className="text-xs text-slate-600 font-medium">{dept.location}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-5 group-hover:text-teal-900 transition-colors">
                    {dept.name}
                  </h3>

                  <p className="text-xs text-teal-800 font-medium mt-1">
                    {dept.tagline}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                    {dept.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-5 pt-4 border-t border-slate-200/60">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2">
                      Key Interventions & Programs
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {dept.procedures.slice(0, 3).map((proc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                          <span className="truncate">{proc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalDept(dept)}
                    className="text-xs font-semibold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1 group-hover:underline underline-offset-2"
                  >
                    <span>View Institute Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      onFilterDoctorsByDept(dept.id);
                      const docSection = document.getElementById('doctors');
                      docSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs text-slate-500 hover:text-slate-900 font-medium"
                  >
                    View Specialists →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Department Detail Modal */}
      {activeModalDept && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in duration-200">
            
            {/* Modal Header */}
            <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
                  {getIconForDept(activeModalDept.id)}
                  <span>Institute Overview</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {activeModalDept.name}
                </h3>
                <div className="text-xs text-slate-500 mt-1">
                  Chaired by <span className="font-semibold text-slate-800">{activeModalDept.director}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveModalDept(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Clinical Mission & Scope
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeModalDept.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Specialized Procedures & Clinical Programs
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeModalDept.procedures.map((proc, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                      <span>{proc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Advanced Medical Technology & Suites
                </h4>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {activeModalDept.technology.map((tech, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-teal-700 font-bold">•</span>
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location & Hours */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="space-y-1">
                  <div className="text-slate-600 font-medium">Campus Location</div>
                  <div className="font-semibold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-700" />
                    <span>{activeModalDept.location}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-600 font-medium">Direct Scheduling Line</div>
                  <div className="font-mono font-semibold text-slate-800 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-teal-700" />
                    <span>{activeModalDept.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  const deptId = activeModalDept.id;
                  setActiveModalDept(null);
                  onFilterDoctorsByDept(deptId);
                  const docSection = document.getElementById('doctors');
                  docSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Browse Specialists
              </button>
              <button
                onClick={() => {
                  const deptId = activeModalDept.id;
                  setActiveModalDept(null);
                  onSelectDepartmentForBooking(deptId);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
              >
                Book Appointment in this Institute
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
