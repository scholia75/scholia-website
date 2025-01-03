'use client';

import { getStudnet } from '@/actions/student';
import { useSession } from '@/hooks/useSession';
import { account } from '@/lib/appwrite';
import useUserStore from '@/stores/useUserStore';
import { AdminType } from '@/types';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isLoading, session } = useSession();
const {setStudent,setAdmin,setUserType}=useUserStore()

  useEffect(() => {

    const fetchUser=async()=>{
        const userAccount=await account.get() 
       
        const type=userAccount.prefs['userType']
        setUserType(type)
        if(type==='admin'){
            const admin:AdminType={
             id:userAccount.$id,
             name:userAccount.name,
             email:userAccount.email,
             avatar:userAccount.prefs['avatar']
            }

           setAdmin(admin)
        }

    if(type==='student'){
        const student=await getStudnet(userAccount.$id)
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
