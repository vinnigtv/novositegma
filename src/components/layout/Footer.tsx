import React from 'react';
import { Mail, MapPin, Heart, Phone } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../ui/BrandIcons';
import { Link } from '../../lib/router';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-umber-deep text-white/80 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-olive via-umber to-umber" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-olive to-umber flex items-center justify-center text-white">
                <MapPin className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="leading-none">
                <span className="text-xl font-bold tracking-tight text-white font-heading">Guia Guararema</span>
                <span className="text-[9px] font-bold tracking-[0.28em] text-umber-tint uppercase block mt-0.5">
                  Cidade Natureza
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              O guia digital da Cidade Natureza: pontos turísticos, gastronomia, hospedagem e os segredos que
              ninguém mais conta sobre Guararema.
            </p>
            <div className="flex items-center gap-2.5 mt-6">
              <a
                href="https://www.instagram.com/rotaguararema"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white/80 hover:bg-white hover:text-umber-deep transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/rotaguararema"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white/80 hover:bg-white hover:text-umber-deep transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:contato@rotaguararema.com.br"
                className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white/80 hover:bg-white hover:text-umber-deep transition-colors"
                aria-label="E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Navegação</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/a-cidade" className="hover:text-white transition-colors">A Cidade</Link></li>
              <li><Link to="/pontos-turisticos" className="hover:text-white transition-colors">Pontos Turísticos</Link></li>
              <li><Link to="/pra-comer" className="hover:text-white transition-colors">Pra Comer</Link></li>
              <li><Link to="/onde-dormir" className="hover:text-white transition-colors">Onde Dormir</Link></li>
              <li><Link to="/o-que-fazer" className="hover:text-white transition-colors">O que Fazer</Link></li>
            </ul>
          </div>

          {/* Atrações populares */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Imperdíveis</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/pontos-turisticos/pau-dalho" className="hover:text-white transition-colors">Recanto do Américo</Link></li>
              <li><Link to="/pontos-turisticos/vila-de-luis-carlos" className="hover:text-white transition-colors">Vila de Luís Carlos</Link></li>
              <li><Link to="/pontos-turisticos/ilha-grande" className="hover:text-white transition-colors">Parque da Ilha Grande</Link></li>
              <li><Link to="/pontos-turisticos/mirante-do-gerbasio" className="hover:text-white transition-colors">Mirante do Gerbásio</Link></li>
              <li><Link to="/pontos-turisticos/estacao-de-trem-maria-fumaca-e-pontilhao" className="hover:text-white transition-colors">Maria Fumaça</Link></li>
            </ul>
          </div>

          {/* Institucional & Mais informações */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Institucional</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/o-projeto" className="hover:text-white transition-colors">O Projeto</Link></li>
                <li><Link to="/eventos" className="hover:text-white transition-colors">Eventos</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/cidade-natal" className="hover:text-white transition-colors">Cidade Natal</Link></li>
                <li><Link to="/como-chegar" className="hover:text-white transition-colors">Como Chegar</Link></li>
                <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Para empresas</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/cadastro" className="hover:text-white transition-colors">Cadastre sua empresa grátis</Link></li>
                <li><Link to="/guia-de-comercios" className="hover:text-white transition-colors">Guia de Comércio & Serviços</Link></li>
                <li><Link to="/o-projeto" className="hover:text-white transition-colors">Planos de parceria</Link></li>
                <li className="flex items-start gap-2 pt-1 text-sm text-white/70">
                  <Phone className="w-4 h-4 text-umber-tint flex-shrink-0 mt-0.5" />
                  <span>Telefones úteis na Secretaria de Turismo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Guia Guararema. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-umber-tint fill-umber-tint inline" />
            <span>para visitantes & moradores da Cidade Natureza</span>
          </div>
        </div>
      </div>
    </footer>
  );
};