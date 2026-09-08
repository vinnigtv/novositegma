import type { SlideCidade } from '../types';
import capaUrl from '../assets/image1.png';

export const capaHero: SlideCidade = {
  id: 'capa',
  imagem: capaUrl,
  titulo: 'Visite. Conheça. E ame Guararema.',
  legenda: 'A Cidade Natureza · a 80 km de São Paulo',
};

export const defaultSlidesHero: SlideCidade[] = [
  capaHero,
  {
    id: 'rio-paraiba',
    imagem: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&auto=format&fit=crop&q=80',
    titulo: 'Um encontro com o rio e a mata atlântica.',
    legenda: 'Ecoturismo, trilhas e pôr do sol no Vale do Paraíba',
  },
  {
    id: 'maria-fumaca',
    imagem: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&auto=format&fit=crop&q=80',
    titulo: 'História que ainda circula sobre trilhos.',
    legenda: 'A Maria Fumaça une o Centro à Vila de Luís Carlos',
  },
  {
    id: 'gastronomia',
    imagem: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&auto=format&fit=crop&q=80',
    titulo: 'Sabores da roça com cheiro de café fresco.',
    legenda: 'Gastronomia, cafeterias e doces caseiros pela cidade',
  },
];