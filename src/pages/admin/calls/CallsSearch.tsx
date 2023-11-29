import { CallRounded, GroupRounded, LockRounded } from '@mui/icons-material';
import { Autocomplete, Box, CircularProgress, Grid, TextField } from '@mui/material';
import { green, blue } from '@mui/material/colors';
import { Layout } from '../../../components/ui';
import { DescripcionDeVista, NoContentFound } from '../../../components/ui/content';
import { OptionsList } from '../../../components/ui/options';
import { useGet } from '../../../http';
import { ICall, Option } from '../../../interfaces';
import { useContext, useState } from 'react';
import { baseUrl, countriesArray } from '../../../common';
import { AuthContext } from '../../../context/auth';
import { ButtonCustom, TextFieldCustom, TypographyCustom } from '../../../components/custom';
import { NumericFormat } from 'react-number-format';
import { Form, Formik, FormikState, FormikValues } from 'formik';
import Swal from 'sweetalert2';
import { ClientItem } from '../../../components/admin/clients';
import { CallDetails, CallItem } from '../../../components/admin/calls';
import { useNavigate } from 'react-router-dom';

const title = 'Llamadas';
const initialValues = {
    phone: '',
    countryCode: '(+58) Venezuela, Bolivarian Republic of Venezuela',
};
export const CallsSearch = () => {
    const { authState } = useContext(AuthContext);
    const [blocked, setBlocked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [call, setCall] = useState<ICall | null>(null);
    const [countryCode, setCountryCode] = useState<string>('+58');
    const options: Option[] = [
        { text: 'Agregar llamada', path: '/admin/calls/add', color: green[500], icon: <CallRounded /> },
        { text: 'Clientes', path: '/admin/clients', color: blue[500], icon: <GroupRounded /> },
    ]
    const router = useNavigate()
    const onSubmit = async (values: { phone: string; countryCode: string; }, resetForm: (nextState?: Partial<FormikState<{ phone: string; countryCode: string; }>> | undefined) => void) => {
        setCall(null);
        setLoading(true);
        setBlocked(false);
        let errors = [];
        if (!values.phone) {
            errors.push('El telefono es obligatorio');
        }
        if (!countryCode) {
            errors.push('El codigo de pais es obligatorio');
        }
        if (errors.length > 0) {
            let errorString = '';
            errors.map((e) => errorString += `- ${e} </br>`)
            Swal.fire({
                title: 'Error',
                html: errorString,
                icon: 'error',
            })
            setLoading(false);
            return;
        }
        const phoneNumber = `${countryCode}${values.phone}`;
        const url = `${baseUrl}/call/phone/${phoneNumber}`
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            }
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    console.log({ data })
                    setCall(data);
                    setBlocked(true);
                    // resetForm();
                    break;
                case 404:
                    setBlocked(true);
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado en el servidor, informe a sistemas',
                        icon: 'error',
                    })
                    break;
            }
        } catch (error) {
            console.error({ error });
            setCall(null);
            setBlocked(false);
        } finally {
            setLoading(false);
        }
    }
    const isOptionEqualToValue = (option: any, value: any) => {
        return option.code === value.code && option.alpha2 === value.alpha2;
    };
    return (
        <Layout>
            <DescripcionDeVista title={title} description={'Busca un numero de telefono y haz seguimiento de cliente aqui.'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <Form>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    fullWidth
                                    isOptionEqualToValue={isOptionEqualToValue}
                                    disablePortal
                                    options={countriesArray}
                                    onChange={(event: any, newValue: any) => {
                                        setCountryCode(newValue ? newValue.code : null);
                                    }}
                                    getOptionLabel={(option: any) => option.label}
                                    defaultValue={{ code: '+58', alpha2: 'VE', label: '(+58) Venezuela, Bolivarian Republic of Venezuela' }}
                                    renderOption={(props: any, option: any) => (
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
                                    renderInput={(params: any) => <TextFieldCustom {...params} label='Pais' name='countryCode' />}
                                />
                            </Grid>
                            <Grid item xs={6}>
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

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonCustom type='submit'>Buscar</ButtonCustom>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            {blocked && call &&
                <Box sx={{ mt: 2, }}>
                    <Box sx={{ width: '100%', borderRadius: 5, boxShadow: '0 2px 32px rgba(0,0,0,0.2)', padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexFlow: 'column wrap' }}>
                        <LockRounded />
                        <TypographyCustom sx={{ mb: 1 }}>Para ver el contenido de la llamada escriba un comentario</TypographyCustom>
                        <Formik
                            initialValues={{ feedback: '' }}
                            onSubmit={async (values, { resetForm }) => {
                                setLoading(true);
                                const url = `${baseUrl}/call/comment/${call?.id}`
                                const body = new URLSearchParams();
                                body.append('feedback', values.feedback);
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
                                            setBlocked(false);
                                            break;
                                        case 400:
                                            break;
                                        case 404:
                                            break;
                                        case 500:
                                            break;
                                        default:
                                            break;
                                    }
                                } catch (error) {

                                } finally {
                                    setLoading(false);
                                }
                            }}
                        >
                            {({ values, handleChange, handleSubmit }) => (
                                <Form onSubmit={handleSubmit} style={{ width: '80%' }}>
                                    <Grid container spacing={1} sx={{ width: '100%' }}>
                                        <Grid item xs={12}>
                                            <TextFieldCustom multiline label='Comentario' name='feedback' value={values.feedback} onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ButtonCustom type='submit'>Enviar</ButtonCustom>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            }
            {!blocked && call && (
                <CallDetails id={call ? call.id : 0} />
            )}
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && blocked && !call &&
                <NoContentFound title={'No hubo resultados'} text={`No hay ${title.toLowerCase()} disponibles`}>
                    <TypographyCustom>Si quieres registrar el cliente y la llamada, dale click al boton de abajo!</TypographyCustom>
                    <ButtonCustom onClick={() => {
                        router('/admin/calls/add')
                    }}>Registrar</ButtonCustom>
                </NoContentFound>
            }
        </Layout>
    )
}

const styles = {
    loaderBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        mt: 2
    }
}