import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { Dashboard, Pagos, Perfil } from '../../pages/client'
import { InfoPago } from '../../pages/client/pagos/InfoPago'
import { RegistrarPago } from '../../pages/client/pagos/RegistrarPago'
import { AuthContext } from '../../context/auth'
import { Navigate, useNavigate } from 'react-router-dom'

export const ClientRoutes = () => {

  const { authState } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (!authState.role) {
      navigate('/');
    }
  }, [])
  return (
    authState.role?.description === 'Cliente' ?
      (<Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/pagos' element={<Pagos />} />
        <Route path='/pagos/lista' element={<InfoPago />} />
        <Route path='/pagos/registrar' element={<RegistrarPago />} />
        <Route path='/perfil' element={<Perfil />} />
      </Routes>)
      :
      (<Routes>
        <Route path='/dashboard' element={<Navigate to={'/'} />} />
        <Route path='/pagos' element={<Navigate to={'/'} />} />
        <Route path='/pagos/lista' element={<Navigate to={'/'} />} />
        <Route path='/pagos/registrar' element={<Navigate to={'/'} />} />
        {/* <Route path='/perfil' element={<Navigate to={'/'} />} /> */}
      </Routes>)
  )
}