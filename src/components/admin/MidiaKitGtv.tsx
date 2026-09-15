import React from 'react';
import {
  Wifi,
  BadgeCheck,
  Crown,
  Zap,
  Mic,
  Check,
  FileDown,
  Sparkles,
  Info,
  Users,
} from 'lucide-react';
import { TelaCapa, TelaApresentacao, TelaProvaSocial, TelaCta } from './MidiaKitTelas';

interface ItemInclui {
  titulo?: string;
  texto: string;
}

interface BlocoProps {
  numero: string;
  icone: React.ReactNode;
  nome: string;
  selo?: string;
  acento: 'olive' | 'umber' | 'gold';
  investimento: string;
  obsInvestimento?: string;
  paraQuem: string;
  itens: ItemInclui[];
}

const acentos = {
  olive: {
    barra: 'bg-olive-deep',
    icone: 'bg-olive-soft text-olive-deep',
    numero: 'text-olive/20',
    selo: 'bg-olive-soft text-olive-deep border-olive/15',
    invest: 'text-olive-deep',
    check: 'bg-olive-soft text-olive-deep',
    titulo: 'text-umber',
  },
  umber: {
    barra: 'bg-umber',
    icone: 'bg-umber-soft text-umber-deep',
    numero: 'text-umber/20',
    selo: 'bg-umber-soft text-umber-deep border-umber/20',
    invest: 'text-umber-deep',
    check: 'bg-umber-soft text-umber',
    titulo: 'text-umber',
  },
  gold: {
    barra: 'bg-gradient-to-r from-umber-tint via-umber to-umber-tint',
    icone: 'bg-umber-tint/20 text-umber-deep',
    numero: 'text-umber-tint/30',
    selo: 'bg-umber-tint/15 text-umber-deep border-umber-tint/30',
    invest: 'text-umber-deep',
    check: 'bg-umber-tint/20 text-umber-deep',
    titulo: 'text-umber-deep',
  },
} as const;

const BlocoPlano: React.FC<BlocoProps> = ({
  numero,
  icone,
  nome,
  selo,
  acento,
  investimento,
  obsInvestimento,
  paraQuem,
  itens,
}) => {
  const a = acentos[acento];

  return (
    <section className="plan-block relative overflow-hidden bg-surface rounded-3xl border border-olive/10 shadow-sm">
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${a.barra}`} />

      <div className="px-6 py-7 sm:px-9 sm:py-9">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="relative flex items-center justify-center rounded-2xl">
              <span className={`absolute inset-0 rounded-2xl opacity-15 ${a.barra}`} />
              <span className={`relative w-12 h-12 rounded-2xl flex items-center justify-center ${a.icone}`}>
                {icone}
              </span>
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-olive-deep leading-tight">{nome}</h3>
              {selo ? (
                <span className={`inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full border text-[11px] font-bold ${a.selo}`}>
                  <Sparkles className="w-3 h-3" />
                  {selo}
                </span>
              ) : null}
            </div>
          </div>
          <span className={`text-6xl font-heading font-extrabold leading-none ${a.numero}`}>{numero}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-start">
          <div className="space-y-4">
            <div className="rounded-2xl bg-mist/70 border border-olive/10 px-5 py-4">
              <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${a.titulo}`}>Investimento</p>
              <p className={`text-3xl font-extrabold font-heading ${a.invest}`}>{investimento}</p>
              {obsInvestimento ? <p className="text-xs text-muted mt-1">{obsInvestimento}</p> : null}
            </div>

            <div className="rounded-2xl bg-mist/70 border border-olive/10 px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-umber" /> Para quem é
              </p>
              <p className="text-sm text-ink/85 leading-relaxed">{paraQuem}</p>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-olive/10 pt-5 md:pt-0 md:pl-8">
            <p className="text-xs font-bold uppercase tracking-wider text-umber mb-4">O que inclui</p>
            <ul className="space-y-3.5">
              {itens.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-ink/85 leading-relaxed">
                  <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${a.check}`}>
                    <Check className="w-3 h-3" />
                  </span>
                  <span>
                    {item.titulo ? (
                      <>
                        <strong className="text-olive-deep block">{item.titulo}</strong>
                        <span className="text-ink/80">{item.texto}</span>
                      </>
                    ) : (
                      item.texto
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export const MidiaKitGtv: React.FC = () => {
  const baixarPdf = () => {
    window.print();
  };

  return (
    <div className="midia-kit-area">
      {/* Cabeçalho */}
      <div className="no-print bg-surface rounded-3xl border border-olive/10 p-6 sm:p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-umber bg-umber-soft px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3 h-3" /> Imprensa & Parceiros
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-olive-deep">Mídia Kit GTV</h2>
            <p className="text-sm text-muted mt-1.5 max-w-2xl">
              Tabela de planos, formatos e investimentos para marcas que querem crescer com a GTV.
              Cada bloco a seguir corresponde a uma página do PDF.
            </p>
          </div>
          <button
            onClick={baixarPdf}
            className="no-print group inline-flex items-center gap-2 rounded-full bg-olive text-white font-bold px-6 py-3 text-sm shadow-lg shadow-olive/25 hover:bg-olive-deep hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            Baixar em PDF
          </button>
        </div>
      </div>

      {/* Blocos de planos */}
      <div className="space-y-6">
        {/* Telas de composição do mídia kit */}
        <TelaCapa />
        <TelaApresentacao />
        <TelaProvaSocial />

        {/* 01 · GTV Conexão */}
        <BlocoPlano
          numero="01"
          acento="olive"
          icone={<Wifi className="w-6 h-6" />}
          nome="Plano GTV Conexão"
          selo="Ideal para pequenas empresas começarem"
          investimento="R$ 389/mês"
          paraQuem="Comércios locais e prestadores de serviço que precisam de constância sem dor de cabeça."
          itens={[
            { texto: 'Inserção de 2 Stories por semana (conteúdo do cliente).' },
            {
              texto:
                'Inclusão do logotipo da marca no encerramento de todos os conteúdos editoriais e de notícias da GTV — garantia de milhões de impressões de marca.',
            },
          ]}
        />

        {/* 02 · GTV Autoridade */}
        <BlocoPlano
          numero="02"
          acento="umber"
          icone={<BadgeCheck className="w-6 h-6" />}
          nome="Plano GTV Autoridade"
          selo="O mais recomendado · melhor custo-benefício"
          investimento="R$ 789/mês"
          obsInvestimento="Fidelidade mínima: mensal — desconto no trimestral."
          paraQuem="Empresas que querem se consolidar como referência em Guararema."
          itens={[
            { texto: 'Inserção de 2 Stories semanais (1 produção GTV por mês).' },
            {
              texto:
                'Inclusão do logotipo da marca no encerramento de todos os conteúdos editoriais e de notícias da GTV — garantia de milhões de impressões de marca.',
            },
            { texto: '1 Reels por mês (conteúdo do Story).' },
          ]}
        />

        {/* 03 · GTV Dominância */}
        <BlocoPlano
          numero="03"
          acento="gold"
          icone={<Crown className="w-6 h-6" />}
          nome="Plano GTV Dominância"
          selo="Para líderes de mercado"
          investimento="R$ 1.597/mês"
          obsInvestimento="Fidelidade mínima: semestral — plano anual com exclusividade de nicho."
          paraQuem="Marcas que querem dominar o share of mind na cidade."
          itens={[
            { texto: 'Exclusividade de segmento (no plano anual).' },
            { texto: 'Inserção de 3 Stories semanais (1 produção GTV por mês).' },
            {
              texto:
                'Inclusão do logotipo da marca no encerramento de todos os conteúdos editoriais e de notícias da GTV — garantia de milhões de impressões de marca.',
            },
            { texto: '1 Reels por mês (conteúdo do Story).' },
            { texto: '2 Reels institucionais (por semestre).' },
            {
              titulo: 'Cotas garantidas no GTV Podcast / GTV Resenha',
              texto:
                'participação semestral em episódios completos + presença nos cortes distribuídos semanalmente nas redes da GTV.',
            },
            { texto: 'Logotipo em destaque master em todas as produções.' },
          ]}
        />

        {/* 04 · Projetos Especiais & Avulsos */}
        <section className="plan-block relative overflow-hidden bg-surface rounded-3xl border border-olive/10 shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-umber-tint via-umber to-umber-tint" />
          <div className="px-6 py-7 sm:px-9 sm:py-9">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-2xl bg-umber-soft text-umber-deep flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-xl font-extrabold text-olive-deep leading-tight">
                    Projetos Especiais & Avulsos
                  </h3>
                  <span className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-full bg-umber-soft text-umber-deep border border-umber/20 text-[11px] font-bold">
                    <Sparkles className="w-3 h-3" /> Tiro certo
                  </span>
                </div>
              </div>
              <span className="text-6xl font-heading font-extrabold leading-none text-umber/20">04</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-olive/10 bg-mist/60 p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="text-base font-extrabold text-olive-deep leading-snug">
                    1. Formato Reels de Impacto <span className="block text-xs font-bold text-umber mt-1">(Avulso)</span>
                  </h4>
                </div>
                <p className="text-sm text-ink/80 leading-relaxed">
                  Produção de 1 vídeo de alta performance: storytelling + captação externa na loja/empresa +
                  edição dinâmica + publicação em Collab no feed da GTV.
                </p>
                <p className="mt-4 text-2xl font-extrabold font-heading text-umber-deep">R$ 1.289</p>
              </div>

              <div className="rounded-2xl border border-olive/10 bg-mist/60 p-6">
                <h4 className="text-base font-extrabold text-olive-deep leading-snug mb-3">
                  2. Cobertura de Evento / Inauguração
                </h4>
                <p className="text-sm text-ink/80 leading-relaxed">
                  Equipe dedicada in loco por até 3 horas, cobertura em tempo real nos Stories (5 stories)
                  + 1 Reels resumo.
                </p>
                <p className="mt-4 text-2xl font-extrabold font-heading text-umber-deep">R$ 890</p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 · Quadro Papo de Negócio */}
        <BlocoPlano
          numero="05"
          acento="umber"
          icone={<Mic className="w-6 h-6" />}
          nome="Quadro “Papo de Negócio”"
          selo="O poder do conteúdo longo"
          investimento="R$ 1.097"
          obsInvestimento="ou 3x de R$ 365 — transformamos a história da empresa em um produto de entretenimento e educação de mercado."
          paraQuem="Empresas que querem profundidade narrativa e autoridade de conteúdo com a estrutura profissional da GTV."
          itens={[
            { texto: 'Gravação de 1 episódio exclusivo (até 45 min) em estúdio com estrutura profissional.' },
            { texto: 'Logotipo da marca na TV do cenário.' },
            {
              texto:
                'Entrega de 5 cortes prontos e legendados — o formato ideal para Reels, TikTok e Shorts.',
            },
            {
              titulo: 'Publicação estratégica',
              texto:
                'canal do YouTube da GTV + 3 disparos programados dos cortes ao longo do mês no Instagram da GTV.',
            },
          ]}
        />

        {/* Slide final de chamada para ação */}
        <TelaCta />
      </div>

      {/* Rodapé do mídia kit */}
      <div className="no-print mt-10 bg-surface rounded-3xl border border-olive/10 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-umber" />
          Valores e condições válidos conforme tabela acima. Produções de conteúdo GTV · Guararema.
        </span>
        <span className="font-bold text-olive-deep">Mídia Kit GTV · {new Date().getFullYear()}</span>
      </div>

      {/* Botão de download no final */}
      <div className="no-print mt-8 flex justify-center">
        <button
          onClick={baixarPdf}
          className="group inline-flex items-center gap-2.5 rounded-full bg-umber text-white font-bold px-8 py-4 text-base shadow-xl shadow-umber/25 hover:bg-umber-deep hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <FileDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
          Baixar Mídia Kit GTV em PDF
        </button>
        <p className="w-full text-center text-[11px] text-muted mt-3 sm:hidden">
          Na janela de impressão, escolha “Salvar como PDF” e ative “Imprimir imagens de fundo”.
        </p>
      </div>
    </div>
  );
};