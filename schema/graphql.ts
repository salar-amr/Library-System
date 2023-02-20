
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Order {
    ASC = "ASC",
    DESC = "DESC"
}

export interface RentInput {
    id: number;
    availability: Date;
}

export interface RetainInput {
    id: number;
}

export interface BookInput {
    id?: Nullable<number>;
    name?: Nullable<string>;
    available?: Nullable<boolean>;
}

export interface BookOrderInput {
    id?: Nullable<Order>;
}

export interface BookQuery {
    where?: Nullable<BookInput>;
    take?: Nullable<number>;
    skip?: Nullable<number>;
    order?: Nullable<BookOrderInput>;
}

export interface UserInput {
    email: EmailAddress;
    password: NonEmptyString;
}

export interface IMutation {
    RentBook(data: RentInput): Book | Promise<Book>;
    RetainBook(data: RetainInput): Book | Promise<Book>;
    SignIn(data: UserInput): AuthenticatedUser | Promise<AuthenticatedUser>;
}

export interface IQuery {
    Books(query?: Nullable<BookQuery>): Nullable<Book[]> | Promise<Nullable<Book[]>>;
    Users(): Nullable<User[]> | Promise<Nullable<User[]>>;
}

export interface Book {
    id?: Nullable<number>;
    name?: Nullable<string>;
    available?: Nullable<boolean>;
    availability?: Nullable<string>;
    user?: Nullable<User>;
}

export interface User {
    id: number;
    email: string;
    role?: Nullable<number>;
}

export interface AuthenticatedUser {
    user: User;
    token: string;
}

export type EmailAddress = any;
export type NonEmptyString = any;
type Nullable<T> = T | null;
