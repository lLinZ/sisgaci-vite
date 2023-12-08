import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router';

import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { AuthRoutes, CallRoutes, DepartmentRoutes, PropertyRoutes } from './admin';

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
            ? (
                <>
                    {/* CALLS & CLIENTS */}
                    <CallRoutes />

                    {/* AUTHENTICATION */}
                    <AuthRoutes />

                    {/* DEPARTMENTS */}
                    <DepartmentRoutes />

                    {/* PROPERTIES */}
                    <PropertyRoutes />
                </>
            )
            : (<GTFORoutes />)
    )
}



const GTFORoutes = () => {
    return (
        <Routes>
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
        </Routes>
    )
}