'use client'

import axios from "axios";
import Image from "next/image";
import Cookies from "cookies-ts"
import { useContext, useEffect, useRef, useState } from "react";
import { PostInterface } from './../Interfaces/PostInterface';
import Posts from "./_Components/Posts/Posts";
import { FaSpinner } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { dispatchType, storeType } from "@/Libraries/store";
import { handleAddPost } from "@/Libraries/AddPostSlice";
import toast from 'react-hot-toast';
import { postContext } from "@/Context/PostsContext";

export default function Home() {
 
  const createPostInputRef=useRef<HTMLTextAreaElement|null>(null)
  const imageInputRef=useRef<HTMLInputElement|null>(null)
  const dispatch=useDispatch<dispatchType>()
  const {isLoading:addPostLoader}=useSelector((store:storeType)=>store.addPostReducer)
 const {handleGetPosts,isLoading,posts}=useContext(postContext)
  useEffect(()=>{
    handleGetPosts()
  },[])
  if(isLoading){
    return <div className="h-screen flex justify-center items-center">
      <FaSpinner className="animate-spin text-4xl text-blue-600" />
    </div>
  }
  async function createPost(){
    const formData=new FormData()
    const bodyData:string=createPostInputRef.current?.value?createPostInputRef.current.value:''
    if(imageInputRef.current){
      const bodyImage=imageInputRef.current?.files?.[0]??''

      formData.append('image',bodyImage)
    }
      formData.append('body',bodyData)
       dispatch(handleAddPost(formData)).then((res)=>{
        if(res.payload.message=='success'){
          toast.success("post added successfully",{
            style: {
                   fontWeight:'bold',
                     color:'green'
            },
            

          })
          if(createPostInputRef.current?.value){
            createPostInputRef.current.value=''
          }
          if(imageInputRef.current){
            imageInputRef.current.value=''
          }
        }
        else{
          toast.error("Failed to add Post",{
            style: {
                   fontWeight:'bold',
                     color:'red'
            },
            

          })
        }
        console.log("Add post Response",res)
       })
  }

  return (
 <>
  <section className="">
    <div className="mb-5 shadow-md p-3 md:w-1/2 w-3/4 mx-auto">
   <div>
    <h3 className="text-xl text-blue-600 ">Create Post</h3>
  <div className="relative my-2">
  <textarea id="floating_postArea" ref={createPostInputRef} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none border-blue-500 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
  <label htmlFor="floating_postArea" className="absolute  text-blue-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Post content</label>
  </div>
  <label htmlFor="uploadFile1" className=" bg-blue-800 hover:bg-blue-700 w-full text-white text-base px-5 py-3 outline-none rounded text-center flex justify-center items-center  cursor-pointer mx-auto font-[sans-serif]">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
      <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" data-original="#000000" />
      <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" data-original="#000000" />
    </svg>
    Upload Image
    <input type="file" id="uploadFile1" className="hidden" accept="image/*" ref={imageInputRef}/>
  </label>
  <button className="border-2 border-blue-600 rounded-lg w-full py-2 flex justify-center items-center hover:text-white text-blue-600 text-lg my-2 hover:bg-blue-600 duration-500 transition-colors"
  onClick={createPost}
  > {addPostLoader?<FaSpinner className="animate-spin text-2xl" /> :"Add Post"}</button>
</div>

    </div>
      <div className=" ">
       {posts?posts.map((post:PostInterface)=><Posts key={post._id} post={post} getAllPosts={true}  />):
        <div className="h-screen flex justify-center items-center text-red-600 text-3xl">
          <h1>Can't reload Posts</h1>
        </div>
       }
      </div>

  </section>
 </>
  );
}
