import { FC } from "react";

import { Box, IconButton } from "@mui/material";
import { blue } from "@mui/material/colors";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";

import { TypographyCustom } from "../../custom";
import { AditionalDetailDialog, DetailsDialog } from ".";

import { IClient } from "../../../interfaces";

interface Props {
    client: IClient;
}
export const ClientItem: FC<Props> = ({ client }) => {
    return (
        <Box key={client.id} sx={styles.contentBox}>
            <Box sx={{ display: 'block' }}>
                <TypographyCustom variant='h6'>{client.first_name} {client.lastname}</TypographyCustom>
                <TypographyCustom variant='subtitle2' color='text.secondary'>Origen {client.origin}</TypographyCustom>
                <TypographyCustom variant='subtitle1'>Cedula {client.document}</TypographyCustom>
                <TypographyCustom variant='subtitle1'>{client.phone}</TypographyCustom>
                <TypographyCustom variant='subtitle1'>{client.email}</TypographyCustom>
            </Box>
            <Box sx={styles.actions}>
                <DetailsDialog id={client.id} />
                <AditionalDetailDialog client={client} />
            </Box>
        </Box>
    )
}
const styles = {
    actions: {
        display: 'flex',
        flexFlow: 'column wrap'
    },
    contentBox: {
        mb: 2,
        boxShadow: '0 2px 8px rgba(100,100,100,0.1)',
        borderRadius: 3,
        p: 2,
        background: '#FFF',
        display: 'flex',
        justifyContent: 'space-between',
        flexFlow: 'row wrap'
    }
}