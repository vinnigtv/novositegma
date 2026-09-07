import React from 'react';
import { Train, Clock, CheckCircle2, Ticket } from 'lucide-react';
import { Button } from '../ui/Button';

export const TrainExperience: React.FC = () => {
  return (
    <section id="train" className="py-24 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 relative overflow-hidden">
          
          {/* Background Gradient Accent */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/20">
                <Train className="w-4 h-4" />
                <span>Patrimônio Histórico Vivo</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold text-white font-['Outfit'] mb-6 leading-tight">
                Passeio no Trem de Guararema (Maria Fumaça 353)
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
                Embarque na maior locomotiva a vapor em operação no Brasil. O trajeto de 6,8 km conecta a Estação Central à Vila de Luís Carlos, passando por cenários naturais preservados ao longo do Rio Paraíba do Sul.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Trajeto Cenográfico</h4>
                    <p className="text-xs text-slate-400">6,8 km de pura história ferroviária</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Vila de Luís Carlos</h4>
                    <p className="text-xs text-slate-400">Parada de 2 horas para passear e comer</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Vagões Originais</h4>
                    <p className="text-xs text-slate-400">Ambiente de época e guias turísticos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Fins de Semana e Feriados</h4>
                    <p className="text-xs text-slate-400">Passeios regulares aos sábados e domingos</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20"
                  icon={<Ticket className="w-5 h-5" />}
                  onClick={() => alert('Informações sobre a bilheteria e reservas do Trem de Guararema!')}
                >
                  Informações de Bilheteria
                </Button>
                <span className="text-xs text-slate-400">Recomendamos reservar com antecedência para os fins de semana.</span>
              </div>
            </div>

            {/* Right Card / Itinerary */}
            <div className="lg:col-span-5">
              <div className="glass p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Itinerário Ferroviário</span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Duração: ~2h30 total</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6 relative before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-0.5 before:bg-slate-700">
                  <div className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs z-10 shadow-md">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Partida na Estação Central</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Embarque na locomotiva a vapor com apito histórico.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs z-10 shadow-md">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Chegada em Luís Carlos</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Tempo livre para fotos, restaurantes e artesanato local.</p>
                    </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-slate-950 font-bold text-xs z-10 shadow-md">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Retorno ao Centro</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Viagem tranquila de volta contemplando a serra.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 text-center">
                  <div className="text-xs text-slate-400">Local de partida: <strong className="text-slate-200">Estação de Guararema, Centro</strong></div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
