import React from 'react';
import {
  Globe,
  Target,
  Users,
  Eye,
  TrendingUp,
  Quote,
  Star,
  MessageCircle,
  Mail,
  AtSign,
  QrCode,
  Crown,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { WhatsAppIcon } from '../ui/BrandIcons';

const WHATS = 'https://wa.me/5511914928139';
const EMAIL = 'contato.gmatv@gmail.com';
const INSTA = '@oficialgtv';
const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(WHATS)}`;

const depoimentos = [
  {
    texto: 'A GTV trouxe um público novo todas as semanas para a nossa loja. O retorno apareceu já no primeiro mês.',
    autor: 'Mariana S.',
    papel: 'Lojista',
  },
  {
    texto: 'Depois do Reels e dos Stories, o fluxo de clientes que citam a GTV subiu de verdade. A marca virou referência.',
    autor: 'Carlos A.',
    papel: 'Restaurante',
  },
  {
    texto: 'Divulgar com a GTV é anunciar no lugar certo: minha pousada é reconhecida na cidade inteira.',
    autor: 'Fernanda L.',
    papel: 'Pousada',
  },
];

const passos = [
  { numero: '1', titulo: 'Escolha seu plano ideal', texto: 'Compare os planos deste mídia kit e veja qual combina com o momento da sua empresa.' },
  { numero: '2', titulo: 'Fale com nosso consultor', texto: 'WhatsApp ou e-mail: respondemos rápido e montamos a melhor entrega para a sua marca.' },
  { numero: '3', titulo: 'Comece a aparecer', texto: 'Aprovamos o conteúdo e a sua marca entra na programação da GTV.' },
];

const TituloTela: React.FC<{ eyebrow: string; titulo: string; descricao?: string }> = ({ eyebrow, titulo, descricao }) => {
  return (
    <div className="mb-8">
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-umber bg-umber-soft px-3 py-1 rounded-full mb-3">
        <Sparkles className="w-3 h-3" /> {eyebrow}
      </span>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-olive-deep leading-tight">{titulo}</h3>
      {descricao ? <p className="text-sm text-muted mt-2 max-w-2xl">{descricao}</p> : null}
    </div>
  );
};

export const TelaCapa: React.FC = () => {
  return (
    <section className="plan-block relative overflow-hidden bg-surface rounded-3xl border border-olive/10 shadow-sm flex flex-col min-h-[760px]">
      <div className="absolute inset-0 bg-gradient-to-b from-olive-soft/70 via-transparent to-umber-soft/60 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-umber-tint/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-olive/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex-1 flex flex-col items-center justify-center px-8 py-16 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-olive-deep text-white text-[11px] font-bold uppercase tracking-[0.25em] mb-10">
          <Globe className="w-3.5 h-3.5" /> Imprensa & Parceiros
        </span>

        <div className="h-44 w-full max-w-md my-4" />

        <p className="mt-6 max-w-xl text-ink/75 text-base sm:text-lg leading-relaxed">
          Conectamos a sua marca ao coração de Guararema — do comércio local às grandes oportunidades.
        </p>
      </div>

      <div className="relative px-8 py-5 border-t border-olive/10 bg-white/50 flex items-center justify-center text-xs text-muted">
        <span>Mídia Kit · {new Date().getFullYear()}</span>
      </div>
    </section>
  );
};

export const TelaApresentacao: React.FC = () => {
  return (
    <section className="plan-block relative overflow-hidden bg-surface rounded-3xl border border-olive/10 shadow-sm px-6 py-8 sm:px-9 sm:py-10">
      <TituloTela
        eyebrow="Quem somos"
        titulo="Apresentação & Impacto Local"
        descricao="Somos o ecossistema de mídia e conteúdo que move a cidade todos os dias."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="rounded-3xl bg-olive-deep text-white p-7 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-umber-tint mb-3">
            <Target className="w-3.5 h-3.5" /> O propósito
          </span>
          <p className="text-lg sm:text-xl font-semibold leading-snug">
            Conectar a marca do cliente ao ecossistema de Guararema e região.
          </p>
        </div>

        <div className="rounded-3xl bg-mist/70 border border-olive/10 p-7">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-umber mb-4">
            <MessageCircle className="w-3.5 h-3.5" /> Credibilidade
          </span>
          <p className="text-lg sm:text-xl font-semibold text-olive-deep leading-snug">
            A GTV é a principal ponte diária entre o público e o comércio local de Guararema.
          </p>
        </div>
      </div>

      <p className="text-sm font-bold uppercase tracking-wider text-muted mb-4 flex items-center gap-1.5">
        <TrendingUp className="w-4 h-4 text-umber" /> Dados de peso
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div className="rounded-3xl border border-olive/10 bg-surface p-6 text-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-olive-soft text-olive-deep mb-3 mx-auto">
            <Users className="w-5 h-5" />
          </span>
          <p className="text-4xl font-extrabold font-heading text-olive-deep">56 mil+</p>
          <p className="text-xs font-bold uppercase tracking-wider text-muted mt-1">Seguidores totais</p>
        </div>
        <div className="rounded-3xl border border-olive/10 bg-surface p-6 text-center">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-umber-soft text-umber-deep mb-3 mx-auto">
            <Eye className="w-5 h-5" />
          </span>
          <p className="text-4xl font-extrabold font-heading text-umber-deep">1 milhão+</p>
          <p className="text-xs font-bold uppercase tracking-wider text-muted mt-1">Acessos mensais</p>
        </div>
      </div>

      <div className="rounded-3xl bg-umber-soft/70 border border-umber/15 px-7 py-6 text-center">
        <p className="text-base sm:text-lg font-semibold text-umber-deep leading-relaxed">
          “Quem se vê na GTV, se vê no topo da cidade.”
        </p>
      </div>
    </section>
  );
};

export const TelaProvaSocial: React.FC = () => {
  return (
    <section className="plan-block relative overflow-hidden bg-surface rounded-3xl border border-olive/10 shadow-sm px-6 py-8 sm:px-9 sm:py-10">
      <TituloTela
        eyebrow="Cases de sucesso"
        titulo="Prova Social & Depoimentos"
        descricao="Empresários locais que anunciaram na GTV e sentiram o retorno na prática."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {depoimentos.map((d) => (
          <div key={d.autor} className="rounded-3xl border border-olive/10 bg-mist/60 p-6 flex flex-col">
            <Quote className="w-6 h-6 text-umber mb-3" />
            <p className="text-sm text-ink/85 leading-relaxed flex-1">“{d.texto}”</p>
            <div className="mt-4 pt-4 border-t border-olive/10 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-olive-deep text-white flex items-center justify-center font-extrabold text-sm">
                {d.autor.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-bold text-olive-deep">{d.autor}</p>
                <p className="text-[11px] text-muted">{d.papel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm font-bold uppercase tracking-wider text-muted mb-4 flex items-center gap-1.5">
        <Star className="w-4 h-4 text-umber" /> Logotipos de parceiros que confiam na GTV
      </p>
      <div className="h-44" />
    </section>
  );
};

export const TelaCta: React.FC = () => {
  return (
    <section className="plan-block relative overflow-hidden bg-surface rounded-3xl border border-olive/10 shadow-sm px-6 py-8 sm:px-9 sm:py-10">
      <TituloTela
        eyebrow="Chamada para a ação"
        titulo="Vamos colocar sua marca em evidência?"
        descricao="Fechar com a GTV é simples, rápido e direto — três passos até a sua primeira aparição."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {passos.map((p) => (
          <div key={p.numero} className="relative rounded-3xl border border-olive/10 bg-mist/60 p-6">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-olive-deep text-white text-lg font-extrabold mb-3">
              {p.numero}
            </span>
            <h4 className="text-base font-extrabold text-olive-deep mb-1.5">{p.titulo}</h4>
            <p className="text-sm text-ink/80 leading-relaxed">{p.texto}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-olive-deep text-white p-7 mb-8">
        <p className="text-[11px] font-bold uppercase tracking-wider text-umber-tint mb-3 flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5" /> Canais diretos
        </p>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={WHATS}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-white font-bold px-6 py-3 text-sm shadow-lg shadow-black/15 hover:bg-emerald-600 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" /> 11 91492-8139
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur text-white font-bold px-5 py-3 text-sm hover:bg-white/25 transition-colors"
            >
              <Mail className="w-4 h-4" /> {EMAIL}
            </a>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur text-white font-bold px-5 py-3 text-sm">
              <AtSign className="w-4 h-4" /> {INSTA}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 ml-auto">
            <img src={qrUrl} alt="QR Code do WhatsApp comercial da GTV" className="w-24 h-24 rounded-xl bg-white p-2" />
            <span className="text-[10px] text-white/70 flex items-center gap-1">
              <QrCode className="w-3 h-3" /> Escaneie e fale com a gente
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-umber/30 bg-umber-soft/70 px-7 py-5 flex flex-col sm:flex-row items-center gap-3">
        <Crown className="w-6 h-6 text-umber flex-shrink-0" />
        <p className="text-sm text-umber-deep font-semibold leading-relaxed text-center sm:text-left">
          Atenção: os planos com <strong>exclusividade de nicho são limitados por segmento de mercado</strong>. Garanta
          a sua vaga antes do concorrente do seu segmento fechar com a GTV.
        </p>
        <CheckCircle2 className="w-5 h-5 text-umber flex-shrink-0 sm:ml-auto" />
      </div>
    </section>
  );
};