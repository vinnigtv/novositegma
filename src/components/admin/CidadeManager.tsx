import React from 'react';
import { getSlidesCidade, saveSlidesCidade } from '../../lib/db';
import { SlidesManager } from './SlidesManager';

export const CidadeManager: React.FC = () => (
  <SlidesManager
    rotulo="Carrossel · A Cidade"
    descricao="na galeria da página A Cidade. As fotos são enviadas por upload e valem para todo visitante deste navegador."
    usar={getSlidesCidade}
    salvar={saveSlidesCidade}
  />
);