import { useContext, useEffect, useState } from 'react';

import EventRounded from '@mui/icons-material/EventRounded';
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded';

import green from '@mui/material/colors/green';
import blue from '@mui/material/colors/blue';

import { Layout } from '../../components/ui'
import { DescripcionDeVista, NoContentFound } from '../../components/ui/content'
import { OptionsList } from '../../components/ui/options'
import { ICondominium, Option } from '../../interfaces'

import { baseUrl } from '../../common';
import { AuthContext } from '../../context/auth';

import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { TypographyCustom } from '../../components/custom';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { errorArrayLaravelTransformToString } from '../../helpers/functions';
export const Condominios = () => {
    const [condominia, setCondominia] = useState<ICondominium[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { authState } = useContext(AuthContext);

    const options: Option[] = [
        { text: 'Agregar condominio', icon: <EventRounded />, color: green[400], path: '/admin/condominios/agregar' },
    ];

    const getCondominia = async () => {
        const url = `${baseUrl}/condominium`;
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
                    setCondominia(data);
                    break;
            }
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading(false);
        }
    }
    const closeCondominium = async (id: number) => {
        const url = `${baseUrl}/condominium/close/${id}`;
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const newCondominia = condominia?.filter((condo) => condo.id !== id);
                    setCondominia(newCondominia ? newCondominia : null);
                    Swal.fire({
                        title: 'Exito',
                        text: 'Se ha cerrado el condominio. Ya no se pueden agregar mas deudas al condominio.',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se encontro el condominio',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
            }
        } catch (error) {
            console.log({ error });
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al conectarse con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }
    const cancelCondominium = async (id: number) => {
        const url = `${baseUrl}/condominium/cancel/${id}`;
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const newCondominia = condominia?.filter((condo) => condo.id !== id);
                    setCondominia(newCondominia ? newCondominia : null);
                    Swal.fire({
                        title: 'Exito',
                        text: 'Se ha cancelado el condominio. Ya no se pueden agregar mas deudas al condominio.',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se encontro el condominio',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
            }
        } catch (error) {
            console.log({ error });
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al conectarse con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    useEffect(() => {
        getCondominia();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title='Condominios' description='Interfaz para crear un nuevo condominio de un edificio, para cerrar condominios, edicion de condominios...' />
            <OptionsList options={options} breakpoints={{ xs: 12 }} />
            {loading && (
                <Box sx={{ width: '100%', mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress sx={{ color: authState.color }} />
                </Box>
            )}
            {!loading && condominia?.length === 0 && (
                <NoContentFound title={'Oops...'} text={'No se encontraron registros'} />
            )}
            {!loading && condominia && condominia.map((condo) => (
                <Box key={condo.id} sx={{ p: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', borderRadius: 3, background: '#FFF', mb: 1 }}>
                    <TypographyCustom variant='h6' fontWeight='bold' color='text.primary'>{condo.description}</TypographyCustom>
                    <TypographyCustom variant='body1' color='text.secondary'>{condo.building.name}</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>{`${condo.month} - ${condo.year}`}</TypographyCustom>
                    <Box>
                        <Tooltip title='Cerrar condominio'>
                            <IconButton color='warning' onClick={() => closeCondominium(condo.id)}>
                                <EventAvailableIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Cerrar condominio' onClick={() => cancelCondominium(condo.id)}>
                            <IconButton color='error'>
                                <EventBusyIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            ))}
        </Layout>
    )
}