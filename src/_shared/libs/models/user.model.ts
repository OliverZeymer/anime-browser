import { model, Schema, models, type Document, type Model } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserDocument = Document & {
  email: string;
  username: string;
  password: string;
  profilePicture?: string;
  description?: string;
  discord?: string;
  savedAnime: string[];
  matchPassword: (password: string) => Promise<boolean>;
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      unique: true,
      required: [true, 'Please provide a username'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    profilePicture: { type: String },
    description: { type: String },
    discord: { type: String },
    savedAnime: { type: [String], default: [] },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User: Model<UserDocument> =
  (models.User as Model<UserDocument> | undefined) ?? model<UserDocument>('User', userSchema);
