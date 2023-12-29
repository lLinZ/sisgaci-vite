import { FC, useContext, useEffect, useState } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { baseUrl } from '../../../common';
import { AuthContext } from '../../../context/auth';
import { DescripcionDeVista, Loading } from '../../ui/content';
import { CommentList } from './comments';
import { AddNewComment, CallInfo, ClientInfo } from '.';

import { ICall, IComment } from '../../../interfaces';

import Swal from 'sweetalert2';
import { useGetCallForCallDetails } from '../../../hooks/useGetCallForCallDetails';
import { red, blue } from '@mui/material/colors';
import { ButtonCustom } from '../../custom';
import { DeleteRounded } from '@mui/icons-material';

interface Props {
    id: number;
}
export const CallDetails: FC<Props> = ({ id }) => {
    const { call, comments, loading, loadingComments, setComments, setLoading, setLoadingComments, getCall } = useGetCallForCallDetails(id);
    const { authState } = useContext(AuthContext);

    const alertResponse = async () => {
        const doubleCheck = await Swal.fire({
            title: 'Atencion',
            text: '¿Deseas eliminar esta llamada junto al cliente? una vez borrada no habra forma de ser recuperada',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: red[500],
            confirmButtonColor: blue[500],
            confirmButtonText: 'Si, deseo borrar la llamada y el cliente',
            cancelButtonText: 'No, cancelar',
            allowOutsideClick: false
        });
        return { confirm: doubleCheck.isConfirmed };
    }

    const deleteCall = async () => {
        const { confirm } = await alertResponse();

        if (!confirm) return;

        const url = `${baseUrl}/call/${id}`;
        console.log({ url });
        const options = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    // console.log({ response: await response.json() })
                    Swal.fire({
                        title: 'Exito',
                        text: 'Llamada y cliente eliminados',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true
                    })
                    getCall();
                    break;

                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error con los datos enviados',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true
                    })
                    break;
                case 500:
                    Swal.fire({
                        title: 'Error',
                        text: 'Error interno del servidor',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se logro conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true
                    })
                    break;
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true
            })
        }
    }

    return (
        <>
            {loading && (
                <Box sx={{ mt: 10 }}>
                    <Loading />
                </Box>
            )}
            {!loading && call && (

                <Box sx={styles.mainContent}>
                    <DescripcionDeVista buttons={false} title={'Información de la llamada'} description={'En esta seccion podras inspeccionar mas a fondo una llamada en especifico y poder ver toda la información de la misma y del cliente respectivo  '}>
                        <IconButton onClick={deleteCall}><DeleteRounded /></IconButton>
                    </DescripcionDeVista>
                    <Grid container spacing={1}>
                        {/* INFORMACION DEL CLIENTE */}
                        <ClientInfo call={call} />

                        {/* INFORMACION DE LA LLAMADA */}
                        <CallInfo call={call} />

                        <Grid item xs={12} sx={{ marginBlock: 2 }} />
                    </Grid>
                    <AddNewComment {...{ setComments, setLoadingComments, call }} />
                    <Box sx={{ marginBlock: 2 }}></Box>
                    {loadingComments
                        ? <Box sx={{ mt: 2 }}><Loading /></Box>
                        : comments && (<CommentList comments={comments} />)
                    }
                </Box>
            )}
        </>
    )
}
const styles = {
    mainContent: {
        width: { xs: '100%', sm: '100%' },
        margin: 'auto',
        mt: 0.5,
        display: 'flex',
        flexFlow: 'column nowrap',
        mb: 1,
    },
    namesBox: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        width: '100%',
        overflow: 'scroll',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    divider: { borderColor: 'rgba(100,100,100,0.0)' }
}