import { Box, CircularProgress } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { useState, useContext, useEffect } from "react";
import { baseUrl } from "../../../common";
import { TypographyCustom } from "../../../components/custom";
import { Layout } from "../../../components/ui";
import { DescripcionDeVista, BusquedaYResultado, NoContentFound } from "../../../components/ui/content";
import { OptionsList } from "../../../components/ui/options";
import { AuthContext } from "../../../context/auth";
import { Option, ICall } from "../../../interfaces";
import CallRounded from "@mui/icons-material/CallRounded";
const title = 'Llamadas'
export const Calls = () => {
    const [calls, setCalls] = useState<ICall[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { authState } = useContext(AuthContext)
    const options: Option[] = [
        { text: 'Agregar llamada', path: '/admin/calls/add', color: green[500], icon: <CallRounded /> },
    ]
    const getCalls = async () => {
        const url = `${baseUrl}/call`;
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
                    setCalls(data)
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
        getCalls();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Consulta usuarios o navega a "Agregar Usuario" para ingresar uno nuevo en el sistema!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            {calls && (<BusquedaYResultado records={calls} setRecords={setCalls} title={title} />)}
            {calls && calls.map((call: ICall) => (
                <Box key={call.id} sx={styles.contentBox}>
                    <TypographyCustom variant='h6'>Cliente {call.client?.first_name}</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>{call.client?.phone1}</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>{call.created_at}</TypographyCustom>
                </Box>
            ))}
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && !calls && <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`} />}
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