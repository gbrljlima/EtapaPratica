export default function BotaoConfirmacao({confirmar, cancelar}) {
    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white max-w-sm shadow-lg rounded-md px-4 py-8 sm:p-8 gap-5 flex justify-center flex-col items-center text-center" >
                <div>
                    <label className="font-semibold text-lg">Tem certeza que deseja excluir essa tarefa?</label>
                </div>
                <div className="flex gap-4 ">
                    <button onClick={confirmar} className="text-white bg-red-600 hover:bg-red-800 rounded-lg px-5 py-3">Excluir</button>
                    <button onClick={cancelar} className="text-white bg-gray-500 hover:bg-gray-700 rounded-lg px-5 py-3">Cancelar</button>
                </div> 
            </div>
        </div>
    )
}