import { useContext } from "react";
import { AuthContext } from '../contexts/authContext.js'
import { Navigate } from 'react-router-dom'

function ProtectedRouteAdmin({Component}) {
  
  const { loggedInUser } = useContext(AuthContext)
  
  if (loggedInUser && loggedInUser.user.role === "admin"){
    return <Component />
  } 

  if (!loggedInUser || loggedInUser.user.role === "user") {
    return <Navigate to='/' />
  }
}

export default ProtectedRouteAdmin;