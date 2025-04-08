const Emailvalidation = require('../Helpers/emailValidation');
const verify = require('../Helpers/sendEmailverify');
const userSchema = require('../Model/userSchema');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

async function regisationController(req, res) {
  let { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ msg: 'Please fill all fields' });
  }

  if (!Emailvalidation(email)) {
    return res.status(400).send('Invalid email');
  }

  let existingUser = await userSchema.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ msg: 'Email already exists' });
  }

  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return res.status(500).send('Error hashing password');

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
        await userSchema.findOneAndUpdate(
          { email },
          { $set: { otp: null } },
          { new: true }
        );
      }, 60000);

      verify(email, Otp);
      res.status(201).send({
        msg: 'Registration successful, please verify your email',
        user,
      });
    });
  } catch (error) {
    res.status(500).send({ msg: 'Error in registration', error });
  }
}

async function loginController(req, res) {
  let { email, password } = req.body;

  try {
    let userWithPassword = await userSchema.findOne({ email });

    if (!userWithPassword) {
      return res.status(404).send({ msg: 'User not found!' });
    }

    if (userWithPassword.Isverify === false) {
      return res.status(400).send({ msg: 'Please verify your email!' });
    }

    const isMatch = await bcrypt.compare(password, userWithPassword.password);

    if (!isMatch) {
      return res.status(401).send({ msg: 'Password not match' });
    } else {
      console.log('success');
    }

    let userWithoutPassword = await userSchema
      .findOne({ email })
      .select('-password');

    let token = jwt.sign({ userWithoutPassword }, process.env.Jwt_secret, {
      expiresIn: userWithPassword.role === 'admin' ? '20m' : '30m',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return res.send({
      msg:
        userWithPassword.role === 'admin'
          ? 'Admin login successful'
          : 'User login successful',
      token,
      user: {
        _id: userWithPassword._id, 
        name: userWithPassword.name,
        email: userWithPassword.email,
        role: userWithPassword.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Server error' });
  }
}

async function otp_verify(req, res) {
  let { email, otp } = req.body;
  let verify = await userSchema.findOne({ email });
  if (!verify) {
    return res.status(404).send('User not found!');
  }
  if (verify.otp == otp) {
    verify.Isverify = true;
    await verify.save();
    res.send('OTP verified successfully!');
  } else {
    res.status(400).send('OTP mismatch or expired.');
  }
}

async function reset_otp(req, res) {
  let { email } = req.body;
  let againMail = await userSchema.findOne({ email });
  if (!againMail) {
    return res.status(404).send({ msg: 'User not found!' });
  }

  let Otp = `${Math.floor(1000 + Math.random() * 9000)}`;
  await userSchema.findOneAndUpdate(
    { email },
    { $set: { otp: Otp } },
    { new: true }
  );

  setTimeout(async () => {
    await userSchema.findOneAndUpdate(
      { email },
      { $set: { otp: null } },
      { new: true }
    );
  }, 60000); 

  verify(email, Otp); 
  res.send('OTP reset successful');
}

module.exports = {
  regisationController,
  loginController,
  otp_verify,
  reset_otp,
};
