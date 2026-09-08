import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star, Store } from 'lucide-react';
import type { Estabelecimento } from '../../types';
import { getEstabelecimentos, saveEstabelecimentos } from '../../lib/db';
import { tiposRecursos } from '../../data/estabelecimentos';
import { novoEstabelecimento } from './utils';
import { Botao, Campo, Input, Textarea, TextLines, Select, Toggle } from './fields';

export const EstabelecimentosManager: React.FC = () => {
  const [lista, setLista] = useState<Estabelecimento[]>(() => getEstabelecimentos());
  const [draft, setDraft] = useState<Estabelecimento | null>(null);
  const [indice, setIndice] = useState<number | null>(null);
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');

  const patch = (p: Partial<Estabelecimento>) => setDraft((d) => (d ? { ...d, ...p } : d));

  const novo = () => {
    setDraft(novoEstabelecimento());
    setIndice(null);
    setErro('');
  };

  const editar = (e: Estabelecimento, i: number) => {
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
    if (!draft.nome.trim()) {
      setErro('Informe o nome do estabelecimento.');
      return;
    }
    const item = draft;
    const novaLista =
      indice === null
        ? [item, ...lista]
        : lista.map((a, i) => (i === indice ? item : a));
    saveEstabelecimentos(novaLista);
    setLista(novaLista);
    setDraft(null);
    setIndice(null);
    setErro('');
    setAviso(`"${item.nome}" salvo com sucesso.`);
    window.setTimeout(() => setAviso(''), 3000);
  };

  const remover = (id: string) => {
    if (!window.confirm('Excluir este estabelecimento?')) return;
    const novaLista = lista.filter((e) => e.id !== id);
    saveEstabelecimentos(novaLista);
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
            {indice === null ? 'Novo estabelecimento' : 'Editar estabelecimento'}
          </h2>
          <Botao variante="secao" onClick={cancelar}>
            <X className="w-4 h-4" /> Cancelar
          </Botao>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Campo rotulo="Nome">
            <Input value={draft.nome} onChange={(e) => patch({ nome: e.target.value })} />
          </Campo>
          <Campo rotulo="Seção">
            <Select value={draft.tipo} onChange={(e) => patch({ tipo: e.target.value as Estabelecimento['tipo'] })}>
              {(Object.keys(tiposRecursos) as (keyof typeof tiposRecursos)[]).map((t) => (
                <option key={t} value={t}>
                  {tiposRecursos[t]}
                </option>
              ))}
            </Select>
          </Campo>
          <Campo rotulo="Categoria" dica="Ex.: Restaurante, Pizzaria, Pousada...">
            <Input value={draft.categoria} onChange={(e) => patch({ categoria: e.target.value })} />
          </Campo>
          <Campo rotulo="Endereço">
            <Input value={draft.endereco} onChange={(e) => patch({ endereco: e.target.value })} />
          </Campo>
          <Campo rotulo="Telefone">
            <Input value={draft.telefone ?? ''} onChange={(e) => patch({ telefone: e.target.value })} />
          </Campo>
          <Campo rotulo="Horário">
            <Input value={draft.horario ?? ''} onChange={(e) => patch({ horario: e.target.value })} />
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
              <TextLines valor={draft.tags} onChange={(v) => patch({ tags: v })} linha="pizzaria" />
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
          <h2 className="text-xl font-extrabold text-olive-deep">Estabelecimentos</h2>
          <p className="text-sm text-muted mt-0.5">
            {lista.length} cadastrados · Pra Comer, Onde Dormir, O que Fazer e Guia de Comércio & Serviços.
          </p>
        </div>
        <Botao onClick={novo}>
          <Plus className="w-4 h-4" /> Novo estabelecimento
        </Botao>
      </div>

      {aviso ? <p className="text-xs font-bold text-olive-deep bg-olive-soft rounded-xl px-3 py-2 mb-5">{aviso}</p> : null}

      {lista.length === 0 ? (
        <p className="text-sm text-muted text-center py-12">Nenhum estabelecimento cadastrado.</p>
      ) : (
        <ul className="divide-y divide-olive/10">
          {lista.map((e, i) => (
            <li key={e.id} className="flex items-center gap-4 py-4">
              {e.imagem ? (
                <img src={e.imagem} alt="" className="w-16 h-16 rounded-2xl object-cover bg-mist flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-mist flex items-center justify-center text-olive flex-shrink-0">
                  <Store className="w-6 h-6" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-bold text-olive-deep truncate">
                  {e.nome}
                  {e.destaque ? (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-umber-soft text-umber-deep text-[11px] font-bold">
                      <Star className="w-3 h-3" /> Destaque
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted truncate">
                  {tiposRecursos[e.tipo]}
                  {e.categoria ? ` · ${e.categoria}` : ''}
                  {e.endereco ? ` · ${e.endereco}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => editar(e, i)}
                  className="p-2 rounded-xl bg-olive/10 text-olive-deep hover:bg-olive/20 transition cursor-pointer"
                  aria-label={`Editar ${e.nome}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remover(e.id)}
                  className="p-2 rounded-xl bg-umber-soft text-umber-deep hover:bg-umber/15 transition cursor-pointer"
                  aria-label={`Excluir ${e.nome}`}
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