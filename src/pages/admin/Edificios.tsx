import { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DomainAddIcon from '@mui/icons-material/DomainAddRounded';

import { green } from '@mui/material/colors';
import { Layout } from '../../components/ui';
import { DescripcionDeVista } from '../../components/ui/content';
import { IBuilding, Option } from '../../interfaces';
import { OptionsList } from '../../components/ui/options';
import { EdificiosList } from '../../components/admin/buildings';
import { baseUrl } from '../../common';
import { AuthContext } from '../../context/auth';
import Swal from 'sweetalert2';
import { errorArrayLaravelTransformToString } from '../../helpers/functions';

export const Edificios = () => {
    const { authState } = useContext(AuthContext);
    const [buildings, setBuildings] = useState<IBuilding[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const options: Option[] = [
        { text: 'Registrar edificios', icon: <DomainAddIcon />, color: green[400], path: '/admin/edificios/registrar' },
    ];

    const getBuildings = async () => {
        const url = `${baseUrl}/buildings`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            const respuesta = await fetch(url, options);
            switch (respuesta.status) {
                case 200:
                    const { data } = await respuesta.json();
                    setBuildings(data)
                    break;
                case 400:
                    const { message: messageFailed, errors } = await respuesta.json();
                    console.log(messageFailed);
                    const errorString = errorArrayLaravelTransformToString(errors);

                    Swal.fire({
                        title: 'Error',
                        html: errorString,
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });

                    break;
                case 401:
                    Swal.fire({
                        title: 'Error',
                        html: 'No estas autorizado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        html: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    break;
            }
        } catch (error) {
            console.log({ error })
            Swal.fire({
                title: 'Error',
                html: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBuildings()
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title='Edificios' description={`En esta vista se registran edificios o conjuntos residenciales`} backPath="/admin/dashboard" />
            <OptionsList options={options} breakpoints={{ xs: 12 }} />
            {buildings && buildings.length > 0 && (<EdificiosList edificios={buildings} />)}
            {loading &&
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress sx={{ color: authState.color }} />
                </Box>
            }
        </Layout>
    )
}
