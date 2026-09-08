import type { Atracao, Estabelecimento, Evento, PageHeroImages, SlideCidade } from '../types';
import { defaultAtracoes } from '../data/pontosTuristicos';
import { defaultEstabelecimentos } from '../data/estabelecimentos';
import { defaultEventos } from '../data/eventos';
import { defaultSlidesCidade } from '../data/cidade';
import { defaultSlidesHero, capaHero } from '../data/hero';
import { defaultPageHeroImages } from '../data/pageHero';

const KEYS = {
  atracoes: 'rg.atracoes.v1',
  estabelecimentos: 'rg.estabelecimentos.v2',
  eventos: 'rg.eventos.v1',
  slidesCidade: 'rg.slidesCidade.v1',
  slidesHero: 'rg.slidesHero.v1',
  pageHeroImages: 'rg.pageHeroImages.v1',
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

export function getSlidesHero(): SlideCidade[] {
  const base = readCollection<SlideCidade>(KEYS.slidesHero, defaultSlidesHero);
  const demais = base.filter((s) => s.id !== capaHero.id);
  return [capaHero, ...demais];
}

export function saveSlidesHero(list: SlideCidade[]) {
  const demais = list.filter((s) => s.id !== capaHero.id);
  writeCollection(KEYS.slidesHero, [capaHero, ...demais]);
}

export function getPageHeroImages(): PageHeroImages {
  try {
    const raw = localStorage.getItem(KEYS.pageHeroImages);
    if (raw === null) return defaultPageHeroImages;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as PageHeroImages) : defaultPageHeroImages;
  } catch {
    return defaultPageHeroImages;
  }
}

export function savePageHeroImages(map: PageHeroImages) {
  localStorage.setItem(KEYS.pageHeroImages, JSON.stringify(map));
}

export interface CadastroComerciante {
  nome: string;
  tipo: Estabelecimento['tipo'];
  categoria: string;
  descricao: string;
  endereco: string;
  bairro: string;
  telefone: string;
  whatsapp: string;
  email: string;
}

export function salvarCadastro(dados: CadastroComerciante): Estabelecimento {
  const atual = getEstabelecimentos();
  const novo: Estabelecimento = {
    id: `cadastro-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    nome: dados.nome.trim(),
    tipo: dados.tipo,
    categoria: dados.categoria.trim() || 'Comércio local',
    descricao: dados.descricao.trim(),
    imagem:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&auto=format&fit=crop&q=80',
    endereco: dados.endereco.trim(),
    bairro: dados.bairro.trim(),
    telefone: dados.telefone.trim() || undefined,
    whatsapp: dados.whatsapp.trim() || undefined,
    email: dados.email.trim() || undefined,
    tags: [dados.categoria.trim()].filter(Boolean),
    status: 'pendente',
    plano: 'gratuito',
    rating: { media: 0, total: 0 },
  };
  const novaLista = [novo, ...atual];
  saveEstabelecimentos(novaLista);
  return novo;
}

export function resetData() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}