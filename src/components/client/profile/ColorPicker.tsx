import { FC, useContext, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { lime, amber, orange, red, pink, purple, blue, green, indigo, deepPurple, cyan, grey, yellow, lightGreen } from '@mui/material/colors'
import Swal from 'sweetalert2'
import { AuthContext } from '../../../context/auth'
export const ColorPicker: FC = () => {
    const [changing, setChanging] = useState<boolean>(false);
    const { changeColor } = useContext(AuthContext)

    const changeColorLocal = async (color: string) => {
        setChanging(true);
        const result = await changeColor(color);
        if (result.status) {
            Swal.fire({
                title: 'Se cambio el color',
                icon: 'success',
                toast: true,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                position: 'bottom'
            })
            setChanging(false);
        } else {
            Swal.fire({
                title: result.message,
                icon: 'error',
                toast: true,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                position: 'bottom'
            })
            setChanging(false);
        }
    }
    const colors = [
        { color: yellow[500] },
        { color: amber[500] },
        { color: orange[500] },
        { color: red[500] },
        { color: red[900] },
        { color: pink[500] },
        { color: purple[500] },
        { color: deepPurple[500] },
        { color: indigo[500] },
        { color: blue[500] },
        { color: cyan[500] },
        { color: green[500] },
        { color: green['A700'] },
        { color: lightGreen['A700'] },
        { color: lime['A700'] },
        { color: grey[800] },
    ]

    return (
        <Box sx={{ display: "flex", flexFlow: "row wrap", alignItems: "center" }}>
            {colors.map((c, i) => (
                <Box key={i}>
                    <IconButton disabled={changing} onClick={() => changeColorLocal(c.color)} >
                        <Box sx={{ width: 15, height: 15, borderRadius: "100%", bgcolor: c.color }}></Box>
                    </IconButton>
                </Box>
            ))}
        </Box>
    )
}
