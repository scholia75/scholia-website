'use client';
import { useSession } from '@/hooks/useSession';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isLoading, session } = useSession();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace('/auth/login');
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
