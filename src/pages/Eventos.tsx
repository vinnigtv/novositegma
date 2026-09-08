import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { EventoCard, CtaBanner } from '../components/ui/Cards';
import { SectionHeading } from '../components/ui/SectionHeading';
import { getEventos, getPageHeroImages } from '../lib/db';

export const EventosPage: React.FC = () => {
  const eventos = getEventos();
  const heroImages = getPageHeroImages();
  const destaque = eventos.find((e) => e.destaque);
  const outros = eventos.filter((e) => !e.destaque);

  return (
    <>
      <PageHero
        crumb="/"
        kicker="Programação & eventos"
        title="A agenda cultural da Cidade Natureza"
        description="Música, festas tradicionais, gastronomia e o Natal mais encantador do Vale do Paraíba: Guararema celebra o ano inteiro."
        image={heroImages.eventos}
        meta="Programação sujeita a alteração"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Próximos eventos"
            title="O que vem por aí"
            description="Garanta lugar nos eventos mais aguardados do ano em Guararema."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[...(destaque ? [destaque] : []), ...outros].map((evento) => (
              <EventoCard key={evento.id} evento={evento} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Quer divulgar seu evento?"
        description="Inclua seu evento na agenda do Guararema.net e alcance milhares de visitantes."
        textButton="Divulgar evento"
        to="/contato"
      />
    </>
  );
};