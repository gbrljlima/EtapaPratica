const taskModel = require('../models/TaskModel');

module.exports = {
    listarTarefas: (req, res) => {
        const tarefas = taskModel.listarTarefas();
        res.status(200).json(tarefas);
    },
    criarTarefa: (req, res) => {
        const { nome, descricao } = req.body;
        const novaTarefa = taskModel.criar(nome, descricao);
        res.status(201).json(novaTarefa);
    },
    buscarTarefa: (req, res) => {
        const id = Number(req.params.id);
        const tarefa = taskModel.buscarId(id);

        if (!tarefa) {
            return res.status(404).json({ erro: "Tarefa não encontrada" });
        }
        res.status(200).json(tarefa);
    },
    atualizarTarefa: (req, res) => {
        const id = Number(req.params.id);
        const tarefaAtualizada = taskModel.atualizar(id, req.body);

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