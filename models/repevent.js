"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RepEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: "UserRepEvent",
        foreignKey: "rep_event_id",
      });
    }
  }
  RepEvent.init(
    {
      identifier: DataTypes.STRING,
      name: DataTypes.STRING,
      kind: DataTypes.STRING,
      start_time: DataTypes.STRING,
      end_time: DataTypes.STRING,
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
      repetition: DataTypes.STRING,
      description: DataTypes.STRING,
      owner: DataTypes.STRING,
      repeated_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RepEvent",
    }
  );
  return RepEvent;
};
