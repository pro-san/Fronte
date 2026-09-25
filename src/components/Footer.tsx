import React from 'react';
import { Phone, Shield, ShieldCheck, Heart, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenPortal,
  onNavigateToSection
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      
      {/* Upper Footer: Emergency & Main Access */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-lg">
                M
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-tight">
                  Meridian Medical Center
                </div>
                <div className="text-[11px] text-teal-400 font-medium">
                  University Hospital & Health System
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A comprehensive academic healthcare center delivering quaternary medicine, Level 1 adult and pediatric trauma, and clinical research.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>800 Hospital Way, Medical District</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>Main Operator: (555) 019-2000</span>
              </div>
            </div>
          </div>

          {/* Col 2: Clinical Institutes */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Clinical Institutes
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateToSection('specialties')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Heart & Vascular Institute
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('specialties')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Neurological Sciences & Stroke Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('specialties')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Comprehensive Cancer Institute
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('specialties')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Orthopedic & Joint Reconstruction
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('specialties')}
                  className="hover:text-teal-300 transition-colors"
                >
                  Pediatric & Neonatal Intensive Care
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Patients & Visitors */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Patients & Visitors
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenPortal}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  MyHealth Patient Portal & Records
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('visitor')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Visiting Hours & Hospital Guidelines
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('visitor')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Campus Parking & EV Charging
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Schedule Outpatient Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToSection('emergency')}
                  className="hover:text-teal-300 transition-colors text-left"
                >
                  Emergency Intake & Wait Times
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Accreditation & Emergency Hotlines */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Emergency Hotlines
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
              <div>
                <div className="text-[11px] text-rose-400 font-bold uppercase">
                  Life-Threatening Emergency
                </div>
                <div className="text-white font-mono font-bold text-sm">
                  Call 911
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] text-slate-400">
                  24/7 Nurse Advice Triage Line
                </div>
                <div className="text-teal-300 font-mono font-semibold">
                  (555) 019-2999
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-1">
              Accredited by The Joint Commission · Level 1 Trauma Center · Magnet® Recognized for Nursing Excellence
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Rights Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <div>
          © {new Date().getFullYear()} Meridian Medical Center & University Health System. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <span>Notice of Privacy Practices (HIPAA)</span>
          <span aria-hidden="true">·</span>
          <span>Non-Discrimination Policy</span>
          <span aria-hidden="true">·</span>
          <span>Language Assistance (200+ Languages)</span>
          <span aria-hidden="true">·</span>
          <span>Patient Bill of Rights</span>
        </div>
      </div>

    </footer>
  );
};
