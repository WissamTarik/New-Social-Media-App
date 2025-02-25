'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import userImage from "../../../../public/userImage.avif"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Comments } from '@/Interfaces/PostInterface'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchType, storeType } from '@/Libraries/store'
import { FaSpinner } from 'react-icons/fa6'
import { CreateCommentData, handleCreateComment } from '@/Libraries/CreateCommentSlice'
import { handleAddPost } from '@/Libraries/AddPostSlice'
import toast from "react-hot-toast";

export default function Posts(props:any) {
    const dispatch=useDispatch<dispatchType>()
    const commentInputRef=useRef<HTMLInputElement|null>(null)
    const {isLoading}=useSelector((store:storeType)=>store.createCommentReducer)
    function handleAddComment(id:string){
      if(commentInputRef.current){
        const values:CreateCommentData={
           post:id,
           content:commentInputRef.current.value
          }
          dispatch(handleCreateComment(values)).then((res)=>{
            console.log("Response -",res);
            if(res.payload.message=='success'){
              toast.success("Comment is added sucessfully", {
                style: {
                  fontWeight: "bold",
                  color: "green",
                },
              });
            }
            else{
              toast.error("failed to add your comment", {
                style: {
                  fontWeight: "bold",
                  color: "red",
                },
              });
            }
            
          })
      }
    }
  return (
    <div className=" shadow-lg p-2 my-2 mb-4  w-3/4 md:w-1/2  mx-auto">
<div className="bg-gray-100  flex items-center justify-center">
  <div className="bg-white w-full p-8 rounded-lg  ">
     {/* User Info with Three-Dot Menu */} 
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <Image src={userImage} width={60} height={60} alt={props.post?.user?.name} />
        <div>
          <p className="text-gray-800 font-semibold">{props.post?.user?.name}</p>
          <p className="text-gray-500 text-sm">{props.post?.createdAt}</p>
        </div>
      </div>
      <div className="text-gray-500 cursor-pointer">
        {/* Three-dot menu icon */} 
        <button className="hover:bg-gray-50 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={12} cy={7} r={1} />
            <circle cx={12} cy={12} r={1} />
            <circle cx={12} cy={17} r={1} />
          </svg>
        </button>
      </div>
    </div>
    {/* Message */}
    <div className="mb-4">
      <p className="text-gray-800">{props.post?.body} 🐱
      </p>
    </div>
    {/* Image */} 
    {props.post?.image&& <div className="mb-4">
      <Image   src={props.post?.image} alt="Post Image" height={200} width={500}  className="w-full object-cover rounded-md" />
    </div>}
    
    {/* Like and Comment Section */} 
    <div className="flex items-center justify-between text-gray-500">
      <div className="flex items-center space-x-2">
        <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
          <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
      <Link href={`/singlePost/${props.post?._id}`} className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
        <svg width="22px" height="22px" viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z" />
          </g>
        </svg>
        <span>{props.post?.comments.length>0 ?props.post?.comments.length:"0"} Comment</span>
      </Link>
    </div>
    <hr className="mt-2 mb-2" />
    <div className='max-[500px]:flex-col flex  max-[500px]:items-start justify-between max-[500px]:gap-x-0 max-[500px]:justify-start  items-center gap-3'>
    <p className="text-gray-800 font-semibold">Comment</p>
  <form className=" max-[500px]:mx-0 mx-auto flex justify-center items-center gap-3 grow">
    <input type="text" id="commentInput"
    ref={commentInputRef}
    className="shadow-xs focus:outline-none bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-blue-600 " placeholder="Write a comment" />

   <button type='button' className=' bg-blue-600 hover:bg-blue-500 duration-300 transition-colors uppercase text-white font-bold rounded-md px-2 py-1 flex justify-start items-center'
     onClick={()=>{
      handleAddComment(props.post._id)
     }}
   > {isLoading ? (
               <FaSpinner className="animate-spin text-2xl" />
             ) : (
               "Add"
             )}</button>
</form>

    </div>
    <hr className="mt-2 mb-2" />
    
    <div className="mt-4">
      {/* Comment 1 */} 
    {props.post?.comments.length>0? 
    props.getAllPosts?  <div className="flex items-center space-x-2">
      <Image src={userImage} alt={props.post.comments[0].commentCreator.name} width={50} height={50} className=" rounded-full" />
      <div>
        <p className="text-gray-800 font-semibold">{props.post.comments[0].commentCreator.name}</p>
        <p className="text-gray-500 text-sm">{props.post.comments[0].content}</p>
      </div>
    </div>:props.post.comments.map((comment:Comments)=><div key={comment._id} className=" mb-4 flex items-center space-x-2">
      <Image src={userImage} alt={comment.commentCreator.name} width={50} height={50} className=" rounded-full" />
      <div>
        <p className="text-gray-800 font-semibold">{comment.commentCreator.name}</p>
        <p className="text-gray-500 text-sm">{comment.content}</p>
      </div>
    </div>)
    :''}
    </div>
  </div>
  </div>
</div>

  )
}
