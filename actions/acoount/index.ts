

import { account } from "@/lib/appwrite";
import { AccountFormType, UserType } from "@/types";
import { updateStudentEmail } from "../student";


export const updateAccount=async(user:AccountFormType)=>{
    const {name}=user
   await account.updateName(name)
}
export const updateEmail=async(email:string,userType:UserType)=>{
    const user= await account.get()
   if(userType==='student'){
    await updateStudentEmail(email,user.$id)
   }
   await account.updateEmail(email,'')
}
export const updatePassword=async(oldPassword:string,newPassword:string)=>{
     await account.updatePassword(newPassword,oldPassword)
}