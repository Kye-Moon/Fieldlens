import {boolean, pgTable, text, timestamp, uuid, varchar,} from 'drizzle-orm/pg-core';
import {InferInsertModel, InferSelectModel, relations, sql,} from 'drizzle-orm';

// ###################### USER ######################
export const user = pgTable('user', {
    id: uuid('id')
        .default(sql`gen_random_uuid ()`)
        .primaryKey(),
    name: text('full_name').notNull(),
    phone: varchar('phone', {length: 20}),
    password: varchar('password', {length: 100}),
    email: varchar('email', {length: 100}).unique(),
    organisationId: uuid('organisation_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export const userRelations = relations(user, ({one, many}) => ({
    organisation: one(organisation, {
        fields: [user.organisationId],
        references: [organisation.id],
    }),
    imageOverlayDefaults: one(markupDefaults, {
        fields: [user.id],
        references: [markupDefaults.userId],
    }),

}));

// ###################### ORGANISATION TABLE ######################
export const organisation = pgTable('organisation', {
    id: uuid('id')
        .default(sql`gen_random_uuid ()`)
        .primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Organisation = InferSelectModel<typeof organisation>;
export type NewOrganisation = InferInsertModel<typeof organisation>;

const organisationRelations = relations(organisation, ({one, many}) => ({
    users: many(user),
}));

export const markupDefaults = pgTable('markup_defaults', {
    id: uuid('id')
        .default(sql`gen_random_uuid ()`)
        .primaryKey(),
    userId: uuid('user_id').references(() => user.id).notNull(),
    date: boolean('show_date').default(false),
    time: boolean('show_time').default(false),
    location: boolean('show_location').default(false),
    logo: boolean('show_company_logo').default(false),
    textColor: varchar('text_color', {length: 7}).default('#000000'),
    textBackgroundColor: varchar('text_background_color', {length: 7}).default('#ffffff'),
});

export type MarkupDefaults = InferSelectModel<typeof markupDefaults>;
export type NewMarkupDefaults = InferInsertModel<typeof markupDefaults>;