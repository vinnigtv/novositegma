import React from 'react';
import { Quote } from 'lucide-react';

interface PageHeroPadraoProps {
  kicker: string;
  title: string;
  description: string;
  imagens: string[];
  alts?: string[];
  meta?: string;
  frase?: string;
}

const FRASE_PADRAO = 'Um destino para desacelerar, respirar e voltar sempre.';

export const PageHeroPadrao: React.FC<PageHeroPadraoProps> = ({
  kicker,
  title,
  description,
  imagens,
  alts,
  meta,
  frase = FRASE_PADRAO,
}) => {
  const fotos = [imagens[0], imagens[1] ?? imagens[0], imagens[2] ?? imagens[0]].filter(Boolean);

  return (
    <section className="relative py-20 lg:py-24 bg-surface border-b border-olive/10 overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-olive-soft rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-umber-soft rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Conteúdo */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive-soft text-olive-deep border border-olive/10 text-xs sm:text-sm font-semibold mb-7">
              <span className="w-2 h-2 rounded-full bg-umber animate-pulse" />
              {kicker}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-olive-deep leading-[1.05] mb-6">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-ink/80 leading-relaxed max-w-xl">
              {description}
            </p>

            {meta && (
              <span className="inline-flex mt-6 px-4 py-2 rounded-full bg-olive-soft text-olive-deep border border-olive/10 text-xs font-semibold">
                {meta}
              </span>
            )}
          </div>

          {/* Mosaico: 3 imagens + frase */}
          {fotos.length > 0 && (
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={fotos[0]}
                  alt={alts?.[0] ?? ''}
                  className="rounded-3xl h-64 sm:h-72 object-cover w-full shadow-lg"
                />
                <img
                  src={fotos[1] ?? fotos[0]}
                  alt={alts?.[1] ?? ''}
                  loading="lazy"
                  className="rounded-3xl h-64 sm:h-72 object-cover w-full mt-10 shadow-lg"
                />
              </div>
              <div className="mt-4 flex gap-4">
                <img
                  src={fotos[2] ?? fotos[0]}
                  alt={alts?.[2] ?? ''}
                  loading="lazy"
                  className="rounded-3xl h-40 sm:h-44 object-cover w-3/5 shadow-lg"
                />
                <div className="w-2/5 flex flex-col justify-center items-center bg-olive-deep rounded-3xl p-5 text-white text-center">
                  <Quote className="w-6 h-6 mb-1 text-umber-tint" />
                  <p className="text-xs font-medium leading-snug">{frase}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
