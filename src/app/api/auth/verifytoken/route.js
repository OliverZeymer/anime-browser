import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { connectToDB } from "@/utils/database";

export async function GET(req) {
  const authorizationHeader = req.headers.get("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ success: false, message: "Invalid authorization header" }), {
      status: 401,
    });
  }
  const token = authorizationHeader.replace("Bearer ", "");
  await connectToDB();
  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    // Retrieve the user account using the email from the decoded token
    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), {
        status: 404,
      });
    }

    // Return the user account data
    return new Response(
      JSON.stringify({
        success: true,
        user,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 401,
    });
  }
}
