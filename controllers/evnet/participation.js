const {
  User,
  Event,
  RepEvent,
  UserEvent,
  UserRepEvent,
} = require("../../models");
module.exports = {
  put: (req, res) => {
    const { identifier, isRepeat } = req.body;
    const user_id = res.locals.user_id;

    if (isRepeat) {
      RepEvent.findOne({
        where: { identifier },
        include: {
          model: User,
          attributes: ["id"],
          through: { attributes: [] },
        },
      }).then((repEvent) => {
        if (repEvent === null) {
          return res
            .status(404)
            .send({ message: "존재하지 않는 이벤트 입니다" });
        }
        if (includes(repEvent.Users, user_id)) {
          UserRepEvent.destroy({
            where: { user_id, rep_event_id: repEvent.id },
          }).then(() => {
            res.status(200).send({ message: "정상적으로 참여취소됨" });
          });
        } else {
          UserRepEvent.create({
            user_id,
            rep_event_id: repEvent.id,
          }).then(() => {
            res.status(200).send({ message: "정상적으로 참여됨" });
          });
        }
      });
    } else {
      Event.findOne({
        where: { identifier },
        include: {
          model: User,
          attributes: ["id"],
          through: { attributes: [] },
        },
      }).then((ev) => {
        if (ev === null) {
          return res
            .status(404)
            .send({ message: "존재하지 않는 이벤트 입니다" });
        }
        if (includes(ev.Users, user_id)) {
          UserEvent.destroy({ where: { user_id, event_id: ev.id } }).then(
            () => {
              res.status(200).send({ message: "정상적으로 참여취소됨" });
            }
          );
        } else {
          UserEvent.create({
            user_id,
            event_id: ev.id,
          }).then(() => {
            res.status(200).send({ message: "정상적으로 참여됨" });
          });
        }
      });
    }
  },
};
const includes = (obj, arg) => {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i].id === arg) return true;
  }
  return false;
};
