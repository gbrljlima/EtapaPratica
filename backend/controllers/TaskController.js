const taskModel = require('../models/TaskModel');

module.exports = {
    listarTarefas: async (req, res) => {
        try {
            const tarefas = await taskModel.listarTarefas();
            res.status(200).json(tarefas);
        } catch (erro) {
            console.error("ERRO COMPLETO AO LISTAR TAREFAS:", erro); 
            res.status(500).json({ erro: erro.message });
        }
    },
    criarTarefa: async (req, res) => {
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
        const id = Number(req.params.id);
        const tarefa = await taskModel.buscarId(id);
    
        if (!tarefa) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
        res.status(200).json(tarefa);
    },
    atualizarTarefa: async (req, res) => {
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
        if (title.length > 100) {
            return res.status(400).json({ erro: "O título deve ter no máximo 100 caracteres" });
        }  
        if (description && description.length > 500) {
            return res.status(400).json({ erro: "A descrição deve ter no máximo 500 caracteres" });
        }
        const dados = {
            title: title,
            description: description,
            completed: completed
        }
        const tarefaAtualizada = await taskModel.atualizar(id, dados);
        if (!tarefaAtualizada) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
        res.status(200).json(tarefaAtualizada);
    },
    excluirTarefa: async (req, res) => {
        const id = Number(req.params.id);
        const excluirTarefa = await taskModel.excluir(id);

        if (!excluirTarefa) {
            return res.status(404).json({ erro: "Tarefa não encontrada!" });
        }
        res.status(200).json({ mensagem: "Tarefa Excluída!", tarefa: excluirTarefa });
    } 
};