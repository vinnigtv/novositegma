import React from 'react';
import { Compass, Heart, MapPin, Phone, Mail, Globe, Share2, Camera } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
                <Compass className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-bold text-white font-['Outfit']">
                Guararema
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Descubra o refúgio perfeito da Grande São Paulo e Vale do Paraíba. Ecoturismo, gastronomia, história e a serenidade do Rio Paraíba do Sul.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Galeria de Fotos"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Compartilhar"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="Website Oficial"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navegação */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-['Outfit']">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="text-slate-400 hover:text-emerald-400 transition-colors">Início</a>
              </li>
              <li>
                <a href="#highlights" className="text-slate-400 hover:text-emerald-400 transition-colors">Principais Destaques</a>
              </li>
              <li>
                <a href="#attractions" className="text-slate-400 hover:text-emerald-400 transition-colors">Pontos Turísticos</a>
              </li>
              <li>
                <a href="#train" className="text-slate-400 hover:text-emerald-400 transition-colors">Passeio de Trem</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Atrações */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-['Outfit']">
              Lugares Populares
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-slate-400">Recanto do Américo</span>
              </li>
              <li>
                <span className="text-slate-400">Vila de Luís Carlos</span>
              </li>
              <li>
                <span className="text-slate-400">Parque da Ilha Grande</span>
              </li>
              <li>
                <span className="text-slate-400">Igreja da Escada</span>
              </li>
              <li>
                <span className="text-slate-400">Mirante Municipal</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Informações de Visita */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-['Outfit']">
              Informações
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Guararema - SP, Brasil</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Centro de Atendimento ao Turista</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>turismo@guararema.sp.gov.br</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Guararema Turismo. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>para visitantes & moradores</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
