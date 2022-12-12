import { useContext } from "react";
import { AuthContext } from '../contexts/authContext.js';
import { Navigate } from 'react-router-dom';


function ProtectedRoute({Component}) {

  const { loggedInUser } = useContext(AuthContext)

  if (loggedInUser && loggedInUser.token !== "") {
    return <Component />
  } 
  
  if (!loggedInUser) {
    return <Navigate to='/' />
  }
}

export default ProtectedRoute;