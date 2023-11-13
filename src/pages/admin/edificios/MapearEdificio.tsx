import { useContext } from "react";
import { Layout } from "../../../components/ui";
import { DescripcionDeVista } from "../../../components/ui/content";
import { Option } from "../../../interfaces";
import green from "@mui/material/colors/green";
import blue from "@mui/material/colors/blue";
import { OptionsList } from "../../../components/ui/options";
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import InfoRounded from '@mui/icons-material/InfoRounded';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import { Grid } from "@mui/material";
import { FormikValues, FormikState, Formik, Form } from "formik";
import Swal from "sweetalert2";
import { baseUrl } from "../../../common";
import { TextFieldCustom, ButtonCustom, RadioGroupCustom, TypographyCustom } from "../../../components/custom";
import { AuthContext } from "../../../context/auth";
import * as Yup from "yup";
interface IFormikValues {
    name: string;
    floor_qty: string;
    units_qty: string;
    naming_type: string;
    prefix: string;
    units_per_floor: string;
}
const initialValues = {
    name: '',
    floor_qty: '',
    units_qty: '',
    naming_type: '',
    prefix: '',
    units_per_floor: ''
}
const validationSchema = Yup.object({
    name: Yup.string().required('Este campo es obligatorio'),
    floor_qty: Yup.string().matches(/^[0-9]+$/, 'Sólo se permiten números').required('Este campo es obligatorio').min(1, 'Minimo 1 caracter'),
    units_qty: Yup.string().matches(/^[0-9]+$/, 'Sólo se permiten números').required('Este campo es obligatorio').min(1, 'Minimo 1 caracter'),
    units_per_floor: Yup.string().matches(/^[0-9]+$/, 'Sólo se permiten números').required('Este campo es obligatorio').min(1, 'Minimo 1 caracter'),
    prefix: Yup.string().required('Este campo es obligatorio').min(1, 'Minimo 1 caracter'),
    naming_type: Yup.string().matches(/(numerico)|(alfabetico)|(alfanumerico)/, 'Opcion invalida').required('Este campo es obligatorio').min(1, 'Minimo 1 caracter'),
})

export const MapearEdificio = () => {

    const options: Option[] = [
        { text: 'Registrar edificio', icon: <DomainAddIcon />, color: green[500], path: '/admin/edificios/registrar' },
        { text: 'Tipos de unidades', icon: <MapsHomeWorkIcon />, color: blue[500], path: '/admin/edificios/tipos/unidad' },
    ]
    const { authState } = useContext(AuthContext)
    const onSubmit = async (values: FormikValues, resetForm: (nextState?: Partial<FormikState<IFormikValues>> | undefined) => void) => {
        if (!values.name || !values.floor_qty || !values.units_qty) return;
        const body = new URLSearchParams();
        body.append('name', values.name);
        body.append('floor_qty', values.floor_qty);
        body.append('units_qty', values.units_qty);
        body.append('units_per_floor', values.units_per_floor);
        body.append('naming_type', values.naming_type);
        body.append('prefix', values.prefix);

        const url = `${baseUrl}/buildings/mapping`;

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
            <DescripcionDeVista title='Mapear edificio' description='Mapear edificio, crea el edificio y sus unidades al definir las caracteristicas del edificio' backPath="/admin/edificios" />
            <OptionsList options={options} breakpoints={{ xs: 6 }} />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} display='flex' flexDirection='row' justifyContent='center' alignItems='start' sx={{ mb: 2 }}>
                            <Grid item xs={12}>
                                <TextFieldCustom name='name' label='Nombre del edificio' value={values.name} onChange={handleChange} error={errors.name && touched.name ? true : false} helperText={errors.name && touched.name ? errors.name : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom name='floor_qty' type='number' label='Cantidad de pisos' value={values.floor_qty} onChange={handleChange} error={errors.floor_qty && touched.floor_qty ? true : false} helperText={errors.floor_qty && touched.floor_qty ? errors.floor_qty : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom name='units_qty' type='number' label='Cantidad de unidades totales' value={values.units_qty} onChange={handleChange} error={errors.units_qty && touched.units_qty ? true : false} helperText={errors.units_qty && touched.units_qty ? errors.units_qty : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom name='units_per_floor' type='number' label='Unidades por piso' value={values.units_per_floor} onChange={handleChange} error={errors.units_per_floor && touched.units_per_floor ? true : false} helperText={errors.units_per_floor && touched.units_per_floor ? errors.units_per_floor : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom name='prefix' label='Prefijo' value={values.prefix} onChange={handleChange} error={errors.prefix && touched.prefix ? true : false} helperText={errors.prefix && touched.prefix ? errors.prefix : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <RadioGroupCustom label='Asignacion de nombre de unidades' error={errors.naming_type && touched.naming_type ? true : false} helpertext={errors.naming_type && touched.naming_type ? errors.naming_type : ''} defaultvalue={'alfabetico'} name='naming_type' onChange={handleChange} options={[
                                    { label: 'Alfabetico', value: 'alfabetico' },
                                    { label: 'Numerico', value: 'numerico' },
                                    { label: 'Alfanumerico', value: 'alfanumerico' },
                                ]} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TypographyCustom color={'text.primary'} fontWeight={'bold'}>Previsualizacion del nombre de las unidades</TypographyCustom>
                                <TypographyCustom color={'text.secondary'} variant={'body2'} sx={{ textAlign: 'justify' }}><InfoRounded sx={{ color: blue[500] }} />
                                    Primero se mostrara el <strong>prefijo</strong>, luego el <strong>numero del piso</strong> y de ultimo el <strong>numero o letra de la unidad</strong> (Por ejemplo: UNIDAD-1-A o Apto-5-1 o UNI-1-B2).
                                    El nombre de las unidades a generar tomaran estas opciones para ser nombradas. En caso de que hayan pisos que tengan una cantidad de unidades diferentes,
                                    se deberan modificar directamente, pero se recomienda mapear primero y luego realizar las modificaciones necesarias.</TypographyCustom>
                                <TypographyCustom fontWeight='bold' sx={{ p: 1 }}>
                                    {`${values.prefix ? values.prefix : 'PREFIJO'}-(#PISO)-${values.naming_type === 'numerico' ? 1 : values.naming_type === 'alfabetico' ? 'A' : 'A1'}`}
                                </TypographyCustom>
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