import { useContext } from 'react';

import Grid from '@mui/material/Grid';

import { blue, green } from '@mui/material/colors';

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
import PersonAddRounded from '@mui/icons-material/PersonAddRounded';
import ListRounded from '@mui/icons-material/ListRounded';
import GroupRounded from '@mui/icons-material/GroupRounded';


/**
 * Valores iniciales de los campos del formulario Formik
 */
const initialValues: IValues = {
    description: '',
}
/**
 * Tipo de dato de los campos del formulario
 */
interface IValues {
    description: string;
}

export const RegisterDepartment = () => {
    const { authState } = useContext(AuthContext)

    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Listar departamentos', path: '/admin/departments', icon: <ListRounded /> },
        { text: 'Usuarios', path: '/admin/users', icon: <GroupRounded /> },
    ]

    /**
     * Funcion para registrar un nuevo departamento, esta funcion se ejecuta al enviar el formulario Formik
     * @param values Valores de los campos del formulario 
     * @param resetForm Funcion para reiniciar los campos del formulario
     */
    const onSubmit = async (
        values: IValues,
        resetForm: (nextState?: Partial<FormikState<IValues>> | undefined) => void) => {
        const url = `${baseUrl}/department`;
        const body = new URLSearchParams();
        body.append('description', values.description);
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
                        text: 'Se ha registrado el departamento',
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
            <DescripcionDeVista title={'Registrar Departamento'} description={'Registra un nuevo departamento ingresando los datos en el formulario y luego clickeando en "Registrar"!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ mb: 5 }}>
                            <Grid item xs={12}>
                                <TextFieldCustom value={values.description} label='Nombre del departamento' name={'description'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonCustom type='submit'>Registrar</ButtonCustom>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Layout >
    )
}