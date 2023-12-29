import { FC, useState } from "react";

import PhotoRounded from "@mui/icons-material/PhotoRounded";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";

import { TypographyCustom } from "../../custom";

interface Props {
    pic_url: string;
}
export const ImageInsideDialogWithButton: FC<Props> = ({ pic_url }) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            {pic_url && (
                <Tooltip title="Ver Imagen">
                    <IconButton onClick={() => setOpen(true)}>
                        <PhotoRounded />
                    </IconButton>
                </Tooltip>
            )}
            <Dialog open={open} onClose={() => setOpen(false)}>
                {pic_url
                    ? (<img src={pic_url} style={{ maxWidth: "100%", maxHeight: "calc(100vh - 64px)" }} />)
                    : (<TypographyCustom>No hay imagen disponible</TypographyCustom>)}
            </Dialog>
        </>
    )
}