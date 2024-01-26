import { AppBar, Toolbar, Grid, Box, Typography, darken } from "@mui/material";
import { SideBar, UserMenu } from ".";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
    const { authState } = useContext(AuthContext);

    const router = useNavigate();
    return (
        <AppBar sx={{ width: '100vw', background: darken(authState.color, 0.9) }} elevation={0}>
            <Toolbar>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexFlow: 'row nowrap' }}>
                        <SideBar />
                        <img src='/logo.png' width={65} height={65} style={{ cursor: 'pointer' }} onClick={() => router('/admin/dashboard')} />
                        <Typography sx={{ cursor: 'pointer' }} onClick={() => authState.role?.description === 'Master' ? router('/admin/dashboard') : router('/dashboard')}>SYGIM</Typography>
                    </Box>
                    <UserMenu />
                </Grid>
            </Toolbar>
        </AppBar>
    )
}