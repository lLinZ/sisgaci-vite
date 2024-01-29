import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Checkbox, FormControl, FormGroup, FormControlLabel, FormLabel, RadioGroup, FormHelperText, Radio, Box, MenuItem, Select } from '@mui/material';
import { FormikValues, Formik, Form } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import Swal from 'sweetalert2';
import { ButtonCustom, RadioGroupCustom, SelectCustom, TextFieldCustom } from '../../../custom';

interface Props {
    id: number;
    caracteristicas: any;
}
type RadiosGalpon = {
    planta_baja: string;
    oficina: string;
    banos: string;
    tanque: string;
    vigilancia: string;
    aire_acondicionado: string;
}
export const ShedCharacteristics: FC<Props> = ({ id, caracteristicas }) => {
    const [radios, setRadios] = useState<RadiosGalpon>({
        planta_baja: caracteristicas.planta_baja ? caracteristicas.planta_baja : "0",
        oficina: caracteristicas.oficina ? caracteristicas.oficina : "0",
        banos: caracteristicas.banos ? caracteristicas.banos : "0",
        tanque: caracteristicas.tanque ? caracteristicas.tanque : "0",
        vigilancia: caracteristicas.vigilancia ? caracteristicas.vigilancia : "0",
        aire_acondicionado: caracteristicas.aire_acondicionado ? caracteristicas.aire_acondicionado : "0",
    })
    const [tiempo, setTiempo] = useState("año")

    const changeRadio = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRadios({ ...radios, [e.target.name]: value })
    }

    const saveProgress = async (values: FormikValues) => {
        const url = `/api/v1/captaciones/caracteristicas/galpon/${id}`;

        const body = JSON.stringify({ ...values, saveProgress: true });

        const options = {
            method: "POST",
            body
        }

        try {
            const respuesta = await fetch(url, options);

            switch (respuesta.status) {
                case 200:
                    // Response
                    const data = await respuesta.json();
                    Swal.fire({
                        title: "Exito",
                        text: data.message,
                        icon: "success"
                    })
                    break;
                case 500:
                    const dataError = await respuesta.json();
                    Swal.fire({
                        title: "Error",
                        text: dataError.message,
                        icon: "error"
                    });
                    console.log(dataError.error);

                    break;
                default:
                    Swal.fire({
                        title: "Error",
                        text: "No se logró cargar la informacion",
                        icon: "error"
                    });

            }
        } catch (error) {
            console.log(error);
        }
    }


    const onSubmit = async (values: FormikValues) => {
        const body = JSON.stringify({ ...values, saveProgress: false });

        try {
            const respuesta = await fetch(`/api/v1/captaciones/caracteristicas/galpon/${id}`, {
                method: "POST",
                body,
            })
            const data = await respuesta.json();
            console.log(data);
            switch (respuesta.status) {
                case 200:
                    Swal.fire({
                        title: "Exito",
                        text: "Se han guardado los cambios",
                        icon: "success",
                    })
                    break;
                default:
                    console.log({ data })
                    Swal.fire({
                        title: "Error",
                        text: "No se logró guardar la informacion",
                        icon: "error",
                    })
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "No se logró conectar con el servidor",
                icon: "error",
            })
        }
    }

    return (
        <Formik
            initialValues={caracteristicas as FormikValues}
            onSubmit={(values) => onSubmit(values)}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
        >
            {({ values, errors, touched, isSubmitting, handleSubmit, handleChange }) => (

                < Form onSubmit={handleSubmit}>
                    <Grid container spacing={1} display="flex">
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <NumericFormat
                                label='Metraje de construccion'
                                name="construction_meters"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.construction_meters}
                                decimalScale={2}
                                decimalSeparator='.'
                                thousandSeparator=','
                                allowLeadingZeros={false}
                                error={errors.construction_meters && touched.construction_meters ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <NumericFormat
                                label='Metraje de terreno'
                                name="land_meters"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.land_meters}
                                decimalScale={2}
                                decimalSeparator='.'
                                thousandSeparator=','
                                allowLeadingZeros={false}
                                error={errors.land_meters && touched.land_meters ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <NumericFormat
                                label='Metraje de mezzanina'
                                name="mezzanine_meters"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.mezzanine_meters}
                                decimalScale={2}
                                decimalSeparator='.'
                                thousandSeparator=','
                                allowLeadingZeros={false}
                                error={errors.mezzanine_meters && touched.mezzanine_meters ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <NumericFormat
                                label='Cantidad de pisos'
                                name="floor_quantity"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.floor_quantity}
                                decimalScale={2}
                                decimalSeparator='.'
                                thousandSeparator=','
                                allowLeadingZeros={false}
                                error={errors.floor_quantity && touched.floor_quantity ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Planta baja' value={values.ground_floor} name='ground_floor' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Oficina' value={values.office} name='office' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Telefono' value={values.phone} name='phone' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <NumericFormat
                                label='Baños'
                                name="bathrooms"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.bathrooms}
                                allowLeadingZeros={false}
                                error={errors.bathrooms && touched.bathrooms ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='A/A' value={values.air_conditioning} name='air_conditioning' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Vigilancia' value={values.surveillance} name='surveillance' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Tanque' value={values.water_tank} name='water_tank' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Tipo de corriente' value={values.water_tank} name='water_tank' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label="Tipo de puertas" value={values.doors_type} name="doors_type" onChange={handleChange} error={errors.doors_type && touched.doors_type ? true : false} helperText={''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <SelectCustom label='Tipo de antigüedad' value={values.antiquity_type} name="antiquity_type" onChange={handleChange} helpertext={''}>
                                <MenuItem value='1'>Meses</MenuItem>
                                <MenuItem value='2'>Años</MenuItem>
                            </SelectCustom>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <NumericFormat
                                label='Antigüedad'
                                name="antiquity"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.antiquity}
                                allowLeadingZeros={false}
                                error={errors.antiquity && touched.antiquity ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label="Tipo de piso" value={values.floor_type} name="floor_type" onChange={handleChange} error={errors.floor_type && touched.floor_type ? true : false} helperText={''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label="Tipo de techo" value={values.roof_type} name="roof_type" onChange={handleChange} error={errors.roof_type && touched.roof_type ? true : false} helperText={''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label="Otros" value={values.others} name="others" onChange={handleChange} error={errors.others && touched.others ? true : false} helperText={''} />
                        </Grid>
                        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                            <ButtonCustom type='submit'>Registrar datos</ButtonCustom>
                        </Grid>
                    </Grid>
                </Form>
            )
            }
        </Formik >
    )
}
