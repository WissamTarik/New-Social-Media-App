import { LoginData, LoginState, RegisterData, RegisterState } from "@/Interfaces/AuthInterfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";


export const handleRegister=createAsyncThunk('Register',async(values:RegisterData)=>{
    
    try {
        const {data}=await axios.post(`https://linked-posts.routemisr.com/users/signup`,values)
        console.log('register data',data);
        return data
        
    } catch (error) {
        console.log('register Error',error);
        return error
        
    }

})
export const handleLogin=createAsyncThunk('Login',async(values:LoginData)=>{
    
    try {
        const {data}=await axios.post(`https://linked-posts.routemisr.com/users/signin`,values)
        console.log('Login data',data);
        return data
        
    } catch (error) {
        console.log('Login Error',error);
        return error
        
    }

})
const initialState:RegisterState={
    isError:false,
    isLoading:false,
  
}

const registerSlice=createSlice({
    name:'Register',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(handleRegister.pending,(state)=>{
            console.log('Register is pendingggggg');
            
            state.isLoading=true

        })
        builder.addCase(handleRegister.fulfilled,(state,action:any)=>{
            console.log('Register is Fulfilled');
              
            state.isLoading=false
            console.log('Register Action-------',action)
              
        
        })
        builder.addCase(handleRegister.rejected,(state)=>{
            console.log('Register is Rejected');
            
            state.isLoading=false

        })
    }

})
export const registerReducer=registerSlice.reducer


const initialStateLogin:LoginState={
    isError:false,
    isLoading:false,
    token:null
  
}
 const loginSlice=createSlice({
      name:"Login",
      initialState:initialStateLogin,
      reducers:{

      },
      extraReducers:(builder)=>{
        builder.addCase(handleLogin.pending,(state)=>{
            console.log('Login is pendingggggg');
            
            state.isLoading=true

        })
        builder.addCase(handleLogin.fulfilled,(state,action:any)=>{
            console.log('Login is Fulfilled');
            state.isLoading=false
            console.log('Login Action-------',action)
            state.token=action.payload?.token? action.payload?.token:null
            Cookies.set('token',action.payload?.token? action.payload?.token:null)
             localStorage.setItem('token',action.payload?.token? action.payload?.token:null)
              
        
        })
        builder.addCase(handleLogin.rejected,(state)=>{
            console.log('Login is Rejected');
            
            state.isLoading=false

        })
    }

})
export const loginReducer=loginSlice.reducer
