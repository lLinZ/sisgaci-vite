import { useState, useContext, useEffect, ChangeEvent } from 'react';
import { Layout } from '../../components/ui';
import { DescripcionDeVista } from '../../components/ui/content';
import { baseUrl } from '../../common';
import { AuthContext } from '../../context/auth';
import { ICondominium, IProvider, IUnit } from '../../interfaces';
import Box from '@mui/material/Box';
import { ButtonCustom, SelectCustom, TextFieldCustom, TypographyCustom } from '../../components/custom';
import { Grid, MenuItem, SelectChangeEvent } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { errorArrayLaravelTransformToString } from '../../helpers/functions';
import Swal from 'sweetalert2';
interface SelectedCondominium {
    id: number;
    description: string;
    building_name: string;
}
interface SelectedUnit {
    id: number;
    name: string;
}
interface SelectedProvider {
    id: number;
    name: string;
    rif: string;
}
type ICurrencyType = 'Dolares' | 'Bolivares'
export const GastosNoComunes = () => {
    const [selectedProvider, setSelectedProvider] = useState<SelectedProvider>({
        id: 0,
        name: '',
        rif: '',
    });
    const [selectedCondo, setSelectedCondo] = useState<SelectedCondominium>({
        id: 0,
        description: '',
        building_name: '',
    });
    const [selectedUnit, setSelectedUnit] = useState<SelectedUnit>({
        id: 0,
        name: '',
    });
    const [amount, setAmount] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [currencyType, setCurrencyType] = useState<ICurrencyType>('Dolares');
    const [providers, setProviders] = useState<IProvider[] | null>(null);
    const [condominia, setCondominia] = useState<ICondominium[] | null>(null);
    const [units, setUnits] = useState<IUnit[] | null>(null);
    const { authState } = useContext(AuthContext);

    const getCondos = async () => {
        const url = `${baseUrl}/condominium`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            }
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
                case 404:
                    break;
                default:
                    break;
            }
        } catch (error) {

        }
    }
    const getProviders = async () => {
        const url = `${baseUrl}/provider`;
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            }
        };
        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    const { data } = await response.json();
                    setProviders(data);
                    break;
                case 400:
                    break;
                case 404:
                    break;
                default:
                    break;
            }
        } catch (error) {

        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value)
    }

    const onSubmit = async () => {
        const errors = [];
        if (!selectedCondo.id) {
            errors.push('Debe seleccionar un condominio');
        };
        if (!selectedProvider.id) {
            errors.push('Debe seleccionar un proveedor');
        };
        if (!selectedUnit.id) {
            errors.push('Debe seleccionar una unidad');
        };
        if (!description) {
            errors.push('Escriba una descripcion valida');
        };
        if (!amount) {
            errors.push('Escriba una cantidad valida');
        };
        if (errors.length > 0) {
            Swal.fire({
                title: 'Error',
                html: errorArrayLaravelTransformToString(errors),
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            return;
        };
        const body = new URLSearchParams();
        body.append('description', description);
        body.append('amount', amount.replace(/\,/g, ''));
        body.append('currency_type', currencyType);
        body.append('condominium_id', selectedCondo.id ? String(selectedCondo.id) : '');
        body.append('unit_id', selectedUnit.id ? String(selectedUnit.id) : '');
        body.append('provider_id', selectedProvider.id ? String(selectedProvider.id) : '');

        const url = `${baseUrl}/uncommon_expense`;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authState.token}`,
            },
            body
        };

        try {
            const response = await fetch(url, options);
            switch (response.status) {
                case 200:
                    Swal.fire({
                        title: 'Exito',
                        text: 'Se ha registrado el gasto comun',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    setDescription('');
                    setAmount('');
                    setUnits(null);
                    setSelectedCondo({
                        id: 0,
                        description: '',
                        building_name: '',
                    });
                    setSelectedProvider({
                        id: 0,
                        name: '',
                        rif: '',
                    });
                    setSelectedUnit({
                        id: 0,
                        name: ''
                    });
                    break;
                case 400:
                    const { errors } = await response.json();
                    console.log({ errors })
                    Swal.fire({
                        title: 'Error',
                        html: errorArrayLaravelTransformToString(errors),
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    break;
                default:
                    Swal.fire({
                        title: 'Error',
                        text: 'Ocurrio un error inesperado',
                        icon: 'error',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    break;
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No se logro conectar con el servidor',
                icon: 'error',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }
    const getUnits = async () => {
        if (!selectedCondo.id) return;
        const url = `${baseUrl}/condominium/${selectedCondo.id}/units`;
        const options = {
            method: 'GET',
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
                    setUnits(data)
                    break;
                case 400:
                    break;
                default:
                    break;
            }
        } catch (error) {

        }

    }
    useEffect(() => {
        getCondos();
        getProviders();
    }, [])
    useEffect(() => {
        getUnits();
    }, [selectedCondo])

    return (
        <Layout>
            <DescripcionDeVista title={'Gastos no comunes'} description={'Selecciona un condominio y empieza a añadir los gastos no comunes'} />
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextFieldCustom name='description' label='Descripcion' value={description} onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                    <SelectCustom helpertext='' label='Tipo de moneda' value={currencyType} onChange={(e: SelectChangeEvent<any>) => {
                        setCurrencyType(e.target.value)
                    }}>
                        <MenuItem value='0'>Seleccione un tipo de moneda</MenuItem>
                        <MenuItem value='Dolares'>Dolares ($)</MenuItem>
                        <MenuItem value='Bolivares'>Bolivares (Bs)</MenuItem>
                    </SelectCustom>
                </Grid>
                <Grid item xs={6}>
                    <NumericFormat
                        label='Monto'
                        name="amount"
                        customInput={TextFieldCustom}
                        onChange={handleChange}
                        fixedDecimalScale
                        valueIsNumericString={true}
                        thousandSeparator={true}
                        value={amount}
                        decimalScale={2}
                        helperText={''}
                    />
                </Grid>

                <Grid item xs={12}>
                    <SelectCustom helpertext={''} value={selectedProvider.id} label='Proveedor' onChange={(e) => {
                        const value = e.target.value;
                        const providerFilter = providers?.filter((provider: IProvider) => Number(provider.id) === Number(value))[0];
                        const sel = providerFilter
                            ? {
                                id: providerFilter.id,
                                name: providerFilter.name,
                                rif: providerFilter.rif
                            }
                            : {
                                id: 0,
                                name: '',
                                rif: '',
                            };
                        setSelectedProvider(sel);
                    }}>
                        <MenuItem value='0' disabled>Seleccione un proveedor</MenuItem>
                        {providers && providers.map((provider) => (
                            <MenuItem value={provider.id} key={provider.id}>
                                <Box sx={{ display: 'flex', flexFlow: 'column wrap' }}>
                                    <TypographyCustom>{provider.name}</TypographyCustom>
                                    <TypographyCustom variant='subtitle2' color='text.secondary'>{provider.rif}</TypographyCustom>
                                </Box>
                            </MenuItem>
                        ))}
                        {!providers && (<MenuItem disabled>No hay proveedores disponibles</MenuItem>)}
                    </SelectCustom>
                </Grid>
                <Grid item xs={12}>
                    <SelectCustom helpertext={''} value={selectedCondo.id} label='Condominio' onChange={(e) => {
                        const value = e.target.value;
                        const condoFiltered = condominia?.filter((condo: ICondominium) => Number(condo.id) === Number(value))[0];
                        const sel = condoFiltered
                            ? {
                                id: condoFiltered.id,
                                description: condoFiltered.description,
                                building_name: condoFiltered.building.name
                            }
                            : {
                                id: 0,
                                description: '',
                                building_name: '',
                            };
                        setSelectedCondo(sel);
                    }}>
                        <MenuItem value='0' disabled>Seleccione un condominio</MenuItem>
                        {condominia && condominia.map((condo) => (
                            <MenuItem value={condo.id} key={condo.id}>{condo.description}</MenuItem>
                        ))}
                    </SelectCustom>
                </Grid>
                {units && (
                    <Grid item xs={12}>
                        <SelectCustom value={selectedUnit.id} label='Unidad' helpertext='' onChange={(e) => {
                            const value = e.target.value;
                            const unitFiltered = units.filter((unit: IUnit) => Number(unit.id) === Number(value))[0];
                            const sel = unitFiltered
                                ? {
                                    id: unitFiltered.id,
                                    name: unitFiltered.name,
                                } :
                                {
                                    id: 0,
                                    name: '',
                                };
                            setSelectedUnit(sel);
                        }}>
                            <MenuItem value='0' disabled>Seleccione una unidad</MenuItem>
                            {units.map((unit) => (
                                <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
                            ))}
                        </SelectCustom>
                    </Grid>
                )
                }
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <ButtonCustom onClick={onSubmit}>Registrar Gasto</ButtonCustom>
                </Grid>

            </Grid>
        </Layout>
    )
}