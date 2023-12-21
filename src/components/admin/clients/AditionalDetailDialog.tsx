import { CloseRounded } from '@mui/icons-material';
import { IconButton, Dialog, AppBar, Toolbar, Box, Grid, MenuItem, Alert, AlertTitle } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { FormikState, Formik, Form } from 'formik';
import { FC, useContext, useState } from 'react'
import { baseUrl } from '../../../common';
import { AuthContext } from '../../../context/auth';
import { errorArrayLaravelTransformToArray } from '../../../helpers/functions';
import { IClient } from '../../../interfaces';
import { TypographyCustom, SelectCustom, TextFieldCustom, ButtonCustom } from '../../custom';
import { DescripcionDeVista } from '../../ui/content';
import AddchartRounded from '@mui/icons-material/AddchartRounded';

interface Props {
    client: IClient;
}
interface IValues {
    type: string;
    value: string;
}
export const AditionalDetailDialog: FC<Props> = ({ client }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[] | null>(null);
    const [positive, setPositive] = useState<string[] | null>(null);
    const { authState } = useContext(AuthContext);
    const handleClick = () => {
        setOpen(!open);
        setErrors(null);
        setPositive(null);
    }
    const initialValues = {
        type: '0',
        value: '',
    }
    const onSubmit = async (values: IValues, resetForm: (nextState?: Partial<FormikState<IValues>> | undefined) => void) => {
        setPositive(null);
        setErrors(null);
        let errores = [];
        if (!values.type || values.type === '0') {
            errores.push('Escoja una categoria valida');
        }
        if (!values.value) {
            errores.push('Escriba un dato valido');
        }
        if (errores.length > 0) {
            setErrors(errores);
            return false;
        }
        const body = new URLSearchParams();
        body.append('type', values.type);
        body.append('data', values.value);
        const url = `${baseUrl}/client/info/add/${client.id}`;
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
                    const data = await response.json();
                    setPositive(['Se ha registrado un nuevo dato!', 'La informacion se cargo exitosamente', 'El formulario se ha reiniciado por si deseas ingresar otro dato mas!'])
                    resetForm();
                    break;
                case 400:
                    const { errors } = await response.json();
                    setErrors(errorArrayLaravelTransformToArray(errors));
                    break;
                case 500:
                    setErrors(['Ocurrio un error en el servidor'])
                    break;
                default:
                    setErrors(['Ocurrio un error inesperado'])
                    break;

            }
        } catch (error) {
            console.error(error);
            setErrors(['Ocurrio un error al conectar con el servidor']);
        }
    }
    return (
        <>
            <IconButton sx={{ color: green[500] }} onClick={handleClick}>
                <AddchartRounded />
            </IconButton>
            <Dialog open={open} fullScreen>
                <AppBar sx={{ width: '100vw', position: 'relative', background: grey[900] }} elevation={0}>
                    <Toolbar color={'primary'}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TypographyCustom>Agregar informacion adicional</TypographyCustom>
                            <IconButton onClick={handleClick} sx={{ color: 'white' }}>
                                <CloseRounded />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{ width: '80%', margin: 'auto', mt: '20px', display: 'flex', flexFlow: 'column wrap' }}>
                    <DescripcionDeVista buttons={false} title={"Informacion adicional de cliente"} description={"Ingresa un dato adicional del cliente, segun su categoria, si quieres agregar un numero de telefono adicional, selecciona la categoria Telefono y el dato seria el numero"}></DescripcionDeVista>

                    <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)} >
                        {({ values, errors, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} >
                                        <SelectCustom label='Categoria' helpertext={""} value={values.type} name='type' onChange={handleChange}>
                                            <MenuItem value='0'>Seleccione una categoria</MenuItem>
                                            <MenuItem value='phone'>Telefono</MenuItem>
                                            <MenuItem value='email'>Email</MenuItem>
                                            <MenuItem value='address'>Direccion</MenuItem>
                                        </SelectCustom>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <TextFieldCustom label="Dato" name='value' value={values.value} onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <ButtonCustom disabled={values.type === '0' || values.value === ''} type='submit'>Registrar</ButtonCustom>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                    {errors && errors.length > 0 && (
                        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setErrors(null)}>
                            <AlertTitle>Error</AlertTitle>
                            {errors?.map((e, i: number) => (<TypographyCustom key={i} color={'error'}>{e}</TypographyCustom>))}
                        </Alert>)}
                    {positive && positive.length > 0 && (
                        <Alert severity="success" sx={{ mt: 2 }} onClose={() => setPositive(null)}>
                            <AlertTitle>Exito</AlertTitle>
                            {positive?.map((e, i: number) => (<TypographyCustom key={i} color={'success'}>{e}</TypographyCustom>))}
                        </Alert>)}
                </Box>
            </Dialog >
        </>
    )
}