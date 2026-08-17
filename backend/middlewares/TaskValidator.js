const TaskModel = require("../models/TaskModel");

const validarCriacao = (req, res, next) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ erro: "O campo 'Título' é obrigatório." });
    }
    if (title.length > 100) {
        return res.status(400).json({ erro: "O título deve ter no máximo 100 caracteres" });
    }  
    if (description && description.length > 500) {
        return res.status(400).json({ erro: "A descrição deve ter no máximo 500 caracteres" });
    }  

    next();
};

const validarAtualizacao = (req, res, next) => {
    const { title, description, completed, id } = req.body;

    if (id) {
        return res.status(400).json({ erro: "Não é permitido alterar o ID de uma tarefa no corpo da requisição." });
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

    next();
};

const verificarId = (req, res, next) => {
    const id = Number(req.params.id);
    const tarefa = TaskModel.buscarId(id);
    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada!" });
    }
    req.tarefaEncontrada = tarefa;
    next();
}

module.exports = { validarCriacao, validarAtualizacao, verificarId };