import React from 'react';
import { ChevronLeft, MapPin } from 'lucide-react';
import { Link } from '../../lib/router';

interface PageHeroProps {
  kicker: string;
  title: string;
  description: string;
  image: string;
  crumb?: string;
  meta?: string;
}

export const PageHero: React.FC<PageHeroProps> = ({ kicker, title, description, image, crumb, meta }) => {
  return (
    <section className="relative min-h-[62vh] flex items-end overflow-hidden pt-36 pb-20">
      <div className="absolute inset-0 z-0">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(0,0,0,0.35)_78%)] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-3xl">
          <Link
            to={crumb ?? '/'}
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-3"
          >
            <ChevronLeft className="w-4 h-4" />
            {crumb ? 'Voltar' : 'Início'}
          </Link>

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur text-white text-[11px] font-bold uppercase tracking-[0.18em] mb-4">
            <MapPin className="w-3.5 h-3.5" />
            {kicker}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-4">
            {title}
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-2xl">{description}</p>

          {meta && (
            <span className="inline-flex mt-6 px-4 py-2 rounded-full bg-white/15 backdrop-blur text-white/90 text-xs font-semibold">
              {meta}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};