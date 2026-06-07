'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/AuthContext';
import { setCookie } from 'react-use-cookie';
import { validateLoginForm } from '@/utils/validateForm';
import { logIn } from '@/utils/logIn';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/libs/cn';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

// This gets handled by the [...nextauth] endpoint
export default function SignInForm({ className = '' }: { className?: string }) {
  
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const [redEmailField, setRedEmailField] = useState(false);
  const [redPasswordField, setRedPasswordField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // We keep track of whether in a login / or register state
  const [isLogin] = useState(true);
  const router = useRouter();

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isFormValid = validateLoginForm(
      enteredEmail,
      enteredPassword,
      setRedEmailField,
      setRedPasswordField,
      toast,
    );
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

        <Button aria-label='login' type='submit'>
          {isLoading ? <Loader2 className='h-4 w-4 animate-spin text-primary-foreground' /> : isLogin ? 'Login' : !isLogin ? 'Create Account' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
