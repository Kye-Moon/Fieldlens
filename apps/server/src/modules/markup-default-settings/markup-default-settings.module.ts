import { Module } from '@nestjs/common';
import { MarkupDefaultSettingsService } from './markup-default-settings.service';
import { MarkupDefaultSettingsResolver } from './markup-default-settings.resolver';
import {ConfigModule} from "@nestjs/config";
import {DrizzleModule} from "../../drizzle/drizzle.module";
import {RequestModule} from "../request/request.module";
import {MarkupDefaultSettingsRepository} from "./markup-default-settings.repository";

@Module({
  providers: [MarkupDefaultSettingsResolver, MarkupDefaultSettingsService,MarkupDefaultSettingsRepository],
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    DrizzleModule,
    RequestModule,
    ],
    exports: [MarkupDefaultSettingsService, MarkupDefaultSettingsRepository],
})
export class MarkupDefaultSettingsModule {}
