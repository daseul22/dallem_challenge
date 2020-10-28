"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "UserEvent",
        foreignKey: "event_id",
      });
    }
  }
  Event.init(
    {
      identifier: DataTypes.STRING,
      name: DataTypes.STRING,
      start_time: DataTypes.STRING,
      end_time: DataTypes.STRING,
      start_date: DataTypes.STRING,
      description: DataTypes.STRING,
      owner: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
