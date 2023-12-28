'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '@/contexts/AuthContext';
import { setCookie } from 'react-use-cookie';
import { validateForm } from '@/utils/validateForm';
import { logIn } from '@/utils/logIn';
import Loader from './Loader';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';

// This gets handled by the [...nextauth] endpoint
export default function SignInForm({ className }) {
  const { toast } = useToast();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const [redEmailField, setRedEmailField] = useState(false);
  const [redPasswordField, setRedPasswordField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // We keep track of whether in a login / or register state
  const [isLogin] = useState(true);
  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();
    const isFormValid = validateForm(enteredEmail, enteredPassword, setRedEmailField, setRedPasswordField, toast, false);
    if (!isFormValid) return;
    logIn(enteredEmail, enteredPassword, router, toast, setAuth, setCookie, setIsLoading);
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

        <Button ariaLabel='login' type='submit'>
          {isLoading ? <Loader className='text-primary-foreground' /> : isLogin ? 'Login' : !isLogin ? 'Create Account' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
