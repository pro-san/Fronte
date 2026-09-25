import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ReadingProgressBar } from './components/ReadingProgressBar';
import { Hero } from './components/Hero';
import { EmergencyTriageSection } from './components/EmergencyTriageSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { DoctorsDirectorySection } from './components/DoctorsDirectorySection';
import { VisitorGuideSection } from './components/VisitorGuideSection';
import { AppointmentModal } from './components/AppointmentModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { Footer } from './components/Footer';
import { Doctor } from './data/hospitalData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('all');

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedDoctor, setPreselectedDoctor] = useState<Doctor | null>(null);
  const [preselectedDeptId, setPreselectedDeptId] = useState<string>('');
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const handleNavigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = () => {
    setPreselectedDoctor(null);
    setPreselectedDeptId('');
    setIsBookingOpen(true);
  };

  const handleBookWithDoctor = (doc: Doctor) => {
    setPreselectedDoctor(doc);
    setPreselectedDeptId(doc.departmentId);
    setIsBookingOpen(true);
  };

  const handleSelectDepartmentForBooking = (deptId: string) => {
    setPreselectedDoctor(null);
    setPreselectedDeptId(deptId);
    setIsBookingOpen(true);
  };

  const handleFilterDoctorsByDept = (deptId: string) => {
    setSelectedDeptFilter(deptId);
    handleNavigateToSection('doctors');
  };

  const handleHeroSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Subtle Viewport Reading Progress Bar */}
      <ReadingProgressBar />

      {/* 3-Zone Strict Top Navigation Bar */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenPortal={() => setIsPortalOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigateToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearch={handleHeroSearch}
          onOpenBooking={handleOpenBooking}
          onNavigateToSection={handleNavigateToSection}
        />

        {/* Emergency Intake & Triage Care Navigator */}
        <EmergencyTriageSection
          onOpenBooking={handleOpenBooking}
          onSelectDoctorBySpecialty={handleFilterDoctorsByDept}
        />

        {/* Clinical Specialties & Institutes Bento Showcase */}
        <SpecialtiesSection
          onSelectDepartmentForBooking={handleSelectDepartmentForBooking}
          onFilterDoctorsByDept={handleFilterDoctorsByDept}
        />

        {/* Physicians & Specialists Directory */}
        <DoctorsDirectorySection
          onBookWithDoctor={handleBookWithDoctor}
          selectedDeptFilter={selectedDeptFilter}
          onSelectDeptFilter={setSelectedDeptFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Visitor Guide, Parking & On-Site Amenities */}
        <VisitorGuideSection />
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenPortal={() => setIsPortalOpen(true)}
        onNavigateToSection={handleNavigateToSection}
      />

      {/* 4-Step Interactive Appointment Booking Workflow Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctor={preselectedDoctor}
        preselectedDeptId={preselectedDeptId}
      />

      {/* MyHealth Patient Portal Modal */}
      <PatientPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        onOpenBooking={handleOpenBooking}
      />
    </div>
  );
}
