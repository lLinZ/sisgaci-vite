import { LoadingButton } from '@mui/lab';
import { Grid, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Box, MenuItem, Select } from '@mui/material';
import { FormikValues, Formik, Form } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import Swal from 'sweetalert2';
import { TextFieldCustom } from '../../../custom';

interface Props {
    id: number;
    caracteristicas: any;
}
type RadiosLocal = {
    aire_acondicionado: string;
    balcon: string;
    banos: string;
    cocina_empotrada: string;
    estudio: string;
    habitaciones: string;
    lavandero: string;
    oficina: string;
    pantry: string;
    piscina: string;
    planta_baja: string;
    sala_estar: string;
    tanque: string;
    tasca: string;
    terraza: string;
    vigilancia: string;
}
export const ShopCharacteristics: FC<Props> = ({ id, caracteristicas }) => {
    const [radios, setRadios] = useState<RadiosLocal>({
        aire_acondicionado: caracteristicas.aire_acondicionado ? caracteristicas.aire_acondicionado : "0",
        balcon: caracteristicas.balcon ? caracteristicas.balcon : "0",
        banos: caracteristicas.banos ? caracteristicas.banos : "0",
        cocina_empotrada: caracteristicas.cocina_empotrada ? caracteristicas.cocina_empotrada : "0",
        estudio: caracteristicas.estudio ? caracteristicas.estudio : "0",
        habitaciones: caracteristicas.habitaciones ? caracteristicas.habitaciones : "0",
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
        const url = `/api/v1/captaciones/caracteristicas/local/${id}`;

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
            const respuesta = await fetch(`/api/v1/captaciones/caracteristicas/local/${id}`, {
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

                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={1} display="flex">
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom type="number" fullWidth label="Metraje de construccion" value={values.metraje_construccion} name="metraje_construccion" onChange={handleChange} error={errors.metraje_construccion && touched.metraje_construccion ? true : false} helperText={errors.metraje_construccion && touched.metraje_construccion ? errors.metraje_construccion : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom type="number" fullWidth label="Metraje de terreno" value={values.metraje_terreno} name="metraje_terreno" onChange={handleChange} error={errors.metraje_terreno && touched.metraje_terreno ? true : false} helperText={errors.metraje_terreno && touched.metraje_terreno ? errors.metraje_terreno : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom type="number" fullWidth label="Metraje de mezzanina" value={values.metraje_mezzanina} name="metraje_mezzanina" onChange={handleChange} error={errors.metraje_mezzanina && touched.metraje_mezzanina ? true : false} helperText={errors.metraje_mezzanina && touched.metraje_mezzanina ? errors.metraje_mezzanina : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom type="number" fullWidth label="Cantidad de pisos" value={values.cantidad_pisos} name="cantidad_pisos" onChange={handleChange} error={errors.cantidad_pisos && touched.cantidad_pisos ? true : false} helperText={errors.cantidad_pisos && touched.cantidad_pisos ? errors.cantidad_pisos : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Planta baja</FormLabel>
                                <RadioGroup row aria-label="pb-radio-button" name="planta_baja" value={radios.planta_baja} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={"0"} control={<Radio />} label="No" />
                                    <FormControlLabel value={"1"} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.planta_baja !== "0" && !!radios.planta_baja === true && (<TextFieldCustom fullWidth multiline label="Descripcion" name="metraje_planta_baja" value={values.metraje_planta_baja} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Oficina</FormLabel>
                                <RadioGroup row aria-label="oficina-radio-button" name="oficina" value={radios.oficina} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.oficina !== "0" && !!radios.oficina === true && (<TextFieldCustom fullWidth multiline label="Descripcion" name="oficina" value={values.oficina} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Divisiones</FormLabel>
                                <RadioGroup row aria-label="divisiones-radio-button" name="divisiones" value={values.divisiones} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Telefono</FormLabel>
                                <RadioGroup row aria-label="telefono-radio-button" name="telefono" value={values.telefono} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Lavandero</FormLabel>
                                <RadioGroup row aria-label="lavandero-radio-button" name="lavandero" value={values.lavandero} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Habitaciones</FormLabel>
                                <RadioGroup row aria-label="habitaciones-radio-button" name="habitaciones" value={radios.habitaciones} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.habitaciones !== "0" && !!radios.habitaciones === true && (<TextFieldCustom fullWidth multiline label="Cantidad" name="habitaciones" type="number" placeholder="Sólo números" value={values.habitaciones} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Baños</FormLabel>
                                <RadioGroup row aria-label="banos-radio-button" name="banos" value={radios.banos} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.banos !== "0" && !!radios.banos === true && (<TextFieldCustom fullWidth multiline label="Cantidad" name="banos" type="number" placeholder="Sólo números" value={values.banos} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>A/A</FormLabel>
                                <RadioGroup row aria-label="aa-radio-button" name="aire_acondicionado" value={radios.aire_acondicionado} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.aire_acondicionado !== "0" && !!radios.aire_acondicionado === true && (<TextFieldCustom fullWidth multiline label="Descripcion" name="aire_acondicionado" value={values.aire_acondicionado} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Vigilancia</FormLabel>
                                <RadioGroup row aria-label="vigilancia-radio-button" name="vigilancia" value={radios.vigilancia} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.vigilancia !== "0" && !!radios.vigilancia === true && (<TextFieldCustom fullWidth multiline label="Descripcion" name="vigilancia" value={values.vigilancia} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Sala de estar</FormLabel>
                                <RadioGroup row aria-label="salaestar-radio-button" name="sala_estar" value={values.sala_estar} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Balcón</FormLabel>
                                <RadioGroup row aria-label="balcon-radio-button" name="balcon" value={values.balcon} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Hall</FormLabel>
                                <RadioGroup row aria-label="hall-radio-button" name="hall" value={values.hall} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Tasca</FormLabel>
                                <RadioGroup row aria-label="tasca-radio-button" name="tasca" value={values.tasca} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Pantry</FormLabel>
                                <RadioGroup row aria-label="pantry-radio-button" name="pantry" value={values.pantry} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Estudio</FormLabel>
                                <RadioGroup row aria-label="estudio-radio-button" name="estudio" value={values.estudio} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Terraza</FormLabel>
                                <RadioGroup row aria-label="terraza-radio-button" name="terraza" value={values.terraza} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Lavandero</FormLabel>
                                <RadioGroup row aria-label="lavandero-radio-button" name="lavandero" value={values.lavandero} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Piscina</FormLabel>
                                <RadioGroup row aria-label="piscina-radio-button" name="piscina" value={values.piscina} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Tanque</FormLabel>
                                <RadioGroup row aria-label="tanque-radio-button" name="tanque" value={radios.tanque} onChange={changeRadio} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                            {radios.tanque !== "0" && !!radios.tanque === true && (<TextFieldCustom fullWidth multiline label="Descripcion" name="tanque" value={values.tanque} onChange={handleChange} />)}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Tipo de corriente</FormLabel>
                                <RadioGroup row aria-label="tipocorriente-radio-button" name="tipo_corriente" value={values.tipo_corriente} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={"110"} control={<Radio />} label="110v" />
                                    <FormControlLabel value={"220"} control={<Radio />} label="220v" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom type="text" fullWidth label="Tipo de puertas" value={values.tipo_de_puertas} name="tipo_de_puertas" onChange={handleChange} error={errors.tipo_de_puertas && touched.tipo_de_puertas ? true : false} helperText={errors.tipo_de_puertas && touched.tipo_de_puertas ? errors.tipo_de_puertas : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <Box sx={{ display: "flex", alignItems: "center", flexFlow: "row nowrap", width: "100%" }}>
                                <TextFieldCustom type="number" placeholder='Solo cantidad en numeros' fullWidth label="Antigüedad" value={values.antiguedad} name="antiguedad" onChange={handleChange} error={errors.antiguedad && touched.antiguedad ? true : false} helperText={errors.antiguedad && touched.antiguedad ? errors.antiguedad : ''} sx={{ width: "50%", "& fieldset": { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 0 } }} />
                                <Select value={values.antiguedad_tipo ? values.antiguedad_tipo : 'años'} name='antiguedad_tipo' onChange={handleChange} defaultValue={'años'} sx={{ width: "50%", borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                                    <MenuItem value={'años'}>Años</MenuItem>
                                    <MenuItem value={'meses'}>Meses</MenuItem>
                                </Select>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom type="text" fullWidth label="Tipo de piso" value={values.tipo_de_piso} name="tipo_de_piso" onChange={handleChange} error={errors.tipo_de_piso && touched.tipo_de_piso ? true : false} helperText={errors.tipo_de_piso && touched.tipo_de_piso ? errors.tipo_de_piso : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom type="text" fullWidth label="Otros..." value={values.otros} name="otros" onChange={handleChange} error={errors.otros && touched.otros ? true : false} helperText={errors.otros && touched.otros ? errors.otros : ''} />
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
