import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router';

import { Navigate, useNavigate } from 'react-router-dom';

import { Condominios, Divisas, Dashboard, Edificios, GastosComunes, GastosNoComunes, Proveedores, Unidades, Usuarios, Gastos, Pagos } from '../../pages/admin';

import { AuthContext } from '../../context/auth';

import { RegistrarEdificio } from '../../pages/admin/edificios/RegistrarEdificio';
import { MapearEdificio } from '../../pages/admin/edificios/MapearEdificio';
import { TiposDeUnidad } from '../../pages/admin/edificios/TiposDeUnidad';
import { Perfil } from '../../pages/client';
import { CondominiumAdd } from '../../pages/admin/condominio';
import { RegisterProvider } from '../../pages/admin/proveedores/RegisterProvider';

export const AdminRoutes = () => {
    const { authState } = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (!authState.role) {
            navigate('/');
        }
    }, [])
    return (
        authState.role?.description !== 'Cliente'
            ? (<Routes>
                <Route path='/admin/condominios' element={<Condominios />} />
                <Route path='/admin/condominios/agregar' element={<CondominiumAdd />} />
                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route path='/admin/divisas' element={<Divisas />} />
                <Route path='/admin/edificios' element={<Edificios />} />
                <Route path='/admin/edificios/registrar' element={<RegistrarEdificio />} />
                <Route path='/admin/edificios/mapear' element={<MapearEdificio />} />
                <Route path='/admin/edificios/tipos/unidad' element={<TiposDeUnidad />} />
                <Route path='/admin/gastos' element={<Gastos />} />
                <Route path='/admin/gastos/comunes' element={<GastosComunes />} />
                <Route path='/admin/gastos/nocomunes' element={<GastosNoComunes />} />
                <Route path='/admin/usuarios' element={<Usuarios />} />
                <Route path='/admin/unidades' element={<Unidades />} />
                <Route path='/admin/proveedores' element={<Proveedores />} />
                <Route path='/admin/proveedores/registrar' element={<RegisterProvider />} />
                <Route path='/admin/pagos' element={<Pagos />} />
                <Route path='/perfil' element={<Perfil />} />
            </Routes>)
            : (<Routes>
                <Route path='/admin/condominios' element={<Navigate to={'/'} />} />
                <Route path='/admin/condominios/agregar' element={<Navigate to={'/'} />} />
                <Route path='/admin/dashboard' element={<Navigate to={'/'} />} />
                <Route path='/admin/divisas' element={<Navigate to={'/'} />} />
                <Route path='/admin/edificios' element={<Navigate to={'/'} />} />
                <Route path='/admin/edificios/registrar' element={<Navigate to={'/'} />} />
                <Route path='/admin/edificios/mapear' element={<Navigate to={'/'} />} />
                <Route path='/admin/edificios/tipos/unidad' element={<Navigate to={'/'} />} />
                <Route path='/admin/gastos' element={<Gastos />} />
                <Route path='/admin/gastos/comunes' element={<Navigate to={'/'} />} />
                <Route path='/admin/gastos/nocomunes' element={<Navigate to={'/'} />} />
                <Route path='/admin/usuarios' element={<Navigate to={'/'} />} />
                <Route path='/admin/unidades' element={<Navigate to={'/'} />} />
                <Route path='/admin/pagos' element={<Navigate to={'/'} />} />
                <Route path='/admin/proveedores' element={<Navigate to={'/'} />} />
                <Route path='/admin/proveedores/registrar' element={<Navigate to={'/'} />} />
            </Routes>)
    )
}