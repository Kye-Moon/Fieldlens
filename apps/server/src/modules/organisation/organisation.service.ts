import {Injectable} from '@nestjs/common';
import {CreateOrganisationInput} from './dto/create-organisation.input';
import {UpdateOrganisationInput} from './dto/update-organisation.input';
import {OrganisationRepository} from "./organisation.repository";
import {clerkClient} from "@clerk/clerk-sdk-node";

@Injectable()
export class OrganisationService {

    constructor(
        private readonly organisationRepository: OrganisationRepository,
    ) {
    }

    async findOrCreateByAuthId(authId: string) {
        const org = await this.organisationRepository.findByAuthId(authId);
        if (org) {
            return org;
        } else {
            const authOrg = await clerkClient.organizations.getOrganization({organizationId: authId})
            return await this.create({
                name: authOrg.name,
                authId: authId
            });
        }
    }

    create(createOrganisationInput: CreateOrganisationInput) {
        return this.organisationRepository.create(createOrganisationInput);
    }

    findAll() {
        return `This action returns all organisation`;
    }

    async findOne(id: string) {
        return await this.organisationRepository.findOneById(id)
    }

    findOneByName(name: string) {
        return this.organisationRepository.findOneByName(name);
    }

    update(id: number, updateOrganisationInput: UpdateOrganisationInput) {
        return `This action updates a #${id} organisation`;
    }

    remove(id: number) {
        return `This action removes a #${id} organisation`;
    }
}
