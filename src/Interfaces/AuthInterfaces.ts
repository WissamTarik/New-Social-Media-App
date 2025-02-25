export interface RegisterData{
    email:string,
    password:string,
    dateOfBirth:string,
    name:string,
    rePassword:string,
    gender:"male"|'female'

}
export interface LoginData{
    email:string,
    password:string,


}
export interface RegisterState{
    isLoading:boolean,
    isError:boolean,
    
}
export interface LoginState{
    isLoading:boolean,
    isError:boolean,
    token:null|string
    
}