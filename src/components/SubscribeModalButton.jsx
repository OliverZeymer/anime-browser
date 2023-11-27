'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Mail } from 'lucide-react';
export default function SubscribeModalButton() {
  const FormSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  });

  function onSubmit(data) {
    toast({
      title: 'You subscribed to Anime Browser!',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  });
  return (
    <Dialog>
      <Button asChild className='text-lg p-6'>
        <DialogTrigger className='flex gap-3 items-center'>
          <Mail size={22} />
          Subscribe Now
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>So you want to subscribe to Anime Browser?</DialogTitle>
          <DialogDescription>By subscribing to Anime Browser, you will get access to all the latest Anime Movies and Shows.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                  <div className='flex items-center space-x-2 !mt-4'>
                    <Checkbox id='news' className='' />
                    <Label htmlFor='news'>I want to receive news from Anime Browser.</Label>
                  </div>
                </FormItem>
              )}
            />

            <Button type='submit'>Subscribe</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
