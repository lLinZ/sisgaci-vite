import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Checkbox, FormControl, FormGroup, FormControlLabel, FormLabel, RadioGroup, FormHelperText, Radio, Box, MenuItem, Select } from '@mui/material';
import { FormikValues, Formik, Form } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import Swal from 'sweetalert2';

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
                            <TextField type="number" fullWidth label="Metraje de construccion" value={!!values.metraje_construccion ? values.metraje_construccion : ''} name="metraje_construccion" onChange={handleChange} error={errors.metraje_construccion && touched.metraje_construccion ? true : false} helperText={errors.metraje_construccion && touched.metraje_construccion ? errors.metraje_construccion : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="number" fullWidth label="Metraje de terreno" value={!!values.metraje_terreno ? values.metraje_terreno : ''} name="metraje_terreno" onChange={handleChange} error={errors.metraje_terreno && touched.metraje_terreno ? true : false} helperText={errors.metraje_terreno && touched.metraje_terreno ? errors.metraje_terreno : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="number" fullWidth label="Metraje de mezzanina" value={!!values.metraje_mezzanina ? values.metraje_mezzanina : ''} name="metraje_mezzanina" onChange={handleChange} error={errors.metraje_mezzanina && touched.metraje_mezzanina ? true : false} helperText={errors.metraje_mezzanina && touched.metraje_mezzanina ? errors.metraje_mezzanina : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="number" fullWidth label="Cantidad de pisos" value={!!values.cantidad_pisos ? values.cantidad_pisos : ''} name="cantidad_pisos" onChange={handleChange} error={errors.cantidad_pisos && touched.cantidad_pisos ? true : false} helperText={errors.cantidad_pisos && touched.cantidad_pisos ? errors.cantidad_pisos : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Planta baja</FormLabel>
                                <RadioGroup row aria-label="pb-radio-button" name="planta_baja" value={radios.planta_baja} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.planta_baja !== "0" && !!radios.planta_baja === true && (<TextField fullWidth multiline label="Descripcion" name="metraje_planta_baja" value={values.metraje_planta_baja} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Oficina</FormLabel>
                                <RadioGroup row aria-label="oficina-radio-button" name="oficina" value={radios.oficina} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.oficina !== "0" && !!radios.oficina === true && (<TextField fullWidth multiline label="Descripcion" name="oficina" value={values.oficina} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Telefono</FormLabel>
                                <RadioGroup row aria-label="telefono-radio-button" name="telefono" value={!!values.telefono ? values.telefono : ''} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
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
                            <FormControl>
                                <FormLabel>A/A</FormLabel>
                                <RadioGroup row aria-label="aa-radio-button" name="aire_acondicionado" value={radios.aire_acondicionado} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.aire_acondicionado !== "0" && !!radios.aire_acondicionado === true && (<TextField fullWidth multiline label="Descripcion" name="aire_acondicionado" value={values.aire_acondicionado} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Vigilancia</FormLabel>
                                <RadioGroup row aria-label="vigilancia-radio-button" name="vigilancia" value={radios.vigilancia} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.vigilancia !== "0" && !!radios.vigilancia === true && (<TextField fullWidth multiline label="Descripcion" name="vigilancia" value={values.vigilancia} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Tanque</FormLabel>
                                <RadioGroup row aria-label="tanque-radio-button" name="tanque" value={radios.tanque} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.tanque !== "0" && !!radios.tanque === true && (<TextField fullWidth multiline label="Descripcion" name="tanque" value={values.tanque} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Tipo de corriente</FormLabel>
                                <RadioGroup row aria-label="tipocorriente-radio-button" name="tipo_corriente" value={!!values.tipo_corriente ? values.tipo_corriente : ''} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={"110"} control={<Radio />} label="110v" />
                                    <FormControlLabel value={"220"} control={<Radio />} label="220v" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="text" fullWidth label="Tipo de puertas" value={!!values.tipo_de_puertas ? values.tipo_de_puertas : ''} name="tipo_de_puertas" onChange={handleChange} error={errors.tipo_de_puertas && touched.tipo_de_puertas ? true : false} helperText={errors.tipo_de_puertas && touched.tipo_de_puertas ? errors.tipo_de_puertas : ''} />
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
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="text" fullWidth label="Tipo de piso" value={!!values.tipo_de_piso ? values.tipo_de_piso : ''} name="tipo_de_piso" onChange={handleChange} error={errors.tipo_de_piso && touched.tipo_de_piso ? true : false} helperText={errors.tipo_de_piso && touched.tipo_de_piso ? errors.tipo_de_piso : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="text" fullWidth label="Tipo de techo" value={!!values.tipo_de_techo ? values.tipo_de_techo : ''} name="tipo_de_techo" onChange={handleChange} error={errors.tipo_de_techo && touched.tipo_de_techo ? true : false} helperText={errors.tipo_de_techo && touched.tipo_de_techo ? errors.tipo_de_techo : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="text" fullWidth label="Otros..." value={!!values.otros ? values.otros : ''} name="otros" onChange={handleChange} error={errors.otros && touched.otros ? true : false} helperText={errors.otros && touched.otros ? errors.otros : ''} />
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
