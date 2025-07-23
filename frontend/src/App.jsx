import { Routes,Route,Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import Homepage from './pages/Homepage'
import PrivateRoute from './routes/PrivateRoute'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/home" element={<Homepage></Homepage>} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
    </>
  )
}

export default App
