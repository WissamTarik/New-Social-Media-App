import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "cookies-ts"
const cookies=new Cookies()
const token=cookies.get('token')
export const handleAddPost=createAsyncThunk('addPost',async (formData:object)=>{
        
    try {
        const {data}=await axios.post('https://linked-posts.routemisr.com/posts',formData,{
            headers:{
            token,
            }

        })
        console.log("Add post Data",data)
        return data
    } catch (error) {
        console.log('Add Post Error',error);
        return error
        
    }
})
interface InitialState{
    isLoading:boolean,
    isError:boolean
}
const initialState:InitialState={
    isLoading:false,
    isError:false
}
const addPostSlice=createSlice({
    name:'addPost',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
         builder.addCase(handleAddPost.pending,(state)=>{
            state.isLoading=true,
            console.log('Add post is Pending');
            
         })
         builder.addCase(handleAddPost.fulfilled,(state)=>{
            state.isLoading=false,
            console.log('Add post is Fulfilled');
            
         })
         builder.addCase(handleAddPost.rejected,(state)=>{
            state.isLoading=false,
            console.log('Add post is Rejected');
            
         })
    }
})
export const addPostReducer=addPostSlice.reducer