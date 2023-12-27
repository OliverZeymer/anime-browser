'use client';
import { Fragment } from 'react';

export default function AnimeReviewText({ review, showMore, setShowMore }) {
  const firstThousandCharacters = review.trim().slice(0, 1000);
  const restOfCharacters = review.trim().slice(1000);
  const displayedCharacters = showMore ? review : firstThousandCharacters;
  return (
    <>
      <p className='mt-2'>
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
