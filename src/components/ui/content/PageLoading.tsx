import Box from '@mui/material/Box';
import { FC } from 'react';
import { TypographyCustom } from '../../custom';
import { CircularProgress } from '@mui/material';

interface Props {
    customMessage?: string;
}
export const PageLoading: FC<Props> = ({ customMessage = 'Cargando...' }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh', flexFlow: 'column wrap' }}>
            <TypographyCustom>
                {customMessage}
            </TypographyCustom>
            <CircularProgress />
        </Box>
    )
}
