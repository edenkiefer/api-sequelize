const PessoasService = require('../services/PessoasService')
const pessoasService = new PessoasService();

class PessoaController {
  static async listarPessoas(req, res) {
    try {
      const pessoas = await pessoasService.listar();
      return res.status(200).json(pessoas);
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async listarTodasPessoas(req, res) {
    try {
      const pessoas = await pessoasService.listarTodasPessoas();
      return res.status(200).json(pessoas);
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async buscarPessoaPorId(req, res) {
    const { id } = req.params;
    
    try {
      const pessoa = await pessoasService.buscarPorId(id);

      if (pessoa == null)
        return res.status(404).send({message: 'Pessoa não encontrada'});

      return res.status(200).json(pessoa);
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async cadastrarPessoa(req, res) {
    const { nome, ativo, email, role } = req.body;
    try {
      const pessoa = await pessoasService.cadastrar({ nome, ativo, email, role });
      return res.status(201).json(pessoa);
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async atualizaPessoa(req, res) {
    const { id } = req.params;
    const pessoa = req.body;

    try {
      await pessoasService.atualiza(pessoa, { id: Number(id) });
      const pessoaAtualizada = await pessoasService.buscarPorId(id); 
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async excluirPessoa(req, res) {
    const { id } = req.params;

    try {
      await pessoasService.excluir(Number(id));
      return res.status(200).json({ message: 'Pessoa removida com sucesso.' })
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async restauraPessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasService.restaurarPessoa(id);
      return res.status(200).json({message: `Pessoa com id:${id} restaurada com sucesso`})
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async cancelaPessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasService.cancelaPessoa(id);
      return res.status(200).json({message: `Pessoa com id:${id} cancelada e também todas as suas mátriculas`})
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async listarMatriculasPorPessoa(req, res) {
    const { estudanteId } = req.params;

    try {
      const matriculas = await pessoasService.listarMatriculaPorPessoa(estudanteId);
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

  static async cadastrarMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: estudanteId }
    try {
      const matricula = await pessoasService.cadastrarMatricula(novaMatricula)
      return res.status(200).json(matricula)
    } catch (error) {
      return res.status(500).send({message: `Erro interno do servidor: ${error.message}`})
    }
  }

}

module.exports = PessoaController;