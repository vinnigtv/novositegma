import React from 'react';
import { ArrowRight, MapPin, Star, Phone, Calendar } from 'lucide-react';
import type { Atracao, Estabelecimento, Evento, Postagem } from '../../types';
import { Link } from '../../lib/router';
import { categoriaLabels } from '../../data/pontosTuristicos';

export const AtracaoCard: React.FC<{ atracao: Atracao; compact?: boolean }> = ({ atracao, compact }) => {
  return (
    <Link
      to={`/pontos-turisticos/${atracao.slug}`}
      className="group flex flex-col bg-surface rounded-3xl border border-olive/10 shadow-sm hover:shadow-xl hover:shadow-olive/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={atracao.imagem}
          alt={atracao.titulo}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/70 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface/95 text-olive-deep text-[10px] font-bold uppercase tracking-wider shadow">
          {categoriaLabels[atracao.categoria]}
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-umber flex items-center gap-1 shadow">
          <Star className="w-3.5 h-3.5 fill-umber text-umber" />
          {atracao.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <h3 className="text-lg font-bold text-olive-deep group-hover:text-umber leading-snug transition-colors">
          {atracao.titulo}
        </h3>
        <span className="text-xs text-umber font-semibold mt-0.5 mb-2">{atracao.subtitulo}</span>
        {!compact && (
          <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-4">{atracao.resumo}</p>
        )}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="w-3.5 h-3.5 text-umber" />
            <span className="truncate max-w-[160px]">{atracao.local}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-olive group-hover:text-umber transition-colors">
            Conhecer
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export const BusinessCard: React.FC<{ empresa: Estabelecimento }> = ({ empresa }) => {
  return (
    <article className="flex flex-col bg-surface rounded-3xl border border-olive/10 shadow-sm hover:shadow-xl hover:shadow-olive/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div className="relative h-44 overflow-hidden">
        <img src={empresa.imagem} alt={empresa.nome} loading="lazy" className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface/95 text-umber text-[10px] font-bold uppercase tracking-wider shadow">
          {empresa.categoria}
        </span>
        {empresa.destaque && (
          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-umber text-white text-[10px] font-bold uppercase tracking-wider shadow">
            Destaque
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col p-5">
        <h3 className="text-lg font-bold text-olive-deep leading-snug">{empresa.nome}</h3>
        <p className="text-sm text-muted leading-relaxed mt-2 mb-4 line-clamp-3">{empresa.descricao}</p>

        <div className="mt-auto space-y-2.5 pt-4 border-t border-olive/10 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-umber flex-shrink-0" />
            {empresa.endereco}
          </span>
          {empresa.telefone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-umber flex-shrink-0" />
              {empresa.telefone}
            </span>
          )}
          {empresa.horario && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-umber flex-shrink-0" />
              {empresa.horario}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-3">
          {empresa.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-0.5 rounded-full bg-olive-soft text-olive-deep text-[10px] font-semibold">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export const EventoCard: React.FC<{ evento: Evento }> = ({ evento }) => {
  return (
    <Link
      to="/eventos"
      className="group flex flex-col bg-surface rounded-3xl border border-olive/10 shadow-sm hover:shadow-xl hover:shadow-olive/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={evento.imagem} alt={evento.titulo} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/70 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex flex-col items-center justify-center rounded-2xl bg-surface/95 shadow-lg px-3 py-2 text-center">
          <span className="text-[10px] font-bold text-umber tracking-widest">{evento.mes}</span>
          <span className="text-lg font-bold text-olive-deep leading-none mt-0.5">{evento.dia}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <h3 className="text-lg font-bold text-olive-deep group-hover:text-umber leading-snug transition-colors">
          {evento.titulo}
        </h3>
        {evento.local && (
          <span className="flex items-center gap-1.5 text-xs text-muted mt-1.5 mb-2">
            <MapPin className="w-3.5 h-3.5 text-umber" />
            {evento.local}
          </span>
        )}
        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4">{evento.descricao}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="flex flex-wrap gap-1.5">
            {evento.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-full bg-olive-soft text-olive-deep text-[10px] font-semibold">
                {tag}
              </span>
            ))}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-olive group-hover:text-umber transition-colors">
            Ver
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export const PostCard: React.FC<{ post: Postagem }> = ({ post }) => {
  return (
    <Link
      to="/blog"
      className="group flex flex-col bg-surface rounded-3xl border border-olive/10 shadow-sm hover:shadow-xl hover:shadow-olive/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={post.imagem} alt={post.titulo} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/70 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface/95 text-umber text-[10px] font-bold uppercase tracking-wider shadow">
          {post.categoria}
        </span>
      </div>

      <div className="flex-1 flex flex-col p-5">
        <h3 className="text-lg font-bold text-olive-deep group-hover:text-umber leading-snug transition-colors">
          {post.titulo}
        </h3>
        <p className="text-sm text-muted leading-relaxed mt-2 mb-4 line-clamp-2">{post.resumo}</p>
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-olive/10 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-umber" />
            {post.data}
          </span>
          <span className="w-1 h-1 rounded-full bg-olive/30" />
          <span>{post.leitura} de leitura</span>
        </div>
      </div>
    </Link>
  );
};

interface CtaBannerProps {
  title: string;
  description: string;
  textButton: string;
  to: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ title, description, textButton, to }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-umber via-umber to-umber-deep px-6 py-14 sm:px-14 sm:py-16 text-center">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-umber-deep/60 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute top-8 left-10 w-2 h-2 rounded-full bg-white/40" />
          <div className="absolute bottom-10 right-12 w-3 h-3 rounded-full bg-white/30" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">{title}</h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8">{description}</p>
            <Link
              to={to}
              className="group inline-flex items-center gap-2 rounded-full bg-white text-umber-deep font-semibold px-7 py-3.5 text-sm shadow-lg hover:bg-umber-soft transition-all duration-200 hover:-translate-y-0.5"
            >
              {textButton}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};