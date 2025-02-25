import { RegisterState } from "@/Interfaces/AuthInterfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const token=Cookies.get('token')||localStorage.getItem('token')
export interface CreateCommentData{
    content:string,
    post:string
}
export const handleCreateComment=createAsyncThunk('createComment',async(values:CreateCommentData)=>{
    try {
        const {data}=await axios.post('https://linked-posts.routemisr.com/comments',values,{
            headers:{
                token
            }
        })
        console.log('comment data',data);
        
        return data
    } catch (error) {
        console.log('comment error',error);
        return error
    }
})
const initialState:RegisterState={
    isError:false,
    isLoading:false
}
const createCommentSlice=createSlice({
    name:'createComment',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
      builder.addCase(handleCreateComment.pending,(state)=>{
        state.isLoading=true
        console.log('Create post is pending');
        
      }),
      builder.addCase(handleCreateComment.fulfilled,(state)=>{
        state.isLoading=false
        console.log('Create post is fulfilled');
        
      }),
      builder.addCase(handleCreateComment.rejected,(state)=>{
        state.isLoading=false
        console.log('Create post is Rejected');
        
      })
    }
})

export const createCommentReducer=createCommentSlice.reducer