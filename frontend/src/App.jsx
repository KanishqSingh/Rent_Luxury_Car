import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router'
import Home from './Pages/Home'
import CarDetails from './Pages/CarDetails'
import MyBookings from './Pages/MyBookings'
import Cras from './Pages/Cras'
import Footer from './Components/Footer'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>

      {!isOwnerPath && <Navbar setShowlogin={setShowLogin}/>}

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/car-details/:id' element={<CarDetails/>}></Route>
        <Route path='/cars' element={<Cras/>}></Route>
        <Route path='/my-bookings' element={<MyBookings/>}></Route>
      </Routes>

      <Footer/>

    </>
  )
}

export default App