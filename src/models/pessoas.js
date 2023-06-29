'use strict';
const {
  Model, ValidationError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: 'docente_id' });
      Pessoas.hasMany(models.Matriculas, { 
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado'},
        as: 'aulasMatriculadas'
      });
    }
  }
  Pessoas.init({
    nome: {
      type:DataTypes.STRING,
      validate: {
        validador: (nome) => {
          if (nome.length < 3) throw new ValidationError('O nome deve ter mais que três caracteres.')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'E-mail inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: { ativo: true } 
    },
    scopes: {
      todos: { where: {} }
    }
  });
  return Pessoas;
};