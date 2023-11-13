import { useContext, useState, ChangeEvent } from "react";
import './custom-style.css';
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import blue from "@mui/material/colors/blue";

import SaveRounded from "@mui/icons-material/SaveRounded";
import RoomPreferencesRounded from "@mui/icons-material/RoomPreferencesRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import EditOffRounded from "@mui/icons-material/EditOffRounded";

import { TypographyCustom, TextFieldCustom, ButtonCustom } from "../../custom";
import { baseUrl } from "../../../common";
import { AuthContext } from "../../../context/auth";

import { IUnitType, IBuilding } from "../../../interfaces";

import Swal from "sweetalert2";
import { NumericFormat } from "react-number-format";
import { errorArrayLaravelTransformToString } from "../../../helpers/functions";

interface Props {
    unitType: IUnitType;
    building: IBuilding;
}
interface IValues {
    description: string;
    size: number;
    aliquot: number;
}
export const UnitTypeItem = ({ unitType, building }: Props) => {
    const { authState } = useContext(AuthContext);
    const [edit, setEdit] = useState<boolean>(false);
    const [UnitType, setUnitType] = useState<IUnitType>(unitType);

    const [values, setValues] = useState<IValues>({
        description: unitType.description,
        size: unitType.size,
        aliquot: unitType.aliquot,
    })

    const saveChanges = async (id: number) => {
        const url = `${baseUrl}/buildings/unit_types/${building.id}/${id}`;

        const body = new URLSearchParams();
        body.append('description', String(values.description));
        body.append('size', String(values.size));
        body.append('aliquot', String(values.aliquot));

        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`
            },
            body
        }

        try {
            const response = await fetch(url, options)
            switch (response.status) {
                case 200:
                    setEdit(false);
                    setUnitType({
                        ...UnitType,
                        description: values.description,
                        size: values.size,
                        aliquot: values.aliquot,
                    });
                    Swal.fire({
                        text: 'Se ha editado el tipo de inmueble',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        toast: true,
                        position: 'bottom-start',
                        iconColor: 'white',
                        customClass: {
                            container: 'custom-swal-container',
                            popup: 'colored-toast',
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
                            container: 'custom-swal-container'
                        }
                    })
                    break;
                default:
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
                showConfirmButton: false
            })
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;

        setValues({
            ...values,
            [name]: value
        })
    }
    const toggleEdit = () => {
        setEdit(!edit);
    }

    return (
        <Box key={UnitType.id} sx={styles.main}>
            <Box sx={styles.wrapper}>
                <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center' }}>
                    <RoomPreferencesRounded sx={{ color: blue[400] }} />
                    <TypographyCustom variant="h6" fontWeight={'bold'}>{UnitType.description}</TypographyCustom>
                </Box>
                <IconButton color={'warning'} onClick={toggleEdit}>
                    {edit ? <EditOffRounded /> : <EditRounded />}
                </IconButton>
            </Box>
            {edit ? (<Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                    <TextFieldCustom onChange={handleChange} name={'description'} label={'Descripcion'} value={values.description} />
                </Grid>
                <Grid item xs={6}>
                    <NumericFormat
                        decimalScale={2}
                        fixedDecimalScale={true}
                        thousandSeparator={true}
                        onChange={handleChange}
                        name={'size'}
                        customInput={TextFieldCustom}
                        valueIsNumericString={true}
                        label={'Metraje'}
                        value={values.size}
                    />
                </Grid>
                <Grid item xs={6}>
                    <NumericFormat
                        decimalScale={2}
                        fixedDecimalScale={true}
                        thousandSeparator={true}
                        onChange={handleChange}
                        name={'aliquot'}
                        customInput={TextFieldCustom}
                        valueIsNumericString={true}
                        label={'Alicuota'}
                        value={values.aliquot}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ButtonCustom endIcon={<SaveRounded />} onClick={() => saveChanges(UnitType.id)}>
                        Guardar cambios
                    </ButtonCustom>
                </Grid>
            </Grid>) : (
                <>
                    <TypographyCustom variant='subtitle2' color='text.secondary' fontmode={2}>Metraje {UnitType.size}</TypographyCustom>
                    <TypographyCustom variant='subtitle2' color='text.secondary' fontmode={2}>Alicuota {UnitType.aliquot}</TypographyCustom>
                </>)}
        </Box>
    )
}
const styles = {
    main: { p: 2, width: '100%', boxShadow: '0 2px 8px rgba(100,100,100,0.1)', mb: 2 },
    wrapper: { display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyContent: 'space-between' },
}