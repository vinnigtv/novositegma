import React, { useState } from 'react';
import { Mail, CheckCircle2, Download, Map, CalendarHeart, UtensilsCrossed } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const benefits = [
  { icon: Map, text: 'Roteiros prontos de 1 e 2 dias' },
  { icon: CalendarHeart, text: 'Horários da Maria Fumaça' },
  { icon: UtensilsCrossed, text: 'Melhores restaurantes e pousadas' },
];

export const GuideSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute -top-24 right-10 w-96 h-96 bg-olive-soft rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-umber-soft rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative rounded-[2.5rem] bg-surface border border-olive/15 shadow-xl shadow-olive/10 overflow-hidden px-6 py-14 sm:px-14 text-center">
          <div className="absolute -top-14 -left-14 w-44 h-44 bg-olive-soft rounded-full blur-[70px]" />
          <div className="absolute -bottom-14 -right-14 w-44 h-44 bg-umber-soft rounded-full blur-[70px]" />

          <div className="relative z-10">
            <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-olive to-umber text-white flex items-center justify-center shadow-lg shadow-umber/25">
              <Download className="w-7 h-7" />
            </div>

            <SectionHeading
              align="center"
              eyebrow="Guia gratuito"
              title="Seu guia completo de Guararema em PDF"
              description="Roteiros planejados por quem mora aqui, mapa das atrações e as dicas que fazem a diferença no seu fim de semana."
            />

            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 mb-9">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <span key={b.text} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-olive-soft text-olive-deep text-xs font-semibold">
                    <Icon className="w-3.5 h-3.5 text-umber" />
                    {b.text}
                  </span>
                );
              })}
            </div>

            {submitted ? (
              <div className="mx-auto max-w-md p-4 rounded-2xl bg-olive-soft border border-olive/20 text-olive-deep flex items-center justify-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-umber" />
                Obrigado! O guia foi enviado para o seu e-mail.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-mist border border-olive/15 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-umber text-white font-semibold px-7 py-3.5 text-sm shadow-lg shadow-umber/25 hover:bg-umber-deep hover:-translate-y-0.5 transition-all duration-200"
                >
                  Baixar Guia
                </button>
              </form>
            )}

            <p className="text-xs text-muted mt-5">Sem spam. Apenas dicas selecionadas sobre o turismo da cidade.</p>
          </div>
        </div>
      </div>
    </section>
  );
};