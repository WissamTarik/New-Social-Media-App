import { createContext, ReactNode, useState } from "react";
import Cookies from "js-cookie";
import { PostInterface } from "@/Interfaces/PostInterface";
import axios from "axios";
export const postContext = createContext<PostContextType>({
    posts: null,
    isLoading: false,
    handleGetPosts: async () => {}, // Empty function to prevent errors,
  });
  
  
  interface PostContextType {
    posts: PostInterface[] | null;
    isLoading: boolean;
    handleGetPosts: () => Promise<void>;
  }
interface PostsContextProviderProps {
    children: ReactNode;
  }


export default function PostsContext({children}:PostsContextProviderProps) {
     const [isLoading, setIsLoading] = useState<boolean>(false)
      const [posts,setPosts]=useState<null|PostInterface[]>(null)
      const token=Cookies.get('token')
    async function handleGetPosts(){
        
         setIsLoading(true)
     try {
  
           const {data}=await axios.get('https://linked-posts.routemisr.com/posts?limit=50',{
            headers:{
              token,
            }
           })
           setPosts(data.posts)
     } catch (error) {
         console.log(error);
         
     }finally{
      setIsLoading(false)
     }
    }


  return (
    <postContext.Provider value={{handleGetPosts,isLoading,posts}} >

        {children}
    </postContext.Provider>
  )
}

