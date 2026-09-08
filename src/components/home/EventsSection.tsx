import React from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Link } from '../../lib/router';
import { SectionHeading } from '../ui/SectionHeading';
import { EventoCard } from '../ui/Cards';
import { eventos } from '../../data/eventos';

export const EventsSection: React.FC = () => {
  const next = eventos.slice(0, 3);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="Programação & eventos"
            title="Guararema é festa o ano inteiro"
            description="Da Orquestra Sinfônica ao Natal Cidade Natureza, confira o que está por vir na agenda cultural."
          />
          <Link
            to="/eventos"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-olive hover:text-umber transition-colors flex-shrink-0"
          >
            <CalendarDays className="w-4 h-4" />
            Ver agenda completa
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {next.map((evento) => (
            <EventoCard key={evento.id} evento={evento} />
          ))}
        </div>
      </div>
    </section>
  );
};