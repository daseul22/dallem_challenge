const { User } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { name, email, password } = req.body;
    User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        name,
        email,
        password,
      },
    }).then(([user, isCreated]) => {
      if (isCreated) {
        res.status(201).send({ message: "회원가입 성공" });
      } else {
        res.status(404).send({ message: "이미있는 email 입니다" });
      }
    });
  },
};
