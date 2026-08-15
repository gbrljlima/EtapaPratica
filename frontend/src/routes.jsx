import {BrowserRouter,Routes,Route} from 'react-router-dom';
import TelaInicial from "./pages/TelaInicial/TelaInicial.jsx";
import CriarTarefa from './pages/CriarTarefa/CriarTarefa.jsx';

function RoutesApp(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element = {<TelaInicial/>}/>
                <Route path='/criar' element = {<CriarTarefa/>}/>
                <Route path='/editar/:id' element = {<CriarTarefa/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;