import { useContext, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import DomainAddIcon from '@mui/icons-material/DomainAdd';

import green from "@mui/material/colors/green";
import blue from "@mui/material/colors/blue";

import Swal from "sweetalert2";
import * as Yup from "yup";

import { Layout } from "../../../components/ui";
import { DescripcionDeVista } from "../../../components/ui/content";
import { IBuilding, Option } from "../../../interfaces";

import { OptionsList } from "../../../components/ui/options";
import { FormikValues, FormikState, Formik, Form, FormikErrors } from "formik";
import { baseUrl } from "../../../common";
import { TextFieldCustom, ButtonCustom, SelectCustom } from "../../../components/custom";
import { AuthContext } from "../../../context/auth";
import { errorArrayLaravelTransformToString } from "../../../helpers/functions";
import MenuItem from "@mui/material/MenuItem";
import { NumericFormat } from "react-number-format";

const initialValues = {
    description: '',
    size: '',
    aliquot: '',
    building_id: 'default'
}
interface IFormikValues {
    description: string;
    size: string;
    aliquot: string;
    building_id: string;
}

const validationSchema = Yup.object({
    description: Yup.string().required('Este campo es obligatorio'),
    size: Yup.string().matches(/^[\,\.0-9]+$/, 'Sólo se permiten números').required('Este campo es obligatorio').min(1, 'Minimo 1 caracter'),
    aliquot: Yup.string().matches(/^[\,\.0-9]+$/, 'Sólo se permiten números').required('Este campo es obligatorio').min(1, 'Minimo 1 caracter'),
    building_id: Yup.string().matches(/^[0-9]+$/, 'Edificio Invalido').required('Este campo es obligatorio'),
})

export const TiposDeUnidad = () => {
    const [buildings, setBuildings] = useState<IBuilding[] | null>(null);
    const options: Option[] = [
        { text: 'Registrar edificio', icon: <MapsHomeWorkIcon />, color: green[500], path: '/admin/edificios/registrar' },
        { text: 'Mapear edificio', icon: <DomainAddIcon />, color: blue[500], path: '/admin/edificios/mapear' },
    ]
    const { authState } = useContext(AuthContext)

    const getBuildings = async () => {
        const url = `${baseUrl}/buildings`;
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

                    setBuildings(data);
                    break;
                case 400:
                    const { message: messageFailed, errors } = await response.json();

                    let errorString = errorArrayLaravelTransformToString(errors);
                    console.log(messageFailed);
                    Swal.fire({
                        title: 'Error',
                        html: errorString,
                        icon: 'error',
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
            }
        } catch (error) {

        }
    }

    const onSubmit = async (values: FormikValues, resetForm: (nextState?: Partial<FormikState<IFormikValues>> | undefined) => void, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{
        description: string;
        size: string;
        aliquot: string;
        building_id: string;
    }>>) => {
        if (!values.description || !values.size || !values.aliquot) return;
        const body = new URLSearchParams();
        body.append('description', values.description);
        body.append('size', Number(values.size).toFixed(2));
        body.append('aliquot', Number(values.aliquot).toFixed(2));

        const url = `${baseUrl}/buildings/unit_types/${values.building_id}`;

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
                    const { message } = await response.json();
                    Swal.fire({
                        title: 'Exito',
                        text: message,
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    setFieldValue('building_id', 'default');
                    resetForm();
                    break;
                default:
                    const { errors } = await response.json();

                    const errorString = errorArrayLaravelTransformToString(errors);
                    Swal.fire({
                        title: 'Error',
                        html: errorString,
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

    useEffect(() => {
        getBuildings();
    }, [])
    return (
        <Layout>
            <DescripcionDeVista title='Tipos de unidad' description='Registrar los tipos de unidad dentro de un edificio' backPath="/admin/edificios" />
            <OptionsList options={options} breakpoints={{ xs: 6 }} />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setFieldValue }) => onSubmit(values, resetForm, setFieldValue)}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                            <Grid item xs={12}>
                                <SelectCustom
                                    error={errors.building_id && touched.building_id ? true : false}
                                    helpertext={errors.building_id && touched.building_id ? errors.building_id : ''}
                                    label='Edificio'
                                    name='building_id'
                                    value={values.building_id}
                                    onChange={handleChange}
                                    defaultValue={'default'}
                                >
                                    <MenuItem value={'default'} disabled>Seleccione un edificio</MenuItem>
                                    {buildings && buildings.map((building) => (<MenuItem key={building.id} value={String(building.id)}>{building.name}</MenuItem>))}
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldCustom name='description' label='Descripcion' value={values.description} onChange={handleChange} error={errors.description && touched.description ? true : false} helperText={errors.description && touched.description ? errors.description : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom name='size' type='number' label='Metraje' value={values.size} onChange={handleChange} error={errors.size && touched.size ? true : false} helperText={errors.size && touched.size ? errors.size : ''} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <NumericFormat
                                    label='Alicuota'
                                    name="aliquot"
                                    customInput={TextFieldCustom}
                                    onChange={handleChange}
                                    valueIsNumericString={true}
                                    thousandSeparator={true}
                                    value={values.aliquot}
                                    decimalScale={2}
                                    error={errors.aliquot && touched.aliquot ? true : false}
                                    helperText={errors.aliquot && touched.aliquot ? errors.aliquot : ''}
                                />
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