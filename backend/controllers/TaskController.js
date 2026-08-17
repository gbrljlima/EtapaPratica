const taskModel = require('../models/TaskModel');

module.exports = {
    listarTarefas: async (req, res) => {
        const tarefas = await taskModel.listarTarefas();
        res.status(200).json(tarefas);
    },
    criarTarefa: async (req, res) => {
        const novaTarefa = req.body;
        await taskModel.criar(novaTarefa);
        res.status(201).json(novaTarefa);
    },
    buscarTarefa: async (req, res) => {
        const id = Number(req.params.id);
        const tarefa = await taskModel.buscarId(id);
        res.status(200).json(tarefa);
    },
    atualizarTarefa: async (req, res) => {
        const id = Number(req.params.id);
        const { title, description, completed } = req.body;
        const dados = {
            title: title,
            description: description,
            completed: completed
        }
        const tarefaAtualizada = await taskModel.atualizar(id, dados);
        res.status(200).json(tarefaAtualizada);
    },
    excluirTarefa: async (req, res) => {
        const id = Number(req.params.id);
        const excluirTarefa = await taskModel.excluir(id);
        res.status(200).json({ mensagem: "Tarefa Excluída!", tarefa: excluirTarefa });
    } 
};