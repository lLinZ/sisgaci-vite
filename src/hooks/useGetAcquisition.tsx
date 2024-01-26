import { useState, useContext, useEffect } from "react";
import { baseUrl } from "../common";
import { AuthContext } from "../context/auth";
import { IAcquisition } from "../interfaces";

export const useGetAcquisition = (id: string | undefined) => {
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