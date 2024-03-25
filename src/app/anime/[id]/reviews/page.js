import AnimeReviewList from '@/components/anime/AnimeReviewList';

export default async function AnimeReviewsPage({ params }) {
  return <AnimeReviewList id={params.id} />;
}
