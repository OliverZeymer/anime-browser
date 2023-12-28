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
      <AnimeReviewText review={review.review} showMore={showMore} setShowMore={setShowMore} />
      {review.review.trim().length > 1000 && (
        <Button aria-label='show more' className='w-fit mx-auto' variant='secondary' onClick={() => setShowMore(!showMore)}>
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
