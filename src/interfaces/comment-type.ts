import { ICall, IUser } from ".";

export interface IComment {
    id: number;
    description: string;
    author: string;
    call_id?: number;
    user_id?: number;
    call?: ICall;
    user?: IUser;
    created_at: string;
    updated_at: string;
}