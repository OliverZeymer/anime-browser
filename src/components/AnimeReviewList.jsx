import { getAnimeReviews } from '@/utils/api';

import AnimeReview from './AnimeReview';

export default async function AnimeReviewList({ id }) {
  const reviewsResponse = await getAnimeReviews(id);
  const reviewsData = await reviewsResponse.json();
  const reviews = reviewsData.data;
  return (
    <div className='flex flex-wrap gap-6 mt-6'>
      {reviews?.length > 0 && reviewsData ? (
        reviews.map((review) => (
          <AnimeReview review={review} key={review.mal_id} />
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}
