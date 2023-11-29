import { Grid, Box, Divider } from "@mui/material"
import moment from "moment"
import { ICall } from "../../../interfaces"
import { TypographyCustom } from "../../custom"
import { InfoAvailable } from "."

export const CallInfo = ({ call }: { call: ICall | null }) => {
    return (<>
        <Grid item xs={12}>
            <Box sx={styles.namesBox}>
                <TypographyCustom variant={'overline'} _color='p'>Información de la llamada</TypographyCustom>
            </Box>
        </Grid>
        <InfoAvailable isClient={false} call={call} _key={'zone'} title='Zona' />
        <InfoAvailable isClient={false} call={call} _key={'property_type'} title='Interesado en' />
        <InfoAvailable isClient={false} call={call} _key={'property'} title='Inmueble especifico' />
        <InfoAvailable isClient={false} call={call} _key={'origin'} title='Origen' />
        <InfoAvailable isClient={false} call={call} _key={'call_purpose'} title='Motivo de contacto' />
        <Grid item xs={12} sm={6} md={3}>
            <Box sx={styles.contentBox}>
                <TypographyCustom sx={{ mr: 1 }}>Fecha</TypographyCustom>
                <TypographyCustom color='text.secondary'>{moment(call?.created_at).format('DD-MM-YYYY')} a las {moment(call?.created_at).format('HH:mm:ss')}</TypographyCustom>
            </Box>
            <Divider sx={styles.divider} />
        </Grid>
    </>)
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