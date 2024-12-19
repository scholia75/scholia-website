

import { account } from "@/lib/appwrite";
import { AccountFormType } from "@/types";


export const updateAccount=async(user:AccountFormType)=>{
    const {name}=user
   await account.updateName(name)
}
export const updatePassword=async(oldPassword:string,newPassword:string)=>{
     await account.updatePassword(newPassword,oldPassword)
}