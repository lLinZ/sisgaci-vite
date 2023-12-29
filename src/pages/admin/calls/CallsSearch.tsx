import { useContext, useState } from 'react';
import GroupRounded from '@mui/icons-material/GroupRounded';
import CallRounded from '@mui/icons-material/CallRounded';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { green, blue } from '@mui/material/colors';
import { Layout } from '../../../components/ui';
import { DescripcionDeVista, NoContentFound } from '../../../components/ui/content';
import { OptionsList } from '../../../components/ui/options';
import { ICall, Option } from '../../../interfaces';
import { baseUrl, countriesArray } from '../../../common';
import { AuthContext } from '../../../context/auth';
import { ButtonCustom, TextFieldCustom, TypographyCustom } from '../../../components/custom';
import { NumericFormat } from 'react-number-format';
import { Form, Formik, FormikState } from 'formik';
import { BlockedCall } from '../../../components/admin/calls';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const title = 'Llamadas';

/**
 * Valores iniciales
 */
const initialValues = {
    phone: '',
    countryCode: '(+58) Venezuela, Bolivarian Republic of Venezuela',
};
export const CallsSearch = () => {
    const { authState } = useContext(AuthContext);
    const [blocked, setBlocked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [calls, setCalls] = useState<ICall[] | null>(null);
    const [countryCode, setCountryCode] = useState<string>('+58');

    const options: Option[] = [
        { text: 'Agregar llamada', path: '/admin/calls/add', color: green[500], icon: <CallRounded /> },
        { text: 'Clientes', path: '/admin/clients', color: blue[500], icon: <GroupRounded /> },
    ]
    /**
     * Hook para navegar con react router dom
     */
    const router = useNavigate()

    /**
     * Funcion para buscar una llamada registrada
     * @param values Valores del formulario Formik
     * @param resetForm Funcion para reiniciar los datos del formulario
     * @returns void
     */
    const onSubmit = async (values: { phone: string; countryCode: string; }, resetForm: (nextState?: Partial<FormikState<{ phone: string; countryCode: string; }>> | undefined) => void) => {
        setCalls(null);
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
        const url = `${baseUrl}/call/phone/${phoneNumber}/${values.phone}`
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
                    setCalls(data);
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
            setCalls(null);
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
            {calls &&
                calls.length > 1 && calls.map((call) => (<BlockedCall key={call.id} {...{ call, setLoading }} />))
            }
            {loading && <Box sx={styles.loaderBox}><CircularProgress /></Box>}
            {!loading && blocked && !calls &&
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



/**
 * Estilos de los componentes MUI
 */
const styles = {
    loaderBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        mt: 2
    }
}