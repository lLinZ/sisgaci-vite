import { Dispatch, useContext, useEffect, useState } from "react";
import { baseUrl } from "../common";
import { AuthContext } from "../context/auth";
import Swal from "sweetalert2";

export const useGet: (url: string) => any = (url) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { authState } = useContext(AuthContext);
    const _url = `${baseUrl}${url}`;
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authState.token}`
        }
    }
    const getData = async () => {
        try {
            setLoading(true)
            const response = await fetch(_url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json()
                    setData(data)
                    break;
                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se encontraron resultados',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
            }
        } catch (error) {
            console.error({ error });
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
    useEffect(() => {
        getData();
    }, [])

    return { data, loading, setData }
}