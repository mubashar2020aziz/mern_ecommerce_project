import User from '../models/UserModel.mjs';
import bcrypt from 'bcrypt';

//Registeration user
export const createUser = async (req, res, next) => {
  let token;
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
  token = await user.generateAuthToken();
  console.log(token);

  res.status(201).json({
    success: true,
    user,
    token,
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
  try {
    //fill login form
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        status: false,
        message: 'plz fill the form',
      });
    }
    //find user email is same or not with register
    const userLogin = await User.findOne({ email: email });
    //compare password
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      // res.cookie('jwtoken', token, {
      //   expires: new Date(Date.now() + 25892000000),
      //   httpOnly: true,
      // });
      if (!isMatch) {
        return res.status(400).json({
          status: false,
          message: 'user not match password',
        });
      } else {
        token = await userLogin.generateAuthToken();
        console.log(token);
        return res.status(200).json({
          status: true,
          message: 'user successfull login',
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: 'invalid credantials',
      });
    }
  } catch (err) {
    console.log(err);
  }
};
