import PrimaryCard from '../PrimaryCard';
import CollapsedText from '../CollapsedText';

type Props = {
  about?: string | null;
};

export default function CharacterAbout({ about }: Props) {
  return (
    <PrimaryCard>
      <h3 className='text-xl lg:text-2xl font-bold'>About</h3>
      <CollapsedText text={about ?? undefined} />
    </PrimaryCard>
  );
}
