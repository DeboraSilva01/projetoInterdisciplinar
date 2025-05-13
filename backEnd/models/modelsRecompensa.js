const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const recompensa = sequelize.define("recompensa", {
  idrecompensa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idevento: { // Agora referenciando a tabela `usuario`
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "evento", // Nome da tabela referenciada
      key: "idevento", // Nome da coluna referenciada
    },
  },
    idusuario: {
      type: DataTypes.INTEGER,
      allowNull: true // Permite valores nulos inicialmente
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    desconto: {
      type: DataTypes.STRING(100),
      allowNull: false
    }, 
    validade: {
      type: DataTypes.DATE,
      allowNull: false
    },
  
}, {
  tableName: "recompensa", // Nome da tabela no banco de dados
  timestamps: false, // Remove createdAt e updatedAt
});

module.exports = recompensa;