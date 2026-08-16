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
        try{
            const novaTarefa = req.body;
        if (!req.body.title) {
            return res.status(400).json({ erro: "O campo 'Título' é obrigatório." });
        }    
        const criar = await taskModel.criar(novaTarefa);
        res.status(201).json(criar);
        } catch (erro) {
            console.error("ERRO COMPLETO AO CRIAR TAREFAS:", erro); 
            res.status(500).json({ erro: erro.message });
        }   
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