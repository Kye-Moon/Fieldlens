import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { AuthModule } from '../modules/auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from '../modules/user/user.module';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { RequestModule } from '../modules/request/request.module';
import { ConfigModule } from '@nestjs/config';
import { ImageInfoModule } from '../modules/image-info/image-info.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        enabled: false,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: 'schema.graphql',
    }),
    AuthModule,
    UserModule,
    DrizzleModule,
    RequestModule,
    ImageInfoModule,
  ],
  controllers: [AppResolver],
  providers: [AppService],
})
export class AppModule {}
