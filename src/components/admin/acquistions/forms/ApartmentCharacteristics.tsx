import { LoadingButton } from '@mui/lab';
import { Grid, TextField, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, MenuItem, Select, Box } from '@mui/material';
import { FormikValues, Formik, Form } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
    id: number;
    caracteristicas: any;
}
type RadiosApartamento = {
    air_conditioning: string;
    balcony: string;
    bathrooms: string;
    fitted_kitchen: string;
    studio: string;
    bedrooms: string;
    hall: string;
    laundry: string;
    office: string;
    jacuzzi: string;
    pantry: string;
    pool: string;
    ground_floor: string;
    living_room: string;
    water_tank: string;
    tavern: string;
    terrace: string;
    surveillance: string;
}
export const ApartmentCharacteristics: FC<Props> = ({ id, caracteristicas }) => {
    const [radios, setRadios] = useState<RadiosApartamento>({
        air_conditioning: caracteristicas?.aire_acondicionado ? caracteristicas?.aire_acondicionado : "0",
        balcony: caracteristicas?.balcon ? caracteristicas?.balcon : "0",
        bathrooms: caracteristicas?.banos ? caracteristicas?.banos : "0",
        fitted_kitchen: caracteristicas?.cocina_empotrada ? caracteristicas?.cocina_empotrada : "0",
        studio: caracteristicas?.estudio ? caracteristicas?.estudio : "0",
        bedrooms: caracteristicas?.habitaciones ? caracteristicas?.habitaciones : "0",
        hall: caracteristicas?.hall ? caracteristicas?.hall : "0",
        laundry: caracteristicas?.jacuzzi ? caracteristicas?.jacuzzi : "0",
        office: caracteristicas?.lavandero ? caracteristicas?.lavandero : "0",
        jacuzzi: caracteristicas?.oficina ? caracteristicas?.oficina : "0",
        pantry: caracteristicas?.pantry ? caracteristicas?.pantry : "0",
        pool: caracteristicas?.piscina ? caracteristicas?.piscina : "0",
        ground_floor: caracteristicas?.planta_baja ? caracteristicas?.planta_baja : "0",
        living_room: caracteristicas?.sala_estar ? caracteristicas?.sala_estar : "0",
        water_tank: caracteristicas?.tanque ? caracteristicas?.tanque : "0",
        tavern: caracteristicas?.tasca ? caracteristicas?.tasca : "0",
        terrace: caracteristicas?.terraza ? caracteristicas?.terraza : "0",
        surveillance: caracteristicas?.vigilancia ? caracteristicas?.vigilancia : "0",
    });
    const changeRadio = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRadios({ ...radios, [e.target.name]: value });
    }

    const saveProgress = async (values: FormikValues) => {
        const url = `/api/v1/captaciones/caracteristicas/apartamento/${id}`;

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
            const respuesta = await fetch(`/api/v1/captaciones/caracteristicas/apartamento/${id}`, {
                method: "POST",
                body,
            })
            const data = await respuesta.json();
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
            });
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
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextField type="number" fullWidth label="Metraje de construccion" value={values.metraje_construccion} name="metraje_construccion" onChange={handleChange} error={errors.metraje_construccion && touched.metraje_construccion ? true : false} helperText={errors.metraje_construccion && touched.metraje_construccion ? errors.metraje_construccion : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextField type="number" fullWidth label="Numero de piso" value={values.apto_piso} name="apto_piso" onChange={handleChange} error={errors.cantidad_pisos && touched.cantidad_pisos ? true : false} helperText={errors.cantidad_pisos && touched.cantidad_pisos ? errors.cantidad_pisos : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextField type="number" fullWidth label="Cantidad de pisos" value={values.cantidad_de_pisos} name="cantidad_de_pisos" onChange={handleChange} error={errors.cantidad_pisos && touched.cantidad_pisos ? true : false} helperText={errors.cantidad_pisos && touched.cantidad_pisos ? errors.cantidad_pisos : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Planta baja</FormLabel>
                                <RadioGroup row aria-label="pb-radio-button" name="planta_baja" value={radios.planta_baja !== "0" ? 1 : 0} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={"0"} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.planta_baja !== "0" && !!radios.planta_baja === true && (<TextField fullWidth multiline label="Descripcion" name="metraje_planta_baja" value={values.metraje_planta_baja} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Oficina</FormLabel>
                                <RadioGroup row aria-label="oficina-radio-button" name="oficina" value={radios.oficina !== "0" ? 1 : 0} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.oficina !== "0" && !!radios.oficina === true && (<TextField fullWidth multiline label="Descripcion" name="oficina" value={values.oficina} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Telefono</FormLabel>
                                <RadioGroup row aria-label="telefono-radio-button" name="telefono" value={values.telefono} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Niveles</FormLabel>
                                <RadioGroup row aria-label="niveles-radio-button" name="niveles" value={values.niveles} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Lavandero</FormLabel>
                                <RadioGroup row aria-label="lavandero-radio-button" name="lavandero" value={values.lavandero} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Jacuzzi</FormLabel>
                                <RadioGroup row aria-label="jacuzzi-radio-button" name="jacuzzi" value={values.jacuzzi} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Habitaciones</FormLabel>
                                <RadioGroup row aria-label="habitaciones-radio-button" name="habitaciones" value={radios.habitaciones !== "0" ? 1 : 0} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.habitaciones !== "0" && !!radios.habitaciones === true && (<TextField fullWidth multiline label="Cantidad" name="habitaciones" type="number" placeholder="Sólo números" value={values.habitaciones} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Habitacion de servicio</FormLabel>
                                <RadioGroup row aria-label="habitacionservicio-radio-button" name="habitacion_de_servicio" value={values.habitacion_de_servicio} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Baños</FormLabel>
                                <RadioGroup row aria-label="banos-radio-button" name="banos" value={radios.banos !== "0" ? 1 : 0} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.banos !== "0" && !!radios.banos === true && (<TextField fullWidth multiline label="Cantidad" name="banos" type="number" placeholder="Sólo números" value={values.banos} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>A/A</FormLabel>
                                <RadioGroup row aria-label="aa-radio-button" name="aire_acondicionado" value={radios.aire_acondicionado !== "0" ? 1 : 0} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.aire_acondicionado !== "0" && !!radios.aire_acondicionado === true && (<TextField fullWidth multiline label="Descripcion" name="aire_acondicionado" value={values.aire_acondicionado} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection={'column'}>
                            <FormControl>
                                <FormLabel>Vigilancia</FormLabel>
                                <RadioGroup row aria-label="vigilancia-radio-button" name="vigilancia" value={radios.vigilancia !== "0" ? 1 : 0} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.vigilancia !== "0" && !!radios.vigilancia === true && (<TextField fullWidth multiline label="Descripcion" name="vigilancia" value={values.vigilancia} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Sala de estar</FormLabel>
                                <RadioGroup row aria-label="salaestar-radio-button" name="sala_estar" value={values.sala_estar} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Balcón</FormLabel>
                                <RadioGroup row aria-label="balcon-radio-button" name="balcon" value={values.balcon} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Hall</FormLabel>
                                <RadioGroup row aria-label="hall-radio-button" name="hall" value={values.hall} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Tasca</FormLabel>
                                <RadioGroup row aria-label="tasca-radio-button" name="tasca" value={values.tasca ? values.tasca : 0} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Pantry</FormLabel>
                                <RadioGroup row aria-label="pantry-radio-button" name="pantry" value={values.pantry} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Estudio</FormLabel>
                                <RadioGroup row aria-label="estudio-radio-button" name="estudio" value={values.estudio} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Terraza</FormLabel>
                                <RadioGroup row aria-label="terraza-radio-button" name="terraza" value={values.terraza} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Piscina</FormLabel>
                                <RadioGroup row aria-label="piscina-radio-button" name="piscina" value={values.piscina} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <FormControl>
                                <FormLabel>Tanque</FormLabel>
                                <RadioGroup row aria-label="tanque-radio-button" name="tanque" value={radios.tanque !== "0" ? 1 : 0} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio size="small" />} label="No" />
                                    <FormControlLabel value={1} control={<Radio size="small" />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.tanque !== "0" && !!radios.tanque === true && (<TextField fullWidth multiline label="Descripcion" name="tanque" value={values.tanque} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextField type="text" fullWidth label="Tipo de puertas" value={values.tipo_de_puertas} name="tipo_de_puertas" onChange={handleChange} error={errors.tipo_de_puertas && touched.tipo_de_puertas ? true : false} helperText={errors.tipo_de_puertas && touched.tipo_de_puertas ? errors.tipo_de_puertas : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <Box sx={{ display: "flex", alignItems: "center", flexFlow: "row nowrap", width: "100%" }}>
                                <TextField type="number" placeholder='Solo cantidad en numeros' fullWidth label="Antigüedad" value={values.antiguedad} name="antiguedad" onChange={handleChange} error={errors.antiguedad && touched.antiguedad ? true : false} helperText={errors.antiguedad && touched.antiguedad ? errors.antiguedad : ''} sx={{ width: "50%", "& fieldset": { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 0 } }} />
                                <Select value={values.antiguedad_tipo ? values.antiguedad_tipo : 'años'} name='antiguedad_tipo' onChange={handleChange} defaultValue={'años'} sx={{ width: "50%", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                                    <MenuItem value={'años'}>Años</MenuItem>
                                    <MenuItem value={'meses'}>Meses</MenuItem>
                                </Select>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextField type="text" fullWidth label="Tipo de piso" value={values.tipo_de_piso} name="tipo_de_piso" onChange={handleChange} error={errors.tipo_piso && touched.tipo_piso ? true : false} helperText={errors.tipo_piso && touched.tipo_piso ? errors.tipo_piso : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextField type="text" fullWidth label="Otros..." value={values.otros} name="otros" onChange={handleChange} error={errors.otros && touched.otros ? true : false} helperText={errors.otros && touched.otros ? errors.otros : ''} />
                        </Grid>
                        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                            <LoadingButton fullWidth type="button" loading={isSubmitting} color="primary" onClick={() => saveProgress(values)} disableElevation sx={{ p: 1.8, textTransform: "none" }}>Guardar progreso </LoadingButton>
                            <LoadingButton type="submit" loading={isSubmitting} fullWidth disableElevation color="success" variant="contained" sx={{ p: 1.8, textTransform: "none" }}>Registrar</LoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            )
            }
        </Formik >
    )
}
