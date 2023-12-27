import React from 'react';

export default function AnimeSynopsis({ synopsis }) {
  return (
    <div className='bg-primary-foreground p-4 rounded-2xl h-fit'>
      <h3 className='text-2xl font-bold'>Synopsis</h3>
      <p className='text-lg mt-2'>
        {' '}
        {synopsis.split('\n').map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            <br />
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}
