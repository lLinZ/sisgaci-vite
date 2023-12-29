import { useState, useContext, ReactNode, ReactElement, useEffect } from "react";
import { Drawer, Box, Toolbar, Grid, IconButton, Divider, Button, darken } from "@mui/material";

import { useNavigate } from "react-router-dom";

import DashboardRounded from "@mui/icons-material/DashboardRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import MoneyRounded from "@mui/icons-material/MoneyRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ProfileRounded from "@mui/icons-material/PersonRounded";

import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../../context/auth";
interface LinkProps {
    text: string;
    path: string;
    icon: ReactElement;
}
const useSideBarLinks = () => {
    const { authState } = useContext(AuthContext);
    const [links, setLinks] = useState<LinkProps[]>([])
    const getLinksByLevel = () => {
        switch (authState.level) {
            case 1:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Lvl 1', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            case 2:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Lvl 2', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            case 3:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Lvl 3', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            case 4:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Lvl 4', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            case 5:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Ejecutivo', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            case 6:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Gerente de Venta', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            case 7:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'SAC', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            case 8:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Protocolizacion', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            case 9:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Gerencia', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            case 10:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Master', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
            default:
                setLinks(
                    [
                        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                        { text: 'Lvl unknown', path: '/perfil', icon: <ProfileRounded sx={{ color: darken(authState.color, 0.2) }} /> },
                    ]
                )
                break;
        }
    }
    useEffect(() => {
        getLinksByLevel();
    })
    return { links }
}

export const SideBar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const theme = useTheme();
    const { links } = useSideBarLinks();
    const router = useNavigate();
    const onClick = () => {
        setOpen(true);
    }
    return (
        <>
            <IconButton onClick={onClick}>
                <MenuRounded sx={{ color: '#FFF' }} />
            </IconButton>
            <Drawer open={open} >
                <Box sx={{ width: 240 }}>
                    <Toolbar>
                        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flexFlow: 'row nowrap' }}>
                                <img src='/logo.png' width={65} height={65} />
                                {/* <Typography>Condominios</Typography> */}
                            </Box>
                            <IconButton onClick={() => setOpen(false)}>
                                <CloseRounded />
                            </IconButton>
                        </Grid>
                    </Toolbar>
                    <Divider />
                    {links.map((item) => (
                        <Box key={item.text}>
                            <Button fullWidth variant='text' startIcon={item.icon} sx={{ display: 'flex', justifyContent: 'start', color: theme.palette.text.primary, textTransform: 'none', p: 2 }} onClick={() => router(item.path)}>{item.text}</Button>
                            <Divider />
                        </Box>
                    ))}
                </Box>
            </Drawer>
        </>
    )
}