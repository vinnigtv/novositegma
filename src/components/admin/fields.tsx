import React from 'react';

export const Campo: React.FC<{ rotulo: string; dica?: string; children: React.ReactNode }> = ({
  rotulo,
  dica,
  children,
}) => (
  <label className="block">
    <span className="block text-xs font-bold text-olive-deep uppercase tracking-wide mb-1.5">{rotulo}</span>
    {children}
    {dica ? <span className="block text-xs text-muted mt-1">{dica}</span> : null}
  </label>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition"
  />
);

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink placeholder-muted focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition resize-y"
  />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select
    {...props}
    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-olive/20 text-sm text-ink focus:outline-none focus:border-umber focus:ring-2 focus:ring-umber/15 transition cursor-pointer"
  />
);

export const TextLines: React.FC<{ valor: string[]; onChange: (v: string[]) => void; linha: string }> = ({
  valor,
  onChange,
  linha,
}) => (
  <Textarea
    value={Array.isArray(valor) ? valor.join('\n') : ''}
    onChange={(e) => onChange(e.target.value.split('\n'))}
    rows={Math.max(2, valor.length + 1)}
    placeholder={linha}
  />
);

export const Toggle: React.FC<{ rotulo: string; valor: boolean; onChange: (v: boolean) => void }> = ({
  rotulo,
  valor,
  onChange,
}) => (
  <button
    type="button"
    onClick={() => onChange(!valor)}
    aria-pressed={valor}
    className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
      valor ? 'bg-olive text-white' : 'bg-olive/10 text-olive-deep border border-olive/20'
    }`}
  >
    {rotulo}
  </button>
);

export const Botao: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variante?: 'primario' | 'secao' | 'perigo' }
> = ({ variante = 'primario', className = '', ...props }) => {
  const base =
    'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer';
  const estilos =
    variante === 'primario'
      ? 'bg-olive text-white hover:bg-olive-deep'
      : variante === 'perigo'
        ? 'bg-umber text-white hover:bg-umber-deep'
        : 'bg-olive/10 text-olive-deep hover:bg-olive/20';
  return (
    <button {...props} className={`${base} ${estilos} ${className}`} />
  );
};