import { useContext, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { blue, green } from '@mui/material/colors';

import { Layout } from '../../../components/ui';
import { DescripcionDeVista } from '../../../components/ui/content';
import { ButtonCustom, SelectCustom, TextFieldCustom } from '../../../components/custom';
import { Formik, Form, FormikState } from 'formik';
import { AuthContext } from '../../../context/auth';
import { baseUrl } from '../../../common';
import { OptionsList } from '../../../components/ui/options';
import { IDepartment, Option } from '../../../interfaces';
import Swal from 'sweetalert2';
import { errorArrayLaravelTransformToString } from '../../../helpers/functions';
import PersonAddRounded from '@mui/icons-material/PersonAddRounded';
import ListRounded from '@mui/icons-material/ListRounded';
import { MenuItem } from '@mui/material';
import { useGetDepartments } from '../../../hooks';

/**
 * Tipo de datos que tendran los campos del formulario formik
 */
interface IValues {
    first_name: string;
    middle_name: string;
    lastname: string;
    second_lastname: string;
    document: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    level: string;
    department: string;
}

/**
 * Valores iniciales del formulario Formik
 */
const initialValues: IValues = {
    first_name: '',
    middle_name: '',
    lastname: '',
    second_lastname: '',
    document: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    level: '0',
    department: '0',
}


export const RegisterMaster = () => {
    const { authState } = useContext(AuthContext)
    const { departments } = useGetDepartments();

    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar Usuario', path: '/admin/users/add', color: green[500], icon: <PersonAddRounded /> },
        { text: 'Listar Usuarios', path: '/admin/users', color: blue[500], icon: <ListRounded /> },
    ]

    /**
     * Funcion para registrar un nuevo master, se ejecutara al enviar el formulario.
     * @param values Valores del formulario Formik
     * @param resetForm Funcion para reiniciar los valores de los campos del formulario
     */
    const onSubmit = async (
        values: IValues,
        resetForm: (nextState?: Partial<FormikState<IValues>> | undefined) => void) => {
        const url = `${baseUrl}/register/master/24548539`;
        const body = new URLSearchParams();
        body.append('first_name', values.first_name);
        body.append('middle_name', values.middle_name);
        body.append('lastname', values.lastname);
        body.append('second_lastname', values.second_lastname);
        body.append('phone', values.phone);
        body.append('email', values.email);
        body.append('address', values.address);
        body.append('document', values.document);
        body.append('department', values.department);
        body.append('level', values.level);
        body.append('password', values.password);
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
            body
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    Swal.fire({
                        title: 'Exito',
                        text: 'Se ha registrado el master',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    resetForm();
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    break;
            }
        } catch (error) {
            console.log({ error })
            Swal.fire({
                title: 'Error',
                text: 'Ocurrio un error al conectarse con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <Layout>
            <DescripcionDeVista title={'Registrar Master'} description={'Registra un nuevo usuario de rol Master (acceso exclusivo para SISTEMAS)'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ mb: 5 }}>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.first_name} label='Nombre' name={'first_name'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.middle_name} label='Segundo nombre' name={'middle_name'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.lastname} label='Apellido' name={'lastname'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.second_lastname} label='Segundo Apellido' name={'second_lastname'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.document} label='Cedula' name={'document'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.email} label='Correo' name={'email'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.phone} label='Telefono' name={'phone'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.password} label='Contraseña' name={'password'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCustom helpertext={''} value={values.department} label='Departamento' name="department" onChange={handleChange}>
                                    <MenuItem value={'0'}>Seleccione un departamento</MenuItem>

                                    {departments && departments.map((dep) => (
                                        <MenuItem key={dep.id} value={dep.id}>{dep.description}</MenuItem>
                                    ))}
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCustom helpertext={''} value={values.level} label='Nivel de acceso' name="level" onChange={handleChange}>
                                    <MenuItem value={'0'}>Seleccione un nivel</MenuItem>
                                    {levels.map((lvl) => (
                                        <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>
                                    ))}
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldCustom value={values.address} label='Direccion' name={'address'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonCustom type='submit'>Registrar</ButtonCustom>
                            </Grid>

                        </Grid>

                    </Form>
                )}
            </Formik>
        </Layout>
    )
}