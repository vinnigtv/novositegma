import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star, CalendarDays } from 'lucide-react';
import type { Evento } from '../../types';
import { getEventos, saveEventos } from '../../lib/db';
import { novoEvento } from './utils';
import { Botao, Campo, Input, Textarea, TextLines, Toggle } from './fields';

export const EventosManager: React.FC = () => {
  const [lista, setLista] = useState<Evento[]>(() => getEventos());
  const [draft, setDraft] = useState<Evento | null>(null);
  const [indice, setIndice] = useState<number | null>(null);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');

  const patch = (p: Partial<Evento>) => setDraft((d) => (d ? { ...d, ...p } : d));

  const novo = () => {
    setDraft(novoEvento());
    setIndice(null);
    setErro('');
  };

  const editar = (e: Evento, i: number) => {
    setDraft({ ...e });
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
      setErro('Informe o título do evento.');
      return;
    }
    const novaLista =
      indice === null
        ? [draft, ...lista]
        : lista.map((a, i) => (i === indice ? draft : a));
    saveEventos(novaLista);
    setLista(novaLista);
    setDraft(null);
    setIndice(null);
    setErro('');
    setAviso(`"${draft.titulo}" salvo com sucesso.`);
    window.setTimeout(() => setAviso(''), 3000);
  };

  const remover = (id: string) => {
    if (!window.confirm('Excluir este evento?')) return;
    const novaLista = lista.filter((e) => e.id !== id);
    saveEventos(novaLista);
    setLista(novaLista);
    setDraft(null);
    setIndice(null);
    setErro('');
  };

  if (draft) {
    return (
      <div className="bg-surface border border-olive/10 rounded-3xl p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-olive-deep">{indice === null ? 'Novo evento' : 'Editar evento'}</h2>
          <Botao variante="secao" onClick={cancelar}>
            <X className="w-4 h-4" /> Cancelar
          </Botao>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Campo rotulo="Título">
              <Input value={draft.titulo} onChange={(e) => patch({ titulo: e.target.value })} />
            </Campo>
          </div>
          <Campo rotulo="Data" dica="Ex.: 15 de novembro">
            <Input value={draft.data} onChange={(e) => patch({ data: e.target.value })} />
          </Campo>
          <Campo rotulo="Mês" dica="Ex.: NOV">
            <Input value={draft.mes} onChange={(e) => patch({ mes: e.target.value })} />
          </Campo>
          <Campo rotulo="Dia" dica="Ex.: 15">
            <Input value={draft.dia} onChange={(e) => patch({ dia: e.target.value })} />
          </Campo>
          <Campo rotulo="Local">
            <Input value={draft.local ?? ''} onChange={(e) => patch({ local: e.target.value })} />
          </Campo>
          <Campo rotulo="Imagem" dica="Cole a URL de uma imagem.">
            <Input value={draft.imagem} onChange={(e) => patch({ imagem: e.target.value })} placeholder="https://..." />
          </Campo>
          <Campo rotulo="Destaque">
            <div className="pt-2">
              <Toggle rotulo={draft.destaque ? 'Em destaque' : 'Sem destaque'} valor={Boolean(draft.destaque)} onChange={(v) => patch({ destaque: v })} />
            </div>
          </Campo>
          <div className="md:col-span-2">
            <Campo rotulo="Descrição">
              <Textarea value={draft.descricao} onChange={(e) => patch({ descricao: e.target.value })} rows={3} />
            </Campo>
          </div>
          <div className="md:col-span-2">
            <Campo rotulo="Tags" dica="Separe por linhas.">
              <TextLines valor={draft.tags} onChange={(v) => patch({ tags: v })} linha="natal" />
            </Campo>
          </div>
        </div>

        {erro ? <p className="text-xs font-semibold text-umber bg-umber-soft rounded-xl px-3 py-2">{erro}</p> : null}

        <div className="flex justify-end gap-3">
          <Botao variante="secao" onClick={cancelar}>
            Cancelar
          </Botao>
          <Botao onClick={salvar}>
            <Check className="w-4 h-4" /> Salvar
          </Botao>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-olive/10 rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-olive-deep">Eventos</h2>
          <p className="text-sm text-muted mt-0.5">{lista.length} eventos cadastrados.</p>
        </div>
        <Botao onClick={novo}>
          <Plus className="w-4 h-4" /> Novo evento
        </Botao>
      </div>

      {aviso ? <p className="text-xs font-bold text-olive-deep bg-olive-soft rounded-xl px-3 py-2 mb-5">{aviso}</p> : null}

      {lista.length === 0 ? (
        <p className="text-sm text-muted text-center py-12">Nenhum evento cadastrado.</p>
      ) : (
        <ul className="divide-y divide-olive/10">
          {lista.map((e, i) => (
            <li key={e.id} className="flex items-center gap-4 py-4">
              {e.imagem ? (
                <img src={e.imagem} alt="" className="w-16 h-16 rounded-2xl object-cover bg-mist flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-mist flex items-center justify-center text-olive flex-shrink-0">
                  <CalendarDays className="w-6 h-6" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-olive-deep truncate">
                  {e.titulo}
                  {e.destaque ? (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-umber-soft text-umber-deep text-[11px] font-bold">
                      <Star className="w-3 h-3" /> Destaque
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted truncate">
                  {e.data || 'Sem data'}
                  {e.local ? ` · ${e.local}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => editar(e, i)}
                  className="p-2 rounded-xl bg-olive/10 text-olive-deep hover:bg-olive/20 transition cursor-pointer"
                  aria-label={`Editar ${e.titulo}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remover(e.id)}
                  className="p-2 rounded-xl bg-umber-soft text-umber-deep hover:bg-umber/15 transition cursor-pointer"
                  aria-label={`Excluir ${e.titulo}`}
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