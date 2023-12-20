import { Layout } from "../../../components/ui";
import { DescripcionDeVista, BusquedaYResultado, NoContentFound } from "../../../components/ui/content";
import { OptionsList } from "../../../components/ui/options";
import { useGet } from "../../../http";

import { Box, CircularProgress } from "@mui/material";
import GroupRounded from "@mui/icons-material/GroupRounded";
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";
import { blue, green } from "@mui/material/colors";

import { ClientList } from "../../../components/admin/clients/ClientList";
import { Option } from "../../../interfaces";

const title = 'Clientes'

export const Clients = () => {
    const { data: clients, loading, setData } = useGet('/client');

    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar departamento', path: '/admin/department/add', color: green[500], icon: <BusinessCenterOutlined /> },
        { text: 'Usuarios', path: '/admin/users', color: blue[500], icon: <GroupRounded /> },
    ]
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Consulta usuarios o navega a "Agregar Usuario" para ingresar uno nuevo en el sistema!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            {clients && (<BusquedaYResultado records={clients} setRecords={setData} title={title} />)}
            <ClientList clients={clients} />
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && !clients && <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`} />}
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
}