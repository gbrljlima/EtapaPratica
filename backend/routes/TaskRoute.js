const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.get('/api/tasks/', taskController.listarTarefas);
router.get('/api/tasks/:id', taskController.buscarTarefa);
router.post('/api/tasks/', taskController.criarTarefa);
router.put('/api/tasks/:id', taskController.atualizarTarefa);
router.delete('/api/tasks/:id', taskController.excluirTarefa)

module.exports = router;