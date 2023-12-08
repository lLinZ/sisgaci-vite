import { Routes, Route } from 'react-router-dom'
import { Calls, CallsSearch, RegisterCall } from '../../../pages/admin/calls'
import { Clients, RegisterClient } from '../../../pages/admin/clients'

export const CallRoutes = () => {
    return <Routes>
        <Route path='/admin/calls/search' element={<CallsSearch />} />
        <Route path='/admin/calls' element={<Calls />} />
        <Route path='/admin/calls/add' element={<RegisterCall />} />
        <Route path='/admin/clients' element={<Clients />} />
        <Route path='/admin/clients/add' element={<RegisterClient />} />
    </Routes>
}