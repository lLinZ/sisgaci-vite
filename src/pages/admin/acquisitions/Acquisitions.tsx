import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import SettingsRounded from "@mui/icons-material/SettingsRounded";
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";

import { blue, green } from "@mui/material/colors";

import { Layout } from "../../../components/ui";
import { DescripcionDeVista, BusquedaYResultado, NoContentFound } from "../../../components/ui/content";
import { OptionsList } from "../../../components/ui/options";
import { Option } from "../../../interfaces";
import { useGetAcquisitions } from '../../../hooks'
import { AcquisitionsTable } from "../../../components/admin/acquistions";

const title = 'Mis captaciones'

export const Acquisitions = () => {
    const { acquisitions, setAcquisitions, loading } = useGetAcquisitions();
    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar captacion', path: '/admin/acquisitions/add', color: green[500], icon: <BusinessCenterOutlined /> },
        { text: 'Tipos de inmueble y transaccion', path: '/admin/property', color: blue[500], icon: <SettingsRounded /> },
    ]
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Consulta tus captaciones, o selecciona agrega una nueva!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            {acquisitions && (<BusquedaYResultado records={acquisitions} setRecords={setAcquisitions} title={title} />)}
            {acquisitions && acquisitions.data && (
                <AcquisitionsTable acquisitions={acquisitions} setAcquisitions={setAcquisitions} />
            )
            }
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && acquisitions && acquisitions.data && acquisitions.data.length === 0 && <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`} />}
        </Layout >
    )
}
const styles = {
    loaderBox: {
        loaderBox: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            mt: 2
        },
    }
}