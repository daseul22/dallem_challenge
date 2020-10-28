"use strict";
const { Model } = require("sequelize");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Event, {
        through: "UserEvent",
        foreignKey: "user_id",
      });
      this.belongsToMany(models.RepEvent, {
        through: "UserRepEvent",
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (data, options) => {
          data.password = crypto
            .createHmac("sha256", "tomtom")
            .update(data.password)
            .digest("hex");
        },
        beforeFind: (data, options) => {
          if (data.where) {
            if (data.where.password) {
              data.where.password = crypto
                .createHmac("sha256", "tomtom")
                .update(data.where.password)
                .digest("hex");
            }
          }
        },
      },
    }
  );
  return User;
};
