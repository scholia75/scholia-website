'use client';
import Header from '@/components/Header';
import { useSession } from '@/hooks/useSession';
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@nextui-org/react';

const RootLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading, session } = useSession();
  const router = useRouter();

  useEffect(() => {
 
    if (!isLoading && session) {
      router.replace('/dashboard'); 
    }
  }, [isLoading, session, router]);

  if (isLoading) {
   
    return (
      <div className="bg-background w-full h-screen overflow-hidden flex justify-center items-center">
      <Spinner color="primary" size="lg" />
    </div>
    );
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
