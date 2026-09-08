import React from 'react';
import { Store } from 'lucide-react';
import { Link } from '../../lib/router';
import { SectionHeading } from '../ui/SectionHeading';

const partners = [
  { nome: 'Hangar 13', categoria: 'Restaurante' },
  { nome: 'Forneria Toscana', categoria: 'Pizzaria' },
  { nome: 'Farma Conde', categoria: 'Farmácia' },
  { nome: 'Monteiro', categoria: 'Supermercados' },
  { nome: 'Sapucaia', categoria: 'Pousada & Eventos' },
  { nome: 'Bike Box', categoria: 'Ciclismo' },
  { nome: 'Mirante do Paraíba', categoria: 'Restaurante' },
  { nome: 'CN Arquitetura', categoria: 'Arquitetura' },
  { nome: 'Alambique do Décio', categoria: 'Produção Local' },
  { nome: 'Santa Neve', categoria: 'Gelateria' },
  { nome: 'Café Rota', categoria: 'Cafeteria' },
  { nome: 'My Park Tickets', categoria: 'Ingressos' },
];

export const Partners: React.FC = () => {
  return (
    <section className="py-20 bg-surface border-y border-olive/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Parceiros"
            title="Empresas que acreditam em Guararema"
            description="Comércio e serviços locais que fazem a Cidade Natureza acontecer todos os dias."
          />
          <Link
            to="/o-projeto"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-umber hover:text-umber-deep transition-colors flex-shrink-0"
          >
            Quero ser parceiro
            <ArrowRightSmall />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {partners.map((p) => (
            <div
              key={p.nome}
              className="group flex items-center gap-2.5 px-3.5 py-3.5 rounded-2xl bg-surface border border-olive/10 hover:border-umber/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-olive-soft text-olive-deep flex items-center justify-center flex-shrink-0 group-hover:bg-umber group-hover:text-white transition-colors">
                <Store className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-olive-deep truncate">{p.nome}</p>
                <p className="text-[10px] text-muted truncate">{p.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ArrowRightSmall = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 transition-transform group-hover:translate-x-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
};