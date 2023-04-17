import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import Adm from './paginas/Administracao/Restaurante/AdministracaoRestaurantes';
import AdmPrato from './paginas/Administracao/Pratos/AdministracaoPratos';
import FormularioRestaurante from './paginas/Administracao/Restaurante/FormularioRestaurante';
import FormularioPrato from './paginas/Administracao/Pratos/FormularioPrato';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import PaginaBaseAdm from './paginas/Administracao/PaginaBaseAdm';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdm />}>
        <Route path="restaurantes" element={<Adm />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante/>} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        <Route path="pratos" element={<AdmPrato />} />
        <Route path="pratos/novo" element={<FormularioPrato/>} />
        <Route path="pratos/:id" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
