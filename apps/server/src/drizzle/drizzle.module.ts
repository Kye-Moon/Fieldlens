import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
export const ORM = 'ORM';
@Module({
  providers: [
    ConfigService,
    {
      provide: ORM,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString: connectionString,
        });

        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [ORM],
})
export class DrizzleModule {}
