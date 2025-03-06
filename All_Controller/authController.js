const Emailvalidation = require('../Helpers/emailValidation');
const verify = require('../Helpers/sendEmailverify');
const userSchema = require('../Model/userSchema');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

async function regisationController(req, res) {
  let { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(500).send({ msg: 'please fill all' });
  } else {
    if (!Emailvalidation(email)) {
      res.send('invaild email');
    }
    let existinguser = await userSchema.findOne({ email });
    if (existinguser) {
      res.status(404).send({ msg: 'Email already Exits ' });
    } else {
      try {
        bcrypt.hash(password, 10, async function (err, hash) {
          let user = new userSchema({
            name,
            email,
            password: hash,
            role,
          });
          await user.save();
          let Otp = `${Math.floor(1000 + Math.random() * 9000)}`;
          let otpSent = await userSchema.findOneAndUpdate(
            { email },
            { $set: { otp: Otp } },
            { new: true }
          );
          setTimeout(async () => {
            let otpSent = await userSchema.findOneAndUpdate(
              { email },
              { $set: { otp: null } },
              { new: true }
            );
          }, 30000);
          verify(email, Otp);
          res.status(201).send({ msg: 'data gese', user });
        });
      } catch (error) {
        res.status(500).send(error);
      }
    }
  }
}
async function loginController(req, res) {
  let { email, password } = req.body;
  let userWithPassword = await userSchema.findOne({ email });
  if (userWithPassword) {
    const isMatch = await bcrypt.compare(password, userWithPassword.password);
    if (!isMatch) {
      return res.status(401).send('Password mismatch!');
    } else {
      if (userWithPassword.role == 'user') {
        let userWithoutPassword = await userSchema
          .findOne({ email })
          .select('-password');

        let token = jwt.sign({ userWithoutPassword }, process.env.Jwt_secret, {
          expiresIn: '1m',
        });
        res.cookie('token', token, {
          httpOnly: true,
          secure: false,
        });
        res.send({ msg: 'user login succesfull', token });
      } else if (userWithPassword.role == 'admin') {
        let userWithoutPassword = await userSchema
          .findOne({ email })
          .select('-password');

        let token = jwt.sign({ userWithoutPassword }, process.env.Jwt_secret, {
          expiresIn: '1m',
        });
        res.cookie('token', token, {
          httpOnly: true,
          secure: false,
        });
        res.send({ msg: 'admin login succesfull', token });
      }
    }
  } else {
    res.status(404).send({ msg: 'user not found !' });
  }
}

module.exports = { regisationController, loginController };
