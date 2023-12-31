import { FC } from 'react'
import { Box, IconButton } from '@mui/material'

import moment from 'moment'

import { TypographyCustom } from '../../custom'

import { ICall } from '../../../interfaces'
import { Visibility } from '@mui/icons-material'
import VisibilityRounded from '@mui/icons-material/VisibilityRounded'
import { CallDetails, CallDetailsDialog } from '.'

interface Props {
    call: ICall;
}

export const CallItem: FC<Props> = ({ call }) => {
    return (
        <Box key={call.id} sx={styles.contentBox}>
            <Box sx={{ display: 'block' }}>
                <TypographyCustom variant='h6'>Cliente {call.client?.first_name}</TypographyCustom>
                <TypographyCustom variant='subtitle1'>C.I {call.client?.document}</TypographyCustom>
                <TypographyCustom variant='subtitle1'>Telefono {call.client?.phone}</TypographyCustom>
                <TypographyCustom variant='subtitle2' color='text.secondary'>Creada el {moment(call.created_at).format('DD-MM-YYYY')} a las {moment(call.created_at).format('HH:mm:ss')}</TypographyCustom>
            </Box>
            <Box sx={styles.actions}>
                <CallDetailsDialog id={call.id} />
            </Box>
        </Box>
    )
}
const styles = {
    contentBox: {
        mb: 2,
        boxShadow: '0 2px 8px rgba(100,100,100,0.1)',
        borderRadius: 3,
        p: 2,
        background: '#FFF',
        display: 'flex',
        justifyContent: 'space-between',
        flexFlow: 'row wrap'
    },
    actions: {
        display: 'flex',
        flexFlow: 'column wrap'
    },
}