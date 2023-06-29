const { Router } = require('express');
const PessoaController = require('../controllers/PessoasController.js')

const router = Router();

router.get('/pessoas', PessoaController.listarPessoas)
router.get('/pessoas/todos', PessoaController.listarTodasPessoas)
router.get('/pessoas/:id', PessoaController.buscarPessoaPorId)
router.post('/pessoas', PessoaController.cadastrarPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.excluirPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.put('/pessoas/:id/cancelar', PessoaController.cancelaPessoa)

router.get('/pessoas/:estudanteId/matriculas', PessoaController.listarMatriculasPorPessoa)
router.post('/pessoas/:estudanteId/matriculas', PessoaController.cadastrarMatricula)

module.exports = router;