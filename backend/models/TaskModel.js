let tarefas = [];
let proximoId = 1;

module.exports = {
    listarTarefas: () => tarefas,
    buscarId: (id) => tarefas.find(tarefa => tarefa.id === id),
    criar: (titulo, descricao) => {
        const novaTarefa = {
            id: proximoId++, 
            title: titulo, 
            description: descricao || "",
            completed: false,
            createdAt: new Date().toISOString()
        };
        tarefas.push(novaTarefa);
        return novaTarefa;
    },
    atualizar: (id, novosDados) => {
        const indice = tarefas.findIndex(tarefa => tarefa.id === id);
        if (indice === -1) throw new Error("Tarefa não encontrada");
        tarefas[indice] = {...tarefas[indice], ... novosDados};
        return tarefas[indice]; 
    },
    excluir: (id) => {
        const indice = tarefas.findIndex(tarefa => tarefa.id === id);
        if (indice === -1) throw new Error("Tarefa não encontrada");
        return tarefas.splice(indice, 1)[0];
    }
};