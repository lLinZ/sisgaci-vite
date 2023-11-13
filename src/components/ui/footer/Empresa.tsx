import Box from "@mui/material/Box"
import { TypographyCustom } from "../../custom"

/**
 * Componente con informacion de la empresa
 * @returns Informacion de la empresa
 */
export const Empresa = () => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src='/logo.png' alt='Logo Consolitex - Footer' width='150' height='150' />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TypographyCustom component='h5' variant='overline' fontSize={16} fontWeight='bold'>Consolitex®</TypographyCustom>
                        <TypographyCustom variant='subtitle2' fontWeight='100' >Bienes Raíces</TypographyCustom>
                    </Box>
                </Box>
            </Box>
            <TypographyCustom component='p' fontmode={2}>Somos tu mejor opción a la hora de buscar un inmueble en el estado Carabobo. Siempre estamos para servirte, ¡Consolitex te da más! RIF: J-29820228-9</TypographyCustom>
        </>
    )
}