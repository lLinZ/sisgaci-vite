import { Grid, Chip } from "@mui/material";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth";

interface Props {
    id: number
    actual: string;
}
export const CustomHorizontalLinks: FC<Props> = ({ id, actual }) => {

    const { authState } = useContext(AuthContext);

    const router = useNavigate();

    const styles = {
        main: {
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
        },
        chipSelected: {
            fontWeight: 'bold',
            color: authState.darken,
            background: authState.lighten,
            fontSize: 10,
            width: "100%"
        },
        chip: {
            fontWeight: 'bold',
            color: authState.darken,
            fontSize: 10,
            width: "100%"
        }

    }
    return (
        <Grid container sx={styles.main} gap={1}>
            <Grid item xs={3}>
                <Chip
                    size='small'
                    label='Caracteristicas'
                    onClick={() => router(`/admin/acquisition/edit/${id}/characteristics`)}
                    sx={actual === 'characteristics' ? styles.chipSelected : styles.chip} />
            </Grid>
            <Grid item xs={3}>
                <Chip
                    size='small'
                    label='Informacion'
                    onClick={() => router(`/admin/acquisition/edit/${id}/information`)}
                    sx={actual === 'information' ? styles.chipSelected : styles.chip}
                />
            </Grid>
            <Grid item xs={3}>
                <Chip
                    size='small'
                    label='Imagenes'
                    onClick={() => router(`/admin/acquisition/edit/${id}/images`)}
                    sx={actual === 'images' ? styles.chipSelected : styles.chip}
                />
            </Grid>
            <Grid item xs={3}>
                <Chip
                    size='small'
                    label='Propietario'
                    onClick={() => router(`/admin/acquisition/edit/${id}/owner`)}
                    sx={actual === 'owner' ? styles.chipSelected : styles.chip}
                />
            </Grid>
        </Grid>)
}
