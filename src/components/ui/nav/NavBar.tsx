import { AppBar, Toolbar, Grid, Box, Typography, darken } from "@mui/material";
import { SideBar, UserMenu } from ".";
import { grey } from "@mui/material/colors";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";

export const NavBar = () => {
    const { authState } = useContext(AuthContext);

    return (
        <AppBar sx={{ width: '100vw', background: darken(authState.color, 0.9) }} elevation={0}>
            <Toolbar>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexFlow: 'row nowrap' }}>
                        <SideBar />
                        <img src='/logo.png' width={65} height={65} />
                        <Typography>SISGACI</Typography>
                    </Box>
                    <UserMenu />
                </Grid>
            </Toolbar>
        </AppBar>
    )
}