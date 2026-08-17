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
        const novaTarefa = taskModel.criar(title, description);
        res.status(201).json(novaTarefa);
    },
    buscarTarefa: async (req, res) => {
        await atrasar(2000);
        const id = Number(req.params.id);
        const tarefa = taskModel.buscarId(id);
        res.status(200).json(tarefa);
    },
    atualizarTarefa: (req, res) => {
        const id = Number(req.params.id);
        const { title, description, completed } = req.body;
        const dados = {
            title: title,
            description: description,
            completed: completed
        }
        const tarefaAtualizada = taskModel.atualizar(id, dados);
        res.status(200).json(tarefaAtualizada);
    },
    excluirTarefa: (req, res) => {
        const id = Number(req.params.id);
        const excluirTarefa = taskModel.excluir(id);
        res.status(200).json({ mensagem: "Tarefa Excluída!", tarefa: excluirTarefa });
    } 
};