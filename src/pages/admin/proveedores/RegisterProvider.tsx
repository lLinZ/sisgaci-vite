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

const initialValues = {
    name: '',
    rif: '',
}

export const RegisterProvider = () => {
    const { authState } = useContext(AuthContext)
    const options: Option[] = [
        { text: 'Listar proveedores', path: '/admin/proveedores', color: green[500], icon: <EngineeringRounded /> },
    ]
    const onSubmit = async (values: { name: string; rif: string; }, resetForm: (nextState?: Partial<FormikState<{ name: string; rif: string; }>> | undefined) => void) => {
        const url = `${baseUrl}/provider`;
        const body = new URLSearchParams();
        body.append('name', values.name);
        body.append('rif', values.rif);
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
                        text: 'Se ha registrado el proveedor',
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
            <DescripcionDeVista title={'Registrar Proveedor'} description={'Registra un nuevo proveedor'} />
            <OptionsList options={options} breakpoints={{ xs: 12 }} />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.name} label='Nombre' name={'name'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom value={values.rif} label='RIF' name={'rif'} onChange={handleChange} />
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