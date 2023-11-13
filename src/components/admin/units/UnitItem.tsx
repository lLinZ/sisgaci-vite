import { useState, useContext } from "react";

import EditRounded from "@mui/icons-material/EditRounded";
import { Box, Chip, Divider, IconButton, lighten, darken, Grid } from "@mui/material";

import Swal from "sweetalert2";

import { baseUrl } from "../../../common";
import { AuthContext } from "../../../context/auth";
import { errorArrayLaravelTransformToString } from "../../../helpers/functions";
import { IUnit } from "../../../interfaces";
import { TypographyCustom } from "../../custom";
import { OwnerDialog, SelectedUnitType, SelectedUser, UnitTypeDialog } from ".";
import { green, orange } from "@mui/material/colors";

type ControlProps = {
    unitsState: IUnit[];
    setUnitsState: React.Dispatch<React.SetStateAction<IUnit[]>>;
    ids: number[];
    setIds: React.Dispatch<React.SetStateAction<number[]>>;
    saveChanges: () => Promise<void>
}
interface Props {
    unit: IUnit;
    controlProps: ControlProps;
}
export const UnitItem = ({ unit, controlProps }: Props) => {
    const [unitState, setUnitState] = useState<IUnit>(unit);

    const { authState } = useContext(AuthContext);
    const asignOwner = async (selectedUser: SelectedUser) => {
        const url = `${baseUrl}/unit/${unitState.id}/user/${selectedUser?.id}`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setUnitState({
                        ...unitState,
                        user_id: data.id,
                        user: data
                    })
                    Swal.fire({
                        text: 'Propietario asignado',
                        icon: 'success',
                        toast: true,
                        position: 'bottom-start',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        iconColor: '#FFF',
                        customClass: {
                            popup: 'colored-toast',
                            container: 'custom-swal-container',
                        }
                    })
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
            console.log({ error });
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
        }
    }
    const asignUnitType = async (selectedUnitType: SelectedUnitType) => {
        const url = `${baseUrl}/unit/${unitState.id}/unit_type/${selectedUnitType?.id}`

        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
        }
        try {
            const response = await fetch(url, options);

            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setUnitState({
                        ...unitState,
                        unit_type_id: data.id,
                        unit_type: data
                    })
                    Swal.fire({
                        text: 'Propietario asignado',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        iconColor: '#FFF',
                        toast: true,
                        position: 'bottom-start',
                        customClass: {
                            popup: 'colored-toast',
                            container: 'custom-swal-container',
                        }
                    })
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
            console.log({ error });
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
        }
    }

    return (
        <Box sx={{ borderRadius: 3, p: 2, mt: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', background: '#FFF' }}>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                    <Box>
                        <TypographyCustom variant={'h6'} fontWeight='bold'>{unitState.name}</TypographyCustom>
                        <Box sx={{ display: 'flex' }}>
                            <TypographyCustom color='text.secondary'>Status </TypographyCustom>
                            <Chip size='small' label={unitState.status?.description} sx={{ width: 'auto', ml: 1, background: unitState.status?.description === 'Activo' ? lighten(green[500], 0.5) : lighten(orange[500], 0.5), color: unitState.status?.description === 'Activo' ? darken(green[500], 0.3) : darken(orange[500], 0.3), fontWeight: 'bold' }} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'start', flexFlow: 'column', ml: { xs: 0, sm: 4 } }}>
                        <TypographyCustom variant={'subtitle1'} fontWeight={'bold'} color="text.primary">Tipo de unidad</TypographyCustom>
                        <TypographyCustom variant={'subtitle2'} fontWeight={'bold'} color={unitState.unit_type ? 'text.secondary' : 'text.disabled'}>{unitState.unit_type ? unitState.unit_type.description : 'No hay tipo de unidad asignado'}</TypographyCustom>
                        <UnitTypeDialog asignUnitType={asignUnitType} unit={unitState} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'start', flexFlow: 'column', ml: { xs: 0, sm: 4 } }}>
                        <TypographyCustom variant={'subtitle1'} fontWeight={'bold'} color="text.primary">Propietario</TypographyCustom>
                        <TypographyCustom variant={'subtitle2'} fontWeight={'bold'} color={unitState.user ? 'text.secondary' : 'text.disabled'}>{unitState.user ? unitState.user.nombre : 'No hay propietario asignado'}</TypographyCustom>
                        <OwnerDialog asignOwner={asignOwner} unit={unitState} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}