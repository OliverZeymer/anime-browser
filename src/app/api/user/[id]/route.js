import User from '@/models/user.model';
import { connectToDB } from '@/utils/database';

export async function GET(req, context) {
  await connectToDB();
  const { params } = context;
  const id = params.id;
  const user = await User.findById(id, { password: 0 });
  if (!user) {
    return new Response(JSON.stringify({ success: false, message: 'User not found.' }));
  }
  return new Response(JSON.stringify({ success: true, message: 'User fetched successfully.', data: user }));
}


// router.route('/').put(async (req, res) => {
//   try {
//     const { id, name, email, title, phone, facebook, linkedin } = req.body;

//     // Validate if the 'id' is provided
//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID not provided',
//       });
//     }

//     // Find the user by ID
//     const user = await User.findById(id);

//     // Check if the user exists
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found',
//       });
//     }

//     // Check if the email already exists
//     if (email && email !== user?.email) {
//       const existingEmailUser = await User.findOne({ email });
//       if (existingEmailUser) {
//         return res.status(400).json({
//           success: false,
//           message: 'Email already exists',
//         });
//       }
//     }
//     if (phone && phone !== user?.phone) {
//       const existingPhoneUser = await User.findOne({ phone });
//       if (existingPhoneUser) {
//         return res.status(400).json({
//           success: false,
//           message: 'Phone number already exists',
//         });
//       }
//     }

//     // Update user properties if provided
//     if (name) {
//       user.name = name;
//     }
//     if (email) {
//       user.email = email;
//     }
//     if (title) {
//       user.title = title;
//     }
//     if (phone) {
//       user.phone = phone;
//     }
//     if (facebook) {
//       user.socials.facebook = facebook;
//     }
//     if (linkedin) {
//       user.socials.linkedin = linkedin;
//     }

//     // Save the updated user
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       user,
//       message: 'User updated successfully',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//     });
//   }
// });