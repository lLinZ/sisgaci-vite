import React, { useContext, useState } from 'react'
import { Avatar, Box, Divider, IconButton, Menu, MenuItem } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import ExitToApp from '@mui/icons-material/ExitToAppRounded';
import SettingsRounded from '@mui/icons-material/SettingsRounded';
import { AuthContext } from '../../../context/auth';
import { TypographyCustom } from '../../custom';

export const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useNavigate();
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const redirect = (path: string) => {
        router(path)
    }

    const { authState, userLogout } = useContext(AuthContext);

    const logout = async () => {
        const result = await userLogout();
        console.log({ result })
        if (result.status) return window.location.href = '/';
    }
    return (
        <Box>
            <IconButton onClick={handleClick}>
                <Avatar alt='User Avatar' sx={{ width: 40, height: 40, bgcolor: authState.color }}>{authState.logged ? authState.nombre.substring(0, 1) + authState.apellido.substring(0, 1) : 'U'}</Avatar>
            </IconButton>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose} onClick={handleClose}
                PaperProps={styles.paperProps}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => redirect('/perfil')}>
                    <SettingsRounded sx={{ color: authState.color }} />
                    <TypographyCustom variant='subtitle1'>
                        Configurar perfil
                    </TypographyCustom>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => logout()}>
                    <ExitToApp sx={{ color: authState.color }} />
                    <TypographyCustom variant='subtitle1'>
                        Cerrar sesion
                    </TypographyCustom>
                </MenuItem>

            </Menu>
        </Box>
    )
}


const styles = {
    paperProps: {
        elevation: 0,
        sx: {
            overflow: 'visible',
            width: 200,
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
        },
    }
}