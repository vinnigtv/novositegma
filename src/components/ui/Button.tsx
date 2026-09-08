import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'light';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  to?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  to,
  className = '',
  ...props
}) => {
  const baseStyles =
    'group inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] gap-2';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const variantStyles = {
    primary: 'bg-olive text-white hover:bg-olive-deep shadow-lg shadow-olive/25 hover:-translate-y-0.5',
    accent: 'bg-umber text-white hover:bg-umber-deep shadow-lg shadow-umber/25 hover:-translate-y-0.5',
    outline: 'border-2 border-olive/40 text-olive-deep hover:bg-olive-soft hover:border-olive',
    ghost: 'text-muted hover:text-olive-deep hover:bg-olive-soft',
    light: 'bg-surface text-umber-deep hover:bg-umber-soft shadow-md',
  };

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (to) {
    const anchorProps = { ...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>), className: classes };
    return (
      <a href={`#${to}`} {...anchorProps}>
        {children}
        {icon && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {icon && <span className="transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};