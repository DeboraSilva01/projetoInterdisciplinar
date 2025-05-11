const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const evento = sequelize.define("evento", {
  idevento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeevento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  horainicial: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  horafinal: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  equipamentos: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vagas: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  qr_code: {
    type: DataTypes.TEXT, // Armazena o QR Code como uma string base64
    allowNull: true, // Permite valores nulos inicialmente
  },
  imagem: {
    type: DataTypes.STRING, // Caminho ou URL da imagem
    allowNull: true, // Permite valores nulos inicialmente
  },
}, {
  tableName: "evento", // Nome da tabela no banco de dados
  timestamps: false, // Remove createdAt e updatedAt
});

module.exports = evento;