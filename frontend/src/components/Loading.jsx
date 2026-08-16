export default function Loading({texto}) {
    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <div className="h-10 w-10 border-4 border-green-500  border-t-0  rounded-full animate-spin">
            </div>
            <h3>Carregando {texto}...</h3>
        </div>
    )
}