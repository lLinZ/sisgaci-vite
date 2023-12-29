import { IPropertyTransactionType, IPropertyType, IStatus, IUser } from ".";
import { ILaravelPagination } from "./pagination-type";

export interface IAcquisition {
    id: number;
    name: string;
    code: string;
    main_pic: string;
    price: number;
    short_address: string;
    property_type_id: number;
    property_type: IPropertyType;
    property_transaction_type_id: number;
    property_transaction_type: IPropertyTransactionType;
    web_description: string;
    user_id: number;
    user: IUser;
    status_id: number;
    status: IStatus;
    created_at: string;
    updated_at: string;
}
export interface IPaginationAcquistions extends ILaravelPagination {
    data: IAcquisition[] | null;
}