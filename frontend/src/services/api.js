import axios from 'axios';
const API_URL = 'http://localhost:3001/api/tasks';


export const criarTarefa = async (tarefa) => {
    try {
      const response = await axios.post(API_URL, tarefa);
      return await response.data;
    } catch (error) {
      console.error("Erro na API:", error.response?.data?.erro || error.message);
      throw error;
  }
};
export const listarTarefas = async () => {
  try {
    const response = await axios.get(API_URL);
    return await response.data;
  } catch (error) {
    console.error("Erro na API:", error.response?.data?.erro || error.message);
    throw error;
  }
};
export const editarTarefa = async (id, tarefa) => {
  try {
    const response = await axios.put( `${API_URL}/${id}`, tarefa);

    console.log("Tarefa Atualizada", response.data);
    return await response.data;
  } catch (error) {
    console.error("Erro na API:", error.response?.data?.erro || error.message);
    throw error;
  }
};
export const excluirTarefa = async (id) => {
  try {
    const response = await axios.delete( `${API_URL}/${id}`);

    return await response.data;
  } catch (error) {
    console.error("Erro na API:", error.response?.data?.erro || error.message);
    throw error;
  }
};
export const listarTarefaId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);

  return await response.data;
  } catch (error) {
    console.error("Erro na API:", error.response?.data?.erro || error.message);
    throw error;
  }
};