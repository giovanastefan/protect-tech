const jwt = require("jsonwebtoken");

const secretKey = "123456";

function verifyJWT(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token, secretKey, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: `Failed to authenticate token. ${err}` });

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyJWT;
