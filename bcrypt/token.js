const jwt = require("jsonwebtoken");
const tokenGenerator = (email) => {
  const token = jwt.sign({ email: email }, process.env.JWT_KEY, {
    expiresIn: "3hours",
  });
  return token;
};
const tokenValidator = (req, res, next) => {
  const token = req.headers.token;
  console.log(req.headers);
  if (!token)
    return res.status(403).json({
      msg: "No token present",
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      msg: "Invalid Token",
    });
  }
  next();
};
module.exports.tokenGenerator = tokenGenerator;
module.exports.tokenValidator = tokenValidator;
