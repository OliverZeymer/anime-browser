import User from "@/models/user.model";
import { connectToDB } from "@/utils/database";

export async function POST(req) {
  await connectToDB();
  const { email, password } = await req.json();
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, message: "Email already exists" }), {
        status: 409,
      });
    }

    const user = await User.create({
      email,
      password,
    });

    return new Response(JSON.stringify({ success: true, data: user }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
