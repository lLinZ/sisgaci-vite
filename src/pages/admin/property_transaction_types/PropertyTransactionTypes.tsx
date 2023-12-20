import { Box, CircularProgress } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { useState, useContext, useEffect } from "react";
import { baseUrl } from "../../../common";
import { TypographyCustom } from "../../../components/custom";
import { Layout } from "../../../components/ui";
import { DescripcionDeVista, BusquedaYResultado, NoContentFound } from "../../../components/ui/content";
import { OptionsList } from "../../../components/ui/options";
import { AuthContext } from "../../../context/auth";
import { Option, IPropertyTransactionType } from "../../../interfaces";
import GroupRounded from "@mui/icons-material/GroupRounded";
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";

const title = 'Tipos de Transaccion de Propiedad'

export const PropertyTransactionTypes = () => {
    const [transactionTypes, setTransactionTypes] = useState<IPropertyTransactionType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { authState } = useContext(AuthContext)

    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar departamento', path: '/admin/department/add', color: green[500], icon: <BusinessCenterOutlined /> },
        { text: 'Usuarios', path: '/admin/users', color: blue[500], icon: <GroupRounded /> },
    ]

    /**
     * Funcion para obtener los tipos de transaccion de propiedades disponibles
     */
    const getTransactionTypes = async () => {
        const url = `${baseUrl}/property_transaction_types`;
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
                    setTransactionTypes(data)
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
        getTransactionTypes();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Consulta usuarios o navega a "Agregar Usuario" para ingresar uno nuevo en el sistema!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            {transactionTypes && (<BusquedaYResultado records={transactionTypes} setRecords={setTransactionTypes} title={title} />)}
            {transactionTypes && transactionTypes.map((transactionType: IPropertyTransactionType) => (
                <Box key={transactionType.id} sx={styles.contentBox}>
                    <TypographyCustom variant='h6'>{transactionType.description}</TypographyCustom>
                </Box>
            ))}
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && !transactionTypes && <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`} />}
        </Layout>
    )
}

/**
 * Estilos de los componentes MUI
 */
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