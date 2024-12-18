'use client';

import { useSession } from '@/hooks/useSession';
import { account } from '@/lib/appwrite';
import useUserStore from '@/stores/useUserStore';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isLoading, session } = useSession();
const {setUser}=useUserStore()
  useEffect(() => {

    const fetchUser=async()=>{
        const userAccount=await account.get() 
        const avatar=userAccount.prefs['avatar']
        const type=userAccount.prefs['userType']
        const userData={
            id:userAccount.$id,
            name:userAccount.name,
            phone:userAccount.phone,
            email:userAccount.email,
            type,
            avatar
        }
       console.log(userData)
        setUser(userData)
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
