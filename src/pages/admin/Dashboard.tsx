import { Box } from "@mui/material"
import { green, blue, orange, red, amber, indigo, pink, purple } from "@mui/material/colors"
import { useContext } from "react"
import { OptionsList } from "../../components/ui/options"
import { TypographyCustom } from "../../components/custom"
import { Layout } from "../../components/ui"
import { AuthContext } from "../../context/auth"
import { Option } from '../../interfaces';
import MapsHomeWorkRounded from "@mui/icons-material/MapsHomeWorkRounded"
import ApartmentIcon from '@mui/icons-material/ApartmentRounded';
import EngineeringIcon from '@mui/icons-material/EngineeringRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import PriceCheckIcon from '@mui/icons-material/PriceCheckRounded';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLongRounded';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchangeRounded';
import EventNoteIcon from '@mui/icons-material/EventNoteRounded';
export const Dashboard = () => {
    const context = useContext(AuthContext)
    const clientOptions: Option[] = [
        { text: 'Divisas', icon: <CurrencyExchangeIcon />, color: green[400], path: '/admin/divisas' },
        { text: 'Pagos', icon: <PriceCheckIcon />, color: blue[400], path: '/admin/pagos' },
        { text: 'Condominios', icon: <EventNoteIcon />, color: amber[400], path: '/admin/condominios' },
        { text: 'Gastos', icon: <ReceiptLongIcon />, color: red[400], path: '/admin/gastos' },
        { text: 'Usuarios', icon: <PeopleIcon />, color: green[800], path: '/admin/users' },
        { text: 'Proveedores', icon: <EngineeringIcon />, color: indigo[300], path: '/admin/proveedores' },
        { text: 'Unidades', icon: <MapsHomeWorkRounded />, color: orange[300], path: '/admin/unidades' },
        { text: 'Edificios', icon: <ApartmentIcon />, color: pink[300], path: '/admin/edificios' },
    ]
    return (
        <Layout>

            <Box sx={styles.nameContainer}>
                <TypographyCustom variant='h4' fontWeight={'bold'}>
                    Hola, {context.authState.nombre}!
                </TypographyCustom>
                <TypographyCustom variant='subtitle2' fontmode={2}>
                    Este es la pagina principal de Master
                </TypographyCustom>
                <TypographyCustom variant='subtitle2' fontmode={2}>
                    Explora las diferentes opciones para interactuar con el sistema.
                </TypographyCustom>
            </Box>
            <OptionsList options={clientOptions} breakpoints={{ xs: 6, sm: 6, md: 3, lg: 3 }} />
            <Box sx={styles.contentContainer}>

            </Box>
        </Layout>
    )
}

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