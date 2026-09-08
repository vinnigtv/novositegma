import React from 'react';
import { Hero } from '../components/home/Hero';
import { CategoryCards } from '../components/home/CategoryCards';
import { Welcome } from '../components/home/Welcome';
import { Featured } from '../components/home/Featured';
import { TrainSection } from '../components/home/TrainSection';
import { EventsSection } from '../components/home/EventsSection';
import { Partners } from '../components/home/Partners';
import { GuideSection } from '../components/home/GuideSection';
import { CtaBanner } from '../components/ui/Cards';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <CategoryCards />
      <Welcome />
      <Featured />
      <TrainSection />
      <EventsSection />
      <Partners />
      <GuideSection />
      <CtaBanner
        title="Seu negócio no Guararema.net"
        description="Cadastro grátis na listagem simples ou card completo com fotos e contatos. Alcance milhares de visitantes todos os meses."
        textButton="Cadastre sua empresa"
        to="/cadastro"
      />
    </>
  );
};