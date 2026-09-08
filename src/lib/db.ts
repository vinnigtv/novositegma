import type { Atracao, Estabelecimento, Evento, SlideCidade } from '../types';
import { defaultAtracoes } from '../data/pontosTuristicos';
import { defaultEstabelecimentos } from '../data/estabelecimentos';
import { defaultEventos } from '../data/eventos';
import { defaultSlidesCidade } from '../data/cidade';

const KEYS = {
  atracoes: 'rg.atracoes.v1',
  estabelecimentos: 'rg.estabelecimentos.v2',
  eventos: 'rg.eventos.v1',
  slidesCidade: 'rg.slidesCidade.v1',
} as const;

function readCollection<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function writeCollection<T>(key: string, list: T[]) {
  localStorage.setItem(key, JSON.stringify(list));
}

export function getAtracoes(): Atracao[] {
  return readCollection<Atracao>(KEYS.atracoes, defaultAtracoes);
}

export function getAtracao(slug: string): Atracao | undefined {
  return getAtracoes().find((a) => a.slug === slug);
}

export function saveAtracoes(list: Atracao[]) {
  writeCollection(KEYS.atracoes, list);
}

export function getEstabelecimentos(): Estabelecimento[] {
  return readCollection<Estabelecimento>(KEYS.estabelecimentos, defaultEstabelecimentos);
}

export function getEstabelecimentosPorTipo(tipo: Estabelecimento['tipo']): Estabelecimento[] {
  return getEstabelecimentos().filter((e) => e.tipo === tipo);
}

export function saveEstabelecimentos(list: Estabelecimento[]) {
  writeCollection(KEYS.estabelecimentos, list);
}

export function getEventos(): Evento[] {
  return readCollection<Evento>(KEYS.eventos, defaultEventos);
}

export function saveEventos(list: Evento[]) {
  writeCollection(KEYS.eventos, list);
}

export function getSlidesCidade(): SlideCidade[] {
  return readCollection<SlideCidade>(KEYS.slidesCidade, defaultSlidesCidade);
}

export function saveSlidesCidade(list: SlideCidade[]) {
  writeCollection(KEYS.slidesCidade, list);
}

export function resetData() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}