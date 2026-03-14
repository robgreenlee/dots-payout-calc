import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { SITE_INFO, BOARD_MEMBERS, ADDITIONAL_DIRECTORS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const allMembers = [
    ...BOARD_MEMBERS.map((m) => ({ ...m, type: "Officer" as const })),
    ...ADDITIONAL_DIRECTORS.map((m) => ({ ...m, type: "Director" as const })),
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-green-dark to-brand-green py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-green-100 text-lg">
            We&apos;d love to hear from you. Reach out to get involved!
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Info cards */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-green-light rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-green-dark">Address</h3>
                    <p className="text-gray-600 mt-1">{SITE_INFO.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-green-light rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-green-dark">Email</h3>
                    <a
                      href={`mailto:${SITE_INFO.email}`}
                      className="text-brand-green hover:text-brand-green-dark transition-colors mt-1 inline-block"
                    >
                      {SITE_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-brand-green-light rounded-xl p-6">
                <p className="text-sm text-gray-600">
                  The {SITE_INFO.name} is a volunteer driven organization that organizes and hosts
                  events to raise money for MEF and local schools. As a qualified 501(c)(3)
                  not-for-profit organization, contributions are tax-deductible to the extent
                  permitted by law (Tax ID# {SITE_INFO.taxId}).
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-md h-[350px] md:h-full min-h-[300px]">
              <iframe
                title="Fore Our Schools Foundation Location"
                src={`https://maps.google.com/maps?q=${SITE_INFO.mapCoords.lat},${SITE_INFO.mapCoords.lng}&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="Board of Directors"
            subtitle="2024/2025 Board Leadership"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-6 shadow-sm text-center"
              >
                <div className="w-14 h-14 bg-brand-green-light rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-green font-bold text-lg">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-brand-green-dark">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
                <span className="inline-block mt-2 text-xs bg-brand-green-light text-brand-green px-2 py-1 rounded-full">
                  {member.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
