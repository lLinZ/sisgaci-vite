import { LoadingButton } from '@mui/lab';
import { Grid, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, MenuItem, Select, Box } from '@mui/material';
import { FormikValues, Formik, Form } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import Swal from 'sweetalert2';
import { ButtonCustom, RadioGroupCustom, SelectCustom, TextFieldCustom } from '../../../custom';
import { NumericFormat } from 'react-number-format';
const initialValues = {
    construction_meters: '',
    air_conditioning: '',
    balcony: '',
    bathrooms: '',
    fitted_kitchen: '',
    studio: '',
    bedrooms: '',
    hall: '',
    laundry: '',
    office: '',
    jacuzzi: '',
    pantry: '',
    pool: '',
    phone: '',
    levels: '',
    ground_floor: '',
    living_room: '',
    water_tank: '',
    tavern: '',
    terrace: '',
    surveillance: '',
    floor_type: '',
    floor_number: '',
    floor_quantity: '',
    doors_type: '',
    antiquity_type: '',
    antiquity: '',
    others: '',
}
interface Props {
    id: number;
    characteristics: any;
}
type RadiosApartamento = {
    air_conditioning: string;
    balcony: string;
    bathrooms: string;
    fitted_kitchen: string;
    studio: string;
    bedrooms: string;
    hall: string;
    laundry: string;
    office: string;
    jacuzzi: string;
    pantry: string;
    pool: string;
    ground_floor: string;
    living_room: string;
    water_tank: string;
    tavern: string;
    terrace: string;
    surveillance: string;
}
export const ApartmentCharacteristics: FC<Props> = ({ id, characteristics }) => {
    const [radios, setRadios] = useState<RadiosApartamento>({
        air_conditioning: characteristics?.air_conditioning ? characteristics?.air_conditioning : "0",
        balcony: characteristics?.balcony ? characteristics?.balcony : "0",
        bathrooms: characteristics?.bathrooms ? characteristics?.bathrooms : "0",
        fitted_kitchen: characteristics?.fitted_kitchen ? characteristics?.fitted_kitchen : "0",
        studio: characteristics?.studio ? characteristics?.studio : "0",
        bedrooms: characteristics?.bedrooms ? characteristics?.bedrooms : "0",
        hall: characteristics?.hall ? characteristics?.hall : "0",
        laundry: characteristics?.laundry ? characteristics?.laundry : "0",
        jacuzzi: characteristics?.jacuzzi ? characteristics?.jacuzzi : "0",
        office: characteristics?.office ? characteristics?.office : "0",
        pantry: characteristics?.pantry ? characteristics?.pantry : "0",
        pool: characteristics?.pool ? characteristics?.pool : "0",
        ground_floor: characteristics?.ground_floor ? characteristics?.ground_floor : "0",
        living_room: characteristics?.living_room ? characteristics?.living_room : "0",
        water_tank: characteristics?.water_tank ? characteristics?.water_tank : "0",
        tavern: characteristics?.tavern ? characteristics?.tavern : "0",
        terrace: characteristics?.terrace ? characteristics?.terrace : "0",
        surveillance: characteristics?.surveillance ? characteristics?.surveillance : "0",
    });

    const onSubmit = async (values: FormikValues) => {

        alert('sdadsaad')
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => onSubmit(values)}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
        >

            {({ values, errors, touched, isSubmitting, handleSubmit, handleChange }) => (

                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={2} display="flex">
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextFieldCustom label="Metraje de construccion" value={values.construction_meters} name="construction_meters" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextFieldCustom label="Numero de piso" value={values.floor_number} name="floor_number" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextFieldCustom label="Cantidad de pisos" value={values.floor_quantity} name="floor_quantity" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Planta baja' value={values.ground_floor} name='ground_floor' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Oficina' value={values.office} name='office' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Telefono' value={values.phone} name='phone' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Niveles' value={values.levels} name='levels' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Lavandero' value={values.laundry} name='laundry' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Jacuzzi' value={values.jacuzzi} name='jacuzzi' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <NumericFormat
                                label='Habitaciones'
                                name="bedrooms"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.bedrooms}
                                allowLeadingZeros={false}
                                error={errors.bedrooms && touched.bedrooms ? true : false}
                                helperText={errors.bedrooms && touched.bedrooms ? errors.bedrooms : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Habitacion de servicio' name='service_room' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <NumericFormat
                                label='Baños'
                                name="bathrooms"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.bathrooms}
                                allowLeadingZeros={false}
                                error={errors.bathrooms && touched.bathrooms ? true : false}
                                helperText={errors.bathrooms && touched.bathrooms ? errors.bathrooms : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='A/A' value={values.air_conditioning} name='air_conditioning' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection={'column'}>
                            <RadioGroupCustom label='Vigilancia' value={values.surveillance} name='surveillance' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Sala de estar' value={values.living_room} name='living_room' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Balcon' value={values.balcony} name='balcony' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Hall' value={values.hall} name='hall' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Tasca' value={values.tavern} name='tavern' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Pantry' value={values.pantry} name='pantry' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Estudio' value={values.studio} name='studio' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Terraza' value={values.terrace} name='terrace' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Piscina' value={values.pool} name='pool' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <RadioGroupCustom label='Tanque' value={values.water_tank} name='water_tank' options={[{ value: '0', label: 'No' }, { value: '1', label: 'Si' },]} onChange={handleChange} defaultvalue={'0'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextFieldCustom label="Tipo de puertas" value={values.doors_type} name="doors_type" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <SelectCustom label='Tipo de antigüedad' value={values.antiquity_type} name="antiquity_type" onChange={handleChange} helpertext={''}>
                                <MenuItem value='1'>Meses</MenuItem>
                                <MenuItem value='2'>Años</MenuItem>
                            </SelectCustom>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <NumericFormat
                                label='Antigüedad'
                                name="antiquity"
                                customInput={TextFieldCustom}
                                onChange={handleChange}
                                valueIsNumericString={true}
                                value={values.antiquity}
                                allowLeadingZeros={false}
                                error={errors.antiquity && touched.antiquity ? true : false}
                                helperText={errors.antiquity && touched.antiquity ? errors.antiquity : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextFieldCustom label="Tipo de piso" value={values.floor_type} name="floor_type" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                            <TextFieldCustom label="Otros" value={values.others} name="others" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} display="flex" alignItems="center" justifyContent="center">
                            <ButtonCustom type="submit">Registrar datos</ButtonCustom>
                        </Grid>
                    </Grid>
                </Form>
            )
            }
        </Formik >
    )
}
