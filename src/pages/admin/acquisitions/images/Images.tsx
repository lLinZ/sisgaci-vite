
import { Layout } from '../../../../components/ui';
import { CustomHorizontalLinks, DescripcionDeVista } from '../../../../components/ui/content';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/auth';
import { useParams } from 'react-router-dom';

export const Images = () => {
    const { id } = useParams();

    return (
        <Layout>
            <DescripcionDeVista title={'Imagenes del inmueble'} description={'Ingresa las imagenes del inmueble o navega por los otros requerimientos del inmueble'} />
            <CustomHorizontalLinks actual='images' id={Number(id)} />
        </Layout>
    )
}
