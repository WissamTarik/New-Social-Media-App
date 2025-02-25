import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, registerReducer } from "./authSlice";
import { postReducer } from "./PostSlice";
import { addPostReducer } from "./AddPostSlice";
import { createCommentReducer } from "./CreateCommentSlice";

export const store=configureStore({
    reducer:{
       registerReducer,
      loginReducer,
      postReducer,
      addPostReducer,
      createCommentReducer,
    }
})
export type dispatchType=typeof store.dispatch
export type storeType=ReturnType<typeof store.getState>