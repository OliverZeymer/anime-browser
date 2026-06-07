import ClickableImage from '@/components/ClickableImage';
import { LanguageFlag } from '@/components/LanguageFlag';

type Props = {
  name: string;
  language: string;
  imageUrl: string;
};

export const VoiceActorCard = ({ name, language, imageUrl }: Props) => {
  return (
    <li className='flex min-w-0 flex-col items-center gap-2'>
      <ClickableImage src={imageUrl} alt={name} variant='avatar' />
      <div className='w-full px-1 text-center'>
        <p className='line-clamp-2 text-sm font-semibold leading-snug'>{name}</p>
        <div className='mt-0.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground'>
          <LanguageFlag language={language} />
          <span>{language}</span>
        </div>
      </div>
    </li>
  );
};
