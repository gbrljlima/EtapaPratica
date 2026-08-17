export default function Header({titulo}) {

    return (
        <header className="bg-gray-800 text-white flex items-center justify-center py-4 px-8 shadow-md">
            <h1 className="text-3xl font-bold text-yellow-400 tracking-wide">
                {titulo}
            </h1>
        </header>
    );
}