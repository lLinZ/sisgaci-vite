import React, { useContext, useState } from 'react'
import { Layout } from '../../components/ui'
import { Form, Formik, FormikState, FormikValues } from 'formik'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { ColorPicker, UserInfo } from '../../components/client/profile'
import { AuthContext } from '../../context/auth'
import Avatar from '@mui/material/Avatar'
import { blue } from '@mui/material/colors'
import { ButtonCustom, TypographyCustom } from '../../components/custom'
import Divider from '@mui/material/Divider'
import { IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/VisibilityRounded';
import VisibilityOff from '@mui/icons-material/VisibilityOffRounded';
import { TextFieldCustom } from '../../components/custom/TextFieldCustom'
import { DescripcionDeVista } from '../../components/ui/content/DescripcionDeVista'
type Props = {}


const initialValues: ChangeData = {
    email: '',
    telefono: '',
    password: '',
    confirmarPassword: '',
}
type ChangeData = {
    email: string;
    password: string;
    confirmarPassword: string;
    telefono: string;
}
export const Perfil = (props: Props) => {
    const { authState } = useContext(AuthContext);
    const [showPass, setShowPass] = useState<boolean>(false);
    const onSubmit = (values: FormikValues, resetForm: (nextState?: Partial<FormikState<ChangeData>> | undefined) => void) => {

    }
    const toggleVisibility = () => {
        setShowPass(!showPass)
    }
    return (
        <Layout>
            <DescripcionDeVista title={'Perfil de usuario'} description="Cambia tus datos, contraseña o color de tema aqui!" />
            <Grid container spacing={1} sx={{ width: "100%", margin: "20px auto", minHeight: "100%", }}>
                <Grid item xs={12} sx={styles.gridItem} >
                    <Box sx={styles.colorPickerContainer}>
                        <Box sx={{ display: "flex", flexFlow: "row wrap", alignItems: "center" }}>
                            {authState.id !== 0 ? (<Avatar sx={{ bgcolor: authState.color ? authState.color : blue[700], mr: 2 }}>{authState.nombre.substring(0, 1)}</Avatar>) : (<></>)}
                            <TypographyCustom variant="subtitle1" color="text.primary" fontWeight="bold" >Color del avatar</TypographyCustom>
                        </Box>
                        <ColorPicker />
                    </Box>
                    <Divider sx={{ marginBlock: 2 }} />
                    <UserInfo />
                </Grid>
                <Grid item xs={12} >
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={6}>
                                        <TextFieldCustom label="Email" name='email' onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldCustom label="Telefono" name='telefono' onChange={handleChange} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldCustom type={showPass ? 'text' : 'password'} label="Contraseña" name='password' onChange={handleChange} InputProps={{
                                            endAdornment: <IconButton size='small' onClick={toggleVisibility}>
                                                {!showPass ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextFieldCustom type={showPass ? 'text' : 'password'} label="Confirmar contraseña" name='confirmarPassword' onChange={handleChange} InputProps={{
                                            endAdornment: <IconButton size='small' onClick={toggleVisibility}>
                                                {!showPass ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonCustom variant='contained'>Guardar cambios</ButtonCustom>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Layout>
    )
}
const styles = {
    formContainer: {
        width: '100%',
        marginTop: 4
    },
    gridItem: {
        borderRadius: 5,
        background: "#FFF",
        boxShadow: '0 8px 32px rgba(100,100,100,0.1)'
    },
    colorPickerContainer: {
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: {
            xs: "center",
            sm: "space-evenly",
            md: "space-between"
        },
        p: 2
    },
}