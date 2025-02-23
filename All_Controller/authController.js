const Emailvalidation = require('../Helpers/emailValidation');
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
    }

    let userWithoutPassword = await userSchema
      .findOne({ email })
      .select('-password');
    // res.send(userWithoutPassword);
    let token = jwt.sign({ userWithoutPassword }, process.env.Jwt_secret, {
      expiresIn: '1d',
    });
    res.send({msg:"login succesfull",token});
  } else {
    res.status(404).send('User not found!');
  }
}

module.exports = { regisationController, loginController };
