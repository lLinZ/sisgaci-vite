import { useContext, useEffect} from 'react'
import { AuthContext } from './context/auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClientRoutes, AdminRoutes } from './components/router';
import { AuthPage } from './pages';

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
        <Route path='/' element={<AuthPage />} />
      </Routes>
      {
        context.authState.logged && (
          <>
            <ClientRoutes />
            <AdminRoutes />
          </>
        )
      }
    </BrowserRouter>
  );
}

export default App
