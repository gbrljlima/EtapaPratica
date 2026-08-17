import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router';
import { listarTarefas, editarTarefa, excluirTarefa } from '../services/api';
import Header from '../components/Header';
import BotaoConfirmacao from '../components/BotaoConfirmacao';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../components/Loading';


function TelaInicial() {
    const [tarefas, setTarefas] = useState ([]);
    const [confirmaExclusao, setConfirmaExclusao] = useState (null);
    const [carregamento, setCarregamento] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchTarefas = async () => {
        try {
            const tarefas = await listarTarefas();
            setTarefas(tarefas);
        } catch(erro) {
            console.error("Erro ao listar tarefas", erro);
            toast.error("Não foi possível carregar as tarefas!");
        } finally {
            setCarregamento(false);
        }
    }
        fetchTarefas();
    }, []);

    useEffect(() => {
    if (location.state?.mensagemSucesso) {
      toast.success(location.state.mensagemSucesso);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

    const handleRedirect = () => {
        navigate('/criar');
    };
    const changeStatus = async (tarefa) => {
        try {
            const novoStatus = !tarefa.completed;
            await editarTarefa(tarefa.id, {
                title: tarefa.title,
                description: tarefa.description,
                completed: novoStatus
            });            
            setTarefas(tarefaAtual => tarefaAtual.map(t => t.id === tarefa.id ? { ...t, completed: novoStatus } : t ));
            toast.success("Status alterado!");
                   
        } catch(erro) {
            console.error("Erro ao atualizar status", erro);
            toast.error("Erro ao atualizar status!");
        } 
    }
    const deleteTarefa = async () => {
        try{
            await excluirTarefa(confirmaExclusao.id);
            setTarefas(tarefaExcluida => tarefaExcluida.filter(t => t.id !== confirmaExclusao.id));
            setConfirmaExclusao(null);
            toast.success("Tarefa excluída!");
        } catch (erro) {
            console.error("Erro ao excluir tarefa", erro);
            toast.error("Erro ao excluir tarefa!");
        }
    }
    return(
        <div className='min-h-screen flex flex-col bg-gray-50'>
            <Header titulo="Lista de Tarefas"/>
                <main className='max-w-5xl mx-auto w-full px-5 py-10 flex-grow'>
                    <div className='flex justify-between items-center py-4'>
                        <button className='bg-gray-800 font-semibold rounded-md text-yellow-400 py-2 px-3 hover:text-white' onClick={handleRedirect}>+ Criar Tarefa</button>
                    </div>
                    {carregamento ? <Loading texto="Tarefas"/> :  
                    (tarefas.length === 0 ? <div className='flex justify-center bg-white w-full shadow-md rounded-md'>
                        <h1 className='font-bold text-2xl p-4'>A lista de tarefas está vazia!</h1>
                    </div> :
                    <div>
                        <div className='lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {tarefas.map((tarefa) => 
                                <div key={tarefa.id} className={`gap-3 flex flex-col rounded-lg shadow  ring-1  ring-black py-4 px-5 ring-opacity-50 ${tarefa.completed ? 'bg-green-100' : 'bg-white'}`}>
                                    <div className='flex gap-5 justify-between items-center'>
                                        <p className='font-semibold break-words min-w-0'>{tarefa.title}</p> 
                                        <button className='bg-red-500 border-2 border-gray-700 00 font-bold rounded-lg text-white hover:text-red-700 hover:bg-red-400 px-1.5' onClick={() => setConfirmaExclusao(tarefa)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="h-7 w-3.5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className=''>{tarefa.completed ? "Concluida" : "Pendente"}</span> 
                                        {/*Botão de alterar status*/}
                                        <button className='bg-gray-800 font-semibold rounded-md text-green-300 hover:text-white px-1 py-2' onClick={() => changeStatus(tarefa)}>
                                            {tarefa.completed ? 
                                            <svg className='h-5 w-5 text-yellow-400' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 12L7.72711 8.43926C7.09226 7.91022 6.77484 7.6457 6.54664 7.32144C6.34444 7.03413 6.19429 6.71354 6.10301 6.37428C6 5.99139 6 5.57819 6 4.7518V2M12 12L16.2729 8.43926C16.9077 7.91022 17.2252 7.6457 17.4534 7.32144C17.6556 7.03413 17.8057 6.71354 17.897 6.37428C18 5.99139 18 5.57819 18 4.7518V2M12 12L7.72711 15.5607C7.09226 16.0898 6.77484 16.3543 6.54664 16.6786C6.34444 16.9659 6.19429 17.2865 6.10301 17.6257C6 18.0086 6 18.4218 6 19.2482V22M12 12L16.2729 15.5607C16.9077 16.0898 17.2252 16.3543 17.4534 16.6786C17.6556 16.9659 17.8057 17.2865 17.897 17.6257C18 18.0086 18 18.4218 18 19.2482V22M4 2H20M4 22H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            : 
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-green-400 h-5 w-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            } 
                                        </button>
                                    </div> 
                                    <div className='flex justify-between gap-7 items-center'>                                       
                                        {tarefa.description ? <p className='break-words min-w-0 '>{tarefa.description}</p> : <p className='text-gray-600 italic'>Sem Descrição</p>}
                                        {/*Botão de editar*/}
                                        <button className='bg-gray-800 flex-shrink-0 font-semibold rounded-md text-yellow-400 hover:text-white px-1 py-2' onClick={() => navigate(`/editar/${tarefa.id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='bg-gray-300 hidden lg:flex shadow-md rounded-md overflow-x-auto'>
                            <table className='w-full border-collapse text-left'>
                                <thead className='bg-gray-800 text-yellow-400 text-lg'>
                                    <tr>
                                        <th className='p-4 font-semibold'>Título</th>
                                        <th className='p-4 font-semibold'>Descrição</th>
                                        <th className='p-4 font-semibold'>Status</th>
                                        <th className='p-4 font-semibold text-center'>Alternar status</th>
                                        <th className='p-4 font-semibold text-center'>Editar</th>
                                        <th className='p-4 font-semibold text-center'>Excluir</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {tarefas.map((tarefa) =>
                                        <tr key={tarefa.id} className={`${tarefa.completed ? 'bg-green-300' : 'bg-gray-300'}`}>
                                            <td className='p-4 break-words max-w-xs overflow-y-auto'> {tarefa.title} </td>
                                            <td className='p-4'> {tarefa.description ? <div className="max-w-xs max-h-32 overflow-y-auto break-words">{tarefa.description}</div> : <span className='text-gray-600 italic'>Sem Descrição</span>} </td>
                                            <td className='p-4'> {tarefa.completed ? "Concluida" : "Pendente" } </td>
                                            {/*Botão de alterar status*/}
                                            <td className='p-4 text-center align-middle'><button className='bg-gray-800 font-semibold rounded-md hover:text-white px-1 py-2' onClick={() => changeStatus(tarefa)}>
                                                    {tarefa.completed ? 
                                                    <svg className='h-6 w-6 text-yellow-400' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 12L7.72711 8.43926C7.09226 7.91022 6.77484 7.6457 6.54664 7.32144C6.34444 7.03413 6.19429 6.71354 6.10301 6.37428C6 5.99139 6 5.57819 6 4.7518V2M12 12L16.2729 8.43926C16.9077 7.91022 17.2252 7.6457 17.4534 7.32144C17.6556 7.03413 17.8057 6.71354 17.897 6.37428C18 5.99139 18 5.57819 18 4.7518V2M12 12L7.72711 15.5607C7.09226 16.0898 6.77484 16.3543 6.54664 16.6786C6.34444 16.9659 6.19429 17.2865 6.10301 17.6257C6 18.0086 6 18.4218 6 19.2482V22M12 12L16.2729 15.5607C16.9077 16.0898 17.2252 16.3543 17.4534 16.6786C17.6556 16.9659 17.8057 17.2865 17.897 17.6257C18 18.0086 18 18.4218 18 19.2482V22M4 2H20M4 22H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                    </svg>
                                                    : 
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="text-green-400 h-6 w-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    } 
                                                </button>
                                            </td>
                                            {/*Botão de Editar*/}
                                            <td className='p-4 text-center align-middle'><button className='bg-gray-800 font-semibold rounded-md text-yellow-400 hover:text-white px-2 py-1' onClick={() => navigate(`/editar/${tarefa.id}`)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg></button>
                                            </td>
                                            {/*Botão de Excluir*/}
                                            <td className='p-4 text-center align-middle'><button className='bg-red-600 border-2 border-gray-800 00 font-bold rounded-lg text-white hover:text-red-900 hover:bg-red-400 px-1.5 py-0.5 ' onClick={() => setConfirmaExclusao(tarefa)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg></button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}             
                </main>
            {confirmaExclusao !== null && (
                <BotaoConfirmacao 
                confirmar={deleteTarefa} 
                cancelar={() => setConfirmaExclusao(null)} 
                />
            )}
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default TelaInicial