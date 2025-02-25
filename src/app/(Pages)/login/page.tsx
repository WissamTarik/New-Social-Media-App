'use client'
import { dispatchType, storeType } from '@/Libraries/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { FaSpinner } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { LoginData } from '@/Interfaces/AuthInterfaces';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { handleLogin } from '@/Libraries/authSlice';
export default function page() {
  const dispatch=useDispatch<dispatchType>()
  const {isLoading}=useSelector((store:storeType)=>store.loginReducer)

  const router=useRouter()
 const initialValues:LoginData={
    email:'',
    password:'',
   
  }
  const validationSchema=Yup.object().shape({
      email:Yup.string().email("Invalid email or password").required("Email is required to Login"),
      password:Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Password must start with capital letter and contain special character and at least 8 characters').required("Password is required to login"),

  
    })
  const loginFormik=useFormik({
    validationSchema,
     initialValues,
     onSubmit:(values)=>{
     console.log('Login values',values);
        dispatch(handleLogin(values)).then((res)=>{
          if(res.payload.token){
             toast.success("Logged successfully",{
            style: {
                   fontWeight:'bold',
                     color:'green'
            },
            

          })
          router.push('/')
          }
          else{
            toast.error(res.payload.response.data.error,{
              style:{
                color:'red',
                fontWeight:'bold'
              }
            })
          }
          console.log('Login response',res)
        })
      
     }
   })

  return (
  <div className=' p-4 lg:w-1/3 min-[500px]:w-1/2 shadow-lg mx-auto  mt-5' >
        <form className='' onSubmit={loginFormik.handleSubmit}> 
          <h1 className="text-xl text-blue-600 my-2">Login Now:</h1>
        <div className={`relative `}>
  <input type="email" id="floating_email"
  name='email'
  onChange={loginFormik.handleChange}
  onBlur={loginFormik.handleBlur}
  value={loginFormik.values.email}
  className="block caret-blue-600  px-2.5 pb-2.5 pt-4 w-full  text-gray-900 bg-transparent rounded-lg border outline-none      focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
  <label htmlFor="floating_email" className="absolute  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-2 origin-[0]   px-2  peer-focus:text-blue-600  bg-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email</label>
</div>
    {loginFormik.errors.email?  <p className="mt-2 text-sm text-red-600 "> {loginFormik.errors.email}</p>:""}
         
    
    <div className="relative my-4">
    <input type="password" id="floating_password" 
    onChange={loginFormik.handleChange}
    onBlur={loginFormik.handleBlur}
    value={loginFormik.values.password}
    name='password'
    className="block caret-blue-600  px-2.5 pb-2.5 pt-4 w-full  text-gray-900 bg-transparent rounded-lg border outline-none      focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label htmlFor="floating_password" className="absolute  text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-2 origin-[0]   px-2  peer-focus:text-blue-600  bg-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
  </div>
   {loginFormik.errors.password?  <p className="my-2 text-sm text-red-600 "> {loginFormik.errors.password}</p>:""}
  
  
  
  
          <button 
          type='submit'
          className='w-full rounded-lg border-2 mt-4 py-2 transition-colors duration-500 border-blue-600
           text-blue-600 flex justify-center items-center hover:bg-blue-600 hover:text-white text-center'>

            {isLoading?<FaSpinner className="animate-spin text-2xl" />:"Login"}
           </button>
        </form>
      </div>
  )
}
