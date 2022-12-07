import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext.js'

function Navbar() {

  const { loggedInUser } = useContext(AuthContext)

  console.log(loggedInUser)

  function handleLogout() {
    localStorage.removeItem('loggedInUser')
  }

  return (
    <header >

      {/* NAVBAR */}
      <div className="d-flex pb-3 mb-4 border-bottom">
        <Link to="/" className="d-flex align-items-center text-dark text-decoration-none">
          <i className="bi bi-piggy-bank fs-2 text-primary"></i>
          <span className="fs-1 px-2">DCP</span>
        </Link>

        <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto align-items-center">
          <Link className="fs-5 me-3 py-2 text-dark text-decoration-none" to="/"><i className="bi bi-list-task"></i>Upload</Link>
          {!loggedInUser && 
          <Link className="fs-5 me-3 py-2 text-dark text-decoration-none" to="/user/login"><i className="bi bi-person"></i>Login</Link>
          }
          {loggedInUser && 
            <button className="fs-5 me-3 py-2 text-dark text-decoration-none btn" onClick={handleLogout}><i className="bi bi-person"></i>Logout</button>
          }
        </nav>
      </div>

    </header>
  );
}

export default Navbar;