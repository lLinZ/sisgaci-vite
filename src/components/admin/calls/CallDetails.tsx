import { FC, useContext, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { baseUrl } from '../../../common';
import { AuthContext } from '../../../context/auth';
import { DescripcionDeVista, Loading } from '../../ui/content';
import { CommentList } from './comments';
import { AddNewComment, CallInfo, ClientInfo } from '.';

import { ICall, IComment } from '../../../interfaces';

import Swal from 'sweetalert2';

interface Props {
    id: number;
}
export const CallDetails: FC<Props> = ({ id }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingComments, setLoadingComments] = useState<boolean>(false);
    const [call, setCall] = useState<ICall | null>(null);
    const [comments, setComments] = useState<IComment[] | null>(null);
    const { authState } = useContext(AuthContext);
    const getCall = async () => {
        setLoading(true);
        const url = `${baseUrl}/call/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    console.log({ data })
                    setCall(data.call);
                    setComments(data.comments);
                    break;
                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error con su solicitud',
                        icon: 'error'
                    })
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se encontro la llamada',
                        icon: 'error'
                    })
                    break;
                case 500:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error interno en el servidor',
                        icon: 'error'
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        icon: 'error'
                    })
                    break;
            }
        } catch (error) {
            console.error({ error });
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al conectar con el servidor',
                icon: 'error',
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCall()
    }, [])
    return (
        <>
            {loading && (
                <Box sx={{ mt: 10 }}>
                    <Loading />
                </Box>
            )}
            {!loading && (

                <Box sx={styles.mainContent}>
                    <DescripcionDeVista buttons={false} title={'Información de la llamada'} description={'En esta seccion podras inspeccionar mas a fondo una llamada en especifico y poder ver toda la información de la misma y del cliente respectivo  '}></DescripcionDeVista>
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