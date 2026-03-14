interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold text-brand-green-dark">{title}</h2>
      <div className="mt-3 w-16 h-1 bg-brand-gold rounded-full mx-auto" />
      {subtitle && <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
