import React, { useState } from 'react';
import { Mail, CheckCircle2, Download } from 'lucide-react';
import { Button } from '../ui/Button';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 glass-card border border-emerald-500/30 overflow-hidden text-center">
          
          {/* Subtle Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-teal-500/20 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <Download className="w-6 h-6" />
            </div>

            <h3 className="text-2xl sm:text-4xl font-bold text-white font-['Outfit'] mb-4">
              Receba o Guia Completo de Guararema em PDF
            </h3>

            <p className="text-slate-300 text-sm sm:text-base mb-8">
              Roteiros prontos de 1 e 2 dias, mapa das atrações, horários da Maria Fumaça e melhores restaurantes para o seu fim de semana perfeito.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-2 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Obrigado! O guia foi enviado com sucesso para o seu e-mail.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <Button type="submit" variant="primary" size="md">
                  Baixar Guia
                </Button>
              </form>
            )}

            <p className="text-[11px] text-slate-500 mt-4">
              Sem spam. Apenas dicas selecionadas e atualizadas sobre o turismo da cidade.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
