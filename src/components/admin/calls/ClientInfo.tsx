import { Grid, Box } from "@mui/material"
import { ICall } from "../../../interfaces"
import { TypographyCustom } from "../../custom"
import { InfoAvailable } from "."

export const ClientInfo = ({ call }: { call: ICall | null }) => {
    return (<>
        <Grid item xs={12}>
            <Box sx={styles.namesBox}>
                <TypographyCustom variant={'overline'} _color={'p'}>Información del cliente</TypographyCustom>
            </Box>
        </Grid>
        <InfoAvailable call={call} _key={'first_name'} title='Primer Nombre' />
        <InfoAvailable call={call} _key={'middle_name'} title='Segundo Nombre' />
        <InfoAvailable call={call} _key={'lastname'} title='Primer Apellido' />
        <InfoAvailable call={call} _key={'second_lastname'} title='Segundo Apellido' />
        <InfoAvailable call={call} _key={'phone'} title='Telefono' />
        <InfoAvailable call={call} _key={'email'} title='Correo' />
        <InfoAvailable call={call} _key={'gender'} title='Genero' />
        <InfoAvailable call={call} _key={'marital_status'} title='Estado Civil' />
        <InfoAvailable call={call} _key={'birthday'} title='Fecha de nacimiento' />

    </>
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
    avatarBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    namesBox: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentBox: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
    },
    divider: { borderColor: 'rgba(100,100,100,0.0)' }
}