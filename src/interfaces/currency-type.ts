import { IStatus } from ".";

export interface ICurrency {
    id: number;
    description: string;
    value: number | string;
    status_id: number;
    image: string;
    status: IStatus;
    created_at: string;
    updated_at: string;
}