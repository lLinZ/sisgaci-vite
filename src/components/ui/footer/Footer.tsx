import { FC } from 'react'
import { Divider, Grid, useTheme } from '@mui/material';
import Box from '@mui/material/Box'
import { grey } from '@mui/material/colors';
import { Contacto, Empresa, Menu, Redes } from '.';

// Functional Component
export const Footer: FC = () => {
    // Tema
    const theme = useTheme();

    // Estilos
    const styles = {
        main: { fontFamily: 'Geologica', background: grey[900], width: '100%', height: '100%', m: 'auto', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', position: 'relative' },
        redes: { zIndex: '900', width: '100%', m: 'auto', color: theme.palette.primary.contrastText, p: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'space-between' }, alignItems: 'center' },
        grid: {
            zIndex: '900',
            width: '100%', m: 'auto', color: theme.palette.primary.contrastText, p: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'space-between' }, alignItems: { xs: 'center', md: 'start' }
        },
        cintillo: { background: 'rgba(0,0,0,0.4)', padding: 1, width: '100%', textAlign: 'center', color: theme.palette.primary.contrastText }
    }

    // Render
    return (<>
        <Box sx={styles.main}>
            <Box sx={styles.redes}>
                <Redes />
            </Box>
            <Divider sx={{ zIndex: '900', bgcolor: 'common.white' }} />
            <Grid container spacing={1} sx={styles.grid}>
                <Grid item xs={12} sm={4} sx={{ p: 5 }} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Empresa />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ p: 5 }} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Menu />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ p: 5 }} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                    <Contacto />
                </Grid>
            </Grid>
            <Box sx={styles.cintillo}>Desarrollado por Linz Web Dev</Box>
        </Box >
    </>
    )
}
