import User from '@/models/user.model';
import { connectToDB } from '@/utils/database';
import jwt from 'jsonwebtoken';
export async function POST(req) {
  await connectToDB();
  const { email, password, username, discord } = await req.json();
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return new Response(JSON.stringify({ success: false, message: 'Email already exists' }), {
        status: 409,
      });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return new Response(JSON.stringify({ success: false, message: 'Username already exists' }), {
        status: 409,
      });
    }

    const user = await User.create({
      email,
      password,
      username,
      discord,
    });
    const newToken = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET);

    return new Response(JSON.stringify({ success: true, data: { user, token: newToken } }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
