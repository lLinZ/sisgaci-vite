import { IRole } from "./role-type";
import { IStatus } from "./status-type";

export interface IUser {
    id: number;
    first_name: string;
    middle_name?: string;
    lastname: string;
    second_lastname?: string;
    document: string;
    phone: string;
    photo?: string;
    email: string;
    role_id: number;
    role?: IRole;
    level: number;
    status_id: number;
    status?: IStatus;
    created_at: string;
    logged: boolean;
    color: string;
    darken: string;
    lighten: string;
    token?: string;
}