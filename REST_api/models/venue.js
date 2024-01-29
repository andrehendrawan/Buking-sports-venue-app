'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venue.belongsTo(models.Category)
      Venue.hasMany(models.Order)
    }
  }
  Venue.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Venue name is required'
        },
        notNull: {
          msg: 'Venue name is required'
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price is required'
        },
        notNull: {
          msg: 'Price is required'
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        },
        notNull: {
          msg: 'Description is required'
        },
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Full Name is required'
        },
        notNull: {
          msg: 'Full Name is required'
        },
        isUrl: {
          msg: 'Should be an URL Image'
        }
      },
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Phone number is required'
        },
        notNull: {
          msg: 'Phone number is required'
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Address is required'
        },
        notNull: {
          msg: 'Address is required'
        },
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category Id is required",
        },
        notEmpty: {
          msg: "Category Id is required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};