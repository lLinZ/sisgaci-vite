import { Box, useTheme } from "@mui/material";
import { FC } from "react";
import { TypographyCustom } from "../../custom";

interface Props {
    title: string;
    text: string;
}
export const NoContentFound: FC<Props> = ({ title, text }) => {
    const theme = useTheme();
    console.log({ theme })
    return (
        <Box sx={{ mt: 2, padding: 5, borderRadius: 3, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexFlow: 'column wrap', width: '100%' }}>
            <img src="/no-content.png" width={200} height={200} />
            <TypographyCustom variant='h5' color='text.primary' fontWeight={'bold'}>{title}</TypographyCustom>
            <TypographyCustom variant='subtitle2' color='text.disabled' fontWeight={'bold'}>{text}</TypographyCustom>
        </Box>
    )
}