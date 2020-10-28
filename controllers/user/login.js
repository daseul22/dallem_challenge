const { User } = require("../../models");
const { tokenGenerator } = require("../../lib/jwt-utils");
module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
        password,
      },
    }).then((user) => {
      if (user) {
        const token = tokenGenerator(user);
        res.cookie("user", token);
        res.status(201).send({ message: "로그인 성공" });
      } else {
        res
          .status(404)
          .send({ message: "email이나 password가 일치하지 않습니다" });
      }
    });
  },
};
