import { Layout } from "../../../components/ui"
import { DescripcionDeVista } from "../../../components/ui/content"
import { OptionsList } from "../../../components/ui/options"
import { IAcquisition, Option } from "../../../interfaces"
import { green, blue } from "@mui/material/colors"
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined"
import SettingsRounded from "@mui/icons-material/SettingsRounded"
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { baseUrl } from "../../../common"
import { AuthContext } from "../../../context/auth"

const useGetAcquisition = (id: string | undefined) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [acquisition, setAcquisition] = useState<IAcquisition | null>(null);
    const { authState } = useContext(AuthContext);
    const getAcquisition = async (id: string | undefined) => {
        setLoading(true);
        if (!id) {
            setLoading(false);
            return;
        }
        const url = `${baseUrl}/acquisition/${id}`;
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
                    setAcquisition(data);
                    break;
                case 400:

                    break
                case 404:
                    break;
                default:

                    break;
            }
        } catch (error) {
            console.log({ error })
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAcquisition(id);
    }, [])
    return { acquisition, setAcquisition, loading }
}
export const EditAcquisition = () => {
    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar captacion', path: '/admin/acquisitions/add', color: green[500], icon: <BusinessCenterOutlined /> },
        { text: 'Tipos de inmueble y transaccion', path: '/admin/property', color: blue[500], icon: <SettingsRounded /> },
    ]

    const { id } = useParams();
    const { acquisition, setAcquisition, loading } = useGetAcquisition(id);
    return (
        <Layout>
            <DescripcionDeVista title={'Editar captacion'} description={'Termina de completar la informacion de la captacion'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            {acquisition?.name}
        </Layout >
    )
}