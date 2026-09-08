import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

interface Props {
  fotos: string[];
  alt: string;
  autoplay?: boolean;
  intervalo?: number;
  className?: string;
  onChange?: (indice: number) => void;
}

export const Carrossel: React.FC<Props> = ({ fotos, alt, autoplay = false, intervalo = 4200, className = '', onChange }) => {
  const [indice, setIndice] = useState(0);
  const [pausado, setPausado] = useState(false);
  const lista = fotos && fotos.length > 0 ? fotos : [];
  const n = lista.length;
  const atual = Math.min(indice, n > 0 ? n - 1 : 0);
  const [falha, setFalha] = useState(false);

  useEffect(() => {
    onChange?.(atual);
  }, [atual, onChange]);

  useEffect(() => {
    if (!autoplay || n < 2 || pausado) return;
    const timer = window.setInterval(() => setIndice((i) => (i + 1) % n), intervalo);
    return () => window.clearInterval(timer);
  }, [autoplay, n, intervalo, pausado]);

  if (n === 0) {
    return (
      <div className={`flex items-center justify-center bg-olive-soft text-muted ${className}`}>
        <ImageOff className="w-8 h-8" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {lista.map((foto, i) => (
        <img
          key={i}
          src={foto}
          alt={i === atual ? alt : ''}
          loading="lazy"
          onError={() => (i === atual ? setFalha(true) : null)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === atual ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {n > 1 ? (
        <>
          <button
            type="button"
            onClick={() => setIndice((i) => (i + n - 1) % n)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/85 backdrop-blur text-olive-deep shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndice((i) => (i + 1) % n)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/85 backdrop-blur text-olive-deep shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      ) : null}

      {falha ? (
        <span className="absolute inset-x-0 bottom-3 flex justify-center">
          <span className="px-2.5 py-1 rounded-full bg-umber-soft text-umber-deep text-[10px] font-bold">
            Imagem indisponível
          </span>
        </span>
      ) : null}

      {n > 1 ? (
        <>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {lista.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndice(i)}
                aria-label={`Ir para a foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === atual ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/35 text-white text-[10px] font-bold backdrop-blur">
            {atual + 1}/{n}
          </span>
        </>
      ) : null}
    </div>
  );
};