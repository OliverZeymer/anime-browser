'use client';
import { useState } from 'react';
export default function CollapsedText({ text, isReview }) {
  const [showMore, setShowMore] = useState(false);
  const maxText = 500 + (isReview ? 1000 : 0);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const truncatedText = text ? text.slice(0, maxText) : '';
  if (!text || text.length === 0) return <p className='lg:text-lg mt-2 leading-relaxed'>No text available.</p>;
  return (
    <p className='lg:text-lg mt-2 leading-relaxed' style={{ whiteSpace: 'pre-line' }}>
      {truncatedText ? (
        <>
          {/* Display the truncated text */}
          {truncatedText}

          {/* Conditionally apply blur class to the remaining text */}
          {showMore && text.slice(maxText)}

          {/* Show more/less button */}
          {text.length > maxText && !showMore && (
            <>
              {'... '}
              <button className='inline-flex underline underline-offset-4 font-semibold items-center' onClick={toggleShowMore}>
                Show more
              </button>
            </>
          )}
          {showMore && (
            <>
              {' '}
              <button className='inline-flex underline underline-offset-4 font-semibold items-center' onClick={toggleShowMore}>
                Show less
              </button>
            </>
          )}
        </>
      ) : (
        'No text available.'
      )}
    </p>
  );
}
