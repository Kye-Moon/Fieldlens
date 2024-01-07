import {Module} from '@nestjs/common';
import {OrganisationService} from './organisation.service';
import {OrganisationResolver} from './organisation.resolver';
import {ConfigModule} from '@nestjs/config';
import {OrganisationRepository} from "./organisation.repository";
import {DrizzleModule} from "../../drizzle/drizzle.module";

@Module({
    providers: [OrganisationResolver, OrganisationService, OrganisationRepository],
    imports: [
        ConfigModule.forRoot({
            cache: true,
        }),
        DrizzleModule,
    ],
    exports: [OrganisationService, OrganisationRepository],
})
export class OrganisationModule {
}
