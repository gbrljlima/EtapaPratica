import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api/tasks',
});

api.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  console.error("Erro na API:", error.response?.data?.erro || error.message);
  return Promise.reject(error);
});

export const criarTarefa =  (tarefa) => 
  api.post('/', tarefa);
export const listarTarefas = () => 
  api.get('/');
export const editarTarefa = (id, tarefa) =>
  api.put( `/${id}`, tarefa);
export const excluirTarefa = (id) => 
  api.delete( `/${id}`);
export const listarTarefaId = (id, config = {}) => 
  api.get(`/${id}`, config);
