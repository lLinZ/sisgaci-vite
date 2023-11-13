import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import SwapHorizRounded from '@mui/icons-material/SwapHorizRounded'
import AttachmentRounded from '@mui/icons-material/AttachmentRounded'

import Swal from 'sweetalert2'
import { NumericFormat } from 'react-number-format'

import { Layout } from '../../components/ui'
import { baseUrl } from '../../common'
import { AuthContext } from '../../context/auth'
import { ButtonCustom, TextFieldCustom, TypographyCustom } from '../../components/custom'

import { ImageDialog } from '../../components/client/pagos'
import { DescripcionDeVista } from '../../components/ui/content'
import { errorArrayLaravelTransformToString, getFormatDistanceToNow } from '../../helpers/functions'
import { Form, Formik, FormikHelpers, FormikValues } from 'formik'

import { ICurrency } from '../../interfaces'

const initialValues: FormikValues = {
    value: '',
}

export const Divisas = () => {
    const [image, setImage] = useState<File | null>(null)
    const [currency, setCurrency] = useState<ICurrency | null>(null)
    const { authState } = useContext(AuthContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const onSubmit = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>): Promise<any> => {
        const body = new FormData();
        body.append('value', values.value);
        body.append('image', image ? image : '');
        const url = `${baseUrl}/currency`;
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
                    await Swal.fire({
                        title: 'Exito',
                        text: 'Divisa actualizada',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    getCurrency();
                    formikHelpers.resetForm();
                    setImage(null);
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
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const getCurrency = async () => {
        const url = `${baseUrl}/currency`;
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
                    setCurrency(data[0]);
                    break;
                case 400:
                    Swal.fire({
                        title: '',
                        text: '',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
                default:
                    Swal.fire({
                        title: '',
                        text: '',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    })
                    break;
            }
        } catch (error) {
            console.log({ error })
            Swal.fire({
                title: '',
                text: '',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }
    useEffect(() => {
        getCurrency();
    }, [])

    const attachFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        setImage(file);
        event.target.value = '';
    }

    const handleClick = () => {
        inputRef.current?.click();
    }
    return (
        <Layout>
            <DescripcionDeVista title={'Divisas'} description={'Interfaz para actualizar el valor de las divisas'} />
            {currency && (
                <>
                    <TypographyCustom variant='h4' fontWeight={'bold'}>
                        Valor actual de la divisa
                    </TypographyCustom>
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start', flexFlow: 'column wrap', p: 2, mb: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexFlow: 'row wrap' }}>
                            <Chip color='success' size='small' label={currency.description} sx={{ mr: 1 }} />
                            <TypographyCustom variant="h5">{currency.value}</TypographyCustom>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'start', flexFlow: 'column wrap', p: 2 }}>
                            <ImageDialog image={`${currency.image}`} />
                        </Box>
                        <TypographyCustom fontmode={2} color='text.disabled'>{getFormatDistanceToNow(new Date(currency.created_at))}</TypographyCustom>
                    </Box>
                </>
            )}
            <Formik
                initialValues={initialValues}
                onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={1} sx={{ mb: 4 }}>
                            <Grid item xs={12}>
                                <TypographyCustom variant='h4' fontWeight={'bold'}>
                                    Editar valor de la divisa
                                </TypographyCustom>
                            </Grid>
                            <Grid item xs={12}>
                                <NumericFormat
                                    label='Valor'
                                    name="value"
                                    customInput={TextFieldCustom}
                                    onChange={handleChange}
                                    valueIsNumericString={true}
                                    fixedDecimalScale
                                    thousandSeparator={true}
                                    value={values.value}
                                    decimalScale={2}
                                // error={errors.monto && touched.monto ? true : false}
                                // helperText={errors.monto && touched.monto ? errors.monto : ''}

                                />
                            </Grid>
                            <Grid item xs={image ? 6 : 12}>
                                <ButtonCustom variant='outlined' type='button' startIcon={image ? <SwapHorizRounded /> : <AttachmentRounded />} onClick={handleClick}>{image ? 'Cambiar imagen' : 'Adjuntar imagen'}</ButtonCustom>
                                <input type='file' accept='image/*' ref={inputRef} style={{ display: 'none' }} onChange={attachFile} />
                            </Grid>
                            {image ? <Grid item xs={6}>
                                <ImageDialog image={URL.createObjectURL(image)} baseUrl={false} />
                            </Grid>
                                : <></>}
                            <Grid item xs={12}>
                                <ButtonCustom type='submit'>Guardar cambios</ButtonCustom>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>

        </Layout>
    )
}