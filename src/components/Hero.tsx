import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, HeartPulse, Clock, Sparkles, MapPin } from 'lucide-react';
import { EMERGENCY_CAMPUSES } from '../data/hospitalData';

interface HeroProps {
  onSearch: (query: string) => void;
  onOpenBooking: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onOpenBooking,
  onNavigateToSection
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const mainCampus = EMERGENCY_CAMPUSES[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      onNavigateToSection('doctors');
    }
  };

  const quickSearches = ['Cardiology', 'Neurology', 'Pediatric Urgent Care', 'Orthopedic Surgery', 'Oncology'];

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-teal-300">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              <span>Tertiary Academic Health System</span>
              <span className="text-slate-500">·</span>
              <span>Level 1 Adult & Pediatric Trauma</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Advanced Clinical Care.
              <span className="block text-teal-200 font-serif-clinical italic font-normal">
                Pioneering Tomorrow’s Medicine.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Serving the metropolitan community with nationally ranked cardiovascular surgery, comprehensive oncology, robotic neurosurgery, and around-the-clock emergency trauma response.
            </p>

            {/* Quick Care Search Bar */}
            <form onSubmit={handleSearchSubmit} className="pt-2 max-w-xl">
              <div className="relative flex items-center bg-white rounded-xl shadow-lg p-1.5 focus-within:ring-2 focus-within:ring-teal-400">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by physician, condition, or specialty (e.g. Heart, Dr. Lin)..."
                  className="w-full bg-transparent px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-teal-800 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick links */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
                <span>Frequent searches:</span>
                {quickSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchTerm(term);
                      onSearch(term);
                      onNavigateToSection('doctors');
                    }}
                    className="hover:text-teal-300 underline underline-offset-2 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-5 py-3 text-sm font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Schedule an Appointment</span>
                <ArrowRight className="w-4 h-4 text-teal-700" />
              </button>

              <button
                onClick={() => onNavigateToSection('emergency')}
                className="px-5 py-3 text-sm font-medium text-slate-200 border border-slate-700 hover:border-slate-500 rounded-lg hover:bg-slate-800/60 transition-colors inline-flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-teal-300" />
                <span>Emergency Triage & Wait Times</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Clinical Status Card & Hospital Snapshot */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live ER Wait Meter Card */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    Live Emergency Status
                  </span>
                </div>
                <span className="text-xs text-slate-400">Telemetry Active</span>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <div className="text-3xl font-bold font-mono tracking-tight text-white">
                    {mainCampus.currentWaitMinutes} <span className="text-base font-normal text-slate-300">Minutes</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Average triage wait time today</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-emerald-300">Normal Intake</div>
                  <div className="text-xs text-slate-400 font-mono">
                    {mainCampus.bedsOccupied}/{mainCampus.totalBeds} Beds Occupied
                  </div>
                </div>
              </div>

              {/* Occupancy Bar */}
              <div className="w-full bg-slate-700 rounded-full h-2 mt-4 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-2 rounded-full transition-all duration-700"
                  style={{ width: `${(mainCampus.bedsOccupied / mainCampus.totalBeds) * 100}%` }}
                />
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>800 Hospital Way (Main Campus)</span>
                </div>
                <button
                  onClick={() => onNavigateToSection('emergency')}
                  className="text-teal-300 hover:text-teal-200 font-medium underline underline-offset-2"
                >
                  View All 4 Campuses
                </button>
              </div>
            </div>

            {/* Clinical Trust Credentials */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <div className="text-slate-400 font-medium">U.S. News Ranking</div>
                <div className="text-white font-semibold text-sm mt-1">Top 50 Medical Center</div>
                <div className="text-slate-400 mt-1">High Performing in 14 Adult Specialties</div>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                <div className="text-slate-400 font-medium">Magnet® Recognized</div>
                <div className="text-white font-semibold text-sm mt-1">Nursing Excellence</div>
                <div className="text-slate-400 mt-1">Top 8% of American Hospitals</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
