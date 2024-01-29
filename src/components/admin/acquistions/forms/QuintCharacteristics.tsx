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
type RadiosApartamento = {
    aire_acondicionado: string;
    balcon: string;
    banos: string;
    cocina_empotrada: string;
    estudio: string;
    habitaciones: string;
    habitacion_de_servicio: string;
    hall: string;
    lavandero: string;
    oficina: string;
    jacuzzi: string;
    pantry: string;
    piscina: string;
    planta_baja: string;
    sala_estar: string;
    tanque: string;
    tasca: string;
    terraza: string;
    vigilancia: string;
}
export const QuintCharacteristics: FC<Props> = ({ id, caracteristicas }) => {
    const [radios, setRadios] = useState<RadiosApartamento>({
        aire_acondicionado: caracteristicas.aire_acondicionado ? caracteristicas.aire_acondicionado : "0",
        balcon: caracteristicas.balcon ? caracteristicas.balcon : "0",
        banos: caracteristicas.banos ? caracteristicas.banos : "0",
        cocina_empotrada: caracteristicas.cocina_empotrada ? caracteristicas.cocina_empotrada : "0",
        estudio: caracteristicas.estudio ? caracteristicas.estudio : "0",
        habitaciones: caracteristicas.habitaciones ? caracteristicas.habitaciones : "0",
        habitacion_de_servicio: caracteristicas.habitacion_de_servicio ? caracteristicas.habitacion_de_servicio : "0",
        hall: caracteristicas.hall ? caracteristicas.hall : "0",
        jacuzzi: caracteristicas.jacuzzi ? caracteristicas.jacuzzi : "0",
        lavandero: caracteristicas.lavandero ? caracteristicas.lavandero : "0",
        oficina: caracteristicas.oficina ? caracteristicas.oficina : "0",
        pantry: caracteristicas.pantry ? caracteristicas.pantry : "0",
        piscina: caracteristicas.piscina ? caracteristicas.piscina : "0",
        planta_baja: caracteristicas.planta_baja ? caracteristicas.planta_baja : "0",
        sala_estar: caracteristicas.sala_estar ? caracteristicas.sala_estar : "0",
        tanque: caracteristicas.tanque ? caracteristicas.tanque : "0",
        tasca: caracteristicas.tasca ? caracteristicas.tasca : "0",
        terraza: caracteristicas.terraza ? caracteristicas.terraza : "0",
        vigilancia: caracteristicas.vigilancia ? caracteristicas.vigilancia : "0",
    });
    const [tiempo, setTiempo] = useState("año");
    const changeRadio = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRadios({ ...radios, [e.target.name]: value });
    }

    const saveProgress = async (values: FormikValues) => {
        const url = `/api/v1/captaciones/caracteristicas/quinta/${id}`;

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

        const respuesta = await fetch(`/api/v1/captaciones/caracteristicas/quinta/${id}`, {
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
                            <RadioGroupCustom label='Divisiones' value={values.divisions} name='divisions' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Telefono' value={values.phone} name='phone' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Lavandero' value={values.laundry} name='laundry' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Habitaciones</FormLabel>
                                <RadioGroup row aria-label="habitaciones-radio-button" name="habitaciones" value={radios.habitaciones} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.habitaciones !== "0" && !!radios.habitaciones === true && (<TextField fullWidth multiline label="Cantidad" name="habitaciones" type="number" placeholder="Sólo números" value={values.habitaciones} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Habitacion de servicio' value={values.service_room} name='service_room' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Baños</FormLabel>
                                <RadioGroup row aria-label="banos-radio-button" name="banos" value={radios.banos} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.banos !== "0" && !!radios.banos === true && (<TextField fullWidth multiline label="Cantidad" name="banos" type="number" placeholder="Sólo números" value={values.banos} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='A/A' value={values.air_conditioning} name='air_conditioning' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Vigilancia' value={values.surveillance} name='surveillance' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Sala de estar' value={values.living_room} name='living_room' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Balcon' value={values.balcony} name='balcony' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Hall' value={values.hall} name='hall' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Tasca' value={values.tavern} name='tavern' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Pantry' value={values.pantry} name='pantry' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Estudio' value={values.studio} name='studio' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Terraza' value={values.terrace} name='terrace' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Lavandero' value={values.laundry} name='laundry' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Piscina' value={values.pool} name='pool' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Tanque' value={values.water_tank} name='water_tank' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom
                                label="Tipo de puertas"
                                value={values.doors_type}
                                name="doors_type"
                                onChange={handleChange}
                                error={errors.doors_type && touched.doors_type ? true : false}
                                helperText={''}
                            />
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
                            <TextFieldCustom
                                label="Tipo de piso"
                                value={values.floor_type}
                                name="floor_type"
                                onChange={handleChange}
                                error={errors.floor_type && touched.floor_type ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom
                                label="Otros"
                                value={values.others}
                                name="others"
                                onChange={handleChange}
                                error={errors.others && touched.others ? true : false}
                                helperText={''}
                            />
                        </Grid>
                        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                            <ButtonCustom type="submit">Registrar datos</ButtonCustom>
                        </Grid>
                    </Grid>
                </Form>
            )
            }
        </Formik >
    )
}
