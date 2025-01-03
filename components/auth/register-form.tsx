'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Form} from '@nextui-org/react';
import { LockClosedIcon,EnvelopeIcon,EyeIcon,EyeSlashIcon } from '@heroicons/react/24/outline'
import { RegisterFormType } from '@/types';
import toast from 'react-hot-toast';
import { register } from '@/actions/auth/register';
import useRegistrationStore from '@/stores/useRegistrationStore';

import { createStudent, updateStudentEmail } from '@/actions/student';
import useUserStore from '@/stores/useUserStore';

const RegisterForm = () => {
  
    const {student}=useUserStore()
     const [isPasswordVisible, setIsPasswordVisible] = useState(false);
     const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
     const [isLoading, setIsLoading] = useState(false)
     const {userType,setStep}=useRegistrationStore()
  const { handleSubmit, control, watch,reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async(data: RegisterFormType) => {
    setIsLoading(true)
    try {
        const {email,password}=data
      if(student){
        const name=student.firstname+' '+student.lastname
        const id=student.id
        await register(id,email,password,name,userType)
        await createStudent(student)
        await updateStudentEmail(email,id)
        
      }
        
       // toast.success('Lien de vérification envoyé à votre email')
        reset()
        setStep(4)
    } catch (error) {
        if(error instanceof Error){
            toast.error(error.message)
        }
    }finally{
        setIsLoading(false)
    }
  
  };

  // Watch password field for confirm password validation
  const password = watch('password');

  return (
 
    <Form onSubmit={handleSubmit(onSubmit)}  className="gap-y-5">
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
          className='max-md:col-span-1 col-span-2'
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
          className='max-md:col-span-1 col-span-2'
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
<div className='w-full grid grid-cols-2 max-md:grid-cols-1 gap-3'>
    <Button className="w-full font-medium " variant='bordered' color="primary" size='lg' type="button"  onPress={()=>setStep(2)} >
    Précédent
    </Button>
    <Button className='w-full font-medium' color='primary' type="submit" size='lg' isLoading={isLoading}>S&apos;inscrire</Button>
    </div>
    

   
  </Form>


  );
};

export default RegisterForm;
