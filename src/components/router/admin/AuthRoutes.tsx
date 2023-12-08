import { Routes, Route } from 'react-router-dom'
import { Users, RegisterMaster } from '../../../pages/admin/auth'
import { RegisterUser } from '../../../pages/admin/auth/RegisterUser'
import { Perfil } from '../../../pages/client'
import { Dashboard } from '../../../pages/admin'

export const AuthRoutes = () => {
    return <Routes>
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/users/add' element={<RegisterUser />} />
        <Route path='/admin/register/master' element={<RegisterMaster />} />
        <Route path='/perfil' element={<Perfil />} />
    </Routes>
}