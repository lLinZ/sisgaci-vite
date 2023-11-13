import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth';
import { baseUrl } from '../common';

type FetchProps = {
    path?: string;
    mth?: string;
    auth?: boolean;
    body?: any;
}

// type IResponse = {
//     status: boolean;
//     message: string;
//     data?: any[];
//     errors?: any[];
// }
export const useHttp = (props: FetchProps) => {

    const { path = '/', mth = 'GET', auth = true, body = null } = props;
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const { authState } = useContext(AuthContext)
    const options = body ? {
        method: mth,
        headers: {
            'Accept': 'application/json',
            'Authorization': auth ? `Bearer ${authState.token}` : ''
        },
        body
    } : {
        method: mth,
        headers: {
            'Accept': 'application/json',
            'Authorization': auth ? `Bearer ${authState.token}` : ''
        },
    }

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                const response = await fetch(`${baseUrl}${path}`, options);
                switch (response.status) {
                    case 200:
                        const { message, data } = await response.json();
                        setStatus(true);
                        setMessage(message);
                        setData(data);
                        break;
                    case 400:
                        const { message: messageFailed, errors } = await response.json();
                        setMessage(messageFailed);
                        setError(errors);
                        break;
                    case 401:
                        setMessage('No estas autenticado');
                        break;
                    default:
                        setMessage('Ocurrio un error inesperado')
                        break;
                }
            } catch (error) {
                console.error({ error });
                setMessage('No se logro conectar al servidor');
            } finally {
                setLoading(false);
            }
        })()
    }, [path])
    return { data, error, message, status, loading };
}