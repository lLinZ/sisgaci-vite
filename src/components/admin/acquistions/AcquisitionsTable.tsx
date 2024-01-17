import { Dispatch, FC, useContext } from "react";
import { IAcquisition, IPaginationAcquistions } from "../../../interfaces"
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { IconButton, Pagination, Paper, TableContainer, Tooltip, darken } from "@mui/material";
import { ImageInsideDialogWithButton } from "../../ui/content";
import { AuthContext } from "../../../context/auth";
import Swal from "sweetalert2";
import { imageUrl } from "../../../common";
import { EditRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Props {
    acquisitions: IPaginationAcquistions;
    setAcquisitions: Dispatch<any>;
}
export const AcquisitionsTable: FC<Props> = ({ acquisitions, setAcquisitions }) => {
    const { authState } = useContext(AuthContext);
    const router = useNavigate();
    const styles = {
        contentBox: {
            mb: 2,
            boxShadow: '0 2px 8px rgba(100,100,100,0.1)',
            borderRadius: 3,
            p: 2,
            background: '#FFF'
        },

        tableCell: {
            color: (theme: any) => theme.palette.getContrastText(darken(authState.color, 0.7))
        }
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
    return (
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
                    {acquisitions.data && acquisitions.data.map((acquisition: IAcquisition) => (
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
                            <TableCell align="center" sx={{ display: 'flex', flexFlow: 'row nowrap', gap: '8px' }}>
                                <ImageInsideDialogWithButton pic_url={`${imageUrl}/assets/images/acquisitions/${acquisition.code}/${acquisition.main_pic}`} />
                                <Tooltip title={'Editar captacion'} >
                                    <IconButton onClick={() => {
                                        router(`/admin/acquisition/edit/${acquisition.id}`)
                                    }}>
                                        <EditRounded />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination count={acquisitions.last_page} page={acquisitions.current_page} showFirstButton showLastButton onChange={(event: React.ChangeEvent<unknown>, page: number) => changePage(event, page)} />
        </TableContainer>
    )
}