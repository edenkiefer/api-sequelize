const Services = require('../services/Services')
const niveisService = new Services();

class NivelController {
  static async listarNiveis(req, res){
    try {
      const niveis = await niveisService.listar()
      return res.status(200).json(niveis);
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async buscarNivelPorId(req, res) {
    const { id } = req.params
    try {
      const nivel = await niveisService.buscarPorId(id);
      return res.status(200).json(nivel)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async cadastrarNivel(req, res) {
    const { descr_nivel } = req.body
    try {
      const nivel = await niveisService.cadastrar({ descr_nivel })
      return res.status(200).json(nivel)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async atualizaNivel(req, res) {
    const { id } = req.params
    const nivel = req.body
    try {
      await niveisService.atualiza(nivel, { where: { id: Number(id) }})
      const nivelAtualizado = await niveisService.buscarPorId(id)
      return res.status(200).json(nivelAtualizado)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async excluirNivel(req, res) {
    const { id } = req.params
    try {
      await niveisService.excluir({ where: { id: Number(id) }})
      return res.status(200).json({ message: 'Nivel removido com sucesso.' })
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

}

module.exports = NivelController