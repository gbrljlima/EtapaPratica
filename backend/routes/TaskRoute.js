const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');
const { validarCriacao, validarAtualizacao, verificarId } = require('../middlewares/TaskValidator');

router.get('/api/tasks/', taskController.listarTarefas);
router.get('/api/tasks/:id', verificarId, taskController.buscarTarefa);
router.post('/api/tasks/', validarCriacao, taskController.criarTarefa);
router.put('/api/tasks/:id', verificarId, validarAtualizacao, taskController.atualizarTarefa);
router.delete('/api/tasks/:id', verificarId, taskController.excluirTarefa)

module.exports = router;