import * as z from "zod";
import {InferType} from "prop-types";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

export type SignInFormType = InferType<typeof signInSchema>;

export const signUpSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(3),
});

export type SignUpFormType = InferType<typeof signInSchema>;