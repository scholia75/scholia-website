'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Form, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import Link from 'next/link';
import { LockClosedIcon,EnvelopeIcon,EyeIcon,EyeSlashIcon, UserIcon } from '@heroicons/react/24/outline'
import {motion} from 'framer-motion'
import { RegisterFormType } from '@/types';

const RegisterForm = () => {
     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
     const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormType) => {
    console.log(data);
  };

  // Watch password field for confirm password validation
  const password = watch('password');

  return (
  <motion.div 
  initial={{ y: -100, opacity: 0 }} 
    whileInView={{ y: 0, opacity: 1 }} 
    viewport={{ once: true, amount: 0.5 }} 
    transition={{ type: "spring", stiffness: 50, duration: 0.8 }}
  className='w-full'>
     <Card className='p-3  max-w-md mx-auto'>
     <CardHeader className="flex flex-col items-start ">
     <h1 className="text-2xl font-bold uppercase">Créer un compte</h1>
     <p className="body">Remplissez les champs ci-dessous pour créer un nouveau compte. </p>
     </CardHeader>
    <CardBody>
    <Form onSubmit={handleSubmit(onSubmit)} className='gap-y-5'>
      {/* Name Field */}
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Le nom est obligatoire.',
        }}
        render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
          <Input
            ref={ref}
            isRequired
            errorMessage={error?.message}
            validationBehavior="aria"
            isInvalid={invalid}
            label="Nom"
             labelPlacement="outside"
            placeholder="Entrez votre nom"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            startContent={
                <UserIcon className="size-6 text-neutral-400" />
            }
          />
        )}
      />

      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'L\'adresse e-mail est obligatoire.',
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
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
            message: 'Le mot de passe doit contenir au moins une lettre majuscule et un symbole.',
          },
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
             type={isPasswordVisible ? "text" : "password"}
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
                  onClick={()=>setIsPasswordVisible(!isPasswordVisible)}
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

      {/* Confirm Password Field */}
      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'Veuillez confirmer votre mot de passe.',
          validate: (value) => value === password || 'Les mots de passe ne correspondent pas.',
        }}
        render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
          <Input
            ref={ref}
            isRequired
            errorMessage={error?.message}
            validationBehavior="aria"
            isInvalid={invalid}
            label="Confirmez le mot de passe"
             labelPlacement="outside"
             type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirmez votre mot de passe"
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
                  onClick={()=>setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                >
                  {isConfirmPasswordVisible ? (
                   <EyeIcon className="size-6 text-neutral-400" />
                  ) : (
                    <EyeSlashIcon className="size-6 text-neutral-400" />
                  )}
                </button>
              }
          />
        )}
      />

      <Button className='w-full font-medium' color='primary' type="submit" size='lg'>S&apos;inscrire</Button>
    </Form>
    </CardBody>
    <CardFooter className='flex flex-row flex-wrap  justify-center gap-x-1   max-sm:text-sm '>
    <span className="text-neutral-500 text-nowrap"> Vous avez déjà un compte ?  </span>
    <Link href={'/auth/login'} className=" text-primary font-medium text-nowrap"> Connectez-vous  </Link>
    </CardFooter>
   </Card>
  </motion.div>
  );
};

export default RegisterForm;
