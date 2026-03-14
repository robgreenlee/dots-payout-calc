import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { UPCOMING_EVENT, SITE_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-green-dark to-brand-green py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Events</h1>
          <p className="text-green-100 text-lg">
            Join us for community events that support Moraga&apos;s schools.
          </p>
        </div>
      </section>

      {/* Upcoming Event */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title={UPCOMING_EVENT.name} />

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            {/* Event banner */}
            <div className="bg-brand-green-light p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-brand-green-dark">{UPCOMING_EVENT.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-brand-green-dark">{UPCOMING_EVENT.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event details */}
            <div className="p-8">
              <p className="text-gray-700 leading-relaxed mb-8">{UPCOMING_EVENT.description}</p>

              {/* Schedule */}
              <h3 className="text-xl font-bold text-brand-green-dark mb-4">Event Schedule</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-gold rounded-full" />
                  <span className="text-gray-700">
                    <strong>{UPCOMING_EVENT.checkIn}</strong> &mdash; Check-in with driving range
                    access and silent auction
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-gold rounded-full" />
                  <span className="text-gray-700">
                    <strong>{UPCOMING_EVENT.shotgunStart}</strong> &mdash; Shotgun start with lunch
                    provided on course
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-gold rounded-full" />
                  <span className="text-gray-700">
                    <strong>After Play</strong> &mdash; Reception with food, silent auction, and
                    prize awards
                  </span>
                </div>
              </div>

              {/* Registration CTA */}
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <a
                  href={UPCOMING_EVENT.registrationUrl}
                  className="inline-block bg-brand-gold text-white font-semibold px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors text-lg"
                >
                  Register Now
                </a>
                <p className="text-sm text-gray-500 mt-3">
                  Clear your calendar and plan to attend!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="Sponsorship Opportunities"
            subtitle="Support our schools and gain visibility in the community."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-brand-gold">
              <div className="text-center mb-4">
                <span className="inline-block bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Featured
                </span>
              </div>
              <h3 className="text-xl font-bold text-brand-green-dark text-center">
                {UPCOMING_EVENT.sponsorship.eagle.name}
              </h3>
              <p className="text-3xl font-bold text-brand-gold text-center mt-2">
                {UPCOMING_EVENT.sponsorship.eagle.price}
              </p>
              <p className="text-gray-600 text-center mt-3">
                {UPCOMING_EVENT.sponsorship.eagle.includes}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-brand-green-dark mb-3">
                Auction Donations
              </h3>
              <p className="text-gray-600 mb-4">
                We actively seek auction items including sports memorabilia, vacation packages,
                unique experiences, and golf-related goods. No donation is too small or too quirky!
              </p>
              <a
                href={`mailto:${SITE_INFO.email}`}
                className="text-brand-green font-semibold hover:text-brand-green-dark transition-colors"
              >
                Contact us to donate &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading title="Our Tournament History" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-brand-green-light rounded-xl p-6">
              <p className="text-3xl font-bold text-brand-green-dark">$500K+</p>
              <p className="text-sm text-gray-600 mt-1">Total raised for MEF</p>
            </div>
            <div className="bg-brand-green-light rounded-xl p-6">
              <p className="text-3xl font-bold text-brand-green-dark">18</p>
              <p className="text-sm text-gray-600 mt-1">Years of tournaments</p>
            </div>
            <div className="bg-brand-green-light rounded-xl p-6">
              <p className="text-3xl font-bold text-brand-green-dark">5</p>
              <p className="text-sm text-gray-600 mt-1">Schools supported</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
