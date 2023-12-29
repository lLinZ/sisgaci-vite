import { Dispatch, FC, useContext, useState } from "react";

import LockRounded from "@mui/icons-material/LockRounded";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { CallDetails } from ".";
import { AuthContext } from "../../../context/auth";
import { baseUrl } from "../../../common";
import { ICall } from "../../../interfaces";
import { TypographyCustom, ButtonCustom } from "../../custom";

interface Props {
    call: ICall;
    setLoading: Dispatch<any>;
}
export const BlockedCall: FC<Props> = ({ call, setLoading }) => {
    const { authState } = useContext(AuthContext);
    const [blocked, setBlocked] = useState<boolean>(true);
    /**
     * Funcion para registrar el comentario del usuario acerca de la llamada buscada
     * @param values Valores del formulario Formik
     * @param resetForm Funcion para reiniciar los datos de los campos del formulario 
    */
    const onSubmit = async (values: { feedback: string; }) => {
        setLoading(true);
        const url = `${baseUrl}/call/comment/${call?.id}`
        const body = new URLSearchParams();
        body.append('feedback', values.feedback);
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
                    setBlocked(false);
                    break;
                case 400:
                    break;
                case 404:
                    break;
                case 500:
                    break;
                default:
                    break;
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    if (blocked) return (
        <Box sx={{ mt: 2, }}>
            <Box sx={{ width: '100%', borderRadius: 5, boxShadow: '0 2px 32px rgba(0,0,0,0.2)', padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexFlow: 'column wrap' }}>
                <LockRounded />
                <TypographyCustom sx={{ mb: 1 }}>{call.client?.phone}</TypographyCustom>
                <TypographyCustom sx={{ mb: 1 }}>{call.client?.full_name ? call.client?.full_name : call.client?.first_name! + call.client?.lastname!}</TypographyCustom>
                {/* <TypographyCustom sx={{ mb: 1 }}>Para ver el contenido de la llamada  escriba un comentario</TypographyCustom> */}
                {/* <Formik
                    initialValues={{ feedback: '' }}
                    onSubmit={onSubmit}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit} style={{ width: '50%' }}>
                            <Grid container spacing={1} sx={{ width: '100%' }}>
                                <Grid item xs={12}>
                                    <TextFieldCustom multiline label='Comentario' name='feedback' value={values.feedback} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonCustom type='submit'>Enviar</ButtonCustom>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik> */}
                <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                    <ButtonCustom onClick={() => setBlocked(false)}>Desbloquear</ButtonCustom>
                </Box>
            </Box>
        </Box>
    )
    if (!blocked) return (<Box>
        <Divider />
        <CallDetails id={call.id} />
    </Box>
    )
}