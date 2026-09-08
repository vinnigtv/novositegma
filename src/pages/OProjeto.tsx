import React from 'react';
import { Target, HeartHandshake, Megaphone, TrendingUp } from 'lucide-react';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CtaBanner } from '../components/ui/Cards';
import { getPageHeroImages } from '../lib/db';

const valores = [
  {
    icon: Target,
    titulo: 'Turismo sustentável',
    texto: 'Acreditamos que visitar bem é respeitar: natureza preservada, comércio local fortalecido e cidade acolhedora o ano inteiro.',
  },
  {
    icon: HeartHandshake,
    titulo: 'Parceria que fortalece',
    texto: 'Cada empresa parceira ganha visibilidade no guia e a cidade ganha mais opções de qualidade para receber bem.',
  },
  {
    icon: Megaphone,
    titulo: 'Conteúdo que converte',
    texto: 'Produzimos conteúdo de verdade sobre Guararema: roteiros, fotos e experiências que atraem turistas do Brasil inteiro.',
  },
  {
    icon: TrendingUp,
    titulo: 'Dados e reconhecimento',
    texto: 'Acompanhamos o desempenho das ações e celebramos cada visita, cada reserva e cada indicação que nasce por aqui.',
  },
];

const passos = [
  { numero: '01', titulo: 'Fale com a gente', texto: 'Envie seus dados pelo formulário de contato contando sobre o seu negócio.' },
  { numero: '02', titulo: 'Escolha o plano', texto: 'Definimos juntos a melhor exposição: guia, destaques, eventos e redes sociais.' },
  { numero: '03', titulo: 'Publicamos', texto: 'Seu negócio entra no guia com fotos, descrição e formas de contato.' },
  { numero: '04', titulo: 'Acompanhe os resultados', texto: 'Relatórios periódicos mostram a visibilidade da sua marca no Guia.' },
];

export const OProjetoPage: React.FC = () => {
  const heroImages = getPageHeroImages();

  return (
    <>
      <PageHero
        kicker="Institucional"
        title="O Projeto Guararema.net"
        description="Somos o guia digital da Cidade Natureza: conectamos visitantes, moradores e negócios em torno do melhor da nossa cidade."
        image={heroImages.oProjeto}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
            <div>
              <SectionHeading
                eyebrow="Nossa missão"
                title="Facilitar cada passo da sua visita"
              />
              <div className="mt-6 space-y-4 text-ink/80 leading-relaxed">
                <p>
                  O Guararema.net nasceu da vontade de contar a história da cidade que amamos: mais do que uma
                  lista de lugares, um jeito de mostrar os segredos que só quem mora aqui conhece.
                </p>
                <p>
                  Hoje, somos a vitrine de centenas de negócios locais e um canal de inspiração para quem quer
                  descobrir a Cidade Natureza — do primeiro roteiro ao retorno apaixonado.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {valores.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.titulo} className="bg-surface rounded-3xl border border-olive/10 p-6 hover:border-umber/40 transition-colors">
                    <Icon className="w-5 h-5 text-umber mb-3" />
                    <h3 className="text-sm font-bold text-olive-deep mb-1.5">{v.titulo}</h3>
                    <p className="text-xs text-muted leading-relaxed">{v.texto}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Como ser parceiro */}
          <SectionHeading
            align="center"
            eyebrow="Seja parceiro"
            title="Como colocar seu negócio no Guia"
            description="Um processo simples e transparente, pensado para o comércio, a gastronomia e os serviços de Guararema."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {passos.map((p) => (
              <div key={p.numero} className="relative bg-surface rounded-3xl border border-olive/10 p-7 hover:-translate-y-1 transition-transform duration-300">
                <span className="absolute top-5 right-6 text-4xl font-heading font-bold text-olive/10">
                  {p.numero}
                </span>
                <h3 className="text-sm font-bold text-olive-deep mb-2">{p.titulo}</h3>
                <p className="text-xs text-muted leading-relaxed">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Vamos colocar sua marca no mapa?"
        description="Entre em contato e descubra os planos de parceria do Guararema.net."
        textButton="Quero ser parceiro"
        to="/contato"
      />
    </>
  );
};