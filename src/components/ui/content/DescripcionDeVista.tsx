import { useContext } from 'react';
import Box from '@mui/material/Box';
import { darken, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import { TypographyCustom } from '../../custom/TypographyCustom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeRounded from '@mui/icons-material/HomeRounded';
import { AuthContext } from '../../../context/auth';

type Props = {
    title: string;
    description: string;
    backPath?: string;
}

export const DescripcionDeVista = (props: Props) => {

    const router = useNavigate();
    const theme = useTheme();
    const { authState } = useContext(AuthContext)
    const backpath = props.backPath ? props.backPath : -1;
    return (
        <Box sx={styles.nameContainer}>
            <Button size='small' onClick={() => router(authState.role?.description === 'Cliente' ? '/dashboard' : '/admin/dashboard')} variant="text" sx={{
                background: 'rgba(100,100,100,0.1)', textTransform: 'none', borderRadius: '10em', color: 'text.secondary', mb: 2, '&:hover': {
                    background: authState.color,
                    color: theme.palette.getContrastText(authState.color)
                }
            }} startIcon={
                <HomeRounded />
            }>
                Volver al inicio
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', flexFlow: 'row nowrap' }}>
                <IconButton onClick={() => router(backpath)}>
                    <ArrowBackRounded />
                </IconButton>
                <TypographyCustom variant='h4' fontWeight={'bold'}>
                    {props.title}
                </TypographyCustom>
            </Box>
            <TypographyCustom variant='subtitle2' fontmode={2} color='text.secondary'>
                {props.description}
            </TypographyCustom>
        </Box>
    )
}
const styles = {
    nameContainer: {
        borderRadius: 3,
        marginBottom: 2,
        padding: 2
    },
}