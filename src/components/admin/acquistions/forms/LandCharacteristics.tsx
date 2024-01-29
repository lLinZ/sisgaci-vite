import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Checkbox, FormControl, FormGroup, FormControlLabel, FormLabel, RadioGroup, FormHelperText, Radio, Box, MenuItem, Select } from '@mui/material';
import { FormikValues, Formik, Form } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import Swal from 'sweetalert2';
import { ButtonCustom, RadioGroupCustom, SelectCustom, TextFieldCustom } from '../../../custom';
import { NumericFormat } from 'react-number-format';

interface Props {
    id: number;
    caracteristicas: any;
}
export const LandCharacteristics: FC<Props> = ({ id, caracteristicas }) => {

    const [tiempo, setTiempo] = useState("año");

    const saveProgress = async (values: FormikValues) => {
        const url = `/api/v1/captaciones/caracteristicas/terreno/${id}`;

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
            const respuesta = await fetch(`/api/v1/captaciones/caracteristicas/terreno/${id}`, {
                method: "POST",
                body,
            })
            const data = await respuesta.json();
            console.log(data)
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
        } catch (err) {
            console.log(err);
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

                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={1} display="flex">
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
                                label='Metraje de plana'
                                name="flat_meters"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.flat_meters}
                                decimalScale={2}
                                decimalSeparator='.'
                                thousandSeparator=','
                                allowLeadingZeros={false}
                                error={errors.flat_meters && touched.flat_meters ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <NumericFormat
                                label='Metraje de declive'
                                name="slope_meters"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.slope_meters}
                                decimalScale={2}
                                decimalSeparator='.'
                                thousandSeparator=','
                                allowLeadingZeros={false}
                                error={errors.slope_meters && touched.slope_meters ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <NumericFormat
                                label='Altura maxima'
                                name="max_height"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.max_height}
                                allowLeadingZeros={false}
                                error={errors.max_height && touched.max_height ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <NumericFormat
                                label='Porcentaje de construccion'
                                name="construction_percentaje"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.construction_percentaje}
                                allowLeadingZeros={false}
                                error={errors.construction_percentaje && touched.construction_percentaje ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <NumericFormat
                                label='Porcentaje de ubicacion'
                                name="ubication_percentaje"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.ubication_percentaje}
                                allowLeadingZeros={false}
                                error={errors.ubication_percentaje && touched.ubication_percentaje ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label="Tipo de zonificacion" value={values.zoning_type} name="zoning_type" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Multifamiliar' value={values.multifamiliar} name='multifamiliar' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Unifamiliar' value={values.unifamiliar} name='unifamiliar' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Comercial' value={values.commercial} name='commercial' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Industrial' value={values.industrial} name='industrial' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Cloacas' value={values.sewer} name='sewer' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Vialidad' value={values.sewer} name='sewer' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Telefono' value={values.phone} name='phone' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
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
                            <TextFieldCustom label="Otros" value={values.others} name="others" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                            <ButtonCustom type='submit'>Registrar</ButtonCustom>
                        </Grid>
                    </Grid>
                </Form>
            )
            }
        </Formik >
    )
}
