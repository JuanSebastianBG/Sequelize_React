import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Usuario = sequelize.define(
  "usuarios",  // Nombre del modelo
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,  // Habilita el autoincremento
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Asegúrate de que el campo 'name' no sea nulo
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true,  // Asegúrate de que la edad esté permitida como nullable
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,  // Asegúrate de que el email no sea nulo
      unique: true,      // Evita correos duplicados
    },
  },
  {
    tableName: "usuarios",  // Especifica el nombre de la tabla
    timestamps: false,      // No utilizar columnas 'createdAt' y 'updatedAt'
  }
);

export default Usuario;
