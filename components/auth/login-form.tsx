'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Form, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import Link from 'next/link';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/appwrite';
import {Alert} from "@nextui-org/alert";
interface LoginFromType{
   email:string;
   password:string
}
const LoginForm = () => {
  const router=useRouter()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async(data: LoginFromType) => {
    setIsLoading(true)
      try {
        console.log(data)
        const {email,password}=data
      const session=await loginUser(email,password)
      if(session){
        router.push('/dashboard')
      }
     
     
      } catch (error:unknown) {
       if(error instanceof Error){
       if(error.message==='Invalid credentials. Please check the email and password.'){
        setError("Adresse e-mail ou mot de passe incorrect.")
       }
        
       }
      }finally{
        setIsLoading(false)
      }
    
  };

  return (
    <motion.div 
    initial={{ y: -100, opacity: 0 }} 
    whileInView={{ y: 0, opacity: 1 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ type: "spring", stiffness: 50, duration: 0.8 }}
    className='w-full'
    >
      <Card className="p-3 max-w-md mx-auto">
      <CardHeader className="flex flex-col items-start">
        <h1 className="text-2xl font-bold uppercase">Se connecter</h1>
        <p className="body">Entrez vos identifiants pour accéder à votre compte.</p>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)} className="gap-y-5">
          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: "L'adresse e-mail est obligatoire.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Veuillez entrer une adresse e-mail valide.',
              },
            }}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
              <Input
                ref={ref}
                isRequired
                errorMessage={error?.message}
                validationBehavior="aria"
                isInvalid={invalid}
                label="Adresse e-mail"
                labelPlacement="outside"
                type="email"
                placeholder="Entrez votre adresse e-mail"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                startContent={
                  <EnvelopeIcon className="size-6 text-neutral-400" />
              }
              />
            )}
          />

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Le mot de passe est obligatoire.',
              minLength: { value: 8, message: 'Le mot de passe doit contenir au moins 8 caractères.' },
            }}
            render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
              <Input
                ref={ref}
                isRequired
                errorMessage={error?.message}
                validationBehavior="aria"
                isInvalid={invalid}
                label="Mot de passe"
                labelPlacement="outside"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Entrez votre mot de passe"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                  startContent={
                                <LockClosedIcon className="size-6 text-neutral-400" />
                            }
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <EyeIcon className="size-6 text-neutral-400" />
                    ) : (
                      <EyeSlashIcon className="size-6 text-neutral-400" />
                    )}
                  </button>
                }
              />
            )}
          />

{error && <Alert
        hideIconWrapper
        color="danger"
        description={error}
        title="Erorr"
        variant="bordered"
      />}
          <Link href={'/'} className='text-primary font-medium'>Mot de passe oublié ?</Link>
          <Button className="w-full font-medium" color="primary" size='lg' type="submit" isLoading={isLoading} >
            Se connecter
          </Button>
        </Form>
      </CardBody>
      <CardFooter className="flex flex-row flex-wrap justify-center gap-x-1 max-sm:text-sm">
        <span className="text-neutral-500 text-nowrap">Vous n&apos;avez pas de compte ?</span>
        <Link href={'/auth/register'} className="text-primary font-medium text-nowrap">
          Inscrivez-vous
        </Link>
      </CardFooter>
    </Card>
    </motion.div>
  );
};

export default LoginForm;
