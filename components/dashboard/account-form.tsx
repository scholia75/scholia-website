'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Form } from '@nextui-org/react';
import { PhoneIcon,EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline'

import { AccountFormType } from '@/types';
import useUserStore from '@/stores/useUserStore';

const AccountForm = () => {
   const {user,updateUser}=useUserStore()
   const [isLoading, setisLoading] = useState(false)
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      
    },
  });

  const onSubmit = async(data: AccountFormType) => {
     setisLoading(true)
  try {
    updateUser(data)
  } catch (error) {
        console.log(error)
  }finally{
    setisLoading(false)
  }
  };

 

  return (
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

  {/* Name Field */}
  <Controller
      control={control}
      name="phone"
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
          label="Téléphone"
           labelPlacement="outside"
          placeholder="Entrez votre numéro de téléphone"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          startContent={
              <PhoneIcon className="size-6 text-neutral-400" />
          }
        />
      )}
    />
   

    <Button className='w-full font-medium' color='primary' type="submit" size='lg' isLoading={isLoading}>Sauvgarder</Button>
  </Form>
  );
};

export default AccountForm;
