'use client'

import Posts from '@/app/_Components/Posts/Posts'
import { handleSinglePost } from '@/Libraries/PostSlice'
import { dispatchType, storeType } from '@/Libraries/store'
import React, { useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

export default function SinglePost(props:any ) {
    const dispatch=useDispatch<dispatchType>()
    const {isLoading,isError,singlePost}=useSelector((store:storeType)=>store.postReducer)
  console.log("Single post",singlePost)
    useEffect(()=>{
         dispatch(handleSinglePost(props.params.id))
    },[])
    if(isLoading){
         return <div className='h-screen flex justify-center items-center'>

            <FaSpinner className="animate-spin text-4xl" />
         </div>
     
    }
    
    if(isError){
         return <div className='h-screen flex justify-center items-center text-4xl text-red-600'>

            <h1>Failed to get post details</h1>
         </div>
     
    }


  return (
    <section>
      <Posts key={singlePost?._id} post={singlePost} getAllPosts={false} />
    </section>
  )
}
