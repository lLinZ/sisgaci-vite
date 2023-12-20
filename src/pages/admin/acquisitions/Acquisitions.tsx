import { Box, CircularProgress } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { useState, useContext, useEffect } from "react";
import { baseUrl } from "../../../common";
import { TypographyCustom } from "../../../components/custom";
import { Layout } from "../../../components/ui";
import { DescripcionDeVista, BusquedaYResultado, NoContentFound } from "../../../components/ui/content";
import { OptionsList } from "../../../components/ui/options";
import { AuthContext } from "../../../context/auth";
import { Option, IAcquisition } from "../../../interfaces";
import SettingsRounded from "@mui/icons-material/SettingsRounded";
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";
const title = 'Captaciones'
export const Acquisitions = () => {
    const [acquisitions, setAcquisitions] = useState<IAcquisition[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { authState } = useContext(AuthContext)

    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar captacion', path: '/admin/acquisitions/add', color: green[500], icon: <BusinessCenterOutlined /> },
        { text: 'Tipos de inmueble y transaccion', path: '/admin/property', color: blue[500], icon: <SettingsRounded /> },
    ]

    /**
     * Funcion para obtener Captaciones disponibles del usuario logeado
     */
    const getAcquisitions = async () => {
        const url = `${baseUrl}/acquisition`;
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
                    setAcquisitions(data)
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
        getAcquisitions();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Consulta tus captaciones, o selecciona agrega una nueva!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            {acquisitions && (<BusquedaYResultado records={acquisitions} setRecords={setAcquisitions} title={title} />)}
            {acquisitions && acquisitions.map((acquisition: IAcquisition) => (
                <Box key={acquisition.id} sx={styles.contentBox}>
                    <TypographyCustom variant='h6'>{acquisition.name}</TypographyCustom>
                </Box>
            ))}
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && acquisitions && acquisitions.length === 0 && <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`} />}
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