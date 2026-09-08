import React from 'react';
import { Star, MapPin, Clock, Ticket, Info, Lightbulb, Map } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { AtracaoCard, CtaBanner } from '../components/ui/Cards';
import { getAtracoes, getAtracao } from '../lib/db';
import { categoriaLabels } from '../data/pontosTuristicos';
import type { Atracao } from '../types';

export const AtracaoDetalhePage: React.FC<{ slug: string }> = ({ slug }) => {
  const atracao = getAtracao(slug);
  const atracoes = getAtracoes();

  if (!atracao) {
    return (
      <section className="py-32 text-center px-4">
        <h1 className="text-3xl font-bold text-olive-deep mb-2">Ponto turístico não encontrado</h1>
        <p className="text-sm text-muted mb-6">O link pode estar desatualizado.</p>
        <a href="#/pontos-turisticos" className="text-sm font-semibold text-umber hover:underline">
          Ver todos os pontos turísticos
        </a>
      </section>
    );
  }

  const relacionadas = atracoes.filter((a) => a.slug !== atracao.slug && a.categoria === atracao.categoria).slice(0, 3);
  const fallback = relatacionadas(atracoes, atracao.slug, 3);

  const iconPorRotulo = (rotulo: string) => {
    if (rotulo.toLowerCase().includes('horário') || rotulo.toLowerCase().includes('funcionamento')) return Clock;
    if (rotulo.toLowerCase().includes('local') || rotulo.toLowerCase().includes('distância')) return MapPin;
    if (rotulo.toLowerCase().includes('bilhetes') || rotulo.toLowerCase().includes('entrada') || rotulo.toLowerCase().includes('pagamento')) return Ticket;
    return Info;
  };

  return (
    <>
      <PageHero
        crumb="/pontos-turisticos"
        kicker={categoriaLabels[atracao.categoria]}
        title={atracao.titulo}
        description={atracao.resumo}
        image={atracao.imagem}
        meta={atracao.subtitulo}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main body */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-umber-soft text-umber-deep text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-umber text-umber" />
                  {atracao.rating.toFixed(1)} de avaliação dos visitantes
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-olive-soft text-olive-deep text-xs font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  {atracao.local}
                </span>
              </div>

              {atracao.descricao.map((paragrafo, idx) => (
                <p key={idx} className="text-ink/80 leading-relaxed mb-5 text-base sm:text-lg">
                  {paragrafo}
                </p>
              ))}

              {/* Gallery */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-olive-deep mb-4">Galerias de fotos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[atracao.imagem, ...atracao.galeria].slice(0, 3).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${atracao.titulo} — foto ${idx + 1}`}
                      loading="lazy"
                      className="rounded-2xl h-44 object-cover w-full hover:scale-[1.02] transition-transform duration-300"
                    />
                  ))}
                </div>
              </div>

              {/* Dicas */}
              <div className="mt-12 bg-olive-soft/60 rounded-3xl border border-olive/15 p-8">
                <h3 className="flex items-center gap-2.5 text-xl font-bold text-olive-deep mb-5">
                  <Lightbulb className="w-5 h-5 text-umber" />
                  Dicas de quem mora aqui
                </h3>
                <ul className="space-y-3">
                  {atracao.dicas.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-ink/80 text-sm sm:text-base">
                      <span className="w-6 h-6 rounded-full bg-umber text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 bg-surface rounded-3xl border border-olive/10 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-br from-olive to-umber px-6 py-5">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Map className="w-5 h-5" />
                    Informações práticas
                  </h3>
                </div>
                <div className="p-6 space-y-5">
                  {atracao.info.map((item) => {
                    const Icon = iconPorRotulo(item.rotulo);
                    return (
                      <div key={item.rotulo} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-olive-soft text-olive-deep flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-muted">{item.rotulo}</p>
                          <p className="text-sm font-semibold text-olive-deep mt-0.5">{item.valor}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-4 border-t border-olive/10">
                    <div className="flex flex-wrap gap-1.5">
                      {atracao.tags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full bg-umber-soft text-umber-deep text-[10px] font-bold uppercase tracking-wide">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(`${atracao.titulo} Guararema SP`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-center gap-2 w-full rounded-full bg-olive text-white font-semibold px-5 py-3 text-sm hover:bg-olive-deep transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Ver no mapa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(relacionadas.length > 0 || fallback.length > 0) && (
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Continue explorando"
              title="Outros pontos que combinam com a sua rota"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {(relacionadas.length > 0 ? relacionadas : fallback).map((a) => (
                <AtracaoCard key={a.slug} atracao={a} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        title="Montou o roteiro ideal?"
        description="Combine sua visita com o melhor da gastronomia e da hospedagem de Guararema."
        textButton="Pra Comer & Onde Dormir"
        to="/pra-comer"
      />
    </>
  );
};

function relatacionadas(lista: Atracao[], slug: string, n: number) {
  return lista.filter((a) => a.slug !== slug).slice(0, n);
}