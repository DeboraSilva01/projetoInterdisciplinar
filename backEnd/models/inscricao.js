const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const usuario = require("./modelUsuario");
const evento = require("./modelEventos");

const inscricao = sequelize.define("inscricao", {
  idinscricao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Gera IDs automaticamente
  },
  idusuario: {
    type: DataTypes.INTEGER,
    allowNull: true, // Permite valores nulos
  },
  idevento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  datainscricao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pendente",
  },
}, {
  tableName: "inscricao", // Nome da tabela no banco de dados
  freezeTableName: true, // Desativa a pluralização automática
  timestamps: false, // Remove createdAt e updatedAt
});
inscricao.belongsTo(usuario, { foreignKey: "idusuario" });
inscricao.belongsTo(evento, { foreignKey: "idevento" });

module.exports = inscricao;