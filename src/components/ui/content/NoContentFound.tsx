import { Box, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { TypographyCustom } from '../../custom';

interface Props {
    title: string;
    text: string;
    children?: ReactNode;
}
export const NoContentFound: FC<Props> = ({ title, text, children }) => {
    const theme = useTheme();
    return (
        <Box sx={styles.main}>
            <img src='/no-content.png' width={200} height={200} />
            <TypographyCustom variant='h5' color='text.primary' fontWeight={'bold'}>{title}</TypographyCustom>
            <TypographyCustom variant='subtitle2' color='text.disabled' fontWeight={'bold'}>{text}</TypographyCustom>
            <Box sx={{ mt: 4 }}>
                {children}
            </Box>
        </Box>
    )
}
const styles = {
    main: {
        mt: 2,
        padding: 5,
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(100,100,100,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexFlow: 'column wrap',
        width: '100%'
    }
}