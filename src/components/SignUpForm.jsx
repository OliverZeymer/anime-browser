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
  const [redEmailField, setRedEmailField] = useState(false);
  const [redPasswordField, setRedPasswordField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    const isFormValid = validateForm(enteredEmail, enteredPassword, setRedEmailField, setRedPasswordField, toast);
    if (!isFormValid) return;
    createUser(enteredEmail, enteredPassword, toast, setIsLoading);
  }

  return (
    <div className={cn('grid gap-6', className)}>
      <form className='relative flex flex-col gap-4 rounded-lg' onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Your Email</label>
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
          <label htmlFor='password'>Your Password</label>
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

        <Button type='submit'>{isLoading ? <Loader size='sm' /> : 'Create Account'}</Button>
      </form>
    </div>
  );
}
