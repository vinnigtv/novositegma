import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, MapPin, Store } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../ui/BrandIcons';
import { Link } from '../../lib/router';
import { getAtracoes } from '../../lib/db';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const destaquesMenu = getAtracoes().filter((a) => a.destaque).slice(0, 4);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', to: '/' },
    { label: 'A Cidade', to: '/a-cidade' },
    { label: 'Pontos Turísticos', to: '/pontos-turisticos', dropdown: true },
    { label: 'Pra Comer', to: '/pra-comer' },
    { label: 'Onde Dormir', to: '/onde-dormir' },
    { label: 'O que Fazer', to: '/o-que-fazer' },
    { label: 'Guia de Comércio', to: '/guia-de-comercios' },
    { label: 'Contato', to: '/contato' },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-olive-deep text-white/85 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs">
          <div className="flex items-center gap-4">
            <Link to="/cadastro" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Store className="w-3.5 h-3.5" />
              Cadastre sua empresa
            </Link>
            <Link to="/eventos" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin className="w-3.5 h-3.5" />
              Programação & Eventos
            </Link>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/rotaguararema"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/rotaguararema"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`bg-surface/90 backdrop-blur-xl border-b border-olive/10 transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-olive/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-olive-deep flex items-center justify-center text-white shadow-md shadow-olive/25 group-hover:scale-105 transition-transform duration-300">
                <MapPin className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="leading-none">
                <span className="text-xl font-bold tracking-tight text-olive-deep font-heading">
                  Guararema.net
                </span>
                <span className="text-[9px] font-bold tracking-[0.28em] text-umber uppercase block mt-0.5">
                  Cidade Natureza
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="relative group">
                    <Link
                      to={link.to}
                      className="flex items-center gap-1 text-sm font-medium text-ink hover:text-umber transition-colors py-1"
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>
                    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                      <div className="w-[22rem] rounded-2xl bg-surface border border-olive/10 shadow-2xl shadow-olive/10 p-3">
                        {destaquesMenu.map((a) => (
                          <Link
                            key={a.slug}
                            to={`/pontos-turisticos/${a.slug}`}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-olive-soft transition-colors"
                          >
                            <img src={a.imagem} alt="" className="w-11 h-11 rounded-lg object-cover" />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-olive-deep truncate">{a.titulo}</p>
                              <p className="text-[11px] text-muted truncate">{a.subtitulo}</p>
                            </div>
                          </Link>
                        ))}
                        <Link
                          to={link.to}
                          className="flex items-center justify-center gap-1.5 mt-2 px-3 py-2.5 rounded-xl bg-olive-soft text-olive-deep text-sm font-semibold hover:bg-olive hover:text-white transition-colors"
                        >
                          Ver todos os pontos turísticos
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm font-medium text-ink hover:text-umber transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                to="/o-projeto"
                className="group inline-flex items-center gap-2 rounded-full bg-umber text-white font-semibold px-5 py-2.5 text-sm shadow-md shadow-umber/25 hover:bg-umber-deep hover:-translate-y-0.5 transition-all"
              >
                Seja Parceiro
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl border border-olive/15 text-olive-deep hover:bg-olive-soft transition-colors"
              aria-label="Abrir menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {isOpen && (
          <div className="lg:hidden border-t border-olive/10 bg-surface">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-ink hover:text-umber hover:bg-olive-soft rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {destaquesMenu.map((a) => (
                <Link
                  key={a.slug}
                  to={`/pontos-turisticos/${a.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-sm text-muted hover:text-umber"
                >
                  → {a.titulo}
                </Link>
              ))}
              <Link
                to="/o-projeto"
                onClick={() => setIsOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-full bg-umber text-white font-semibold px-5 py-3 text-sm"
              >
                Seja Parceiro
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};