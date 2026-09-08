import React, { useState } from 'react';
import { Check, RotateCcw, ImageOff } from 'lucide-react';
import type { PageHeroImages } from '../../types';
import { getPageHeroImages, savePageHeroImages } from '../../lib/db';
import { defaultPageHeroImages, pageHeroLabels } from '../../data/pageHero';
import { Campo } from './fields';
import { UploadImagem } from '../ui/UploadImagem';

export const PageHeroManager: React.FC = () => {
  const [mapa, setMapa] = useState<PageHeroImages>(() => ({ ...defaultPageHeroImages, ...getPageHeroImages() }));
  const [aviso, setAviso] = useState('');

  const alterar = (chave: string, valor: string) => setMapa((m) => ({ ...m, [chave]: valor }));

  const salvar = () => {
    savePageHeroImages(mapa);
    setAviso('Imagens dos cabeçalhos salvas.');
    window.setTimeout(() => setAviso(''), 3000);
  };

  const restaurar = () => {
    if (!window.confirm('Restaurar as imagens padrão dos cabeçalhos das páginas?')) return;
    setMapa({ ...defaultPageHeroImages });
    savePageHeroImages({ ...defaultPageHeroImages });
    setAviso('Imagens padrão restauradas.');
    window.setTimeout(() => setAviso(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-olive/10 rounded-3xl p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-olive-deep">Cabeçalhos das páginas</h2>
            <p className="text-sm text-muted mt-0.5">
              Imagens de fundo usadas no topo de cada página do site. Altere e clique em Salvar.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={restaurar}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-olive/10 text-olive-deep hover:bg-olive/20 transition text-sm font-bold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Restaurar padrão
            </button>
            <button
              onClick={salvar}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-olive text-white hover:bg-olive-deep transition text-sm font-bold cursor-pointer"
            >
              <Check className="w-4 h-4" /> Salvar
            </button>
          </div>
        </div>

        {aviso ? <p className="text-xs font-bold text-olive-deep bg-olive-soft rounded-xl px-3 py-2 mb-5">{aviso}</p> : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(pageHeroLabels).map((chave) => (
            <div key={chave} className="bg-mist rounded-2xl border border-olive/10 p-4">
              <Campo rotulo={pageHeroLabels[chave]}>
                <div className="mb-3">
                  {mapa[chave] ? (
                    <img src={mapa[chave]} alt={pageHeroLabels[chave]} className="w-full max-h-40 object-cover rounded-2xl border border-olive/15 bg-surface" />
                  ) : (
                    <div className="w-full h-28 rounded-2xl border border-dashed border-olive/25 bg-surface flex flex-col items-center justify-center gap-1 text-muted text-sm">
                      <ImageOff className="w-5 h-5" />
                      Sem imagem
                    </div>
                  )}
                </div>
                <UploadImagem valor={mapa[chave] ?? ''} onChange={(v) => alterar(chave, v)} />
              </Campo>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};