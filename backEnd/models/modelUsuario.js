const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const usuario = sequelize.define(
  "usuario",
  {
    idusuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("user", "org"), // Define os papéis possíveis
      allowNull: false,
      defaultValue: "user", // Define o valor padrão como "user"
    },
  },
  {
    tableName: "usuario", // Nome da tabela no banco de dados
    timestamps: false, // Remove createdAt e updatedAt
  }
);

module.exports = usuario;