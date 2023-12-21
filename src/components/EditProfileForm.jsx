'use client';
import Loader from './Loader';
import { useState } from 'react';
import axios from 'axios';
import AuthContext from '@/contexts/AuthContext';
import { useContext } from 'react';
import { useToast } from './ui/use-toast';
import Image from 'next/image';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form } from './ui/form';
export default function EditProfileForm({ data, refetch }) {
  const { auth, setAuth } = useContext(AuthContext);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const body = {
      id: data?.user?._id,
      name: payload.name,
      email: payload.email,
      description: payload.description,
      discord: payload.discord,
    };
    if (!body.email || !validateEmail(body.email)) {
      return toast({ description: 'Email has to be valid', variant: 'destructive' });
    }
    try {
      setIsLoading(true);
      const res = await axios.put(`/api/user`, body, { headers: { Authorization: `Bearer ${auth?.token}` } });
      if (res.status > 199 && res.status < 300) {
        toast({ description: 'Changes applied', variant: 'success' });
      }
    } catch (error) {
      toast({
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      refetch();
      if (auth._id === data.user._id) setAuth({ ...auth, user: { ...auth, ...body } });
    }
  }
  return (
    <Form onSubmit={handleSubmit} className="bg-">
      <div className='flex justify-between w-full items-center'>
        <DialogHeader className='text-2xl lg:text-3xl xl:text-4xl font-bold text-center text-white text-shadow'>Edit Profile</DialogHeader>
      </div>
      <div className='flex flex-col lg:flex-row items-center lg:gap-16 justify-center'>
        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='name' className='text-lg text-white'>
            Username
          </label>
          <Input type='text' name='username' id='username' placeholder='Username' defaultValue={data?.user?.username} />
        </div>
        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='email' className='text-lg text-white'>
            Email
          </label>
          <Input type='email' name='email' id='email' placeholder='Email' defaultValue={data?.user?.email} />
        </div>
      </div>
      <div className='flex items-center flex-col lg:flex-row lg:gap-16 justify-center'>
        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='discord' className='text-lg text-white'>
            Discord
          </label>
          <Input type='text' name='discord' id='discord' defaultValue={data?.user?.discord} placeholder='Discord' />
        </div>
      </div>
      <div className='flex flex-col w-full gap-1'>
        <label htmlFor='description' className='text-lg text-white'>
          Description
        </label>
        <Textarea placeholder='Description' type='description' name='description' id='description' defaultValue={data?.user?.description} />
      </div>

      <Button className='w-fit mx-auto mt-6' type='submit'>
        {isLoading ? <Loader form /> : 'Apply Changes'}
      </Button>
    </Form>
  );
}
