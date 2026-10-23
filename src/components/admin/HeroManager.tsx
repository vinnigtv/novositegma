import React from 'react';
import { getSlidesHero, saveSlidesHero } from '../../lib/db';
import { SlidesManager } from './SlidesManager';

export const HeroManager: React.FC = () => (
  <SlidesManager
    rotulo="Imagens · Página inicial"
    descricao="nos 3 blocos de imagem do topo da Home, na ordem em que aparecem."
    usar={getSlidesHero}
    salvar={saveSlidesHero}
  />
);