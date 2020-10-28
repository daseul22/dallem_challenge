const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

module.exports = {
  tokenGenerator: ({ id, email }) => {
    let token = jwt.sign({ id, email }, secret.jwtKey, {
      expiresIn: "2h",
    });
    return token;
  },
  jwtVerification: (req, res, next) => {
    try {
      let token = req.cookies.user;
      if (token === "undefined" || !token) {
        res.status(401).send({ message: "로그인이 필요한 서비스입니다" });
      } else {
        let verify = jwt.verify(token, secret.jwtKey);
        res.locals.user_id = verify.id;
        next();
      }
    } catch (e) {
      res.status(401).send({ message: e });
    }
  },
};
