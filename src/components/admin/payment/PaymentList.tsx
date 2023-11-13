import { useContext, useState, useEffect } from "react"

import { Box, CircularProgress } from "@mui/material"

import Swal from "sweetalert2"

import { PaymentItem } from "."
import { baseUrl } from "../../../common"
import { TypographyCustom } from "../../custom"
import { AuthContext } from "../../../context/auth"
import { BusquedaYResultado, NoContentFound } from "../../ui/content"
import { errorArrayLaravelTransformToString } from "../../../helpers/functions"
import { IPayment } from "../../../interfaces"

export const PaymentList = () => {
    const { authState } = useContext(AuthContext)
    const [payments, setPayments] = useState<IPayment[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const getPayments = async () => {
        const url = `${baseUrl}/payments/pending`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }

        try {
            setLoading(true);
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setPayments(data)
                    break;
                case 400:
                    const { errors } = await response.json();

                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado al consultar los pagos',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al conectarse con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPayments();
    }, [])
    return (<>
        {!loading && payments && payments.length === 0 && (<NoContentFound title={"Oops!"} text={"No se encontraron pagos..."} />)}
        {payments && payments.length > 0 && (<BusquedaYResultado records={payments} setRecords={setPayments} title='pagos' />)}
        {payments
            ? payments.map((payment) => (<PaymentItem key={payment.id} payment={payment} />))
            : (<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {loading
                    ? <CircularProgress sx={{ color: authState.color }} />
                    : <TypographyCustom>No hay pagos para mostrar</TypographyCustom>}
            </Box>)}
    </>)
}