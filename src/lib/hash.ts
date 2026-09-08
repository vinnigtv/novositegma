import { useEffect, useState } from 'react';

export function getPath(): string {
  const raw = window.location.hash.replace(/^#/, '');
  return raw === '' ? '/' : raw;
}

export function navigate(to: string) {
  window.location.hash = to;
}

export function usePath(): string {
  const [path, setPath] = useState<string>(getPath);
  useEffect(() => {
    const onChange = () => setPath(getPath());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return path;
}