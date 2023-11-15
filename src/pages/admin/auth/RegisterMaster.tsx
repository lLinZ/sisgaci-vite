import { useContext } from 'react';

import Grid from '@mui/material/Grid';
import EngineeringRounded from '@mui/icons-material/EngineeringRounded';

import { green } from '@mui/material/colors';

import { Layout } from '../../../components/ui';
import { DescripcionDeVista } from '../../../components/ui/content';
import { ButtonCustom, TextFieldCustom } from '../../../components/custom';
import { Formik, Form, FormikState } from 'formik';
import { AuthContext } from '../../../context/auth';
import { baseUrl } from '../../../common';
import { OptionsList } from '../../../components/ui/options';
import { Option } from '../../../interfaces';
import Swal from 'sweetalert2';
import { errorArrayLaravelTransformToString } from '../../../helpers/functions';

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

export const RegisterMaster = () => {
    const { authState } = useContext(AuthContext)
    const options: Option[] = [
        { text: 'Listar proveedores', path: '/admin/proveedores', color: green[500], icon: <EngineeringRounded /> },
    ]
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
    return (
        <Layout>
            <DescripcionDeVista title={'Registrar Master'} description={'Registra un nuevo usuario de rol Master (acceso exclusivo para SISTEMAS)'} />
            <OptionsList options={options} breakpoints={{ xs: 12 }} />
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
                                <ButtonCustom type='submit'>Registrar</ButtonCustom>
                            </Grid>

                        </Grid>

                    </Form>
                )}
            </Formik>
        </Layout>
    )
}