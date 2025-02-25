'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import userImage from "../../../../public/userImage.avif"
import { useRouter } from 'next/navigation'


import Cookies from "cookies-ts"

export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)
    const router=useRouter()
    const cookies=new Cookies()
    const token=cookies.get('token')
    function handleOpenMenu(){
        setOpenMenu(!openMenu)
    }
     interface MenuItem {
      title: string;
      route?: string;
      children?: MenuItem[];
    }
    function handleLogout(){
       localStorage.removeItem('token')
       cookies.remove('token')
       router.push('/login')
    }
    const menuItems: MenuItem[] = [
   
      {
        title: "Products",
        children: [
          {
            title: "Profile",
            route: "/products/hinkle-horns",
          },
          {
            title: "Login ",
            route: "/login",
          },
          {
            title: "Register",
            route: "/register",
          },
        ],
      },
    ];
    
  return (
    <nav className='bg-blue-600 shadow-md pe-5 shadow-blue-400 text-white flex justify-between items-center p-3 fixed top-0 end-0 start-0 z-50'>
        <div className="logo">
        <Link href={'/'} className='text-white font-bold text-lg'>Social App</Link>
        </div>
        <div className='md:flex hidden gap-4' >
<button type="button" className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
  </svg>
  <span className="sr-only">Notifications</span>
  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500  rounded-full -top-2 -end-2 ">20</div>
</button>
<button className="relative  ">
  <svg className="w-8 h-8 text-white  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
    <path fill="white" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17" />
  </svg>
  <div className="px-1 py-0.5 bg-red-500 min-w-5 rounded-full text-center text-white text-xs absolute -top-2 -end-1 translate-x-1/4 text-nowrap">
    <div className="absolute top-0 start-0 rounded-full -z-10  bg-red-500 w-full h-full" />
    17
  </div>
</button>
    
<div className="flex gap-8 items-center text-white">
     {token?  menuItems.map((item) => {
          return item.hasOwnProperty("children") ? (
            <Dropdown item={item}  key={item.title} />
          ) : (
            <Link className="hover:text-blue-500" href={item?.route || ""}>
              {item.title}
            </Link>
          );
        }): menuItems.map((item) => {
          return item.hasOwnProperty("children") ? (
            <Dropdown item={item}  key={item.title} />
          ) : (
            <Link className="hover:text-blue-500" href={item?.route || ""}>
              {item.title}
            </Link>
          );
        })}
      </div>
      {token&& <button className='bg-white text-blue-600 rounded-md px-3 hover:text-red-600 duration-300 transition-colors' onClick={handleLogout}>Logout</button>
    }
        </div>
           
           <div className='md:hidden block'>
     <button className="relative  "  onClick={handleOpenMenu}>
  <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all  ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
    <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
      <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left " />
      <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 " />
      <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left " />
    </div>
       
  </div>
</button>
<div className={`bg-white shadow-md w-fit text-black  absolute top-15 end-2 px-8 py-4 flex-col gap-y-2 border-gray-200 border rounded-md ${openMenu?"flex":"hidden"}` }>
{token&&        <Link href="" className='hover:text-blue-600 transition-colors duration-300 '>Profile</Link>
}
        <Link href="/login" className='hover:text-blue-600 transition-colors duration-300 '>Login</Link>
        <Link href="/register" className='hover:text-blue-600 transition-colors duration-300 '>Register</Link>

{token&& <button  className="text-red-600 hover:text-red-800 transition-colors duration-300 " onClick={handleLogout}>Log Out</button>
}
       </div>


           <div>

    </div>
           </div>
    
    </nav>
  )
}
