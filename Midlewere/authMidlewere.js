let jwt = require('jsonwebtoken');
function authAdmin(req, res, next) {
  let { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.Jwt_secret, function (err, decoded) {
      if (err) {
        res.send('token invaild');
      } else {
        let { role } = decoded.userWithoutPassword;
        if (role == 'admin') {
          next();
        } else {
          res.status(404).send({ msg: 'Access Denied' });
        }
      }
    });
  } else {
    res.status(404).send({ msg: 'token Not found !' });
  }
 
}

module.exports = { authAdmin };
