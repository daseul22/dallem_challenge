const { User, Event, RepEvent } = require("../../models");
const { Op } = require("sequelize");
module.exports = {
  get: (req, res) => {
    const start = parseInt(req.query.start),
      end = parseInt(req.query.end);

    Event.findAll({
      where: {
        start_date: {
          [Op.lte]: end,
          [Op.gte]: start,
        },
      },
      attributes: [
        "identifier",
        "name",
        "start_time",
        "end_time",
        "start_date",
        "description",
        "owner",
      ],
      include: {
        model: User,
        attributes: ["name"],
        through: { attributes: [] },
      },
    }).then((event) => {
      RepEvent.findAll({
        where: {
          start_date: { [Op.lte]: end },
          end_date: { [Op.gte]: start },
        },

        include: {
          model: User,
          attributes: ["name"],
          through: { attributes: [] },
        },
      }).then((repEvent) => {
        let result = [];
        event.forEach((ev) => {});
        res.status(200).send(result);
      });
    });
  },
};

//where: {
//  [Op.or]: {
//    start_date: {
//      [Op.lte]: end,
//      [Op.gte]: start,
//    },
//    end_date: {
//      [Op.lte]: end,
//      [Op.gte]: start,
//    },
//  },
//},
