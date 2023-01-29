const { UUIDV4, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.STRING,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    health_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, { timestamps: false });
};
