import { IRole } from "./role-type";
import { IStatus } from "./status-type";

export interface IUser {
    id: number;
    nombre: string;
    segundo_nombre?: string;
    apellido: string;
    segundo_apellido?: string;
    cedula: string;
    telefono: string;
    email: string;
    role_id: number;
    role?: IRole;
    status_id: number;
    status?: IStatus;
    created_at: string;
    logged: boolean;
    color: string;
    token?: string;
}