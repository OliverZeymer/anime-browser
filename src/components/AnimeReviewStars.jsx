'use client';
import { Star } from 'lucide-react';

export default function AnimeReviewStars({ rating }) {
  console.log(rating);
  return (
    <div className='flex flex-col items-center gap-2'>
      
    <div className='flex'>
      {[...Array(10)].map((_, i) => {
        const ratingValue = i + 0;
        console.log(ratingValue)
        return <Star key={i +1} fill={ratingValue < rating ? '#5A2E98' : 'none'} color={ratingValue < rating ? '#5A2E98' : '#737373'} />;
      })}
    </div>
    <p className='text-neutral-400 text-sm'>{rating}/10</p>
      </div>
  );
}
