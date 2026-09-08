import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../components/ui/BrandIcons';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';

export const ContatoPage: React.FC = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  const canais = [
    { icon: Mail, titulo: 'E-mail', texto: 'contato@rotaguararema.com.br', href: 'mailto:contato@rotaguararema.com.br' },
    { icon: Phone, titulo: 'Telefone', texto: 'Secretaria de Turismo de Guararema', href: 'tel:+55114693XXXX' },
    { icon: Clock, titulo: 'Atendimento', texto: 'Seg. a sex., das 9h às 17h' },
    { icon: MapPin, titulo: 'Endereço', texto: 'Guararema · SP · Brasil' },
  ];

  return (
    <>
      <PageHero
        crumb="/"
        kicker="Contato"
        title="Fale com o Guararema.net"
        description="Dúvidas sobre o roteiro, indicações de lugares ou interesse em ser parceiro? Mande uma mensagem que a gente responde rapidinho."
        image="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1600&auto=format&fit=crop&q=80"
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <SectionHeading
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
                <div className="sm:col-span-2 flex items-center gap-4">
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

            <div className="lg:col-span-5 space-y-4">
              {canais.map((c) => {
                const Icon = c.icon;
                const content = (
                  <>
                    <div className="w-11 h-11 rounded-2xl bg-olive-soft text-olive-deep flex items-center justify-center flex-shrink-0 group-hover:bg-umber group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted">{c.titulo}</p>
                      <p className="text-sm font-semibold text-olive-deep">{c.texto}</p>
                    </div>
                  </>
                );
                const classes =
                  'group flex items-center gap-4 bg-surface rounded-2xl border border-olive/10 p-5 hover:border-umber/40 hover:-translate-y-0.5 transition-all duration-300';
                return c.href ? (
                  <a key={c.titulo} href={c.href} className={classes}>
                    {content}
                  </a>
                ) : (
                  <div key={c.titulo} className={classes}>
                    {content}
                  </div>
                );
              })}

              <div className="rounded-2xl bg-gradient-to-br from-olive to-umber p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Siga o Guararema.net</h3>
                <p className="text-sm text-white/85 mb-4">Fotos, novidades e bastidores no nosso dia a dia.</p>
                <div className="flex gap-2.5">
                  <a
                    href="https://www.instagram.com/rotaguararema"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-umber-deep font-semibold px-4 py-2 text-sm hover:bg-umber-soft transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/rotaguararema"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur text-white font-semibold px-4 py-2 text-sm hover:bg-white/25 transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4" /> Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};