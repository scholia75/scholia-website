'use client';
import { account } from '@/lib/appwrite';
import { Card, CardBody, CardFooter, CardHeader, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const VerificationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [secret, setSecret] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Ensure this code runs only in the browser (client-side)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const userIdFromUrl = urlParams.get('userId');
      const secretFromUrl = urlParams.get('secret');
// Ensure userIdFromUrl and secretFromUrl are not null before setting the state
if (userIdFromUrl) {
    setUserId(userIdFromUrl);
  }
  if (secretFromUrl) {
    setSecret(secretFromUrl);
  }
      const verifyAccount = async () => {
        if (userId && secret) {
          try {
            await account.updateVerification(userId, secret);
            setSuccess(true);
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            }
          } finally {
            setIsLoading(false);
          }
        } else {
          router.back();
        }
      };

      verifyAccount();
    }
  }, [router, userId, secret]);

  if (isLoading) {
    return (
      <div className="bg-background w-full h-screen overflow-hidden flex justify-center items-center">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 py-10">
        <Card className="p-3 max-w-xl mx-auto mt-10">
          <div className="w-full flex justify-center">
            {success ? (
              <CheckCircleIcon className="size-14 text-success text-center" />
            ) : (
              <ExclamationCircleIcon className="size-14 text-danger text-center" />
            )}
          </div>
          <CardHeader>
            <h5 className="h5 text-center w-full">
              {success ? 'Vérification réussie' : 'Erreur'}
            </h5>
          </CardHeader>
          <CardBody>
            <p className="text-default-500 w-full text-center">
              {success
                ? 'Votre compte a été confirmé avec succès. Vous pouvez maintenant accéder à toutes les fonctionnalités.'
                : error}
            </p>
          </CardBody>
          {success && (
            <CardFooter>
              <Link href={'/auth/login'} className="underline text-primary font-medium w-full text-center">
                Se connecter
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
};

export default VerificationPage;
