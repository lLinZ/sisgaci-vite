import { Layout } from "../../../components/ui"
import { DescripcionDeVista } from "../../../components/ui/content"
import { OptionsList } from "../../../components/ui/options"
import { IAcquisition, Option } from "../../../interfaces"
import { green, blue } from "@mui/material/colors"
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined"
import SettingsRounded from "@mui/icons-material/SettingsRounded"
import { useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { baseUrl } from "../../../common"
import { AuthContext } from "../../../context/auth"
import { ApartmentCharacteristics, LandCharacteristics, QuintCharacteristics, ShedCharacteristics, ShopCharacteristics } from "../../../components/admin/acquistions/forms"
import { Box, Grid } from "@mui/material"
import { ButtonCustom } from "../../../components/custom"


export const EditAcquisition = () => {
    /**
     * Opciones del menu de navegacion superior
     */
    const options: Option[] = [
        { text: 'Agregar captacion', path: '/admin/acquisitions/add', icon: <BusinessCenterOutlined /> },
        { text: 'Tipos de inmueble y transaccion', path: '/admin/property', icon: <SettingsRounded /> },
    ]

    const { id } = useParams();

    const router = useNavigate();
    return (
        <Layout>
            <DescripcionDeVista title={'Editar caracteristicas'} description={'Termina de completar la informacion de la captacion'} />
            <OptionsList options={options} breakpoints={{ xs: 12, sm: 6, md: 6, lg: 6 }} />
            <Grid container sx={{ mb: 5, mt: 3 }} gap={3}>
                <Grid item xs={12}>
                    <ButtonCustom onClick={() => router(`/admin/acquisition/edit/${id}/characteristics`)} variant="outlined">Caracteristicas</ButtonCustom>
                </Grid>
                <Grid item xs={12}>
                    <ButtonCustom onClick={() => router(`/admin/acquisition/edit/${id}/information`)} variant="outlined">Informacion</ButtonCustom>
                </Grid>
                <Grid item xs={12}>
                    <ButtonCustom onClick={() => router(`/admin/acquisition/edit/${id}/images`)} variant="outlined">Imagenes</ButtonCustom>
                </Grid>
                <Grid item xs={12}>
                    <ButtonCustom onClick={() => router(`/admin/acquisition/edit/${id}/owner`)} variant="outlined">Propietarios</ButtonCustom>
                </Grid>

                {/* {acquisition && acquisition.property_type.description === 'Apartamento' && (<ApartmentCharacteristics id={1} characteristics={{}} />)}
                {acquisition && (acquisition.property_type.description === 'Quinta' || acquisition.property_type.description === 'Townhouse') && (<QuintCharacteristics id={1} caracteristicas={{}} />)}
                {acquisition && (acquisition.property_type.description === 'Local' || acquisition.property_type.description === 'Oficina') && (<ShopCharacteristics id={1} caracteristicas={{}} />)}
                {acquisition && (acquisition.property_type.description === 'Terreno' || acquisition.property_type.description === 'Parcela') && (<LandCharacteristics id={1} caracteristicas={{}} />)}
                {acquisition && acquisition.property_type.description === 'Galpon' && (<ShedCharacteristics id={1} caracteristicas={{}} />)} */}

            </Grid>
        </Layout >
    )
}