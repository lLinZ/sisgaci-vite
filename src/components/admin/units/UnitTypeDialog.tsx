import { AddCircleRounded, CloseRounded } from "@mui/icons-material";
import { Button, Dialog, Toolbar, IconButton, CircularProgress, lighten, darken } from "@mui/material";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../../../common";
import { AuthContext } from "../../../context/auth";
import { errorArrayLaravelTransformToString } from "../../../helpers/functions";
import { IUnit, IUnitType } from "../../../interfaces";
import { TypographyCustom } from "../../custom";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
interface PropsUnitTypeDialog {
    asignUnitType: (selectedUnitType: SelectedUnitType) => Promise<void>;
    unit: IUnit;
}
export type SelectedUnitType = {
    id: number;
    description: string;
}
export const UnitTypeDialog = ({ asignUnitType, unit }: PropsUnitTypeDialog) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [unitTypes, setUnitTypes] = useState<IUnitType[] | null>(null);
    const [selectedUnitType, setSelectedUnitType] = useState<SelectedUnitType | null>(null);
    const { authState } = useContext(AuthContext);

    const getUnitTypes = async () => {
        const url = `${baseUrl}/buildings/unit_types/${unit.building_id}`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            }
        }
        try {
            setLoading(true);
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setUnitTypes(data);
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        customClass: {
                            container: 'custom-swal-container',
                        }
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        customClass: {
                            container: 'custom-swal-container',
                        }
                    })
                    break;
            }
        } catch (error) {
            console.log({ error })
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    container: 'custom-swal-container',
                }
            })
        } finally {
            setLoading(false);
        }
    }

    const handleOpen = () => {
        getUnitTypes();
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setUnitTypes(null);
    }
    const check = (id: number, description: string) => {
        setSelectedUnitType({
            id,
            description
        });
        asignUnitType({ id, description }).finally(() => {
            handleClose();
        });
    }
    return (
        <Box>
            <Button sx={{ textTransform: 'none', background: lighten(authState.color, 0.5), color: darken(authState.color, 0.3) }} variant='text' endIcon={<AddCircleRounded />} onClick={handleOpen}>Asignar</Button>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Toolbar sx={{ background: grey[900] }}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TypographyCustom variant={'h6'} color='common.white'>Seleccionar tipo de unidad</TypographyCustom>
                        <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                </Toolbar>
                <Box sx={{ width: '80%', margin: 'auto', minHeight: '100vh', pt: 2 }}>
                    {loading && (
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress sx={{ color: authState.color }} />
                        </Box>
                    )}

                    {unitTypes && unitTypes.map((unitType) => (
                        <Box key={unitType.id} sx={{ width: '100%', mb: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexFlow: 'column wrap' }}>
                                <TypographyCustom variant='h6' fontWeight='bold'>{unitType.description}</TypographyCustom>
                                <TypographyCustom variant='subtitle2' color='text.secondary'>Metraje {unitType.size}</TypographyCustom>
                                <TypographyCustom variant='subtitle2' color='text.secondary'>Alicuota {unitType.aliquot}</TypographyCustom>
                            </Box>
                            <IconButton
                                onClick={() => check(unitType.id, unitType.description)}
                                sx={{ color: selectedUnitType && selectedUnitType.id === unitType.id ? authState.color : grey[600] }}
                            >
                                {selectedUnitType && selectedUnitType.id === unitType.id
                                    ? (<RadioButtonCheckedIcon />)
                                    : (<RadioButtonUncheckedIcon />)
                                }
                            </IconButton>
                        </Box>
                    ))}
                </Box>
            </Dialog>
        </Box>
    )
}