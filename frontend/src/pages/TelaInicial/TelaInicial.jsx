import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { listarTarefas, editarTarefa, excluirTarefa } from '../../services/api';
import Header from '../../components/Header';


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
        } catch(erro) {
            console.error("Erro ao listar tarefas", erro);
        }
    } 
    const handleRedirect = () => {
        navigate('/criar');
    };
    const changeStatus = async (tarefa) => {
        try {
            tarefa.status = !tarefa.status;
            const response = await editarTarefa(tarefa);            
            setTarefas(tarefa => tarefa.map(t => t.id === tarefa.id ? { ...t, status: !tarefa.status } : t ));        
        } catch(erro) {
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
        <div className='min-h-screen flex flex-col'>
            <Header/>
            <main className='max-w-5xl mx-auto w-full px-5 py-10 flex-grow'>
                <div className='flex justify-between items-center py-4'>
                    <button className='bg-gray-800 font-semibold rounded-md text-yellow-400 py-2 px-3 hover:text-white' onClick={handleRedirect}>+ Criar Tarefa</button>
                </div>
                <div className='bg-gray-300 shadow-md rounded-md overflow-x-auto'>
                    <table className='w-full border-collapse text-left '>
                        <thead className='bg-gray-800 text-yellow-400 text-lg'>
                            <tr>
                                <th className='p-4 font-semibold'>Titulo</th>
                                <th className='p-4 font-semibold'>Descrição</th>
                                <th className='p-4 font-semibold'>Status</th>
                                <th className='p-4 font-semibold'>Alternar Status</th>
                                <th className='p-4 font-semibold'>Excluir</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {tarefas.map((tarefa) =>
                                <tr key={tarefa.id} className={`${tarefa.status ? 'bg-green-300' : 'bg-gray-300'}`}>
                                    <td className='p-4'> {tarefa.titulo} </td>
                                    <td className='p-4'> {tarefa.descricao ? <div className="max-w-sm max-h-32 overflow-y-auto break-words">{tarefa.descricao}</div> : "--------------"} </td>
                                    <td className='p-4'> {tarefa.status ? "Concluida" : "Pendente" } </td>
                                    <td className='p-4'><button className='bg-gray-800 font-semibold rounded-md text-yellow-400 hover:text-white px-1 py-0.5' onClick={() => changeStatus(tarefa)}>Alternar Status</button>                                    </td>
                                    <td className='p-4'><button className='bg-red-600 border-2 border-gray-800 00 font-bold rounded-lg text-white hover:text-red-900 hover:bg-red-400 px-1.5 py-0.5 ' onClick={() => deleteTarefa(tarefa)}>X</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default TelaInicial