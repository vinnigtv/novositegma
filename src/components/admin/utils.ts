import type { Atracao, Estabelecimento, Evento } from '../../types';

export function slugify(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '')
    .slice(0, 60);
}

export function novoSlug(titulo: string, existentes: string[]): string {
  const base = slugify(titulo) || 'registro';
  let slug = base;
  let contador = 2;
  while (existentes.includes(slug)) {
    slug = `${base}-${contador}`;
    contador++;
  }
  return slug;
}

export function novoId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function novaAtracao(): Atracao {
  return {
    slug: '',
    titulo: '',
    categoria: 'natureza',
    subtitulo: '',
    resumo: '',
    descricao: [],
    info: [],
    dicas: [],
    imagem: '',
    galeria: [],
    local: '',
    rating: 5,
    destaque: false,
    tags: [],
  };
}

export function novoEstabelecimento(): Estabelecimento {
  return {
    id: novoId(),
    nome: '',
    tipo: 'comer',
    categoria: '',
    descricao: '',
    imagem: '',
    endereco: '',
    telefone: '',
    horario: '',
    tags: [],
    destaque: false,
  };
}

export function novoEvento(): Evento {
  return {
    id: novoId(),
    titulo: '',
    data: '',
    mes: '',
    dia: '',
    local: '',
    descricao: '',
    imagem: '',
    tags: [],
    destaque: false,
  };
}