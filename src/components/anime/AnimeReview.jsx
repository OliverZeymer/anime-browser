import AnimeReviewStars from './AnimeReviewStars';
import { Badge } from '../ui/badge';
import PrimaryCard from '../PrimaryCard';
import CollapsedText from '../CollapsedText';
export default function AnimeReview({ review }) {
  return (
    <PrimaryCard key={review.mal_id} className='flex flex-col gap-2'>
      <div className='flex justify-between gap-6 flex-col md:flex-row'>
        <div className='flex gap-6 flex-col md:flex-row'>
          <div className='flex gap-2 items-center justify-center md:justify-start'>
            <img className='rounded-full aspect-square object-cover h-14 w-14' src={review.user.images.webp.image_url} />
            <p className='text-lg'>{review.user.username}</p>
          </div>
          <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
            {review.tags.map((tag) => (
              <Badge key={tag} className='text-sm w-fit'>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <AnimeReviewStars rating={review.score} />
      </div>
      <CollapsedText className="text-sm lg:text-base" isReview text={review.review} />
    </PrimaryCard>
  );
}
