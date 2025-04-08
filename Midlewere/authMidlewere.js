const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  let { token } = req.cookies; 
  if (token) {
    jwt.verify(token, process.env.Jwt_secret, function (err, decoded) {
      if (err) {
      
        return res.status(401).send({ msg: 'Token expired or invalid' });
      } else {
        
        req.user = decoded.userWithoutPassword; 
        next(); 
      }
    });
  } else {
    res.status(404).send({ msg: 'Token not found!' });
  }
}

function authAdmin(req, res, next) {
  let { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.Jwt_secret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ msg: 'Token is invalid or expired' });
      } else {
        const { role } = decoded.userWithoutPassword; 
        if (role === 'admin') {
          next(); 
        } else {
          return res.status(403).send({ msg: 'Access Denied: Admins only.' });
        }
      }
    });
  } else {
    res.status(404).send({ msg: 'Token not found!' });
  }
}

module.exports = { auth, authAdmin };
