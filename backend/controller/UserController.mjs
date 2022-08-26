import User from '../models/UserModel.mjs';
import bcrypt from 'bcryptjs';

//Registeration user
export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avator: {
      public_id: 'https://test.com',
      url: 'https://test.com',
    },
  });

  res.status(201).json({
    success: true,
    user,
  });
};

// user login

// export const Userlogin = async (req, res) => {
//   let token;
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({
//       status: false,
//       message: 'please enter your email and password',
//     });
//   }

//   const userlogin = await User.findOne({ email: email });

//   if (userlogin) {
//     const isMatch = await userlogin.comparePassword(password);
//     token = await userlogin.generateAuthToken();
//     console.log(token);
//     if (!isMatch) {
//       return res.status(400).json({
//         status: false,
//         message: 'user login not exist',
//       });
//     } else {
//       return res.status(201).json({
//         status: true,
//         message: 'user login successfully',
//       });
//     }
//   } else {
//     return res.status(404).json({
//       status: false,
//       message: 'invalid credientials',
//     });
//   }
// };

export const Userlogin = async (req, res) => {
  let token;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      status: false,
      message: 'please fill the form',
    });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        message: 'user password not match',
      });
    } else {
      token = await user.generateAuthToken();
      console.log(token);
      res.status(201).json({
        success: true,
        user,
        token,
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: 'invalid credentials',
    });
  }
};
