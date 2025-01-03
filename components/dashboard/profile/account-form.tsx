'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Form } from '@nextui-org/react';
import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline'
import { AccountFormType } from '@/types';
import useUserStore from '@/stores/useUserStore';
import { updateAccount } from '@/actions/acoount';
import toast from 'react-hot-toast';

const AccountForm = () => {
   const {admin,updateUser}=useUserStore()
   const [isLoading, setisLoading] = useState(false)
 
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: admin?.name || '',
      email: admin?.email || '',
    },
  });

  const onSubmit = async(data: AccountFormType) => {
     setisLoading(true)
  try {
    updateUser(data)
  
   if(admin){
     await updateAccount(data)
     toast.success('Compte enregistré avec succès')
   }
   

  } catch (error) {
    if(error instanceof Error){
        toast.error(error.message)
    }
  }finally{
    setisLoading(false)
  }
  };

 

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='grid max-md:grid-cols-1 grid-cols-2 gap-5 w-full'>
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
          isDisabled
          onBlur={onBlur}
          onChange={onChange}
          startContent={
              <EnvelopeIcon className="size-6 text-neutral-400" />
          }
         
        />
      )}
    />

 
   

    <Button className='w-full font-medium max-md:col-span-1 col-span-2' color='primary' type="submit" size='lg' isLoading={isLoading}>Sauvgarder</Button>
  </Form>
  );
};

export default AccountForm;
