import { Box, CircularProgress, Grid, IconButton } from '@mui/material';
import { FormikHelpers, Formik, Form } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TypographyCustom, ButtonCustom } from '../components/custom';
import { TextFieldCustom } from '../components/custom/TextFieldCustom';
import { AuthContext } from '../context/auth';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { baseUrl } from '../common';
import { PageLoading } from '../components/ui/content/PageLoading';

const initialValues = {
    email: '',
    password: '',
}
type FormValues = { email: string, password: string };

const useValidateLogin = () => {
    /**
     * Estado del loader
     */
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Funcion del contexto para validar token
     */
    const { validateToken } = useContext(AuthContext)

    /**
     * Hook de react router para redireccionar
     */
    const navigate = useNavigate();

    /**
     * Funcion para evaluar el resultado del validateToken
     */
    const validateSession = async () => {
        setLoading(true);
        const validation = await validateToken();
        if (validation.status) {
            setLoading(false);
            navigate(validation.path ? validation.path : '/');
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    }
    useEffect(() => {
        validateSession();
    }, [])

    return { loading, setLoading }
}


export const AuthPage = () => {

    /**
     * Funcion del contexto para iniciar sesion y almacenar los datos del user en el contexto
     */
    const { userLogin } = useContext(AuthContext);

    /**
     * Estado del loader
     */
    const { loading, setLoading } = useValidateLogin();


    const [showPass, setShowPass] = useState<boolean>(false);
    const navigate = useNavigate();

    const toggleVisibility = () => {
        setShowPass(!showPass)
    }

    const onSubmit: (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => any = async (values) => {
        if (!values.email || !values.password) {
            return false;
        }
        setLoading(true);
        const result = await userLogin(values.email, values.password);
        if (result.status) {
            const { user } = result;
            const role = user?.role;
            await Swal.fire({
                title: 'Exito',
                text: result.message,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            });
            const url = role!.description.toLowerCase() === 'cliente' ? '/dashboard' : '/admin/dashboard';
            navigate(url);
        } else {
            await Swal.fire({
                title: 'Error',
                text: result.message,
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            });
            setLoading(false);
        }
    }

    /**
     * Mostrar loader
     */
    if (loading) return <PageLoading customMessage='Validando sesion...' />

    return (<>
        <Box sx={styles.container}>
            <img src='/logo.png' width='200' height='200' />
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
                {({ handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} style={styles.form}>
                        <Grid container display='flex' alignItems='center' justifyContent='center' flexDirection='column' spacing={3}>
                            <Grid item xs={12} md={12} sx={styles.item}>
                                <TypographyCustom fontSize={24} fontWeight={'bold'} textAlign={'center'}>SISGACI</TypographyCustom>
                            </Grid>
                            <Grid item xs={12} md={12} sx={styles.item}>
                                <TextFieldCustom fullWidth name='email' onChange={handleChange} label='Correo' />
                            </Grid>
                            <Grid item xs={12} md={12} sx={styles.item}>
                                <TextFieldCustom fullWidth name='password' label='Contraseña' onChange={handleChange} type={showPass ? 'text' : 'password'} InputProps={{
                                    endAdornment: <IconButton size='small' onClick={toggleVisibility}>
                                        {!showPass ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                }} />
                            </Grid>
                            <Grid item xs={12} md={12} sx={styles.item}>
                                <ButtonCustom fullWidth disableElevation disabled={loading} type='submit'>Iniciar sesion</ButtonCustom>
                            </Grid>
                        </Grid>
                    </Form >
                )}
            </Formik>
        </Box>
    </>
    )
}

/**
 * Estilos de los componentes MUI
 */
const styles = {
    container: {
        width: { xs: '100%', sm: '80%', md: '50%' },
        margin: 'auto',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    item: {
        width: '100%',
    },
    form: {
        width: '100%',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}