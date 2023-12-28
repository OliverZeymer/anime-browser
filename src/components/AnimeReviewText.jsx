'use client';
import { Fragment } from 'react';

export default function AnimeReviewText({ review, showMore, setShowMore }) {
  const firstThousandCharacters = review.trim().length > 1000 ? review.trim().slice(0, 1000) + '...' : review.trim().slice(0, 1000);
  const restOfCharacters = review.trim().slice(1000);
  const displayedCharacters = showMore ? review : firstThousandCharacters;
  return (
    <>
      <p className='mt-2 leading-relaxed'>
        {displayedCharacters.split('\n').map((paragraph, index) => (
          <Fragment key={index}>
            {paragraph}
            <br />
          </Fragment>
        ))}{' '}
      </p>
    </>
  );
}
