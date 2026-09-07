import React, { useState } from 'react';
import { MapPin, Star, Search, Compass } from 'lucide-react';
import type { Attraction } from '../../types';

export const Attractions: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const attractionsList: Attraction[] = [
    {
      id: '1',
      title: "Recanto do Américo (Pau D'Alho)",
      category: 'natureza',
      description: 'Pontes pênseis sobre o Rio Paraíba do Sul, quiosques, decks com vista para corredeiras e árvores centenárias.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
      location: 'R. Cel. Ramalho, Centro',
      rating: 4.9,
      tags: ['Pontes Pênseis', 'Rio', 'Ar Livre']
    },
    {
      id: '2',
      title: 'Vila Histórica de Luís Carlos',
      category: 'historia',
      description: 'Vila ferroviária do século XX restaurada, com casarios coloridos, cafés charmosos, bistrôs e lojas de artesanato.',
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80',
      location: 'Estrada Municipal Luís Carlos',
      rating: 4.8,
      tags: ['História', 'Cafés', 'Artesanato']
    },
    {
      id: '3',
      title: 'Igreja de Nossa Senhora da Escada',
      category: 'historia',
      description: 'Construída em 1652, abriga a única imagem de São Longuinho em altar no Brasil. Patrimônio tombado pelo IPHAN.',
      image: 'https://images.unsplash.com/photo-1548625361-195fe8b9c6a7?w=800&auto=format&fit=crop&q=80',
      location: 'Bairro da Freguesia da Escada',
      rating: 4.9,
      tags: ['Século XVII', 'São Longuinho', 'Patrimônio']
    },
    {
      id: '4',
      title: 'Parque da Ilha Grande',
      category: 'natureza',
      description: 'Ilha fluvial no Rio Paraíba do Sul com trilha ecológica iluminada, ponte suspensa e observação de garças e capivaras.',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
      location: 'Praça Lydia Custódio Dominguez',
      rating: 4.8,
      tags: ['Trilhas', 'Aves', 'Passeio em Família']
    },
    {
      id: '5',
      title: 'Gastronomia às Margens do Rio',
      category: 'gastronomia',
      description: 'Restaurantes com decks sobre o rio servindo peixes finos da bacia do Paraíba, costela na brasa e culinária caipira gourmet.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      location: 'Av. Beira Rio e Centro',
      rating: 4.9,
      tags: ['Peixes', 'Culinária Caipira', 'Decks']
    },
    {
      id: '6',
      title: 'Mirante de Guararema',
      category: 'natureza',
      description: 'Ponto mais alto da área urbana com vista espetacular de toda a sinuosidade do rio, montanhas e pôr do sol.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      location: 'R. Inocêncio de Melo, Morro do Gerbásio',
      rating: 4.7,
      tags: ['Vista Panorâmica', 'Pôr do Sol', 'Fotografia']
    },
    {
      id: '7',
      title: 'Estação Ferroviária Central',
      category: 'historia',
      description: 'Estação de 1891 ponto de partida da Maria Fumaça, com museu ferroviário e lojinhas de produtos típicos da região.',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&auto=format&fit=crop&q=80',
      location: 'R. Dr. Falcão, Centro',
      rating: 4.8,
      tags: ['Ferrovia', 'Maria Fumaça', 'Museu']
    },
    {
      id: '8',
      title: 'Parque da Pedra Montada',
      category: 'natureza',
      description: 'Monumento geológico natural com gigantescas pedras equilibradas, trilhas na mata atlântica e deck com vista.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
      location: 'Estrada da Pedra Montada',
      rating: 4.6,
      tags: ['Geologia', 'Trilha', 'Aventura']
    }
  ];

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'natureza', label: 'Natureza & Parques' },
    { id: 'historia', label: 'História & Cultura' },
    { id: 'gastronomia', label: 'Gastronomia' },
  ];

  const filteredAttractions = attractionsList.filter((item) => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="attractions" className="py-24 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Guia Completo
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-['Outfit'] tracking-tight">
            Roteiros e Atrações
          </h2>
          <p className="text-slate-400 mt-3 text-base sm:text-lg">
            Descubra os pontos mais incríveis para visitar em Guararema e monte seu itinerário ideal.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/25'
                    : 'glass text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome, tag ou local..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Attractions Grid */}
        {filteredAttractions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className="group rounded-2xl glass-card border border-slate-800 hover:border-emerald-500/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
              >
                {/* Image & Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                  <img
                    src={attraction.image}
                    alt={attraction.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Rating Tag */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg glass text-xs font-bold text-amber-300 flex items-center gap-1 border border-amber-500/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{attraction.rating}</span>
                  </div>

                  {/* Category Tag */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-500/80 backdrop-blur-md text-xs font-semibold text-slate-950">
                    {attraction.category.toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2 group-hover:text-emerald-400 transition-colors">
                      {attraction.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                      {attraction.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{attraction.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                      {attraction.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] text-slate-300 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass rounded-2xl border border-slate-800">
            <Compass className="w-12 h-12 text-slate-500 mx-auto mb-3 animate-bounce" />
            <p className="text-slate-300 font-medium">Nenhum ponto turístico encontrado com esses filtros.</p>
            <p className="text-xs text-slate-500 mt-1">Tente pesquisar com outros termos ou selecione todas as categorias.</p>
          </div>
        )}

      </div>
    </section>
  );
};
