import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { getPageHeroImages } from '../lib/db';

export const ContatoPage: React.FC = () => {
  const [enviado, setEnviado] = useState(false);
  const heroImages = getPageHeroImages();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <>
      <PageHero
        kicker="Contato"
        title="Fale com o Guararema.net"
        description="Dúvidas sobre o roteiro, indicações de lugares ou interesse em ser parceiro? Mande uma mensagem que a gente responde rapidinho."
        image={heroImages.contato}
      />

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="Envie uma mensagem"
            title="Vamos conversar?"
            description="Preencha o formulário e retornaremos o mais breve possível."
          />

          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-surface rounded-3xl border border-olive/10 shadow-sm p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wide text-muted mb-2">Nome</label>
              <input
                type="text"
                required
                placeholder="Seu nome"
                className="w-full px-4 py-3 rounded-xl bg-mist border border-olive/15 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber transition-colors"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wide text-muted mb-2">E-mail</label>
              <input
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-mist border border-olive/15 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-muted mb-2">Assunto</label>
              <select className="w-full px-4 py-3 rounded-xl bg-mist border border-olive/15 text-sm text-ink focus:outline-none focus:border-umber transition-colors">
                <option>Dúvidas sobre o roteiro</option>
                <option>Indicar um ponto turístico</option>
                <option>Quero ser parceiro</option>
                <option>Outro assunto</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wide text-muted mb-2">Mensagem</label>
              <textarea
                required
                rows={5}
                placeholder="Escreva sua mensagem..."
                className="w-full px-4 py-3 rounded-xl bg-mist border border-olive/15 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber transition-colors resize-none"
              />
            </div>
            <div className="sm:col-span-2 flex flex-wrap items-center justify-center gap-4">
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-umber text-white font-semibold px-7 py-3.5 text-sm shadow-lg shadow-umber/25 hover:bg-umber-deep hover:-translate-y-0.5 transition-all duration-200"
              >
                Enviar mensagem
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              {enviado && (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-olive-deep bg-olive-soft px-4 py-2.5 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-umber" />
                  Mensagem enviada!
                </span>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
