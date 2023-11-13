import { Dispatch, useContext, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import grey from "@mui/material/colors/grey";
import green from "@mui/material/colors/green";

import CloseRounded from "@mui/icons-material/CloseRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import { Layout } from "../../../components/ui"
import { DescripcionDeVista } from "../../../components/ui/content"
import { OptionsList } from "../../../components/ui/options"
import { baseUrl } from "../../../common";
import { AuthContext } from "../../../context/auth";
import { ButtonCustom, SelectCustom, TextFieldCustom, TypographyCustom } from "../../../components/custom";

import { IBuilding, Option } from "../../../interfaces"

import Swal from "sweetalert2";
import { CircularProgress, Grid, MenuItem, SelectChangeEvent } from "@mui/material";
import { errorArrayLaravelTransformToString } from "../../../helpers/functions";

export const CondominiumAdd = () => {

    const options: Option[] = [
        { text: 'Condominios', icon: <CalendarMonthRounded />, color: green[400], path: '/admin/condominios' },
    ];
    const [month, setMonth] = useState<string>('0')
    const [description, setDescription] = useState<string>('')
    const [selectedBuilding, setSelectedBuilding] = useState<{ id: number; name: string; } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { authState } = useContext(AuthContext);

    const handleChange = (e: SelectChangeEvent<any>) => {
        setMonth(e.target.value);
    }
    const months = [
        { text: 'Enero', number: 1 },
        { text: 'Febrero', number: 2 },
        { text: 'Marzo', number: 3 },
        { text: 'Abril', number: 4 },
        { text: 'Mayo', number: 5 },
        { text: 'Junio', number: 6 },
        { text: 'Julio', number: 7 },
        { text: 'Agosto', number: 8 },
        { text: 'Septiembre', number: 9 },
        { text: 'Octubre', number: 10 },
        { text: 'Noviembre', number: 11 },
        { text: 'Diciembre', number: 12 },
    ];
    const createCondominium = async () => {
        const year = new Date().getFullYear();
        const body = new URLSearchParams();
        body.append('year', String(year));
        body.append('month', month);
        body.append('description', description);
        body.append('building_id', selectedBuilding ? String(selectedBuilding.id) : '');

        const url = `${baseUrl}/condominium`;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
            body
        }
        try {
            setLoading(true);
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    Swal.fire({
                        title: 'Exito',
                        text: 'Se ha creado el condominio',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    setDescription('');
                    setSelectedBuilding(null);
                    setMonth('0');
                    break;
                case 400:
                    const { errors } = await response.json();
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    });
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se encuentra el edificio',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                default:
                    break;
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    const getMonth = () => {
        const actualDate = new Date();
        const actualMonth = actualDate.getMonth() + 1;
        return actualMonth;
    }
    return (
        <Layout>
            <DescripcionDeVista title={'Agregar condominio'} description={'Interfaz para agregar un condominio a un edificio'} />
            <OptionsList options={options} breakpoints={{ xs: 12 }} />
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12}>
                    <TextFieldCustom label='Descripcion' value={description} onChange={(e) => setDescription(e.target.value)} />
                </Grid>
                <BuildingDialog state={selectedBuilding} setState={setSelectedBuilding} />
                <Grid item xs={12}>
                    <SelectCustom
                        label='Mes'
                        value={month}
                        onChange={handleChange}
                        helpertext={""}
                    >
                        <MenuItem value={'0'} disabled>
                            Seleccione un mes
                        </MenuItem>
                        {months.map((mes) => mes.number >= getMonth() && (
                            <MenuItem value={mes.text} key={mes.number}>{mes.text}</MenuItem>
                        ))}
                    </SelectCustom>
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <ButtonCustom onClick={createCondominium} disabled={loading}>Crear condominio</ButtonCustom>
                </Grid>
            </Grid>
        </Layout>
    )
}
interface PropsDialog {
    state: { id: number; name: string; } | null;
    setState: Dispatch<any>;
}
const BuildingDialog = ({ state, setState }: PropsDialog) => {
    const [open, setOpen] = useState<boolean>(false);
    const [buildings, setBuildings] = useState<IBuilding[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false);

    const { authState } = useContext(AuthContext);

    const getBuildings = async () => {
        const url = `${baseUrl}/buildings`;
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
                    setBuildings(data)
                    break;
                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'Error de validacion',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
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
            })
        } finally {
            setLoading(false);
        }
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleSelect = (id: number, name: string) => {
        setState({ id, name });
        handleClose();
    }
    useEffect(() => {
        getBuildings();
    }, [])

    return (
        <>
            <Grid item xs={12}>
                {state && (
                    <Box>
                        <TypographyCustom variant='h6' fontWeight='bold'>Edificio seleccionado</TypographyCustom>
                        <TypographyCustom color='text.secondary'>#ID: {state?.id}</TypographyCustom>
                        <TypographyCustom color='text.secondary'>{state?.name}</TypographyCustom>
                    </Box>
                )}
            </Grid>
            <Grid item xs={12}>
                <ButtonCustom
                    onClick={handleOpen}
                    variant={state ? 'contained' : 'outlined'}
                >
                    {state ? 'Cambiar edificio' : 'Seleccionar edificio'}
                </ButtonCustom>
            </Grid>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <Toolbar sx={{ background: grey[900], mb: 2 }}>
                    <Box sx={styles.toolbarDialog}>
                        <TypographyCustom color='common.white'>Seleccionar edificio</TypographyCustom>
                        <IconButton sx={{ color: '#FFF' }} onClick={handleClose}>
                            <CloseRounded />
                        </IconButton>
                    </Box>
                </Toolbar>
                {loading
                    ? (<Box sx={styles.loading}><CircularProgress /></Box>)
                    : (<Box sx={styles.bodyDialog}>
                        {buildings && buildings.map((building) => (
                            <Box sx={styles.item}>
                                <TypographyCustom>{building.name}</TypographyCustom>
                                <IconButton
                                    onClick={() => handleSelect(building.id, building.name)}
                                    color={state && state.id === building.id ? 'success' : 'default'}
                                    sx={{ color: state && state.id === building.id ? authState.color : grey[600] }}
                                >
                                    {state && state.id === building.id
                                        ? (<RadioButtonCheckedIcon />)
                                        : (<RadioButtonUncheckedIcon />)
                                    }
                                </IconButton>
                            </Box>
                        ))}
                    </Box>)}
            </Dialog>
        </>
    )
}
const styles = {
    toolbarDialog: { display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
    bodyDialog: { width: '80%', margin: 'auto', minHeight: '100vh', height: '100%' },
    item: { mb: 2, width: '100%', p: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', display: 'flex', justifyContent: 'space-between' },
    loading: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }
}