import {boolean, json, pgTable, text, timestamp, uuid, varchar,} from 'drizzle-orm/pg-core';
import {InferInsertModel, InferSelectModel, relations, sql,} from 'drizzle-orm';

// ###################### USER ######################
export const user = pgTable('user', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    authId: text('auth_id').notNull(),
    name: text('full_name'),
    phone: varchar('phone', {length: 20}),
    email: varchar('email', {length: 100}).unique(),
    status: varchar('status', {enum: ['ACTIVE', 'INACTIVE']}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export const userRelations = relations(user, ({one, many}) => ({
    imageOverlayDefaults: one(markupDefaults, {
        fields: [user.id],
        references: [markupDefaults.userId],
    }),
    organisations: many(organisation),
}));

// ###################### ORGANISATION TABLE ######################
export const organisation = pgTable('organisation', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    name: text('name').notNull(),
    authId: text('auth_id').notNull(),
    logoUrl: text('logo_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Organisation = InferSelectModel<typeof organisation>;
export type NewOrganisation = InferInsertModel<typeof organisation>;

const organisationRelations = relations(organisation, ({one, many}) => ({
    users: many(user),
}));

export const userOrganisation = pgTable('user_organisation', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    userId: uuid('user_id')
        .references(() => user.id, {onDelete: 'cascade'})
        .notNull(),
    organisationId: uuid('organisation_id')
        .references(() => organisation.id, {onDelete: 'cascade'})
        .notNull(),
    role: varchar('role').notNull(),
});

export type UserOrganisation = InferSelectModel<typeof userOrganisation>;
export type NewUserOrganisation = InferInsertModel<typeof userOrganisation>;

export const markupDefaults = pgTable('markup_defaults', {
    id: uuid('id')
        .default(
            sql`gen_random_uuid
            ()`,
        )
        .primaryKey(),
    userId: uuid('user_id')
        .references(() => user.id)
        .notNull(),
    date: boolean('show_date').default(false),
    time: boolean('show_time').default(false),
    location: boolean('show_location').default(false),
    logo: boolean('show_company_logo').default(false),
    textColor: varchar('text_color', {length: 7}).default('#000000'),
    textBackgroundColor: varchar('text_background_color', {length: 7}).default(
        '#ffffff',
    ),
});

export type MarkupDefaults = InferSelectModel<typeof markupDefaults>;
export type NewMarkupDefaults = InferInsertModel<typeof markupDefaults>;

export const imageInfo = pgTable('image_info', {
    id: uuid('id')
        .default(
            sql`gen_random_uuid
            ()`,
        )
        .primaryKey(),
    imageId: text('image_id').notNull(),
    name: text('name').notNull(),
    uri: text('uri').notNull(),
    savedLocations: json('savedLocations').$type<string[]>(),
});

export type ImageInfo = InferSelectModel<typeof imageInfo>;
export type NewImageInfo = InferInsertModel<typeof imageInfo>;
