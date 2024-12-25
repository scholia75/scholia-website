import { CalendarDate } from "@nextui-org/react";


export interface NavDataType{
    id:number,
    name: string,
    link: string,
    icon: string
}
export interface RegisterFormType{
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

   
 }
 export interface PasswordFormType{
    oldPassword:string;
    newPassword:string;
    confirmPassword:string
 }
export interface UserType{
    id:string;
    name:string;
    email:string;
    avatar:string;
    type:'admin' |'partner'|'student';
}

export interface StudnetType{
    id:string;
    firstname:string;
    lastname:string;
    birthdate:CalendarDate;
    birthcountry:string;
    residancecountry:string;
    phone:string;
}