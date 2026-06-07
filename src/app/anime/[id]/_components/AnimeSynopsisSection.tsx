import AnimeSynopsis from '@/components/anime/AnimeSynopsis';
import { getAnimeById } from '@/libs/jikan/fetch-anime';

type Props = {
  id: number;
};

export const AnimeSynopsisSection = async ({ id }: Props) => {
  const data = await getAnimeById(id);
  const synopsis = data.data?.synopsis?.replace(/\[Written by MAL Rewrite\]$/, '')?.trim();

  return <AnimeSynopsis synopsis={synopsis} />;
};
