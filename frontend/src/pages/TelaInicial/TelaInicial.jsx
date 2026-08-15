import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { listarTarefas, editarTarefa, excluirTarefa } from '../../services/api';


function TelaInicial() {
    const [tarefas, setTarefas] = useState ([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTarefas();
    }, []);

    const fetchTarefas = async () => {
        try {
            const tarefas = await listarTarefas();
            setTarefas(tarefas);
        }catch{}
    } 
    const handleRedirect = () => {
        navigate('/criar');
    };
    const changeStatus = async (tarefa) => {
        try {
            tarefa.status = !tarefa.status;
            const response = await editarTarefa(tarefa);            
            setTarefas(tarefa => tarefa.map(t => t.id === tarefa.id ? { ...t, status: !tarefa.status } : t ));        
        } catch (erro) {
            console.error("Erro ao atualizar status", erro);
        } 
    }
    const deleteTarefa = async (tarefa) => {
        try{
            const response = await excluirTarefa(tarefa);
            setTarefas(tarefas => tarefas.filter(t => t.id !== tarefa.id));
        } catch (erro) {
            console.error("Erro ao excluir tarefa", erro);
        }
    }
    return(
        <div>
            <div>
                <h1>Lista de Tarefas</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Descrição</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tarefas.map((tarefa) =>
                            <tr key={tarefa.id}>
                                <td> {tarefa.titulo} </td>
                                <td> {tarefa.descricao ? tarefa.descricao : "--------------"} </td>
                                <td> {tarefa.status ? "Concluida" : "Pendente" } </td>
                                <td><button onClick={() => changeStatus(tarefa)}>Alternar Status</button>
                                <button onClick={() => deleteTarefa(tarefa)}>X</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button onClick={handleRedirect}>Criar Tarefa</button>
        </div>
    )
}

export default TelaInicial