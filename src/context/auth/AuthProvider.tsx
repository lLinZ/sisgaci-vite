import React, { FC, useReducer } from 'react'
import { AUTH_ACTIONS, AuthContext, USER_ACTIONS, authReducer } from './'
import { IRole, IUser } from '../../interfaces';
import { baseUrl } from '../../common';
import { green } from '@mui/material/colors';
import { createCookie, deleteCookie, getCookieValue } from '../../helpers/functions';
import { darken, lighten } from '@mui/material';

type Props = {
    children: React.ReactNode;
}
const initialState: IUser = {
    id: 0,
    first_name: '',
    middle_name: '',
    lastname: '',
    second_lastname: '',
    document: '',
    phone: '',
    photo: '',
    email: '',
    role_id: 0,
    status_id: 0,
    level: 0,
    created_at: '',
    color: green[500],
    darken: darken(green[500], 0.6),
    lighten: lighten(green[500], 0.6),
    logged: false,
}
export const AuthProvider: FC<Props> = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    const validateToken = async () => {
        const token = getCookieValue('token');
        if (!token) return { status: false, message: 'No hay token' };
        const url = `${baseUrl}/user/data`
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'XSRF-TOKEN': getCookieValue('XSRF-TOKEN'),
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { user } = await response.json();
                    dispatch({ type: AUTH_ACTIONS.validate, payload: { ...user, token, darken: darken(user.color, 0.6), lighten: lighten(user.color, 0.6), logged: true } })
                    const path = user.role.description === 'Master' ? '/admin/dashboard' : '/dashboard';
                    return { status: true, message: 'Sesion validada', user, path }
                default:
                    deleteCookie('token');
                    return { status: false, message: 'Token caducado', }
            }
        } catch (error) {
            console.log({ error })
            deleteCookie('token');
            return { status: false, message: 'No se logro conectar al servidor, inicie sesion nuevamente', }
        }
    }

    const userLogout = async () => {
        const url = `${baseUrl}/logout`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            }
        }

        try {
            const response = await fetch(url, options)

            switch (response.status) {
                case 200:
                    const { status, message } = await response.json();
                    deleteCookie('token');
                    dispatch({ type: AUTH_ACTIONS.logout, payload: initialState });
                    return { status, message }
                default:
                    return { status: false, message: 'No se logro cerrar sesion' };
            }
        } catch (error) {
            console.log({ error });
            return { status: false, message: 'No se logro conectar con el servidor' };
        }
    }

    const userLogin: (email: string, password: string) => Promise<{ status: boolean; user?: IUser; message: string; role?: IRole; }> = async (email, password) => {

        if (!email || !password) return { status: false, message: 'Campos vacios' };

        const url = `${baseUrl}/login`
        const body = new URLSearchParams({
            'email': email,
            'password': password,
        });
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'XSRF-TOKEN': getCookieValue('XSRF-TOKEN'),
            },
            body
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { status, user, message } = await response.json();
                    createCookie('token', user.token);
                    dispatch({ type: AUTH_ACTIONS.login, payload: { ...user, darken: darken(user.color, 0.6), lighten: lighten(user.color, 0.6) } });
                    return { status, user, message, role: user.role };

                case 400:
                    const { status: statusFailed, message: messageFailed } = await response.json();
                    return { status: statusFailed, message: messageFailed };
                case 401:
                    const { status: statusFailedUnauthorized } = await response.json();
                    return { status: statusFailedUnauthorized, message: 'No se encuentra registrado' };

                default:
                    return { status: false, message: 'Ocurrio un error en el servidor', response };
            }
        } catch (error) {
            console.error({ error });
            return { status: false, message: 'No se logro conectar al servidor' };
        }
    }

    const editData = async (email?: string, telefono?: string, password?: string, confirmarPassword?: string) => {
        if (!email && !telefono && !password && !confirmarPassword) {
            return { status: false, message: 'No se ingresaron datos' };
        }

        let bodyAppend = {};

        // Validar password
        if (password) {
            if (!confirmarPassword) return { status: false, message: 'Debe confirmar la contraseña' };
            if (confirmarPassword !== password) return { status: false, message: 'Las contraseñas deben coincidir' };
            bodyAppend = {
                ...bodyAppend,
                'password': password
            }
        }

        // Validar email
        if (email) {
            bodyAppend = {
                ...bodyAppend,
                'email': email
            }
        }

        // Validar telefono
        if (telefono) {
            bodyAppend = {
                ...bodyAppend,
                'telefono': telefono
            }
        }

        const url = `${baseUrl}/user/edit/${authState.id}`
        const body = new URLSearchParams(bodyAppend);
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authState.token}`
            },
            body
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { status, message, user } = await response.json();
                    console.log({ status, message })
                    dispatch({ type: USER_ACTIONS.edit, payload: { ...user, darken: darken(user.color, 0.6), lighten: lighten(user.color, 0.6) } })
                    return { status, message };

                case 400:
                    console.log({ status, message })
                    const { status: statusFailed, message: messageFailed } = await response.json();
                    return { status: statusFailed, message: messageFailed };
                    break;

                default:
                    console.log({ response })
                    return { status: false, message: 'Ocurrio un error en el servidor' };
                    break;
            }
        } catch (error) {
            console.error({ error });
            return { status: false, message: 'No se logro conectar al servidor' };
        }
    }

    const changeColor = async (color: string) => {
        if (!color) return { status: false, message: 'Falta el color' };

        const url = `${baseUrl}/user/edit/${authState.id}/color`
        const body = new URLSearchParams({
            'color': color,
        });
        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authState.token}`
            },
            body
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { status, message } = await response.json();
                    console.log({ status, message })
                    dispatch({ type: USER_ACTIONS.color, payload: { color, darken: darken(color, 0.6), lighten: lighten(color, 0.6), } })
                    return { status, message };

                case 400:
                    console.log({ status, message })
                    const { status: statusFailed, message: messageFailed } = await response.json();
                    return { status: statusFailed, message: messageFailed };
                    break;

                default:
                    console.log({ response })
                    return { status: false, message: 'Ocurrio un error en el servidor' };
                    break;
            }
        } catch (error) {
            console.error({ error });
            return { status: false, message: 'No se logro conectar al servidor' };
        }
    }

    return (
        <AuthContext.Provider value={{ authState, userLogin, userLogout, validateToken, changeColor, editData }}>
            {children}
        </AuthContext.Provider>
    )
}