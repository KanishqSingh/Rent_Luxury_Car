import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router'
import Home from './Pages/Home'
import CarDetails from './Pages/CarDetails'
import MyBookings from './Pages/MyBookings'
import Cras from './Pages/Cras'
import Footer from './Components/Footer'
import Layout from './Pages/Owner/Layout'
import DashBoard from './Pages/Owner/DashBoard'
import AddCar from './Pages/Owner/AddCar'
import ManageCar from './Pages/Owner/ManageCar'
import ManageBooking from './Pages/Owner/ManageBooking'
import Login from './Components/Login'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  
  return (
    <>
    <Toaster/>
      {
        showLogin && <Login />
      }
      
      {!isOwnerPath && <Navbar />}



      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/car-details/:id' element={<CarDetails />}></Route>
        <Route path='/cars' element={<Cras />}></Route>
        <Route path='/my-bookings' element={<MyBookings />}></Route>

        <Route path='/owner' element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-cars' element={<ManageCar />} />
          <Route path='manage-bookings' element={<ManageBooking />} />

        </Route>

      </Routes>

      <Footer />

    </>
  )
}

export default App