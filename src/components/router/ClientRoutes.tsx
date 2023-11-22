import { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { Dashboard, Perfil } from '../../pages/client'
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
        <Route path='/perfil' element={<Perfil />} />
      </Routes>)
      :
      (<Routes>
        <Route path='/dashboard' element={<Navigate to={'/'} />} />
        {/* <Route path='/perfil' element={<Navigate to={'/'} />} /> */}
      </Routes>)
  )
}