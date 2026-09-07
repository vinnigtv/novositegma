import React from 'react';
import { Trees, Train, Mountain, Waves, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Highlights: React.FC = () => {
  const highlights = [
    {
      id: 'pau-dalho',
      title: "Recanto do Américo (Pau D'Alho)",
      subtitle: 'Passarelas suspensas & Natureza',
      description: 'Caminhe sobre as águas do Rio Paraíba do Sul por pontes pênseis e decks ecológicos cercados por árvores centenárias e fauna exuberante.',
      icon: Waves,
      gradient: 'from-emerald-600/30 to-teal-900/40',
      badge: 'Cartão Postal',
      features: ['Pontes Pênseis', 'Vista Panorâmica do Rio', 'Quiosques e Praça', 'Acesso Gratuito']
    },
    {
      id: 'maria-fumaca',
      title: 'Trem de Guararema & Luís Carlos',
      subtitle: 'Viagem histórica a vapor',
      description: 'Uma verdadeira viagem no tempo a bordo da famosa Maria Fumaça 353, partindo do centro até a charmosa e preservada Vila de Luís Carlos.',
      icon: Train,
      gradient: 'from-amber-600/30 to-orange-900/40',
      badge: 'Experiência Histórica',
      features: ['Locomotiva 353 a Vapor', 'Vila Ferroviária Restaurada', 'Cafés e Artesanato', 'Passeio Familiar']
    },
    {
      id: 'ilha-grande',
      title: 'Parque da Ilha Grande',
      subtitle: 'Santuário de biodiversidade no rio',
      description: 'Uma ilha inteira transformada em parque urbano no Rio Paraíba do Sul com trilhas ecológicas pavimentadas, pontes e playground.',
      icon: Trees,
      gradient: 'from-teal-600/30 to-emerald-900/40',
      badge: 'Ecoturismo',
      features: ['Trilhas Ecológicas', 'Fauna e Aves Silvestres', 'Espaço Infantil', 'Total Acessibilidade']
    },
    {
      id: 'mirante',
      title: 'Mirante Municipal',
      subtitle: 'Vista 360° do Vale',
      description: 'Do topo do morro, contemple uma das vistas mais espetaculares da cidade, da curva sinuosa do rio e das montanhas da Serra da Mantiqueira ao fundo.',
      icon: Mountain,
      gradient: 'from-cyan-600/30 to-blue-900/40',
      badge: 'Pôr do Sol Mágico',
      features: ['Vista Panorâmica 360°', 'Lunetas de Observação', 'Restaurante & Café', 'Pôr do Sol Incrível']
    }
  ];

  return (
    <section id="highlights" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Imperdível
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-['Outfit'] tracking-tight">
              Principais Destaques
            </h2>
            <p className="text-slate-400 mt-3 text-base sm:text-lg max-w-xl">
              Experiências inesquecíveis que tornam Guararema um dos destinos mais apaixonantes do estado.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => {
              const el = document.getElementById('attractions');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver Todas as Atrações
          </Button>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-3xl p-8 glass-card border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-950/40"
              >
                {/* Subtle Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10`} />

                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center text-emerald-400 shadow-md group-hover:scale-110 group-hover:border-emerald-500/40 transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-white font-['Outfit'] mb-3 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-800/80">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
