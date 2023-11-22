import { FC, useContext } from 'react';
import Box from '@mui/material/Box';
import { darken, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import { TypographyCustom } from '../../custom/TypographyCustom';
import { To, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeRounded from '@mui/icons-material/HomeRounded';
import { AuthContext } from '../../../context/auth';

type Props = {
    title: string;
    description: string;
    backPath?: string | To;
    buttons?: boolean;
}

export const DescripcionDeVista: FC<Props> = ({ description, title, backPath = undefined, buttons = true }) => {

    const router = useNavigate();
    const theme = useTheme();
    const { authState } = useContext(AuthContext)
    const styles: any = {
        nameContainer: {
            borderRadius: 3,
            marginBottom: 2,
            padding: 2
        },
        buttons: {
            background: 'rgba(100,100,100,0.1)',
            textTransform: 'none',
            borderRadius: '10em',
            color: 'text.secondary',
            mb: 2,
            '&:hover': {
                background: authState.color,
                color: theme.palette.getContrastText(authState.color)
            }
        },
        container: {
            display: 'flex',
            alignItems: 'center',
            flexFlow: 'row nowrap'
        }
    }
    const redirect = () => {
        router(authState.role?.description === 'Master' ? '/admin/dashboard' : '/dashboard')
    }
    return (
        <Box sx={styles.nameContainer} >
            {buttons && (<Button size='small' onClick={redirect} variant="text" sx={styles.buttons} startIcon={< HomeRounded />}>
                Volver al inicio
            </Button >)}
            <Box sx={styles.container}>
                {buttons && (<IconButton onClick={() => router(backPath ? backPath : -1 as To)}>
                    <ArrowBackRounded />
                </IconButton>)
                }
                <TypographyCustom variant='h4' fontWeight={'bold'}>
                    {title}
                </TypographyCustom>
            </Box>
            <TypographyCustom variant='subtitle2' fontmode={2} color='text.secondary'>
                {description}
            </TypographyCustom>
        </Box>
    )
}