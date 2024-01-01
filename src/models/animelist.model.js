import { model, models, Schema } from 'mongoose';

const Mixed = Schema.Types.Mixed;

const animeSchema = new Schema({
  mal_id: {
    type: Number,
    required: [true, 'Please provide an anime'],
  },
  url: Mixed,
  images: Object,
  trailer: Object,
  titles: [Mixed],
  title: Mixed,
  title_english: Mixed,
  title_japanese: Mixed,
  title_synonyms: [Mixed],
  type: Mixed,
  source: Mixed,
  episodes: Number,
  status: Mixed,
  airing: Boolean,
  aired: Object,
  duration: Mixed,
  rating: Mixed,
  score: Number,
  scored_by: Number,
  rank: Number,
  popularity: Number,
  members: Number,
  favorites: Number,
  synopsis: Mixed,
  background: Mixed,
  season: Mixed,
  year: Number,
  producers: [Mixed],
  studios: [Mixed],
  genres: [Mixed],
  explicit_genres: [Mixed],
  streaming: [Mixed],
});

const animeListSchema = new Schema({
  user: { type: String, required: true, unique: true },
  anime: [animeSchema],
});

const AnimeList = models.AnimeList || model('AnimeList', animeListSchema);
export default AnimeList;
