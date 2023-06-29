const Services = require('./Services')
const database = require('../models')

class PessoasService extends Services {
  constructor() {
    super('Pessoas')
  }

  async listarTodasPessoas(condicao = {}) {
    return database.Pessoas.scope('todos').findAll({ where: { ...condicao } });
  }

  async cancelaPessoa(estudanteId) {
    return database.sequelize.transaction(async t => {
      await database.Pessoas.update({ ativo: false }, { where: {id: estudanteId } }, { transaction: t });
      await database.Matriculas.update({ status: 'cancelado' }, { where: { estudante_id: estudanteId } }, { transaction: t })
    })
  }

  async restaurarPessoa(id) {
    database.Pessoas.restore({ where: { id: Number(id) } });
  }

  async cadastrarMatricula(matricula) {
    return database.Matriculas.create(matricula);
  }

  async listarMatriculaPorPessoa(estudanteId) {
    const pessoa = await database.Pessoas.findOne({ where: { id: estudanteId } })
    const matriculas = await pessoa.getAulasMatriculadas();
    return matriculas;
  }


} 

module.exports = PessoasService