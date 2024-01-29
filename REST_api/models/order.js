'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Venue)
      Order.belongsTo(models.User)
    }
  }
  Order.init({
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Booking date is required'
        },
        notNull: {
          msg: 'Booking date is required'
        },
      },
    },
    statusPayment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: {
          msg: 'Status payment is required'
        },
        notNull: {
          msg: 'Status payment is required'
        },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User Id is required",
        },
        notEmpty: {
          msg: "User Id is required",
        },
      },
    },
    VenueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Venue Id is required",
        },
        notEmpty: {
          msg: "Venue Id is required",
        },
      },
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "orderId is required",
        },
        notEmpty: {
          msg: "orderId is required",
        },
      },
    },
    paidDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};