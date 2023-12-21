import User from '@/models/user.model';
import { connectToDB } from '@/utils/database';

export async function PUT(req) {
  await connectToDB();
  const { id, name, email, description, discord } = req.body;

  // Validate if the 'id' is provided
  if (!id) {
    return new Response(JSON.stringify({ success: false, message: 'User ID not provided.' }));
  }

  // Find the user by ID
  const user = await User.findById(id);

  // Check if the user exists
  if (!user) {
    return new Response(JSON.stringify({ success: false, message: 'User not found.' }));
  }

  // Check if the email already exists
  if (email && email !== user?.email) {
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return new Response(JSON.stringify({ success: false, message: 'Email already exists.' }));
    }
  }
  if (phone && phone !== user?.phone) {
    const existingPhoneUser = await User.findOne({ phone });
    if (existingPhoneUser) {
      return new Response(JSON.stringify({ success: false, message: 'Phone number already exists.' }));
    }
  }

  // Update user properties if provided
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  if (description) {
    user.description = description;
  }
  if (discord) {
    user.discord = discord;
  }

  // Save the updated user
  await user.save();

  return new Response(JSON.stringify({ success: true, message: 'User updated successfully.', data: user }));
}
