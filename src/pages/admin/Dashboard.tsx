import { Box } from "@mui/material"
import { green } from "@mui/material/colors"
import { useContext } from "react"
import { OptionsList } from "../../components/ui/options"
import { TypographyCustom } from "../../components/custom"
import { Layout } from "../../components/ui"
import { AuthContext } from "../../context/auth"
import { Option } from '../../interfaces';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
export const Dashboard = () => {
    const context = useContext(AuthContext)
    const clientOptions: Option[] = [
        { text: 'Usuarios', icon: <PeopleIcon />, color: green[800], path: '/admin/users' },
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