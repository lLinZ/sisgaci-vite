import { FC } from 'react';
import { Grid } from '@mui/material';
import { Form, Formik, FormikValues } from 'formik';
import Swal from 'sweetalert2';
import { ButtonCustom, RadioGroupCustom, TextFieldCustom } from '../../../custom';

interface Props {
    id: number;
    informacion: any;
}
export const ShopInformation: FC<Props> = ({ id, informacion }) => {

    const saveProgress = async (values: FormikValues) => {
        const url = `/api/v1/captaciones/informacion/local/${id}`;

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
        const url = `/api/captaciones/informacion/local/${id}`;

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
                            <RadioGroupCustom label='Edificio' value={values.building} name='building' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label="Centro comercial" value={values.mall} name="mall" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label="Piso" value={values.floor} name="floor" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label='Zona' value={values.zone} name='zone' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label='Oficina' value={values.office} name='office' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label='Numero de oficina' value={values.office_number} name='office_number' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <TextFieldCustom label='Punto de referencia' value={values.landmark} name='landmark' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Conjunto residencial' value={values.residential} name='residential' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="center" justifyContent="center">
                            <RadioGroupCustom label='Calle con vigilancia' value={values.surveilled_street} name='surveilled_street' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                            <ButtonCustom type="submit">Registrar datos</ButtonCustom>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}
