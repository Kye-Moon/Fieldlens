import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from "drizzle-orm/node-postgres";
import * as schema from "../../drizzle/schema";
import {NewOrganisation, organisation} from "../../drizzle/schema";
import {eq} from "drizzle-orm";

@Injectable()
export class OrganisationRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async findOneById(id: string) {
        return await this.db.query.organisation.findFirst({
            where: eq(organisation.id, id)
        })
    }
    async findByAuthId(authId: string) {
        return await this.db.query.organisation.findFirst({
            where: eq(organisation.authId, authId)
        })
    }

    async findOneByName(name: string) {
        return await this.db.query.organisation.findFirst({
            where: eq(organisation.name, name)
        })
    }

    async create(input: NewOrganisation) {
        const _org = await this.db.insert(organisation).values([input]).returning();
        return _org[0];
    }

}