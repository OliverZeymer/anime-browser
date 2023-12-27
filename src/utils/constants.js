import { Clock, Facebook, Film, Home, Instagram, MonitorPlay, Sparkles, Twitter } from 'lucide-react';

export const BASE_API = 'https://api.jikan.moe/v4';

export const Navigation = [
  {
    name: 'Home',
    href: '/',
    params: {},
    icon: Home,
  },
  {
    name: 'Anime',
    href: '/anime',
    params: {},
    icon: MonitorPlay,
  },
  {
    name: 'Movies',
    href: '/anime',
    params: {
      type: 'movie',
    },
    icon: Film,
  },
  {
    name: 'Upcoming',
    href: '/anime',
    params: {
      status: 'upcoming',
    },
    icon: Clock,
  },
  {
    name: 'New Releases',
    href: '/anime',
    params: {
      status: 'airing',
    },
    icon: Sparkles,
  },
];
export const Socials = [
  {
    label: 'twitter',
    href: 'https://www.twitter.com',
    icon: Twitter,
  },
  {
    label: 'instagram',
    href: 'https://www.instagram.com',
    icon: Instagram,
  },
];

export const animeGenres = [
  {
    value: 1,
    label: 'action',
    count: 4994,
  },
  {
    value: 2,
    label: 'adventure',
    count: 3970,
  },
  {
    value: 5,
    label: 'avant garde',
    count: 849,
  },
  {
    value: 46,
    label: 'award winning',
    count: 241,
  },
  {
    value: 28,
    label: 'boys love',
    count: 174,
  },
  {
    value: 4,
    label: 'comedy',
    count: 7208,
  },
  {
    value: 8,
    label: 'drama',
    count: 2901,
  },
  {
    value: 10,
    label: 'fantasy',
    count: 5565,
  },
  {
    value: 26,
    label: 'girls love',
    count: 107,
  },
  {
    value: 47,
    label: 'gourmet',
    count: 163,
  },
  {
    value: 14,
    label: 'horror',
    count: 544,
  },
  {
    value: 7,
    label: 'mystery',
    count: 887,
  },
  {
    value: 22,
    label: 'romance',
    count: 2047,
  },
  {
    value: 24,
    label: 'sci-fi',
    count: 3201,
  },
  {
    value: 36,
    label: 'slice of life',
    count: 1636,
  },
  {
    value: 30,
    label: 'sports',
    count: 771,
  },
  {
    value: 37,
    label: 'supernatural',
    count: 1491,
  },
  {
    value: 41,
    label: 'suspense',
    count: 273,
  },
  {
    value: 9,
    label: 'ecchi',
    count: 791,
  },
  {
    value: 50,
    label: 'adult cast',
    count: 567,
  },
  {
    value: 51,
    label: 'anthropomorphic',
    count: 930,
  },
  {
    value: 53,
    label: 'childcare',
    count: 69,
  },
  {
    value: 54,
    label: 'combat sports',
    count: 91,
  },
  {
    value: 55,
    label: 'delinquents',
    count: 69,
  },
  {
    value: 39,
    label: 'detective',
    count: 309,
  },
  {
    value: 56,
    label: 'educational',
    count: 269,
  },
  {
    value: 57,
    label: 'gag humor',
    count: 241,
  },
  {
    value: 58,
    label: 'gore',
    count: 252,
  },
  {
    value: 35,
    label: 'harem',
    count: 462,
  },
  {
    value: 59,
    label: 'high stakes game',
    count: 46,
  },
  {
    value: 13,
    label: 'historical',
    count: 1528,
  },
  {
    value: 60,
    label: 'idols',
    count: 304,
  },
  {
    value: 62,
    label: 'isekai',
    count: 344,
  },
  {
    value: 66,
    label: 'mahou shoujo',
    count: 330,
  },
  {
    value: 17,
    label: 'martial arts',
    count: 602,
  },
  {
    value: 18,
    label: 'mecha',
    count: 1271,
  },
  {
    value: 38,
    label: 'military',
    count: 702,
  },
  {
    value: 19,
    label: 'music',
    count: 4068,
  },
  {
    value: 6,
    label: 'mythology',
    count: 638,
  },
  {
    value: 68,
    label: 'organized crime',
    count: 84,
  },
  {
    value: 69,
    label: 'otaku culture',
    count: 92,
  },
  {
    value: 20,
    label: 'parody',
    count: 757,
  },
  {
    value: 71,
    label: 'pets',
    count: 107,
  },
  {
    value: 40,
    label: 'psychological',
    count: 419,
  },
  {
    value: 3,
    label: 'racing',
    count: 249,
  },
  {
    value: 72,
    label: 'reincarnation',
    count: 135,
  },
  {
    value: 21,
    label: 'samurai',
    count: 235,
  },
  {
    value: 23,
    label: 'school',
    count: 2011,
  },
  {
    value: 75,
    label: 'showbiz',
    count: 37,
  },
  {
    value: 29,
    label: 'space',
    count: 623,
  },
  {
    value: 11,
    label: 'strategy game',
    count: 322,
  },
  {
    value: 31,
    label: 'super power',
    count: 702,
  },
  {
    value: 76,
    label: 'survival',
    count: 93,
  },
  {
    value: 77,
    label: 'team sports',
    count: 306,
  },
  {
    value: 78,
    label: 'time travel',
    count: 145,
  },
  {
    value: 32,
    label: 'vampire',
    count: 165,
  },
  {
    value: 79,
    label: 'video game',
    count: 146,
  },
  {
    value: 80,
    label: 'visual arts',
    count: 90,
  },
  {
    value: 48,
    label: 'workplace',
    count: 189,
  },
  {
    value: 15,
    label: 'kids',
    count: 6323,
  },
  {
    value: 42,
    label: 'seinen',
    count: 999,
  },
  {
    value: 25,
    label: 'shoujo',
    count: 477,
  },
  {
    value: 27,
    label: 'shounen',
    count: 1923,
  },
];
