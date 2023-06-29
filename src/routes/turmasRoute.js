const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')
 
const router = Router()
router
 .get('/turmas', TurmaController.listarTurmas)
 .get('/turmas/:id', TurmaController.buscarTurmaPorId)
 .post('/turmas', TurmaController.cadastraTurma)
 .put('/turmas/:id', TurmaController.atualizaTurma)
 .delete('/turmas/:id', TurmaController.excluirTurma)
 .get('/turmas/:turmaId/matriculas', TurmaController.listaMatriculasPorTurma)
 .get('/turmas/matriculas/lotadas', TurmaController.listaTurmasLotadas)

module.exports = router