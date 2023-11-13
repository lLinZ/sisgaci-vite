import { FC } from 'react';
import { Box } from '@mui/material';
import { getFormatDistanceToNow } from '../../../helpers/functions';
import { TypographyCustom } from '../../custom';
import { ImageDialog } from '.';
import { IPayment } from '../../../interfaces';

interface PaymentCardProps {
    payment: IPayment;
}
export const PaymentItem: FC<PaymentCardProps> = ({ payment }) => {
    return (
        <Box sx={{ width: '100%', height: '100%', p: 2, mt: 2, borderRadius: 3, background: '#FFF', boxShadow: '0 2px 8px rgba(100,100,100,0.1)', display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexFlow: 'column wrap' }}>
                <TypographyCustom color="text.primary" variant={'subtitle1'}>
                    {payment.description}
                </TypographyCustom>
                <TypographyCustom _color='success' variant="h5" fontWeight="bold">
                    {payment.amount} {payment.currency === 'Dolares' ? '$' : 'Bs'}
                </TypographyCustom>
                <TypographyCustom color='text.secondary' variant="body1" >
                    {payment.payment_type}
                </TypographyCustom>
                <TypographyCustom color="text.disabled" variant="subtitle2" fontmode={2} fontWeight={'bold'}>
                    {getFormatDistanceToNow(new Date(payment.created_at))}
                </TypographyCustom>
            </Box>
            <ImageDialog image={payment.image ? payment.image : ''} />
        </Box>
    )
}