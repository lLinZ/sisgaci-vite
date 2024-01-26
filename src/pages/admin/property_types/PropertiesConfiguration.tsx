import { Box, CircularProgress } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { useState, useContext, useEffect } from "react";
import { baseUrl } from "../../../common";
import { TypographyCustom } from "../../../components/custom";
import { Layout } from "../../../components/ui";
import { DescripcionDeVista, BusquedaYResultado, NoContentFound } from "../../../components/ui/content";
import { OptionsList } from "../../../components/ui/options";
import { AuthContext } from "../../../context/auth";
import { Option, IDepartment } from "../../../interfaces";
import GroupRounded from "@mui/icons-material/GroupRounded";
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";
const title = 'Configuracion de Propiedades'
export const PropertiesConfiguration = () => {
    const [departments, setDepartments] = useState<IDepartment[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { authState } = useContext(AuthContext)
    const options: Option[] = [
        { text: 'Agregar departamento', path: '/admin/department/add', icon: <BusinessCenterOutlined /> },
        { text: 'Usuarios', path: '/admin/users', icon: <GroupRounded /> },
    ]

    /**
     * Funcion para obtener los tipos de propiedad
     */
    const getDepartments = async () => {
        const url = `${baseUrl}/department`;
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
                    setDepartments(data)
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
        getDepartments();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Consulta usuarios o navega a "Agregar Usuario" para ingresar uno nuevo en el sistema!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            {departments && (<BusquedaYResultado records={departments} setRecords={setDepartments} title={title} />)}
            {departments && departments.map((department: IDepartment) => (
                <Box key={department.id} sx={styles.contentBox}>
                    <TypographyCustom variant='h6'>{department.description}</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>Departamento</TypographyCustom>
                </Box>
            ))}
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && !departments && <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`} />}
        </Layout>
    )
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
}