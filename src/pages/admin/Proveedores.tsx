import { useState, useContext, useEffect } from 'react';
import { Layout } from '../../components/ui'
import { BusquedaYResultado, DescripcionDeVista, NoContentFound } from '../../components/ui/content'
import { OptionsList } from '../../components/ui/options'
import { IProvider, Option } from '../../interfaces';
import { green } from '@mui/material/colors';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Box from '@mui/material/Box';
import { TypographyCustom } from '../../components/custom';
import { baseUrl } from '../../common';
import { AuthContext } from '../../context/auth';
import { CircularProgress } from '@mui/material';

export const Proveedores = () => {
    const [providers, setProviders] = useState<IProvider[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { authState } = useContext(AuthContext)
    const options: Option[] = [
        { text: 'Agregar proveedores', path: '/admin/proveedores/registrar', color: green[500], icon: <EngineeringIcon /> },
    ]
    const getProviders = async () => {
        const url = `${baseUrl}/provider`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            setLoading(true)
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json()
                    setProviders(data)
                    break;
                case 400:
                    break;
            }
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getProviders();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title={'Proveedores'} description={'Registra un nuevo proveedor o edita los ya existentes'} />
            <OptionsList options={options} breakpoints={{ xs: 12 }} />
            {providers && (<BusquedaYResultado records={providers} setRecords={setProviders} title={'Proveedores'} />)}
            {providers && providers.map((provider: IProvider) => (
                <Box key={provider.id} sx={{ mb: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', borderRadius: 3, p: 2, background: '#FFF' }}>
                    <TypographyCustom variant='h6'>{provider.name}</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary'>RIF {provider.rif}</TypographyCustom>
                </Box>
            ))}
            {loading && <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 2 }}><CircularProgress /></Box>}
            {!loading && !providers && <NoContentFound title={'No hubo resultados'} text={'No hay proveedores disponibles'} />}
        </Layout>
    )
}