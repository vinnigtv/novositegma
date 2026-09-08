import React from 'react';
import { Car, Map, Clock, Fuel, ShieldCheck, Navigation } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CtaBanner } from '../components/ui/Cards';
import { getPageHeroImages } from '../lib/db';

const rotas = [
  {
    titulo: 'Rodovia Presidente Dutra (BR-116)',
    distancia: 'Aproximadamente 80 km desde São Paulo',
    tempo: 'Cerca de 1h de viagem',
    dica: 'Saída pelo Complexo Viário Heróis de 1932 (Marginal Tietê) sentido norte. Em Itaquaquecetuba, siga pela rodovia que leva direto a Guararema.',
    destaque: 'Ideal para quem já está na Zona Leste ou quer fugir do pedágio da Ayrton Senna.',
  },
  {
    titulo: 'Ayrton Senna / Carvalho Pinto (SP-070)',
    distancia: 'Aproximadamente 90 km desde São Paulo',
    tempo: 'Cerca de 1h de viagem',
    dica: 'Pegue a Ayrton Senna, depois a Carvalho Pinto até Santa Isabel e acesse Guararema pela estrada estadual, com vista linda da serra no caminho.',
    destaque: 'Rodovia mais nova, pavimentada e com pedágio — a escolha da maioria dos visitantes.',
  },
];

export const ComoChegarPage: React.FC = () => {
  const heroImages = getPageHeroImages();

  return (
    <>
      <PageHero
        kicker="Planeje sua viagem"
        title="Como chegar em Guararema"
        description="Duas ótimas estradas te trazem até a Cidade Natureza em cerca de uma hora — o difícil é escolher o que fazer primeiro."
        image={heroImages.comoChegar}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="De São Paulo e região"
            title="Escolha a melhor rota"
            description="Guararema fica a 80 km da capital, no Vale do Paraíba, com acesso por duas rodovias principais."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            {rotas.map((rota) => (
              <div key={rota.titulo} className="bg-surface rounded-3xl border border-olive/10 shadow-sm p-8 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-olive-soft text-olive-deep flex items-center justify-center">
                    <Car className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-olive-deep leading-snug">{rota.titulo}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-mist rounded-2xl p-4">
                    <Map className="w-4 h-4 text-umber mb-1.5" />
                    <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Distância</p>
                    <p className="text-sm font-semibold text-olive-deep">{rota.distancia}</p>
                  </div>
                  <div className="bg-mist rounded-2xl p-4">
                    <Clock className="w-4 h-4 text-umber mb-1.5" />
                    <p className="text-[11px] font-bold uppercase tracking-wide text-muted">Tempo</p>
                    <p className="text-sm font-semibold text-olive-deep">{rota.tempo}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6 flex-1">
                  <p className="text-sm text-ink/80 leading-relaxed">
                    <span className="font-bold text-olive-deep text-xs uppercase tracking-wide block mb-1">Como funciona</span>
                    {rota.dica}
                  </p>
                  <p className="text-sm text-ink/80 leading-relaxed">
                    <span className="font-bold text-olive-deep text-xs uppercase tracking-wide block mb-1">O que você ganha</span>
                    {rota.destaque}
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps/dir/Sao+Paulo/Guararema+SP"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-olive text-white font-semibold px-6 py-3 text-sm hover:bg-olive-deep transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  Traçar rota no Google Maps
                </a>
              </div>
            ))}
          </div>

          {/* Extra info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
            {[
              { icon: Fuel, titulo: 'Última parada antes do interior', texto: 'Encha o tanque e abasteça o porta-malas: o centro tem mercado e lojas de conveniência completas.' },
              { icon: ShieldCheck, titulo: 'Estradas monitoradas', texto: 'As duas rodovias contam com socorro mecânico e postos de apoio ao longo de todo o trajeto.' },
              { icon: Map, titulo: 'Bairros históricos perto', texto: 'Do Centro à Vila de Luís Carlos a distância é curta — dá para conhecer a cidade a pé ou de bicicleta.' },
            ].map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.titulo} className="bg-surface rounded-3xl border border-olive/10 p-6">
                  <Icon className="w-5 h-5 text-umber mb-3" />
                  <h4 className="text-sm font-bold text-olive-deep mb-1.5">{b.titulo}</h4>
                  <p className="text-xs text-muted leading-relaxed">{b.texto}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Quer um roteiro pronto?"
        description="Envie sua data e preferências que a gente monta o passeio ideal para a sua visita."
        textButton="Pedir roteiro personalizado"
        to="/contato"
      />
    </>
  );
};