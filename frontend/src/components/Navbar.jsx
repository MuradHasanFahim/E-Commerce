import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    const [visible,setVisible]=useState(false);
    const {setShowSearch,getCartCount,navigate,token,setToken,setCartItems}=useContext(ShopContext)

    const logout=()=>{
        navigate('/login')
        localStorage.removeItem('token');
        setToken('');
        setCartItems({})
       
    }


  return (
    <div className='flex items-center justify-between py-5 font-medium'>
       <Link to='/'><img src={assets.logo} alt="" /></Link> 
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col group items-center gap-0.5'>
            <p>Home</p>
              <span className="w-4 h-0.5 bg-gray-700  opacity-0 group-hover:opacity-100 transition duration-300"></span>
            </NavLink>

            <NavLink to='/Collection' className='flex flex-col group items-center gap-0.5'>
            <p>Collection</p>
              <span className="w-4 h-0.5 bg-gray-700  opacity-0 group-hover:opacity-100 transition duration-300"></span>
            </NavLink>

            <NavLink to='/About' className='flex flex-col group items-center gap-0.5'>
            <p>About</p>
              <span className="w-4 h-0.5 bg-gray-700  opacity-0 group-hover:opacity-100 transition duration-300"></span>
            </NavLink>

            <NavLink to='/Contact' className='flex flex-col group items-center gap-0.5'>
            <p>Contact</p>
              <span className="w-4 h-0.5 bg-gray-700  opacity-0 group-hover:opacity-100 transition duration-300"></span>
            </NavLink>


        </ul>
        <div className='flex flex-row gap-6'>
            <img onClick={()=>setShowSearch(true)} src={assets.search_icon} alt="" className='w-6 cursor-pointer'/>
            <div className='group relative'>
                <img onClick={()=>token ? null:navigate('/login')} src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
                {/* dropdown*/}
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-5 '>
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>

                    </div>
                </div>
                }
                
            </div>
            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} alt="" className='w-5 min-w-5'/>
                <p className='absolute -right-2 -bottom-2 w-4 h-4 flex items-center justify-center text-[10px] bg-black text-white rounded-full'>{getCartCount()}</p>
            </Link>
            <img onClick={()=>setVisible(true)}  src={assets.menu_icon} alt="" className='w-6 h-6 cursor-pointer  sm:hidden'  />

            
        </div>
            <div className={`absolute top-0 left-0 bottom-0 overflow-hidden bg-white transition-all duration-300 z-50 ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3'>
                    <img src={assets.dropdown_icon} alt="" className='h-4 rotate-180 cursor-pointer' />
                    <p >Back</p>

                </div>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-4  border ' to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-4  border ' to='/Collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-4  border ' to='/About'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-2 pl-4  border ' to='/Contact'>CONTACT</NavLink>
            </div>


        </div>


    </div>
  )
}

export default Navbar