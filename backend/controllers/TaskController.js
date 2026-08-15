const taskModel = require('../models/TaskModel');

module.exports = {
    listarTarefas: (req, res) => {
        const tarefas = taskModel.listarTarefas();
        res.status(200).json(tarefas);
    },
    criarTarefa: (req, res) => {
        const { titulo, descricao } = req.body;
        if (!req.body.titulo) {
            return res.status(400).json({ erro: "O campo 'titulo' é obrigatório." });
        }    
        const novaTarefa = taskModel.criar(titulo, descricao);
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
        if (!req.body.titulo || req.body.status != (true || false)) {
            return res.status(400).json({ erro: "Atualização não foi completada, verifique seus dados." });
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