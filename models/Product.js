// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const { UUID } = require('sequelize');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
 product_name: {
    type: DataTypes.UUID,
    defaultValue: UUID,
 },
    is_donor: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
         
          model: 'product',
          key: 'id',
        },
      },
      },
    price: {
      type: DataTypes.DECIMAL(200.00),
      allowNull: true,
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
      },
   {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
