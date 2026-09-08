import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useAvaliacoes } from '../../hooks/useAvaliacoes';

export const Estrelas: React.FC<{ media: number; tamanho?: number }> = ({ media, tamanho = 14 }) => {
  const pct = Math.max(0, Math.min(100, (media / 5) * 100));
  const tamanhoPx = `${tamanho}px`;
  return (
    <span
      className="relative inline-flex align-middle"
      role="img"
      aria-label={`${media.toFixed(1)} de 5 estrelas`}
    >
      <span className="flex gap-0.5 text-olive/20">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="fill-current flex-shrink-0" style={{ width: tamanhoPx, height: tamanhoPx }} />
        ))}
      </span>
      <span className="absolute inset-0 overflow-hidden flex text-umber" style={{ width: `${pct}%` }}>
        <span className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="fill-current flex-shrink-0" style={{ width: tamanhoPx, height: tamanhoPx }} />
          ))}
        </span>
      </span>
    </span>
  );
};

export const NotaTexto: React.FC<{ media: number; total: number }> = ({ media, total }) => (
  <span className="inline-flex items-baseline gap-1.5">
    <Estrelas media={media} tamanho={14} />
    <span className="text-xs font-bold text-olive-deep">{media > 0 ? media.toFixed(1) : '—'}</span>
    <span className="text-xs text-muted">({total} avaliações)</span>
  </span>
);

export const VotacaoEstrelas: React.FC<{
  id: string;
  base?: { media: number; total: number };
}> = ({ id, base }) => {
  const { info, avaliar } = useAvaliacoes(id, base);
  const [preview, setPreview] = useState(0);
  const ativa = preview || info.minha || 0;

  return (
    <div>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setPreview(n)}
            onMouseLeave={() => setPreview(0)}
            onClick={() => avaliar(n)}
            className="p-0.5 cursor-pointer group"
            aria-label={`Avaliar com ${n} estrela${n > 1 ? 's' : ''}`}
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                n <= ativa ? 'fill-umber text-umber' : 'fill-olive/20 text-olive/20 group-hover:fill-umber/40 group-hover:text-umber/40'
              }`}
            />
          </button>
        ))}
      </div>
      <p className="text-xs text-muted mt-2">
        {info.minha ? (
          <>Você avaliou com <span className="font-bold text-umber">{info.minha}</span> estrela{info.minha > 1 ? 's' : ''}. Obrigado pelo seu voto!</>
        ) : (
          <>Toque nas estrelas para avaliar este lugar.</>
        )}
      </p>
    </div>
  );
};