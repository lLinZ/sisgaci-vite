import { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../common";
import { AuthContext } from "../context/auth";
import { ICall, IComment } from "../interfaces";

export const useGetCallForCallDetails = (id: number) => {
    const [call, setCall] = useState<ICall | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingComments, setLoadingComments] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[] | null>(null);
    const { authState } = useContext(AuthContext);
    /**
     * Funcion para obtener una llamada segun su ID
     */
    const getCall = async () => {
        setLoading(true);
        const url = `${baseUrl}/call/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    console.log({ data })
                    setCall(data.call);
                    setComments(data.comments);
                    break;
                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error con su solicitud',
                        icon: 'error'
                    })
                    break;
                case 404:
                    setCall(null);
                    break;
                case 500:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error interno en el servidor',
                        icon: 'error'
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        icon: 'error'
                    })
                    break;
            }
        } catch (error) {
            console.error({ error });
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al conectar con el servidor',
                icon: 'error',
            })
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCall()
    }, [])
    return { call, comments, loading, loadingComments, setComments, setLoading, setLoadingComments, getCall }
}