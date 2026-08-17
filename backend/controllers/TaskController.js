const taskModel = require('../models/TaskModel');
const atrasar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    listarTarefas: async (req, res) => {
        await atrasar(2000);
        const tarefas = taskModel.listarTarefas();
        res.status(200).json(tarefas);
    },
    criarTarefa: (req, res) => {
        const { title, description } = req.body;
        if (!req.body.title) {
            return res.status(400).json({ erro: "O campo 'Título' é obrigatório." });
        }
        if (title.length > 100) {
            return res.status(400).json({ erro: "O título deve ter no máximo 100 caracteres" });
        }  
        if (description && description.length > 500) {
            return res.status(400).json({ erro: "A descrição deve ter no máximo 500 caracteres" });
        }  
        const novaTarefa = taskModel.criar(title, description);
        res.status(201).json(novaTarefa);
    },
    buscarTarefa: async (req, res) => {
        await atrasar(2000);
        const id = Number(req.params.id);
        const tarefa = taskModel.buscarId(id);
    
        if (!tarefa) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
        res.status(200).json(tarefa);
    },
    atualizarTarefa: (req, res) => {
        const id = Number(req.params.id);
        const { title, description, completed } = req.body;
        if (req.body.id) {
            return res.status(400).json({ erro: "Não é permitido alterar o ID de uma tarefa." });
        }
        if (completed !== undefined && typeof completed !== 'boolean') {
            return res.status(400).json({ erro: "O status deve ser obrigatoriamente true ou false." });
        }
        if (!title) {
            return res.status(400).json({ erro: "Título é obrigatório" });
        }
        const dados = {
            title: title,
            description: description,
            completed: completed
        }
        const tarefaAtualizada = taskModel.atualizar(id, dados);
        if (!tarefaAtualizada) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
        res.status(200).json(tarefaAtualizada);
    },
    excluirTarefa: (req, res) => {
        const id = Number(req.params.id);
        const excluirTarefa = taskModel.excluir(id);

        if (!excluirTarefa) {
            return res.status(404).json({ erro: "Tarefa não encontrada!" });
        }
        res.status(200).json({ mensagem: "Tarefa Excluída!", tarefa: excluirTarefa });
    } 
};