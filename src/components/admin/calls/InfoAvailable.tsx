import { Grid, Box, Divider } from "@mui/material";
import { ICall, IClient } from "../../../interfaces";
import { TypographyCustom } from "../../custom";

type KeyOfType = keyof ICall & (string | number);
export const InfoAvailable = ({
    title,
    call,
    _key,
    isClient = true,
}: {
    title: string;
    call: ICall | null;
    _key: keyof IClient | KeyOfType;
    isClient?: boolean;
}) => {
    const property = call?.client?.[_key as Exclude<keyof IClient, KeyOfType>] ?? 'No disponible';

    if (isClient) {
        return (
            <Grid item xs={12} sm={6} md={3}>
                <Box sx={styles.contentBox}>
                    <TypographyCustom sx={{ mr: 1 }}>{title}</TypographyCustom>
                    <TypographyCustom color="text.secondary">{property}</TypographyCustom>
                </Box>
                <Divider sx={styles.divider} />
            </Grid>
        );
    } else {
        return (
            <Grid item xs={12} sm={6} md={3}>
                <Box sx={styles.contentBox}>
                    <TypographyCustom sx={{ mr: 1 }}>{title}</TypographyCustom>
                    <TypographyCustom color="text.secondary">{property}</TypographyCustom>
                </Box>
                <Divider sx={styles.divider} />
            </Grid>
        );
    }
};
const styles = {
    contentBox: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
    },
    divider: { borderColor: 'rgba(100,100,100,0.0)' }
}