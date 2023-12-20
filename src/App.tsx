import { FC, ReactNode, useContext, useEffect } from 'react'
import { Perfil } from './pages/client';
import { AuthPage } from './pages';
import { Dashboard } from './pages/admin';
import { AuthContext } from './context/auth';
import { Users, RegisterMaster } from './pages/admin/auth';
import { RegisterUser } from './pages/admin/auth/RegisterUser';
import { Clients, RegisterClient } from './pages/admin/clients';
import { CallsSearch, Calls, RegisterCall } from './pages/admin/calls';
import { Departments, RegisterDepartment } from './pages/admin/departments';
import { Acquisitions, CreateAcquisition } from './pages/admin/acquisitions';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { PropertiesConfiguration, PropertyTypes, CreatePropertyType } from './pages/admin/property_types';
import { PropertyTransactionTypes, CreatePropertyTransactionType } from './pages/admin/property_transaction_types';

function App() {

  const context = useContext(AuthContext);

  const sessionValidation = async () => {
    await context.validateToken();
  }

  useEffect(() => {
    sessionValidation()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}
          <Route path='/admin/dashboard' element={<Dashboard />} />

          {/* Captaciones */}
          <Route path='/admin/acquisitions' element={<Acquisitions />} />
          <Route path='/admin/acquisitions/add' element={<CreateAcquisition />} />

          {/* Usuarios */}
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/users/add' element={<RegisterUser />} />
          <Route path='/admin/register/master' element={<RegisterMaster />} />

          {/* Perfil */}
          <Route path='/perfil' element={<Perfil />} />

          {/* Llamadas */}
          <Route path='/admin/calls/search' element={<CallsSearch />} />
          <Route path='/admin/calls' element={<Calls />} />
          <Route path='/admin/calls/add' element={<RegisterCall />} />

          {/* Clientes */}
          <Route path='/admin/clients' element={<Clients />} />
          <Route path='/admin/clients/add' element={<RegisterClient />} />

          {/* Propiedades */}
          <Route path='/admin/property' element={<PropertiesConfiguration />} />
          <Route path='/admin/property/transaction/type' element={<PropertyTransactionTypes />} />
          <Route path='/admin/property/transaction/type/add' element={<CreatePropertyTransactionType />} />
          <Route path='/admin/property/type' element={<PropertyTypes />} />
          <Route path='/admin/property/type/add' element={<CreatePropertyType />} />

          {/* Departamentos */}
          <Route path='/admin/departments' element={<Departments />} />
          <Route path='/admin/department/add' element={<RegisterDepartment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRoute = () => {
  const { authState } = useContext(AuthContext);
  if (!authState.logged) return <Navigate to="/" />
  return <Outlet />
}

export default App;