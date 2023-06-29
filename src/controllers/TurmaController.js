const TurmaServices = require('../services/TurmasService')
const turmaServices = new TurmaServices();

class TurmaController {
  static async listarTurmas(req, res){
    const { dataInicial, dataFinal } = req.query
    try {
      const condicao = turmaServices.montaCondicaoData(dataInicial, dataFinal)

      const turmas = await turmaServices.listar({ where: condicao })
      return res.status(200).json(turmas)  
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async buscarTurmaPorId(req, res) {
    const { id } = req.params
    try {
      const turma = await turmaServices.buscarPorId(id);
      return res.status(200).json(turma)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async cadastraTurma(req, res) {
    const novaTurma = req.body
    try {
      const turma = await turmaServices.cadastrar(novaTurma)
      return res.status(200).json(turma)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params
    const turma = req.body
    try {
      await turmaServices.atualiza(turma, { where: { id: Number(id) }})
      const turmaAtualizada = await turmaServices.buscarPorId(id)
      return res.status(200).json(turmaAtualizada)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async excluirTurma(req, res) {
    const { id } = req.params
    try {
      await turmaServices.excluir(id)
      return res.status(200).json({ mensagem: `id ${id} deletado` })

    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async listaMatriculasPorTurma(req, res) {
    const { turmaId } = req.params
    try {
      const matriculas = await turmaServices.listaMatriculasPorTurma(turmaId);
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async listaTurmasLotadas(req, res) {
    const turmaLotacao = 2;
    try {
      const matriculas = turmaServices.listaTurmasLotadas(turmaLotacao);
      return res.status(200).json(matriculas)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

}

module.exports = TurmaController