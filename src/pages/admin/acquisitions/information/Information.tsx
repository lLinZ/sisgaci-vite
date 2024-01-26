import { Layout } from '../../../../components/ui';
import { CustomHorizontalLinks, DescripcionDeVista } from '../../../../components/ui/content';
import { useParams } from 'react-router-dom';

export const Information = () => {
    const { id } = useParams();
    return (
        <Layout>
            <DescripcionDeVista title={'Informacion del inmueble'} description={'Ingresa la informacion del inmueble o navega por los otros requerimientos del inmueble'} />
            <CustomHorizontalLinks actual='information' id={Number(id)} />
        </Layout>
    )
}
