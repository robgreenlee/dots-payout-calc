import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { SCHOOLS, SITE_INFO, RELATED_ORGS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-green-dark to-brand-green py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-green-100 text-lg">
            Building community through support for Moraga&apos;s schools since {SITE_INFO.foundedYear}.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Our Mission" />
          <div className="bg-brand-green-light rounded-xl p-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed italic">
              &ldquo;The Fore Our Schools Foundation organizes community events to raise funds to
              support the public schools within Moraga. Through these events, we foster community
              support and commitment to the education of our children.&rdquo;
            </p>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              The {SITE_INFO.name} is a qualified 501(c)(3) not-for-profit organization.
              Contributions are tax-deductible to the extent permitted by law.
            </p>
            <p className="text-sm text-gray-500 mt-2">Tax ID# {SITE_INFO.taxId}</p>
          </div>
        </div>
      </section>

      {/* Schools */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="Our Schools"
            subtitle="We proudly support the following schools in the Moraga community."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SCHOOLS.map((school) => (
              <div
                key={school.name}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-green-light rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-green-dark">{school.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Principal: {school.principal}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Organizations */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            title="Related Organizations"
            subtitle="We work closely with these organizations to support education in our community."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {RELATED_ORGS.map((org) => (
              <a
                key={org.name}
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md hover:border-brand-green transition-all group"
              >
                <h3 className="font-semibold text-brand-green-dark group-hover:text-brand-green transition-colors">
                  {org.name}
                </h3>
                <p className="text-sm text-brand-green mt-2">Visit website &rarr;</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
