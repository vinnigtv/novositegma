import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
}) => {
  const isCenter = align === 'center';
  const titleColor = tone === 'dark' ? 'text-olive-deep' : 'text-white';
  const textColor = tone === 'dark' ? 'text-muted' : 'text-white/80';
  const eyebrowColor = tone === 'dark' ? 'bg-olive-soft text-olive-deep' : 'bg-white/15 text-white';

  return (
    <div className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] ${eyebrowColor} mb-4`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-umber" />
          {eyebrow}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.12] ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${textColor}`}>{description}</p>
      )}
    </div>
  );
};