import { Grid, Autocomplete, Box, Alert, AlertTitle, Chip, IconButton, Tooltip, darken, lighten } from "@mui/material";
import { Formik, Form, FormikHelpers } from "formik";
import { NumericFormat } from "react-number-format";
import { baseUrl, countriesArray } from "../../../common";
import { TextFieldCustom, ButtonCustom, TypographyCustom } from "../../custom";
import { Dispatch, FC, useContext, useState } from "react";
import { ICall } from "../../../interfaces";
import { AuthContext } from "../../../context/auth";
import { BackspaceRounded } from "@mui/icons-material";
import { red } from "@mui/material/colors";

interface Props {
    setComments: Dispatch<any>;
    setLoadingComments: Dispatch<any>;
    call: ICall | null;
}
export const AddNewComment: FC<Props> = ({ setComments, setLoadingComments, call }) => {
    const [errors, setErrors] = useState<string[] | null>(null);
    const [positive, setPositive] = useState<string[] | null>(null);
    const { authState } = useContext(AuthContext);
    const onSubmit = async (values: { feedback: string }, formikHelpers: FormikHelpers<{ feedback: string }>): Promise<void> => {
        setErrors(null);
        setPositive(null);
        setLoadingComments(true);
        if (!values.feedback) {
            setErrors(['El campo comentario es obligatorio']);
            setLoadingComments(false);
            return;
        }
        const url = `${baseUrl}/call/comment/${call?.id}`;
        const body = new URLSearchParams();

        body.append('feedback', String(values.feedback))
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
            body
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setComments(data)
                    setPositive(['Se ha registrado el comentario exitosamente']);
                    break;
                case 400:
                    setErrors(['Ocurrio un error con el comentario']);
                    break;
                case 404:
                    setErrors(['La llamada no existe']);
                    break;
                case 500:
                    setErrors(['Ocurrio un error interno en el servidor']);
                    break;
                default:
                    setErrors(['Ocurrio un error inesperado']);
                    break;
            }
        } catch (error) {
            console.error({ error });
            setErrors(['Ocurrio un error al conectar con el servidor']);

        } finally {
            setLoadingComments(false);
        }
    }
    return (
        <Formik
            initialValues={{ feedback: '' }}
            onSubmit={onSubmit} >
            {({ values, handleChange, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Box sx={styles.namesBox}>
                                <TypographyCustom variant='overline' _color='p' textAlign={'center'}>Crear comentario nuevo</TypographyCustom>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={styles.actions}>
                                {values.feedback &&
                                    <Tooltip title='Borrar todo el contenido'>
                                        <IconButton sx={{ color: red[900] }} onClick={() => {
                                            setFieldValue('feedback', '')
                                        }}>
                                            <BackspaceRounded />
                                        </IconButton>
                                    </Tooltip>}
                                <Chip onClick={() => {
                                    setFieldValue('feedback', values.feedback + 'Se le ofrecieron opciones al cliente, ')
                                }} size={'small'} label={'Opciones'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                <Chip onClick={() => {
                                    setFieldValue('feedback', values.feedback + 'El seguimiento del cliente ha finalizado, ')
                                }} size={'small'} label={'Seguimiento finalizado'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                <Chip onClick={() => {
                                    setFieldValue('feedback', values.feedback + 'El cliente no atendio la(s) llamada(s), ')
                                }} size={'small'} label={'No atiende'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                <Chip onClick={() => {
                                    setFieldValue('feedback', values.feedback + 'El cliente se encuentra de viaje, ')
                                }} size={'small'} label={'En viaje'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                <Chip onClick={() => {
                                    setFieldValue('feedback', values.feedback + 'Se le hizo seguimiento al cliente, ')
                                }} size={'small'} label={'Seguimiento'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                <Chip onClick={() => {
                                    setFieldValue('feedback', values.feedback + 'Se contacto al cliente por medios propios, ')
                                }} size={'small'} label={'Medios propios'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                                <Chip onClick={() => {
                                    setFieldValue('feedback', values.feedback + 'Consolitex, ')
                                }} size={'small'} label={'Consolitex'} sx={{ background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3), fontWeight: 'bold', mr: 1 }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextFieldCustom multiline label='Comentario' name='feedback' value={values.feedback} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ButtonCustom type='submit'>Enviar comentario</ButtonCustom>
                        </Grid>
                        {errors && errors.length > 0 && (
                            <Grid item xs={12}>
                                <Alert severity="error" sx={{ mt: 2 }} onClose={() => setErrors(null)}>
                                    <AlertTitle>Error</AlertTitle>
                                    {errors?.map((e) => (<TypographyCustom color={'error'}>{e}</TypographyCustom>))}
                                </Alert>
                            </Grid>
                        )}
                        {positive && positive.length > 0 && (
                            <Grid item xs={12}>
                                <Alert severity="success" sx={{ mt: 2 }} onClose={() => setPositive(null)}>
                                    <AlertTitle>Exito</AlertTitle>
                                    {positive?.map((e) => (<TypographyCustom color={'success'}>{e}</TypographyCustom>))}
                                </Alert>
                            </Grid>
                        )}
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}
const styles = {
    mainContent: {
        width: { xs: '100%', sm: '100%' },
        margin: 'auto',
        mt: 0.5,
        display: 'flex',
        flexFlow: 'column nowrap',
        mb: 1,
    },
    namesBox: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actions: {
        width: '100%',
        overflow: 'scroll',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    divider: { borderColor: 'rgba(100,100,100,0.0)' }
}