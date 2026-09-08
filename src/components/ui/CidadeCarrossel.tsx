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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          <div className="lg:col-span-8 relative">
            <Carrossel
              fotos={slides.map((s) => s.imagem)}
              alt=""
              autoplay
              className="h-[320px] sm:h-[440px] rounded-[2.5rem] shadow-2xl shadow-olive/15"
              onChange={setAtual}
            />
          </div>
          <div className="lg:col-span-4">
            <div className="bg-surface rounded-[2rem] border border-olive/10 p-7 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-umber mb-2">
                Foto {idx + 1} de {slides.length}
              </p>
              <h3 className="text-2xl font-extrabold text-olive-deep leading-tight mb-3">{slide.titulo}</h3>
              <p className="text-sm text-muted leading-relaxed">{slide.legenda}</p>

              <div className="flex items-center gap-1.5 mt-6">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setAtual(i)}
                    aria-label={s.titulo}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === idx ? 'w-7 bg-umber' : 'w-2 bg-olive/25 hover:bg-olive/50'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-olive/10 flex flex-wrap gap-2">
                {[slide.titulo, 'Cidade Natureza'].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-olive-soft text-olive-deep text-xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};