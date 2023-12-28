'use client';
import { useState } from 'react';
import { Card } from './ui/card';
import AnimeReviewText from './AnimeReviewText';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AnimeReviewStars from './AnimeReviewStars';
import { Badge } from './ui/badge';
export default function AnimeReview({ review }) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div key={review.mal_id} className='bg-primary-foreground p-4 rounded-2xl flex flex-col gap-2'>
      <div className='flex justify-between gap-6 flex-col sm:gap-0 sm:flex-row'>
        <div className='flex gap-2 justify-center sm:justify-start'>
          <img className='rounded-full aspect-square object-cover h-14 w-14' src={review.user.images.webp.image_url} />
          <div className='flex flex-col justify-between'>
            <p className='text-lg'>{review.user.username}</p>
            {review.tags.map((tag) => (
              <Badge key={tag} className='text-sm'>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <AnimeReviewStars rating={review.score} />
      </div>
      <AnimeReviewText review={review.review} showMore={showMore} setShowMore={setShowMore} />
      {review.review.trim().length > 1000 && (
        <Button className='w-fit mx-auto' variant='secondary' onClick={() => setShowMore(!showMore)}>
          {showMore ? (
            <>
              <span>Show Less</span>
              <ChevronUp className='ml-1' size={16} />
            </>
          ) : (
            <>
              <span>Show More</span>
              <ChevronDown className='ml-1' size={16} />
            </>
          )}
        </Button>
      )}
    </div>
  );
}
