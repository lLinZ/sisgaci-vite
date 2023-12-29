import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../common";
import { AuthContext } from "../context/auth";
import { IPaginationAcquistions } from "../interfaces";

export const useGetAcquisitions = () => {

    const { authState } = useContext(AuthContext)

    const [acquisitions, setAcquisitions] = useState<IPaginationAcquistions | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    /**
     * Funcion para obtener Captaciones disponibles del usuario logeado
     */
    const getAcquisitions = async () => {
        const url = `${baseUrl}/acquisition`;
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
                    console.log(data)
                    setAcquisitions(data);
                    break;
                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error al buscar las captaciones',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error desconocido',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                    })
                    break;
            }
        } catch (error) {
            console.log({ error });
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al conectar con el servidor',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            })
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAcquisitions();
    }, [])
    return { acquisitions, setAcquisitions, loading }
}