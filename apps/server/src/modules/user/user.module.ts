import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';
import {ConfigModule} from '@nestjs/config';
import {DrizzleModule} from '../../drizzle/drizzle.module';
import {UserRepository} from './user.repository';
import {RequestModule} from '../request/request.module';
import {UserOrganisationModule} from "../user-organisation/user-organisation.module";
import {OrganisationModule} from "../organisation/organisation.module";

@Module({
    providers: [UserResolver, UserService, UserRepository],
    imports: [
        ConfigModule.forRoot({
            cache: true,
        }),
        DrizzleModule,
        RequestModule,
        UserOrganisationModule,
        OrganisationModule,
    ],
    exports: [UserService, UserRepository],
})
export class UserModule {
}
