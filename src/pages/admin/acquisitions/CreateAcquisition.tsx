import { useContext, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';

import { blue, green } from '@mui/material/colors';

import { Layout } from '../../../components/ui';
import { DescripcionDeVista } from '../../../components/ui/content';
import { ButtonCustom, InputFileCustom, SelectCustom, TextFieldCustom } from '../../../components/custom';
import { Formik, Form, FormikState } from 'formik';
import { AuthContext } from '../../../context/auth';
import { baseUrl } from '../../../common';
import { OptionsList } from '../../../components/ui/options';
import { IPropertyTransactionType, IPropertyType, Option } from '../../../interfaces';
import Swal from 'sweetalert2';
import { errorArrayLaravelTransformToString } from '../../../helpers/functions';
import ListRounded from '@mui/icons-material/ListRounded';
import { NumericFormat } from 'react-number-format';
import { MenuItem } from '@mui/material';
import { SettingsRounded } from '@mui/icons-material';

const initialValues: IValues = {
    name: '',
    price: '',
    short_address: '',
    web_description: '',
    property_transaction_type: '0',
    property_type: '0',
}
interface IValues {
    name: string;
    price: string;
    short_address: string;
    web_description: string;
    property_transaction_type: string;
    property_type: string;
}

export const CreateAcquisition = () => {
    const { authState } = useContext(AuthContext)
    const [propertyTypes, setPropertyTypes] = useState<IPropertyType[] | null>(null);
    const [propertyTransactionTypes, setPropertyTransactionTypes] = useState<IPropertyTransactionType[] | null>(null);
    const [image, setImage] = useState<File | null>(null);

    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Listar captaciones', path: '/admin/acquisitions', color: green[500], icon: <ListRounded /> },
        { text: 'Configuracion de propiedades', path: '/admin/properties', color: blue[500], icon: <SettingsRounded /> },
    ]


    /**
     * Obtener Tipos de propiedad
     * @returns void
     */
    const getPropertyTypes = async () => {
        const url = `${baseUrl}/property_type`
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
                    setPropertyTypes(data);
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error'
                    })
                    break;
                case 500:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error interno en el servidor',
                        icon: 'error'
                    })
                    break;

                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'La ruta no existe',
                        icon: 'error'
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado en el servidor',
                        icon: 'error'
                    })
                    break;
            }
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
            })
        }
    }

    /**
     * Obtener Tipos de transaccion de propiedades
     * @returns void
     */
    const getPropertyTransactionTypes = async () => {
        const url = `${baseUrl}/property_transaction_type`
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
                    setPropertyTransactionTypes(data);
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error'
                    })
                    break;
                case 500:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error interno en el servidor',
                        icon: 'error'
                    })
                    break;

                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'La ruta no existe',
                        icon: 'error'
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado en el servidor',
                        icon: 'error'
                    })
                    break;
            }
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
            })
        }
    }

    /**
     * Funcion para registrar la nueva Captacion, se ejecuta al enviar el formulario.
     * @param values Valores del formulario Formik
     * @param resetForm Funcion para reiniciar el formulario
     */
    const onSubmit = async (
        values: IValues,
        resetForm: (nextState?: Partial<FormikState<IValues>> | undefined) => void) => {
        const url = `${baseUrl}/acquisition`;
        const body = new FormData();
        body.append('web_description', values.web_description);
        body.append('name', values.name);
        body.append('price', values.price.replaceAll(',', ''));
        body.append('short_address', values.short_address);
        body.append('image', image ? image : '');
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
                    console.log(errors)
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
                    const { errors: errores } = await response.json();
                    console.log({ errores }, response.status)
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
        getPropertyTransactionTypes();
        getPropertyTypes();
    }, []);
    return (
        <Layout>
            <DescripcionDeVista title={'Registrar captacion'} description={'Registra una nueva captacion ingresando los datos en el formulario y luego clickeando en "Registrar"!'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ mb: 5 }}>
                            <Grid item xs={12} sm={6} >
                                <TextFieldCustom value={values.name} label='Nombre del inmueble' name={'name'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <NumericFormat
                                    label='Precio'
                                    name="price"
                                    customInput={TextFieldCustom}
                                    onChange={handleChange}
                                    valueIsNumericString={true}
                                    thousandSeparator={true}
                                    value={values.price}
                                    allowLeadingZeros={false}
                                    decimalScale={2}
                                    prefix='$'
                                    fixedDecimalScale={true}
                                    error={errors.price && touched.price ? true : false}
                                    helperText={errors.price && touched.price ? errors.price : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCustom helpertext={''} label={'Tipo de transaccion'} value={values.property_transaction_type} name={'property_transaction_type'} onChange={handleChange}>
                                    <MenuItem value='0' disabled>
                                        Seleccione un tipo de transaccion
                                    </MenuItem>
                                    {propertyTransactionTypes && propertyTransactionTypes.map((ptt) => (
                                        <MenuItem value={ptt.id} key={ptt.id}>
                                            {ptt.description}
                                        </MenuItem>
                                    ))}
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCustom helpertext={''} label={'Tipo de propiedad'} value={values.property_type} name={'property_type'} onChange={handleChange}>
                                    <MenuItem value='0' disabled>
                                        Seleccione un tipo de propiedad
                                    </MenuItem>
                                    {propertyTypes && propertyTypes.map((pt) => (
                                        <MenuItem value={pt.id} key={pt.id}>
                                            {pt.description}
                                        </MenuItem>
                                    ))}
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldCustom value={values.short_address} label='Direccion corta' name={'short_address'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <InputFileCustom {...{ setImage, image }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldCustom value={values.web_description} multiline label='Descripcion web' name={'web_description'} onChange={handleChange} />
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
