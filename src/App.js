import { Routes, Route } from 'react-router-dom'
// import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Profile from './pages/Profile.js'
import Analises from './pages/Analises.js'
import Logs from './pages/Logs.js'
import Error from './pages/Error.js'
import { Toaster } from "react-hot-toast";
import Navbar from './components/Navbar.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin.js'


function App() {
  return (
    <div className="App Container">

      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<ProtectedRoute Component={Profile} />} />
        <Route path='/analises' element={<ProtectedRoute Component={Analises} />} />
        <Route path='/logs' element={<ProtectedRouteAdmin Component={Logs} />} />
        <Route path='*' element={<Error />} />
      </Routes>

    </div>
  );
}

export default App;
