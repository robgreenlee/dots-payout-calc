import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { SITE_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gallery",
};

function GalleryPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-brand-green-light rounded-lg aspect-[4/3] flex items-center justify-center">
      <div className="text-center p-4">
        <svg className="w-10 h-10 text-brand-green mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm text-green-700">{label}</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-green-dark to-brand-green py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Gallery</h1>
          <p className="text-green-100 text-lg">
            Memories from our annual golf tournaments and community events.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-green-light rounded-xl p-8 text-center mb-16">
            <p className="text-gray-700 leading-relaxed">
              Our 1st Annual Fore Our Schools Golf Tournament was in 2008, and since then we have
              had great success and turnout year after year. Browse through our galleries below to
              see highlights from previous events.
            </p>
          </div>

          {/* 2023 */}
          <div className="mb-16">
            <SectionHeading title="2023 Tournament" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <GalleryPlaceholder label="Tournament Day 2023" />
              <GalleryPlaceholder label="On the Green" />
              <GalleryPlaceholder label="Awards Ceremony" />
              <GalleryPlaceholder label="Silent Auction" />
              <GalleryPlaceholder label="Team Photos" />
              <GalleryPlaceholder label="Community Fun" />
            </div>
          </div>

          {/* 2022 */}
          <div className="mb-16">
            <SectionHeading title="2022 Tournament" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <GalleryPlaceholder label="Tournament Day 2022" />
              <GalleryPlaceholder label="Driving Range" />
              <GalleryPlaceholder label="Awards Dinner" />
              <GalleryPlaceholder label="Sponsors" />
              <GalleryPlaceholder label="Players" />
              <GalleryPlaceholder label="Highlights" />
            </div>
          </div>

          {/* Previous Years */}
          <div className="mb-16">
            <SectionHeading title="Previous Years" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <GalleryPlaceholder label="2021 Highlights" />
              <GalleryPlaceholder label="2020 Memories" />
              <GalleryPlaceholder label="2019 Tournament" />
              <GalleryPlaceholder label="Earlier Years" />
              <GalleryPlaceholder label="Community Events" />
              <GalleryPlaceholder label="Throwbacks" />
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-brand-green-dark mb-3">
              Share Your Photos!
            </h3>
            <p className="text-gray-600 mb-4">
              Please send us pictures that you might have captured from our previous events.
            </p>
            <a
              href={`mailto:${SITE_INFO.email}`}
              className="inline-block bg-brand-green text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
            >
              Email Us Your Photos
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
