import { Layout } from "../../../components/ui";
import { DescripcionDeVista } from "../../../components/ui/content";
import { Option } from "../../../interfaces";
import green from "@mui/material/colors/green";
import blue from "@mui/material/colors/blue";
import { OptionsList } from "../../../components/ui/options";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import { Form, Formik, FormikState, FormikValues } from "formik";
import { ButtonCustom, TextFieldCustom } from "../../../components/custom";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { baseUrl } from "../../../common";

const initialValues = {
    name: '',
    floor_qty: '',
    units_qty: ''
}
interface IFormikValues {
    name: string;
    floor_qty: string;
    units_qty: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Este campo es obligatorio'),
    floor_qty: Yup.string().matches(/^[0-9]+$/, 'Sólo se permiten números').required('Este campo es obligatorio').min(1, 'Minimo 1 caracter'),
    units_qty: Yup.string().matches(/^[0-9]+$/, 'Sólo se permiten números').required('Este campo es obligatorio').min(1, 'Minimo 1 caracter'),
})

export const RegistrarEdificio = () => {

    const options: Option[] = [
        { text: 'Mapear edificio', icon: <DomainAddIcon />, color: green[500], path: '/admin/edificios/mapear' },
        { text: 'Tipos de unidades', icon: <MapsHomeWorkIcon />, color: blue[500], path: '/admin/edificios/tipos/unidad' },
    ]

    const { authState } = useContext(AuthContext);

    const onSubmit = async (values: FormikValues, resetForm: (nextState?: Partial<FormikState<IFormikValues>> | undefined) => void) => {
        if (!values.name || !values.floor_qty || !values.units_qty) return;
        const body = new URLSearchParams();
        body.append('name', values.name);
        body.append('floor_qty', values.floor_qty);
        body.append('units_qty', values.units_qty);

        const url = `${baseUrl}/buildings`;

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
            body
        };

        try {
            const response = await fetch(url, options)
            switch (response.status) {
                case 200:
                    const { message, data } = await response.json();
                    console.log('Edificio registrado', data);
                    Swal.fire({
                        title: 'Exito',
                        text: message,
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    resetForm();
                    break;
                default:
                    const { message: messageError } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        text: messageError,
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
            }

        } catch (error) {
            console.log({ error });
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }
    return (
        <Layout>
            <DescripcionDeVista title='Registrar edificio' description='Seleccione una opcion para añadir edificios usando diferentes métodos o registrar tipos de unidades de un edificio' backPath="/admin/edificios" />
            <OptionsList options={options} breakpoints={{ xs: 6 }} />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                            <Grid item xs={12}>
                                <TextFieldCustom name='name' label='Nombre' value={values.name} onChange={handleChange} error={errors.name && touched.name ? true : false} helperText={errors.name && touched.name ? errors.name : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom name='floor_qty' type='number' label='Cantidad de pisos' value={values.floor_qty} onChange={handleChange} error={errors.floor_qty && touched.floor_qty ? true : false} helperText={errors.floor_qty && touched.floor_qty ? errors.floor_qty : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom name='units_qty' type='number' label='Cantidad de unidades totales' value={values.units_qty} onChange={handleChange} error={errors.units_qty && touched.units_qty ? true : false} helperText={errors.units_qty && touched.units_qty ? errors.units_qty : ''} />
                            </Grid>
                            <Grid item xs={12} >
                                <ButtonCustom type='submit'>Registrar</ButtonCustom>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}