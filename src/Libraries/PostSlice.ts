import { PostInterface } from "@/Interfaces/PostInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "cookies-ts"

const cookies=new Cookies()

export const handleSinglePost=createAsyncThunk('post',async (id:string)=>{
    const token=cookies.get('token')
    try {
         const {data}=await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
            headers:{
             token
            }
         })
         console.log("Get single post",data)
         return data
    } catch (error) {
        console.log("Get single post Error",error)
        return error

    }
})
interface InitialState{
    isLoading:boolean,
    isError:boolean,
    singlePost:null|PostInterface
}
const initialState:InitialState={
    isLoading:false,
    isError:false,
    singlePost:null,
}
const postSlice=createSlice({
    name:'post',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
       builder.addCase(handleSinglePost.pending,(state)=>{
        console.log("single post is pending")
        state.isLoading=true
       }),
       builder.addCase(handleSinglePost.fulfilled,(state,action:any)=>{
        console.log("single post is Fulfilled")
        console.log('Action-------------',action.payload.post);
        state.singlePost=action.payload?.post?action.payload.post:null
        
        state.isLoading=false
       }),
       builder.addCase(handleSinglePost.rejected,(state)=>{
        console.log("single post is Rejected")
        state.isError=true
        
        state.isLoading=false
       })
    }
}) 
export const postReducer=postSlice.reducer