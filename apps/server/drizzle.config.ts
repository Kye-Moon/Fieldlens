import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgresql://postgres:G5cDDGCEb5d2C62c614EaB6cEC41aabD@viaduct.proxy.rlwy.net:24986/railway`,
  },
} as Config;
