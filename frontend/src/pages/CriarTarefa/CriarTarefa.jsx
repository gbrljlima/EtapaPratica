import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { criarTarefa } from '../../services/api';

function CriarTarefa() {
    const [formData, setFormData] = useState({
       titulo:'',
       descricao:'',
       status:'', 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    const handleSubmitTarefa = async (e) => {
          e.preventDefault();
          console.log('Form data:', formData);
        try {
            const response = await criarTarefa({
                titulo: formData.titulo,
                descricao: formData.descricao
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleRedirect = () => {
        navigate('/');
    };
    return(
        <div>
            <h1>Criação de Tarefas</h1>
            <form onSubmit={handleSubmitTarefa}>
                <input
                    type='text'
                    name='titulo'
                    placeholder='Título'
                    value={formData.titulo}
                    required
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='descricao'
                    placeholder='Descrição'
                    value={formData.descricao}
                    onChange={handleChange}
                />
                <button type="submit">Salvar Tarefa</button>
            </form>
            <button onClick={handleRedirect}>Pagina inicial</button>
        </div>
    )
}

export default CriarTarefa