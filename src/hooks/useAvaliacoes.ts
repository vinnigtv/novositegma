import { useState } from 'react';
import { getAvaliacao, votar } from '../lib/avaliacoes';

export function useAvaliacoes(id: string, base?: { media: number; total: number }) {
  const [, setVersao] = useState(0);
  const info = getAvaliacao(id, base);
  const avaliar = (nota: number) => {
    votar(id, nota);
    setVersao((v) => v + 1);
  };
  return { info, avaliar };
}