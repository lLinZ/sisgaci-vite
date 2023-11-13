import { Box, Grid } from "@mui/material"
import { Layout } from "../../../components/ui"
import { DescripcionDeVista } from "../../../components/ui/content/DescripcionDeVista"

export const InfoPago = () => {
  return (
    <Layout>
      <DescripcionDeVista title='Lista de pagos' description='Obten informacion de tus pagos realizados' />
      <Box>
        <Grid container spacing={1}>
          <Grid item>

          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}