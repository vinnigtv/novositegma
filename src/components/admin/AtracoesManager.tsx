import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star, MapPin } from 'lucide-react';
import type { Atracao } from '../../types';
import { getAtracoes, saveAtracoes } from '../../lib/db';
import { categoriaLabels } from '../../data/pontosTuristicos';
import { novaAtracao, novoSlug } from './utils';
import { Botao, Campo, Input, Textarea, TextLines, Select, Toggle } from './fields';

const InfoLinhas: React.FC<{
  valor: { rotulo: string; valor: string }[];
  onChange: (v: { rotulo: string; valor: string }[]) => void;
}> = ({ valor, onChange }) => (
  <Textarea
    value={valor.map((i) => `${i.rotulo} | ${i.valor}`).join('\n')}
    onChange={(e) =>
      onChange(
        e.target.value
          .split('\n')
          .map((linha) => {
            const [rotulo, ...resto] = linha.split('|');
            return { rotulo: rotulo.trim(), valor: resto.join('|').trim() };
          })
          .filter((i) => i.rotulo)
      )
    }
    rows={4}
    placeholder="Horário | Ter a dom, das 9h às 17h"
  />
);

export const AtracoesManager: React.FC = () => {
  const [lista, setLista] = useState<Atracao[]>(() => getAtracoes());
  const [draft, setDraft] = useState<Atracao | null>(null);
  const [indice, setIndice] = useState<number | null>(null);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');

  const patch = (p: Partial<Atracao>) => setDraft((d) => (d ? { ...d, ...p } : d));

  const novo = () => {
    setDraft(novaAtracao());
    setIndice(null);
    setErro('');
  };

  const editar = (a: Atracao, i: number) => {
    setDraft({ ...a });
    setIndice(i);
    setErro('');
  };

  const cancelar = () => {
    setDraft(null);
    setIndice(null);
    setErro('');
  };

  const salvar = () => {
    if (!draft) return;
    if (!draft.titulo.trim()) {
      setErro('Informe o título da atração.');
      return;
    }
    const slug = draft.slug.trim() || novoSlug(draft.titulo, lista.map((a) => a.slug));
    const original = indice === null ? null : lista[indice];
    const duplicado = lista.some((a) => a.slug === slug && a !== original);
    if (duplicado) {
      setErro('Já existe outra atração com esse identificador (slug).');
      return;
    }
    const item = { ...draft, slug };
    const novaLista =
      indice === null
        ? [item, ...lista]
        : lista.map((a, i) => (i === indice ? item : a));
    saveAtracoes(novaLista);
    setLista(novaLista);
    setDraft(null);
    setIndice(null);
    setErro('');
    setAviso(`"${item.titulo}" salvo com sucesso.`);
    window.setTimeout(() => setAviso(''), 3000);
  };

  const remover = (slug: string) => {
    if (!window.confirm('Excluir esta atração?')) return;
    const novaLista = lista.filter((a) => a.slug !== slug);
    saveAtracoes(novaLista);
    setLista(novaLista);
    setDraft(null);
    setIndice(null);
    setErro('');
  };

  if (draft) {
    return (
      <div className="bg-surface border border-olive/10 rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-olive-deep">
            {indice === null ? 'Nova atração' : 'Editar atração'}
          </h2>
          <Botao variante="secao" onClick={cancelar}>
            <X className="w-4 h-4" /> Cancelar
          </Botao>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Campo rotulo="Título">
            <Input value={draft.titulo} onChange={(e) => patch({ titulo: e.target.value })} />
          </Campo>
          <Campo rotulo="Identificador (slug)" dica="Deixe vazio para gerar automaticamente a partir do título.">
            <Input value={draft.slug} onChange={(e) => patch({ slug: e.target.value })} />
          </Campo>
          <Campo rotulo="Categoria">
            <Select
              value={draft.categoria}
              onChange={(e) => patch({ categoria: e.target.value as Atracao['categoria'] })}
            >
              {(Object.keys(categoriaLabels) as (keyof typeof categoriaLabels)[]).map((c) => (
                <option key={c} value={c}>
                  {categoriaLabels[c]}
                </option>
              ))}
            </Select>
          </Campo>
          <Campo rotulo="Subtítulo">
            <Input value={draft.subtitulo} onChange={(e) => patch({ subtitulo: e.target.value })} />
          </Campo>
          <Campo rotulo="Local">
            <Input value={draft.local} onChange={(e) => patch({ local: e.target.value })} />
          </Campo>
          <Campo rotulo="Avaliação" dica="De 0 a 5.">
            <Input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={draft.rating}
              onChange={(e) => patch({ rating: Number(e.target.value) })}
            />
          </Campo>
          <Campo rotulo="Imagem principal" dica="Cole a URL de uma imagem.">
            <Input value={draft.imagem} onChange={(e) => patch({ imagem: e.target.value })} placeholder="https://..." />
          </Campo>
          <Campo rotulo="Destaque na home">
            <div className="pt-2">
              <Toggle rotulo={draft.destaque ? 'Em destaque' : 'Sem destaque'} valor={Boolean(draft.destaque)} onChange={(v) => patch({ destaque: v })} />
            </div>
          </Campo>
          <div className="md:col-span-2">
            <Campo rotulo="Resumo" dica="Aparece nos cards e no topo da página.">
              <Textarea value={draft.resumo} onChange={(e) => patch({ resumo: e.target.value })} rows={3} />
            </Campo>
          </div>
          <div className="md:col-span-2">
            <Campo rotulo="Descrição" dica="Uma linha por parágrafo.">
              <TextLines valor={draft.descricao} onChange={(v) => patch({ descricao: v })} linha="Parágrafo da descrição..." />
            </Campo>
          </div>
          <div className="md:col-span-2">
            <Campo rotulo="Informações úteis" dica="Formato: rótulo | valor (uma por linha).">
              <InfoLinhas valor={draft.info} onChange={(v) => patch({ info: v })} />
            </Campo>
          </div>
          <div className="md:col-span-2">
            <Campo rotulo="Dicas" dica="Uma dica por linha (cada linha vira um destaque).">
              <TextLines valor={draft.dicas} onChange={(v) => patch({ dicas: v })} linha="Dica de viagem..." />
            </Campo>
          </div>
          <div className="md:col-span-2">
            <Campo rotulo="Galeria" dica="Uma URL de imagem por linha.">
              <TextLines valor={draft.galeria} onChange={(v) => patch({ galeria: v })} linha="https://..." />
            </Campo>
          </div>
          <div className="md:col-span-2">
            <Campo rotulo="Tags" dica="Separe por linhas.">
              <TextLines valor={draft.tags} onChange={(v) => patch({ tags: v })} linha="ecoturismo" />
            </Campo>
          </div>
        </div>

        {erro ? <p className="text-xs font-semibold text-umber bg-umber-soft rounded-xl px-3 py-2">{erro}</p> : null}

        <div className="flex justify-end gap-3">
          <Botao variante="secao" onClick={cancelar}>
            Cancelar
          </Botao>
          <Botao onClick={salvar}>
            <Check className="w-4 h-4" /> Salvar atração
          </Botao>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-olive/10 rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-olive-deep">Pontos turísticos</h2>
          <p className="text-sm text-muted mt-0.5">{lista.length} atrações cadastradas.</p>
        </div>
        <Botao onClick={novo}>
          <Plus className="w-4 h-4" /> Nova atração
        </Botao>
      </div>

      {aviso ? <p className="text-xs font-bold text-olive-deep bg-olive-soft rounded-xl px-3 py-2 mb-5">{aviso}</p> : null}

      {lista.length === 0 ? (
        <p className="text-sm text-muted text-center py-12">Nenhuma atração cadastrada. Clique em "Nova atração" para começar.</p>
      ) : (
        <ul className="divide-y divide-olive/10">
          {lista.map((a, i) => (
            <li key={a.slug} className="flex items-center gap-4 py-4">
              {a.imagem ? (
                <img src={a.imagem} alt="" className="w-16 h-16 rounded-2xl object-cover bg-mist flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-mist flex items-center justify-center text-olive flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-olive-deep truncate">
                  {a.titulo}
                  {a.destaque ? (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-umber-soft text-umber-deep text-[11px] font-bold">
                      <Star className="w-3 h-3" /> Destaque
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted truncate">
                  {categoriaLabels[a.categoria]} · {a.local || 'Sem local'}
                  {a.rating > 0 ? ` · ★ ${a.rating.toFixed(1)}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => editar(a, i)}
                  className="p-2 rounded-xl bg-olive/10 text-olive-deep hover:bg-olive/20 transition cursor-pointer"
                  aria-label={`Editar ${a.titulo}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remover(a.slug)}
                  className="p-2 rounded-xl bg-umber-soft text-umber-deep hover:bg-umber/15 transition cursor-pointer"
                  aria-label={`Excluir ${a.titulo}`}
                >
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