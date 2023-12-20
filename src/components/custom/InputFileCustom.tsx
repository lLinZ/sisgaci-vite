import { Dispatch, SetStateAction, FC, useState, useRef, ChangeEvent } from "react";

import { Box, Tooltip, IconButton, Dialog } from "@mui/material";

import AttachmentRounded from "@mui/icons-material/AttachmentRounded";
import SwapHorizRounded from "@mui/icons-material/SwapHorizRounded";
import PhotoRounded from "@mui/icons-material/PhotoRounded";
import DeleteRounded from "@mui/icons-material/DeleteRounded";

import { ButtonCustom, TypographyCustom } from ".";

interface Props {
    image: File | null;
    setImage: Dispatch<SetStateAction<File | null>>;
}

export const InputFileCustom: FC<Props> = ({ image, setImage }) => {
    const [open, setOpen] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const attachFile = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        setImage(file);
        event.target.value = '';
    }
    const handleClick = () => {
        inputRef.current?.click();
    }
    return (
        <>
            <Box sx={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-around', alignItems: 'center' }}>

                {image && (
                    <Tooltip title="Borrar Imagen">
                        <IconButton onClick={() => setImage(null)}>
                            <DeleteRounded />
                        </IconButton>
                    </Tooltip>
                )}
                {image && (
                    <Tooltip title="Ver Imagen">
                        <IconButton onClick={() => setOpen(true)}>
                            <PhotoRounded />
                        </IconButton>
                    </Tooltip>
                )}
                <ButtonCustom variant={image ? 'contained' : 'outlined'} type='button' startIcon={image ? <SwapHorizRounded /> : <AttachmentRounded />} onClick={handleClick}>{image ? 'Cambiar imagen' : 'Adjuntar imagen'}</ButtonCustom>
                <input type='file' accept='image/*' ref={inputRef} style={{ display: 'none' }} onChange={attachFile} />
            </Box>
            <Dialog open={open} onClose={() => setOpen(false)}>
                {image
                    ? (<img src={URL.createObjectURL(image)} style={{ maxWidth: "100%", maxHeight: "calc(100vh - 64px)" }} />)
                    : (<TypographyCustom>No hay imagen disponible</TypographyCustom>)}
            </Dialog>
        </>
    )
}