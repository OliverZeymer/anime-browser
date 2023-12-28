import { Fragment } from 'react';

export default function CharacterAbout({ about }) {
  return (
    <div className='bg-primary-foreground p-4 rounded-2xl h-fit'>
      <h3 className='text-xl lg:text-2xl font-bold'>About</h3>
      <p className='leading-relaxed lg:text-lg mt-2'>
        {about
          ? about.split('\n').map((paragraph, index) => (
              <Fragment key={index}>
                {paragraph}
                <br />
              </Fragment>
            ))
          : 'No about text found'}
      </p>
    </div>
  );
}
