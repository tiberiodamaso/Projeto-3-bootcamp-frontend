import { createContext, useState, useEffect } from "react";

const AuthContext = createContext()

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: '', user: {} })

  useEffect(() => {

    // Captura o loogedInUser do localStorage
    const loggedInUserJSON = localStorage.getItem('loggedInUser')

    // Converte o JSON em objeto
    const parsedLoggedInUser = JSON.parse(loggedInUserJSON || '""')

    if (parsedLoggedInUser.token) {
      setLoggedInUser(parsedLoggedInUser)
    } else {
      setLoggedInUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextComponent };