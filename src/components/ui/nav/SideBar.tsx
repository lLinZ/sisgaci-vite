import { useState, useContext } from "react";
import { Drawer, Box, Toolbar, Grid, IconButton, Divider, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import DashboardRounded from "@mui/icons-material/DashboardRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import MoneyRounded from "@mui/icons-material/MoneyRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ProfileRounded from "@mui/icons-material/PersonRounded";

import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../../context/auth";

export const SideBar = () => {
    const [open, setOpen] = useState<boolean>(false)
    const theme = useTheme();

    const { authState } = useContext(AuthContext)
    const links = [
        { text: 'Dashboard', path: '/dashboard', icon: <DashboardRounded sx={{ color: authState.color }} /> },
        { text: 'Perfil', path: '/perfil', icon: <ProfileRounded sx={{ color: authState.color }} /> },
        { text: 'Pagos', path: '/pagos', icon: <MoneyRounded sx={{ color: authState.color }} /> },
    ];
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