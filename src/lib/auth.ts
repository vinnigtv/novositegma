const USUARIO = 'admin';
const SENHA_HASH = 'c881ec6b2d9befeea9c23f9c74d9d80f8af393b756b5c0c6ee3f79760d0b6ee5';
const AUTH_KEY = 'rg.auth.v1';

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function login(usuario: string, senha: string): Promise<boolean> {
  if (usuario.trim().toLowerCase() !== USUARIO) return false;
  if (typeof crypto === 'undefined' || !crypto.subtle) return false;
  try {
    const hash = await sha256(senha);
    if (hash !== SENHA_HASH) return false;
    sessionStorage.setItem(AUTH_KEY, JSON.stringify({ usuario: USUARIO, at: Date.now() }));
    return true;
  } catch {
    return false;
  }
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    return Boolean(data && data.usuario === USUARIO);
  } catch {
    return false;
  }
}