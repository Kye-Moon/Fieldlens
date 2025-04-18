import {Injectable} from '@nestjs/common';
import {UpdateUserInput} from './dto/update-user.input';
import {User} from './entities/user.entity';
import {UserRepository} from './user.repository';
import {RequestService} from '../request/request.service';
import {clerkClient} from "@clerk/clerk-sdk-node";
import {Organisation} from "../../drizzle/schema";
import {InviteUserInput} from "./dto/invite-user.input";
import {OrganisationService} from "../organisation/organisation.service";
import {UserOrganisationService} from "../user-organisation/user-organisation.service";

@Injectable()
export class UserService {
    constructor(
        private readonly request: RequestService,
        private readonly userRepository: UserRepository,
        private readonly organisationService: OrganisationService,
        private readonly userOrganisationService: UserOrganisationService
    ) {
    }

    async initialise(): Promise<User> {
        console.log('initialising user')
        const organisation = await this.organisationService.findOrCreateByAuthId(this.request.organisationId);
        const authUser = await clerkClient.users.getUser(this.request.userId)
        console.log('authUser', authUser)
        let user = await this.userRepository.findOneByAuthId(authUser.id);
        const userOrgRole = await this.getUserRoleFromCurrentOrg(organisation);
        if (user) {
            console.log('user exists')
            const userOrgs = await this.userOrganisationService.getAllByUserId(user.id);
            const userOrg = userOrgs.find((userOrg) => userOrg.organisationId === organisation.id);
            if (!userOrg) {
                const userOrgRole = await this.getUserRoleFromCurrentOrg(organisation);
                await this.userOrganisationService.create({
                    userId: user.id,
                    organisationId: organisation.id,
                    role: userOrgRole
                });
            }
        } else {
            console.log('user does not exist')
            user = await this.userRepository.createUser({
                name: authUser.firstName + ' ' + authUser.lastName,
                email: authUser.emailAddresses[0].emailAddress,
                authId: authUser.id,
                status: "ACTIVE",
            });
            await this.userOrganisationService.create({
                userId: user.id,
                organisationId: organisation.id,
                role: userOrgRole
            });
        }
        console.log('user', user)
        console.log("setting fieldLenz_initialised")
        await clerkClient.users.updateUserMetadata(user.authId, {
            publicMetadata: {
                ...authUser.publicMetadata,
                fieldLenz_initialised: true
            }
        })
        return user;
    }


    async findOne(id: string) {
        return await this.userRepository.findOneById(id);
    }

    async currentUser() {
        return await this.userRepository.findOneById(this.request.userId);
    }

    async update(id: string, updateUserInput: UpdateUserInput) {
        const user = await this.userRepository.findOneById(id);
        if (user) {
            return await this.userRepository.updateUser(id, updateUserInput);
        }
        return null;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    getUserRoleFromCurrentOrg = async (organisation: Organisation) => {
        const authOrgMemberships = await clerkClient.users.getOrganizationMembershipList({userId: this.request.userId});
        const userOrg = authOrgMemberships.find((membership) => membership.organization.id === organisation.authId);
        return userOrg.role;
    }
}
