import { FC, useContext, useState } from 'react';
import { ICall } from '../../../interfaces';
import { baseUrl } from '../../../common';
import { AuthContext } from '../../../context/auth';
import Swal from 'sweetalert2';
import { AppBar, Avatar, Box, Dialog, Divider, Grid, IconButton, Toolbar, Tooltip, lighten } from '@mui/material';
import VisibilityRounded from '@mui/icons-material/VisibilityRounded';
import { ButtonCustom, TextFieldCustom, TypographyCustom } from '../../custom';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { grey } from '@mui/material/colors';
import { DescripcionDeVista } from '../../ui/content';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { BackspaceRounded, DeleteRounded } from '@mui/icons-material';

interface Props {
    id: number;
}
export const CallDetails: FC<Props> = ({ id }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [call, setCall] = useState<ICall | null>(null);
    const { authState } = useContext(AuthContext);
    const getCall = async () => {
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
                    setCall(data);
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
    const handleClick = () => {
        if (!open) {
            getCall();
        }
        setOpen(!open);
    }
    const onSubmit = async (values: { feedback: string }, formikHelpers: FormikHelpers<{ feedback: string }>): Promise<void> => {

    }
    return (
        <>

            <IconButton onClick={handleClick}>
                <VisibilityRounded />
            </IconButton>
            <Dialog open={open} fullScreen>
                <AppBar sx={{ width: '100%', position: 'relative', background: grey[900] }} elevation={0}>
                    <Toolbar color={'primary'}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TypographyCustom>Información de la llamada</TypographyCustom>
                            <IconButton onClick={handleClick} sx={{ color: 'white' }}>
                                <CloseRounded />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={styles.mainContent}>
                    <DescripcionDeVista buttons={false} title={'Información de la llamada'} description={'En este modal podras inspeccionar mas a fondo una llamada en especifico y poder ver toda la información de la misma, si quieres salir de aqui, presiona en la X arriba a la derecha '}></DescripcionDeVista>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={styles.avatarBox}>
                                <Avatar sx={{ boxShadow: `0 8px 20px ${lighten(authState.color, 0.6)}`, background: authState.color, width: 100, height: 100 }}>
                                    {`${call?.client?.first_name.slice(0, 1)}${call?.client?.lastname.slice(0, 1)}`}
                                </Avatar>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={styles.namesBox}>
                                <TypographyCustom variant={'h4'}>{call?.client?.first_name}</TypographyCustom>
                                <TypographyCustom variant={'h6'}>{call?.client?.lastname}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>

                        {/* -----------------------------
                            INFORMACION DEL CLIENTE
                            -----------------------------
                         */}
                        <Grid item xs={12}>
                            <Box sx={styles.namesBox}>
                                <TypographyCustom variant={'overline'}>Información del cliente</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Telefono</TypographyCustom>
                                <TypographyCustom>{call?.client?.phone ? call?.client?.phone : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Correo</TypographyCustom>
                                <TypographyCustom>{call?.client?.email ? call?.client?.email : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Genero</TypographyCustom>
                                <TypographyCustom>{call?.client?.gender ? call?.client?.gender : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Estado civil</TypographyCustom>
                                <TypographyCustom>{call?.client?.marital_status ? call?.client?.marital_status : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Fecha de nacimiento</TypographyCustom>
                                <TypographyCustom>{call?.client?.birthday ? call?.client?.birthday : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        {/* -----------------------------
                            INFORMACION DE LA LLAMADA
                            -----------------------------
                         */}
                        <Grid item xs={12}>
                            <Box sx={styles.namesBox}>
                                <TypographyCustom variant={'overline'}>Información de la llamada</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Zona</TypographyCustom>
                                <TypographyCustom>{call?.zone ? call?.zone : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Tipo de inmueble</TypographyCustom>
                                <TypographyCustom>{call?.property_type ? call?.property_type : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Inmueble especifico</TypographyCustom>
                                <TypographyCustom>{call?.property ? call?.property : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Origen</TypographyCustom>
                                <TypographyCustom>{call?.origin ? call?.origin : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Motivo de contacto</TypographyCustom>
                                <TypographyCustom>{call?.call_purpose ? call?.call_purpose : 'No disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                        </Grid>
                    </Grid>
                    <Formik
                        initialValues={{ feedback: '' }}
                        onSubmit={onSubmit} >
                        {({ values, handleChange, handleSubmit, setFieldValue }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <TypographyCustom variant='overline'>Crear comentario nuevo</TypographyCustom>
                                        {values.feedback &&
                                            <Tooltip title='Borrar contenido'>
                                                <IconButton onClick={() => {
                                                    setFieldValue('feedback', '')
                                                }}>
                                                    <BackspaceRounded />
                                                </IconButton>
                                            </Tooltip>}
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextFieldCustom multiline label='Comentario' name='feedback' value={values.feedback} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ButtonCustom>Enviar comentario</ButtonCustom>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Dialog>
        </>
    )
}
const styles = {
    mainContent: {
        width: '80%',
        margin: 'auto',
        mt: '20px',
        display: 'flex',
        flexFlow: 'column nowrap',
        mb: 10,
    },
    avatarBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    namesBox: {
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingInline: 2,
    }
}