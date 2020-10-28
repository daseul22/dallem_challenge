const { Event, UserEvent, RepEvent } = require("../../models");
module.exports = {
  delete: (req, res) => {
    const { identifier } = req.body;

    Event.findOne({ where: { identifier } }).then((ev) => {
      if (ev) {
        if (ev.owner == res.locals.user_id) {
          Event.destroy({ where: { identifier } }).then(() => {
            res.status(200).send({ message: "일회성 이벤트 삭제 성공" });
          });
        } else {
          res.status(404).send({ message: "이벤트의 owner가 아닙니다" });
        }
      } else {
        RepEvent.findOne({ where: { identifier } }).then((repEvent) => {
          if (repEvent) {
            if (repEvent.owner == res.locals.user_id) {
              RepEvent.destroy({ where: { identifier } }).then(() => {
                res.status(200).send({ message: "반복성 이벤트 삭제 성공" });
              });
            } else {
              res.status(404).send({ message: "이벤트의 owner가 아닙니다" });
            }
          } else {
            res
              .status(404)
              .send({ message: "이미 존재하지 않는 이벤트 입니다" });
          }
        });
      }
    });
  },
};
