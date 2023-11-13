import { useContext } from "react"
import { Box, CircularProgress } from "@mui/material";
import { AuthContext } from "../../../context/auth";

export const Loading = () => {

    const { authState } = useContext(AuthContext)
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <CircularProgress sx={{ color: authState.color }} />
        </Box>
    )
}
