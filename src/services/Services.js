const database = require('../models')

class Services {
  constructor(model) {
    this.model = model;
  }

  async listar(condicao = {}) {
    return database[this.model].findAll({where: { ...condicao } });
  }

  async buscarPorId(id) {
    return database[this.model].findOne({ where: { id: Number(id) } })
  }

  async cadastrar(dados) {
    return database[this.model].create(dados);
  }

  async atualiza(dados, condicao) {
    return database[this.model].update(dados, { where: { ...condicao } })
  }

  async excluir(id) {
    return database[this.model].destroy({ where: { id: id } })
  }
}

module.exports = Services