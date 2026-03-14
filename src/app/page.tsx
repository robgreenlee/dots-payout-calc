import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { SCHOOLS, BOARD_MEMBERS, SITE_INFO, UPCOMING_EVENT } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green py-24 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">A World of Possibilities</h1>
          <p className="text-lg text-green-100 leading-relaxed mb-8 max-w-3xl mx-auto">
            Established in 2007, the Fore Our Schools Foundation grew from Moraga school parents
            wanting to create an event in which camaraderie, community support, and fun would
            generate funds for their schools. Parents representing the Moraga elementary schools,
            local merchants, and Moraga Country Club joined forces to create the 1st Annual Fore Our
            Schools Golf Tournament in 2008. The success and community camaraderie generated from the
            annual Fore Our Schools Golf Tournament led the parents to create other events in support
            of the Moraga School District and Moraga Education Foundation.
          </p>
          <Link
            href="/about"
            className="inline-block bg-brand-gold text-white font-semibold px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-16 px-4 bg-brand-green-light">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title={UPCOMING_EVENT.name} />
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-brand-green-dark font-semibold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {UPCOMING_EVENT.date}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {UPCOMING_EVENT.location}
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">{UPCOMING_EVENT.description}</p>
            <Link
              href="/events"
              className="inline-block bg-brand-green text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </section>

      {/* Our Schools */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Our Schools"
            subtitle="Fore Our Schools Foundation organizes community events to raise funds to support the Moraga Education Foundation (MEF) and the public schools within Moraga."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOOLS.map((school) => (
              <div
                key={school.name}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-brand-green-light rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-brand-green-dark">{school.name}</h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/about"
              className="text-brand-green font-semibold hover:text-brand-green-dark transition-colors"
            >
              Learn more about our schools &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Our Board of Directors" />
          <p className="text-center text-gray-600 mb-8 -mt-6">
            The {SITE_INFO.name} is a qualified 501(c)(3) not-for-profit organization and
            contributions are tax-deductible to the extent permitted by law (Tax ID#{" "}
            {SITE_INFO.taxId}).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BOARD_MEMBERS.map((member) => (
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
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/contact"
              className="text-brand-green font-semibold hover:text-brand-green-dark transition-colors"
            >
              Meet the full team &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading title="Location" />
          <p className="text-gray-600 text-lg mb-6">{SITE_INFO.address}</p>
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Fore Our Schools Foundation Location"
              src={`https://maps.google.com/maps?q=${SITE_INFO.mapCoords.lat},${SITE_INFO.mapCoords.lng}&z=15&output=embed`}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
