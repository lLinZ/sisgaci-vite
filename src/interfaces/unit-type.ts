import { IBuilding, IStatus, IUser } from ".";

export interface IUnitType {
    id: number;
    description: string;
    size: number;
    aliquot: number;
    building_id: number;
    building: IBuilding;
    status_id: number;
    status: IStatus;
}

export interface IUnit {
    id: number;
    name: string;
    user_id: number;
    user: IUser;
    unit_type_id: number;
    unit_type: IUnitType;
    building_id: number;
    building: IBuilding;
    status_id: number;
    status?: IStatus;
    created_at: string;
    updated_at: string;
}