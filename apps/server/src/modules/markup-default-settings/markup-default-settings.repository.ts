import {Inject, Injectable} from "@nestjs/common";
import {ORM} from "../../drizzle/drizzle.module";
import {NodePgDatabase} from 'drizzle-orm/node-postgres';
import * as schema from "../../drizzle/schema";
import {markupDefaults, NewMarkupDefaults} from "../../drizzle/schema";
import {eq} from "drizzle-orm";

@Injectable()
export class MarkupDefaultSettingsRepository {
    constructor(@Inject(ORM) private db: NodePgDatabase<typeof schema>) {
    }

    async createMarkupDefaultSettings(input: NewMarkupDefaults) {
        const _markupDefaults = await this.db
            .insert(markupDefaults)
            .values([input])
            .returning();
        return _markupDefaults[0];
    }

    async updateMarkupDefaultSettings(id: string, input: Partial<NewMarkupDefaults>) {
        const _markupDefaults = await this.db
            .update(markupDefaults)
            .set(input)
            .where(eq(markupDefaults.id, id))
            .returning();
        return _markupDefaults[0];
    }

    async findUserDefaults() {
        const _markupDefaults = await this.db
            .select()
            .from(markupDefaults)
            .where(eq(markupDefaults.userId, "ff1ad323-d1c1-4981-b5d6-b447633f0468"));
       console.log(_markupDefaults[0]);
        return _markupDefaults[0];
    }
}