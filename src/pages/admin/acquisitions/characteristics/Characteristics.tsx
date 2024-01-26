import { Layout } from '../../../../components/ui';
import { CustomHorizontalLinks, DescripcionDeVista } from '../../../../components/ui/content';
import { useParams } from 'react-router-dom';
import { ApartmentCharacteristics, LandCharacteristics, QuintCharacteristics, ShedCharacteristics, ShopCharacteristics } from '../../../../components/admin/acquistions/forms';
import { useGetAcquisition } from '../../../../hooks';
import { Box } from '@mui/material';

export const Characteristics = () => {
    const { id } = useParams();
    const { acquisition, setAcquisition, loading } = useGetAcquisition(id);
    return (
        <Layout>
            <DescripcionDeVista title={'Caracteristicas del inmueble'} description={'Ingresa las caracteristicas del inmueble o navega por los otros requerimientos del inmueble'} />
            <CustomHorizontalLinks actual='characteristics' id={Number(id)} />
            <Box sx={{ marginBlock: 5 }}>
                {acquisition && acquisition.property_type.description === 'Apartamento' && (<ApartmentCharacteristics id={Number(id)} characteristics={{}} />)}
                {acquisition && acquisition.property_type.description === 'Quinta' && (<QuintCharacteristics id={Number(id)} caracteristicas={{}} />)}
                {acquisition && acquisition.property_type.description === 'Land' && (<LandCharacteristics id={Number(id)} caracteristicas={{}} />)}
                {acquisition && acquisition.property_type.description === 'Shed' && (<ShedCharacteristics id={Number(id)} caracteristicas={{}} />)}
                {acquisition && acquisition.property_type.description === 'Shop' && (<ShopCharacteristics id={Number(id)} caracteristicas={{}} />)}
            </Box>
        </Layout>
    )
}
