import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { listarTarefas } from '../../services/api';

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
                                <td> {tarefa.descricao} </td>
                                <td> {tarefa.status} </td>
                                <td><button>Alternar Status</button><button>X</button></td>
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