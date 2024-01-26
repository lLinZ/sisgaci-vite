import { Box } from "@mui/material"
import { green, blue, pink, amber } from "@mui/material/colors"
import { useContext } from "react"
import { OptionsList } from "../../components/ui/options"
import { TypographyCustom } from "../../components/custom"
import { Layout } from "../../components/ui"
import { AuthContext } from "../../context/auth"
import { Option } from '../../interfaces';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import BuildingRounded from '@mui/icons-material/BusinessCenterRounded';
import CallRounded from "@mui/icons-material/CallRounded";
import Diversity2Rounded from "@mui/icons-material/Diversity2Rounded";


export const Dashboard = () => {
    const context = useContext(AuthContext)

    /**
     * Opciones del menu de navegacion superior
     */
    const clientOptions: Option[] = [
        { text: 'Usuarios', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Clientes', icon: <Diversity2Rounded />, path: '/admin/clients' },
        { text: 'Llamadas', icon: <CallRounded />, path: '/admin/calls/search' },
        { text: 'Captaciones', icon: <BuildingRounded />, path: '/admin/acquisitions' },
    ]
    return (
        <Layout>
            <Box sx={styles.nameContainer}>
                <TypographyCustom variant='h4' fontWeight={'bold'}>
                    Hola, {context.authState.first_name}!
                </TypographyCustom>
                <TypographyCustom variant='subtitle2' fontmode={2}>
                    Este es la pagina principal de Master
                </TypographyCustom>
                <TypographyCustom variant='subtitle2' fontmode={2}>
                    Explora las diferentes opciones para interactuar con el sistema.
                </TypographyCustom>
            </Box>
            <OptionsList options={clientOptions} breakpoints={{ xs: 6, sm: 4, md: 4, lg: 3 }} />
            <Box sx={styles.contentContainer}>

            </Box>
        </Layout>
    )
}
/**
 * Estilos de los componentes MUI
 */
const styles = {
    nameContainer: {
        borderRadius: 3,
        marginBottom: 2,
        padding: 2
    },
    contentContainer: {
        margin: 0,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        width: '100%',
        height: 200,
        background: '#FFF',
        boxShadow: '0 2px 8px rgba(100,100,100,0.1)'
    }
}