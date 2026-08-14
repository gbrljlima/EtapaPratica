//  Tela principal que exibe todas as tarefas e permite interações.
//  Mostrar título, descrição e status (concluída / pendente)
// • Botão para alternar status (concluída/pendente)
// • Botão para excluir (com confirmação)
//  Formulário para adicionar e editar tarefas.


let tarefas = [];
let proximoId = 1;

const STATUS = ['Concluída', 'Pendente'];

module.exports = {
    listarTarefas: () => tarefas,
    buscarId: (id) => tarefas.find(tarefa => tarefa.id === id),
    criar: (titulo, descricao) => {
        const novaTarefa = {
            id: proximoId++, 
            titulo, 
            descricao,
            status:'Pendente'
        };
        tarefas.push(novaTarefa);
        return novaTarefa;
    },
    atualizar: (id, novosDados) => {
        const indice = tarefas.findIndex(tarefa => tarefa.id === id);
        tarefas[indice] = {...tarefas[indice], ... novosDados};
        return tarefas[indice]; 
    },
    excluir: (id) => {
        const indice = tarefas.findIndex(tarefa => tarefa.id === id);
        return tarefas.splice(indice, 1)[0];
    }
};