export interface IClient {
    id: number;
    first_name: string;
    middle_name?: string;
    lastname?: string;
    second_lastname?: string;
    document?: string;
    phone?: string;
    email?: string;
    nationality: string;
    gender: string;
    marital_status: string;
    origin: string;
    created_at: string;
    updated_at: string;
}