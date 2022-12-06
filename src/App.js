import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Profile from './pages/Profile.js'
import Error from './pages/Error.js'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App Container">

      <Toaster />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='*' element={<Error />} />
      </Routes>

    </div>
  );
}

export default App;
