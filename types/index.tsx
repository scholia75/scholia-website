
export interface RegisterFormType{
    name:string;
    email:string;
    password:string;
    confirmPassword:string
 }
 export interface LoginFromType{
    email:string;
    password:string;
 }
 export interface AccountFormType{
    name:string;
    email:string;
    phone:string;
   
 }
export interface UserType{
    id:string;
    name:string;
    email:string;
    phone:string;
    avatar:string;
    type:string;
}