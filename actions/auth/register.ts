import { account, ID } from "@/lib/appwrite"

const url=process.env.NEXT_PUBLIC_URL || ''
export const register=async(email:string,password:string,name:string,userType:'partner' | 'student')=>{
   const id=ID.unique()
   await account.create(id,email,password,name)
   await account.createEmailPasswordSession(email, password);
   
   await account.updatePrefs({userType: userType, avatar: ''});
   await account.createVerification(url+'/auth/verification')
   await account.deleteSession('current')
}