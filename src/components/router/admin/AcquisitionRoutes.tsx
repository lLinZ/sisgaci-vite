import { Routes, Route } from 'react-router-dom'
import { Acquisitions, CreateAcquisition } from '../../../pages/admin/acquisitions'

export const AcquisitionRoutes = () => {
    return <Routes>
        <Route path='/admin/acquisitions' element={<Acquisitions />} />
        <Route path='/admin/acquisitions/add' element={<CreateAcquisition />} />
    </Routes>
}