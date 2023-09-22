const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  tag_name: {
    type: DataTypes.STRING,
    allowNull: false,
      },
    producttag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
  },
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
