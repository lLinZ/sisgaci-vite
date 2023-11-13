import { ICondominium, ICurrency, IProvider, IStatus, IUnit } from ".";

export interface IUncommonExpense {
    id: number;
    description: string;
    amount: string;
    currency_type: 'Dolares' | 'Bolivares';
    currency_id: number;
    currency: ICurrency;
    status_id: number;
    status: IStatus;
    provider_id: number;
    provider: IProvider;
    condominium_id: number;
    condominium: ICondominium;
    unit_id: number;
    unit: IUnit;
    created_at: string;
    updated_at: string;

}