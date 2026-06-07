const LANGUAGE_FLAG_MAP: Record<string, string> = {
  japanese: 'jp',
  english: 'us',
  french: 'fr',
  german: 'de',
  spanish: 'es',
  italian: 'it',
  korean: 'kr',
  chinese: 'cn',
  mandarin: 'cn',
  cantonese: 'hk',
  portuguese: 'pt',
  'portuguese (br)': 'br',
  brazilian: 'br',
  russian: 'ru',
  arabic: 'sa',
  hindi: 'in',
  thai: 'th',
  vietnamese: 'vn',
  indonesian: 'id',
  malay: 'my',
  polish: 'pl',
  dutch: 'nl',
  swedish: 'se',
  norwegian: 'no',
  danish: 'dk',
  finnish: 'fi',
  greek: 'gr',
  hebrew: 'il',
  hungarian: 'hu',
  czech: 'cz',
  romanian: 'ro',
  ukrainian: 'ua',
  tagalog: 'ph',
  filipino: 'ph',
  taiwanese: 'tw',
  catalan: 'es',
};

export const getLanguageFlagCode = (language: string) => {
  const normalized = language.trim().toLowerCase();

  if (LANGUAGE_FLAG_MAP[normalized]) {
    return LANGUAGE_FLAG_MAP[normalized];
  }

  const matchedEntry = Object.entries(LANGUAGE_FLAG_MAP).find(([key]) => {
    return normalized.includes(key);
  });

  if (matchedEntry) {
    return matchedEntry[1];
  }

  return null;
};
