import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface GaleriaFotosProps {
  fotos: string[];
  alt?: string;
}

export const GaleriaFotos: React.FC<GaleriaFotosProps> = ({ fotos, alt }) => {
  const lista = Array.isArray(fotos) ? fotos.filter(Boolean) : [];
  const [aberta, setAberta] = useState(false);
  const [indice, setIndice] = useState(0);

  const abrir = (i: number) => {
    setIndice(i);
    setAberta(true);
  };

  const anterior = useCallback(() => setIndice((i) => (i - 1 + lista.length) % lista.length), [lista.length]);
  const proxima = useCallback(() => setIndice((i) => (i + 1) % lista.length), [lista.length]);

  useEffect(() => {
    if (!aberta) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberta(false);
      else if (e.key === 'ArrowLeft') anterior();
      else if (e.key === 'ArrowRight') proxima();
    };
    window.addEventListener('keydown', aoTeclar);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', aoTeclar);
      document.body.style.overflow = '';
    };
  }, [aberta, anterior, proxima]);

  if (lista.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {lista.map((foto, i) => (
          <button
            key={i}
            type="button"
            onClick={() => abrir(i)}
            className="group relative rounded-2xl overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-umber/50"
            aria-label={`Ampliar foto ${i + 1}`}
          >
            <img
              src={foto}
              alt={`${alt ?? 'Foto'} ${i + 1}`}
              loading="lazy"
              className="w-full h-44 object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
            />
            <span className="absolute inset-0 flex items-end justify-center pb-3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn className="w-5 h-5 text-white drop-shadow" />
            </span>
          </button>
        ))}
      </div>

      {aberta ? (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setAberta(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização da foto"
        >
          <button
            type="button"
            onClick={() => setAberta(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          {lista.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  anterior();
                }}
                className="absolute left-2 sm:left-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  proxima();
                }}
                className="absolute right-2 sm:right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/25 transition cursor-pointer"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          ) : null}

          <img
            src={lista[indice]}
            alt={`${alt ?? 'Foto'} ${indice + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[92vw] max-h-[82vh] object-contain rounded-2xl shadow-2xl select-none"
          />

          {lista.length > 1 ? (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-semibold backdrop-blur">
              {indice + 1} / {lista.length}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};