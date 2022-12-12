import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext.js'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext)

  function handleLogout() {
    localStorage.removeItem('loggedInUser')
    setLoggedInUser(null)
    navigate('/')
  }

  return (
    <header >

      {/* NAVBAR */}
      <div className="d-flex border-bottom">
        <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
          <i className="bi bi-boxes fs-1 mx-3"></i>
          <span className="fs-1 px-2">Análise de DCP</span>
        </Link>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto align-items-center">
          <Link className="fs-5 me-3 py-2 text-dark text-decoration-none" to="/signup">Criar conta</Link>
          {!loggedInUser &&
            <Link className="fs-5 me-3 py-2 text-dark text-decoration-none" to="/"><i className="bi bi-person"></i>Login</Link>
          }
          {loggedInUser &&
          <div className='d-flex align-items-end'>
            <Link className="fs-5 py-2 me-3 text-dark text-decoration-none" to="/analises">Análises</Link>
            <Link className="fs-5 py-2 text-dark text-decoration-none" to="/profile">Perfil</Link>
            <button className="fs-5 me-3 py-2 text-dark text-decoration-none btn" onClick={handleLogout}>Logout</button>
            </div>
          }
        </nav>
      </div>

    </header>
  );
}

export default Navbar;