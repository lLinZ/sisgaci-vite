import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'

import { Form, Formik } from 'formik'

import { NumericFormat } from 'react-number-format';

import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import AttachmentRounded from '@mui/icons-material/AttachFileRounded'
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';

import { Layout } from '../../../components/ui'
import { DescripcionDeVista } from '../../../components/ui/content/DescripcionDeVista'
import { ButtonCustom, SelectCustom, TextFieldCustom, TypographyCustom } from '../../../components/custom'
import { ImageDialog } from '../../../components/client/pagos';
import { baseUrl } from '../../../common';
import { AuthContext } from '../../../context/auth';

import * as Yup from 'yup';
import { IUnit } from '../../../interfaces';
import Swal from 'sweetalert2';
import { errorArrayLaravelTransformToString } from '../../../helpers/functions';

const initialValues = {
    monto: '',
    tipo_de_moneda: 'default',
    tipo_de_pago: 'default',
    descripcion: '',
    unit_id: 'default',
}
type FormValues = {
    monto: string;
    unit_id: string;
    tipo_de_moneda: string;
    tipo_de_pago: string;
    descripcion: string;
}

const validationSchema = Yup.object({
    monto: Yup.string().required('Este campo es obligatorio').min(2, 'Minimo 2 caracteres'),
    tipo_de_moneda: Yup.string().matches(/(Dolar)|(Bolivares)/g, 'Debe seleccionar una opcion valida').required('Este campo es obligatorio'),
    tipo_de_pago: Yup.string().matches(/(Transferencia)|(Efectivo)/g, 'Debe seleccionar una opcion valida').required('Este campo es obligatorio'),
    descripcion: Yup.string().required('Este campo es obligatorio'),
})

export const RegistrarPago = () => {
    const { authState } = useContext(AuthContext);
    const [image, setImage] = useState<File | null>(null);
    const [units, setUnits] = useState<IUnit[] | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getUnits();
    }, [])

    const getUnits = async () => {
        const url = `${baseUrl}/user/units`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        };
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setUnits(data);
                    break;
                case 400:
                    break;
                default:
                    break;
            }

        } catch (error) {
            console.log({ error })

        }
    }
    const handleSubmitForm = async (values: FormValues, resetForm: (nextState?: any) => any) => {
        const url = `${baseUrl}/payment`;
        const formData = new FormData();
        formData.append('amount', values.monto.replace(/\,/g, ''));
        formData.append('unit_id', values.unit_id);
        formData.append('currency', values.tipo_de_moneda);
        formData.append('payment_type', values.tipo_de_pago);
        formData.append('description', values.descripcion);
        formData.append('image', image ? image : '');
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
            body: formData,
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    Swal.fire({ title: 'Exito', text: 'Pago registrado', icon: 'success' });
                    resetForm();
                    setImage(null);
                    break;
                case 400:
                    const { message: messageError, errors } = await response.json();
                    const errorString = errorArrayLaravelTransformToString(errors);
                    Swal.fire({
                        title: messageError,
                        html: errorString,
                        icon: 'error'
                    })
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log({ error });
        }
    }

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
            <DescripcionDeVista title='Registrar pago' description='Registra un nuevo pago para tu condominio' />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => handleSubmitForm(values, resetForm)}
            >
                {({ values, handleChange, handleSubmit, errors, touched }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid container spacing={2} display='flex' flexDirection='row' alignItems='center' sx={{ p: { xs: 1, sm: 0 } }}>
                            <Grid item xs={12}>
                                <SelectCustom
                                    error={errors.unit_id ? true : false}
                                    helpertext={errors.unit_id ? errors.unit_id : ''}
                                    labelId='unit_id'
                                    label='Unidad'
                                    onChange={handleChange}
                                    name='unit_id'
                                    value={values.unit_id}
                                >
                                    <MenuItem value={'default'} disabled>Seleccione una de tus unidades</MenuItem>
                                    {units && units.map((unit) => (<MenuItem key={unit.id} value={String(unit.id)}>{unit.name}</MenuItem>))}
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
                                <SelectCustom
                                    error={errors.tipo_de_moneda ? true : false}
                                    helpertext={errors.tipo_de_moneda ? errors.tipo_de_moneda : ''}
                                    labelId='tipo_de_moneda'
                                    label='Tipo de moneda'
                                    onChange={handleChange}
                                    name='tipo_de_moneda'
                                    value={values.tipo_de_moneda}
                                >
                                    <MenuItem value={'default'} disabled>Seleccione una moneda</MenuItem>
                                    <MenuItem value={'Dolares'}>Dolares</MenuItem>
                                    <MenuItem value={'Bolivares'}>Bolivares</MenuItem>
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} >
                                <SelectCustom
                                    error={errors.tipo_de_pago ? true : false}
                                    helpertext={errors.tipo_de_pago ? errors.tipo_de_pago : ''}
                                    labelId='tipo_de_pago'
                                    label='Tipo de pago'
                                    onChange={handleChange}
                                    name='tipo_de_pago'
                                    value={values.tipo_de_pago}
                                >
                                    <MenuItem value={'default'} disabled>Seleccione un tipo de pago</MenuItem>
                                    <MenuItem value={'Transferencia'}>Transferencia</MenuItem>
                                    <MenuItem value={'Efectivo'}>Efectivo</MenuItem>
                                </SelectCustom>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <NumericFormat
                                    label='Monto'
                                    name="monto"
                                    customInput={TextFieldCustom}
                                    onChange={handleChange}
                                    valueIsNumericString={true}
                                    thousandSeparator={true}
                                    value={values.monto}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    error={errors.monto && touched.monto ? true : false}
                                    helperText={errors.monto && touched.monto ? errors.monto : ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <ButtonCustom variant='outlined' type='button' startIcon={image ? <SwapHorizRoundedIcon /> : <AttachmentRounded />} onClick={handleClick}>{image ? 'Cambiar imagen' : 'Adjuntar imagen'}</ButtonCustom>
                                <input type='file' accept='image/*' ref={inputRef} style={{ display: 'none' }} onChange={attachFile} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextFieldCustom error={errors.descripcion && touched.descripcion ? true : false} helperText={errors.descripcion} multiline onChange={handleChange} name='descripcion' label='Descripción' value={values.descripcion} />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonCustom disabled={!image} type='submit'>Finalizar</ButtonCustom>
                            </Grid>
                            {image && (
                                <Grid item xs={12} sm={6}>
                                    <TypographyCustom fontWeight={'bold'} color='text.secondary'>Previsualizacion de la imagen</TypographyCustom>
                                    <ImageDialog image={URL.createObjectURL(image)} baseUrl={false} />
                                </Grid>
                            )}
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Layout>
    )
}