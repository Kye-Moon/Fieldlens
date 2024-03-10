/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation LoginMutationMobile($input: LoginInput!) {\n        login(loginUserInput: $input) {\n            access_token\n            refresh_token\n            user {\n                id\n            }\n        }\n    }\n": types.LoginMutationMobileDocument,
    "\n    mutation SignUpMutation($input: SignUpInput!) {\n        signup(signupInput: $input) {\n            access_token\n            refresh_token\n            user {\n                id\n            }\n        }\n    }\n": types.SignUpMutationDocument,
    "\n    mutation GetOTP($email: String!) {\n        requestVerificationCode(email: $email) {\n            msg\n            phone\n            email\n        }\n    }\n": types.GetOtpDocument,
    "\n    mutation ResetPassword($input: ResetPasswordInput!) {\n        resetPassword(input: $input) {\n            access_token\n        }\n    }\n": types.ResetPasswordDocument,
    "\n    mutation VerifyOTP($input: VerifyCodeInput!) {\n        verifyOTP(input: $input) {\n            reset_password_token\n        }\n    }\n": types.VerifyOtpDocument,
    "\n    mutation SaveImageDate($input: CreateImageInfoInput!) {\n        createImageInfo(createImageInfoInput: $input) {\n            id\n        }\n    }\n": types.SaveImageDateDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LoginMutationMobile($input: LoginInput!) {\n        login(loginUserInput: $input) {\n            access_token\n            refresh_token\n            user {\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation LoginMutationMobile($input: LoginInput!) {\n        login(loginUserInput: $input) {\n            access_token\n            refresh_token\n            user {\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SignUpMutation($input: SignUpInput!) {\n        signup(signupInput: $input) {\n            access_token\n            refresh_token\n            user {\n                id\n            }\n        }\n    }\n"): (typeof documents)["\n    mutation SignUpMutation($input: SignUpInput!) {\n        signup(signupInput: $input) {\n            access_token\n            refresh_token\n            user {\n                id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation GetOTP($email: String!) {\n        requestVerificationCode(email: $email) {\n            msg\n            phone\n            email\n        }\n    }\n"): (typeof documents)["\n    mutation GetOTP($email: String!) {\n        requestVerificationCode(email: $email) {\n            msg\n            phone\n            email\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ResetPassword($input: ResetPasswordInput!) {\n        resetPassword(input: $input) {\n            access_token\n        }\n    }\n"): (typeof documents)["\n    mutation ResetPassword($input: ResetPasswordInput!) {\n        resetPassword(input: $input) {\n            access_token\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation VerifyOTP($input: VerifyCodeInput!) {\n        verifyOTP(input: $input) {\n            reset_password_token\n        }\n    }\n"): (typeof documents)["\n    mutation VerifyOTP($input: VerifyCodeInput!) {\n        verifyOTP(input: $input) {\n            reset_password_token\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SaveImageDate($input: CreateImageInfoInput!) {\n        createImageInfo(createImageInfoInput: $input) {\n            id\n        }\n    }\n"): (typeof documents)["\n    mutation SaveImageDate($input: CreateImageInfoInput!) {\n        createImageInfo(createImageInfoInput: $input) {\n            id\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;