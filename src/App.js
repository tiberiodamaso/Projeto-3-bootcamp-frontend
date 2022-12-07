import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Profile from './pages/Profile.js'
import Error from './pages/Error.js'
import { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar.js'
import ProtectedRoute from './components/ProtectedRoute.js'


function App() {
  return (
    <div className="App Container">

      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/signup' element={<Signup />} />
        <Route path='/user/profile' element={<ProtectedRoute Component={Profile} />} />
        <Route path='*' element={<Error />} />
      </Routes>

    </div>
  );
}

export default App;
