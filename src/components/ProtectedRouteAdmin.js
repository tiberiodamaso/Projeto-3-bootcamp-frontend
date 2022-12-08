import { useContext } from "react";
import { AuthContext } from '../contexts/authContext.js'
import { Navigate } from 'react-router-dom'

function ProtectedRouteAdmin({Component}) {
  const { loggedInUser } = useContext(AuthContext)
  if (loggedInUser.role === 'admin') {
    // Mostra o componente
    return <Component />
  } else {
    // Navega o usuário para a página de login
    return <Navigate to='/' />
  }
}

export default ProtectedRouteAdmin;