import { Box, CircularProgress } from "@mui/material";
import { blue, green, pink } from "@mui/material/colors";
import { useState, useContext, useEffect } from "react";
import { baseUrl } from "../../../common";
import { TypographyCustom } from "../../../components/custom";
import { Layout } from "../../../components/ui";
import { DescripcionDeVista, BusquedaYResultado, NoContentFound } from "../../../components/ui/content";
import { OptionsList } from "../../../components/ui/options";
import { AuthContext } from "../../../context/auth";
import { Option, IUser } from "../../../interfaces";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import EngineeringRounded from "@mui/icons-material/EngineeringRounded";
import { BusinessCenterOutlined } from "@mui/icons-material";

const title = 'Usuarios';
export const Users = () => {
    const [users, setUsers] = useState<IUser[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { authState } = useContext(AuthContext)
    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar Usuario', path: '/admin/users/add', icon: <PersonAddRoundedIcon /> },
        { text: 'Agregar Master', path: '/admin/register/master', icon: <EngineeringRounded /> },
        { text: 'Departamentos', path: '/admin/departments', icon: <BusinessCenterOutlined /> },
    ]

    /**
     * Funcion para obtener usuarios
     */
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
            setLoading(true)
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json()
                    setUsers(data)
                    break;
                case 400:
                    break;
            }
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Consulta usuarios o navega a "Agregar Usuario" para ingresar uno nuevo en el sistema!'} />
            <OptionsList options={options} breakpoints={{ xs: 6, sm: 6, md: 4, lg: 4 }} />
            {users && (<BusquedaYResultado records={users} setRecords={setUsers} title={title} />)}
            {users && users.map((user: IUser) => (
                <Box key={user.id} sx={styles.contentBox}>
                    <TypographyCustom variant='h6'>{user.first_name}</TypographyCustom>
                    <TypographyCustom variant='subtitle1'>{user.lastname}</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>Cedula {user.document}</TypographyCustom>
                </Box>
            ))}
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && !users && <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`} />}
        </Layout>
    )
}
const styles = {
    loaderBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        mt: 2
    },
    contentBox: {
        mb: 2,
        boxShadow: '0 2px 8px rgba(100,100,100,0.1)',
        borderRadius: 3,
        p: 2,
        background: '#FFF',
    }
}