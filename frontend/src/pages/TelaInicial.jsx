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
            tarefa.completed = !tarefa.completed;
            await editarTarefa(tarefa.id, {
                title: tarefa.title,
                description: tarefa.description,
                completed: tarefa.completed 
            });            
            setTarefas(tarefa => tarefa.map(t => t.id === tarefa.id ? { ...t, completed: !tarefa.completed } : t ));
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
                        <div className='sm:hidden grid grid-cols-1 gap-6'>
                            {tarefas.map((tarefa) => 
                                <div key={tarefa.id} className={`gap-3 flex flex-col rounded-lg shadow  ring-1  ring-black py-4 px-5 ring-opacity-50 ${tarefa.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    <div className='flex gap-5 justify-between items-center'>
                                        <p className='font-semibold'>{tarefa.title}</p> 
                                        <button className='bg-red-500 border-2 border-gray-700 00 font-bold rounded-lg text-white hover:text-red-900 hover:bg-red-400 px-1.5' onClick={() => setConfirmaExclusao(tarefa)}>X</button>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className=''>{tarefa.completed ? "Concluida" : "Pendente"}</span> 
                                        <button className='bg-gray-800 font-semibold rounded-md text-yellow-400 hover:text-white px-1 py-2' onClick={() => changeStatus(tarefa)}>Alternar status</button>
                                    </div> 
                                    <div className='flex justify-between gap-7 items-center'>                                       
                                        {tarefa.description ? <p className='break-words min-w-0 '>{tarefa.description}</p> : <p className='text-gray-600 italic'>Sem Descrição</p>}
                                        <button className='bg-gray-800 flex-shrink-0 font-semibold rounded-md text-yellow-400 hover:text-white px-1 py-2' onClick={() => navigate(`/editar/${tarefa.id}`)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='bg-gray-300 hidden sm:flex shadow-md rounded-md overflow-x-auto'>
                            <table className='w-full border-collapse text-left'>
                                <thead className='bg-gray-800 text-yellow-400 text-lg'>
                                    <tr>
                                        <th className='p-3 sm:p-4 font-semibold'>Título</th>
                                        <th className='p-3 sm:p-4 font-semibold hidden sm:table-cell'>Descrição</th>
                                        <th className='p-3 sm:p-4 font-semibold'>Status</th>
                                        <th className='p-3 sm:p-4 font-semibold'>Alternar status</th>
                                        <th className='p-3 sm:p-4 font-semibold'>Editar</th>
                                        <th className='p-3 sm:p-4 font-semibold'>Excluir</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {tarefas.map((tarefa) =>
                                        <tr key={tarefa.id} className={`${tarefa.completed ? 'bg-green-300' : 'bg-gray-300'}`}>
                                            <td className='p-3 sm:p-4'> {tarefa.title} </td>
                                            <td className='p-3 sm:p-4 hidden sm:table-cell '> {tarefa.description ? <div className="max-w-sm w-26 md:w-auto max-h-24 md:max-h-32 overflow-y-auto break-words">{tarefa.description}</div> : <span className='text-gray-600 italic'>Sem Descrição</span>} </td>
                                            <td className='p-3 sm:p-4'> {tarefa.completed ? "Concluida" : "Pendente" } </td>
                                            <td className='p-3 sm:p-4'><button className='bg-gray-800 font-semibold rounded-md text-yellow-400 hover:text-white px-1 py-2' onClick={() => changeStatus(tarefa)}>Alternar Status</button></td>
                                            <td className='p-3 sm:p-4'><button className='bg-gray-800 font-semibold rounded-md text-yellow-400 hover:text-white px-2 py-1' onClick={() => navigate(`/editar/${tarefa.id}`)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg></button>
                                            </td>
                                            <td className='p-3 sm:p-4'><button className='bg-red-600 border-2 border-gray-800 00 font-bold rounded-lg text-white hover:text-red-900 hover:bg-red-400 px-1.5 py-0.5 ' onClick={() => setConfirmaExclusao(tarefa)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
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