'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Form, Card, CardBody } from '@nextui-org/react';
import { LockClosedIcon,EyeIcon,EyeSlashIcon } from '@heroicons/react/24/outline'
import { PasswordFormType } from '@/types';
import { updatePassword } from '@/actions/acoount';
import toast from 'react-hot-toast';

const PasswordForm = () => {
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
     const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
     const [isLoading, setisLoading] = useState(false)
  const { handleSubmit, control, watch,reset } = useForm({
    defaultValues: {
      oldPassword:'',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async(data: PasswordFormType) => {
    setisLoading(true)
 try {
    const {newPassword,oldPassword}=data
    await updatePassword(oldPassword,newPassword)
    toast.success('Compte enregistré avec succès')
    reset()
 } catch (error) {
    if(error instanceof Error){
        toast.error(error.message)
    }
 }finally{
    setisLoading(false)
}
  };

  // Watch password field for confirm password validation
  const password = watch('newPassword');

  return (
  
     <Card className='p-3  w-full mx-auto'>
  
    <CardBody>
    <Form onSubmit={handleSubmit(onSubmit)} className='gap-y-5'>
     

      {/* Password Field */}
      <Controller
        control={control}
        name="oldPassword"
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
             type={isOldPasswordVisible ? "text" : "password"}
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
                  onClick={()=>setIsOldPasswordVisible(!isOldPasswordVisible)}
                >
                  {!isOldPasswordVisible ? (
                   <EyeIcon className="size-6 text-neutral-400" />
                  ) : (
                    <EyeSlashIcon className="size-6 text-neutral-400" />
                  )}
                </button>
              }
          />
        )}
      />


 {/* Password Field */}
 <Controller
        control={control}
        name="newPassword"
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
                  {!isPasswordVisible ? (
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
                  {!isConfirmPasswordVisible ? (
                   <EyeIcon className="size-6 text-neutral-400" />
                  ) : (
                    <EyeSlashIcon className="size-6 text-neutral-400" />
                  )}
                </button>
              }
          />
        )}
      />

      <Button className='w-full font-medium' color='primary' type="submit" size='lg' isLoading={isLoading}>Sauvegarder</Button>
    </Form>
    </CardBody>
 
   </Card>
 
  );
};

export default PasswordForm;
