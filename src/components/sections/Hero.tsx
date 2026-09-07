import React from 'react';
import { ArrowRight, Trees, Train, Sparkles, Star, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium mb-8 animate-fade-in shadow-inner">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>O refúgio perfeito a apenas 80 km de São Paulo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] leading-[1.1] mb-6">
            Descubra os Encantos de{' '}
            <span className="text-gradient-nature inline-block">
              Guararema
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Conhecida como a <strong className="text-white font-semibold">Cidade Natureza</strong>, encante-se com ilhas fluviais, a histórica Maria Fumaça, pontes pênseis, artesanato e uma gastronomia inesquecível às margens do Rio Paraíba do Sul.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={() => {
                const el = document.getElementById('attractions');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar Pontos Turísticos
            </Button>
            <Button
              variant="secondary"
              size="lg"
              icon={<Train className="w-5 h-5 text-amber-400" />}
              onClick={() => {
                const el = document.getElementById('train');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Passeio Maria Fumaça
            </Button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-card p-5 rounded-2xl text-left border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                  <Trees className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white font-['Outfit']">+15</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Parques e Recantos Naturais</p>
            </div>

            <div className="glass-card p-5 rounded-2xl text-left border border-slate-800 hover:border-amber-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <Train className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white font-['Outfit']">1889</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Tradição Ferroviária Histórica</p>
            </div>

            <div className="glass-card p-5 rounded-2xl text-left border border-slate-800 hover:border-teal-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white font-['Outfit']">~1h</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Distância da Capital SP</p>
            </div>

            <div className="glass-card p-5 rounded-2xl text-left border border-slate-800 hover:border-yellow-500/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20 transition-colors">
                  <Star className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white font-['Outfit']">4.9/5</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Avaliação dos Visitantes</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
