import React, { FormEvent, useState } from "react";
import { Form, Input, Button, Card } from "@nextui-org/react";
import { LockClosedIcon,EnvelopeIcon,EyeIcon,EyeSlashIcon } from '@heroicons/react/24/solid'
import Link from "next/link";
type FormData = {
  email: string;
  password: string;
};

type Errors = {
  email?: string;
  password?: string;
};

const LoginForm = () => {
  const [password, setPassword] = useState<string>("");
  const [submitted, setSubmitted] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const getPasswordError = (value: string): string | null => {
    if (value.length < 4) {
      return "Le mot de passe doit comporter 4 caractères ou plus";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Le mot de passe doit contenir au moins une lettre majuscule";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Le mot de passe doit contenir au moins un symbole";
    }

    return null;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: FormData = Object.fromEntries(formData.entries()) as FormData;

    // Custom validation checks
    const newErrors: Errors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    console.log(data)
    setSubmitted(data);
  };

  return (
    <Card className="p-6 max-w-md mx-auto space-y-4">
     <div className="space-y-2">
     <h1 className="text-2xl font-bold uppercase">Se connecter</h1>
     <p className="body">Connectez-vous pour accéder à votre compte. </p>
     </div>
      <Form
        className="w-full items-center space-y-4 "
        validationBehavior="aria"
        validationErrors={errors}
        onReset={() => setSubmitted(null)}
        onSubmit={onSubmit}
      >
        <Input
            isRequired
            startContent={<EnvelopeIcon className="size-6 text-neutral-400" />}
            errorMessage={({ validationDetails }) => {
              if (validationDetails?.valueMissing) {
                return "Veuillez entrer votre email";
              }
              if (validationDetails?.typeMismatch) {
                return "Veuillez entrer une adresse email valide";
              }
              return "";
            }}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Entrez votre email"
            type="email"
          />

          <Input
            isRequired
            startContent={<LockClosedIcon className="size-6 text-neutral-400" />}
            errorMessage={getPasswordError(password)}
            isInvalid={getPasswordError(password) !== null}
            label="Mot de passe"
            labelPlacement="outside"
            name="password"
            placeholder="Entrez votre mot de passe"
            type={isVisible ? "text" : "password"}
            value={password}
            onValueChange={setPassword}
            endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                   <EyeIcon className="size-6 text-neutral-400" />
                  ) : (
                    <EyeSlashIcon className="size-6 text-neutral-400" />
                  )}
                </button>
              }
          />
          <Link href={'/auth/login'} className="text-primary w-full font-medium">Mot de passe oublié ?</Link>
<Button className="w-full font-medium" color="primary" type="submit" size="lg">
         Se connecter
            </Button> 
            <div>
            <span className="text-neutral-500">Vous n'avez pas de compte ?  </span>
            <Link href={'/auth/register'} className=" text-primary font-medium">Inscrivez-vous</Link>
          
            </div>
      </Form>
    </Card>
  );
};

export default LoginForm;
