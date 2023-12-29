import { useContext, useState, useEffect } from "react";
import { baseUrl } from "../common";
import { AuthContext } from "../context/auth";
import { IDepartment } from "../interfaces";

export const useGetDepartments = () => {
    const { authState } = useContext(AuthContext)
    const [departments, setDepartments] = useState<IDepartment[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const getDepartments = async () => {
        setLoading(true)
        const url = `${baseUrl}/department`;
        const options = {
            method: "GET",
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
                    setDepartments(data);
                    break;
                default:
                    setErrors(['Ocurrio un error inesperado al consultar los departamentos']);
                    break;
            }
        } catch (error) {
            setErrors(['Ocurrio un error inesperado al conectar con el servidor']);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getDepartments();
    }, [])

    return { departments, setDepartments, loading, errors }
}