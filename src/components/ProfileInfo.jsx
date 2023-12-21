import { Check, Copy, Facebook, Linkedin, Phone } from 'lucide-react';
import { useContext, useState } from 'react';
import AuthContext from '@/contexts/AuthContext';
import { useToast } from './ui/use-toast';
import DiscordIcon from './icons/DiscordIcon';
export default function ProfileInfo({ data }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { auth } = useContext(AuthContext);
  return (
    <>
      <h1 className='text-black dark:text-white text-center text-xl font-bold leading-[48px] md:text-4xl md:leading-[64px] lg:text-left lg:text-5xl lg:leading-[74px] xl:text-6xl xl:leading-[86px]'>
        {data.username}
      </h1>
      <div className='cursor-pointer flex items-center'>
        <a href={`mailto:${data?.email}`} className='text-base lg:text-xl xl:text-2xl font-semibold ml-2'>
          {data?.email ? data?.email : 'You haven\'t added an email yet'}
        </a>
        {!copied ? (
          <Copy
            title='Copy Email'
            className='ml-2'
            size={24}
            onClick={(e) => {
              e.stopPropagation();
              if (data?.email) {
                navigator.clipboard.writeText(data?.email);
                setCopied(true);
                toast({ description: 'Email copied', variant: 'success' });
              }
            }}
          />
        ) : (
          <Check
            onClick={(e) => {
              e.stopPropagation();
              setCopied(false);
            }}
            title='Email copied'
            className='ml-2'
            size={24}
          />
        )}
      </div>
      <div className='text-2xl font-semibold'>
        {data?.phone && (
          <>
            <a className='flex items-center text-lg lg:text-xl xl:text-2xl' href={`tel:${data?.phone}`}>
              <Phone className='mr-2' /> {data?.phone}
            </a>
          </>
        )}
      </div>
      {data?.socials && (
        <div className='flex gap-2 mt-2'>
          {data?.socials?.facebook && (
            <Tooltip title='Discord Profile' position='bottom'>
              <a href={data?.socials?.facebook} target='_blank' rel='noopener noreferrer'>
                <DiscordIcon className="w-8" />
              </a>
            </Tooltip>
          )}
        </div>
      )}
    </>
  );
}
