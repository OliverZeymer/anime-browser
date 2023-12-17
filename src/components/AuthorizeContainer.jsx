'use client';

import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Link from 'next/link';
import { Button } from './ui/button';

export default function SignUpContainer() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div
      className='min-h-screen w-full flex items-center justify-center'
      style={{
        backgroundImage: "url('/images/csm.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      <div className='absolute inset-0 bg-black opacity-80'></div>
      <div className='mx-auto bg-background border-2 border-muted rounded-xl z-10 p-12 box-content flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>{isSignUp ? 'Create an account' : 'Log in with your account'}</h1>
          <p className='text-sm text-muted-foreground'>
            {isSignUp ? 'Create an account to save your progress and get personalized recommendations.' : 'Log in to get a personalized experience.'}
          </p>
        </div>
        {isSignUp ? <SignUpForm /> : <SignInForm />}
        <Button onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}</Button>
        <p className='px-8 text-center text-sm text-muted-foreground'>
          By clicking continue, you agree to our{' '}
          <Link href='/terms' className='underline underline-offset-4 hover:text-primary'>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href='/privacy' className='underline underline-offset-4 hover:text-primary'>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
