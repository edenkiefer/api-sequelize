const { Router } = require('express')
const NivelController = require('../controllers/NivelController')
 
const router = Router()
router
 .get('/niveis', NivelController.listarNiveis)
 .get('/niveis/:id', NivelController.buscarNivelPorId)
 .post('/niveis', NivelController.cadastrarNivel)
 .put('/niveis/:id', NivelController.atualizaNivel)
 .delete('/niveis/:id', NivelController.excluirNivel)
 
module.exports = router