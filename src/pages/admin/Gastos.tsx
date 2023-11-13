import { useContext, useEffect, useState } from "react";

import { Grid, Box, MenuItem, SelectChangeEvent, Divider } from "@mui/material";
import { red, amber } from "@mui/material/colors";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLongRounded';
import SearchRounded from "@mui/icons-material/SearchRounded";
import { ButtonCustom, SelectCustom, TypographyCustom } from "../../components/custom";

import { AuthContext } from "../../context/auth";
import { Layout } from "../../components/ui";
import { DescripcionDeVista, NoContentFound } from "../../components/ui/content";
import { OptionsList } from "../../components/ui/options";

import Swal from "sweetalert2";

import { baseUrl } from "../../common";
import { ICommonExpense, ICondominium, IUncommonExpense, Option } from '../../interfaces';

export const Gastos = () => {
    const [selectedExpense, setSelectedExpense] = useState<'Comunes' | 'No Comunes'>('Comunes')
    const [condominia, setCondominia] = useState<ICondominium[] | null>(null);
    const [selectedCondo, setSelectedCondo] = useState<ICondominium | 0>(0);
    const [commonExpenses, setCommonExpenses] = useState<ICommonExpense[] | null>(null)
    const [uncommonExpenses, setUncommonExpenses] = useState<IUncommonExpense[] | null>(null)
    const { authState } = useContext(AuthContext);
    const clientOptions: Option[] = [
        { text: 'Agregar Gastos Comunes', icon: <ReceiptLongIcon />, color: amber[400], path: '/admin/gastos/comunes' },
        { text: 'Agregar Gastos No Comunes', icon: <ReceiptLongIcon />, color: red[400], path: '/admin/gastos/nocomunes' },
    ];
    const getCondominia = async () => {
        const url = `${baseUrl}/condominium`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
        };
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setCondominia(data);
                    break;
                case 400:
                    break;
                default:
                    break;
            }
        } catch (error) {

        }
    }
    const getUncommonExpenses = async () => {
        const url = `${baseUrl}/uncommon_expense/${selectedCondo ? selectedCondo.id : ''}`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    console.log(data);
                    setUncommonExpenses(data);
                    break;
                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se logro conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se logro conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se logro conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
            }
        } catch (error) {
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
    const getExpenses = async () => {
        const url = `${baseUrl}/common_expense/${selectedCondo ? selectedCondo.id : ''}`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
        }
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setCommonExpenses(data);
                    break;
                case 400:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se logro conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                case 404:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se logro conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'No se logro conectar con el servidor',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    })
                    break;
            }
        } catch (error) {
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
    useEffect(() => {
        getCondominia()
    }, [])
    const styles = {
        box: {
            p: 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#FFF',
            boxShadow: '0 2px 8px rgba(100,100,100,0.1)',
            borderBottom: '2px solid transparent',
            transition: '0.5s ease all',
            cursor: 'pointer',
            '&:hover': {
                borderBottom: `2px solid lightgrey`,
                boxShadow: '1px 5px 8px rgba(0,0,0,0.2)'
            }
        },
        boxSelected: {
            p: 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#FFF',
            boxShadow: `0 2px 8px rgba(100,100,100,0.1)`,
            borderBottom: `2px solid ${authState.color}`,
            cursor: 'pointer',
            transition: '0.5s ease all',
            '&:hover': {
                borderBottom: `2px solid lightgrey`,
                boxShadow: '1px 5px 8px rgba(0,0,0,0.2)'
            }
        }
    }
    return (
        <Layout>
            <DescripcionDeVista description='Selecciona un tipo de gasto para agregar o consulta los gastos de un condominio' title="Gastos" />
            <OptionsList options={clientOptions} breakpoints={{ xs: 6 }} />
            <Grid container spacing={1} >
                <Grid item xs={12} >
                    <SelectCustom helpertext={""} label='Condominio' onChange={(e: SelectChangeEvent<any>) => {
                        const sel = condominia?.filter((condo) => Number(condo.id) === Number(e.target.value))[0];
                        setSelectedCondo(sel ? sel : 0);
                    }} value={selectedCondo ? selectedCondo.id : 0}>
                        <MenuItem value={'0'} disabled>Seleccione un condominio</MenuItem>
                        {condominia && condominia.map((condominium) => (
                            <MenuItem key={condominium.id} value={condominium.id}>{condominium.description}</MenuItem>
                        ))}
                    </SelectCustom>
                </Grid>
                <Grid item xs={12}>
                    <ButtonCustom startIcon={<SearchRounded />} onClick={() => {
                        getExpenses()
                        getUncommonExpenses()
                    }}>Buscar</ButtonCustom>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        {commonExpenses && commonExpenses.length > 0 && (
                            <>
                                <Box sx={selectedExpense === 'Comunes' ? styles.boxSelected : styles.box} onClick={() => setSelectedExpense('Comunes')}>
                                    <TypographyCustom variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>Gastos comunes</TypographyCustom>
                                </Box>
                                <Box sx={{ height: 55 }}>
                                    <Divider orientation='vertical' flexItem sx={{ height: '100%' }} />
                                </Box>
                            </>
                        )}
                        {uncommonExpenses && uncommonExpenses.length > 0 && (
                            <Box sx={selectedExpense === 'No Comunes' ? styles.boxSelected : styles.box} onClick={() => setSelectedExpense('No Comunes')}>
                                <TypographyCustom variant='subtitle2' sx={{ whiteSpace: 'nowrap' }}>Gastos no comunes</TypographyCustom>
                            </Box>)}
                    </Box>
                    {commonExpenses && commonExpenses.length === 0 && uncommonExpenses && uncommonExpenses.length === 0 && (
                        <NoContentFound title={"Sin gastos"} text={"No hay gastos registrados"} />
                    )}
                    {selectedExpense === 'Comunes' && commonExpenses && commonExpenses.map((expense) => (
                        <Box key={expense.id} sx={{ mb: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', p: 2, borderRadius: 3, background: '#FFF' }}>
                            <TypographyCustom variant='subtitle2'>{expense.description}</TypographyCustom>
                            <TypographyCustom variant='h6'>{`${expense.amount} ${expense.currency_type}`}</TypographyCustom>
                            {expense.currency_type === 'Bolivares' && (
                                <TypographyCustom variant='subtitle2' color='text.secondary'>{`${expense.currency.description}: ${(Number(expense.amount) / Number(expense.currency.value)).toFixed(2)} `}</TypographyCustom>

                            )}
                            {expense.currency_type === 'Dolares' && (
                                <TypographyCustom variant='subtitle2' color='text.secondary'>{`Bolivar: ${(Number(expense.amount) * Number(expense.currency.value)).toFixed(2)}`}</TypographyCustom>
                            )}

                        </Box>))}
                    {selectedExpense === 'No Comunes' && uncommonExpenses && uncommonExpenses.map((expense) => (
                        <Box key={expense.id} sx={{ mb: 2, boxShadow: '0 2px 8px rgba(100,100,100,0.1)', p: 2, borderRadius: 3, background: '#FFF' }}>
                            <TypographyCustom variant='subtitle2'>{expense.description}</TypographyCustom>
                            <TypographyCustom variant='h6'>{`${expense.amount} ${expense.currency_type}`}</TypographyCustom>
                            {expense.currency_type === 'Bolivares' && (
                                <TypographyCustom variant='subtitle2' color='text.secondary'>{`${expense.currency.description}: ${(Number(expense.amount) / Number(expense.currency.value)).toFixed(2)} `}</TypographyCustom>

                            )}
                            {expense.currency_type === 'Dolares' && (
                                <TypographyCustom variant='subtitle2' color='text.secondary'>{`Bolivar: ${(Number(expense.amount) * Number(expense.currency.value)).toFixed(2)}`}</TypographyCustom>
                            )}
                        </Box>

                    ))

                    }
                </Grid>
            </Grid>
        </Layout >
    )
}