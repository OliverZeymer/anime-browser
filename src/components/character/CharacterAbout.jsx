import PrimaryCard from '../PrimaryCard';
import CollapsedText from '../CollapsedText';

export default function CharacterAbout({ about }) {
  return (
    <PrimaryCard>
      <h3 className='text-xl lg:text-2xl font-bold'>About</h3>
      <CollapsedText text={about} />
    </PrimaryCard>
  );
}
