import { AddCircleRounded, CloseRounded } from "@mui/icons-material";
import { Box, Button, Dialog, Toolbar, IconButton, CircularProgress, lighten, darken } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useContext, useState } from "react";
import { IUnit, IUser } from "../../../interfaces";
import { TypographyCustom } from "../../custom";
import Swal from "sweetalert2";
import { baseUrl } from "../../../common";
import { AuthContext } from "../../../context/auth";
import { errorArrayLaravelTransformToString } from "../../../helpers/functions";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
interface PropsOwnerDialog {
    asignOwner: (selectedUser: SelectedUser) => Promise<void>;
    unit: IUnit;
}
export type SelectedUser = {
    id: number;
    description: string;
}
export const OwnerDialog = ({ asignOwner }: PropsOwnerDialog) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
    const { authState } = useContext(AuthContext);

    const getUsers = async () => {
        const url = `${baseUrl}/users`;
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
                    setUsers(data);
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
                        customClass: {
                            container: 'custom-swal-container',
                        }
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
                        customClass: {
                            container: 'custom-swal-container',
                        }
                    })
                    break;
            }
        } catch (error) {
            console.log({ error })
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    container: 'custom-swal-container',
                }
            })
        } finally {
            setLoading(false);
        }
    }

    const handleOpen = () => {
        getUsers();
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setUsers(null);
    }
    const check = (id: number, description: string) => {
        setSelectedUser({
            id,
            description
        });
        asignOwner({ id, description }).finally(() => {
            handleClose()
        });
    }
    return (
        <Box>
            <Button sx={{ textTransform: 'none', background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3) }} variant='text' endIcon={<AddCircleRounded />} onClick={handleOpen}>Asignar</Button>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Toolbar sx={{ background: grey[900] }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TypographyCustom variant={'h6'} color='common.white'>Seleccionar Propietario</TypographyCustom>
                        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                </Toolbar>
                <Box sx={{ width: '80%', margin: 'auto', minHeight: '100vh', pt: 2 }}>
                    {loading && (
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress sx={{ color: authState.color }} />
                        </Box>
                    )}

                    {users && users.map((user) => (
                        <Box key={user.id} sx={{ width: '100%', mb: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexFlow: 'column wrap' }}>
                                <TypographyCustom variant='overline' fontWeight='bold' color='text.disabled'>{user.role?.description}</TypographyCustom>
                                <TypographyCustom variant='h6' >{user.nombre + ' ' + user.apellido}</TypographyCustom>
                                <TypographyCustom variant='subtitle2' color='text.secondary'>Cedula {user.cedula}</TypographyCustom>
                                <TypographyCustom variant='subtitle2' color='text.secondary'>Telefono {user.telefono}</TypographyCustom>
                            </Box>
                            <IconButton
                                onClick={() => check(user.id, user.nombre)}
                                color={selectedUser && selectedUser.id === user.id ? 'success' : 'default'}
                                sx={{ color: selectedUser && selectedUser.id === user.id ? authState.color : grey[600] }}
                            >
                                {selectedUser && selectedUser.id === user.id
                                    ? (<RadioButtonCheckedIcon />)
                                    : (<RadioButtonUncheckedIcon />)
                                }
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            </Dialog>
        </Box>
    )
}