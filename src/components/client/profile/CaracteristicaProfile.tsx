import { ReactNode, FC, useContext } from "react";
import { Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { AuthContext } from "../../../context/auth";
import { TypographyCustom } from "../../custom";

interface Props {
    title: string;
    children?: ReactNode;
}
export const CaracteristicaProfile: FC<Props> = ({ title, children }) => {
    const { authState } = useContext(AuthContext)
    const { color } = authState;
    return (
        <Box sx={{ display: "flex", flexFlow: "row", alignItems: "center" }}>
            <CircleIcon sx={{ fontSize: 12, mr: 2, color: color ? color : "#F1F1F1" }} />
            <TypographyCustom variant="subtitle1" color="text.primary" fontWeight="bold" sx={{ mr: 1, fontSize: 16 }}>{title}</TypographyCustom>
            <TypographyCustom variant="subtitle2" color="text.secondary" fontWeight="bold">{children}</TypographyCustom>
        </Box>
    )
}