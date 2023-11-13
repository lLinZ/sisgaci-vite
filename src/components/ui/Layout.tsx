import { FC } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Footer } from './footer';
import { NavBar } from './nav';
type Props = {
    children: React.ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
    return (
        <Box>
            <NavBar />
            <Box sx={styles.body}>
                <Toolbar />
                {children}
            </Box>
            <Footer />
        </Box>
    )
}
const styles = {
    body: {
        width: { xs: '100%', sm: '90%', md: '80%' },
        margin: 'auto',
        minHeight: '100vh',
        maxheight: '100%',
    }
}