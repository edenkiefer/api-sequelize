const { Router } = require('express')
const MatriculaController = require('../controllers/MatriculaController')
 
const router = Router()
router
 .get('/matriculas', MatriculaController.listarMatriculas)
 .get('/matriculas/:id', MatriculaController.buscarMatriculaPorId)
 .put('/matriculas/:id', MatriculaController.atualizaMatricula)
 .delete('/matriculas/:id', MatriculaController.excluirMatricula)
 
module.exports = router