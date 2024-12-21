

import { account } from "@/lib/appwrite";
//const url=process.env.NEXT_PUBLIC_URL || ''
const url="https://main.d3smjn9bxaomax.amplifyapp.com"
export const loginUser = async (email:string, password:string) => {
   
    const session = await account.createEmailPasswordSession(email, password);
    const user=await account.get()
    if(!user.emailVerification){
       await account.createVerification(url+'/auth/verification')
       await account.deleteSession('current')
     throw new Error('User not verified')

    }
    return session
};