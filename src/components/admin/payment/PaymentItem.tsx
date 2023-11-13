import { useState, useContext } from "react";
import { darken, lighten, Box, Divider, Chip, Grid, IconButton } from "@mui/material";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import CancelRounded from "@mui/icons-material/CancelRounded";

import Swal from "sweetalert2";

import { baseUrl } from "../../../common";
import { AuthContext } from "../../../context/auth";
import { ImageDialog } from "../../client/pagos";
import { ButtonCustom, TypographyCustom } from "../../custom";
import { errorArrayLaravelTransformToString, getFormatDistanceToNow } from "../../../helpers/functions";
import { IPayment } from "../../../interfaces";
import { green, orange, red } from "@mui/material/colors";

interface Props {
    payment: IPayment;
}
export const PaymentItem = ({ payment }: Props) => {
    const [paymentState, setPaymentState] = useState<IPayment | null>(payment);
    const { authState } = useContext(AuthContext);

    const declinePayment = async () => {
        const url = `${baseUrl}/payment/decline/${paymentState?.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
        };
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setPaymentState(data as IPayment);
                    Swal.fire({
                        text: 'Pago aprobado',
                        icon: 'success',
                        toast: true,
                        iconColor: '#FFF',
                        customClass: {
                            popup: 'colored-toast',
                        },
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: 'bottom-start'
                    })
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'El pago no existe, revise el pago que esta intentando actualizar',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }
    const approvePayment = async () => {
        const url = `${baseUrl}/payment/approve/${paymentState?.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
        };
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    // const { data } = await response.json();
                    setPaymentState(null);
                    Swal.fire({
                        text: 'Pago aprobado',
                        icon: 'success',
                        toast: true,
                        iconColor: '#FFF',
                        customClass: {
                            popup: 'colored-toast',
                        },
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        position: 'bottom-start'
                    })
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'El pago no existe, revise el pago que esta intentando actualizar',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            })
        }
    }
    return (paymentState ? (
        <Box sx={{ width: '100%', mb: 1, mt: 1, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', p: 2, borderRadius: 3 }}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TypographyCustom variant='h6' fontWeight='bold'>{paymentState.description}</TypographyCustom>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TypographyCustom color='text.secondary'>Status </TypographyCustom>
                        <Chip size='small' sx={{ ml: 1, background: lighten(paymentState.status?.description === 'Pendiente' ? orange[500] : red[500], 0.3), fontWeight: 'bold', color: darken(paymentState.status?.description === 'Pendiente' ? orange[500] : red[500], 0.3) }} label={paymentState.status?.description ? paymentState.status?.description : ''} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TypographyCustom variant='subtitle1' fontWeight='bold' color='text.primary'>Monto</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>{paymentState.amount}</TypographyCustom>
                    <TypographyCustom variant='subtitle1' fontWeight='bold' color='text.primary'>Moneda</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>{paymentState.currency}</TypographyCustom>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TypographyCustom variant='subtitle1' fontWeight='bold' color='text.primary'>Tipo de pago</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>{paymentState.payment_type}</TypographyCustom>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TypographyCustom variant='subtitle1' fontWeight='bold' color='text.primary'>Fecha</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>{getFormatDistanceToNow(new Date(paymentState.created_at))}</TypographyCustom>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TypographyCustom variant='subtitle1' fontWeight='bold' color='text.primary'>Capture</TypographyCustom>
                    <ImageDialog image={paymentState.image ? paymentState.image : ''} />
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ mt: 2 }} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around' }}>
                        <ButtonCustom size='small' endIcon={<CheckCircleRounded />} customcolor={green[500]} nofull>Aprobar</ButtonCustom>
                        <ButtonCustom size='small' endIcon={<CancelRounded />} customcolor={red[500]} nofull>Rechazar</ButtonCustom>
                    </Box>
                </Grid>
            </Grid>
        </Box>) : <></>
    )
}

