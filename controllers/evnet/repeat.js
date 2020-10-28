const { RepEvent, UserRepEvent } = require("../../models");
const crypto = require("crypto");
const incrypt = (str) => {
  return crypto.createHmac("sha256", "tomtom").update(str).digest("hex");
};
module.exports = {
  post: (req, res) => {
    const {
      name,
      kind,
      start_time,
      end_time,
      start_date,
      end_date,
      repetition,
      description,
    } = req.body;
    const identifier = incrypt(name + start_date + end_date);
    const owner = res.locals.user_id;

    const repeated_id = incrypt(kind);

    RepEvent.findOrCreate({
      where: {
        name,
      },
      defaults: {
        identifier,
        name,
        kind,
        start_time,
        end_time,
        start_date,
        end_date,
        repetition,
        description,
        owner,
        repeated_id,
      },
    }).then(([event, isCreated]) => {
      if (isCreated) {
        UserRepEvent.create({
          user_id: res.locals.user_id,
          rep_event_id: event.id,
        }).then(() => {
          res.status(201).send({ message: "반복성 이벤트 생성 성공" });
        });
      } else {
        res.status(404).send({ message: "이미 있는 이름의 이벤트 입니다" });
      }
    });
  },
};
