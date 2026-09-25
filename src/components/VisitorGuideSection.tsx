import React, { useState } from 'react';
import { Clock, Car, Coffee, ShieldCheck, MapPin, Phone, HelpCircle, ChevronRight } from 'lucide-react';
import { VISITOR_INFO } from '../data/hospitalData';

export const VisitorGuideSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visiting' | 'parking' | 'amenities'>('visiting');

  return (
    <section id="visitor" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Campus Information
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mt-2">
            Visitor Guidelines, Parking & Amenities
          </h2>
          <p className="text-slate-600 mt-2 text-base leading-relaxed">
            We are dedicated to providing a safe, restorative, and supportive environment for our patients, their families, and visiting loved ones.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mt-8 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('visiting')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'visiting'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Visiting Hours & Policies</span>
          </button>

          <button
            onClick={() => setActiveTab('parking')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'parking'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Parking & Campus Shuttles</span>
          </button>

          <button
            onClick={() => setActiveTab('amenities')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'amenities'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Dining & On-Site Amenities</span>
          </button>
        </div>

        {/* Tab 1: Visiting Hours */}
        {activeTab === 'visiting' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {VISITOR_INFO.visitingHours.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-800">
                    Clinical Unit
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {item.area}
                  </h3>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-teal-700" />
                    <span>{item.hours}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {item.guidelines}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Masks provided upon request</span>
                  <span className="font-semibold text-slate-700">Visitor Pass Required</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Parking */}
        {activeTab === 'parking' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {VISITOR_INFO.parking.map((lot, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold text-xs mb-3">
                    P{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {lot.name}
                  </h3>
                  <div className="text-xs text-teal-800 font-semibold mt-2">
                    {lot.rate}
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    EV Charging: {lot.evChargers}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/80 text-[11px] text-slate-600">
                  Automated ticket pay stations located at each elevator lobby.
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Amenities */}
        {activeTab === 'amenities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {VISITOR_INFO.amenities.map((amenity, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {amenity.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-700" />
                      {amenity.location}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-700">{amenity.hours}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {amenity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Visitor Assistance Box */}
        <div className="mt-10 p-6 bg-teal-50/60 border border-teal-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">
              Need Wheelchair Assistance or Campus Escort?
            </h4>
            <p className="text-xs text-slate-600">
              Our Patient Concierge team provides complimentary golf-cart shuttles, wheelchairs, and multilingual escort services at all entry porticos.
            </p>
          </div>
          <a
            href="tel:5550192000"
            className="px-4 py-2.5 bg-teal-800 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0 whitespace-nowrap"
          >
            Call Concierge: (555) 019-2000
          </a>
        </div>

      </div>
    </section>
  );
};
