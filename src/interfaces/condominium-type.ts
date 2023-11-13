import { IBuilding, IStatus } from ".";

export interface ICondominium {
    id: number;
    year: string;
    month: string;
    description: string;
    building_id: number;
    building: IBuilding;
    status_id: number;
    status: IStatus;
    created_at: Date;
    updated_at: Date;
}