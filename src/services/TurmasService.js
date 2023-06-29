const Services = require('./Services')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class TurmasService extends Services {
    constructor() {
        super('Turmas')
    }
    
    async montaCondicaoData(dataInicial, dataFinal) {
      const condicao = {};
      dataInicial || dataFinal ? condicao.data_inicio = {} : null
      dataInicial ? condicao.data_inicio[Op.gte] = dataInicial : null
      dataFinal ? condicao.data_inicio[Op.lte] = dataFinal : null
      return condicao;
    }

    async listaMatriculasPorTurma(turmaId) {
       return await database.Matriculas
        .findAndCountAll({ 
          where: { 
            turma_id: turmaId, 
            status: 'confirmado'
          },
          limit: 20,
          order: [['estudante_id', 'ASC']]
        })
    }

    async listaTurmasLotadas(turmaLotacao) {
        return await database.Matriculas
          .findAndCountAll({ 
          where: { 
              status: 'confirmado'
          },
          attributes: ['turma_id'],
          group: ['turma_id'],
          having: Sequelize.literal(`count(turma_id) >= ${turmaLotacao}`)
          })
    }
} 

module.exports = TurmasService