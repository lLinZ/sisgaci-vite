import { CloseRounded, VisibilityRounded } from '@mui/icons-material';
import { IconButton, Dialog, AppBar, Toolbar, Box, Grid, MenuItem, Alert, AlertTitle, Avatar, lighten, Divider, Tooltip } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { FC, useContext, useEffect, useState } from 'react'
import { TypographyCustom, SelectCustom, TextFieldCustom, ButtonCustom } from '../../custom';
import { DescripcionDeVista, Loading } from '../../ui/content';
import { IClient } from '../../../interfaces';
import { useGet } from '../../../hooks';
import { baseUrl } from '../../../common';
import { AuthContext } from '../../../context/auth';
import Swal from 'sweetalert2';

interface Props {
    id: number;
}
export const DetailsDialog: FC<Props> = ({ id }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [client, setClient] = useState<IClient | null>(null);
    const { authState } = useContext(AuthContext);
    const getClient = async () => {
        setLoading(true);
        const url = `${baseUrl}/client/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const data = await response.json();
                    setClient(data.data);
                    break
                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un error con su solicitud',
                        icon: 'error',
                    });
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se encontro el cliente',
                        icon: 'error',
                    });
                    break;
                case 500:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error interno en el servidor',
                        icon: 'error',
                    });
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
            });
        } finally {
            setLoading(false);
        }
    }
    const handleClick = () => {
        !open && getClient();
        setOpen(!open);
    }
    return (
        <>
            <Tooltip title='Ver informacion'>
                <IconButton sx={{ color: blue[500] }} onClick={handleClick}>
                    <VisibilityRounded />
                </IconButton>
            </Tooltip>
            <Dialog open={open} fullScreen>
                <AppBar sx={{ width: '100vw', position: 'relative', background: grey[900] }} elevation={0}>
                    <Toolbar color={'primary'}>
                        <Box sx={styles.mainBox}>
                            <TypographyCustom>Agregar informacion adicional</TypographyCustom>
                            <IconButton onClick={handleClick} sx={{ color: 'white' }}>
                                <CloseRounded />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{ width: '80%', margin: 'auto', mt: '20px', display: 'flex', flexFlow: 'column wrap' }}>
                    <DescripcionDeVista buttons={false} title={"Informacion adicional de cliente"} description={"En este modal puedes ver toda la informacion del cliente"}></DescripcionDeVista>
                    {loading &&
                        <Loading />
                    }
                    {!loading && <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={styles.avatarBox}>
                                <Avatar sx={{ boxShadow: `0 8px 20px ${lighten(authState.color, 0.6)}`, background: authState.color, width: 100, height: 100 }}>{`${client?.first_name.slice(0, 1)}${client?.lastname.slice(0, 1)}`}</Avatar>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={styles.namesBox}>
                                <TypographyCustom variant={'h4'}>{client?.first_name}</TypographyCustom>
                                <TypographyCustom variant={'h6'}>{client?.lastname}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Cedula</TypographyCustom>
                                <TypographyCustom>{client?.document}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Nacionalidad</TypographyCustom>
                                <TypographyCustom>{client?.nationality}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Telefono</TypographyCustom>
                                <TypographyCustom>{client?.phone}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Correo</TypographyCustom>
                                <TypographyCustom>{client?.email}</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={styles.contentBox}>
                                <TypographyCustom color='text.secondary'>Zona</TypographyCustom>
                                <TypographyCustom>{client?.origin ? client?.origin : 'No hay zona disponible'}</TypographyCustom>
                            </Box>
                        </Grid>
                    </Grid>}
                </Box>
            </Dialog >
        </>
    )
}
const styles = {
    mainBox: {
        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
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
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }
}