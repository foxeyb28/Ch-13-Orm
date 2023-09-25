// import important parts of sequelize library
const { UUID4, Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

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
    defaultValue: UUID4,
  },
  is_donor: {
    type: DataTypes.STRING,
    defaultValue: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "product",
      key: "id",
    },
  },
  price: {
    type: DataTypes.DECIMAL(200.0),
    allowNull: false,
    validate: {
      isDecimal: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
    validate: {
      isNumeric: true,
    },
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "category",
      key: "id",
      unique: false,
    },
  },
},


  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "product",
}
);

module.exports = Product;
