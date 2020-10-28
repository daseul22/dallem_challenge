const { Event, UserEvent } = require("../../models");
const crypto = require("crypto");
module.exports = {
  post: (req, res) => {
    const { name, start_time, end_time, start_date, description } = req.body;
    const identifier = crypto
      .createHmac("sha256", "tomtom")
      .update(name + start_time + end_time)
      .digest("hex");
    const owner = res.locals.user_id;

    Event.findOrCreate({
      where: {
        name,
      },
      defaults: {
        identifier,
        name,
        start_time,
        end_time,
        start_date,
        description,
        owner,
      },
    }).then(([event, isCreated]) => {
      if (isCreated) {
        UserEvent.create({
          user_id: res.locals.user_id,
          event_id: event.id,
        }).then(() => {
          res.status(201).send({ message: "일회성 이벤트 생성 성공" });
        });
      } else {
        res.status(404).send({ message: "이미 있는 이름의 이벤트 입니다" });
      }
    });
  },
};
