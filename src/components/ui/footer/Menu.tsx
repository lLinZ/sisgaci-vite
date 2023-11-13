import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TypographyCustom } from "../../custom";
import { List, ListSubheader, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AdjustRounded from "@mui/icons-material/AdjustRounded";
import { AuthContext } from "../../../context/auth";

/**
 * Componente de menú con links internos de la empresa
 * @param theme Tema del MUI
 * @returns Lista de links
 */
export const Menu = () => {

    // Router
    const router = useNavigate();


    const { authState } = useContext(AuthContext);

    return (
        <List
            sx={{ width: '100%', maxWidth: 250, fontFamily: 'Geologica', }}
            component='nav'
            aria-labelledby='links-internos-subheader'
            subheader={
                <ListSubheader component='div' sx={{ background: 'none', textAlign: { xs: 'center', md: 'start' }, color: '#FFF' }} id='links-internos-subheader'>
                    <TypographyCustom variant='overline' fontSize={16} fontWeight='bold' sx={{ fontFamily: 'Geologica' }}>Links internos</TypographyCustom>
                </ListSubheader>
            }
        >
            <ListItemButton onClick={() => router('/')}>
                <ListItemIcon>
                    <AdjustRounded sx={{ color: authState.color }} />
                </ListItemIcon>
                <ListItemText sx={{ fontFamily: 'Noto Sans Warang Citi', }} primary='Inicio' />
            </ListItemButton>
            {/* <ListItemButton onClick={() => router('/auth/ejecutivo')}>
                <ListItemIcon>
                    <AdjustIcon sx={{ color: 'theme.palette.primary.dark ' }} />
                </ListItemIcon>
                <ListItemText sx={{ fontFamily: 'Noto Sans Warang Citi', }} primary='Acceso Ejecutivo' />
            </ListItemButton>
            <ListItemButton onClick={() => router('/condominios')}>
                <ListItemIcon> 
                    <AdjustIcon sx={{ color: 'theme.palette.primary.dark ' }} />
                </ListItemIcon> */}
            {/* <ListItemText sx={{ fontFamily: 'Noto Sans Warang Citi', }} primary='Condominios' /> */}
            {/* </ListItemButton> */}
        </List>
    )
}
