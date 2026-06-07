import { model, models, Schema, type Document, type Model } from 'mongoose';
import type { SavedAnimeEntry } from '@/types/saved-anime';

export type AnimeListDocument = Document & {
  user: string;
  anime: SavedAnimeEntry[];
};

const animeSchema = new Schema<SavedAnimeEntry>({
  mal_id: { type: Number, required: [true, 'Please provide an anime'] },
  url: Schema.Types.Mixed,
  images: Object,
  trailer: Object,
  titles: [Schema.Types.Mixed],
  title: Schema.Types.Mixed,
  title_english: Schema.Types.Mixed,
  title_japanese: Schema.Types.Mixed,
  title_synonyms: [Schema.Types.Mixed],
  type: Schema.Types.Mixed,
  source: Schema.Types.Mixed,
  episodes: Number,
  status: Schema.Types.Mixed,
  airing: Boolean,
  aired: Object,
  duration: Schema.Types.Mixed,
  rating: Schema.Types.Mixed,
  score: Number,
  scored_by: Number,
  rank: Number,
  popularity: Number,
  members: Number,
  favorites: Number,
  synopsis: Schema.Types.Mixed,
  background: Schema.Types.Mixed,
  season: Schema.Types.Mixed,
  year: Number,
  producers: [Schema.Types.Mixed],
  studios: [Schema.Types.Mixed],
  genres: [Schema.Types.Mixed],
  explicit_genres: [Schema.Types.Mixed],
  streaming: [Schema.Types.Mixed],
});

const animeListSchema = new Schema<AnimeListDocument>({
  user: { type: String, required: true, unique: true },
  anime: [animeSchema],
});

export const AnimeList: Model<AnimeListDocument> =
  (models.AnimeList as Model<AnimeListDocument> | undefined) ??
  model<AnimeListDocument>('AnimeList', animeListSchema);
