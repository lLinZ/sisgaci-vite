import { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import { AuthContext } from '../../../context/auth';
import { BusquedaYResultado } from '../../../components/ui/content';
import { IPayment } from '../../../interfaces';
import { PagosList } from '../../../components/client/pagos';
import { baseUrl } from '../../../common';
import Swal from 'sweetalert2';


export const BusquedaPago = () => {
    const [payments, setPayments] = useState<IPayment[] | null>(null);
    const { authState } = useContext(AuthContext)
    const getActivePayments = async () => {
        const url = `${baseUrl}/payment`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setPayments(data);
        } catch (error) {
            console.error({ error });
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar al servidor',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        }
    }
    useEffect(() => {
        getActivePayments();
    }, [])
    return (
        <>
            {payments && <BusquedaYResultado records={payments} setRecords={setPayments} title={'pagos'} />}
            {payments && (
                <Box sx={{ mb: 2 }}>
                    <PagosList payments={payments} />
                </Box>
            )}
        </>

    )
}
