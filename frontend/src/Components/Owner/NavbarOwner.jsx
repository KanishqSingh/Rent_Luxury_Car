import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {

    const {user} = useAppContext();

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-black relative transition-all'>

        <Link to='/'>
        <img src={assets.logo} className='h-7' alt="" /></Link>

        <p>Welcome , {user?.name || "Owner"}</p>


        
    </div>
  )
}

export default NavbarOwner