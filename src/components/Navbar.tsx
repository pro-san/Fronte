import React, { useState } from 'react';
import { Phone, Calendar, Clock, Menu, X, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenPortal: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenPortal,
  activeSection,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Emergency Notice Ribbon */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium">Level 1 Trauma & Emergency Intake:</span>
            <span className="text-slate-300">Main Campus Average ER Wait:</span>
            <span className="font-semibold text-emerald-300">12 Mins</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <span>Ambulance Bay Direct: (555) 019-2000</span>
            <span aria-hidden="true">·</span>
            <span>24/7 Nurse Advice Line: (555) 019-2999</span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single element wordmark */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-md"
        >
          <div className="w-10 h-10 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xl tracking-tight shadow-sm group-hover:bg-teal-700 transition-colors">
            M
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
              Meridian Medical Center
            </div>
            <div className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
              University Hospital & Health System
            </div>
          </div>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('specialties')}
            className={`transition-colors hover:text-teal-900 ${activeSection === 'specialties' ? 'text-teal-800 font-semibold' : ''}`}
          >
            Specialties
          </button>
          <button
            onClick={() => handleNavClick('doctors')}
            className={`transition-colors hover:text-teal-900 ${activeSection === 'doctors' ? 'text-teal-800 font-semibold' : ''}`}
          >
            Find a Doctor
          </button>
          <button
            onClick={() => handleNavClick('emergency')}
            className={`transition-colors hover:text-teal-900 ${activeSection === 'emergency' ? 'text-teal-800 font-semibold' : ''}`}
          >
            Emergency & Triage
          </button>
          <button
            onClick={() => handleNavClick('visitor')}
            className={`transition-colors hover:text-teal-900 ${activeSection === 'visitor' ? 'text-teal-800 font-semibold' : ''}`}
          >
            Visitor & Campus
          </button>
          <button
            onClick={onOpenPortal}
            className="transition-colors hover:text-teal-900 flex items-center gap-1.5"
          >
            Patient Portal
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:5550192000"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors whitespace-nowrap"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Emergency 24/7</span>
          </a>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-700 active:bg-teal-900 transition-colors shadow-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="p-2 text-teal-800 hover:bg-teal-50 rounded-md"
            title="Book Appointment"
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-md"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('specialties')}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-md"
            >
              Clinical Specialties & Institutes
            </button>
            <button
              onClick={() => handleNavClick('doctors')}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-md"
            >
              Physician & Specialist Directory
            </button>
            <button
              onClick={() => handleNavClick('emergency')}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-md"
            >
              Emergency Department & Triage
            </button>
            <button
              onClick={() => handleNavClick('visitor')}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-md"
            >
              Visitor Guide & Campus Locations
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPortal();
              }}
              className="text-left py-2 px-3 hover:bg-slate-50 rounded-md text-teal-800 font-semibold"
            >
              MyHealth Patient Portal
            </button>
          </div>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-teal-800 rounded-lg hover:bg-teal-700"
            >
              Book Appointment Online
            </button>
            <a
              href="tel:5550192000"
              className="w-full py-2 text-center text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg"
            >
              Call Emergency Dept: (555) 019-2000
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
