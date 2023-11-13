import { AppBar, Toolbar, Grid, Box, Typography } from "@mui/material";
import { SideBar, UserMenu } from ".";
import { grey } from "@mui/material/colors";

export const NavBar = () => {
    return (
        <AppBar sx={{ width: '100vw', background: grey[900] }} elevation={0}>
            <Toolbar>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexFlow: 'row nowrap' }}>
                        <SideBar />
                        <img src='/logo.png' width={65} height={65} />
                        <Typography>Condominios</Typography>
                    </Box>
                    <UserMenu />
                </Grid>
            </Toolbar>
        </AppBar>
    )
}