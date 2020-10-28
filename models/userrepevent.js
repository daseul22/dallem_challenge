"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRepEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.RepEvent, {
        foreignKey: "rep_event_id",
      });
    }
  }
  UserRepEvent.init(
    {
      user_id: DataTypes.STRING,
      rep_event_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserRepEvent",
    }
  );
  return UserRepEvent;
};
