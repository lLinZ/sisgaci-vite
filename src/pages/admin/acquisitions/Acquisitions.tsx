import { useState, useContext, useEffect } from "react";

import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import SettingsRounded from "@mui/icons-material/SettingsRounded";
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";

import { blue, green } from "@mui/material/colors";

import { Layout } from "../../../components/ui";
import { TypographyCustom } from "../../../components/custom";
import { DescripcionDeVista, BusquedaYResultado, NoContentFound, ImageInsideDialogWithButton } from "../../../components/ui/content";
import { OptionsList } from "../../../components/ui/options";
import { AuthContext } from "../../../context/auth";
import { Option, IAcquisition } from "../../../interfaces";
import { useGetAcquisitions } from '../../../hooks'
import Swal from "sweetalert2";
import TableContainer from "@mui/material/TableContainer";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, tableCellClasses, darken } from "@mui/material";
import { PhotoRounded, VisibilityRounded } from "@mui/icons-material";

const title = 'Mis captaciones'

export const Acquisitions = () => {
    const { authState } = useContext(AuthContext);
    const { acquisitions, setAcquisitions, loading } = useGetAcquisitions();
    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar captacion', path: '/admin/acquisitions/add', color: green[500], icon: <BusinessCenterOutlined /> },
        { text: 'Tipos de inmueble y transaccion', path: '/admin/property', color: blue[500], icon: <SettingsRounded /> },
    ]
    const getNextPage = async () => {

    }

    const changePage = async (event: React.ChangeEvent<unknown>, page: number) => {
        const url = `${acquisitions?.path}?page=${page}`
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setAcquisitions(data)
                    break;
                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error al conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                    })
                    break;
                case 500:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error al conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error al conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                    })
                    break;

            }
        } catch (error) {
            console.log({ error });
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al conectar con el servidor',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            })
        }
        return;
    }
    const styles = {
        contentBox: {
            mb: 2,
            boxShadow: '0 2px 8px rgba(100,100,100,0.1)',
            borderRadius: 3,
            p: 2,
            background: '#FFF'
        },
        loaderBox: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            mt: 2
        },
        tableCell: {
            color: (theme: any) => theme.palette.getContrastText(darken(authState.color, 0.7))
        }
    }
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Consulta tus captaciones, o selecciona agrega una nueva!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            {acquisitions && (<BusquedaYResultado records={acquisitions} setRecords={setAcquisitions} title={title} />)}
            {acquisitions && acquisitions.data && (
                <TableContainer component={Paper} sx={{ mb: 10, p: 2 }}>
                    <Pagination count={acquisitions.last_page} page={acquisitions.current_page} showFirstButton showLastButton onChange={(event: React.ChangeEvent<unknown>, page: number) => changePage(event, page)} />
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{
                                '&:nth-of-type(odd)': {
                                    backgroundColor: darken(authState.color, 0.7),
                                },
                            }}>
                                <TableCell sx={styles.tableCell}>Nombre</TableCell>
                                <TableCell sx={styles.tableCell} align="center">Precio</TableCell>
                                <TableCell sx={styles.tableCell} align="center">Direccion</TableCell>
                                <TableCell sx={styles.tableCell} align="center">Tipo de Negocio</TableCell>
                                <TableCell sx={styles.tableCell} align="center">Tipo de inmueble</TableCell>
                                <TableCell sx={styles.tableCell} align="center">Descripcion web</TableCell>
                                <TableCell sx={styles.tableCell} align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {acquisitions?.data.map((acquisition: IAcquisition) => (
                                <TableRow
                                    key={acquisition.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 }, '&:nth-of-type(odd)': {
                                            backgroundColor: (theme) => theme.palette.action.hover,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {acquisition.name}
                                    </TableCell>
                                    <TableCell align="center">{acquisition.price}</TableCell>
                                    <TableCell align="center">{acquisition.short_address}</TableCell>
                                    <TableCell align="center">{acquisition.property_type?.description}</TableCell>
                                    <TableCell align="center">{acquisition.property_transaction_type?.description}</TableCell>
                                    <TableCell align="center">{acquisition.web_description}</TableCell>
                                    <TableCell align="center">
                                        <ImageInsideDialogWithButton pic_url={`http://localhost:8000/assets/images/acquisitions/${acquisition.code}/${acquisition.main_pic}`} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination count={acquisitions.last_page} page={acquisitions.current_page} showFirstButton showLastButton onChange={(event: React.ChangeEvent<unknown>, page: number) => changePage(event, page)} />
                </TableContainer>
            )
            }
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && acquisitions && acquisitions.data && acquisitions.data.length === 0 && <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`} />}
        </Layout >
    )
}
