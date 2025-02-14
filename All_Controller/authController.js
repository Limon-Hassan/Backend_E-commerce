const userSchema = require('../Model/userSchema');

async function regisationController(req, res) {
  let { name, email, password } = req.body;
  try {
    let user = new userSchema({
      name,
      email,
      password,
    });
    await user.save();
    res.status(201).send({ msg: 'data gese', user });
  } catch (error) {
    res.status(500).send(error);
  }
}
function loginController(req, res) {
  res.send('we get allll');
}

module.exports = { regisationController, loginController };
