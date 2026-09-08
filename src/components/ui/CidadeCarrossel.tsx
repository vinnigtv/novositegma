import React, { useState } from 'react';
import { getSlidesCidade } from '../../lib/db';
import { Carrossel } from './Carrossel';
import { SectionHeading } from './SectionHeading';

export const CidadeCarrossel: React.FC = () => {
  const slides = getSlidesCidade();
  const [atual, setAtual] = useState(0);

  if (slides.length === 0) return null;

  const idx = Math.min(atual, slides.length - 1);
  const slide = slides[idx];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading align="center" eyebrow="Galeria da cidade" title="Um passeio por imagens" />

        <div className="relative mt-12 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-olive/20">
          <Carrossel
            fotos={slides.map((s) => s.imagem)}
            alt=""
            autoplay
            className="h-[340px] sm:h-[500px]"
            onChange={setAtual}
          />

          {/* Grau/scrim para o texto sobressair */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent pointer-events-none" />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-umber-soft mb-2 [text-shadow:0_1px_6px_rgba(0,0,0,0.55)]">
              Foto {idx + 1} de {slides.length}
            </p>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-2 [text-shadow:0_3px_20px_rgba(0,0,0,0.65)]">
              {slide.titulo}
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
              {slide.legenda}
            </p>

            <div className="flex items-center gap-1.5 mt-5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setAtual(i)}
                  aria-label={s.titulo}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === idx ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};