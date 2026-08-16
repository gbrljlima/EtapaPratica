const supabase = require('../config/supabase');

const taskModel = {
    listarTarefas: async () => {
        const { data, error } = await supabase.from('tarefas').select('*');
        if (error) throw error;
        return data;
    },
    buscarId: async (id) => {
        const { data, error } = await supabase
        .from('tarefas')
        .select('*')
        .eq('id', id)
        .single();
        if (error) {
            return null;
        }
        return data;
    },
    criar: async (novaTarefa) => {
        const { data, error } = await supabase
            .from('tarefas')
            .insert([novaTarefa])
            .select();
        if (error) throw error;
        return data[0];
    },
    atualizar: async (id, dadosAtualizados) => {
        const { data, error } = await supabase
            .from('tarefas')
            .update(dadosAtualizados)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data.length > 0 ? data[0] : null; 
    },
    excluir: async (id) => {
        const { data, error } = await supabase
            .from('tarefas')
            .delete()
            .eq('id', id)
            .select();

        if (error) throw error;
        return data.length > 0;
    }
};

module.exports = taskModel;