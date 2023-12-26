import { IUser, ISalesAgent, IClient } from ".";

export interface ICall {
    id: number;
    origin: string;
    property?: string;
    property_type: string;
    call_date: string;
    call_purpose: string;
    feedback: string;
    zone: string;
    sales_agent_id?: number;
    sales_agent?: ISalesAgent;
    client_id?: number;
    client?: IClient;
    user_id?: number;
    user?: IUser;
    crm_id?: number;
    created_at: string;
    updated_at: string;
}