import { useContext, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { amber, blue, green, pink } from '@mui/material/colors';

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
import { Box, IconButton, MenuItem, SelectChangeEvent, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { AddRounded, BusinessCenter } from '@mui/icons-material';

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
    level: '',
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
    level: string;
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
        { text: 'Agregar Master', path: '/admin/register/master', icon: <PersonAddRounded /> },
        { text: 'Listar Usuarios', path: '/admin/users', icon: <ListRounded /> },
        { text: 'Crear departamento', path: '/admin/department/add', icon: <BusinessCenter /> },
    ]
    const onSubmit = async (
        values: IValues,
        resetForm: (nextState?: Partial<FormikState<IValues>> | undefined) => void) => {

        if (departmentSelected === null) {
            Swal.fire({
                title: 'Error',
                text: 'Seleccione un departamento valido',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
            return;
        };
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
        body.append('level', values.level);
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
                        text: 'Se ha registrado el usuario',
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
    const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <Layout>
            <DescripcionDeVista title={'Registrar usuario'} description={'Registra un nuevo usuario basico y selecciona el departamento correspondiente'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 4, md: 4, lg: 4 }} />
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
                            <Grid item xs={12} sm={6}>
                                <SelectCustom helpertext='' label='Nivel de acceso' name={'level'} value={values.level} onChange={handleChange}>
                                    <MenuItem value='0' disabled>Seleccione un nivel</MenuItem>
                                    {levels.map((lvl: number) => (
                                        <MenuItem key={lvl} value={String(lvl)}>{lvl}</MenuItem>
                                    ))}
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'row nowrap', alignItems: 'center' }}>

                                    <SelectCustom helpertext='' label='Departamento' value={departmentSelected ? departmentSelected.id : '0'} onChange={(e: SelectChangeEvent<any>) => {
                                        selectDepartment(e.target.value);
                                    }}>
                                        <MenuItem value='0' disabled>Seleccione un departamento</MenuItem>
                                        {departments && departments.map((dep: IDepartment) => (
                                            <MenuItem key={dep.id} value={dep.id}>{dep.description}</MenuItem>
                                        ))}
                                    </SelectCustom>
                                    <Link to={'/admin/department/add'}>
                                        <Tooltip title={'Ir a agregar departamento'}>
                                            <IconButton>
                                                <AddRounded />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </Box>
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