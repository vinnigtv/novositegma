export interface Attraction {
  id: string;
  title: string;
  category: 'natureza' | 'cultura' | 'gastronomia' | 'historia';
  description: string;
  image: string;
  location: string;
  rating: number;
  featured?: boolean;
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface QuickStat {
  label: string;
  value: string;
  description: string;
}
