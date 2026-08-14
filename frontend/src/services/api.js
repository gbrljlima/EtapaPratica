const API_URL = 'http://localhost:3001';


export const criarTarefa = async (tarefa) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || 'Erro ao criar conta');
        error.response = response;
        throw error;
    }
    return await response.json();

    } catch (error) {
      console.error("Erro na API:", error);
      throw error;
    }  
  };
  export const listarTarefas = async () => {
  try {
    const response = await fetch( API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar Tarefas");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};
export const editarTarefa = async (tarefa) => {
  try {
    const response = await fetch( `${API_URL}/${tarefa.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    });
    if (!response.ok) {
      throw new Error("Erro ao editar Tarefa");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};
export const excluirTarefa = async (id) => {
  try {
    const response = await fetch( `${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir Tarefa");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};
export const listarTarefaId = async (id) => {
  try {
    const response = await fetch( `${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar Tarefa");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    throw error;
  }
};