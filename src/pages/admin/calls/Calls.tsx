// MUI
import { Box, CircularProgress } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import CallRounded from "@mui/icons-material/CallRounded";
import GroupRounded from "@mui/icons-material/GroupRounded";

// Custom components
import { Layout } from "../../../components/ui";
import { DescripcionDeVista, BusquedaYResultado, NoContentFound } from "../../../components/ui/content";
import { CallList } from "../../../components/admin/calls";
import { OptionsList } from "../../../components/ui/options";

// Types
import { Option } from "../../../interfaces";

// Hooks
import { useGet } from "../../../hooks";

const title = 'Llamadas';

export const Calls = () => {
    const { data: calls, loading, setData: setCalls } = useGet('/call');

    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar llamada', path: '/admin/calls/add', icon: <CallRounded /> },
        { text: 'Clientes', path: '/admin/clients', icon: <GroupRounded /> },
    ]
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Consulta usuarios o navega a "Agregar Usuario" para ingresar uno nuevo en el sistema!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            {calls && (<BusquedaYResultado records={calls} setRecords={setCalls} title={title} />)}
            <CallList calls={calls} />
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && !calls && <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`} />}
        </Layout>
    )
}

/**
 * Estilos de los componentes MUI
 */
const styles = {
    loaderBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        mt: 2
    },
}