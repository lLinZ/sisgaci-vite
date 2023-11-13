import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import CloseRounded from '@mui/icons-material/CloseRounded';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferencesRounded';
import grey from '@mui/material/colors/grey';

import { lighten } from '@mui/material/styles';
import useTheme from '@mui/material/styles/useTheme';

import { TypographyCustom } from '../../custom';
import { AuthContext } from '../../../context/auth';
import { baseUrl } from '../../../common';

import { IBuilding, IUnitType } from '../../../interfaces'

import { errorArrayLaravelTransformToString } from '../../../helpers/functions';
import { UnitTypeList } from '../unit_types';
import Swal from 'sweetalert2';

type Props = {
    edificio: IBuilding;
}

export const EdificioItem = ({ edificio }: Props) => {
    const [unitTypes, setUnitTypes] = useState<IUnitType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(false);
    const { authState } = useContext(AuthContext);
    const theme = useTheme();

    const getUnitTypes = async () => {
        const url = `${baseUrl}/buildings/unit_types/${edificio.id}`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setUnitTypes(data)
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se logro conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } finally {
            setLoading(false)
        }
    }
    const handleClick = () => {
        getUnitTypes();
        setOpen(true);
        setLoading(true);
    }
    const handleClose = () => {
        setOpen(false);
        setUnitTypes(null);
    }
    return (
        <Box sx={styles.main}>
            <TypographyCustom variant='subtitle1' fontWeight='bold' color='text.primary'>{edificio.name}</TypographyCustom>
            <TypographyCustom variant='h6' fontWeight='bold' color='text.disabled'>Pisos {edificio.floor_qty}</TypographyCustom>
            <TypographyCustom variant='h6' fontWeight='bold' color='text.disabled'>Unidades {edificio.units_qty}</TypographyCustom>
            <Button
                startIcon={<RoomPreferencesIcon />}
                onClick={() => handleClick()}
                variant={'text'}
                sx={{
                    textTransform: 'none',
                    borderRadius: '10em',
                    color: authState.color,
                    '&:hover': {
                        background: lighten(authState.color, 0.1),
                        color: theme.palette.getContrastText(lighten(authState.color, 0.1))
                    }
                }}
            >
                Ver tipos de inmueble
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: grey[900] }}>
                    <TypographyCustom variant={'h6'} color={'common.white'}>Tipos de unidad</TypographyCustom>
                    <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                        <CloseRounded />
                    </IconButton>
                </Toolbar>
                <Box sx={{ p: 2, minHeight: '100vh' }}>
                    {loading && <Box sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                        <CircularProgress sx={{ color: authState.color }} />
                    </Box>
                    }
                    {unitTypes && <UnitTypeList unitTypes={unitTypes} building={edificio} />}
                </Box>
            </Dialog>
        </Box>
    )
}


const styles = {
    main: {
        width: '100%',
        height: '100%',
        p: 3,
        display: 'flex',
        alignItems: 'start',
        flexFlow: 'column wrap',
        boxShadow: '0 2px 8px rgba(100,100,100,0.1)',
        background: '#FFF',
        borderRadius: 3
    }
} 