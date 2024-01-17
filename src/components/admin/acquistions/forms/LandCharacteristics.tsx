import { LoadingButton } from '@mui/lab';
import { Grid, TextField, Checkbox, FormControl, FormGroup, FormControlLabel, FormLabel, RadioGroup, FormHelperText, Radio, Box, MenuItem, Select } from '@mui/material';
import { FormikValues, Formik, Form } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import Swal from 'sweetalert2';
import { getInitialValues } from '../../../../utils/functions';

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
                            <TextField type="number" fullWidth label="Metraje de terreno" value={values.metraje_terreno} name="metraje_terreno" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="number" fullWidth label="Metraje de plana" value={values.metraje_plana} name="metraje_plana" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="number" fullWidth label="Metraje de declive" value={values.metraje_declive} name="metraje_declive" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="number" fullWidth label="Altura maxima" value={values.altura_maxima} name="altura_maxima" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="number" fullWidth label="Porcentaje de construcción" value={values.porcentaje_construccion} name="porcentaje_construccion" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="number" fullWidth label="Porcentaje de ubicación" value={values.porcentaje_ubicacion} name="porcentaje_ubicacion" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField type="text" fullWidth label="Tipo de zonificacion" value={values.tipo_zonificacion} name="tipo_zonificacion" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Multifamiliar</FormLabel>
                                <RadioGroup row aria-label="multifamiliar-radio-button" name="multifamiliar" value={values.multifamiliar} onChange={handleChange} defaultValue={"0"}>
                                    <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Unifamiliar</FormLabel>
                                <RadioGroup row aria-label="unifamiliar-radio-button" name="unifamiliar" value={values.unifamiliar} onChange={handleChange} defaultValue={"0"}>
                                    <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Comercial</FormLabel>
                                <RadioGroup row aria-label="comercial-radio-button" name="comercial" value={values.comercial} onChange={handleChange} defaultValue={"0"}>
                                    <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Industrial</FormLabel>
                                <RadioGroup row aria-label="industrial-radio-button" name="industrial" value={values.industrial} onChange={handleChange} defaultValue={"0"}>
                                    <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Cloacas</FormLabel>
                                <RadioGroup row aria-label="cloacas-radio-button" name="cloacas" value={values.cloacas} onChange={handleChange} defaultValue={"0"}>
                                    <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormLabel>Vialidad</FormLabel>
                            <FormControl>
                                <RadioGroup row aria-label="vialidad-radio-button" name="vialidad" value={values.vialidad} onChange={handleChange} defaultValue={"0"}>
                                    <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormLabel>Telefono</FormLabel>
                            <FormControl>
                                <RadioGroup row aria-label="telefono-radio-button" name="telefono" value={values.telefono} onChange={handleChange} defaultValue={"0"}>
                                    <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
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
                            <TextField type="text" fullWidth label="Otros..." value={values.otros} name="otros" onChange={handleChange} />
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
