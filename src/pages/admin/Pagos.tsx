import { Layout } from '../../components/ui'
import { DescripcionDeVista } from '../../components/ui/content'
import { PaymentList } from '../../components/admin/payment'

export const Pagos = () => (
    <Layout>
        <DescripcionDeVista title={'Pagos'} description={'Interfaz para aprobar o rechazar pagos'} />
        <PaymentList />
    </Layout>
)