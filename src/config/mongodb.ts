export const MONGODB_CONFIG = {
  URI: process.env.MONGODB_URI,
  DB_NAME: process.env.MONGODB_DB_NAME ?? 'anime-browser',
} as const;
