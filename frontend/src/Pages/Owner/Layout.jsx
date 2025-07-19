import React from 'react'
import NavbarOwner from '../../Components/Owner/NavbarOwner'
import SideBar from '../../Components/Owner/SideBar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className='flex flex-col'>
        <NavbarOwner/>
        <div className='flex'>
            <SideBar/>
            <Outlet/>

        </div>

    </div>
  )
}

export default Layout