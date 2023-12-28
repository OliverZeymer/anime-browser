import { getAnimeReviews } from '@/utils/api';
import AnimeReview from './AnimeReview';
import NoResultsFound from './NoResultsFound';

export default async function AnimeReviewList({ id }) {
  // Adding a delay of 3 seconds using setTimeout
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const reviewsData = await getAnimeReviews(id);
  const reviews = reviewsData.data;

  return (
    <div className='flex flex-wrap gap-6 mt-6'>{reviews?.length > 0 && reviewsData ? reviews.map((review) => <AnimeReview review={review} key={review.mal_id} />) : <NoResultsFound />}</div>
  );
}
