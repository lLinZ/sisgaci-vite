import { FC } from 'react';

import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';

import { Form, Formik, FormikValues } from 'formik';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';

interface Props {
    id: number;
    informacion: any;
}
export const LandInformation: FC<Props> = ({ id, informacion }) => {

    const saveProgress = async (values: FormikValues) => {
        const url = `/api/v1/captaciones/informacion/terreno/${id}`;

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

    /**
     * Funcion para enviar los datos al servidor
     * @param values Values del formik
     */
    const onSubmit = async (values: FormikValues) => {

        // API URL
        const url = `/api/captaciones/informacion/terreno/${id}`;

        // Values
        const body = JSON.stringify({ ...values, saveProgress: false });

        // Request OPTIONS
        const options = {
            method: "POST",
            body
        }

        try {
            // Request
            const respuesta = await fetch(url, options);

            switch (respuesta.status) {
                case 200:
                    // Response
                    const data = await respuesta.json();
                    Swal.fire({
                        title: "Exito",
                        text: data.message,
                        icon: "success"
                    });
                    break;
                case 500:
                    const dataError = await respuesta.json();
                    Swal.fire({
                        title: "Error",
                        text: dataError.message,
                        icon: "error"
                    });
                    break;
                default:
                    Swal.fire({
                        title: "Error",
                        text: "No se logró cargar la informacion",
                        icon: "error"
                    });
                    console.log(data);
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Formik
            initialValues={informacion as FormikValues}
            onSubmit={({ values }) => onSubmit(values)}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
        >
            {({ isSubmitting, values, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid container display="flex" spacing={1}>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField fullWidth value={values.terreno} name="terreno" label="Terreno" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField fullWidth value={values.parcela} name="parcela" label="Parcela" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField fullWidth value={values.urbanizacion} name="urbanizacion" label="Urbanizacion" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextField fullWidth value={values.punto_de_referencia} name="punto_de_referencia" label="Punto de referencia" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Conjunto residencial</FormLabel>
                                <RadioGroup row aria-label="conjunto_residencial-radio-button" name="conjunto_residencial" value={values.conjunto_residencial} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <FormControl>
                                <FormLabel>Calle con vigilancia</FormLabel>
                                <RadioGroup row aria-label="calle_con_vigilancia-radio-button" name="calle_con_vigilancia" value={values.calle_con_vigilancia} onChange={handleChange} defaultValue={0}>
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                            <LoadingButton fullWidth type="button" loading={isSubmitting} onClick={() => saveProgress(values)} disableElevation sx={{ textTransform: "none" }}>Guardar progreso</LoadingButton>
                            <LoadingButton fullWidth type="submit" loading={isSubmitting} variant="contained" color="success" disableElevation>Registrar</LoadingButton>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}
