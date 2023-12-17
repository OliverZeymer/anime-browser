import { model, Schema, models } from "mongoose";

const guideSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    creator: {
      type: String,
      required: [true, "Please provide a creator"],
    },
    image: {
      type: String,
    },
    items: {
      type: Array,
      required: [true, "Please provide a list of items"],
    },
    champion: {
      type: String,
      required: [true, "Please provide a champion"],
    },
    runes: {
      type: Array,
      required: [true, "Please provide a list of runes"],
    },
    summonerSpells: {
      type: Array,
      required: [true, "Please provide a list of summoner spells"],
    },
  },
  { timestamps: true }
);

const Guide = model("Guide", guideSchema);

export default Guide;
