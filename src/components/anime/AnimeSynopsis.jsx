import CollapsedText from '../CollapsedText';
import PrimaryCard from '../PrimaryCard';

export default function AnimeSynopsis({ synopsis }) {
  return (
    <PrimaryCard>
      <h3 className='text-xl lg:text-2xl font-bold'>Synopsis</h3>
      <CollapsedText text={synopsis} />
    </PrimaryCard>
  );
}
