export type AttractionCategory = 'natureza' | 'cultura' | 'gastronomia' | 'historia';

export interface Atracao {
  slug: string;
  titulo: string;
  categoria: AttractionCategory;
  subtitulo: string;
  resumo: string;
  descricao: string[];
  info: { rotulo: string; valor: string }[];
  dicas: string[];
  imagem: string;
  galeria: string[];
  local: string;
  rating: number;
  destaque?: boolean;
  tags: string[];
}

export type BusinessType = 'comer' | 'dormir' | 'fazer' | 'guia';

export interface Estabelecimento {
  id: string;
  nome: string;
  tipo: BusinessType;
  categoria: string;
  descricao: string;
  imagem: string;
  endereco: string;
  telefone?: string;
  horario?: string;
  tags: string[];
  destaque?: boolean;
}

export interface Evento {
  id: string;
  titulo: string;
  data: string;
  mes: string;
  dia: string;
  local?: string;
  descricao: string;
  imagem: string;
  tags: string[];
  destaque?: boolean;
}

export interface Postagem {
  id: string;
  titulo: string;
  categoria: string;
  resumo: string;
  imagem: string;
  data: string;
  leitura: string;
}

export interface NavItem {
  label: string;
  href: string;
}