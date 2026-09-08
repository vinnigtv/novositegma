import React from 'react';
import { CalendarDays } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { PostCard, CtaBanner } from '../components/ui/Cards';
import { SectionHeading } from '../components/ui/SectionHeading';
import { postagens } from '../data/blog';
import { getPageHeroImages } from '../lib/db';

export const BlogPage: React.FC = () => {
  const [principal, ...resto] = postagens;
  const heroImages = getPageHeroImages();

  return (
    <>
      <PageHero
        kicker="Blog"
        title="Dicas, roteiros e bastidores"
        description="Tudo o que a gente aprende morando na Cidade Natureza — e que ninguém mais conta para você."
        image={heroImages.blog}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured post */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <a
              href="#/blog"
              className="group relative rounded-[2rem] overflow-hidden min-h-[20rem] lg:min-h-full"
            >
              <img src={principal.imagem} alt={principal.titulo} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-olive-deep via-olive-deep/40 to-transparent" />
              <div className="relative z-10 flex flex-col justify-end p-8 min-h-[20rem]">
                <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full bg-umber text-white text-[10px] font-bold uppercase tracking-wider mb-3">
                  {principal.categoria}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight max-w-lg group-hover:text-umber-tint transition-colors">
                  {principal.titulo}
                </h2>
                <p className="text-white/85 text-sm mt-3 max-w-md line-clamp-2">{principal.resumo}</p>
                <span className="flex items-center gap-2 text-xs text-white/70 mt-5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {principal.data} · {principal.leitura} de leitura
                </span>
              </div>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {resto.slice(0, 2).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              <div className="sm:col-span-2 rounded-3xl bg-gradient-to-br from-olive to-umber p-8 flex flex-col justify-center">
                <SectionHeading
                  eyebrow="Guia gratuito"
                  title="Receba nosso guia completo"
                  description="Roteiros prontos e mapa das atrações direto no seu e-mail."
                  tone="light"
                />
                <a
                  href="#/contato"
                  className="mt-6 inline-flex items-center justify-center w-fit rounded-full bg-white text-umber-deep font-semibold px-6 py-3 text-sm hover:bg-umber-soft transition-colors"
                >
                  Pedir o guia
                </a>
              </div>
            </div>
          </div>

          {/* Other posts */}
          <SectionHeading
            align="center"
            eyebrow="Todas as publicações"
            title="Do blog para a sua viagem"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {resto.slice(2).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Tem uma história para contar?"
        description="Recebemos relatos de visitantes, dicas de moradores e sugestões de pauta para o nosso blog."
        textButton="Falar com a gente"
        to="/contato"
      />
    </>
  );
};