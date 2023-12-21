import { connectToDB } from "@/utils/database";
import cloudinary from "cloudinary";
import User from "@/models/user.model";

export async function POST(req) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  await connectToDB();
  const { image, username, email } = await req.json();
  const currentUser = await User.findOne({ email });
  if (image) {
    try {
      if (currentUser.profilePicture) {
        const publicId = currentUser.profilePicture.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      const imageUrl = await cloudinary.uploader.upload(image);
      console.log(imageUrl);
      const setUserProfilePicture = await User.findOneAndUpdate({ email }, { profilePicture: imageUrl.secure_url });
      return new Response(JSON.stringify({ success: true, message: "Profile picture updated successfully.", data: setUserProfilePicture }));
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: "Profile picture update failed." }));
    }
  }
  if (username) {
    try {
      const setUserUsername = await User.findOneAndUpdate({ email }, { username });
      return new Response(JSON.stringify({ success: true, message: "Username updated successfully.", data: setUserUsername }));
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: "Username update failed." }));
    }
  }
}
