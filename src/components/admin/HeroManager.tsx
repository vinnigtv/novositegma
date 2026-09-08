import React from 'react';
import { getSlidesHero, saveSlidesHero } from '../../lib/db';
import { SlidesManager } from './SlidesManager';

export const HeroManager: React.FC = () => (
  <SlidesManager
    rotulo="Carrossel · Página inicial"
    descricao="na faixa principal da Home, trocando automaticamente a cada 4 segundos."
    usar={getSlidesHero}
    salvar={saveSlidesHero}
  />
);