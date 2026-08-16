import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { criarTarefa, editarTarefa, listarTarefaId } from '../services/api';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../components/Loading';

function CriarTarefa() {
    const [formData, setFormData] = useState({
       title:'',
       description:'',
       completed:''
    });
    const [carregamento, setCarregamento] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams();
    const modoEdicao = Boolean(id);
    
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        if(modoEdicao) {
            const fetchTarefa = async() => {
                try {
                    const tarefa = await listarTarefaId(id, {signal});
                    setFormData({
                        title: tarefa.title,
                        description: tarefa.description || '',
                        completed: tarefa.completed
                    });
                } catch (error) {
                    if (error.name === 'CanceledError' || error.message === 'canceled') {
                        console.log("Requisição anterior cancelada.");
                        return; 
                    }
                    console.error("Erro ao buscar tarefa", error);
                    toast.error("Erro ao buscar tarefa!");
                } finally {
                    setCarregamento(false);
                }
            };
            fetchTarefa();
            return () => {
                controller.abort();
            };
        };
    }, [id, modoEdicao]);

    const handleSubmitTarefa = async (e) => {
          e.preventDefault();
          console.log('Form data:', formData);
        try {
            if (modoEdicao) {
                await editarTarefa(id, {
                    title: formData.title,
                    description: formData.description,
                    completed: formData.completed
                });
                navigate('/', { state: { mensagemSucesso: "Tarefa Editada com sucesso!" } });
            } else {
                await criarTarefa({
                    title: formData.title,
                    description: formData.description
                });
                navigate('/', { state: { mensagemSucesso: "Tarefa criada com sucesso!" } });
            }    
        } catch (error) {
            console.error(error);
            if (modoEdicao) {
                toast.error("Erro ao editar tarefa!");
            } else {
                toast.error("Erro ao criar tarefa!");
            }
        }
    };

    const handleRedirect = () => {
        navigate('/');
    };
    return(
        <div className='min-h-screen flex flex-col'>
            <Header titulo={modoEdicao ? "Edição de Tarefas" : "Criação de Tarefas"}/>
            <main className='max-w-2xl mx-auto w-full px-5 py-10 flex-grow'>
                <div className='flex items-center gap-4 mb-5'>
                    <button className='bg-gray-800 font-semibold transition-colors rounded-md text-yellow-400 hover:text-white px-3 py-1' onClick={handleRedirect}>Voltar</button>
                    <h1 className="text-2xl font-bold text-gray-800">{modoEdicao ? "Editar Tarefa" : "Nova Tarefa"}</h1>
                </div>
                {carregamento && modoEdicao ? <Loading texto="Tarefa"/> :
                <div className='bg-gray-200 shadow-md rounded-md p-5 sm:p-8'>
                    <form onSubmit={handleSubmitTarefa} className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold text-gray-800' >Título<span className="text-red-500">*</span></label>
                            <input
                                className='w-full px-4 py-3 focus:ring-2 ring-yellow-400 focus:bg-white bg-gray-50 border outline-none border-gray-400 rounded-lg transition-colors'
                                type='text'
                                name='title'
                                placeholder='Ex: Estudar Tailwind CSS'
                                value={formData.title}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold text-gray-800' >Descrição (Opcional): </label>
                            <textarea className='px-4 py-3 focus:ring-2 ring-yellow-400 focus:bg-white bg-gray-50 border outline-none border-gray-400 rounded-lg transition-colors'
                                type='text'
                                name='description'
                                placeholder='Descrição da sua tarefa...'
                                value={formData.description}
                                onChange={handleChange}
                                rows='3'
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button className='bg-gray-800 transition-colors font-semibold rounded-md text-yellow-400 hover:text-white px-5 py-2 text-lg' type="submit">{modoEdicao ? "Editar Tarefa" : "Criar Tarefa"}</button>
                        </div>
                    </form>
                </div>
            }
            </main><ToastContainer/>
        </div>
        
    )
}

export default CriarTarefa