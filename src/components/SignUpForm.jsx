'use client';
import { useState } from 'react';
import { validateForm } from '@/utils/validateForm';
import { createUser } from '@/utils/createUser';
import Loader from './Loader';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';

export default function SignUpForm({ className }) {
  const { toast } = useToast();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredDiscord, setEnteredDiscord] = useState('');
  const [redEmailField, setRedEmailField] = useState(false);
  const [redUsernameField, setRedUsernameField] = useState(false);
  const [redPasswordField, setRedPasswordField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    const isFormValid = validateForm(enteredEmail, enteredPassword, enteredUsername, setRedEmailField, setRedPasswordField, setRedUsernameField, toast, true);
    if (!isFormValid) return;
    createUser(enteredEmail, enteredPassword, enteredUsername, enteredDiscord, toast, setIsLoading);
  }

  return (
    <div className={cn('grid gap-6', className)}>
      <form className='relative flex flex-col gap-4 rounded-lg' onSubmit={submitHandler}>
        <div>
          <label htmlFor='username'>Username</label>
          <Input
            onChange={(e) => {
              setEnteredUsername(e.target.value);
              setRedUsernameField(false);
            }}
            formNoValidate
            type='text'
            placeholder='Enter your username'
            className={`${redUsernameField ? 'border-red-500' : 'border-bg'}`}
            id='username'
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <Input
            onChange={(e) => {
              setEnteredEmail(e.target.value);
              setRedEmailField(false);
            }}
            formNoValidate
            type='email'
            placeholder='Enter your email'
            className={`${redEmailField ? 'border-red-500' : 'border-bg'}`}
            id='email'
          />
        </div>
        <div>
          <label htmlFor='discord'>Discord (optional)</label>
          <Input
            onChange={(e) => {
              setEnteredDiscord(e.target.value);
            }}
            formNoValidate
            type='text'
            placeholder='Enter your discord'
            id='discord'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <Input
            onChange={(e) => {
              setEnteredPassword(e.target.value);
              setRedPasswordField(false);
            }}
            type='password'
            id='password'
            placeholder='Enter your password'
            className={`${redPasswordField ? 'border-red-500' : 'border-bg'}`}
          />
        </div>

        <Button type='submit'>{isLoading ? <Loader className="text-primary-foreground" /> : 'Create Account'}</Button>
      </form>
    </div>
  );
}
