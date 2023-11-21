import { Dispatch, FC, FormEvent, SetStateAction, useContext, useState } from 'react';

import Grid from '@mui/material/Grid';

import { green } from '@mui/material/colors';

import { Layout } from '../../../components/ui';
import { DescripcionDeVista } from '../../../components/ui/content';
import { ButtonCustom, SelectCustom, TextFieldCustom, TextFieldWithIconCustom, TypographyCustom } from '../../../components/custom';
import { Formik, Form, FormikState } from 'formik';
import { AuthContext } from '../../../context/auth';
import { baseUrl, countriesArray } from '../../../common';
import { OptionsList } from '../../../components/ui/options';
import { ICall, IClient, Option } from '../../../interfaces';
import Swal from 'sweetalert2';
import { errorArrayLaravelTransformToString } from '../../../helpers/functions';
import ListRounded from '@mui/icons-material/ListRounded';
import { Autocomplete, Box, Dialog, IconButton, MenuItem, Toolbar } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { CloseRounded } from '@mui/icons-material';
import { CalendarCustom } from '../../../components/custom/CalendarCustom';

const initialValues: IValues = {
    marital_status: '0',
    nationality: '0',
    zone: '',
    phone: '',
    first_name: '',
    middle_name: '',
    lastname: '',
    second_lastname: '',
    origin: '0',
    property: '',
    call_date: String(new Date()),
    call_purpose: '0',
    feedback: '',
    created_at: '',
    updated_at: ''
}
type IValues = Partial<ICall> & {
    marital_status: string;
    nationality: string;
    phone: string;
    first_name: string;
    lastname: string;
    middle_name?: string;
    second_lastname?: string;
    document?: string;
}

export const RegisterCall = () => {
    const [countryCode, setCountryCode] = useState<string | null>(null);
    const [birthday, setBirthday] = useState<string>('');
    const { authState } = useContext(AuthContext)
    const options: Option[] = [
        { text: 'Listar llamadas', path: '/admin/calls', color: green[500], icon: <ListRounded /> },
    ]
    const onSubmit = async (
        values: IValues,
        resetForm: (nextState?: Partial<FormikState<IValues>> | undefined) => void) => {
        let errors = [];
        if (!countryCode) {
            errors.push('Debe seleccionar un codigo de pais');
        };
        if (!values.phone) {
            errors.push('El campo Telefono es obligatorio');
        };
        if (!values.first_name) {
            errors.push('El campo primer nombre es obligatorio');
        };
        if (!values.lastname) {
            errors.push('El campo primer apellido es obligatorio');
        };
        if (!values.origin) {
            errors.push('El campo origen es obligatorio');
        };
        if (!values.zone) {
            errors.push('El campo zona es obligatorio');
        };
        if (!values.call_purpose) {
            errors.push('El campo motivo es obligatorio');
        };
        if (!values.feedback) {
            errors.push('El campo comentario es obligatorio');
        };
        if (errors.length > 0) {
            let errorString = '';
            errors.map((e: string) => errorString += `- ${e} </br>`);
            Swal.fire({
                title: 'Error',
                html: errorString,
                icon: 'error',
            });
            return;
        }
        const url = `${baseUrl}/call`;
        const body = new URLSearchParams();
        body.append('phone', countryCode
            ? `${countryCode}${String(values.phone).charAt(0) === '0' ? String(values.phone).slice(1) : String(values.phone)}`
            : '');
        body.append('first_name', String(values.first_name));
        body.append('middle_name', String(values.middle_name));
        body.append('lastname', String(values.lastname));
        body.append('second_lastname', String(values.second_lastname));
        body.append('document', String(values.document));
        body.append('origin', String(values.origin));
        body.append('zone', String(values.zone));
        body.append('call_purpose', String(values.call_purpose));
        body.append('feedback', String(values.feedback));
        body.append('birthday', String(birthday));
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
                        text: 'Se ha registrado la llamada',
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <Layout>
            <DescripcionDeVista title={'Registrar llamada'} description={'Registra una nueva llamada en el sistema'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            <Formik
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                initialValues={initialValues}
                validateOnBlur={false}
                validateOnChange={false}
                validateOnMount={false}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ mb: 5 }}>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex' }}>
                                    <Autocomplete
                                        disablePortal
                                        options={countriesArray}
                                        onChange={(event: any, newValue: any) => {
                                            setCountryCode(newValue ? newValue.code : null);
                                        }}
                                        renderOption={(props, option) => (
                                            <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading='lazy'
                                                    width='20'
                                                    srcSet={`https://flagcdn.com/w40/${option.alpha2.toLowerCase()}.png 2x`}
                                                    src={`https://flagcdn.com/w20/${option.alpha2.toLowerCase()}.png`}
                                                    alt='Bandera de pais'
                                                />
                                                {option.label}
                                            </Box>
                                        )}
                                        sx={{ width: 250, mr: 0.5 }}
                                        renderInput={(params) => <TextFieldCustom {...params} label='Pais' />}
                                    />

                                    <NumericFormat
                                        label='Telefono'
                                        name='phone'
                                        customInput={TextFieldCustom}
                                        onChange={handleChange}
                                        allowNegative={false}
                                        allowLeadingZeros={false}
                                        valueIsNumericString={false}
                                        thousandSeparator={false}
                                        decimalScale={0}
                                        value={values.phone}
                                        fixedDecimalScale={false}
                                        error={errors.phone && touched.phone ? true : false}
                                        helperText={errors.phone && touched.phone ? errors.phone : ''}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom label={'Primer Nombre'} value={values.first_name} name='first_name' onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom label={'Segundo Nombre'} value={values.middle_name} name='middle_name' onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom label={'Primer Apellido'} value={values.lastname} name='lastname' onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom label={'Segundo Apellido'} value={values.second_lastname} name='second_lastname' onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCustom value={values.nationality} name='nationality' label='Nacionalidad' helpertext={''} onChange={handleChange}>
                                    <MenuItem value='0' disabled>Seleccione una nacionalidad</MenuItem>
                                    <MenuItem value='Venezolano'>Venezolano(a)</MenuItem>
                                    <MenuItem value='Extranjero'>Extranjero(a)</MenuItem>
                                    <MenuItem value='Juridico'>Juridico</MenuItem>
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <NumericFormat
                                    label='Cedula'
                                    name='document'
                                    customInput={TextFieldCustom}
                                    onChange={handleChange}
                                    allowNegative={false}
                                    allowLeadingZeros={false}
                                    valueIsNumericString={false}
                                    thousandSeparator={false}
                                    decimalScale={0}
                                    value={values.document}
                                    fixedDecimalScale={false}
                                    error={errors.document && touched.document ? true : false}
                                    helperText={errors.document && touched.document ? errors.document : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CalendarCustom setValue={setBirthday} rest={{ disableFuture: true, label: 'Fecha de nacimiento' }} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCustom value={values.marital_status} name='marital_status' label='Motivo de llamada' helpertext={''} onChange={handleChange}>
                                    <MenuItem value='0' disabled>Seleccione un estado civil</MenuItem>
                                    <MenuItem value='Soltero'>Soltero(a)</MenuItem>
                                    <MenuItem value='Divorciado'>Divorciado(a)</MenuItem>
                                    <MenuItem value='Concubino'>Concubino(a)</MenuItem>
                                    <MenuItem value='Viudo'>Viudo(a)</MenuItem>
                                    <MenuItem value='Juridica'>Juridica</MenuItem>
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCustom value={values.origin} name='origin' label='Origen' helpertext={''} onChange={handleChange}>
                                    <MenuItem value='0' disabled>Seleccione un origen</MenuItem>
                                    <MenuItem value='Instagram'>Instagram</MenuItem>
                                    <MenuItem value='Correo'>Correo</MenuItem>
                                    <MenuItem value='Facebook'>Facebook</MenuItem>
                                    <MenuItem value='Twitter'>Twitter</MenuItem>
                                    <MenuItem value='Telefono'>Telefono</MenuItem>
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCustom value={values.zone} name='zone' label='Zona' helpertext={''} onChange={handleChange}>
                                    <MenuItem value='0' disabled>Seleccione una zona</MenuItem>
                                    <MenuItem value='Norte'>Norte</MenuItem>
                                    <MenuItem value='Sur'>Sur</MenuItem>
                                    <MenuItem value='Este'>Este</MenuItem>
                                    <MenuItem value='Oeste'>Oeste</MenuItem>
                                </SelectCustom>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <SelectCustom value={values.call_purpose} name='call_purpose' label='Motivo de llamada' helpertext={''} onChange={handleChange}>
                                    <MenuItem value='0' disabled>Seleccione una motivo</MenuItem>
                                    <MenuItem value='Alquiler'>Alquiler</MenuItem>
                                    <MenuItem value='Venta'>Venta</MenuItem>
                                    <MenuItem value='Compra'>Compra</MenuItem>
                                    <MenuItem value='Publicidad'>Publicidad</MenuItem>
                                </SelectCustom>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextFieldCustom multiline label='Comentario' value={values.feedback} name={'feedback'} onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonCustom type='submit'>Registrar llamada</ButtonCustom>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Layout >
    )
}