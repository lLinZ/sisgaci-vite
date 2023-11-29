import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router';

import { Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import { Perfil } from '../../pages/client';
import { RegisterMaster, Users } from '../../pages/admin/auth'
import { Dashboard } from '../../pages/admin';
import { RegisterUser } from '../../pages/admin/auth/RegisterUser';
import { Departments, RegisterDepartment } from '../../pages/admin/departments';
import { Calls, RegisterCall } from '../../pages/admin/calls';
import { Clients, RegisterClient } from '../../pages/admin/clients';
import { CallsSearch } from '../../pages/admin/calls/CallsSearch';

export const AdminRoutes = () => {
    const { authState } = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (!authState.role) {
            navigate('/');
        }
    }, [])
    return (
        authState.role?.description == 'Master'
            ? (<Routes>
                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route path='/admin/users' element={<Users />} />
                <Route path='/admin/users/add' element={<RegisterUser />} />
                <Route path='/admin/register/master' element={<RegisterMaster />} />
                <Route path='/admin/departments' element={<Departments />} />
                <Route path='/admin/department/add' element={<RegisterDepartment />} />
                <Route path='/admin/calls/search' element={<CallsSearch />} />
                <Route path='/admin/calls' element={<Calls />} />
                <Route path='/admin/calls/add' element={<RegisterCall />} />
                <Route path='/admin/clients' element={<Clients />} />
                <Route path='/admin/clients/add' element={<RegisterClient />} />
                <Route path='/perfil' element={<Perfil />} />
            </Routes>)
            : (<Routes>
                <Route path='/admin/dashboard' element={<Navigate to={'/'} />} />
                <Route path='/admin/users' element={<Navigate to={'/'} />} />
                <Route path='/admin/users/add' element={<Navigate to={'/'} />} />
                <Route path='/admin/register/master' element={<Navigate to={'/'} />} />
                <Route path='/admin/departments' element={<Navigate to={'/'} />} />
                <Route path='/admin/department/add' element={<Navigate to={'/'} />} />
                <Route path='/admin/calls' element={<Navigate to={'/'} />} />
                <Route path='/admin/calls/add' element={<Navigate to={'/'} />} />
                <Route path='/admin/clients' element={<Navigate to={'/'} />} />
                <Route path='/admin/clients/add' element={<Navigate to={'/'} />} />
            </Routes>)
    )
}