/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateImageInfoInput = {
  imageId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  savedLocations: Array<Scalars['String']['input']>;
  uri: Scalars['String']['input'];
};

export type CreateOrganisationInput = {
  authId: Scalars['String']['input'];
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  authId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type ImageInfo = {
  __typename?: 'ImageInfo';
  id: Scalars['String']['output'];
  imageId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  savedLocations: Array<Scalars['String']['output']>;
  uri: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createImageInfo: ImageInfo;
  createOrganisation: Organisation;
  createUser: User;
  initialiseUser: User;
  removeImageInfo: ImageInfo;
  removeOrganisation: Organisation;
  removeUser: User;
  updateOrganisation: Organisation;
  updateUser: User;
};


export type MutationCreateImageInfoArgs = {
  createImageInfoInput: CreateImageInfoInput;
};


export type MutationCreateOrganisationArgs = {
  createOrganisationInput: CreateOrganisationInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveImageInfoArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveOrganisationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateOrganisationArgs = {
  updateOrganisationInput: UpdateOrganisationInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  imageInfo: Array<ImageInfo>;
  organisation: Organisation;
  searchUsers: Array<User>;
  user: User;
};


export type QueryOrganisationArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchUsersArgs = {
  userSearchInput: SearchUserInput;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type SearchUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organisationId?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateOrganisationInput = {
  authId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  authId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  authId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organisation?: Maybe<Organisation>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userOrganisation?: Maybe<UserOrganisation>;
};

export type UserOrganisation = {
  __typename?: 'UserOrganisation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  organisation: Organisation;
  organisationId: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type InitialiseUserMutationVariables = Exact<{ [key: string]: never; }>;


export type InitialiseUserMutation = { __typename?: 'Mutation', initialiseUser: { __typename?: 'User', id: string } };

export type SaveImageDateMutationVariables = Exact<{
  input: CreateImageInfoInput;
}>;


export type SaveImageDateMutation = { __typename?: 'Mutation', createImageInfo: { __typename?: 'ImageInfo', id: string } };


export const InitialiseUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InitialiseUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initialiseUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InitialiseUserMutation, InitialiseUserMutationVariables>;
export const SaveImageDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveImageDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateImageInfoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createImageInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createImageInfoInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SaveImageDateMutation, SaveImageDateMutationVariables>;