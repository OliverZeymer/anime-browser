export const AUTH_CONFIG = {
  TOKEN_SECRET: process.env.TOKEN_SECRET,
} as const;

export const assertAuthConfig = () => {
  if (!AUTH_CONFIG.TOKEN_SECRET) {
    throw new Error('Missing required environment variable: TOKEN_SECRET');
  }
};
