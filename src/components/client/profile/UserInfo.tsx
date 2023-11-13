import { Box, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { CaracteristicaProfile } from ".";
import { AuthContext } from "../../../context/auth";

export const UserInfo: FC = () => {
    const { authState } = useContext(AuthContext);
    const { nombre, apellido, email, telefono } = authState;
    return (
        <Box sx={{ p: 2, mb: 2 }}>
            <Typography variant="overline" fontWeight="bold">Tu información de usuario</Typography>
            <CaracteristicaProfile title="Nombre">{nombre}</CaracteristicaProfile>
            <CaracteristicaProfile title="Apellidos">{apellido}</CaracteristicaProfile>
            <CaracteristicaProfile title="Email">{email}</CaracteristicaProfile>
            <CaracteristicaProfile title="Teléfono">{telefono}</CaracteristicaProfile>
        </Box>
    )
}