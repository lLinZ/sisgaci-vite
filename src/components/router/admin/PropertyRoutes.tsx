import { Routes, Route } from 'react-router-dom'
import { PropertyTransactionTypes, CreatePropertyTransactionType } from '../../../pages/admin/property_transaction_types'
import { PropertyTypes, CreatePropertyType } from '../../../pages/admin/property_types'

export const PropertyRoutes = () => {
    return <Routes>
        <Route path='/admin/property/transaction/type' element={<PropertyTransactionTypes />} />
        <Route path='/admin/property/transaction/type/add' element={<CreatePropertyTransactionType />} />
        <Route path='/admin/property/type' element={<PropertyTypes />} />
        <Route path='/admin/property/type/add' element={<CreatePropertyType />} />
    </Routes>
}