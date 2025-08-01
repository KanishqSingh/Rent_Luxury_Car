import React, { useState } from 'react'
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const SideBar = () => {
    const {user,axios,fetchUser} = useAppContext();
    const location = useLocation();
    const [image,setImage] = useState('')

    const updateImage = async () => {

       try {
        const formData = new FormData();
        formData.append('image',image);
        const {data} = await axios.post('/api/owner/update-image',formData)
        console.log('formdata',data);
        
        if(data.success){
            fetchUser();
            toast.success(data.message);
            setImage('')
        }else{
            toast.error(data.message)
        }
       } catch (error) {
        toast.error(error.message)
       }
        
    }

    // console.log(location.pathname);
  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-black text-sm'>

        <div className='group relative'>
            <label htmlFor="image">
                <img src={image ? URL.createObjectURL(image ) : user?.image || assets.user_profile} alt="" />
                <input type="file" id='image' accept='image/*' hidden onChange={(e)=> setImage(e.target.files[0])} />

                <div className='absolute hidden top-0 right-0 left-0 bottom-0 bg-black rounded-full group-hover:flex items-center justify-center cursor-pointer'>

                    <img src={assets.edit_icon} alt="" />
                </div>
            </label>
            
        </div>
        {image && (
            <button className='absolute top-0 right-0 flex p-2 gap-2 bg-blue-600 text-blue-500 cursor-pointer' onClick={updateImage} >Save <img src={assets.check_icon} width={13} alt=""  /></button>
        )}
        <p>{user?.name}</p>

        <div className='w-full'>
            {ownerMenuLinks.map((link,index)=>(

                <NavLink key={index} to={link.path} className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${link.path === location.pathname ? 'bg-blue-500 text-blue-400' : 'text-gray-600'}`}>
                    <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="car icon" />
                    <span className='max-md:hidden'>{link.name}</span>
                    <div className={`${link.path === location.pathname && 'bg-blue-500'} w-1.5 rounded-1 right-0 absolute`}></div>
                </NavLink>

            ))}

        </div>

        
    </div>
  )
}

export default SideBar

// 8:09