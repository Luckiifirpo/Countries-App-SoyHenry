const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    ID: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    subregion: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    area: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
    population: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    }
  }, {timestamps: false});
};
