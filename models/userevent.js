"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.Event, {
        foreignKey: "event_id",
      });
    }
  }
  UserEvent.init(
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserEvent",
    }
  );
  return UserEvent;
};
