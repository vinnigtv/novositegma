import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Calendar,
  Navigation,
  Share2,
  ArrowLeft,
} from 'lucide-react';
import type { Estabelecimento } from '../types';
import { getEstabelecimentos } from '../lib/db';
import { tiposRecursos } from '../data/estabelecimentos';
import { Link } from '../lib/router';
import { Carrossel } from '../components/ui/Carrossel';
import { NotaTexto, VotacaoEstrelas } from '../components/ui/Avaliacao';
import { useAvaliacoes } from '../hooks/useAvaliacoes';
import { BusinessCard, CtaBanner } from '../components/ui/Cards';
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from '../components/ui/BrandIcons';

const limpaNumero = (v: string) => v.replace(/\D/g, '');
const urlSegura = (v: string) => (/^https?:\/\//i.test(v) ? v : `https://${v}`);
const handleInsta = (v: string) => (v.startsWith('@') ? v : `@${v.replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '')}`);

const Ano = new Date().getFullYear();

export const EstabelecimentoDetalhePage: React.FC<{ id: string }> = ({ id }) => {
  const empresa = getEstabelecimentos().find((e) => e.id === id);

  if (!empresa) {
    return (
      <section className="py-32 text-center px-4">
        <h1 className="text-3xl font-bold text-olive-deep mb-2">Estabelecimento não encontrado</h1>
        <p className="text-sm text-muted mb-6">O link pode estar desatualizado ou o cadastro foi removido.</p>
        <a href="#/guia-de-comercios" className="text-sm font-semibold text-umber hover:underline">
          Voltar para o guia de comércio
        </a>
      </section>
    );
  }

  return <Detalhe empresa={empresa} />;
};

const Detalhe: React.FC<{ empresa: Estabelecimento }> = ({ empresa }) => {
  const base = empresa.rating ?? { media: 0, total: 0 };
  const { info } = useAvaliacoes(empresa.id, base);
  const fotos = empresa.fotos && empresa.fotos.length > 0 ? empresa.fotos : [empresa.imagem];
  const inicial = (empresa.nome || '?').trim().charAt(0).toUpperCase();
  const whats = empresa.whatsapp ?? empresa.telefone;
  const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${empresa.nome} ${empresa.bairro ?? ''} Guararema SP`
  )}`;
  const compartilhar = () => {
    if (navigator.share) {
      navigator.share({ title: empresa.nome, url: window.location.href }).catch(() => undefined);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => undefined);
    }
  };

  const relacionados = getEstabelecimentos()
    .filter((e) => e.id !== empresa.id && (e.categoria === empresa.categoria || e.tipo === empresa.tipo))
    .slice(0, 3);

  return (
    <>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/guia-de-comercios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-olive hover:text-umber transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao guia
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
            <div className="space-y-6">
              <div className="relative">
                <Carrossel fotos={fotos} alt={empresa.nome} autoplay className="h-[340px] sm:h-[420px] rounded-[2rem] shadow-xl shadow-olive/10" />
                <span className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur text-white text-xs font-bold">
                  <Share2 className="w-3.5 h-3.5" />
                  <button type="button" onClick={compartilhar} className="hover:underline cursor-pointer">
                    Compartilhar
                  </button>
                </span>
              </div>

              <div className="bg-surface rounded-3xl border border-olive/10 p-6 lg:p-8">
                <h2 className="text-xl font-extrabold text-olive-deep mb-3">Sobre {empresa.nome}</h2>
                <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-line">{empresa.descricao}</p>

                {empresa.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {empresa.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-olive-soft text-olive-deep text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 space-y-6">
              <div className="bg-surface rounded-3xl border border-olive/10 p-6 lg:p-8 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-olive via-umber to-umber" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-olive/10 shadow flex-shrink-0">
                      {empresa.logo ? (
                        <img src={empresa.logo} alt={`Logo ${empresa.nome}`} className="w-full h-full object-cover" />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center bg-gradient-to-br from-olive to-umber text-white text-2xl font-extrabold font-heading">
                          {inicial}
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-umber">
                        {tiposRecursos[empresa.tipo]}
                      </span>
                      <h1 className="text-2xl font-extrabold text-olive-deep leading-tight">{empresa.nome}</h1>
                      <p className="text-xs text-muted">{empresa.categoria || 'Comércio local'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 bg-mist rounded-2xl px-4 py-3 border border-olive/10">
                  <div>
                    <NotaTexto media={info.media} total={info.total} />
                    <p className="text-[11px] text-muted mt-1">Avaliação da comunidade</p>
                  </div>
                  {empresa.destaque ? (
                    <span className="px-2.5 py-1 rounded-full bg-umber-soft text-umber-deep text-[10px] font-bold whitespace-nowrap">
                      Destaque
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 border-t border-olive/10 pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-olive-deep mb-2">Dê sua nota</h3>
                  <VotacaoEstrelas id={empresa.id} base={base} />
                </div>

                <div className="mt-5 space-y-2.5 text-sm text-ink/80">
                  <span className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-umber flex-shrink-0 mt-0.5" />
                    <span>
                      {empresa.endereco}
                      {empresa.bairro ? ` · ${empresa.bairro}` : ''}
                    </span>
                  </span>
                  {empresa.telefone ? (
                    <a href={`tel:${limpaNumero(empresa.telefone)}`} className="flex items-center gap-2.5 hover:text-umber transition-colors">
                      <Phone className="w-4 h-4 text-umber flex-shrink-0" /> {empresa.telefone}
                    </a>
                  ) : null}
                  {empresa.horario ? (
                    <span className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-umber flex-shrink-0 mt-0.5" /> {empresa.horario}
                    </span>
                  ) : null}
                  {empresa.email ? (
                    <a href={`mailto:${empresa.email}`} className="flex items-center gap-2.5 hover:text-umber transition-colors">
                      <Mail className="w-4 h-4 text-umber flex-shrink-0" /> {empresa.email}
                    </a>
                  ) : null}
                  {empresa.website ? (
                    <a href={urlSegura(empresa.website)} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-umber transition-colors">
                      <Globe className="w-4 h-4 text-umber flex-shrink-0" /> Site oficial
                    </a>
                  ) : null}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {whats ? (
                    <a
                      href={`https://wa.me/${limpaNumero(whats)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-olive text-white text-sm font-bold px-4 py-3 hover:bg-olive-deep transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4" /> WhatsApp
                    </a>
                  ) : null}
                  {empresa.telefone ? (
                    <a
                      href={`tel:${limpaNumero(empresa.telefone)}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-umber-soft text-umber-deep text-sm font-bold px-4 py-3 hover:bg-umber hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" /> Ligar
                    </a>
                  ) : null}
                  <a
                    href={mapaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface border border-olive/20 text-olive-deep text-sm font-bold px-4 py-3 hover:bg-olive-soft transition-colors col-span-2"
                  >
                    <Navigation className="w-4 h-4" /> Como chegar no mapa
                  </a>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 border-t border-olive/10 pt-5">
                  {empresa.instagram ? (
                    <a href={urlSegura(`instagram.com/${handleInsta(empresa.instagram).slice(1)}`)} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-olive/10 text-olive-deep hover:bg-olive hover:text-white transition-colors" aria-label="Instagram">
                      <InstagramIcon className="w-4 h-4" /> 
                    </a>
                  ) : null}
                  {empresa.facebook ? (
                    <a href={urlSegura(empresa.facebook)} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-olive/10 text-olive-deep hover:bg-olive hover:text-white transition-colors" aria-label="Facebook">
                      <FacebookIcon className="w-4 h-4" />
                    </a>
                  ) : null}
                  {empresa.website ? (
                    <a href={urlSegura(empresa.website)} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-olive/10 text-olive-deep hover:bg-olive hover:text-white transition-colors" aria-label="Site">
                      <Globe className="w-4 h-4" />
                    </a>
                  ) : null}
                  <span className="p-2.5 rounded-full bg-olive/10 text-olive-deep cursor-default" aria-label="Cadastrado no Guia Guararema">
                    <Calendar className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-[10px] text-muted text-center mt-3">
                  Cadastro {Ano} · Guia Guararema. Informações enviadas pelo próprio negócio.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relacionados.length > 0 ? (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-olive-deep">Você também pode gostar</h2>
              <Link to="/guia-de-comercios" className="text-sm font-semibold text-olive hover:text-umber transition-colors">
                Ver tudo no guia
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relacionados.map((e) => (
                <BusinessCard key={e.id} empresa={e} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner
        title="Divulgue o seu negócio no Guia"
        description="Cadastro grátis na listagem simples ou card completo com fotos, horários, contato direto e avaliações da comunidade."
        textButton="Cadastre sua empresa"
        to="/cadastro"
      />
    </>
  );
};