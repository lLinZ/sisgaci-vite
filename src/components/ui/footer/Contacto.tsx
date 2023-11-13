import Box from "@mui/material/Box"
import { TypographyCustom } from "../../custom"
import HomeRounded from "@mui/icons-material/HomeRounded"
import LocalPhoneRounded from "@mui/icons-material/LocalPhoneRounded"

/**
 * Componente con la informacion de contacto de la empresa
 * @returns Informacion de contacto de la empresa
 */
export const Contacto = () => {
    return (
        <>
            <TypographyCustom variant='overline' fontSize={16} fontWeight='bold'>Contacto</TypographyCustom>
            <Box>
                <TypographyCustom component='p' sx={{ display: 'flex', alignItems: 'start', textAlign: 'justify', fontFamily: 'Noto Sans Warang Citi', }}>
                    <HomeRounded /> Av. Prolongación Michelena, Centro Comercial &apos;ARA&apos;, Nave &apos;E&apos;, Local 80-A-52. Estado, Valencia, Carabobo</TypographyCustom>
            </Box>
            <Box>
                <TypographyCustom component='p' ><LocalPhoneRounded />0241-8134800</TypographyCustom>
            </Box>
        </>
    )
}