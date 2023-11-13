import { useContext } from 'react'
import { AuthContext } from '../../context/auth';
import { Layout } from '../../components/ui';
import { OptionsList } from '../../components/ui/options';
import Box from '@mui/material/Box';
import { TypographyCustom } from '../../components/custom';
import MapsHomeWorkRounded from '@mui/icons-material/MapsHomeWorkRounded';
import RequestQuoteRounded from '@mui/icons-material/RequestQuoteRounded'
import PictureAsPdfRounded from '@mui/icons-material/PictureAsPdfRounded';
import ArticleRounded from '@mui/icons-material/ArticleRounded';
import { green, blue, orange, red } from '@mui/material/colors';
import { Option } from '../../interfaces';

export const Dashboard = () => {
    const context = useContext(AuthContext)
    const clientOptions: Option[] = [
        { text: 'Pagos', icon: <RequestQuoteRounded />, color: green[400], path: '/pagos' },
        { text: 'Unidades', icon: <MapsHomeWorkRounded />, color: blue[300], path: '/unidades' },
        { text: 'Documentos', icon: <ArticleRounded />, color: orange[300], path: '/documentos' },
        { text: 'Reportes', icon: <PictureAsPdfRounded />, color: red[400], path: '/reportes' },
    ]

    return (
        <Layout>

            <Box sx={styles.nameContainer}>
                <TypographyCustom variant='h4' fontWeight={'bold'}>
                    Hola, {context.authState.nombre}!
                </TypographyCustom>
                <TypographyCustom variant='subtitle2' fontmode={2}>
                    Consulta la informacion de tu condominio con solo un click!
                </TypographyCustom>
                <TypographyCustom variant='subtitle2' fontmode={2}>
                    O explora las diferentes opciones de la plataforma.
                </TypographyCustom>
            </Box>
            <OptionsList options={clientOptions} />
            <Box sx={styles.contentContainer}>
                <Box>

                </Box>
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