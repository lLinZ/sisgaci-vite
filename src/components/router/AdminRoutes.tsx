import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router';

import { Navigate, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import { Perfil } from '../../pages/client';
import { RegisterMaster, Users } from '../../pages/admin/auth'
import { Dashboard } from '../../pages/admin';

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
                <Route path='/admin/register/master' element={<RegisterMaster />} />
                <Route path='/perfil' element={<Perfil />} />
            </Routes>)
            : (<Routes>
                <Route path='/admin/dashboard' element={<Navigate to={'/'} />} />
                <Route path='/admin/users' element={<Navigate to={'/'} />} />
                <Route path='/admin/register/master' element={<Navigate to={'/'} />} />
            </Routes>)
    )
}