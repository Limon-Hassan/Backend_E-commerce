const jwt = require('jsonwebtoken');

// General authentication middleware for both users and admins
function auth(req, res, next) {
  let { token } = req.cookies; // Get token from cookies
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

// Admin-specific authentication middleware (only for admin routes)
function authAdmin(req, res, next) {
  let { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.Jwt_secret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ msg: 'Token is invalid or expired' });
      } else {
        const { role } = decoded.userWithoutPassword; // Extract role from the decoded user data
        if (role === 'admin') {
          next(); // Allow access to the admin route
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
