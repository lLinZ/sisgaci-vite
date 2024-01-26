import { Layout } from '../../../../components/ui';
import { CustomHorizontalLinks, DescripcionDeVista } from '../../../../components/ui/content';
import { useParams } from 'react-router-dom';

export const Owner = () => {
    const { id } = useParams();
    return (
        <Layout>
            <DescripcionDeVista title={'Propietario del inmueble'} description={'Ingresa el propietario del inmueble o navega por los otros requerimientos del inmueble'} />
            <CustomHorizontalLinks actual='owner' id={Number(id)} />
        </Layout>
    )
}
