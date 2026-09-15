import React from 'react';
import { Check, Crown, Leaf, Sparkles, ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { Link } from '../../lib/router';

const essenciais = [
  'Página exclusiva no Guia com galeria (até 8 fotos).',
  'Telefone, WhatsApp direto com mensagem customizada, Redes Sociais e Endereço com mapa interativo.',
  'Horário de funcionamento e descrição do negócio.',
  'Inclusão na busca por categoria/bairro de Guararema.',
];

const destaques = [
  'Posicionamento prioritário acima dos planos Essenciais.',
  'Galeria com fotos ilimitadas + inclusão de vídeo institucional/tour.',
  'Selo "Recomendado pelo Guia Guararema" no site.',
  '1 divulgação por ano/semestre no Instagram/Stories oficial do portal.',
  'Botão de reserva/cardápio/agendamento direto no perfil.',
];

const vips = [
  'Destaque na Página Inicial (Home) e no topo absoluto da sua categoria.',
  'Cota exclusiva por segmento (ex.: máx. 1 pousada VIP no topo).',
  'Post de feed + Reel exclusivo no Instagram da GTV.',
  'Inclusão prioritária em artigos/roteiros do blog.',
  'Suporte VIP: auxílio na atualização de fotos/cardápios via WhatsApp.',
];

export const PlanosParceria: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Planos de parceria"
          title="Escolha o plano ideal para o seu negócio"
          description="Planos transparentes e escaláveis: do primeiro card às ações de visibilidade máxima. Você sabe exatamente o que recebe em cada um."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 mt-14 items-stretch">
          {/* Plano Essencial */}
          <article className="relative flex flex-col bg-surface rounded-3xl border border-olive/10 p-8 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-olive/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-2xl bg-olive-soft text-olive-deep flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-olive-deep leading-none">Essencial</h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-umber mt-1.5">Presença Digital</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-1.5">
                <span className="text-2xl font-extrabold text-ink leading-none pb-1">R$</span>
                <span className="text-4xl font-extrabold text-olive-deep font-heading leading-none">35,90</span>
                <span className="text-sm text-muted pb-0.5">/mês</span>
              </div>
              <p className="text-xs text-muted mt-2.5">
                ou <strong className="text-olive-deep">R$ 359/ano</strong> à vista — 2 meses grátis
              </p>
            </div>

            <p className="text-sm text-muted leading-relaxed mb-6">
              <strong className="text-ink">Ideal para:</strong> pequenos negócios, artesãos e prestadores de serviços locais.
            </p>

            <div className="border-t border-olive/10 pt-5 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-umber mb-4">O que você recebe</p>
              <ul className="space-y-3">
                {essenciais.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink/80 leading-relaxed">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-olive-soft text-olive-deep flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/contato"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full border-2 border-olive text-olive-deep font-bold px-6 py-3 text-sm hover:bg-olive hover:text-white transition-all duration-200"
            >
              Quero o Essencial
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>

          {/* Plano Destaque Turismo */}
          <article className="relative flex flex-col bg-gradient-to-b from-olive-deep via-olive-deep to-olive rounded-3xl p-8 shadow-xl shadow-olive/30 lg:-translate-y-3 lg:scale-[1.03] text-white">
            <span className="absolute top-5 right-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-umber text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-black/10">
              <Sparkles className="w-3 h-3 fill-current" /> Mais popular
            </span>

            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-2xl bg-white/15 text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-white leading-none">Destaque Turismo</h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-umber-tint mt-1.5">O campeão de vendas</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-1.5">
                <span className="text-2xl font-extrabold text-white/90 leading-none pb-1">R$</span>
                <span className="text-4xl font-extrabold text-white font-heading leading-none">59,90</span>
                <span className="text-sm text-white/70 pb-0.5">/mês</span>
              </div>
              <p className="text-xs text-white/70 mt-2.5">
                ou <strong className="text-white">R$ 599/ano</strong> à vista — 2 meses grátis
              </p>
            </div>

            <p className="text-sm text-white/85 leading-relaxed mb-6">
              <strong className="text-white">Ideal para:</strong> restaurantes, pousadas, lojas de souvenirs, cafés e atrações turísticas.
            </p>

            <div className="border-t border-white/15 pt-5 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-umber-tint mb-4">Tudo do Essencial, mais:</p>
              <ul className="space-y-3">
                {destaques.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/90 leading-relaxed">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/contato"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-umber text-white font-bold px-6 py-3.5 text-sm shadow-lg shadow-black/15 hover:bg-umber-tint hover:-translate-y-0.5 transition-all duration-200"
            >
              Quero o Destaque
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>

          {/* Plano VIP */}
          <article className="relative flex flex-col bg-gradient-to-br from-umber-deep via-umber-deep to-olive-deep rounded-3xl border border-umber-tint/30 p-8 shadow-2xl shadow-umber-deep/30 hover:-translate-y-1 transition-all duration-300 text-white overflow-hidden">
            <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-umber-tint/20 blur-3xl pointer-events-none" />
            <span className="absolute top-5 right-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-umber-tint/20 text-umber-tint text-[10px] font-bold uppercase tracking-wider border border-umber-tint/30">
              <Crown className="w-3 h-3" /> Exclusivo
            </span>

            <div className="relative flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-2xl bg-umber-tint text-umber-deep flex items-center justify-center">
                <Crown className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-white leading-none">VIP / Top de Linha</h3>
                <p className="text-[11px] font-bold uppercase tracking-wider text-umber-tint mt-1.5">Sua maçã de ouro</p>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="flex items-end gap-1.5">
                <span className="text-2xl font-extrabold text-white/90 leading-none pb-1">R$</span>
                <span className="text-4xl font-extrabold text-white font-heading leading-none">129,90</span>
                <span className="text-sm text-white/70 pb-0.5">/mês</span>
              </div>
              <p className="text-xs text-white/70 mt-2.5">
                ou <strong className="text-umber-tint">R$ 1.299/ano</strong> à vista — 2 meses grátis
              </p>
            </div>

            <p className="relative text-sm text-white/85 leading-relaxed mb-6">
              <strong className="text-white">Ideal para:</strong> redes, pousadas de alto padrão, grandes restaurantes e empresas que querem máxima visibilidade.
            </p>

            <div className="relative border-t border-white/15 pt-5 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-umber-tint mb-4">Tudo do Destaque, mais:</p>
              <ul className="space-y-3">
                {vips.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/90 leading-relaxed">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-umber-tint text-umber-deep flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/contato"
              className="group relative mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-umber-tint text-umber-deep font-bold px-6 py-3.5 text-sm shadow-lg shadow-black/20 hover:bg-umber hover:text-white hover:-translate-y-0.5 transition-all duration-200"
            >
              Quero o VIP
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </article>
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Valores mensais com possibilidade de fidelidade de 12 meses. Plano anual à vista com 2 meses grátis. Entregáveis e cotas sujeitos à disponibilidade e aprovação do conteúdo.
        </p>
      </div>
    </section>
  );
};