function errorCheck(err, req, res, next) {
  if (err) {
    console.log(err.message);
    return res.status(err.statusCode || 500).send({ msg: err.message });
  } else {
    next();
  }
}
module.exports = errorCheck;
