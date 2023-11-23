// React
import { Dispatch, FC, FormEvent } from 'react'

// MUI
import { Grid, Box, Autocomplete, MenuItem, Typography } from '@mui/material';

// Formik
import { FormikErrors, FormikTouched, Form } from 'formik';

// Custom components
import { TextFieldCustom, SelectCustom, ButtonCustom, TypographyCustom } from '../../custom';
import { CalendarCustom } from '../../custom/CalendarCustom';

// Others
import { countriesArray } from '../../../common';
import { NumericFormat } from 'react-number-format';

// Types
import { IValuesCall } from '../../../pages/admin/calls';

interface Props {
    handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    };
    values: IValuesCall;
    errors: FormikErrors<IValuesCall>;
    touched: FormikTouched<IValuesCall>;
    setCountryCode: Dispatch<any>;
    setBirthday: Dispatch<any>;
}
export const CallForm: FC<Props> = ({ handleSubmit, handleChange, values, errors, touched, setCountryCode, setBirthday }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 5 }}>
                <Grid item xs={12}>
                    <TypographyCustom variant="overline">Telefono principal</TypographyCustom>
                    <Box sx={{ display: 'flex' }}>
                        <Autocomplete
                            disablePortal
                            options={countriesArray}
                            onChange={(event: any, newValue: any) => {
                                setCountryCode(newValue ? newValue.code : null);
                            }}
                            renderOption={(props, option) => (
                                <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                    <img
                                        loading='lazy'
                                        width='20'
                                        srcSet={`https://flagcdn.com/w40/${option.alpha2.toLowerCase()}.png 2x`}
                                        src={`https://flagcdn.com/w20/${option.alpha2.toLowerCase()}.png`}
                                        alt='Bandera de pais'
                                    />
                                    {option.label}
                                </Box>
                            )}
                            sx={{ width: 250, mr: 0.5 }}
                            renderInput={(params) => <TextFieldCustom {...params} label='Pais' />}
                        />

                        <NumericFormat
                            label='Telefono'
                            name='phone'
                            customInput={TextFieldCustom}
                            onChange={handleChange}
                            allowNegative={false}
                            allowLeadingZeros={false}
                            valueIsNumericString={false}
                            thousandSeparator={false}
                            decimalScale={0}
                            value={values.phone}
                            fixedDecimalScale={false}
                            error={errors.phone && touched.phone ? true : false}
                            helperText={errors.phone && touched.phone ? errors.phone : ''}
                        />
                    </Box>
                </Grid>

                {/* 
                    -------------------
                    Datos de Cliente
                    ------------------- 
                */}
                <Grid item xs={12}>
                    <TypographyCustom variant="overline">Datos del cliente</TypographyCustom>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldCustom label={'Primer Nombre'} value={values.first_name} name='first_name' onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldCustom label={'Segundo Nombre'} value={values.middle_name} name='middle_name' onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldCustom label={'Primer Apellido'} value={values.lastname} name='lastname' onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldCustom label={'Segundo Apellido'} value={values.second_lastname} name='second_lastname' onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectCustom value={values.nationality} name='nationality' label='Nacionalidad' helpertext={''} onChange={handleChange}>
                        <MenuItem value='0' disabled>Seleccione una nacionalidad</MenuItem>
                        <MenuItem value='Venezolano'>Venezolano(a)</MenuItem>
                        <MenuItem value='Extranjero'>Extranjero(a)</MenuItem>
                        <MenuItem value='Juridico'>Juridico</MenuItem>
                    </SelectCustom>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <NumericFormat
                        label='Cedula'
                        name='document'
                        customInput={TextFieldCustom}
                        onChange={handleChange}
                        allowNegative={false}
                        allowLeadingZeros={false}
                        valueIsNumericString={false}
                        thousandSeparator={false}
                        decimalScale={0}
                        value={values.document}
                        fixedDecimalScale={false}
                        error={errors.document && touched.document ? true : false}
                        helperText={errors.document && touched.document ? errors.document : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectCustom value={values.gender} name='gender' label='Genero' helpertext={''} onChange={handleChange}>
                        <MenuItem value='0' disabled>Seleccione un genero</MenuItem>
                        <MenuItem value='Masculino'>Masculino</MenuItem>
                        <MenuItem value='Femenino'>Femenino</MenuItem>
                    </SelectCustom>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectCustom value={values.marital_status} name='marital_status' label='Estado civil' helpertext={''} onChange={handleChange}>
                        <MenuItem value='0' disabled>Seleccione un estado civil</MenuItem>
                        <MenuItem value='Soltero'>Soltero(a)</MenuItem>
                        <MenuItem value='Divorciado'>Divorciado(a)</MenuItem>
                        <MenuItem value='Concubino'>Concubino(a)</MenuItem>
                        <MenuItem value='Viudo'>Viudo(a)</MenuItem>
                        <MenuItem value='Juridica'>Juridica</MenuItem>
                    </SelectCustom>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CalendarCustom setValue={setBirthday} rest={{ disableFuture: true, label: 'Fecha de nacimiento' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldCustom label={'Correo'} value={values.email} name='email' onChange={handleChange} />
                </Grid>

                {/* 
                    -------------------
                    Datos de llamada
                    ------------------- 
                */}
                <Grid item xs={12}>
                    <TypographyCustom variant="overline">Datos de la llamada</TypographyCustom>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SelectCustom value={values.origin} name='origin' label='Origen' helpertext={''} onChange={handleChange}>
                        <MenuItem value='0' disabled>Seleccione un origen</MenuItem>
                        <MenuItem value='Instagram'>Instagram</MenuItem>
                        <MenuItem value='Correo'>Correo</MenuItem>
                        <MenuItem value='Facebook'>Facebook</MenuItem>
                        <MenuItem value='Twitter'>Twitter</MenuItem>
                        <MenuItem value='Telefono'>Telefono</MenuItem>
                        <MenuItem value='Guardia'>Guardia</MenuItem>
                        <MenuItem value='Otros'>Otros</MenuItem>
                    </SelectCustom>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <SelectCustom value={values.zone} name='zone' label='Zona' helpertext={''} onChange={handleChange}>
                        <MenuItem value='0' disabled>Seleccione una zona</MenuItem>
                        <MenuItem value='San Diego'>San Diego</MenuItem>
                        <MenuItem value='Los Guayos'>Los Guayos</MenuItem>
                        <MenuItem value='Valencia'>Valencia</MenuItem>
                        <MenuItem value='Prebo'>Prebo</MenuItem>
                        <MenuItem value='El Trigal'>El Trigal</MenuItem>
                        <MenuItem value='La Trigaleña'>La Trigaleña</MenuItem>
                        <MenuItem value='Chimeneas'>Chimeneas</MenuItem>
                        <MenuItem value='La Isabelica'>La Isabelica</MenuItem>
                        <MenuItem value='Norte de valencia'>Norte de valencia</MenuItem>
                        <MenuItem value='Sur de valencia'>Sur de valencia</MenuItem>
                        <MenuItem value='Este de valencia'>Este de valencia</MenuItem>
                        <MenuItem value='Oeste de valencia'>Oeste de valencia</MenuItem>
                    </SelectCustom>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <SelectCustom value={values.property_type} name='property_type' label='Tipo de inmueble' helpertext={''} onChange={handleChange}>
                        <MenuItem value='0' disabled>Seleccione un tipo de inmueble</MenuItem>
                        <MenuItem value='Apartamento'>Apartamento</MenuItem>
                        <MenuItem value='Quinta'>Quinta</MenuItem>
                        <MenuItem value='Townhouse'>Townhouse</MenuItem>
                        <MenuItem value='Local'>Local</MenuItem>
                        <MenuItem value='Oficina'>Oficina</MenuItem>
                        <MenuItem value='Galpon'>Galpon</MenuItem>
                        <MenuItem value='Terreno'>Terreno</MenuItem>
                        <MenuItem value='Parcela'>Parcela</MenuItem>
                        <MenuItem value='Hacienda'>Hacienda</MenuItem>
                        <MenuItem value='Maletero'>Maletero</MenuItem>
                        <MenuItem value='Estacionamiento'>Estacionamiento</MenuItem>
                        <MenuItem value='Negocio'>Negocio</MenuItem>
                    </SelectCustom>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextFieldCustom label={'Inmueble especifico'} value={values.property} name='property' onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectCustom value={values.call_purpose} name='call_purpose' label='Motivo de llamada' helpertext={''} onChange={handleChange}>
                        <MenuItem value='0' disabled>Seleccione un motivo</MenuItem>
                        <MenuItem value='Captacion Alquiler'>Captacion Alquiler</MenuItem>
                        <MenuItem value='Alquiler'>Alquiler</MenuItem>
                        <MenuItem value='Captacion Venta'>Captacion Venta</MenuItem>
                        <MenuItem value='Venta'>Venta</MenuItem>
                        <MenuItem value='Colocacion'>Colocacion</MenuItem>
                    </SelectCustom>
                </Grid>
                <Grid item xs={12}>
                    <TextFieldCustom multiline label='Comentario' value={values.feedback} name={'feedback'} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                    <ButtonCustom type='submit'>Registrar llamada</ButtonCustom>
                </Grid>
            </Grid>
        </Form>
    )
}
