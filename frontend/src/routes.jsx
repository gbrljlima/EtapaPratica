import {BrowserRouter,Routes,Route} from 'react-router-dom';
import TelaInicial from "./pages/TelaInicial/tela_inicial.jsx";
import CriarTarefa from './pages/CriarTarefa/criar_tarefa.jsx';

function RoutesApp(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<TelaInicial/>}/>
                <Route path='/criar' element = {<CriarTarefa/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;