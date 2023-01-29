const { UUIDV4, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    id: {
        type: DataTypes.STRING,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
};
