import React from 'react';
import { lembrarOrigem } from './hash';

interface LinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Link({ to, className, children, onClick }: LinkProps) {
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={() => {
        lembrarOrigem();
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}