import { FC } from 'react'
import { IPayment } from '../../../interfaces'
import { PaymentItem } from '.';

interface Props {
    payments: IPayment[];
}
export const PagosList: FC<Props> = ({ payments }) => {
    return payments && payments.map((payment) => (<PaymentItem payment={payment} key={payment.id} />))
}