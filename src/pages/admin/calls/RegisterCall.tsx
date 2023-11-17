import { FormEvent, useContext, useState } from 'react';

import Grid from '@mui/material/Grid';

import { blue, green } from '@mui/material/colors';

import { Layout } from '../../../components/ui';
import { DescripcionDeVista } from '../../../components/ui/content';
import { ButtonCustom, SelectCustom, TextFieldCustom, TextFieldWithIconCustom } from '../../../components/custom';
import { Formik, Form, FormikState } from 'formik';
import { AuthContext } from '../../../context/auth';
import { baseUrl, countriesArray } from '../../../common';
import { OptionsList } from '../../../components/ui/options';
import { ICall, Option } from '../../../interfaces';
import Swal from 'sweetalert2';
import { errorArrayLaravelTransformToString } from '../../../helpers/functions';
import ListRounded from '@mui/icons-material/ListRounded';
import { Autocomplete, Box, MenuItem } from '@mui/material';
import { NumericFormat } from 'react-number-format';

const initialValues: IValues = {
    phone: '',
    first_name: '',
    lastname: '',
    origin: '0',
    property: '',
    call_date: String(new Date()),
    call_purpose: '',
    feedback: '',
    created_at: '',
    updated_at: ''
}
type IValues = Partial<ICall> & {
    phone: string;
    first_name: string;
    lastname: string;
    middle_name?: string;
    second_lastname?: string;
    document?: string;
    address?: string;
}

export const RegisterCall = () => {
    const [search, setSearch] = useState<string>('');
    const [countryCode, setCountryCode] = useState<string | null>(null);
    const [countrySelected, setCountrySelected] = useState<string | null>(null);
    const [clientSearch, setClientSearch] = useState<string | null>(null);
    const { authState } = useContext(AuthContext)
    const options: Option[] = [
        { text: 'Listar llamadas', path: '/admin/calls', color: green[500], icon: <ListRounded /> },
    ]
    const onSubmit = async (
        values: IValues,
        resetForm: (nextState?: Partial<FormikState<IValues>> | undefined) => void) => {
        const url = `${baseUrl}/department`;
        const body = new URLSearchParams();
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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleReset = () => {
        setSearch('');
    };
    return (
        <Layout>
            <DescripcionDeVista title={'Registrar llamada'} description={'Registra una nueva llamada en el sistema'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            <Formik
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)} initialValues={initialValues}            >
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
                                            setCountrySelected(newValue ? newValue.label : null);
                                        }}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    srcSet={`https://flagcdn.com/w40/${option.alpha2.toLowerCase()}.png 2x`}
                                                    src={`https://flagcdn.com/w20/${option.alpha2.toLowerCase()}.png`}
                                                    alt="Bandera de pais"
                                                />
                                                {option.label}
                                            </Box>
                                        )}
                                        sx={{ width: 250, mr: 0.5 }}
                                        renderInput={(params) => <TextFieldCustom {...params} label="Pais" />}
                                    />

                                    <NumericFormat
                                        label='Telefono'
                                        name="phone"
                                        customInput={TextFieldCustom}
                                        onChange={handleChange}
                                        valueIsNumericString={true}
                                        thousandSeparator={true}
                                        value={values.phone}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        error={errors.phone && touched.phone ? true : false}
                                        helperText={errors.phone && touched.phone ? errors.phone : ''}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectCustom value={values.origin} name='origin' label="Origen" helpertext={''} onChange={handleChange}>
                                    <MenuItem value='0' disabled>Seleccione un origen</MenuItem>
                                    <MenuItem value='1' >Instagram</MenuItem>
                                    <MenuItem value='2' >Correo</MenuItem>
                                    <MenuItem value='3' >Facebook</MenuItem>
                                    <MenuItem value='4' >Twitter</MenuItem>
                                </SelectCustom>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Layout >
    )
}