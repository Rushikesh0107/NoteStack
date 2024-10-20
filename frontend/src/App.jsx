import './App.css'
import {Routes, Route} from 'react-router-dom'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import Notes from './pages/Notes'
import PYQ from './pages/PYQ'
import Login from './pages/Login'
import Sigup from './pages/Sigup'
import AdminLogin from './pages/AdminLogin'
import ProtectedRoutes from './components/core/Auth/ProtectedRoutes'
import AdminDashBoard from './pages/AdminDashBoard'
import AdminCheck from './components/core/Auth/AdminCheck'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home />} />


          <Route path='/notes' element={
            <ProtectedRoutes>
              <Notes />
            </ProtectedRoutes>
          } />

          <Route path='/pyq' element={
            <ProtectedRoutes>
              <PYQ />
            </ProtectedRoutes>
          } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sigup />} />
        <Route path="/admin" element={<AdminLogin />} />
        </Route>

        <Route path='/admin-dashboard' element={
            <AdminCheck>
              <AdminDashBoard />
            </AdminCheck>
          } />
      </Routes>
    </>
  )
}

export default App
