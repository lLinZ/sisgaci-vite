import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { TypographyCustom } from '../../custom';
/**
 * Compoennte con links de redes sociales de la empresa
 * @returns Menu de iconos con redes
 */
export const Redes = () => {

    const { authState } = useContext(AuthContext);
    return (
        <>
            <TypographyCustom variant='subtitle1' fontWeight='100'>¡Conéctate a nuestras redes sociales!</TypographyCustom>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                <a rel='noreferrer' target='_blank' href='https://facebook.com/consolitex'>
                    <IconButton sx={{ color: authState.color }}><FacebookIcon /></IconButton>
                </a>
                <a rel='noreferrer' target='_blank' href='https://instagram.com/consolitex'>
                    <IconButton sx={{ color: authState.color }}><InstagramIcon /></IconButton>
                </a>
                <a rel='noreferrer' target='_blank' href='https://twitter.com/consolitex'>
                    <IconButton sx={{ color: authState.color }}><TwitterIcon /></IconButton>
                </a>
                <a rel='noreferrer' target='_blank' href='https://wa.me/5804144029820'>
                    <IconButton sx={{ color: authState.color }}><WhatsAppIcon /></IconButton>
                </a>
            </Box>
        </>
    )
}