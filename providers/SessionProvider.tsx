'use client';

import { getStudnet } from '@/actions/student';
import { useSession } from '@/hooks/useSession';
import { account } from '@/lib/appwrite';
import useUserStore from '@/stores/useUserStore';
import { UserType } from '@/types';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isLoading, session } = useSession();
const {setUser,setStudent}=useUserStore()
  useEffect(() => {

    const fetchUser=async()=>{
        const userAccount=await account.get() 
        const avatar=userAccount.prefs['avatar']
        const type=userAccount.prefs['userType']
        const userData:UserType={
            id:userAccount.$id,
            name:userAccount.name,
            email:userAccount.email,
            type,
            avatar
        }
        setUser(userData)
    if(type==='student'){
        const student=await getStudnet(userAccount.$id)
        console.log(student)
       setStudent(student)
    }
    }
    if (!isLoading && !session) {
      router.replace('/auth/login');
    }else{
       if(session){
        fetchUser()
       }
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return (
      <div className="bg-background w-full h-screen overflow-hidden flex justify-center items-center">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
};

export default SessionProvider;
