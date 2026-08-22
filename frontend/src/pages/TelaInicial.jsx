import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router';
import { listarTarefas, editarTarefa, excluirTarefa } from '../services/api';
import Header from '../components/Header';
import ModalConfirmacaoExclusao from '../components/ModalConfirmacaoExclusao';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../components/Loading';
import {BotaoEditar, BotaoExcluir, BotaoStatus } from '../assets/botoes';


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
                                        {/*Botão de Excluir*/}
                                        <button className='bg-red-500 border-2 border-gray-700 00 font-bold rounded-lg text-white hover:text-red-700 hover:bg-red-400 px-1.5' onClick={() => setConfirmaExclusao(tarefa)}>
                                            <BotaoExcluir/>
                                        </button>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className=''>{tarefa.completed ? "Concluida" : "Pendente"}</span> 
                                        {/*Botão de alterar status*/}
                                        <button className='bg-gray-800 font-semibold rounded-md text-green-300 hover:text-white px-1 py-2' onClick={() => changeStatus(tarefa)}>
                                            {tarefa.completed ? 
                                                <BotaoStatus concluida={true}/>
                                                : 
                                                <BotaoStatus concluida={false}/>
                                            } 
                                        </button>
                                    </div> 
                                    <div className='flex justify-between gap-7 items-center'>                                       
                                        {tarefa.description ? <p className='break-words min-w-0 '>{tarefa.description}</p> : <p className='text-gray-600 italic'>Sem Descrição</p>}
                                        {/*Botão de editar*/}
                                        <button className='bg-gray-800 flex-shrink-0 font-semibold rounded-md text-yellow-400 hover:text-white px-1 py-2' onClick={() => navigate(`/editar/${tarefa.id}`)}>
                                            <BotaoEditar/>
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
                                            <td className='p-4 break-words max-w-xs overflow-y-auto font-semibold'> {tarefa.title} </td>
                                            <td className='p-4'> {tarefa.description ? <div className="max-w-xs max-h-32 overflow-y-auto break-words">{tarefa.description}</div> : <span className='text-gray-600 italic'>Sem Descrição</span>} </td>
                                            <td className='p-4'> {tarefa.completed ? "Concluida" : "Pendente" } </td>
                                            {/*Botão de alterar status*/}
                                            <td className='p-4 text-center align-middle'><button className='bg-gray-800 font-semibold rounded-md  px-1 py-2' onClick={() => changeStatus(tarefa)}>
                                                    {tarefa.completed ? 
                                                        <BotaoStatus concluida={true}/>
                                                        : 
                                                        <BotaoStatus concluida={false}/>
                                                    } 
                                                </button>
                                            </td>
                                            {/*Botão de Editar*/}
                                            <td className='p-4 text-center align-middle'><button className='bg-gray-800 font-semibold rounded-md text-yellow-400 hover:text-yellow-200 px-2 py-1' onClick={() => navigate(`/editar/${tarefa.id}`)}>
                                                    <BotaoEditar/>
                                                </button>
                                            </td>
                                            {/*Botão de Excluir*/}
                                            <td className='p-4 text-center align-middle'><button className='bg-red-600 border-2 border-gray-800 00 font-bold rounded-lg text-white hover:text-red-900 hover:bg-red-400 px-1.5 py-0.5 ' onClick={() => setConfirmaExclusao(tarefa)}>
                                                    <BotaoExcluir/>
                                                </button>
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
                <ModalConfirmacaoExclusao 
                confirmar={deleteTarefa} 
                cancelar={() => setConfirmaExclusao(null)} 
                />
            )}
            <ToastContainer autoClose={2000} />
        </div>
    )
}

export default TelaInicial