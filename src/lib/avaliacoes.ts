const KEY = 'rg.avaliacoes.v1';

type VotosData = Record<string, number[]>;

export interface InfoAvaliacao {
  media: number;
  total: number;
  minha: number | null;
}

function ler(): VotosData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as VotosData) : {};
  } catch {
    return {};
  }
}

function guardar(d: VotosData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    // armazenamento indisponível: ignora silenciosamente
  }
}

export function getAvaliacao(id: string, base?: { media: number; total: number }): InfoAvaliacao {
  const baseMedia = base?.media ?? 0;
  const baseTotal = base?.total ?? 0;
  const votos = ler()[id] ?? [];
  const soma = baseMedia * baseTotal + votos.reduce((acc, n) => acc + n, 0);
  const total = baseTotal + votos.length;
  return {
    media: total > 0 ? soma / total : 0,
    total,
    minha: votos.length > 0 ? votos[votos.length - 1] : null,
  };
}

export function votar(id: string, nota: number) {
  const clamp = Math.min(5, Math.max(1, Math.round(nota)));
  const d = ler();
  const votos = d[id] ?? [];
  d[id] = votos.length > 0 ? [...votos.slice(0, -1), clamp] : [clamp];
  guardar(d);
}