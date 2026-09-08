import React, { useState } from 'react';
import { Lock, Eye, EyeOff, MapPin, LogIn } from 'lucide-react';
import { login } from '../../lib/auth';
import { Botao, Campo, Input } from './fields';

interface Props {
  onSucesso: () => void;
}

export const AdminLogin: React.FC<Props> = ({ onSucesso }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    const ok = await login(usuario, senha);
    setCarregando(false);
    if (ok) {
      onSucesso();
    } else {
      setErro('Usuário ou senha inválidos.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-mist">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-olive text-white mb-4">
            <MapPin className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-olive-deep">Rota Guararema</h1>
          <p className="text-sm text-muted mt-1">Área restrita · Painel administrativo</p>
        </div>

        <form
          onSubmit={enviar}
          className="bg-surface rounded-3xl border border-olive/10 shadow-xl shadow-olive/5 p-8 space-y-5"
        >
          <div className="flex items-center gap-2 text-olive-deep">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-bold">Entrar no painel</span>
          </div>

          <Campo rotulo="Usuário">
            <Input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              autoFocus
              required
            />
          </Campo>

          <Campo rotulo="Senha">
            <div className="relative">
              <Input
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarSenha((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-olive-deep cursor-pointer"
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Campo>

          {erro ? (
            <p className="text-xs font-semibold text-umber bg-umber-soft rounded-xl px-3 py-2">{erro}</p>
          ) : null}

          <Botao type="submit" disabled={carregando} className="w-full disabled:opacity-60">
            <LogIn className="w-4 h-4" />
            {carregando ? 'Verificando...' : 'Entrar'}
          </Botao>

          <p className="text-[11px] leading-relaxed text-muted border-t border-olive/10 pt-4">
            Painel de gerenciamento reservado à edição do conteúdo do site. As alterações são
            armazenadas neste dispositivo (navegador).
          </p>
        </form>
      </div>
    </main>
  );
};