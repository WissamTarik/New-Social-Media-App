export interface PostInterface{
    _id:string,
    body:string,
    image:string,
    user:User,
    comments:Comments[]|null,
    id:string,
    createdAt:string
}

interface User{
    _id:string,
    name:string,
    photo:string
}
export interface Comments{
    _id:string,
    content:string,
    commentCreator:User,
    post:string,
    createdAt:string
}


