import { CalendarDate } from "@nextui-org/react";



export type DocumentType= 'passport'|'bac'|'language'|'cv'|'marks'

export interface FileType{
 id:string;
 fileName:string;
 type:DocumentType;
 fileUrl:string;
 size:number;
 status:'en attente'|'valide'|'invalide';
 note:string
}
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

export type UserType='admin' |'partner'|'student'

export interface AdminType{
    id:string;
    name:string;
    email:string;
    avatar:string;
}

export interface StudnetType{
    id:string;
    firstname:string;
    lastname:string;
    birthdate:CalendarDate;
    birthcountry:string;
    residancecountry:string;
    phone:string;
    email:string;
    avatar:string;
  
}

export interface PartnerType{
    id:string;
    name:string;
    country:string;
    phone:string;
    email:string;
    avatar:string;
    status:'en attente'|'actif'
}

export interface TrainingType{
    id:string;
    shortName:string;
    longName:string;
    level:number;
}