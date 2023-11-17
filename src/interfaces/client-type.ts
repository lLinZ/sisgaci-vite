export interface IClient {
    id: number;
    first_name: string;
    middle_name?: string;
    lastname?: string;
    second_lastname?: string;
    document?: string;
    phone1?: string;
    phone2?: string;
    email?: string;
    short_address?: string;
    origin: string;
    created_at: string;
    updated_at: string;
}