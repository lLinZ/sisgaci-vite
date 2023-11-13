import { IStatus } from ".";

export interface IBuilding {
    id: number;
    name: string;
    units_qty: number;
    floor_qty: number;
    status_id: number;
    status: IStatus;
    created_at: string;
    updated_at: string;
}
