import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, Star, Store, Hourglass, Crown, BadgeCheck } from 'lucide-react';
import type { Estabelecimento } from '../../types';
import { getEstabelecimentos, saveEstabelecimentos } from '../../lib/db';
import { tiposRecursos } from '../../data/estabelecimentos';
import { novoEstabelecimento } from './utils';
import { Botao, Campo, Input, Textarea, TextLines, Select, Toggle } from './fields';
import { UploadImagem, UploadVarias } from '../ui/UploadImagem';

export const EstabelecimentosManager: React.FC = () => {
  const [lista, setLista] = useState<Estabelecimento[]>(() => getEstabelecimentos());
  const [draft, setDraft] = useState<Estabelecimento | null>(null);
  const [indice, setIndice] = useState<number | null>(null);
  const [filtro, setFiltro] = useState<'todos' | 'pendentes' | 'aprovados'>('todos');
  const [erro, setErro] = useState('');
  const [aviso, setAviso] = useState('');

  const pendentes = lista.filter((e) => e.status === 'pendente').length;

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

  const aprovar = (e: Estabelecimento) => {
    const novaLista = lista.map((x) => (x.id === e.id ? { ...x, status: 'aprovado' as const } : x));
    saveEstabelecimentos(novaLista);
    setLista(novaLista);
    setAviso(`"${e.nome}" aprovado e agora aparece no Guia.`);
    window.setTimeout(() => setAviso(''), 3000);
  };

  const mudarPlano = (e: Estabelecimento, plano: 'pago' | 'gratuito') => {
    const novaLista = lista.map((x) => (x.id === e.id ? { ...x, plano } : x));
    saveEstabelecimentos(novaLista);
    setLista(novaLista);
  };

  const visiveis =
    filtro === 'todos' ? lista : lista.filter((e) => (filtro === 'pendentes' ? e.status === 'pendente' : e.status !== 'pendente'));

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
          <Campo rotulo="Bairro / Região">
            <Input value={draft.bairro ?? ''} onChange={(e) => patch({ bairro: e.target.value })} />
          </Campo>
          <Campo rotulo="Telefone">
            <Input value={draft.telefone ?? ''} onChange={(e) => patch({ telefone: e.target.value })} />
          </Campo>
          <Campo rotulo="WhatsApp" dica="Usado quando disponível para contato direto.">
            <Input value={draft.whatsapp ?? ''} onChange={(e) => patch({ whatsapp: e.target.value })} />
          </Campo>
          <Campo rotulo="E-mail">
            <Input type="email" value={draft.email ?? ''} onChange={(e) => patch({ email: e.target.value })} />
          </Campo>
          <Campo rotulo="Instagram" dica="Pode ser o perfil (@nome) ou link completo.">
            <Input value={draft.instagram ?? ''} onChange={(e) => patch({ instagram: e.target.value })} />
          </Campo>
          <Campo rotulo="Facebook">
            <Input value={draft.facebook ?? ''} onChange={(e) => patch({ facebook: e.target.value })} />
          </Campo>
          <Campo rotulo="Website / Cardápio">
            <Input value={draft.website ?? ''} onChange={(e) => patch({ website: e.target.value })} placeholder="https://..." />
          </Campo>
          <Campo rotulo="Horário">
            <Input value={draft.horario ?? ''} onChange={(e) => patch({ horario: e.target.value })} />
          </Campo>
          <Campo rotulo="Imagem principal" dica="Foto de capa exibida no card e no carrossel.">
            <UploadImagem valor={draft.imagem} onChange={(v) => patch({ imagem: v })} />
          </Campo>
          <Campo rotulo="Logo" dica="Sem logo, usamos a inicial com a cor da marca.">
            <UploadImagem valor={draft.logo ?? ''} onChange={(v) => patch({ logo: v })} />
          </Campo>
          <Campo rotulo="Situação">
            <Select value={draft.status ?? 'aprovado'} onChange={(e) => patch({ status: e.target.value as Estabelecimento['status'] })}>
              <option value="aprovado">Aprovado (visível no Guia)</option>
              <option value="pendente">Pendente de aprovação</option>
            </Select>
          </Campo>
          <Campo rotulo="Plano" dica="Completo = card com fotos; Simples = só nome e endereço na listagem.">
            <Select value={draft.plano ?? 'pago'} onChange={(e) => patch({ plano: e.target.value as Estabelecimento['plano'] })}>
              <option value="pago">Completo (card com fotos e contatos)</option>
              <option value="gratuito">Simples (listagem básica)</option>
            </Select>
          </Campo>
          <Campo rotulo="Destaque">
            <div className="pt-2">
              <Toggle rotulo={draft.destaque ? 'Em destaque' : 'Sem destaque'} valor={Boolean(draft.destaque)} onChange={(v) => patch({ destaque: v })} />
            </div>
          </Campo>
          <div className="md:col-span-2">
            <Campo rotulo="Fotos do carrossel" dica="Envie fotos do dispositivo. A primeira é a foto principal.">
              <UploadVarias valor={draft.fotos ?? []} onChange={(v) => patch({ fotos: v })} />
            </Campo>
          </div>
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
            {lista.length} cadastrados · {pendentes} aguardando aprovação.
            {filtro === 'pendentes' ? ' Mostrando apenas pendentes.' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-2xl bg-mist border border-olive/10 p-1">
            {(['todos', 'pendentes', 'aprovados'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFiltro(f)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  filtro === f ? 'bg-olive text-white shadow' : 'text-olive-deep hover:bg-olive-soft'
                }`}
              >
                {f === 'todos' ? 'Todos' : f === 'pendentes' ? `Pendentes (${pendentes})` : 'Aprovados'}
              </button>
            ))}
          </div>
          <Botao onClick={novo}>
            <Plus className="w-4 h-4" /> Novo
          </Botao>
        </div>
      </div>

      {aviso ? <p className="text-xs font-bold text-olive-deep bg-olive-soft rounded-xl px-3 py-2 mb-5">{aviso}</p> : null}

      {visiveis.length === 0 ? (
        <p className="text-sm text-muted text-center py-12">
          {filtro === 'pendentes' ? 'Nenhum cadastro aguardando aprovação. ✨' : 'Nenhum estabelecimento cadastrado.'}
        </p>
      ) : (
        <ul className="divide-y divide-olive/10">
          {visiveis.map((e, i) => (
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
                  {e.status === 'pendente' ? (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                      <Hourglass className="w-3 h-3" /> Pendente
                    </span>
                  ) : (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-olive-soft text-olive-deep text-[11px] font-bold">
                      <BadgeCheck className="w-3 h-3" /> Aprovado
                    </span>
                  )}
                  {(e.plano ?? 'pago') === 'pago' ? (
                    <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-umber-soft text-umber-deep text-[11px] font-bold">
                      <Crown className="w-3 h-3" /> Completo
                    </span>
                  ) : (
                    <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-mist text-muted text-[11px] font-bold">
                      Simples
                    </span>
                  )}
                  {e.destaque ? (
                    <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-umber-soft text-umber-deep text-[11px] font-bold">
                      <Star className="w-3 h-3" /> Destaque
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted truncate">
                  {tiposRecursos[e.tipo]}
                  {e.categoria ? ` · ${e.categoria}` : ''}
                  {e.endereco ? ` · ${e.endereco}` : ''}
                </p>
                <p className="text-[11px] text-umber font-semibold mt-0.5">
                  ★ {(e.rating?.media ?? 0) > 0 ? `${e.rating!.media.toFixed(1)} · ${e.rating!.total} avaliações base` : 'Sem avaliações base'}
                  {e.fotos && e.fotos.length > 0 ? ` · ${e.fotos.length} foto${e.fotos.length > 1 ? 's' : ''}` : ''}
                  {e.logo ? ' · Logo' : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {(e.plano ?? 'pago') !== 'pago' ? (
                  <button
                    onClick={() => mudarPlano(e, 'pago')}
                    className="hidden lg:inline-flex px-2.5 py-1.5 rounded-xl border border-olive/25 text-olive-deep text-[11px] font-bold hover:bg-olive-soft transition cursor-pointer"
                    title="Tornar plano completo (com card)"
                  >
                    para Completo
                  </button>
                ) : (
                  <button
                    onClick={() => mudarPlano(e, 'gratuito')}
                    className="hidden lg:inline-flex px-2.5 py-1.5 rounded-xl border border-olive/25 text-muted text-[11px] font-bold hover:bg-olive-soft transition cursor-pointer"
                    title="Tornar listagem simples"
                  >
                    para Simples
                  </button>
                )}
                {e.status === 'pendente' ? (
                  <button
                    onClick={() => aprovar(e)}
                    className="p-2 rounded-xl bg-olive text-white hover:bg-olive-deep transition cursor-pointer"
                    aria-label={`Aprovar ${e.nome}`}
                    title="Aprovar e publicar no Guia"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                ) : null}
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