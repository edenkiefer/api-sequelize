const Services = require('../services/Services');
const matriculaService = new Services('Matriculas')

class MatriculaController {
  static async listarMatriculas(req, res){
    try {
      const matriculas = await matriculaService.listar();
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async buscarMatriculaPorId(req, res) {
    const { id } = req.params
    try {
      const matricula = await matriculaService.buscarPorId(id);
      return res.status(200).json(matricula)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async atualizaMatricula(req, res) {
    const { id } = req.params;
    const matricula = req.body;
    try {
      await matriculaService.update(matricula, id);
      const matriculaAtualizada = await matriculaService.buscarPorId(id);
      return res.status(200).json(matriculaAtualizada)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async excluirMatricula(req, res) {
    const { id } = req.params
    try {
      await matriculaService.excluir(id);
      return res.status(200).json({ message: 'Matricula removido com sucesso.' })
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

}

module.exports = MatriculaController