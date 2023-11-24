import { FC, useContext, useState } from 'react';
import { ICall, IComment } from '../../../interfaces';
import { baseUrl } from '../../../common';
import { AuthContext } from '../../../context/auth';
import Swal from 'sweetalert2';
import { Alert, AlertTitle, AppBar, Avatar, Box, Chip, Dialog, Divider, Grid, IconButton, Toolbar, Tooltip, Typography, darken, lighten } from '@mui/material';
import VisibilityRounded from '@mui/icons-material/VisibilityRounded';
import { ButtonCustom, TextFieldCustom, TypographyCustom } from '../../custom';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { blue, grey, red, } from '@mui/material/colors';
import { DescripcionDeVista, Loading } from '../../ui/content';
import { Form, Formik, FormikHelpers } from 'formik';
import BackspaceRounded from '@mui/icons-material/BackspaceRounded';
import { Timeline, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent } from '@mui/lab';
import moment from 'moment';
import { CommentList } from './comments';

interface Props {
    id: number;
}
export const CallDetails: FC<Props> = ({ id }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[] | null>(null);
    const [positive, setPositive] = useState<string[] | null>(null);
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
    const handleClick = () => {
        if (!open) {
            getCall();
        }
        setOpen(!open);
        setErrors(null);
        setPositive(null);
    }
    const onSubmit = async (values: { feedback: string }, formikHelpers: FormikHelpers<{ feedback: string }>): Promise<void> => {
        setErrors(null);
        setPositive(null);
        setLoadingComments(true);
        if (!values.feedback) {
            setErrors(['El campo comentario es obligatorio']);
            setLoadingComments(false);
            return;
        }
        const url = `${baseUrl}/call/comment/${call?.id}`;
        const body = new URLSearchParams();

        body.append('feedback', String(values.feedback))
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
            body
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setComments(data)
                    setPositive(['Se ha registrado el comentario exitosamente']);
                    break;
                case 400:
                    setErrors(['Ocurrio un error con el comentario']);
                    break;
                case 404:
                    setErrors(['La llamada no existe']);
                    break;
                case 500:
                    setErrors(['Ocurrio un error interno en el servidor']);
                    break;
                default:
                    setErrors(['Ocurrio un error inesperado']);
                    break;
            }
        } catch (error) {
            console.error({ error });
            setErrors(['Ocurrio un error al conectar con el servidor']);

        } finally {
            setLoadingComments(false);
        }
    }
    return (
        <>
            <IconButton onClick={handleClick} sx={{ color: blue[500] }}>
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
                {loading && (
                    <Box sx={{ mt: 10 }}>
                        <Loading />
                    </Box>
                )}
                {!loading && (

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
                                    <TypographyCustom variant={'overline'} _color={'p'}>Información del cliente</TypographyCustom>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Primer nombre</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.client?.first_name ? call?.client?.first_name : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Segundo nombre</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.client?.middle_name ? call?.client?.middle_name : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Primer apellido</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.client?.lastname ? call?.client?.lastname : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Segundo apellido</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.client?.second_lastname ? call?.client?.second_lastname : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Telefono</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.client?.phone ? call?.client?.phone : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Correo</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.client?.email ? call?.client?.email : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Genero</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.client?.gender ? call?.client?.gender : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Estado civil</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.client?.marital_status ? call?.client?.marital_status : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Fecha de nacimiento</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.client?.birthday ? call?.client?.birthday : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>

                            {/* Separacion */}
                            <Grid item xs={12} />
                            {/* ---------- */}

                            {/* -----------------------------
                            INFORMACION DE LA LLAMADA
                            -----------------------------
                         */}
                            <Grid item xs={12}>
                                <Box sx={styles.namesBox}>
                                    <TypographyCustom variant={'overline'} _color='p'>Información de la llamada</TypographyCustom>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Zona</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.zone ? call?.zone : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Interesado en</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.property_type ? call?.property_type : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Inmueble especifico</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.property ? call?.property : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Origen</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.origin ? call?.origin : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Motivo de contacto</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{call?.call_purpose ? call?.call_purpose : 'No disponible'}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={styles.contentBox}>
                                    <TypographyCustom>Fecha</TypographyCustom>
                                    <TypographyCustom color='text.secondary'>{moment(call?.created_at).format('DD-MM-YYYY')} a las {moment(call?.created_at).format('HH:mm:ss')}</TypographyCustom>
                                </Box>
                                <Divider sx={styles.divider} />
                            </Grid>
                            <Grid item xs={12} sx={{ marginBlock: 2 }}>
                            </Grid>
                        </Grid>
                        <Formik
                            initialValues={{ feedback: '' }}
                            onSubmit={onSubmit} >
                            {({ values, handleChange, handleSubmit, setFieldValue }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TypographyCustom variant='overline' _color='p'>Crear comentario nuevo</TypographyCustom>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box sx={styles.actions}>
                                                {values.feedback &&
                                                    <Tooltip title='Borrar todo el contenido'>
                                                        <IconButton sx={{ color: red[900] }} onClick={() => {
                                                            setFieldValue('feedback', '')
                                                        }}>
                                                            <BackspaceRounded />
                                                        </IconButton>
                                                    </Tooltip>}
                                                <Chip onClick={() => {
                                                    setFieldValue('feedback', values.feedback + 'Se le ofrecieron opciones al cliente, ')
                                                }} size={'small'} label={'Opciones'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                                <Chip onClick={() => {
                                                    setFieldValue('feedback', values.feedback + 'El seguimiento del cliente ha finalizado, ')
                                                }} size={'small'} label={'Seguimiento finalizado'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                                <Chip onClick={() => {
                                                    setFieldValue('feedback', values.feedback + 'El cliente no atendio la(s) llamada(s), ')
                                                }} size={'small'} label={'No atiende'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                                <Chip onClick={() => {
                                                    setFieldValue('feedback', values.feedback + 'El cliente se encuentra de viaje, ')
                                                }} size={'small'} label={'En viaje'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                                <Chip onClick={() => {
                                                    setFieldValue('feedback', values.feedback + 'Se le hizo seguimiento al cliente, ')
                                                }} size={'small'} label={'Seguimiento'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                                <Chip onClick={() => {
                                                    setFieldValue('feedback', values.feedback + 'Se contacto al cliente por medios propios, ')
                                                }} size={'small'} label={'Medios propios'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                                <Chip onClick={() => {
                                                    setFieldValue('feedback', values.feedback + 'Consolitex, ')
                                                }} size={'small'} label={'Consolitex'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextFieldCustom multiline label='Comentario' name='feedback' value={values.feedback} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <ButtonCustom type='submit'>Enviar comentario</ButtonCustom>
                                        </Grid>
                                        {errors && errors.length > 0 && (
                                            <Grid item xs={12}>
                                                <Alert severity="error" sx={{ mt: 2 }} onClose={() => setErrors(null)}>
                                                    <AlertTitle>Error</AlertTitle>
                                                    {errors?.map((e) => (<TypographyCustom color={'error'}>{e}</TypographyCustom>))}
                                                </Alert>
                                            </Grid>
                                        )}
                                        {positive && positive.length > 0 && (
                                            <Grid item xs={12}>
                                                <Alert severity="success" sx={{ mt: 2 }} onClose={() => setPositive(null)}>
                                                    <AlertTitle>Exito</AlertTitle>
                                                    {positive?.map((e) => (<TypographyCustom color={'success'}>{e}</TypographyCustom>))}
                                                </Alert>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                        <Box sx={{ marginBlock: 2 }}></Box>
                        {loadingComments
                            ? <Box sx={{ mt: 2 }}><Loading /></Box>
                            : comments && (<CommentList comments={comments} />)
                        }
                    </Box>
                )}
            </Dialog>
        </>
    )
}
const styles = {
    mainContent: {
        width: { xs: '100%', sm: '80%' },
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
    },
    actions: {
        width: '100%',
        overflow: 'scroll',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    divider: { borderColor: 'rgba(100,100,100,0.1)' }
}