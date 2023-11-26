import { Clock, Film, Home, MonitorPlay, Sparkles } from 'lucide-react';

export const BASE_API = 'https://api.jikan.moe/v4';

export const Navigation = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Shows',
    href: '/shows',
    icon: MonitorPlay,
  },
  {
    name: 'Movies',
    href: '/movies',
    icon: Film,
  },
  {
    name: 'Upcoming',
    href: '/upcoming',
    icon: Clock,
  },
  {
    name: 'New Releases',
    href: '/new-releases',
    icon: Sparkles,
  },
];
