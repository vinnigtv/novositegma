import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, ArrowUp, ArrowDown, Images } from 'lucide-react';
import type { SlideCidade } from '../../types';
import { novoSlide } from './utils';
import { Botao, Campo, Input, Textarea } from './fields';
import { UploadImagem } from '../ui/UploadImagem';

interface SlidesManagerProps {
  rotulo: string;
  descricao: string;
  usar: () => SlideCidade[];
  salvar: (list: SlideCidade[]) => void;
}

export const SlidesManager: React.FC<SlidesManagerProps> = ({ rotulo, descricao, usar, salvar }) => {
  const [lista, setLista] = useState<SlideCidade[]>(() => usar());
  const [draft, setDraft] = useState<SlideCidade | null>(null);
  const [indice, setIndice] = useState<number | null>(null);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');

  const patch = (p: Partial<SlideCidade>) => setDraft((d) => (d ? { ...d, ...p } : d));

  const novo = () => {
    setDraft(novoSlide());
    setIndice(null);
    setErro('');
  };

  const editar = (s: SlideCidade, i: number) => {
    setDraft({ ...s });
    setIndice(i);
    setErro('');
  };

  const cancelar = () => {
    setDraft(null);
    setIndice(null);
    setErro('');
  };

  const salvarSlide = () => {
    if (!draft) return;
    if (!draft.titulo.trim() || !draft.imagem.trim()) {
      setErro('Preencha pelo menos o título e a imagem do slide.');
      return;
    }
    const novaLista = indice === null ? [...lista, draft] : lista.map((s, i) => (i === indice ? draft : s));
    salvar(novaLista);
    setLista(novaLista);
    setDraft(null);
    setIndice(null);
    setErro('');
    setAviso(`Slide "${draft.titulo}" salvo.`);
    window.setTimeout(() => setAviso(''), 3000);
  };

  const remover = (id: string) => {
    if (!window.confirm('Excluir este slide?')) return;
    const novaLista = lista.filter((c) => c.id !== id);
    salvar(novaLista);
    setLista(novaLista);
    setDraft(null);
    setIndice(null);
    setErro('');
  };

  const mover = (i: number, direcao: -1 | 1) => {
    const j = i + direcao;
    if (j < 0 || j >= lista.length) return;
    const novaLista = [...lista];
    [novaLista[i], novaLista[j]] = [novaLista[j], novaLista[i]];
    salvar(novaLista);
    setLista(novaLista);
  };

  if (draft) {
    return (
      <div className="bg-surface border border-olive/10 rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-olive-deep">{indice === null ? 'Novo slide' : 'Editar slide'}</h2>
          <Botao variante="secao" onClick={cancelar}>
            <X className="w-4 h-4" /> Cancelar
          </Botao>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Campo rotulo="Título" dica="Exibe no texto sobreposto ao carrossel.">
            <Input value={draft.titulo} onChange={(e) => patch({ titulo: e.target.value })} />
          </Campo>
          <Campo rotulo="Imagem" dica="Envie uma foto do dispositivo.">
            <UploadImagem
              valor={draft.imagem}
              onChange={(v) => patch({ imagem: v })}
              dica="Imagens locais não dependem de link externo."
            />
          </Campo>
          <div className="md:col-span-2">
            <Campo rotulo="Legenda" dica="Uma frase de apoio exibida junto ao título.">
              <Textarea value={draft.legenda} onChange={(e) => patch({ legenda: e.target.value })} rows={2} />
            </Campo>
          </div>
          <div className="md:col-span-2">
            {draft.imagem ? (
              <img src={draft.imagem} alt="" className="w-full max-h-64 object-cover rounded-2xl border border-olive/10 bg-mist" />
            ) : (
              <div className="w-full h-40 rounded-2xl border border-dashed border-olive/25 bg-mist flex items-center justify-center text-muted text-sm">
                Prévia da imagem aparecerá aqui
              </div>
            )}
          </div>
        </div>

        {erro ? <p className="text-xs font-semibold text-umber bg-umber-soft rounded-xl px-3 py-2">{erro}</p> : null}

        <div className="flex justify-end gap-3">
          <Botao variante="secao" onClick={cancelar}>
            Cancelar
          </Botao>
          <Botao onClick={salvarSlide}>
            <Check className="w-4 h-4" /> Salvar slide
          </Botao>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-olive/10 rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-olive-deep">{rotulo}</h2>
          <p className="text-sm text-muted mt-0.5">
            {lista.length} fotos · {descricao} Use as setas para reordenar.
          </p>
        </div>
        <Botao onClick={novo}>
          <Plus className="w-4 h-4" /> Novo slide
        </Botao>
      </div>

      {aviso ? <p className="text-xs font-bold text-olive-deep bg-olive-soft rounded-xl px-3 py-2 mb-5">{aviso}</p> : null}

      {lista.length === 0 ? (
        <p className="text-sm text-muted text-center py-12">Nenhum slide cadastrado. Clique em "Novo slide" para começar.</p>
      ) : (
        <ul className="space-y-3">
          {lista.map((s, i) => (
            <li key={s.id} className="flex items-center gap-4 bg-mist rounded-2xl border border-olive/10 p-3">
              {s.imagem ? (
                <img src={s.imagem} alt="" className="w-20 h-14 rounded-xl object-cover bg-surface flex-shrink-0" />
              ) : (
                <div className="w-20 h-14 rounded-xl bg-surface flex items-center justify-center text-olive flex-shrink-0">
                  <Images className="w-5 h-5" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-olive-deep truncate">{i + 1}. {s.titulo}</p>
                <p className="text-xs text-muted truncate">{s.legenda || 'Sem legenda'} · {s.imagem ? 'imagem definida' : 'sem imagem'}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => mover(i, -1)} disabled={i === 0} className="p-2 rounded-xl bg-olive/10 text-olive-deep hover:bg-olive/20 transition disabled:opacity-30 cursor-pointer" aria-label="Mover para cima">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button onClick={() => mover(i, 1)} disabled={i === lista.length - 1} className="p-2 rounded-xl bg-olive/10 text-olive-deep hover:bg-olive/20 transition disabled:opacity-30 cursor-pointer" aria-label="Mover para baixo">
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button onClick={() => editar(s, i)} className="p-2 rounded-xl bg-olive/10 text-olive-deep hover:bg-olive/20 transition cursor-pointer" aria-label={`Editar ${s.titulo}`}>
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remover(s.id)} className="p-2 rounded-xl bg-umber-soft text-umber-deep hover:bg-umber/15 transition cursor-pointer" aria-label={`Excluir ${s.titulo}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};