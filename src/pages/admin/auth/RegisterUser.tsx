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
import { MenuItem, SelectChangeEvent } from '@mui/material';

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
}
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
}

export const RegisterUser = () => {
    const { authState } = useContext(AuthContext)
    const [departments, setDepartments] = useState<IDepartment[] | null>(null);
    const [departmentSelected, setDepartmentSelected] = useState<IDepartment | null>(null);

    const selectDepartment = (id: number) => {
        const selected = departments?.filter((dep: IDepartment) => id === dep.id)[0];
        setDepartmentSelected(selected ? selected : null);
    }

    const getDepartments = async () => {
        const url = `${baseUrl}/department`;
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
                    console.log(data);
                    setDepartments(data);
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
    const options: Option[] = [
        { text: 'Agregar Master', path: '/admin/register/master', color: green[500], icon: <PersonAddRounded /> },
        { text: 'Listar Usuarios', path: '/admin/users', color: blue[500], icon: <ListRounded /> },
    ]
    const onSubmit = async (
        values: IValues,
        resetForm: (nextState?: Partial<FormikState<IValues>> | undefined) => void) => {

        if (departmentSelected === null) return;
        const url = `${baseUrl}/user/add`;
        const body = new URLSearchParams();
        body.append('first_name', values.first_name);
        body.append('middle_name', values.middle_name);
        body.append('lastname', values.lastname);
        body.append('second_lastname', values.second_lastname);
        body.append('phone', values.phone);
        body.append('email', values.email);
        body.append('address', values.address);
        body.append('document', values.document);
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
    useEffect(() => {
        getDepartments();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title={'Registrar usuario'} description={'Registra un nuevo usuario basico y selecciona el departamento correspondiente'} />
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
                            <Grid item xs={12}>
                                <TextFieldCustom value={values.address} label='Direccion' name={'address'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectCustom helpertext='' label='Departamento' value={departmentSelected ? departmentSelected.id : '0'} onChange={(e: SelectChangeEvent<any>) => {
                                    selectDepartment(e.target.value);
                                }}>
                                    <MenuItem value='0' disabled>Seleccione un departamento</MenuItem>
                                    {departments && departments.map((dep: IDepartment) => (
                                        <MenuItem value={dep.id}>{dep.description}</MenuItem>
                                    ))}
                                </SelectCustom>
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